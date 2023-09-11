import getMetadata from '@/utils/get-metadata';

import GlossaryLayout from '@/components/pages/database-glossary/glossary-layout';
import Hero from '@/components/pages/database-glossary/hero';

import { getAllGlossaryPosts } from '@/lib/api-glossary';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.DATABASE_GLOSSARY);

export default function DatabaseGlossaryPage() {
  const posts = getAllGlossaryPosts();
  const categories = new Map();
  posts.forEach(({ list }) => {
    list.forEach(({ tagList }) =>
      tagList.forEach((tag) => {
        if (categories.has(tag)) {
          categories.set(tag, categories.get(tag) + 1);
        } else {
          categories.set(tag, 1);
        }
      }),
    );
  });

  return (
    <GlossaryLayout posts={posts} filters={Array.from(categories.entries())}>
      <Hero />
    </GlossaryLayout>
  );
}
