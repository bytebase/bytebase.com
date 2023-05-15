import getMetadata from '@/utils/get-metadata';

import Hero from '@/components/pages/database-glossary/hero';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.DATABASE_GLOSSARY);

export default function DatabaseGlossaryPage() {
  return (
    <>
      <Hero />
    </>
  );
}
