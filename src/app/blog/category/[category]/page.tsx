import { notFound } from 'next/navigation';

import slugifyText from '@/utils/slugify-text';

import BlogPostHero from '@/components/pages/blog/blog-post-hero';
import Posts from '@/components/pages/blog/posts';
import RecentPosts from '@/components/pages/blog/recent-posts/recent-posts';
import SubscribeCta from '@/components/pages/blog/subscribe-cta';

import { getAllBlogPosts, getBlogPostsPerPage } from '@/lib/api-blog';

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const data = getBlogPostsPerPage({ page: 1, category });

  if (!data) return notFound();

  const { posts, tags, pageCount } = data;

  return (
    <>
      <BlogPostHero post={posts[0]} isBlogPost={false} />
      <RecentPosts posts={posts.slice(1, 5)} />
      <SubscribeCta />
      <Posts posts={posts} tabs={tags} page={1} pageCount={pageCount} category={category} />
    </>
  );
}

export async function generateStaticParams() {
  const { tags } = getAllBlogPosts();

  return tags.map((tag) => ({ category: slugifyText(tag) }));
}

export const revalidate = 60;
