# Chat Assistant Integration Guide

## Overview
The Codai Chat Assistant is a reusable, N8N-powered RAG (Retrieval-Augmented Generation) chatbot that can be integrated into any Next.js website. It provides real-time assistance to users by leveraging your project documentation and files.

## Features
- 🎨 **Beautiful UI** - Modern, responsive design with dark mode support
- 🔄 **Real-time Messaging** - Instant responses with loading indicators
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🎯 **Context-Aware** - Maintains conversation history
- 🔧 **Easy Integration** - Simple setup with environment variables
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🎨 **Customizable** - Easy to theme and customize

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat
```

### 2. N8N Workflow Setup

Your N8N webhook should expect the following POST request format:

```json
{
  "message": "User's question here",
  "history": [
    {
      "role": "user",
      "content": "Previous user message"
    },
    {
      "role": "assistant",
      "content": "Previous assistant response"
    }
  ]
}
```

And return a response in one of these formats:

```json
// Option 1
{
  "response": "Assistant's response here"
}

// Option 2
{
  "message": "Assistant's response here"
}

// Option 3
{
  "output": "Assistant's response here"
}
```

### 3. Integration in Your Project

The chat assistant is already integrated in `app/layout.tsx`. If the environment variable is not set, the chat will not appear.

To integrate in another Next.js project:

```tsx
import { ChatAssistant } from '@/components/chat'
import { chatConfig } from '@/config/chat.config'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatAssistant config={chatConfig} />
      </body>
    </html>
  )
}
```

## Customization

### Basic Configuration

Edit `config/chat.config.ts`:

```typescript
export const chatConfig: ChatConfig = {
  n8nWebhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
  botName: 'Your Bot Name',
  botAvatar: '/path/to/avatar.png', // Optional
  welcomeMessage: 'Custom welcome message',
  placeholder: 'Type your message...',
  maxMessages: 50 // Max messages to keep in memory
}
```

### Styling

All components use CSS modules for easy customization:

- `ChatButton.module.css` - Floating chat button
- `ChatWindow.module.css` - Main chat window
- `ChatMessage.module.css` - Individual messages

To customize colors, edit the CSS variables:

```css
/* Change primary color */
.chatButton {
  background: linear-gradient(135deg, #your-color 0%, #your-color-light 100%);
}
```

### Custom Avatar

Add your bot avatar to the `public` folder and reference it:

```typescript
botAvatar: '/bot-avatar.png'
```

## N8N RAG Workflow Example

Here's a basic N8N workflow structure:

1. **Webhook Node** - Receives POST requests
2. **Extract Data** - Parse message and history
3. **Vector Store Query** - Search your documentation
4. **LLM Node** - Generate response with context
5. **Response Node** - Return formatted response

### Sample N8N Response Node:

```javascript
return {
  json: {
    response: $json.output.text
  }
}
```

## File Structure

```
components/
  chat/
    ChatAssistant.tsx      # Main component wrapper
    ChatButton.tsx         # Floating chat button
    ChatWindow.tsx         # Chat window container
    ChatMessage.tsx        # Individual message component
    ChatService.ts         # API service for N8N
    types.ts              # TypeScript types
    index.ts              # Exports
    *.module.css          # Styles
config/
  chat.config.ts          # Configuration
```

## TypeScript Types

```typescript
interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  isLoading?: boolean
}

interface ChatConfig {
  n8nWebhookUrl: string
  botName?: string
  botAvatar?: string
  welcomeMessage?: string
  placeholder?: string
  maxMessages?: number
}
```

## Features in Detail

### Message Formatting
The chat supports basic markdown formatting:
- `**bold**` → **bold**
- `*italic*` → *italic*
- `` `code` `` → `code`
- ``` code blocks → formatted code blocks

### Conversation History
- Automatically maintains last 10 messages for context
- Sent with each request to N8N
- Helps maintain conversation flow

### Error Handling
- Network errors are gracefully handled
- User-friendly error messages
- Automatic retry capability

### Accessibility
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader compatible
- Focus management

## Deployment

### Environment Variables
Make sure to set `NEXT_PUBLIC_N8N_WEBHOOK_URL` in your deployment platform:

**Vercel:**
```bash
vercel env add NEXT_PUBLIC_N8N_WEBHOOK_URL
```

**Netlify:**
Add to `netlify.toml` or environment variables in dashboard

## Troubleshooting

### Chat doesn't appear
- Check if `NEXT_PUBLIC_N8N_WEBHOOK_URL` is set
- Verify the URL is correct and accessible
- Check browser console for errors

### Messages not sending
- Verify N8N webhook is active
- Check network tab for request/response
- Ensure CORS is properly configured in N8N

### Styling issues
- Check if CSS modules are imported correctly
- Verify no conflicting global styles
- Test in different browsers

## Security Considerations

1. **Rate Limiting** - Implement in N8N to prevent abuse
2. **Input Validation** - Sanitize user input in N8N
3. **CORS** - Configure properly in N8N
4. **Environment Variables** - Never commit `.env.local`
5. **Content Security Policy** - Already configured in `next.config.mjs`

## Performance Optimization

- Messages are limited to prevent memory issues
- Lazy loading of chat window
- Optimized animations with CSS
- Efficient re-rendering with React best practices

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT - Same as the main project

## Support

For issues or questions:
- Check N8N logs for backend issues
- Check browser console for frontend issues
- Review this documentation
- Open an issue on GitHub
