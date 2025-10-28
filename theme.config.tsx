import { FooterContent } from './components/Footer'

export default {
  logo: (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ marginLeft: '.5rem', fontWeight: 800 }}>Codai</span>
    </>
  ),
  project: {
    link: 'https://github.com/luckyyaduvanshiofficial/codai'
  },
  docsRepositoryBase: 'https://github.com/luckyyaduvanshiofficial/codai-docs/blob/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Codai Docs'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Official documentation for Codai - Your offline AI-powered coding assistant for students and developers. Learn to use Codai for code generation, debugging, and learning programming." />
      <meta name="author" content="Lucky Yaduvanshi Official" />
      <meta name="theme-color" content="#7c3aed" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://docs.codai.pro" />
      <meta property="og:title" content="Codai Docs - Offline AI Coding Assistant Documentation" />
      <meta property="og:description" content="Official documentation for Codai - Your offline AI-powered coding assistant for students and developers." />
      <meta property="og:image" content="/og.png" />
      <meta property="og:site_name" content="Codai Docs" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Codai Docs - Offline AI Coding Assistant" />
      <meta name="twitter:description" content="Official documentation for Codai - Your offline AI-powered coding assistant." />
      <meta name="twitter:image" content="/og.png" />
      <meta name="twitter:creator" content="@luckyyaduvanshi" />
      <meta name="apple-mobile-web-app-title" content="Codai Docs" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      <link rel="canonical" href="https://docs.codai.pro" />
    </>
  ),
  search: {
    placeholder: 'Search Codai documentation...'
  },
  editLink: {
    text: 'Edit this page on GitHub'
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  footer: {
    text: <FooterContent />
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  toc: {
    backToTop: true,
    title: 'On This Page'
  },
  primaryHue: 260,
  faviconGlyph: '🤖'
}
