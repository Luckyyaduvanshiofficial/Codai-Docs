'use client'

import { useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import { ChatButton } from './ChatButton'
import { ChatWindow } from './ChatWindow'
import { ChatService } from './ChatService'
import { ChatErrorBoundary } from './ChatErrorBoundary'
import { ChatConfig, Message } from './types'

interface ChatAssistantProps {
  config: ChatConfig
}

export interface ChatAssistantRef {
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
}

export const ChatAssistant = forwardRef<ChatAssistantRef, ChatAssistantProps>(
  ({ config }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    
    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      openChat: () => setIsOpen(true),
      closeChat: () => setIsOpen(false),
      toggleChat: () => setIsOpen(prev => !prev)
    }))
    
    // Memoize ChatService to prevent recreation on every render
    const chatService = useMemo(
      () => new ChatService(
        config.n8nWebhookUrl,
        config.timeout,
        config.rateLimitConfig,
        config.retryAttempts,
        config.retryDelay
      ),
      [config.n8nWebhookUrl, config.timeout, config.rateLimitConfig, config.retryAttempts, config.retryDelay]
    )

    const handleSendMessage = async (message: string, history: Message[]): Promise<string> => {
      try {
        // Call analytics callback if provided
        if (config.onMessageSent) {
          config.onMessageSent(message)
        }

        const response = await chatService.sendMessage(message, history)
        
        // Call analytics callback if provided
        if (config.onMessageReceived) {
          config.onMessageReceived(response)
        }

        return response
      } catch (error) {
        // Call error callback if provided
        if (config.onError && error instanceof Error) {
          config.onError(error)
        }
        throw error
      }
    }

    return (
      <ChatErrorBoundary>
        <ChatButton 
          onClick={() => setIsOpen(!isOpen)} 
          isOpen={isOpen}
        />
        <ChatWindow
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSendMessage={handleSendMessage}
          botName={config.botName}
          botAvatar={config.botAvatar}
          welcomeMessage={config.welcomeMessage}
          placeholder={config.placeholder}
          persistHistory={config.persistHistory}
          maxMessages={config.maxMessages}
        />
      </ChatErrorBoundary>
    )
  }
)

ChatAssistant.displayName = 'ChatAssistant'
