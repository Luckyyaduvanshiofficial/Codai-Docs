import { MetadataRoute } from 'next'

type SitemapEntry = {
  url: string
  priority: number
  changeFrequency?: 'weekly' | 'monthly'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://docs.codai.pro'
  
  const createEntry = (
    path: string, 
    priority: number, 
    changeFrequency: 'weekly' | 'monthly' = 'monthly'
  ): MetadataRoute.Sitemap[0] => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  })
  
  const routes: SitemapEntry[] = [
    { url: '', priority: 1, changeFrequency: 'weekly' },
    { url: '/get-started', priority: 0.9 },
    { url: '/getting-started', priority: 0.9 },
    { url: '/getting-started/installation', priority: 0.8 },
    { url: '/getting-started/quick-start', priority: 0.8 },
    { url: '/getting-started/system-requirements', priority: 0.7 },
    { url: '/features', priority: 0.8 },
    { url: '/features/ai-capabilities', priority: 0.7 },
    { url: '/guides', priority: 0.7 },
    { url: '/api', priority: 0.7 },
    { url: '/themes', priority: 0.6 },
    { url: '/troubleshooting', priority: 0.7 },
  ]
  
  return routes.map(({ url, priority, changeFrequency }) => 
    createEntry(url, priority, changeFrequency)
  )
}
