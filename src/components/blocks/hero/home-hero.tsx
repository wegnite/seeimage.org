import { getTranslations } from 'next-intl/server';

export default async function HomeHero() {
  const t = await getTranslations('HomePage');

  return (
    <section className="container mx-auto px-4 pt-10 md:pt-12">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">{t('seoH1')}</h1>
      <p className="mt-3 text-base text-muted-foreground max-w-3xl mx-auto text-center">{t('seoIntro')}</p>
    </section>
  );
}