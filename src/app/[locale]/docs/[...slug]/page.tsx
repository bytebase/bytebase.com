import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getExcerpt } from '@/utils/get-excerpt';
import getMetadata from '@/utils/get-metadata';

import PostLayout from '@/components/pages/docs/post-layout';
import Content from '@/components/shared/content';

import {
  getAllPosts,
  getBreadcrumbs,
  getDocPreviousAndNextLinks,
  getFlatSidebar,
  getPostBySlug,
  getSidebar,
  getTableOfContents,
} from '@/lib/api-docs';
import Route from '@/lib/route';
import TableOfContents from '@/components/pages/docs/table-of-contents';
import Promo from './promo';

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
    data: { title, feature_image, published_at, estimated_time, feature_name },
    content,
  } = post;

  const tableOfContents = getTableOfContents(content);

  return (
    <>
      <article className="col-span-6 col-start-4 flex flex-col lg:col-span-9 md:col-span-full">
        <PostLayout
          title={title}
          featureImage={feature_image || null}
          published_at={published_at || null}
          estimated_time={estimated_time || null}
          feature_name={feature_name || null}
          currentSlug={currentSlug}
          breadcrumbs={breadcrumbs}
          navigationLinks={navigationLinks}
        >
          <Content content={content} />
        </PostLayout>
      </article>
      <aside className="scrollbar-hidden lg:gap-x-grid sticky top-[144px] col-span-3 ml-auto flex max-h-[calc(100vh-40px)] w-full flex-col overflow-y-auto lg:col-span-full lg:mt-14 lg:grid lg:grid-cols-12 md:mt-10 sm:mt-8 sm:gap-y-4">
        {tableOfContents && tableOfContents.length > 0 && (
          <TableOfContents items={tableOfContents} className="overflow-y-auto" hasBackToTop />
        )}
        <div className="mt-4 flex w-full flex-col items-start justify-start pl-5">
          <Promo />
        </div>
      </aside>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const { slug } = params;
  const currentSlug = slug.join('/');
  const currentPath = `/${currentSlug}`;

  const post = getPostBySlug(currentSlug);

  if (!post) return notFound();

  const {
    data: { title },
    content,
  } = post;

  const description = getExcerpt({ content, length: 160 });

  return getMetadata({
    title,
    description,
    pathname: `${Route.DOCS}${currentPath}/`,
  });
}
