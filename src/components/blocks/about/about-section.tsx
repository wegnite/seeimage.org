import { getTranslations } from 'next-intl/server';

export default async function AboutSection() {
  const t = await getTranslations('HomePage');

  return (
    <section className="container mx-auto px-4 pb-16 md:pb-20">
      <div className="max-w-5xl mx-auto space-y-24 md:space-y-28">
        <div className="space-y-4">
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            {t('sections.what.title')}
          </h2>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40"></div>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-8 sm:leading-9 text-pretty antialiased">
            {t('sections.what.body')}
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            {t('sections.why.title')}
          </h2>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40"></div>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-8 sm:leading-9 text-pretty antialiased">
            {t('sections.why.body')}
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            {t('sections.how.title')}
          </h2>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40"></div>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-8 sm:leading-9 text-pretty antialiased">
            {t('sections.how.body')}
          </p>
        </div>
      </div>
    </section>
  );
}