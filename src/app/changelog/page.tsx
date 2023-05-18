import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';

import Posts from '@/components/pages/changelog/posts';

import { getChangelogPostsPerPage } from '@/lib/api-changelog';
import SEO_DATA from '@/lib/seo-data';
import Hero from '@/components/pages/changelog/hero';

export const metadata = getMetadata(SEO_DATA.CHANGELOG);

export default function ChangelogPage() {
  const data = getChangelogPostsPerPage(1);

  if (!data) return notFound();

  return (
    <>
      <Hero />
      <Posts page={1} {...data} />
    </>
  );
}
