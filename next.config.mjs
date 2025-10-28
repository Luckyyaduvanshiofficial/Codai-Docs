import nextra from 'nextra'

const withNextra = nextra({
  // Theme is auto-detected from package.json dependencies
})

export default withNextra({
  reactStrictMode: true,
  // Static export configuration for GitHub Pages (uncomment if needed)
  // output: 'export',
  // images: { unoptimized: true },
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false
  },
  // ESLint configuration removed - deprecated in Next.js 16
  // Use 'next lint' command or ESLint config files instead
  
  // Disable Turbopack for builds (use Webpack for stability)
  turbopack: false,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['nextra', 'nextra-theme-docs'],
    // Enable Turbopack filesystem caching to reduce memory pressure (dev only)
    turbopackFileSystemCacheForDev: true,
  },
  // SEO and Performance improvements
  compress: true,
  generateEtags: true,
  poweredByHeader: false,
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.n8n.cloud https://*.n8n.io"
          }
        ]
      }
    ]
  }
})