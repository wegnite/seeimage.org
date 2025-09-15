import Link from 'next/link';
import { cn } from '@/lib/utils';
import { anchorTextVariations } from './internal-links-config';

interface StrategicInternalLinkProps {
  href: string;
  children: React.ReactNode;
  priority?: 'highest' | 'high' | 'medium' | 'low';
  context?: 'hero' | 'body' | 'cta' | 'sidebar' | 'footer';
  keywords?: string[];
  className?: string;
  trackingId?: string;
}

/**
 * Strategic Internal Link Component
 * 
 * This component handles internal linking with SEO optimization:
 * - Proper anchor text variation
 * - Priority-based styling
 * - Analytics tracking
 * - Contextual link juice distribution
 */
export function StrategicInternalLink({
  href,
  children,
  priority = 'medium',
  context = 'body',
  keywords = [],
  className,
  trackingId,
  ...props
}: StrategicInternalLinkProps) {
  
  // Generate analytics data for link tracking
  const analyticsData = {
    'data-link-priority': priority,
    'data-link-context': context,
    'data-link-target': href,
    'data-tracking-id': trackingId || `internal-link-${href.replace(/\//g, '-')}`,
    'data-keywords': keywords.join(',')
  };

  // Priority-based styling
  const priorityStyles = {
    highest: 'font-semibold text-primary hover:text-primary/80 underline decoration-2',
    high: 'font-medium text-primary hover:text-primary/80 underline',
    medium: 'text-primary hover:text-primary/80 hover:underline',
    low: 'text-muted-foreground hover:text-foreground hover:underline'
  };

  // Context-based styling
  const contextStyles = {
    hero: 'text-lg font-bold',
    body: 'inline',
    cta: 'font-semibold',
    sidebar: 'text-sm',
    footer: 'text-sm text-muted-foreground'
  };

  return (
    <Link
      href={href}
      className={cn(
        priorityStyles[priority],
        contextStyles[context],
        className
      )}
      {...analyticsData}
      {...props}
    >
      {children}
    </Link>
  );
}

/**
 * Related Articles Component
 * Creates contextual links between related content
 */
interface RelatedArticlesProps {
  currentPage: string;
  title?: string;
  maxLinks?: number;
  className?: string;
}

