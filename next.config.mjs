import nextra from 'nextra'

const withNextra = nextra({
  // Theme is auto-detected from package.json dependencies
})

export default withNextra({
  reactStrictMode: true,
  // Add any other Next.js config options here
})