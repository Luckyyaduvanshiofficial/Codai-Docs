import { ChatConfig } from '../components/chat/types'

export const chatConfig: ChatConfig = {
  n8nWebhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
  botName: 'Codai Assistant',
  welcomeMessage: 'Hi! I\'m Codai Assistant. I can help you with any issues or questions about Codai. How can I assist you today?',
  placeholder: 'Ask me anything about Codai...',
  maxMessages: 50,
  timeout: 30000, // 30 seconds
  rateLimitConfig: {
    maxRequests: 10, // Max 10 requests
    timeWindow: 60000 // Per 60 seconds (1 minute)
  },
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  persistHistory: true, // Enable localStorage persistence
  enableAnalytics: false, // Set to true if you want to track chat usage
  
  // Optional analytics callbacks
  // onMessageSent: (message: string) => {
  //   console.log('Message sent:', message)
  //   // Add your analytics tracking here
  // },
  // onMessageReceived: (response: string) => {
  //   console.log('Response received:', response)
  //   // Add your analytics tracking here
  // },
  // onError: (error: Error) => {
  //   console.error('Chat error:', error)
  //   // Add your error tracking here
  // }
}
