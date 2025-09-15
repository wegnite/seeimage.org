import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StrategicInternalLink } from '@/components/seo/StrategicInternalLink';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'pricing' | 'features';
  relatedLinks?: Array<{
    href: string;
    text: string;
    keywords: string[];
  }>;
}

const faqData: FAQItem[] = [
  {
    question: "How does the AI Image Sharpener work?",
    answer: "Our AI Image Sharpener uses advanced edge detection algorithms and machine learning to analyze your images. It identifies blur patterns, enhances fine details, and sharpens edges while preserving natural textures. All processing happens in your browser using WebAssembly technology.",
    category: "technical",
    relatedLinks: [
      {
        href: "/docs/ai-image-sharpener",
        text: "Read technical guide",
        keywords: ["image enhancement guide", "ai sharpening tutorial"]
      }
    ]
  },
  {
    question: "Is the AI Image Sharpener completely free?",
    answer: "Yes! Our AI Image Sharpener is 100% free with no hidden costs, subscription fees, or usage limits. You can enhance unlimited images without any restrictions. We believe in providing professional-quality tools accessible to everyone.",
    category: "pricing"
  },
  {
    question: "Do you upload my images to your servers?",
    answer: "No, absolutely not. All image processing happens locally in your browser. Your photos never leave your device, ensuring complete privacy and security. This also means faster processing and zero data usage concerns.",
    category: "general"
  },
  {
    question: "What image formats are supported?",
    answer: "We support all common image formats including JPEG, PNG, WebP, and BMP. For best results, we recommend using high-quality source images. The output is provided in PNG format to maintain maximum quality.",
    category: "technical"
  },
  {
    question: "Can I use this for commercial projects?",
    answer: "Absolutely! You can use our AI Image Sharpener for any purpose including commercial projects, client work, social media, and business marketing. There are no licensing restrictions or attribution requirements.",
    category: "general"
  },
  {
    question: "How does it compare to Photoshop or other professional tools?",
    answer: "While professional software offers more manual control, our AI sharpener provides comparable results for most use cases with zero learning curve. It's perfect for quick enhancements, batch processing, and users who want professional results without complexity.",
    category: "features"
  },
  {
    question: "What's the maximum file size I can upload?",
    answer: "For optimal performance, we recommend keeping images under 20MB. The tool works best with images up to 4K resolution (4096x4096 pixels). Larger images may process slower depending on your device's capabilities.",
    category: "technical"
  },
  {
    question: "Can I enhance multiple images at once?",
    answer: "Yes! You can upload and process up to 10 images simultaneously. Each image is processed independently, allowing you to enhance entire photo sets quickly and efficiently.",
    category: "features"
  },
  {
    question: "How can I get better results from AI image generation?",
    answer: "For AI-generated images, start with detailed prompts and use our Gemini AI guides. After generation, enhance the results with our Image Sharpener for professional quality. The combination delivers exceptional results.",
    category: "features",
    relatedLinks: [
      {
        href: "/docs/gemini-ai-photo-prompts",
        text: "Master Gemini AI prompts",
        keywords: ["gemini ai prompts", "ai photo generation"]
      },
      {
        href: "/docs/gemini-ai-prompts-copy-paste",
        text: "Get ready-to-use templates",
        keywords: ["copy paste prompts", "instant prompts"]
      }
    ]
  },
  {
    question: "What devices and browsers are supported?",
    answer: "Our tools work on all modern browsers including Chrome, Firefox, Safari, and Edge. They're optimized for both desktop and mobile devices. For the best performance, we recommend using a desktop browser with sufficient RAM.",
    category: "technical"
  }
];

const categoryColors = {
  general: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300',
  technical: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-300', 
  pricing: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-300',
  features: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-300'
};

const categoryLabels = {
  general: 'General',
  technical: 'Technical',
  pricing: 'Pricing', 
  features: 'Features'
};

export function AIImageFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know about our AI image tools and how to get the best results
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All Questions
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {categoryLabels[category as keyof typeof categoryLabels]}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFAQ.map((item, index) => {
          const globalIndex = faqData.indexOf(item);
          const isOpen = openItems.includes(globalIndex);
          
          return (
            <Card key={globalIndex} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <Badge 
                    variant="outline" 
                    className={`${categoryColors[item.category]} text-xs font-medium flex-shrink-0`}
                  >
                    {categoryLabels[item.category]}
                  </Badge>
                  <button
                    onClick={() => toggleItem(globalIndex)}
                    className="flex-1 text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {item.question}
                      </CardTitle>
                      <ChevronDown 
                        className={`size-5 text-muted-foreground transition-transform flex-shrink-0 ml-4 ${
                          isOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </button>
                </div>
              </CardHeader>
              
              {isOpen && (
                <CardContent className="pt-0 space-y-4">
                  <div className="pl-20">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                    
                    {item.relatedLinks && item.relatedLinks.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium mb-2">Related Resources:</p>
                        <div className="flex flex-wrap gap-2">
                          {item.relatedLinks.map((link, linkIndex) => (
                            <StrategicInternalLink
                              key={linkIndex}
                              href={link.href}
                              priority="medium"
                              context="body"
                              keywords={link.keywords}
                              className="inline-flex items-center text-sm text-primary hover:text-primary/80 underline"
                            >
                              {link.text}
                            </StrategicInternalLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 p-6 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold">Still have questions?</h3>
        <p className="text-muted-foreground">
          Explore our comprehensive documentation or try our tools to see them in action
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <StrategicInternalLink
            href="/docs/ai-image-sharpener"
            priority="medium"
            context="cta"
            keywords={["image enhancement guide", "ai documentation"]}
            className="inline-block"
          >
            <Badge variant="outline" className="px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
              📖 Read Documentation
            </Badge>
          </StrategicInternalLink>
          <StrategicInternalLink
            href="/ai/image/enhance"
            priority="high"
            context="cta"
            keywords={["ai image sharpener", "try tool"]}
            className="inline-block"
          >
            <Badge variant="outline" className="px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
              🚀 Try Tools Now
            </Badge>
          </StrategicInternalLink>
        </div>
      </div>
    </div>
  );
}

export default AIImageFAQ;