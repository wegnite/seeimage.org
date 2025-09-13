import type { MetadataRoute } from 'next';
import { getServerPublicBaseUrl } from '@/lib/urls/server';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const resolved = await getServerPublicBaseUrl();
  const base = /localhost(:\d+)?$/.test(new URL(resolved).host)
    ? 'https://seeimage.org'
    : resolved;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/_next/*', '/settings/*', '/dashboard/*'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
