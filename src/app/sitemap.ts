import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://safeunfollow.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://safeunfollow.com/guide', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://safeunfollow.com/upload', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://safeunfollow.com/dashboard', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://safeunfollow.com/privacy', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: 'https://safeunfollow.com/terms', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]
}
