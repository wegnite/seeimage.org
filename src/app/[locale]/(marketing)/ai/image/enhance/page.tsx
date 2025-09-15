import { SharpenerPlayground } from '@/ai/sharpener/components/SharpenerPlayground';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ImageIcon, Sparkles, Shield, Zap, CheckCircle, Star, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StrategicInternalLink } from '@/components/seo/StrategicInternalLink';
import { TopicClusterBreadcrumb, documentationBreadcrumbs } from '@/components/seo/TopicClusterBreadcrumb';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  
  return constructMetadata({
    title: `AI Image Sharpener - Enhance Blurry Photos Instantly | ${t('title')}`,
    description: 'Transform blurry images into crystal-clear photos with our AI-powered sharpener. 100% browser-based, no uploads required. Professional results in seconds.',
    canonicalUrl: getUrlWithLocale('/ai/image/enhance', locale),
  });
}

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Enhancement',
    description: 'Advanced algorithms analyze and enhance image details automatically'
  },
  {
    icon: Shield,
    title: '100% Private',
    description: 'All processing happens in your browser - no uploads, no data collection'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'See improvements in seconds with real-time processing'
  }
];

const useCases = [
  {
    title: 'Content Creators',
    description: 'Perfect for social media posts, blog images, and marketing materials',
    benefits: ['Instagram-ready quality', 'Professional thumbnails', 'Brand consistency']
  },
  {
    title: 'Photographers',
    description: 'Quick fixes for camera shake, motion blur, and focus issues',
    benefits: ['Rescue blurry shots', 'Batch processing', 'Professional workflow']
  },
  {
    title: 'E-commerce',
    description: 'Enhance product photos to show fine details and textures',
    benefits: ['Higher conversion rates', 'Better product visibility', 'Customer trust']
  },
  {
    title: 'Real Estate',
    description: 'Sharpen property photos to highlight architectural details',
    benefits: ['More attractive listings', 'Professional appearance', 'Faster sales']
  }
];

const testimonials = [
  {
    name: 'Alex Thompson',
    role: 'Instagram Influencer',
    content: 'This tool saved my vacation photos! The AI sharpening made blurry shots look professional.',
    rating: 5,
    avatar: '👨‍💼'
  },
  {
    name: 'Maria Garcia',
    role: 'E-commerce Manager',
    content: 'Our product photos look so much better now. Sales increased by 23% after using enhanced images.',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    name: 'David Chen',
    role: 'Real Estate Agent',
    content: 'Perfect for property photos. Clients love the crisp, clear images in our listings.',
    rating: 5,
    avatar: '👨‍🏢'
  }
];

export default async function EnhancePage() {
  const breadcrumbItems = documentationBreadcrumbs['/ai/image/enhance'] || [
    { href: '/ai', label: 'AI Tools', keywords: ['ai tools', 'artificial intelligence'], priority: 'high' as const },
    { href: '/ai/image', label: 'Image Tools', keywords: ['ai image tools', 'photo editor'], priority: 'medium' as const },
    { href: '/ai/image/enhance', label: 'Image Sharpener', keywords: ['ai image sharpener', 'enhance photos'] }
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Breadcrumb Navigation */}
        <TopicClusterBreadcrumb items={breadcrumbItems} />

        {/* Hero Section */}
        <div className="text-center space-y-8 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <ImageIcon className="size-4" />
            AI Image Sharpener
            <Badge variant="secondary" className="ml-2">50K+ Enhanced</Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Transform Blurry Photos into
              <span className="text-primary block">Crystal-Clear Images</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional AI-powered image enhancement that runs entirely in your browser. 
              No uploads, no registration, no cost. Perfect results in seconds.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-500" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-500" />
              <span>No Data Collection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="size-4 text-green-500" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>

        {/* Main Tool */}
        <div className="max-w-6xl mx-auto mb-16">
          <SharpenerPlayground />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <feature.icon className="size-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Use Cases Section */}
        <div className="space-y-12 mb-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Perfect for Every Professional</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by content creators, photographers, and businesses worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="size-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-12 mb-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Loved by 50,000+ Users</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what professionals are saying about our AI image sharpener
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
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-muted/50 rounded-lg p-8 md:p-12 mb-16">
          <div className="text-center space-y-6 mb-10">
            <h2 className="text-3xl font-bold">How Our AI Enhancement Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced edge detection and detail enhancement algorithms process your images locally
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto">
                1
              </div>
              <h3 className="font-semibold">Upload Image</h3>
              <p className="text-sm text-muted-foreground">Select your blurry or low-quality image</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto">
                2
              </div>
              <h3 className="font-semibold">AI Analysis</h3>
              <p className="text-sm text-muted-foreground">Our AI detects edges and texture patterns</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto">
                3
              </div>
              <h3 className="font-semibold">Enhancement</h3>
              <p className="text-sm text-muted-foreground">Advanced algorithms sharpen details</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto">
                4
              </div>
              <h3 className="font-semibold">Download</h3>
              <p className="text-sm text-muted-foreground">Get your enhanced image instantly</p>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <div className="space-y-8 mb-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Complete Your AI Workflow</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combine our AI tools for the ultimate content creation experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Sparkles className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Generate AI Images</h3>
                      <p className="text-sm text-muted-foreground">Create stunning photos with Gemini AI</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="size-4 text-green-500" />
                      <span>50+ Professional prompts</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="size-4 text-green-500" />
                      <span>Character consistency</span>
                    </li>
                  </ul>
                  <StrategicInternalLink
                    href="/docs/gemini-ai-photo-prompts"
                    priority="high"
                    context="body"
                    keywords={['gemini ai prompts', 'ai photo generation']}
                  >
                    <Button variant="outline" className="w-full">
                      Learn Gemini Prompts
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </StrategicInternalLink>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Zap className="size-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Ready-to-Use Prompts</h3>
                      <p className="text-sm text-muted-foreground">Copy, paste, create viral content</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="size-4 text-green-500" />
                      <span>100+ tested templates</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="size-4 text-green-500" />
                      <span>Instant viral results</span>
                    </li>
                  </ul>
                  <StrategicInternalLink
                    href="/docs/gemini-ai-prompts-copy-paste"
                    priority="high"
                    context="body"
                    keywords={['copy paste prompts', 'viral ai prompts']}
                  >
                    <Button variant="outline" className="w-full">
                      Get Instant Prompts
                      <ArrowRight className="size-4 ml-2" />
                    </Button>
                  </StrategicInternalLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-8 bg-primary/5 rounded-lg p-8 md:p-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Ready to Enhance Your Images?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join over 50,000 professionals using our AI image sharpener for perfect results every time
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => document.querySelector('#image-upload')?.scrollIntoView({ behavior: 'smooth' })}>
              <Sparkles className="size-5 mr-2" />
              Start Enhancing Now
            </Button>
            
            <StrategicInternalLink
              href="/docs/ai-image-sharpener"
              priority="medium"
              context="cta"
              keywords={['image enhancement guide', 'ai sharpening tutorial']}
            >
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Users className="size-5 mr-2" />
                Read the Guide
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
              href="/ai/image"
              priority="medium"
              context="footer"
              keywords={['ai image tools', 'photo editor']}
              className="text-muted-foreground hover:text-foreground"
            >
              🖼️ Image Tools
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