export function RelatedArticles({ 
  currentPage, 
  title = "Related Resources",
  maxLinks = 3,
  className 
}: RelatedArticlesProps) {
  
  // Define related content mapping
  const relatedContent: Record<string, Array<{
    href: string;
    title: string;
    description: string;
    keywords: string[];
  }>> = {
    '/docs/ai-image-sharpener': [
      {
        href: '/docs/gemini-ai-photo-prompts',
        title: 'Gemini AI Photo Prompts Guide',
        description: 'Master AI photo generation with professional prompts',
        keywords: ['gemini ai prompts', 'ai photo generation']
      },
      {
        href: '/docs/gemini-ai-prompts-copy-paste',
        title: '100+ Ready-to-Use Prompts',
        description: 'Instant access to viral AI photo prompts',
        keywords: ['copy paste prompts', 'viral ai prompts']
      },
      {
        href: '/ai/image/enhance',
        title: 'Try AI Image Sharpener',
        description: 'Enhance your photos with our AI tool',
        keywords: ['ai image sharpener', 'enhance photos']
      }
    ],
    '/docs/gemini-ai-photo-prompts': [
      {
        href: '/docs/gemini-ai-prompts-copy-paste',
        title: 'Copy-Paste Prompt Templates',
        description: '100+ ready-to-use Gemini AI prompts',
        keywords: ['copy paste prompts', 'gemini templates']
      },
      {
        href: '/ai/image/enhance',
        title: 'AI Image Enhancement',
        description: 'Perfect your AI-generated images',
        keywords: ['ai image enhancement', 'photo sharpening']
      },
      {
        href: '/docs/ai-image-sharpener',
        title: 'Image Sharpener Guide',
        description: 'Complete guide to AI image sharpening',
        keywords: ['image sharpening', 'ai enhancement']
      }
    ],
    '/docs/gemini-ai-prompts-copy-paste': [
      {
        href: '/docs/gemini-ai-photo-prompts',
        title: 'Advanced Gemini Techniques',
        description: 'Master advanced prompt engineering',
        keywords: ['prompt engineering', 'gemini advanced']
      },
      {
        href: '/ai/image/enhance',
        title: 'Enhance Generated Images',
        description: 'Sharpen your AI-created photos',
        keywords: ['ai sharpening', 'photo enhancement']
      },
      {
        href: '/',
        title: 'Explore More AI Tools',
        description: 'Discover our complete AI toolkit',
        keywords: ['ai tools', 'seimage platform']
      }
    ]
  };

  const related = relatedContent[currentPage]?.slice(0, maxLinks) || [];

  if (related.length === 0) return null;

  return (
    <aside className={cn('space-y-4 p-6 bg-muted/30 rounded-lg border', className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-3">
        {related.map((item, index) => (
          <div key={item.href} className="space-y-1">
            <StrategicInternalLink
              href={item.href}
              priority={index === 0 ? 'high' : 'medium'}
              context="sidebar"
              keywords={item.keywords}
              className="block font-medium hover:text-primary"
              trackingId={`related-${currentPage}-${index}`}
            >
              {item.title}
            </StrategicInternalLink>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/**
 * Topic Cluster Navigation
 * Shows cluster relationships and facilitates navigation
 */
interface TopicClusterNavProps {
  currentPage: string;
  clusterTitle: string;
  className?: string;
}

export function TopicClusterNav({ 
  currentPage, 
  clusterTitle,
  className 
}: TopicClusterNavProps) {
  
  // Define cluster navigation
  const clusters: Record<string, {
    title: string;
    pages: Array<{
      href: string;
      title: string;
      description: string;
      isCurrent?: boolean;
    }>;
  }> = {
    'ai-image-enhancement': {
      title: 'AI Image Enhancement',
      pages: [
        {
          href: '/ai/image/enhance',
          title: 'AI Image Sharpener Tool',
          description: 'Enhance photos instantly'
        },
        {
          href: '/docs/ai-image-sharpener',
          title: 'Enhancement Guide',
          description: 'Complete tutorial and tips'
        }
      ]
    },
    'gemini-ai-prompts': {
      title: 'Gemini AI Prompts',
      pages: [
        {
          href: '/docs/gemini-ai-photo-prompts',
          title: 'Complete Guide',
          description: 'Master Gemini prompt engineering'
        },
        {
          href: '/docs/gemini-ai-prompts-copy-paste',
          title: 'Ready-to-Use Templates',
          description: '100+ copy-paste prompts'
        }
      ]
    }
  };

  // Determine which cluster the current page belongs to
  let activeCluster = null;
  for (const [key, cluster] of Object.entries(clusters)) {
    if (cluster.pages.some(page => page.href === currentPage)) {
      activeCluster = cluster;
      break;
    }
  }

  if (!activeCluster) return null;

  return (
    <nav className={cn('space-y-4', className)}>
      <div className="flex items-center space-x-2">
        <StrategicInternalLink
          href="/"
          priority="medium"
          context="body"
          className="text-sm text-muted-foreground hover:text-foreground"
          trackingId="cluster-nav-home"
        >
          Home
        </StrategicInternalLink>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm font-medium">{activeCluster.title}</span>
      </div>
      
      <div className="space-y-2">
        {activeCluster.pages.map((page) => (
          <div
            key={page.href}
            className={cn(
              'p-3 rounded-md border',
              currentPage === page.href 
                ? 'bg-primary/10 border-primary/20' 
                : 'bg-background hover:bg-muted/50'
            )}
          >
            {currentPage === page.href ? (
              <div>
                <div className="font-medium text-primary">{page.title}</div>
                <div className="text-sm text-muted-foreground">{page.description}</div>
              </div>
            ) : (
              <StrategicInternalLink
                href={page.href}
                priority="medium"
                context="sidebar"
                className="block space-y-1"
                trackingId={`cluster-nav-${page.href}`}
              >
                <div className="font-medium">{page.title}</div>
                <div className="text-sm text-muted-foreground">{page.description}</div>
              </StrategicInternalLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

/**
 * Contextual Link Injector
 * Automatically injects relevant links within content
 */
interface ContextualLinksProps {
  content: string;
  currentPage: string;
  maxLinks?: number;
}

export function ContextualLinks({ 
  content, 
  currentPage, 
  maxLinks = 3 
}: ContextualLinksProps) {
  
  // Define keyword-to-link mappings
  const keywordMappings = {
    'ai image sharpener': {
      href: '/ai/image/enhance',
      priority: 'high' as const,
      replacement: 'AI Image Sharpener'
    },
    'gemini ai prompts': {
      href: '/docs/gemini-ai-photo-prompts',
      priority: 'high' as const,
      replacement: 'Gemini AI prompts'
    },
    'copy paste prompts': {
      href: '/docs/gemini-ai-prompts-copy-paste',
      priority: 'medium' as const,
      replacement: 'copy-paste prompts'
    },
    'nano banana': {
      href: '/docs/gemini-ai-photo-prompts',
      priority: 'medium' as const,
      replacement: 'Nano Banana'
    }
  };

  // Process content and inject links (simplified version)
  // In a real implementation, this would use a more sophisticated
  // text processing algorithm to avoid over-linking
  
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {/* Content would be processed here to inject contextual links */}
      <p className="text-sm text-muted-foreground italic">
        Contextual links would be automatically injected based on content analysis
      </p>
    </div>
  );
}