import CallToActionSection from '@/components/blocks/calltoaction/calltoaction';
import FaqSection from '@/components/blocks/faqs/faqs';
import FeaturesSection from '@/components/blocks/features/features';
import Features2Section from '@/components/blocks/features/features2';
import Features3Section from '@/components/blocks/features/features3';
import { SeedreamToolSection } from '@/components/ai/seedream/SeedreamToolSection';
import IntegrationSection from '@/components/blocks/integration/integration';
import Integration2Section from '@/components/blocks/integration/integration2';
import LogoCloud from '@/components/blocks/logo-cloud/logo-cloud';
import PricingSection from '@/components/blocks/pricing/pricing';
import StatsSection from '@/components/blocks/stats/stats';
import TestimonialsSection from '@/components/blocks/testimonials/testimonials';
import CrispChat from '@/components/layout/crisp-chat';
import { NewsletterCard } from '@/components/newsletter/newsletter-card';
import { ToolsSection } from '@/components/ai/seedream/ToolsSection';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

/**
 * https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata-api
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata | undefined> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'Metadata' });
  const tHome = await getTranslations({ locale, namespace: 'HomePage' });

  return constructMetadata({
    title: `${tHome('seoH1')} | Seeimage AI`,
    description: tHome('seoIntro') || tMeta('description'),
    canonicalUrl: getUrlWithLocale('', locale),
  });
}

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations('HomePage');

  return (
    <>
      <div className="flex flex-col">
        {/* SEO H1 + 说明，确保只有一个 H1 */}
        <section className="container mx-auto px-4 pt-10 md:pt-12">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">{t('seoH1')}</h1>
          <p className="mt-3 text-base text-muted-foreground max-w-3xl mx-auto text-center">{t('seoIntro')}</p>
        </section>

        {/* Replace hero with dual-column tool design */}
        <section className="container mx-auto px-4 py-8">
          <SeedreamToolSection />
        </section>

        {/* What / Why / How 文本块，提升关键词密度 */}
        <section className="container mx-auto px-4 pb-8 md:pb-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="text-xl font-semibold">What is Seedream 4.0?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Seedream 4.0 is a production‑grade AI image generator. With Seedream 4.0 you can create high‑quality
                visuals via text‑to‑image and image‑to‑image. Seedream 4.0 supports style presets, seeds, guidance and
                2x/4x upscaling to deliver professional results.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Why Choose Seedream 4.0?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Seedream 4.0 focuses on fidelity, control and speed. For marketing banners, product shots and concept
                art, Seedream 4.0 consistently produces crisp details and predictable outputs, helping teams ship fast
                with fewer iterations.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">How to Use Seedream 4.0</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Start by uploading a reference image, choose a style preset, then add a concise prompt. Click Generate
                to create images with Seedream 4.0. You can refine prompts, switch presets or upscale with Seedream 4.0
                to reach your desired look.
              </p>
            </div>
          </div>
        </section>

        {/* Curated Tools section */}
        <ToolsSection />

        {/* <LogoCloud />

        <StatsSection />

        <IntegrationSection />

        <FeaturesSection />

        <Features2Section />

        <Features3Section />

        <Integration2Section /> */}

        <PricingSection />

        <FaqSection />

        {/* <CallToActionSection /> */}

        {/* <TestimonialsSection /> */}

        {/* <NewsletterCard /> */}

        <CrispChat />
      </div>
    </>
  );
}
