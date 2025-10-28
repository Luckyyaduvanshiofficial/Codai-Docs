import { Message } from './types'

export class ChatService {
  private webhookUrl: string
  private timeout: number

  constructor(webhookUrl: string, timeout: number = 30000) {
    this.webhookUrl = webhookUrl
    this.timeout = timeout
  }

  async sendMessage(message: string, conversationHistory?: Message[]): Promise<string> {
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
          }))
        }),
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      const data = await response.json()
      
      // N8N can return different response structures, adapt as needed
      return data.response || data.message || data.output || 'Sorry, I could not process your request.'
    } catch (error) {
      // Log error without sensitive information
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.error('Chat request timed out')
          throw new Error('Request timed out. Please try again.')
        }
        console.error('Chat request failed')
      }
      throw new Error('Failed to get response from the assistant. Please try again.')
    } finally {
      // Always clear timeout to prevent memory leaks
      clearTimeout(timeoutId)
    }
  }
}
