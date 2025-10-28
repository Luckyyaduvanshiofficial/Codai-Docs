'use client'

import { useRef } from 'react'
import { ChatAssistant, ChatAssistantRef, HelpButton } from '.'
import { ChatConfig } from './types'

interface ChatWithHelpButtonProps {
  config: ChatConfig
}

export const ChatWithHelpButton = ({ config }: ChatWithHelpButtonProps) => {
  const chatRef = useRef<ChatAssistantRef>(null)

  const handleHelpClick = () => {
    chatRef.current?.openChat()
  }

  return (
    <>
      <div className="help-button-container">
        <HelpButton onClick={handleHelpClick} />
      </div>
      <ChatAssistant ref={chatRef} config={config} />
      
      <style jsx global>{`
        .help-button-container {
          position: fixed;
          top: 1rem;
          right: 5rem;
          z-index: 999;
        }
        
        @media (max-width: 768px) {
          .help-button-container {
            top: 0.75rem;
            right: 4rem;
          }
        }
      `}</style>
    </>
  )
}
