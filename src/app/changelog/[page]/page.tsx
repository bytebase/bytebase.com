import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';

import Posts from '@/components/pages/changelog/posts';

import {
  POSTS_PER_PAGE,
  getAllChangelogPosts,
  getChangelogPostsPerPage,
} from '@/lib/api-changelog';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.CHANGELOG);

export default function ChangelogPage({ params: { page } }: { params: { page: string } }) {
  const data = getChangelogPostsPerPage(+page);

  if (!data) return notFound();

  return <Posts page={+page} {...data} />;
}

export async function generateStaticParams() {
  const posts = getAllChangelogPosts();
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);

  const pages = [];

  for (let i = 1; i <= pageCount; i += 1) pages.push({ page: i.toString() });

  return pages;
}
