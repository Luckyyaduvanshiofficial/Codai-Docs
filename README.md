# 📚 Codai Documentation Website

> Official documentation for Codai - The offline AI-powered coding assistant for students and developers.

[![Built with Nextra](https://img.shields.io/badge/Built%20with-Nextra-blue)](https://nextra.site)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 About

This repository contains the complete documentation website for **Codai** (formerly CodaiPro), built with [Nextra](https://nextra.site) - a powerful documentation framework based on Next.js.

**Live Documentation:** [docs.codai.pro](https://docs.codai.pro)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 18.0 or higher
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/luckyyaduvanshiofficial/codai-docs.git
cd codai-docs

# Install dependencies
npm install

# Run development server
npm run dev
```

The documentation site will be available at `http://localhost:3000`

---

## 📝 Documentation Structure

### 🚀 Getting Started
- Installation Guide
- Quick Start Guide  
- First Steps with Codai
- System Requirements

### ✨ Features
- AI Capabilities Overview
- Code Generation
- Debugging & Error Fixing
- Code Explanation
- Multi-Language Support
- Code Optimization
- Customization Options

### 📖 Guides  
- For Students
- For Developers
- Lab Environments
- Coding Competitions
- Learning Programming
- Project Development

### 🐛 Troubleshooting
- Common Issues
- FAQs
- Error Messages
- Performance Tuning

### 🔧 Advanced
- Configuration
- Building from Source
- Contributing Guide
- Security & Privacy
- Architecture

### 📡 API Reference
- API Endpoints
- AI Models
- Configuration API

---

## 🛠️ Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server  
npm run start
```

---

## 💬 Chat Assistant (ENHANCED!)

This documentation includes a **production-ready, enterprise-grade AI chat assistant** that helps users find solutions in real-time!

### ✨ Features
- 🤖 **N8N-Powered RAG** - Retrieval-Augmented Generation for accurate answers
- 📚 **Context-Aware** - Searches through all Codai documentation
- 💬 **Real-time Chat** - Instant responses with conversation history
- 🎨 **Beautiful UI** - Modern, responsive design with dark mode
- 🔄 **Reusable** - Easy to integrate into any Next.js website
- 🛡️ **Error Resilient** - Auto-retry with exponential backoff
- ⚡ **Rate Limited** - Prevents abuse with configurable limits
- 💾 **Persistent** - Saves chat history across page refreshes
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 🔒 **Secure** - CSP headers, input validation, CORS ready
- 📊 **Analytics Ready** - Built-in callback hooks for tracking

### 🚀 Recent Improvements (Based on Senior Developer Feedback)
- ✅ **Error Boundary** - Graceful error handling with retry capability
- ✅ **Rate Limiting** - Client-side protection (10 req/min default)
- ✅ **Message Persistence** - localStorage integration with configurable limits
- ✅ **Enhanced Accessibility** - Full keyboard navigation, ARIA labels, screen reader support
- ✅ **Better UX** - Loading spinners, typing indicators, error banners
- ✅ **Security Headers** - CSP, XSS protection, frame options
- ✅ **Analytics Hooks** - Track messages, responses, and errors
- ✅ **Input Validation** - Message length limits, type checking
- ✅ **Retry Logic** - Automatic retry with exponential backoff

### Quick Setup
1. Set up N8N workflow (see `n8n-workflow-example.json`)
2. Add environment variable:
   ```env
   NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n.com/webhook/chat
   ```
3. Restart dev server - chat button appears automatically!

### 📖 Documentation
- **Full Guide**: [CHAT_ASSISTANT_GUIDE.md](CHAT_ASSISTANT_GUIDE.md) - Complete integration guide
- **Implementation**: [CHAT_IMPLEMENTATION.md](CHAT_IMPLEMENTATION.md) - All improvements explained
- **Quick Reference**: [CHAT_QUICK_REFERENCE.md](CHAT_QUICK_REFERENCE.md) - Fast lookup guide
- **Comparison**: [CHAT_SOLUTION_COMPARISON.md](CHAT_SOLUTION_COMPARISON.md) - Why this solution?
- **Quick Start**: [QUICK_SETUP.md](QUICK_SETUP.md) - 5-minute setup

### 🎯 Use Cases
- ✅ Documentation search and Q&A
- ✅ Real-time user support
- ✅ Code examples and explanations
- ✅ Troubleshooting assistance
- ✅ Interactive learning tool

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🔗 Links

- **Main Project**: [github.com/luckyyaduvanshiofficial/codai](https://github.com/luckyyaduvanshiofficial/codai)
- **Website**: [github.com/luckyyaduvanshiofficial/codai-web](https://github.com/luckyyaduvanshiofficial/codai-web)
- **Documentation**: [docs.codai.pro](https://docs.codai.pro)
- **Official Site**: [codai.pro](https://codai.pro)

---

## 📊 SEO Features

This documentation site includes comprehensive SEO optimization:

- ✅ **Favicon Support** - Multiple sizes and formats for all devices
- ✅ **Meta Tags** - Complete OpenGraph and Twitter Card metadata
- ✅ **Sitemap** - Auto-generated XML sitemap for search engines
- ✅ **Robots.txt** - Proper crawling instructions
- ✅ **PWA Manifest** - Progressive Web App support
- ✅ **Canonical URLs** - Proper URL canonicalization
- ✅ **Structured Data** - Rich snippets support
- ✅ **Mobile Optimized** - Responsive and mobile-friendly
- ✅ **Performance** - Optimized images and fast loading

### Keywords
Codai, Codai Docs, CodaiPro, Codai.pro, AI coding assistant, offline AI, coding help, programming assistant, student coding tool, AI code generator, offline code assistant, learn programming, code debugging, AI developer tool

---

<div align="center">

**Made with ❤️ by [Lucky Yaduvanshi Official](https://luckyyaduvanshiofficial.github.io)**

⭐ Star this repo if you find it helpful!

</div>
