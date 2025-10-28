export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isLoading?: boolean
}

export interface ChatConfig {
  n8nWebhookUrl: string
  botName?: string
  botAvatar?: string
  welcomeMessage?: string
  placeholder?: string
  maxMessages?: number
}
