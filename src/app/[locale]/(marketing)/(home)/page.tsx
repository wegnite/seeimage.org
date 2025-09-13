import CallToActionSection from '@/components/blocks/calltoaction/calltoaction';
import FaqSection from '@/components/blocks/faqs/faqs';
import FeaturesSection from '@/components/blocks/features/features';
import Features2Section from '@/components/blocks/features/features2';
import Features3Section from '@/components/blocks/features/features3';
import dynamic from 'next/dynamic';
import IntegrationSection from '@/components/blocks/integration/integration';
import Integration2Section from '@/components/blocks/integration/integration2';
import LogoCloud from '@/components/blocks/logo-cloud/logo-cloud';
import PricingSection from '@/components/blocks/pricing/pricing';
import StatsSection from '@/components/blocks/stats/stats';
import TestimonialsSection from '@/components/blocks/testimonials/testimonials';
import CrispChat from '@/components/layout/crisp-chat';
import { NewsletterCard } from '@/components/newsletter/newsletter-card';
import { ToolsSection } from '@/components/ai/seedream/ToolsSection';
import HomeHero from '@/components/blocks/hero/home-hero';
import AboutSection from '@/components/blocks/about/about-section';
import { constructMetadata } from '@/lib/metadata';
import { getUrlWithLocale } from '@/lib/urls/urls';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

// Defer heavy client component to reduce initial JS and TBT
const SeedreamToolSection = dynamic(
  () =>
    import('@/components/ai/seedream/SeedreamToolSection').then(
      (m) => m.SeedreamToolSection
    ),
  {
    ssr: false,
    loading: () => (
      <section className="container mx-auto px-4 py-8">
        <div className="h-[560px] w-full animate-pulse rounded-xl bg-muted/40" />
      </section>
    ),
  }
);

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
        <HomeHero />

        {/* Replace hero with dual-column tool design */}
        <section className="container mx-auto px-4 py-8">
          <SeedreamToolSection />
        </section>

        <AboutSection />

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
