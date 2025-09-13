import { websiteConfig } from '@/config/website';
import { getLocalePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { blogSource, categorySource, source } from '@/lib/source';
import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';
import { ensureTrailingSlash } from '@/lib/urls/urls';
import { getServerPublicBaseUrl } from '@/lib/urls/server';

type Href = Parameters<typeof getLocalePathname>[0]['href'];

// Public, non-auth marketing routes to include for each locale
const staticRoutes: Href[] = [
  '/',
  '/pricing',
  '/about',
  '/contact',
  '/tools',
  '/waitlist',
  '/changelog',
  '/privacy',
  '/terms',
  '/cookie',
  '/ai',
  '/ai/chat',
  '/ai/text',
  '/ai/image',
  '/ai/video',
  ...(websiteConfig.blog.enable ? ['/blog'] : []),
  ...(websiteConfig.docs.enable ? ['/docs'] : []),
];

/**
 * Dynamic sitemap powered by content sources and i18n routes
 */
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapList: MetadataRoute.Sitemap = [];
  const resolved = await getServerPublicBaseUrl();
  const base = /localhost(:\d+)?$/.test(new URL(resolved).host)
    ? 'https://seeimage.org'
    : resolved;

  // Static marketing pages per locale
  sitemapList.push(
    ...staticRoutes.flatMap((route) =>
      routing.locales.map((locale) => ({
        url: getUrl(route, locale, base),
        lastModified: new Date(),
        priority: route === '/' ? 1 : 0.8,
        changeFrequency: 'weekly' as const,
      }))
    )
  );

  // Blog: categories, pagination and posts
  if (websiteConfig.blog.enable) {
    // Category listing pages
    sitemapList.push(
      ...categorySource.getPages().flatMap((category) =>
        routing.locales.map((locale) => ({
          url: getUrl(`/blog/category/${category.slugs[0]}`, locale, base),
          lastModified: new Date(),
          priority: 0.7,
          changeFrequency: 'weekly' as const,
        }))
      )
    );

    // Blog list pagination pages per locale
    routing.locales.forEach((locale) => {
      const posts = blogSource.getPages(locale).filter((p) => p.data.published);
      const totalPages = Math.max(1, Math.ceil(posts.length / websiteConfig.blog.paginationSize));
      for (let page = 2; page <= totalPages; page++) {
        sitemapList.push({
          url: getUrl(`/blog/page/${page}`, locale, base),
          lastModified: new Date(),
          priority: 0.6,
          changeFrequency: 'weekly' as const,
        });
      }
    });

    // Category pagination pages + individual posts
    routing.locales.forEach((locale) => {
      const categories = categorySource.getPages(locale);
      categories.forEach((category) => {
        const postsInCategory = blogSource
          .getPages(locale)
          .filter((p) => p.data.published)
          .filter((p) => p.data.categories.some((c) => c === category.slugs[0]));
        const totalPages = Math.max(1, Math.ceil(postsInCategory.length / websiteConfig.blog.paginationSize));
        for (let page = 2; page <= totalPages; page++) {
          sitemapList.push({
            url: getUrl(`/blog/category/${category.slugs[0]}/page/${page}`, locale, base),
            lastModified: new Date(),
            priority: 0.5,
            changeFrequency: 'weekly' as const,
          });
        }
      });
    });

    // Individual posts
    sitemapList.push(
      ...blogSource.getPages().flatMap((post) =>
        routing.locales
          .filter((locale) => post.locale === locale)
          .map((locale) => ({
            url: getUrl(`/blog/${post.slugs.join('/')}`, locale, base),
            lastModified: new Date(),
            priority: 0.7,
            changeFrequency: 'weekly' as const,
          }))
      )
    );
  }

  // Docs pages
  if (websiteConfig.docs.enable) {
    const docsParams = source.generateParams();
    sitemapList.push(
      ...docsParams.flatMap((param) =>
        routing.locales.map((locale) => ({
          url: getUrl(`/docs/${param.slug.join('/')}`, locale, base),
          lastModified: new Date(),
          priority: 0.6,
          changeFrequency: 'weekly' as const,
        }))
      )
    );
  }

  return sitemapList;
}

function getUrl(href: Href, locale: Locale, base: string) {
  const pathname = getLocalePathname({ locale, href });
  return ensureTrailingSlash(base + pathname);
}

// Helper for alternate language entries (not used but handy for future)
function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale, ''),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, getUrl(href, cur, '')])
      ),
    },
  }));
}
