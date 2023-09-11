import getMetadata from '@/utils/get-metadata';

import Hero from '@/components/shared/seo-page-hero';

import SEO_DATA from '@/lib/seo-data';
import SEO_PAGES_DATA from '@/lib/seo-pages-data';

export const metadata = getMetadata(SEO_DATA.ORACLE);

export default function Page() {
  return <Hero {...SEO_PAGES_DATA.ORACLE} />;
}
