import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';

import BlogPostHero from '@/components/pages/blog/blog-post-hero';
import Posts from '@/components/pages/blog/posts';
import RecentPosts from '@/components/pages/blog/recent-posts/recent-posts';
import SubscribeCta from '@/components/pages/blog/subscribe-cta';

import { getBlogPostsPerPage } from '@/lib/api-blog';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.BLOG);

export default async function Blog() {
  const data = getBlogPostsPerPage({ page: 1 });

  if (!data) return notFound();

  const { posts, tags, pageCount } = data;

  return (
    <>
      <h1 className="sr-only">Bytebase blog</h1>
      <BlogPostHero post={posts[0]} isBlogPost={false} />
      <RecentPosts posts={posts.slice(1, 5)} />
      <SubscribeCta />
      <Posts posts={posts} tabs={tags} page={1} pageCount={pageCount} />
    </>
  );
}
