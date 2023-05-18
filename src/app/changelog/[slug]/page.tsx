import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';

import Posts from '@/components/pages/changelog/posts';

import {
  POSTS_PER_PAGE,
  getAllChangelogPosts,
  getChangelogPostsPerPage,
} from '@/lib/api-changelog';
import SEO_DATA from '@/lib/seo-data';
import Hero from '@/components/pages/changelog/hero';

export const metadata = getMetadata(SEO_DATA.CHANGELOG);

export default function ChangelogPage({ params: { slug } }: { params: { slug: string } }) {
  if (+slug >= 1) {
    const data = getChangelogPostsPerPage(+slug);

    if (!data) return notFound();

    return (
      <>
        <Hero />
        <Posts page={+slug} {...data} />
      </>
    );
  }

  return null;
}

export async function generateStaticParams() {
  const posts = getAllChangelogPosts();
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);

  const pages = posts.map(({ slug }) => {
    return { slug };
  });

  for (let i = 1; i <= pageCount; i += 1) pages.push({ slug: i.toString() });

  return pages;
}
