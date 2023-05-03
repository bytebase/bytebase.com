import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';

import Posts from '@/components/pages/changelog/posts';

import { getChangelogPostsPerPage } from '@/lib/api-changelog';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.CHANGELOG);

export default function ChangelogPage() {
  const data = getChangelogPostsPerPage(1);

  if (!data) return notFound();

  return <Posts page={1} {...data} />;
}
