'use client'

import { useState, useMemo } from 'react'
import { ChatButton } from './ChatButton'
import { ChatWindow } from './ChatWindow'
import { ChatService } from './ChatService'
import { ChatConfig, Message } from './types'

interface ChatAssistantProps {
  config: ChatConfig
}

export const ChatAssistant = ({ config }: ChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  // Memoize ChatService to prevent recreation on every render
  const chatService = useMemo(
    () => new ChatService(config.n8nWebhookUrl),
    [config.n8nWebhookUrl]
  )

  const handleSendMessage = async (message: string, history: Message[]): Promise<string> => {
    return await chatService.sendMessage(message, history)
  }

  return (
    <>
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
      />
    </>
  )
}
