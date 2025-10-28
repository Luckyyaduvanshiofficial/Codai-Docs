import { Message } from './types'

interface RateLimitConfig {
  maxRequests: number
  timeWindow: number // in milliseconds
}

export class ChatService {
  private webhookUrl: string
  private timeout: number
  private requestTimestamps: number[] = []
  private rateLimitConfig: RateLimitConfig
  private retryAttempts: number
  private retryDelay: number

  constructor(
    webhookUrl: string, 
    timeout: number = 30000,
    rateLimitConfig: RateLimitConfig = { maxRequests: 10, timeWindow: 60000 },
    retryAttempts: number = 3,
    retryDelay: number = 1000
  ) {
    this.webhookUrl = webhookUrl
    this.timeout = timeout
    this.rateLimitConfig = rateLimitConfig
    this.retryAttempts = retryAttempts
    this.retryDelay = retryDelay
  }

  private checkRateLimit(): boolean {
    const now = Date.now()
    const { maxRequests, timeWindow } = this.rateLimitConfig
    
    // Remove timestamps outside the time window
    this.requestTimestamps = this.requestTimestamps.filter(
      timestamp => now - timestamp < timeWindow
    )
    
    // Check if we've exceeded the rate limit
    if (this.requestTimestamps.length >= maxRequests) {
      return false
    }
    
    // Add current timestamp
    this.requestTimestamps.push(now)
    return true
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private validateMessage(message: string): boolean {
    if (!message || typeof message !== 'string') {
      return false
    }
    
    const trimmed = message.trim()
    if (trimmed.length === 0 || trimmed.length > 5000) {
      return false
    }
    
    return true
  }

  async sendMessage(message: string, conversationHistory?: Message[]): Promise<string> {
    // Validate webhook URL is configured
    if (!this.webhookUrl || this.webhookUrl.trim() === '') {
      throw new Error('Chat service is not configured. Please contact the administrator.')
    }

    // Validate input
    if (!this.validateMessage(message)) {
      throw new Error('Invalid message. Please ensure your message is between 1 and 5000 characters.')
    }

    // Check rate limit
    if (!this.checkRateLimit()) {
      const waitTime = Math.ceil(this.rateLimitConfig.timeWindow / 1000)
      throw new Error(`Rate limit exceeded. Please wait ${waitTime} seconds before sending another message.`)
    }

    // Attempt request with retries
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await this.attemptRequest(message, conversationHistory)
        return response
      } catch (error) {
        // Don't retry on validation errors, rate limits, or client errors (4xx)
        if (error instanceof Error && 
            (error.message.includes('Invalid message') || 
             error.message.includes('Rate limit') ||
             error.message.includes('not configured') ||
             error.message.includes('status 4'))) {
          throw error
        }

        // If this is the last attempt, throw the error
        if (attempt === this.retryAttempts) {
          throw error
        }

        // Wait before retrying (exponential backoff)
        await this.delay(this.retryDelay * Math.pow(2, attempt - 1))
      }
    }

    throw new Error('Failed to get response after multiple attempts.')
  }

  private async attemptRequest(message: string, conversationHistory?: Message[]): Promise<string> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: conversationHistory?.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          timestamp: new Date().toISOString()
        }),
        signal: controller.signal
      })

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Server rate limit exceeded. Please try again later.')
        }
        if (response.status >= 500) {
          throw new Error('Server error. Please try again.')
        }
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      
      // N8N can return different response structures, adapt as needed
      const botResponse = data.response || data.message || data.output
      
      if (!botResponse || typeof botResponse !== 'string') {
        throw new Error('Invalid response from server')
      }
      
      return botResponse
    } catch (error) {
      // Log error without sensitive information
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Chat request timed out')
          throw new Error('Request timed out. Please try again.')
        }
        
        // Re-throw known errors
        if (error.message.includes('rate limit') || 
            error.message.includes('Server error') ||
            error.message.includes('Invalid response')) {
          throw error
        }
        
        console.error('Chat request failed:', error.message)
      }
      throw new Error('Failed to get response from the assistant. Please check your connection and try again.')
    } finally {
      // Always clear timeout to prevent memory leaks
      clearTimeout(timeoutId)
    }
  }
}
