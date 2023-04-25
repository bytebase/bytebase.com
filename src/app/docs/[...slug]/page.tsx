import { notFound } from 'next/navigation';

import Content from '@/components/pages/docs/content';
import PostLayout from '@/components/pages/docs/post-layout';

import {
  getAllPosts,
  getBreadcrumbs,
  getDocPreviousAndNextLinks,
  getFlatSidebar,
  getPostBySlug,
  getSidebar,
  getTableOfContents,
} from '@/lib/api-docs';

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map(({ slug }) => {
    const slugsArray = slug.split('/');

    return {
      slug: slugsArray,
    };
  });
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const currentSlug = slug.join('/');
  const currentPath = `/${currentSlug}`;

  const post = getPostBySlug(currentSlug);

  if (!post) return notFound();

  const { sidebar } = getSidebar();
  const flatSidebar = getFlatSidebar(sidebar);

  const breadcrumbs = getBreadcrumbs(currentPath, flatSidebar);
  const navigationLinks = getDocPreviousAndNextLinks(currentPath, flatSidebar);

  const {
    data: { title },
    content,
  } = post;

  const tableOfContents = getTableOfContents(content);

  return (
    <PostLayout
      title={title}
      currentSlug={currentSlug}
      breadcrumbs={breadcrumbs}
      navigationLinks={navigationLinks}
      tableOfContents={tableOfContents}
    >
      <Content content={content} />
    </PostLayout>
  );
}
