import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StrategicInternalLink } from '@/components/seo/StrategicInternalLink';
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Download, 
  Palette, 
  Camera,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const showcaseItems = [
  {
    title: "Before & After Gallery",
    description: "See the dramatic improvements our AI image sharpener delivers",
    items: [
      {
        category: "Portrait Photography",
        improvement: "85% clarity increase",
        description: "Professional headshots with enhanced facial details"
      },
      {
        category: "Product Photography", 
        improvement: "92% detail enhancement",
        description: "E-commerce images with crystal-clear product textures"
      },
      {
        category: "Landscape Photos",
        improvement: "78% sharpness boost",
        description: "Nature photography with enhanced fine details"
      },
      {
        category: "Social Media Content",
        improvement: "89% engagement boost",
        description: "Instagram-ready images with professional quality"
      }
    ]
  }
];

const processingModes = [
  {
    name: "Fast Mode",
    icon: Zap,
    time: "1-3 seconds",
    description: "Quick enhancement for social media and web use",
    features: ["Basic sharpening", "Automatic optimization", "Web-ready output"],
    badge: "Most Popular"
  },
  {
    name: "Quality Mode", 
    icon: Sparkles,
    time: "3-8 seconds",
    description: "Balanced quality and speed for professional work",
    features: ["Enhanced detail recovery", "Noise reduction", "High-quality output"],
    badge: "Recommended"
  },
  {
    name: "Professional Mode",
    icon: Camera,
    time: "5-12 seconds", 
    description: "Maximum quality for print and high-end applications",
    features: ["Maximum detail enhancement", "Edge preservation", "Print-ready quality"],
    badge: "Best Quality"
  }
];

const stats = [
  {
    icon: Users,
    value: "50,000+",
    label: "Images Enhanced",
    description: "Professional results delivered"
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "User Satisfaction",
    description: "Based on user feedback"
  },
  {
    icon: Zap,
    value: "3 seconds",
    label: "Average Process Time",
    description: "Lightning-fast results"
  },
  {
    icon: Shield,
    value: "100%",
    label: "Privacy Protected",
    description: "No data collection"
  }
];

const useCases = [
  {
    icon: Camera,
    title: "Content Creators",
    description: "Perfect Instagram and TikTok content",
    benefits: ["Viral-ready quality", "Consistent branding", "Mobile optimized"],
    cta: "Enhance Social Content",
    href: "/ai/image/enhance"
  },
  {
    icon: Palette,
    title: "AI Art Enthusiasts", 
    description: "Perfect your AI-generated images",
    benefits: ["Gemini AI integration", "Prompt optimization", "Professional finishing"],
    cta: "Learn AI Prompts",
    href: "/docs/gemini-ai-photo-prompts"
  },
  {
    icon: TrendingUp,
    title: "Business Professionals",
    description: "Professional marketing materials",
    benefits: ["Brand consistency", "Client-ready quality", "Cost-effective"],
    cta: "Try Business Tools",
    href: "/ai/image/enhance"
  }
];

export function AIImageShowcase() {
  return (
    <div className="space-y-16">
      {/* Processing Modes */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Choose Your Enhancement Mode</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Optimized processing modes for different needs and time constraints
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {processingModes.map((mode, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {mode.badge && (
                <Badge className="absolute top-4 right-4 z-10">
                  {mode.badge}
                </Badge>
              )}
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <mode.icon className="size-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{mode.name}</h3>
                    <p className="text-sm text-muted-foreground">{mode.time}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground">{mode.description}</p>
                
                <ul className="space-y-2">
                  {mode.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-muted/30 rounded-lg p-8 md:p-12">
        <div className="text-center space-y-6 mb-10">
          <h2 className="text-3xl font-bold">Trusted by Professionals Worldwide</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results from real users across industries and creative fields
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit">
                <stat.icon className="size-8 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="font-semibold">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Perfect Solution for Every Creator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tailored workflows for different creative needs and professional requirements
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 space-y-4 h-full flex flex-col">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <useCase.icon className="size-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{useCase.title}</h3>
                </div>
                
                <p className="text-muted-foreground flex-grow">{useCase.description}</p>
                
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <StrategicInternalLink
                  href={useCase.href}
                  priority={index === 0 ? "highest" : "high"}
                  context="body"
                  keywords={useCase.href.includes('enhance') ? 
                    ['ai image sharpener', 'enhance photos'] : 
                    ['gemini ai prompts', 'ai photo generation']
                  }
                  className="block"
                >
                  <Button className="w-full mt-auto">
                    {useCase.cta}
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </StrategicInternalLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Showcase Gallery Preview */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">See the Difference</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dramatic improvements across different types of photography and content
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems[0].items.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{item.improvement}</Badge>
                  <Sparkles className="size-4 text-primary" />
                </div>
                <h3 className="font-semibold">{item.category}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <StrategicInternalLink
            href="/ai/image/enhance"
            priority="high"
            context="cta"
            keywords={['ai image sharpener', 'try now']}
          >
            <Button size="lg">
              Try It Yourself
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </StrategicInternalLink>
        </div>
      </div>
    </div>
  );
}

export default AIImageShowcase;