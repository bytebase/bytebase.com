import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';

import {
  POSTS_PER_PAGE,
  getAllChangelogPosts,
  getChangelogPostBySlug,
  getChangelogPostsPerPage,
} from '@/lib/api-changelog';
import SEO_DATA from '@/lib/seo-data';
import Hero from '@/components/pages/changelog/hero';
import PostsList from '@/components/pages/changelog/posts-list';
import Post from '@/components/pages/changelog/post/post';
import { Metadata } from 'next';
import Route from '@/lib/route';
import { getExcerpt } from '@/utils/get-excerpt';

export default function ChangelogPage({ params: { slug } }: { params: { slug: string } }) {
  if (+slug >= 1) {
    const data = getChangelogPostsPerPage(+slug);

    if (!data) return notFound();

    return (
      <>
        <Hero />
        <PostsList page={+slug} {...data} />
      </>
    );
  }

  const post = getChangelogPostBySlug(slug);

  if (!post) return notFound();

  return <Post post={post} />;
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const post = getChangelogPostBySlug(slug);

  if (!post)
    return getMetadata({
      ...SEO_DATA.CHANGELOG,
      pathname: `${Route.CHANGELOG}/${slug}/`,
    });

  const { content, title, feature_image, og_image } = post;

  const description = getExcerpt({ content, length: 160 });

  return getMetadata({
    title,
    description,
    pathname: `${Route.CHANGELOG}/${slug}/`,
    // TODO: stop using feature_image after all posts will be migrated to og_image
    imagePath: og_image || feature_image,
  });
}
