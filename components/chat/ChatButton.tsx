'use client'

import { useState } from 'react'
import styles from './ChatButton.module.css'

interface ChatButtonProps {
  onClick: () => void
  isOpen: boolean
  unreadCount?: number
}

export const ChatButton = ({ onClick, isOpen, unreadCount = 0 }: ChatButtonProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${styles.chatButton} ${isOpen ? styles.open : ''}`}
      aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      type="button"
    >
      {unreadCount > 0 && !isOpen && (
        <span className={styles.badge} aria-label={`${unreadCount} unread messages`}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
      
      <div className={styles.iconContainer} aria-hidden="true">
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </div>
      
      {isHovered && !isOpen && (
        <span className={styles.tooltip} role="tooltip" aria-hidden="true">
          Need help? Chat with us!
        </span>
      )}
    </button>
  )
}
