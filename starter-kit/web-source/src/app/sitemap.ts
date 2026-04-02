import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://nexus.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/product',
    '/pricing',
    '/customers',
    '/faq',
    '/resources',
    '/login',
  ];

  const now = new Date();

  const staticSitemap = routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In production, you would map over dynamic pages fetched from the CMS:
  // const pages = await getPages();
  // const dynamicSitemap = pages.map((page) => ({
  //   url: `${BASE_URL}/${page.slug}`,
  //   lastModified: new Date(page.updatedAt),
  //   changeFrequency: 'weekly',
  //   priority: 0.7,
  // }));

  return [...staticSitemap];
}
