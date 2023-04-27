import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';
import slugifyText from '@/utils/slugify-text';

import BlogPostHero from '@/components/pages/blog/blog-post-hero';
import Posts from '@/components/pages/blog/posts';
import RecentPosts from '@/components/pages/blog/recent-posts/recent-posts';
import SubscribeCta from '@/components/pages/blog/subscribe-cta';

import { getAllBlogPosts, getBlogPostsPerPage, getTagNameBySlug } from '@/lib/api-blog';
import Route from '@/lib/route';
import SEO_DATA from '@/lib/seo-data';

export default function BlogCategoryPage({ params }: { params: { category: string } }) {
  const { category } = params;
  const data = getBlogPostsPerPage({ page: 1, category });

  if (!data) return notFound();

  const { posts, tags, pageCount } = data;

  return (
    <>
      {/* TODO: h1 */}
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

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const { category } = params;

  return getMetadata({
    ...SEO_DATA.BLOG,
    title: `${SEO_DATA.BLOG.title} - ${getTagNameBySlug(category)}`,
    pathname: `${Route.BLOG_CATEGORY}/${category}/`,
  });
}
