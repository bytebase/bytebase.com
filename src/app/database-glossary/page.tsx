import getMetadata from '@/utils/get-metadata';

import GlossaryLayout from '@/components/pages/database-glossary/glossary-layout';
import Hero from '@/components/pages/database-glossary/hero';

import { getAllGlossaryPosts } from '@/lib/api-glossary';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.DATABASE_GLOSSARY);

export default function DatabaseGlossaryPage() {
  const posts = getAllGlossaryPosts();

  return (
    <GlossaryLayout posts={posts}>
      <Hero />
    </GlossaryLayout>
  );
}
