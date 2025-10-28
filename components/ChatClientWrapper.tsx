'use client'

import { useState, useEffect } from 'react'
import { ChatWithHelpButton } from './chat'
import { chatConfig } from '../config/chat.config'

export function ChatClientWrapper() {
  const [isEnabled, setIsEnabled] = useState(false)
  
  // Check at runtime instead of build-time to allow for dynamic configuration
  useEffect(() => {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    setIsEnabled(Boolean(webhookUrl && webhookUrl.trim() !== ''))
  }, [])
  
  if (!isEnabled) {
    return null
  }
  
  return <ChatWithHelpButton config={chatConfig} />
}
