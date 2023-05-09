import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import getMetadata from '@/utils/get-metadata';
import slugifyText from '@/utils/slugify-text';

import Posts from '@/components/pages/blog/posts';
import Tabs from '@/components/pages/blog/tabs/tabs';

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
      <Tabs items={tags} currentSlug={category} />
      <Posts
        title={getTagNameBySlug(category)}
        posts={posts}
        page={1}
        pageCount={pageCount}
        category={category}
      />
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
