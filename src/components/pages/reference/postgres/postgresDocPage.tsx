import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getExcerpt } from '@/utils/get-excerpt';
import getMetadata from '@/utils/get-metadata';

import PostLayout from '@/components/pages/docs/post-layout';
import Content from '@/components/shared/content';
import TableOfContents from '@/components/pages/docs/table-of-contents';

import {
  getAllPosts,
  getBreadcrumbs,
  getDocPreviousAndNextLinks,
  getFlatSidebar,
  getPostBySlug,
  getSidebar,
  getTableOfContents,
} from '@/lib/api-docs';
import Promo from '@/components/pages/reference/postgres/promo';

export function generatePostStaticParams(dirPath: string) {
  const posts = getAllPosts(dirPath);

  return posts.map(({ slug }) => {
    const slugsArray = slug.split('/');

    return {
      slug: slugsArray,
    };
  });
}

export default function PostgresDocPage({
  params,
  dirPath,
  fileOriginPath,
  routePath,
}: {
  params: { slug: string[] };
  dirPath: string;
  fileOriginPath: string;
  routePath: string;
}) {
  const { slug } = params;
  const currentSlug = slug.join('/');
  const currentPath = `${routePath}/${currentSlug}`;

  const post = getPostBySlug(dirPath, currentSlug);

  if (!post) return notFound();

  const { sidebar } = getSidebar(dirPath);
  const flatSidebar = getFlatSidebar(sidebar);

  const breadcrumbs = getBreadcrumbs(dirPath, currentPath, flatSidebar);
  const navigationLinks = getDocPreviousAndNextLinks(currentPath, flatSidebar);

  const {
    data: { title, feature_image, updated_at, estimated_time, feature_name },
    content,
  } = post;

  const tableOfContents = getTableOfContents(content);

  return (
    <>
      <article className="col-span-3 col-start-2 flex flex-col lg:col-span-4 md:col-span-full">
        <PostLayout
          title={title}
          featureImage={feature_image || null}
          updated_at={updated_at || null}
          estimated_time={estimated_time || null}
          feature_name={feature_name || null}
          currentSlug={currentSlug}
          breadcrumbs={breadcrumbs}
          fileOriginPath={fileOriginPath}
          navigationLinks={navigationLinks}
        >
          <Content content={content} />
        </PostLayout>
      </article>
      <aside className="scrollbar-hidden lg:gap-x-grid sticky top-[144px] col-span-1 ml-auto flex max-h-[calc(100vh-40px)] w-full flex-col overflow-y-auto lg:col-span-full lg:col-start-2 lg:mt-14 lg:grid md:col-span-full md:col-start-2 md:mt-10 sm:mt-8 sm:gap-y-4">
        {tableOfContents && tableOfContents.length > 0 && (
          <TableOfContents items={tableOfContents} className="overflow-y-auto" hasBackToTop />
        )}
        <div className="mt-4 flex w-full flex-col items-start justify-start pl-5 lg:pl-0">
          <Promo />
        </div>
      </aside>
    </>
  );
}

export async function generatePostMetadata({
  params,
  dirPath,
  routePath,
}: {
  params: { slug: string[] };
  dirPath: string;
  routePath: string;
}): Promise<Metadata> {
  const { slug } = params;
  const currentSlug = slug.join('/');
  const currentPath = `/${currentSlug}`;

  const post = getPostBySlug(dirPath, currentSlug);

  if (!post) return notFound();

  const {
    data: { title },
    content,
  } = post;

  const description = getExcerpt({ content, length: 160 });

  return getMetadata({
    title,
    description,
    pathname: `${routePath}${currentPath}/`,
  });
}
