import getMetadata from '@/utils/get-metadata';

import Hero from '@/components/pages/usecase/hero';

import SEO_DATA from '@/lib/seo-data';
import SEO_PAGES_DATA from '@/lib/seo-pages-data';

export const metadata = getMetadata(SEO_DATA.DEVELOPER);

export default function Page() {
  return (
    <Hero
      title={SEO_PAGES_DATA.DEVELOPER.title}
      description={SEO_PAGES_DATA.DEVELOPER.description}
    />
  );
}
