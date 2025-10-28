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
  persistHistory?: boolean
  maxMessages?: number
}

const STORAGE_KEY = 'codai-chat-history'

export const ChatWindow = ({
  isOpen,
  onClose,
  onSendMessage,
  botName = 'Codai Assistant',
  botAvatar,
  welcomeMessage = 'Hi! I\'m Codai Assistant. I can help you with any issues or questions about Codai. How can I assist you today?',
  placeholder = 'Type your message...',
  persistHistory = true,
  maxMessages = 50
}: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatWindowRef = useRef<HTMLDivElement>(null)
  
  // Component-scoped ID generator
  const messageIdCounterRef = useRef(0)
  const generateMessageId = useCallback(() => {
    messageIdCounterRef.current++
    return `msg-${Date.now()}-${messageIdCounterRef.current}-${Math.random().toString(36).substring(2, 11)}`
  }, [])

  // Load persisted chat history
  useEffect(() => {
    if (persistHistory && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved) as Message[]
          // Convert timestamp strings back to Date objects
          const messagesWithDates = parsed.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
          setMessages(messagesWithDates)
          return
        }
      } catch (error) {
        console.error('Failed to load chat history:', error)
      }
    }
    
    // Initialize with welcome message if no history
    setMessages([
      {
        id: generateMessageId(),
        content: welcomeMessage,
        role: 'assistant',
        timestamp: new Date()
      }
    ])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Persist chat history
  useEffect(() => {
    if (persistHistory && typeof window !== 'undefined' && messages.length > 0) {
      try {
        // Limit stored messages
        const messagesToStore = messages.slice(-maxMessages)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToStore))
      } catch (error) {
        console.error('Failed to save chat history:', error)
      }
    }
  }, [messages, persistHistory, maxMessages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus management and keyboard traps
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small delay to ensure smooth transition
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Handle Escape key to close chat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        // Only handle escape if the chat window is the active dialog
        // Check if the target is within the chat window to avoid conflicts
        if (chatWindowRef.current?.contains(e.target as Node)) {
          // Don't interfere if focus is in a modal or nested dialog
          const activeElement = document.activeElement
          if (activeElement?.closest('[role="dialog"]') === chatWindowRef.current) {
            e.stopPropagation()
            onClose()
          }
        }
      }
    }
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape, true) // Use capture phase
      return () => window.removeEventListener('keydown', handleEscape, true)
    }
  }, [isOpen, onClose])

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
    setError(null)

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
      let errorMessage = 'Sorry, I encountered an error. Please try again.'
      
      if (error instanceof Error) {
        // Show user-friendly error messages
        if (error.message.includes('Rate limit')) {
          errorMessage = error.message
        } else if (error.message.includes('Invalid message')) {
          errorMessage = error.message
        } else if (error.message.includes('timeout')) {
          errorMessage = 'The request timed out. Please try again.'
        } else if (error.message.includes('connection')) {
          errorMessage = 'Connection error. Please check your internet and try again.'
        }
      }
      
      setError(errorMessage)
      
      // Remove loading message and add error message
      setMessages(prev => {
        const withoutLoading = prev.filter(msg => !msg.isLoading)
        return [
          ...withoutLoading,
          {
            id: generateMessageId(),
            content: errorMessage,
            role: 'assistant',
            timestamp: new Date()
          }
        ]
      })
    } finally {
      setIsLoading(false)
    }
  }, [inputValue, isLoading, messages, onSendMessage, generateMessageId])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      const welcomeMsg: Message = {
        id: generateMessageId(),
        content: welcomeMessage,
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages([welcomeMsg])
      if (persistHistory && typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [generateMessageId, welcomeMessage, persistHistory])

  if (!isOpen) return null

  return (
    <div 
      ref={chatWindowRef}
      className={styles.chatWindow}
      role="dialog"
      aria-labelledby="chat-title"
      aria-describedby="chat-description"
      aria-modal="true"
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerAvatar}>
            {botAvatar ? (
              <img src={botAvatar} alt={`${botName} avatar`} />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
          <div className={styles.headerInfo}>
            <h3 id="chat-title">{botName}</h3>
            <span className={styles.onlineStatus} role="status" aria-live="polite">
              <span className={styles.onlineDot} aria-hidden="true"></span>
              Online
            </span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button 
            onClick={handleClearHistory} 
            className={styles.clearButton} 
            aria-label="Clear chat history"
            title="Clear history"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button 
            onClick={onClose} 
            className={styles.closeButton} 
            aria-label="Close chat"
            title="Close chat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <p id="chat-description" className={styles.srOnly}>
        Chat interface with {botName}. Type your message and press Enter to send.
      </p>

      {/* Messages */}
      <div 
        className={styles.messagesContainer}
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-relevant="additions"
      >
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
        {error && (
          <div className={styles.errorBanner} role="alert" aria-live="assertive">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}
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
            aria-label="Message input"
            aria-describedby="input-help"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={styles.sendButton}
            aria-label={isLoading ? "Sending message..." : "Send message"}
          >
            {isLoading ? (
              <div className={styles.spinner} aria-hidden="true" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        <div className={styles.disclaimer} id="input-help">
          Powered by AI • May occasionally provide incorrect information
        </div>
      </div>
    </div>
  )
}
