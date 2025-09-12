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

        {/* What / Why / How 文本块（i18n） */}
        <section className="container mx-auto px-4 pb-8 md:pb-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="text-xl font-semibold">{t('sections.what.title')}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t('sections.what.body')}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{t('sections.why.title')}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t('sections.why.body')}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{t('sections.how.title')}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t('sections.how.body')}</p>
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
