export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isLoading?: boolean
}

export interface RateLimitConfig {
  maxRequests: number
  timeWindow: number // in milliseconds
}

export interface ChatConfig {
  n8nWebhookUrl: string
  botName?: string
  botAvatar?: string
  welcomeMessage?: string
  placeholder?: string
  maxMessages?: number
  timeout?: number
  rateLimitConfig?: RateLimitConfig
  retryAttempts?: number
  retryDelay?: number
  persistHistory?: boolean
  enableAnalytics?: boolean
  onMessageSent?: (message: string) => void
  onMessageReceived?: (message: string) => void
  onError?: (error: Error) => void
}
