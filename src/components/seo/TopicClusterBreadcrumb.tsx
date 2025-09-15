import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StrategicInternalLink } from './StrategicInternalLink';

interface BreadcrumbItem {
  href: string;
  label: string;
  keywords?: string[];
  priority?: 'highest' | 'high' | 'medium' | 'low';
}

interface TopicClusterBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Topic Cluster Breadcrumb Navigation
 * 
 * Provides hierarchical navigation that reinforces topic cluster structure
 * and passes strategic link juice to parent pages, especially the homepage
 */
export function TopicClusterBreadcrumb({ items, className }: TopicClusterBreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm text-muted-foreground mb-6', className)} aria-label="Breadcrumb">
      <StrategicInternalLink
        href="/"
        priority="high"
        context="body"
        keywords={["ai tools", "seimage platform"]}
        className="flex items-center hover:text-foreground transition-colors"
        trackingId="breadcrumb-home"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </StrategicInternalLink>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          {index === items.length - 1 ? (
            // Current page - no link
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            // Intermediate pages - strategic links
            <StrategicInternalLink
              href={item.href}
              priority={item.priority || 'medium'}
              context="body"
              keywords={item.keywords}
              className="hover:text-foreground transition-colors"
              trackingId={`breadcrumb-${index}`}
            >
              {item.label}
            </StrategicInternalLink>
          )}
        </div>
      ))}
    </nav>
  );
}

/**
 * Pre-configured breadcrumbs for our key documentation pages
 */
export const documentationBreadcrumbs = {
  '/docs/ai-image-sharpener': [
    { href: '/docs', label: 'Documentation', keywords: ['documentation', 'guides'], priority: 'medium' as const },
    { href: '/docs/ai-image-sharpener', label: 'AI Image Sharpener Guide', keywords: ['ai image sharpener', 'enhancement guide'] }
  ],
  
  '/docs/gemini-ai-photo-prompts': [
    { href: '/docs', label: 'Documentation', keywords: ['documentation', 'guides'], priority: 'medium' as const },
    { href: '/docs/gemini-ai-photo-prompts', label: 'Gemini AI Photo Prompts', keywords: ['gemini ai prompts', 'photo prompts'] }
  ],
  
  '/docs/gemini-ai-prompts-copy-paste': [
    { href: '/docs', label: 'Documentation', keywords: ['documentation', 'guides'], priority: 'medium' as const },
    { href: '/docs/gemini-ai-prompts-copy-paste', label: 'Copy-Paste Prompts', keywords: ['copy paste prompts', 'ready to use prompts'] }
  ],
  
  '/ai/image/enhance': [
    { href: '/ai', label: 'AI Tools', keywords: ['ai tools', 'image tools'], priority: 'high' as const },
    { href: '/ai/image/enhance', label: 'Image Sharpener', keywords: ['ai image sharpener', 'enhance photos'] }
  ]
};

/**
 * Topic Cluster Helper Component
 * Shows related pages within the same cluster
 */
interface TopicClusterNavProps {
  currentPage: string;
  className?: string;
}

export function TopicClusterNav({ currentPage, className }: TopicClusterNavProps) {
  
  // Define topic clusters with strategic internal linking
  const topicClusters = {
    'ai-image-enhancement': {
      title: 'AI Image Enhancement',
      description: 'Tools and guides for enhancing photo quality',
      pages: [
        {
          href: '/ai/image/enhance',
          title: 'AI Image Sharpener Tool',
          description: 'Enhance photos instantly in your browser',
          keywords: ['ai image sharpener', 'enhance photos'],
          priority: 'highest' as const
        },
        {
          href: '/docs/ai-image-sharpener',
          title: 'Enhancement Guide',
          description: 'Complete tutorial and best practices',
          keywords: ['image enhancement guide', 'ai sharpening tutorial'],
          priority: 'high' as const
        }
      ]
    },
    
    'gemini-ai-prompts': {
      title: 'Gemini AI Prompts',
      description: 'Master AI photo generation with Gemini',
      pages: [
        {
          href: '/docs/gemini-ai-photo-prompts',
          title: 'Complete Prompts Guide',
          description: 'Master prompt engineering and techniques',
          keywords: ['gemini ai photo prompts', 'prompt engineering'],
          priority: 'highest' as const
        },
        {
          href: '/docs/gemini-ai-prompts-copy-paste',
          title: '100+ Ready Templates',
          description: 'Copy-paste prompts for instant results',
          keywords: ['copy paste prompts', 'gemini templates'],
          priority: 'high' as const
        }
      ]
    }
  };

  // Determine which cluster the current page belongs to
  let activeCluster = null;
  let currentPageIndex = -1;
  
  for (const [key, cluster] of Object.entries(topicClusters)) {
    const pageIndex = cluster.pages.findIndex(page => page.href === currentPage);
    if (pageIndex !== -1) {
      activeCluster = cluster;
      currentPageIndex = pageIndex;
      break;
    }
  }

  if (!activeCluster) return null;

  return (
    <aside className={cn('space-y-4 p-6 bg-muted/30 rounded-lg border', className)}>
      <div>
        <h3 className="font-semibold text-lg mb-2">{activeCluster.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{activeCluster.description}</p>
      </div>
      
      <div className="space-y-3">
        {activeCluster.pages.map((page, index) => (
          <div
            key={page.href}
            className={cn(
              'p-3 rounded-md transition-colors',
              currentPageIndex === index
                ? 'bg-primary/10 border border-primary/20'
                : 'hover:bg-muted/50'
            )}
          >
            {currentPageIndex === index ? (
              <div>
                <div className="font-medium text-primary">{page.title}</div>
                <div className="text-sm text-muted-foreground">{page.description}</div>
              </div>
            ) : (
              <StrategicInternalLink
                href={page.href}
                priority={page.priority}
                context="sidebar"
                keywords={page.keywords}
                className="block space-y-1"
                trackingId={`cluster-nav-${index}`}
              >
                <div className="font-medium hover:text-primary transition-colors">{page.title}</div>
                <div className="text-sm text-muted-foreground">{page.description}</div>
              </StrategicInternalLink>
            )}
          </div>
        ))}
      </div>
      
      {/* Link back to main platform */}
      <div className="pt-4 border-t">
        <StrategicInternalLink
          href="/"
          priority="high"
          context="sidebar"
          keywords={["ai tools", "seimage platform"]}
          className="text-sm font-medium hover:text-primary transition-colors"
          trackingId="cluster-nav-home"
        >
          ← Explore All AI Tools
        </StrategicInternalLink>
      </div>
    </aside>
  );
}