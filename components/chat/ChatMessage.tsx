'use client'

import { Message } from './types'
import styles from './ChatMessage.module.css'

interface ChatMessageProps {
  message: Message
  botName?: string
  botAvatar?: string
}

export const ChatMessage = ({ message, botName = 'Codai Assistant', botAvatar }: ChatMessageProps) => {
  const isUser = message.role === 'user'
  
  return (
    <div className={`${styles.messageContainer} ${isUser ? styles.userMessage : styles.assistantMessage}`}>
      {!isUser && (
        <div className={styles.avatar}>
          {botAvatar ? (
            <img src={botAvatar} alt={botName} className={styles.avatarImage} />
          ) : (
            <div className={styles.avatarDefault}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
                <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      )}
      
      <div className={styles.messageContent}>
        {!isUser && <div className={styles.botName}>{botName}</div>}
        <div className={styles.messageText}>
          {message.isLoading ? (
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            <MessageContent content={message.content} />
          )}
        </div>
        <div className={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

// Safe message content renderer
const MessageContent = ({ content }: { content: string }) => {
  // Format message safely by escaping HTML and then converting markdown
  const formattedContent = formatMessageSafely(content)
  
  return (
    <>
      {formattedContent.map((part, index) => {
        if (part.type === 'text') {
          return <span key={index}>{part.content}</span>
        } else if (part.type === 'code') {
          return <code key={index}>{part.content}</code>
        } else if (part.type === 'codeblock') {
          return (
            <pre key={index}>
              <code>{part.content}</code>
            </pre>
          )
        } else if (part.type === 'bold') {
          return <strong key={index}>{part.content}</strong>
        } else if (part.type === 'italic') {
          return <em key={index}>{part.content}</em>
        } else if (part.type === 'break') {
          return <br key={index} />
        }
        return null
      })}
    </>
  )
}

type ContentPart = {
  type: 'text' | 'code' | 'codeblock' | 'bold' | 'italic' | 'break'
  content: string
}

function formatMessageSafely(content: string): ContentPart[] {
  const parts: ContentPart[] = []
  
  // Escape any existing HTML
  const escapedContent = escapeHtml(content)
  
  // Split by lines for processing
  const lines = escapedContent.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Check for code blocks (```)
    if (line.trim().startsWith('```')) {
      const codeLines: string[] = []
      i++ // Skip the opening ```
      
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      
      if (codeLines.length > 0) {
        parts.push({
          type: 'codeblock',
          content: codeLines.join('\n')
        })
      }
      continue
    }
    
    // Process inline formatting
    const inlineParts = parseInlineFormatting(line)
    parts.push(...inlineParts)
    
    // Add line break if not last line
    if (i < lines.length - 1) {
      parts.push({ type: 'break', content: '' })
    }
  }
  
  return parts
}

function parseInlineFormatting(text: string): ContentPart[] {
  const parts: ContentPart[] = []
  let currentIndex = 0
  
  // Pattern matching for inline code, bold, italic
  const patterns = [
    { regex: /`([^`]+)`/g, type: 'code' as const },
    { regex: /\*\*([^*]+)\*\*/g, type: 'bold' as const },
    { regex: /\*([^*]+)\*/g, type: 'italic' as const }
  ]
  
  // Find all matches
  const matches: Array<{ start: number; end: number; type: ContentPart['type']; content: string }> = []
  
  for (const pattern of patterns) {
    let match
    pattern.regex.lastIndex = 0
    while ((match = pattern.regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        type: pattern.type,
        content: match[1]
      })
    }
  }
  
  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start)
  
  // Remove overlapping matches (keep first match)
  const validMatches = matches.filter((match, index) => {
    for (let i = 0; i < index; i++) {
      if (matches[i].end > match.start) {
        return false
      }
    }
    return true
  })
  
  // Build parts
  validMatches.forEach(match => {
    // Add text before match
    if (currentIndex < match.start) {
      const textContent = text.substring(currentIndex, match.start)
      if (textContent) {
        parts.push({ type: 'text', content: textContent })
      }
    }
    
    // Add matched content
    parts.push({ type: match.type, content: match.content })
    currentIndex = match.end
  })
  
  // Add remaining text
  if (currentIndex < text.length) {
    const textContent = text.substring(currentIndex)
    if (textContent) {
      parts.push({ type: 'text', content: textContent })
    }
  }
  
  // If no matches, return entire text
  if (parts.length === 0 && text) {
    parts.push({ type: 'text', content: text })
  }
  
  return parts
}

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
