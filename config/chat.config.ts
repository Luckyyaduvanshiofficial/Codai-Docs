import { ChatConfig } from '../components/chat/types'

export const chatConfig: ChatConfig = {
  n8nWebhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
  botName: 'Codai Assistant',
  welcomeMessage: 'Hi! I\'m Codai Assistant. I can help you with any issues or questions about Codai. How can I assist you today?',
  placeholder: 'Ask me anything about Codai...',
  maxMessages: 50
}

export const isChatEnabled = (): boolean => {
  return Boolean(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL)
}
