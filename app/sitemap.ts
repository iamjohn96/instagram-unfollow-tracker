import type { MetadataRoute } from 'next';

const BASE_URL = 'https://safeunfollow.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/upload', '/guide', '/snapshots', '/privacy', '/terms'];

  return routes.map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/upload' || route === '/guide' ? 0.8 : 0.5,
  }));
}
