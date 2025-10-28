'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Message } from './types'
import { ChatMessage } from './ChatMessage'
import styles from './ChatWindow.module.css'

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  onSendMessage: (message: string, history: Message[]) => Promise<string>
  botName?: string
  botAvatar?: string
  welcomeMessage?: string
  placeholder?: string
}

export const ChatWindow = ({
  isOpen,
  onClose,
  onSendMessage,
  botName = 'Codai Assistant',
  botAvatar,
  welcomeMessage = 'Hi! I\'m Codai Assistant. I can help you with any issues or questions about Codai. How can I assist you today?',
  placeholder = 'Type your message...'
}: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  
  // Component-scoped ID generator
  const messageIdCounterRef = useRef(0)
  const generateMessageId = useCallback(() => {
    messageIdCounterRef.current++
    return `msg-${Date.now()}-${messageIdCounterRef.current}-${Math.random().toString(36).substring(2, 11)}`
  }, [])

  // Initialize welcome message only once on mount
  useEffect(() => {
    setMessages([
      {
        id: generateMessageId(),
        content: welcomeMessage,
        role: 'assistant',
        timestamp: new Date()
      }
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run on mount to preserve chat history

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: generateMessageId(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue.trim()
    setInputValue('')
    setIsLoading(true)

    // Add loading message
    const loadingMessage: Message = {
      id: generateMessageId(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isLoading: true
    }
    setMessages(prev => [...prev, loadingMessage])

    try {
      // Pass current messages + user message for context
      const response = await onSendMessage(currentInput, [...messages, userMessage])
      
      // Remove loading message and add actual response
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading)
        return [
          ...withoutLoading,
          {
            id: generateMessageId(),
            content: response,
            role: 'assistant',
            timestamp: new Date()
          }
        ]
      })
    } catch (error) {
      // Remove loading message and add error message
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading)
        return [
          ...withoutLoading,
          {
            id: generateMessageId(),
            content: 'Sorry, I encountered an error. Please try again or check your connection.',
            role: 'assistant',
            timestamp: new Date()
          }
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }, [inputValue, isLoading, messages, onSendMessage])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.chatWindow}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerAvatar}>
            {botAvatar ? (
              <img src={botAvatar} alt={botName} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <div className={styles.headerInfo}>
            <h3>{botName}</h3>
            <span className={styles.onlineStatus}>
              <span className={styles.onlineDot}></span>
              Online
            </span>
          </div>
        </div>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            botName={botName}
            botAvatar={botAvatar}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={styles.input}
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={styles.sendButton}
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className={styles.disclaimer}>
          Powered by AI • May occasionally provide incorrect information
        </div>
      </div>
    </div>
  )
}
