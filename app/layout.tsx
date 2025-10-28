import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import { FooterContent } from '../components/Footer'
import { ChatClientWrapper } from '../components/ChatClientWrapper'

export const metadata = {
  metadataBase: new URL('https://docs.codai.pro'),
  title: {
    template: '%s – Codai Docs',
    default: 'Codai Docs - Offline AI Coding Assistant Documentation'
  },
  description: 'Official documentation for Codai - Your offline AI-powered coding assistant for students and developers. Learn to use Codai for code generation, debugging, and learning programming.',
  keywords: ['Codai', 'Codai Docs', 'CodaiPro', 'Codai.pro', 'AI coding assistant', 'offline AI', 'coding help', 'programming assistant', 'student coding tool', 'AI code generator', 'offline code assistant', 'learn programming', 'code debugging', 'AI developer tool'],
  authors: [{ name: 'Lucky Yaduvanshi Official', url: 'https://luckyyaduvanshiofficial.github.io' }],
  creator: 'Lucky Yaduvanshi Official',
  publisher: 'Lucky Yaduvanshi Official',
  applicationName: 'Codai Docs',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'android-chrome', url: '/android-icon-192x192.png', sizes: '192x192' },
      { rel: 'msapplication-TileImage', url: '/ms-icon-144x144.png' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docs.codai.pro',
    title: 'Codai Docs - Offline AI Coding Assistant Documentation',
    description: 'Official documentation for Codai - Your offline AI-powered coding assistant for students and developers.',
    siteName: 'Codai Docs',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Codai - Offline AI Coding Assistant'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codai Docs - Offline AI Coding Assistant',
    description: 'Official documentation for Codai - Your offline AI-powered coding assistant.',
    images: ['/og.png'],
    creator: '@luckyyaduvanshi'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://docs.codai.pro'
  }
}

const navbar = (
  <Navbar
    logo={
      <>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.3"/>
          <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{ marginLeft: '.5rem', fontWeight: 800 }}>Codai</span>
      </>
    }
    projectLink="https://github.com/luckyyaduvanshiofficial/codai"
  />
)

const footer = (
  <Footer>
    <FooterContent />
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/luckyyaduvanshiofficial/codai-docs/blob/main"
          footer={footer}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            toggleButton: true
          }}
          editLink="Edit this page on GitHub"
          feedback={{
            content: 'Question? Give us feedback →',
            labels: 'feedback'
          }}
          toc={{
            backToTop: true,
            title: 'On This Page'
          }}
          search={<Search placeholder="Search Codai documentation..." />}
        >
          {children}
        </Layout>
        <ChatClientWrapper />
      </body>
    </html>
  )
}
