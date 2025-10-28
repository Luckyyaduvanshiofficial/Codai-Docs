import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    template: '%s – CodaiPro Docs',
    default: 'CodaiPro: Offline AI Coding Assistant'
  },
  description: 'CodaiPro - Your offline AI-powered coding assistant for students and developers.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ]
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
        <span style={{ marginLeft: '.5rem', fontWeight: 800 }}>CodaiPro</span>
      </>
    }
    projectLink="https://github.com/luckyyaduvanshi/codaipro"
  />
)

const footer = (
  <Footer>
    <span>
      MIT {new Date().getFullYear()} © Lucky Yaduvanshi. CodaiPro - Empowering developers worldwide.
    </span>
  </Footer>
)

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="🤖">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="og:description" content="CodaiPro - Your offline AI-powered coding assistant" />
        <meta name="og:title" content="CodaiPro: Offline AI Coding Assistant" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="apple-mobile-web-app-title" content="CodaiPro" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/luckyyaduvanshi/codaipro/blob/main"
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
          search={<Search placeholder="Search documentation..." />}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
