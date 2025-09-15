/**
 * SEO Internal Links Configuration
 * 
 * This configuration defines the strategic internal linking structure
 * to maximize homepage authority and create effective topic clusters
 */

export interface InternalLink {
  href: string;
  anchor: string;
  priority: 'highest' | 'high' | 'medium' | 'low';
  context: string;
  keywords?: string[];
}

export interface TopicCluster {
  pillarPage: string;
  pillarKeywords: string[];
  clusterPages: {
    href: string;
    title: string;
    keywords: string[];
    linkToMain: string;
    linksToClusters: string[];
  }[];
}

/**
 * Homepage Internal Links Strategy
 * These links appear on the homepage to pass maximum authority
 */
export const homepageInternalLinks: InternalLink[] = [
  // Hero Section - Highest Priority Links
  {
    href: '/ai/image/enhance',
    anchor: 'Try AI Image Sharpener Free',
    priority: 'highest',
    context: 'hero-primary-cta',
    keywords: ['ai image sharpener', 'enhance photos', 'improve image quality']
  },
  {
    href: '/docs/gemini-ai-prompts-copy-paste',
    anchor: 'Get 100+ AI Photo Prompts',
    priority: 'highest', 
    context: 'hero-secondary-cta',
    keywords: ['gemini ai prompts', 'ai photo prompts', 'copy paste prompts']
  },

  // Tools Section - High Priority
  {
    href: '/docs/gemini-ai-photo-prompts',
    anchor: 'Master Gemini AI Photo Generation',
    priority: 'high',
    context: 'tools-section',
    keywords: ['gemini ai photo prompts', 'ai photo generation', 'nano banana']
  },
  {
    href: '/ai/image',
    anchor: 'Explore All AI Image Tools',
    priority: 'high',
    context: 'tools-section',
    keywords: ['ai image tools', 'image generator', 'photo editor']
  },

  // Features Section - Medium Priority
  {
    href: '/docs/ai-image-sharpener',
    anchor: 'Learn About AI Image Enhancement',
    priority: 'medium',
    context: 'features-section',
    keywords: ['ai image enhancement', 'photo sharpening', 'image quality']
  },
  {
    href: '/docs',
    anchor: 'Browse All Documentation',
    priority: 'medium',
    context: 'features-section',
    keywords: ['ai documentation', 'tutorials', 'guides']
  },

  // Footer Section - Low Priority but Important for Topic Clusters
  {
    href: '/pricing',
    anchor: 'View Pricing Plans',
    priority: 'low',
    context: 'footer',
    keywords: ['pricing', 'plans', 'subscription']
  },
  {
    href: '/blog',
    anchor: 'Read AI Tips & Tutorials',
    priority: 'low',
    context: 'footer',
    keywords: ['ai blog', 'tutorials', 'tips']
  }
];

/**
 * Topic Clusters Configuration
 * Defines the hub-and-spoke model for content organization
 */
export const topicClusters: TopicCluster[] = [
  // Cluster 1: AI Image Enhancement
  {
    pillarPage: '/',
    pillarKeywords: ['ai image tools', 'photo enhancement', 'image generator'],
    clusterPages: [
      {
        href: '/ai/image/enhance',
        title: 'AI Image Sharpener',
        keywords: ['ai image sharpener', 'enhance photos', 'sharpen images'],
        linkToMain: 'Discover more AI tools at SeImage',
        linksToClusters: [
          '/docs/ai-image-sharpener',
          '/docs/gemini-ai-photo-prompts'
        ]
      },
      {
        href: '/docs/ai-image-sharpener', 
        title: 'AI Image Sharpener Documentation',
        keywords: ['image sharpening guide', 'ai enhancement tutorial'],
        linkToMain: 'Try the AI Image Sharpener tool',
        linksToClusters: [
          '/ai/image/enhance',
          '/docs/gemini-ai-prompts-copy-paste'
        ]
      }
    ]
  },

  // Cluster 2: Gemini AI Prompts
  {
    pillarPage: '/',
    pillarKeywords: ['gemini ai prompts', 'ai photo prompts', 'nano banana'],
    clusterPages: [
      {
        href: '/docs/gemini-ai-photo-prompts',
        title: 'Complete Gemini AI Photo Prompts Guide',
        keywords: ['gemini ai photo prompts', 'nano banana guide', 'ai photography'],
        linkToMain: 'Explore all AI tools at SeImage',
        linksToClusters: [
          '/docs/gemini-ai-prompts-copy-paste',
          '/ai/image/enhance'
        ]
      },
      {
        href: '/docs/gemini-ai-prompts-copy-paste',
        title: '100+ Ready-to-Use Gemini Prompts',
        keywords: ['copy paste prompts', 'gemini ai prompts', 'viral ai prompts'],
        linkToMain: 'See more AI tools and features',
        linksToClusters: [
          '/docs/gemini-ai-photo-prompts',
          '/docs/ai-image-sharpener'
        ]
      }
    ]
  },

  // Cluster 3: AI Tools & Features
  {
    pillarPage: '/',
    pillarKeywords: ['ai tools', 'image generator', 'photo editor'],
    clusterPages: [
      {
        href: '/ai/image',
        title: 'AI Image Generation',
        keywords: ['ai image generator', 'create images', 'ai photo maker'],
        linkToMain: 'Discover the complete AI toolkit',
        linksToClusters: [
          '/ai/image/enhance',
          '/docs/gemini-ai-photo-prompts'
        ]
      },
      {
        href: '/ai/text',
        title: 'AI Text Analysis', 
        keywords: ['ai text analysis', 'content analysis', 'text tools'],
        linkToMain: 'Explore all AI-powered tools',
        linksToClusters: [
          '/ai/image',
          '/docs'
        ]
      }
    ]
  }
];

