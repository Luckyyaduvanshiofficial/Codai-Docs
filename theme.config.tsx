export default {
  logo: (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ marginLeft: '.5rem', fontWeight: 800 }}>CodaiPro</span>
    </>
  ),
  project: {
    link: 'https://github.com/luckyyaduvanshi/codaipro'
  },
  docsRepositoryBase: 'https://github.com/luckyyaduvanshi/codaipro/blob/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – CodaiPro Docs'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="CodaiPro - Your offline AI-powered coding assistant for students and developers." />
      <meta name="og:description" content="CodaiPro - Your offline AI-powered coding assistant" />
      <meta name="og:title" content="CodaiPro: Offline AI Coding Assistant" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="apple-mobile-web-app-title" content="CodaiPro" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </>
  ),
  search: {
    placeholder: 'Search documentation...'
  },
  editLink: {
    text: 'Edit this page on GitHub'
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} © Lucky Yaduvanshi. CodaiPro - Empowering developers worldwide.
      </span>
    )
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
