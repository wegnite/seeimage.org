/**
 * Anchor Text Optimization Utility
 * 
 * This utility helps optimize anchor text distribution to avoid over-optimization
 * while maintaining strategic keyword targeting for SEO
 */

import { anchorTextVariations } from './internal-links-config';

interface AnchorTextOptions {
  targetUrl: string;
  context: 'hero' | 'body' | 'cta' | 'sidebar' | 'footer';
  keywords?: string[];
  avoidOverOptimization?: boolean;
}

interface AnchorTextResult {
  text: string;
  variation: number;
  score: number;
  keywords: string[];
}

/**
 * Gets optimal anchor text for a given URL and context
 */
export function getOptimalAnchorText(options: AnchorTextOptions): AnchorTextResult {
  const { targetUrl, context, keywords = [], avoidOverOptimization = true } = options;
  
  // Get variations for this URL
  const variations = (anchorTextVariations as Record<string, string[]>)[targetUrl] || [`Visit ${targetUrl}`];
  
  // Context-based scoring
  const contextScores = {
    hero: { branded: 0.7, keyword: 0.3, natural: 0.0 },
    body: { branded: 0.2, keyword: 0.5, natural: 0.3 },
    cta: { branded: 0.3, keyword: 0.6, natural: 0.1 },
    sidebar: { branded: 0.4, keyword: 0.4, natural: 0.2 },
    footer: { branded: 0.6, keyword: 0.3, natural: 0.1 }
  };
  
  // Score each variation
  const scoredVariations = variations.map((text, index) => {
    let score = 0;
    
    // Keyword relevance scoring
    const keywordCount = keywords.reduce((count, keyword) => {
      return count + (text.toLowerCase().includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);
    
    // Context-based scoring
    const scores = contextScores[context];
    
    if (text.toLowerCase().includes('seimage') || text.toLowerCase().includes('platform')) {
      score += scores.branded;
    }
    
    if (keywordCount > 0) {
      score += scores.keyword * (keywordCount / keywords.length);
    }
    
    if (!text.match(/^(click|visit|try|see|explore)/i)) {
      score += scores.natural;
    }
    
    // Penalize over-optimization
    if (avoidOverOptimization && keywordCount > 2) {
      score *= 0.7;
    }
    
    return {
      text,
      variation: index,
      score,
      keywords: keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()))
    };
  });
  
  // Return highest scoring variation
  return scoredVariations.sort((a, b) => b.score - a.score)[0];
}

/**
 * Anchor Text Distribution Tracker
 * Helps avoid over-using the same anchor text patterns
 */
class AnchorTextTracker {
  private static instance: AnchorTextTracker;
  private usageMap: Map<string, Map<string, number>> = new Map();
  
  static getInstance(): AnchorTextTracker {
    if (!AnchorTextTracker.instance) {
      AnchorTextTracker.instance = new AnchorTextTracker();
    }
    return AnchorTextTracker.instance;
  }
  
  /**
   * Track usage of anchor text for a URL
   */
  trackUsage(url: string, anchorText: string): void {
    if (!this.usageMap.has(url)) {
      this.usageMap.set(url, new Map());
    }
    
    const urlMap = this.usageMap.get(url)!;
    const currentCount = urlMap.get(anchorText) || 0;
    urlMap.set(anchorText, currentCount + 1);
  }
  
  /**
   * Get usage count for specific anchor text
   */
  getUsageCount(url: string, anchorText: string): number {
    return this.usageMap.get(url)?.get(anchorText) || 0;
  }
  
  /**
   * Get distribution report for a URL
   */
  getDistributionReport(url: string): Array<{ text: string; count: number; percentage: number }> {
    const urlMap = this.usageMap.get(url);
    if (!urlMap) return [];
    
    const total = Array.from(urlMap.values()).reduce((sum, count) => sum + count, 0);
    
    return Array.from(urlMap.entries()).map(([text, count]) => ({
      text,
      count,
      percentage: (count / total) * 100
    })).sort((a, b) => b.count - a.count);
  }
  
  /**
   * Check if anchor text is over-used
   */
  isOverUsed(url: string, anchorText: string, threshold: number = 0.4): boolean {
    const report = this.getDistributionReport(url);
    const item = report.find(r => r.text === anchorText);
    return item ? item.percentage > threshold * 100 : false;
  }
}