/**
 * Cross-Linking Matrix
 * Defines how pages should link to each other within clusters
 */
export const crossLinkingMatrix = {
  // From AI Image Sharpener docs to other pages
  '/docs/ai-image-sharpener': [
    {
      href: '/ai/image/enhance',
      anchor: 'Try the AI Image Sharpener tool',
      context: 'intro-paragraph',
      keywords: ['ai image sharpener', 'enhance photos']
    },
    {
      href: '/docs/gemini-ai-photo-prompts',
      anchor: 'Generate stunning images with Gemini AI',
      context: 'related-tools',
      keywords: ['gemini ai prompts', 'ai photo generation']
    },
    {
      href: '/docs/gemini-ai-prompts-copy-paste',
      anchor: 'Get ready-to-use AI prompts',
      context: 'quick-start',
      keywords: ['copy paste prompts', 'instant ai prompts']
    }
  ],

  // From Gemini AI Photo Prompts to other pages
  '/docs/gemini-ai-photo-prompts': [
    {
      href: '/docs/gemini-ai-prompts-copy-paste',
      anchor: 'Access 100+ copy-paste prompt templates',
      context: 'call-to-action',
      keywords: ['copy paste prompts', 'ready to use prompts']
    },
    {
      href: '/ai/image/enhance',
      anchor: 'Enhance your AI-generated images',
      context: 'optimization-section',
      keywords: ['ai image enhancement', 'improve photo quality']
    },
    {
      href: '/',
      anchor: 'Explore all AI tools at SeImage',
      context: 'footer',
      keywords: ['ai tools', 'seimage platform']
    }
  ],

  // From Copy-Paste Prompts to other pages
  '/docs/gemini-ai-prompts-copy-paste': [
    {
      href: '/docs/gemini-ai-photo-prompts',
      anchor: 'Learn advanced Gemini prompt techniques',
      context: 'advanced-section',
      keywords: ['gemini ai guide', 'prompt engineering']
    },
    {
      href: '/ai/image/enhance',
      anchor: 'Perfect your images with AI sharpening',
      context: 'post-generation',
      keywords: ['ai image sharpener', 'enhance photos']
    },
    {
      href: '/',
      anchor: 'Discover more AI-powered tools',
      context: 'conclusion',
      keywords: ['ai tools', 'photo enhancement']
    }
  ]
};

/**
 * Contextual Link Insertion Points
 * Defines where links should be inserted within content
 */
export const contextualLinkPoints = {
  // Introduction paragraphs
  intro: {
    density: 1, // 1 link per intro section
    priority: 'high',
    preferredAnchors: ['tool', 'feature', 'guide']
  },

  // Body content
  body: {
    density: 2, // 2-3 links per 1000 words
    priority: 'medium', 
    preferredAnchors: ['learn more', 'try now', 'see example']
  },

  // Conclusion/CTA sections
  conclusion: {
    density: 2, // 2 links in conclusion
    priority: 'high',
    preferredAnchors: ['get started', 'explore more', 'try free']
  }
};

/**
 * Anchor Text Optimization
 * Defines strategic anchor text variations for key pages
 */
export const anchorTextVariations = {
  '/ai/image/enhance': [
    'AI Image Sharpener',
    'enhance your photos with AI',
    'try our image enhancement tool',
    'sharpen blurry photos instantly',
    'AI-powered photo enhancement'
  ],
  
  '/docs/gemini-ai-photo-prompts': [
    'Gemini AI Photo Prompts Guide',
    'master Gemini AI prompts',
    'complete Gemini tutorial',
    'learn Gemini prompt engineering',
    'Gemini Nano Banana guide'
  ],
  
  '/docs/gemini-ai-prompts-copy-paste': [
    '100+ ready-to-use AI prompts',
    'copy-paste Gemini prompts',
    'instant AI photo prompts',
    'viral AI prompt templates',
    'Gemini prompts collection'
  ],

  '/': [
    'SeImage AI platform',
    'explore all AI tools',
    'complete AI toolkit',
    'AI-powered photo tools',
    'professional AI image tools'
  ]
};

/**
 * Link Juice Flow Optimization
 * Ensures maximum authority flows to homepage and key pages
 */
export const linkJuiceFlow = {
  // Pages that should always link back to homepage
  homepageLinkbacks: [
    '/docs/ai-image-sharpener',
    '/docs/gemini-ai-photo-prompts', 
    '/docs/gemini-ai-prompts-copy-paste',
    '/ai/image/enhance'
  ],

  // Strategic internal link ratios
  ratios: {
    homepageLinks: 0.3, // 30% of internal links point to homepage
    clusterLinks: 0.4,  // 40% link within topic clusters  
    crossClusterLinks: 0.2, // 20% link across clusters
    utilityLinks: 0.1   // 10% link to utility pages
  },

  // Priority pages for link equity distribution
  priorityPages: [
    { href: '/', weight: 40 },
    { href: '/ai/image/enhance', weight: 20 },
    { href: '/docs/gemini-ai-prompts-copy-paste', weight: 15 },
    { href: '/docs/gemini-ai-photo-prompts', weight: 15 },
    { href: '/pricing', weight: 10 }
  ]
};