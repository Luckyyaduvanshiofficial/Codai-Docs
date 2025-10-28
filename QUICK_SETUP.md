# Quick Setup Guide - Chat Assistant

## 🚀 5-Minute Setup

### Step 1: Set Up N8N Workflow

1. Import `n8n-workflow-example.json` into your N8N instance
2. Configure your Vector Store (Pinecone, Qdrant, etc.)
3. Add your OpenAI API credentials (or use any other LLM)
4. Load your Codai documentation into the Vector Store
5. Activate the workflow
6. Copy the webhook URL

### Step 2: Configure Environment

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.com/webhook/chat
```

### Step 3: Test

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Look for the chat button in the bottom-right corner

3. Click and ask a question about Codai!

## 🎨 Customization Options

### Change Bot Name & Avatar

Edit `config/chat.config.ts`:

```typescript
export const chatConfig: ChatConfig = {
  n8nWebhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
  botName: 'My Custom Bot',
  botAvatar: '/my-avatar.png',
  welcomeMessage: 'Hello! How can I help you today?',
  placeholder: 'Ask me anything...'
}
```

### Change Colors

Edit `components/chat/ChatButton.module.css`:

```css
.chatButton {
  background: linear-gradient(135deg, #your-color 0%, #your-light-color 100%);
}
```

## 📱 Deploy to Production

### Vercel
```bash
vercel env add NEXT_PUBLIC_N8N_WEBHOOK_URL
vercel deploy
```

### Netlify
Add environment variable in dashboard or `netlify.toml`

## 🔧 Troubleshooting

**Chat button doesn't appear?**
- Check `.env.local` exists and has correct URL
- Restart dev server after adding env variables

**Messages not working?**
- Test N8N webhook directly with Postman
- Check browser console for errors
- Verify CORS is enabled in N8N

**Need help?**
- Read full documentation: `CHAT_ASSISTANT_GUIDE.md`
- Check N8N workflow logs
- Review browser network tab

## 🎯 Use in Another Project

Copy these folders to your new Next.js project:
```
components/chat/    → Copy entire folder
config/chat.config.ts → Copy file
```

Then import in your layout:
```typescript
import { ChatAssistant } from '@/components/chat'
import { chatConfig } from '@/config/chat.config'

// Add to your layout
<ChatAssistant config={chatConfig} />
```

That's it! The same chat assistant will work on any Next.js website! 🎉