/**
 * Smart Anchor Text Selector
 * Automatically selects anchor text based on usage history and SEO best practices
 */
export function getSmartAnchorText(options: AnchorTextOptions): string {
  const tracker = AnchorTextTracker.getInstance();
  const { targetUrl } = options;
  
  // Get optimal anchor text
  let result = getOptimalAnchorText(options);
  
  // Check if it's overused
  let attempts = 0;
  while (tracker.isOverUsed(targetUrl, result.text) && attempts < 5) {
    // Try next best variation
    const variations = (anchorTextVariations as Record<string, string[]>)[targetUrl] || [];
    const nextIndex = (result.variation + 1) % variations.length;
    result = {
      ...result,
      text: variations[nextIndex],
      variation: nextIndex
    };
    attempts++;
  }
  
  // Track the usage
  tracker.trackUsage(targetUrl, result.text);
  
  return result.text;
}

/**
 * Anchor Text Suggestions for specific URLs and contexts
 */
export const anchorTextSuggestions = {
  homepage: {
    hero: ['Discover our AI toolkit', 'Start creating with AI', 'Explore SeImage platform'],
    body: ['SeImage AI tools', 'our complete platform', 'all AI-powered features'],
    cta: ['Try all AI tools', 'Start creating now', 'Explore the platform'],
    footer: ['SeImage platform', 'AI tools homepage', 'main platform']
  },
  
  aiImageSharpener: {
    hero: ['AI Image Sharpener', 'enhance your photos', 'try image enhancement'],
    body: ['AI-powered sharpening', 'photo enhancement tool', 'image quality improvement'],
    cta: ['Sharpen images now', 'Try AI enhancement', 'Enhance photos free'],
    footer: ['image sharpener', 'photo enhancement', 'AI sharpening tool']
  },
  
  geminiPrompts: {
    hero: ['Gemini AI prompts', 'master AI photography', 'learn prompt engineering'],
    body: ['Gemini photo prompts', 'AI generation techniques', 'prompt engineering guide'],
    cta: ['Master Gemini prompts', 'Learn AI photography', 'Get the complete guide'],
    footer: ['Gemini guide', 'AI prompts', 'photo generation']
  },
  
  copyPastePrompts: {
    hero: ['100+ AI prompts', 'ready-to-use templates', 'copy-paste prompts'],
    body: ['instant AI prompts', 'viral prompt templates', 'tested Gemini prompts'],
    cta: ['Get instant prompts', 'Access 100+ templates', 'Copy viral prompts'],
    footer: ['prompt templates', 'copy-paste collection', 'instant prompts']
  }
};

/**
 * Generate strategic anchor text based on page hierarchy and SEO goals
 */
export function generateStrategicAnchorText(
  targetUrl: string,
  context: AnchorTextOptions['context'],
  priority: 'homepage-authority' | 'keyword-focused' | 'natural-variation' = 'keyword-focused'
): string {
  
  const baseOptions: AnchorTextOptions = {
    targetUrl,
    context,
    avoidOverOptimization: true
  };
  
  switch (priority) {
    case 'homepage-authority':
      // Focus on driving authority to homepage
      if (targetUrl === '/') {
        return getSmartAnchorText({
          ...baseOptions,
          keywords: ['ai tools', 'seimage platform', 'complete toolkit']
        });
      }
      break;
      
    case 'keyword-focused':
      // Focus on target keywords for the specific page
      const keywordMap = {
        '/ai/image/enhance': ['ai image sharpener', 'enhance photos', 'sharpen images'],
        '/docs/gemini-ai-photo-prompts': ['gemini ai prompts', 'ai photo generation', 'prompt engineering'],
        '/docs/gemini-ai-prompts-copy-paste': ['copy paste prompts', 'viral ai prompts', 'instant prompts'],
        '/docs/ai-image-sharpener': ['image enhancement guide', 'ai sharpening tutorial', 'photo improvement']
      };
      
      return getSmartAnchorText({
        ...baseOptions,
        keywords: (keywordMap as Record<string, string[]>)[targetUrl] || []
      });
      
    case 'natural-variation':
      // Focus on natural, varied anchor text
      return getSmartAnchorText({
        ...baseOptions,
        avoidOverOptimization: true,
        keywords: []
      });
  }
  
  return getSmartAnchorText(baseOptions);
}

export default AnchorTextTracker;