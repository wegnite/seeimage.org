import { websiteConfig } from '@/config/website';
import { getLocalePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { blogSource, categorySource, source } from '@/lib/source';
import type { MetadataRoute } from 'next';
import type { Locale } from 'next-intl';
import { ensureTrailingSlash } from '@/lib/urls/urls';
import { getServerPublicBaseUrl } from '@/lib/urls/server';

type Href = Parameters<typeof getLocalePathname>[0]['href'];

/**
 * 静态营销页面路由 - 每个语言环境都会包含这些页面
 * 包含核心业务页面和AI工具页面，优先级较高
 */
const staticRoutes: Href[] = [
  '/',                    // 首页 - 最高优先级
  '/pricing',            // 定价页面
  '/about',              // 关于我们
  '/contact',            // 联系我们
  '/tools',              // 工具页面
  '/waitlist',           // 等待列表
  '/changelog',          // 更新日志
  '/privacy',            // 隐私政策
  '/terms',              // 服务条款
  '/cookie',             // Cookie政策
  '/ai',                 // AI工具总览
  '/ai/chat',            // AI聊天
  '/ai/text',            // AI文本处理
  '/ai/image',           // AI图像工具
  '/ai/image/enhance',   // AI图像增强 - 核心功能
  '/ai/video',           // AI视频处理
  ...(websiteConfig.blog.enable ? ['/blog'] : []),  // 博客首页（如果启用）
  ...(websiteConfig.docs.enable ? ['/docs'] : []),  // 文档首页（如果启用）
];

/**
 * 动态站点地图生成器
 * 基于内容源和国际化路由自动生成，过滤低价值页面以优化SEO效果
 */
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapList: MetadataRoute.Sitemap = [];
  const resolved = await getServerPublicBaseUrl();
  // 本地开发环境使用生产域名，确保sitemap URL正确
  const base = /localhost(:\d+)?$/.test(new URL(resolved).host)
    ? 'https://seeimage.org'
    : resolved;

  /**
   * 1. 静态营销页面 - 为每种语言生成核心页面
   * 优先级：首页=1.0，其他核心页面=0.8
   */
  sitemapList.push(
    ...staticRoutes.flatMap((route) =>
      routing.locales.map((locale) => ({
        url: getUrl(route, locale, base),
        lastModified: new Date(),
        priority: route === '/' ? 1 : 0.8,  // 首页最高优先级
        changeFrequency: 'weekly' as const,
      }))
    )
  );

  /**
   * 2. 博客内容 - 仅在内容充足时包含分类和分页
   * 优化策略：避免生成低价值的分页页面，优先个人文章页面
   */
  if (websiteConfig.blog.enable) {
    const allPosts = blogSource.getPages().filter((p) => p.data.published);
    
    // 仅在有足够文章时才添加分类页面（≥6篇文章）
    if (allPosts.length >= 6) {
      sitemapList.push(
        ...categorySource.getPages().flatMap((category) =>
          routing.locales.map((locale) => ({
            url: getUrl(`/blog/category/${category.slugs[0]}`, locale, base),
            lastModified: new Date(),
            priority: 0.7,  // 分类页面中等优先级
            changeFrequency: 'weekly' as const,
          }))
        )
      );
    }

    // 仅在文章很多时才添加分页页面（>12篇），且限制最多5页
    if (allPosts.length > 12) {
      routing.locales.forEach((locale) => {
        const posts = blogSource.getPages(locale).filter((p) => p.data.published);
        const totalPages = Math.max(1, Math.ceil(posts.length / websiteConfig.blog.paginationSize));
        for (let page = 2; page <= Math.min(totalPages, 5); page++) { 
          sitemapList.push({
            url: getUrl(`/blog/page/${page}`, locale, base),
            lastModified: new Date(),
            priority: 0.5,  // 分页页面较低优先级
            changeFrequency: 'weekly' as const,
          });
        }
      });
    }

    // 个人文章页面 - 高价值内容，优先级较高
    sitemapList.push(
      ...allPosts.flatMap((post) =>
        routing.locales
          .filter((locale) => post.locale === locale)
          .map((locale) => ({
            url: getUrl(`/blog/${post.slugs.join('/')}`, locale, base),
            lastModified: new Date(),
            priority: 0.8,  // 个人文章页面高优先级
            changeFrequency: 'weekly' as const,
          }))
      )
    );
  }

  // Docs pages (high-value only)
  if (websiteConfig.docs.enable) {
    const docsParams = source.generateParams();
    const highValueDocPages = new Set([
      'ai-image-sharpener',
      'gemini-ai-photo-prompts', 
      'gemini-ai-prompts-copy-paste',
      'what-is-fumadocs',
      'manual-installation',
      'internationalization',
      'search',
      'theme',
      'customisation',
      'markdown'
    ]);
    
    // Filter for high-value docs and remove duplicates
    const uniqueUrls = new Set<string>();
    docsParams.forEach((param) => {
      const slug = param.slug.join('/');
      const isHighValue = highValueDocPages.has(slug) || 
                         slug === '' || // root docs page
                         slug.split('/').some(part => highValueDocPages.has(part));
      
      if (isHighValue) {
        routing.locales.forEach((locale) => {
          const url = getUrl(`/docs/${slug}`, locale, base);
          if (!uniqueUrls.has(url)) {
            uniqueUrls.add(url);
            sitemapList.push({
              url,
              lastModified: new Date(),
              priority: slug === '' ? 0.8 : 0.7, // Higher priority for docs root
              changeFrequency: 'weekly' as const,
            });
          }
        });
      }
    });
  }

  return sitemapList;
}

function getUrl(href: Href, locale: Locale, base: string) {
  const pathname = getLocalePathname({ locale, href });
  return ensureTrailingSlash(base + pathname);
}

