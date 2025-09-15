import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import { ImageIcon, Sparkles, Palette, Zap, ArrowRight, Star, Users, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StrategicInternalLink } from '@/components/seo/StrategicInternalLink';
import { TopicClusterBreadcrumb } from '@/components/seo/TopicClusterBreadcrumb';
import { AIImageFAQWrapper } from '@/components/ai-image/AIImageFAQWrapper';
import AIImageShowcase from '@/components/ai-image/AIImageShowcase';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return constructMetadata({
    title: `AI Image Tools - Professional Photo Enhancement & Generation | ${t('title')}`,
    description: 'Complete suite of AI-powered image tools. Enhance photos, sharpen images, and generate stunning visuals. Free browser-based tools with no uploads required.',
    canonicalUrl: getUrlWithLocale('/ai/image', locale),
  });
}

const aiImageTools = [
  {
    href: '/ai/image/enhance',
    title: 'AI Image Sharpener',
    description: 'Transform blurry photos into crystal-clear images instantly',
    features: ['100% Browser-based', 'No uploads required', 'Professional quality', 'Instant results'],
    icon: Sparkles,
    badge: 'Most Popular',
    stats: '50K+ images enhanced',
    priority: 'highest' as const,
    keywords: ['ai image sharpener', 'enhance photos', 'sharpen images']
  },
  {
    href: '/docs/gemini-ai-photo-prompts',
    title: 'Gemini AI Photo Prompts',
    description: 'Master AI photo generation with 50+ proven prompt templates',
    features: ['50+ Templates', 'Professional techniques', 'Character consistency', 'Advanced editing'],
    icon: Palette,
    badge: 'Complete Guide',
    stats: '10K+ creators trained',
    priority: 'high' as const,
    keywords: ['gemini ai prompts', 'ai photo generation', 'nano banana']
  },
  {
    href: '/docs/gemini-ai-prompts-copy-paste',
    title: '100+ Ready-to-Use Prompts',
    description: 'Copy, paste, and create viral content with tested AI prompts',
    features: ['100+ Prompts', 'Copy-paste ready', 'Viral templates', 'Instant results'],
    icon: Zap,
    badge: 'Instant Access',
    stats: '25K+ prompts copied',
    priority: 'high' as const,
    keywords: ['copy paste prompts', 'viral ai prompts', 'instant prompts']
  }
];

const features = [
  'Professional-grade AI enhancement',
  'No software installation required',
  'Privacy-first (no data collection)',
  'Multiple output formats',
  'Batch processing support',
  'Expert prompt libraries'
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Content Creator',
    content: 'The AI image sharpener saved me hours of editing. My Instagram posts look professional now!',
    rating: 5
  },
  {
    name: 'Mike Rodriguez',
    role: 'Photographer',
    content: 'Amazing tool for quick fixes. The Gemini prompts guide taught me techniques I never knew existed.',
    rating: 5
  },
  {
    name: 'Emma Wilson',
    role: 'Marketing Manager',
    content: 'We use these tools daily for our campaigns. The copy-paste prompts are incredibly time-saving.',
    rating: 5
  }
];

export default async function AIImagePage() {
  const breadcrumbItems = [
    { href: '/ai', label: 'AI Tools', keywords: ['ai tools', 'artificial intelligence'], priority: 'high' as const },
    { href: '/ai/image', label: 'Image Tools', keywords: ['ai image tools', 'photo editor'] }
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumb Navigation */}
        <TopicClusterBreadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <ImageIcon className="size-4" />
            AI-Powered Image Tools
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Professional AI Image
              <span className="text-primary block">Enhancement Suite</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your photos with cutting-edge AI technology. Enhance quality, generate stunning visuals, 
              and master prompt engineering with our comprehensive toolkit.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StrategicInternalLink
              href="/ai/image/enhance"
              priority="highest"
              context="hero"
              keywords={['ai image sharpener', 'enhance photos']}
            >
              <Button size="lg" className="text-lg px-8">
                <Sparkles className="size-5 mr-2" />
                Try AI Image Sharpener
              </Button>
            </StrategicInternalLink>
            
            <StrategicInternalLink
              href="/docs/gemini-ai-photo-prompts"
              priority="high"
              context="hero"
              keywords={['gemini ai prompts', 'ai photo guide']}
            >
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Palette className="size-5 mr-2" />
                Master AI Prompts
              </Button>
            </StrategicInternalLink>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-500" />
              <span>100% Free Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-500" />
              <span>No Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-500" />
              <span>Privacy First</span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="space-y-12 mb-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Complete AI Image Toolkit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for professional image editing and AI-powered content creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiImageTools.map((tool, index) => (
              <Card key={tool.href} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                {tool.badge && (
                  <Badge className="absolute top-4 right-4 z-10">
                    {tool.badge}
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <tool.icon className="size-6 text-primary" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tool.stats}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="size-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <StrategicInternalLink
                    href={tool.href}
                    priority={tool.priority}
                    context="body"
                    keywords={tool.keywords}
                    className="block"
                  >
                    <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                      Get Started
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </StrategicInternalLink>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-muted/50 rounded-lg p-8 md:p-12 mb-16">
          <div className="text-center space-y-6 mb-10">
            <h2 className="text-3xl font-bold">Why Choose Our AI Image Tools?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with privacy, performance, and professional results in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="size-5 text-green-500 flex-shrink-0" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-12 mb-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Trusted by 100K+ Creators</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what professionals are saying about our AI image tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current text-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Image Showcase */}
        <div className="mb-16">
          <AIImageShowcase />
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <AIImageFAQWrapper />
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8 bg-primary/5 rounded-lg p-8 md:p-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ready to Transform Your Images?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators using our AI-powered tools to enhance their visual content
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <StrategicInternalLink
              href="/ai/image/enhance"
              priority="highest"
              context="cta"
              keywords={['ai image sharpener', 'enhance photos']}
            >
              <Button size="lg" className="text-lg px-8">
                <Sparkles className="size-5 mr-2" />
                Start Enhancing Images
              </Button>
            </StrategicInternalLink>
            
            <StrategicInternalLink
              href="/"
              priority="high"
              context="cta"
              keywords={['ai tools', 'seimage platform']}
            >
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Users className="size-5 mr-2" />
                Explore All AI Tools
              </Button>
            </StrategicInternalLink>
          </div>
        </div>

        {/* Strategic Internal Links Footer */}
        <div className="mt-16 pt-8 border-t text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <StrategicInternalLink
              href="/"
              priority="high"
              context="footer"
              keywords={['ai tools', 'seimage platform']}
              className="text-muted-foreground hover:text-foreground"
            >
              🏠 All AI Tools
            </StrategicInternalLink>
            <span className="text-muted-foreground">•</span>
            <StrategicInternalLink
              href="/docs"
              priority="medium"
              context="footer"
              keywords={['documentation', 'guides']}
              className="text-muted-foreground hover:text-foreground"
            >
              📚 Documentation
            </StrategicInternalLink>
            <span className="text-muted-foreground">•</span>
            <StrategicInternalLink
              href="/docs/ai-image-sharpener"
              priority="medium"
              context="footer"
              keywords={['image enhancement guide', 'ai sharpening']}
              className="text-muted-foreground hover:text-foreground"
            >
              📖 Enhancement Guide
            </StrategicInternalLink>
            <span className="text-muted-foreground">•</span>
            <StrategicInternalLink
              href="/pricing"
              priority="low"
              context="footer"
              keywords={['pricing', 'plans']}
              className="text-muted-foreground hover:text-foreground"
            >
              💰 Pricing
            </StrategicInternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}
