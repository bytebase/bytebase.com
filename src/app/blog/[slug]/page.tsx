import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getExcerpt } from '@/utils/get-excerpt';
import getMetadata from '@/utils/get-metadata';
import slugifyText from '@/utils/slugify-text';

import BlogPostHero from '@/components/pages/blog/blog-post-hero';
import PostLayout from '@/components/pages/blog/post-layout';
import Posts from '@/components/pages/blog/posts';
import RecentPosts from '@/components/pages/blog/recent-posts/recent-posts';
import RelatedPosts from '@/components/pages/blog/related-posts';
import SubscribeCta from '@/components/pages/blog/subscribe-cta';
import Tabs from '@/components/pages/blog/tabs';
import Content from '@/components/shared/content';

import {
  POSTS_PER_PAGE,
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogPostsPerPage,
} from '@/lib/api-blog';
import { getTableOfContents } from '@/lib/api-docs';
import Route from '@/lib/route';
import SEO_DATA from '@/lib/seo-data';

export default function Blog({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (+slug >= 1) {
    const data = getBlogPostsPerPage({ page: +slug });

    if (!data) return notFound();

    const { posts, recentPosts, tags, pageCount } = data;

    return (
      <>
        <Tabs items={tags} />
        <BlogPostHero post={recentPosts[0]} isBlogPost={false} />
        <RecentPosts posts={recentPosts.slice(1, 5)} />
        <SubscribeCta />
        <Posts title="Bytebase blog" posts={posts} page={+slug} pageCount={pageCount} />
      </>
    );
  }
  const post = getBlogPostBySlug(slug);

  if (!post) return notFound();

  const { content } = post;

  const { posts } = getAllBlogPosts();

  const relatedPosts = posts.filter((article) => article.slug !== slug).slice(0, 3);
  const tableOfContents = getTableOfContents(content);

  return (
    <>
      <article>
        <BlogPostHero post={post} isBlogPost={true} />
        <PostLayout post={post} tocItems={tableOfContents}>
          <Content content={content} />
        </PostLayout>
      </article>
      <RelatedPosts posts={relatedPosts} />
    </>
  );
}

export async function generateStaticParams() {
  const { posts } = getAllBlogPosts();
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);

  const pages = posts.map(({ slug }) => ({ slug }));

  for (let i = 1; i <= pageCount; i += 1) pages.push({ slug: i.toString() });

  return pages;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const post = getBlogPostBySlug(slug);

  if (!post)
    return getMetadata({
      ...SEO_DATA.BLOG,
      pathname: `${Route.BLOG}/${slug}/`,
    });

  const { content, title, feature_image } = post;

  const description = getExcerpt({ content, length: 160 });

  return getMetadata({
    title,
    description,
    pathname: `${Route.BLOG}/${slug}/`,
    imagePath: feature_image,
  });
}
