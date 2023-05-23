import getMetadata from '@/utils/get-metadata';

import Hero from '@/components/pages/usecase/hero';

import Features from '@/components/shared/features';
import SEO_DATA from '@/lib/seo-data';
import SEO_PAGES_DATA from '@/lib/seo-pages-data';

export const metadata = getMetadata(SEO_DATA.DBA);

export default function Page() {
  return (
    <div className="container gap-x-grid grid grid-cols-12">
      <Hero title={SEO_PAGES_DATA.DBA.title} description={SEO_PAGES_DATA.DBA.description} />
      <Features />
    </div>
  );
}
