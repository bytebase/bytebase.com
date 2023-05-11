import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getExcerpt } from '@/utils/get-excerpt';
import getMetadata from '@/utils/get-metadata';

import MobileSidebar from '@/components/pages/docs/mobile-sidebar';
import PostLayout from '@/components/pages/docs/post-layout';
import Sidebar from '@/components/pages/docs/sidebar';
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

  const currentUrl = `/${slug.join('/')}`;
  const { sidebar, expandedList } = getSidebar();
  const flatSidebar = getFlatSidebar(sidebar);

  const breadcrumbs = getBreadcrumbs(currentPath, flatSidebar);
  const navigationLinks = getDocPreviousAndNextLinks(currentPath, flatSidebar);

  const {
    data: { title },
    content,
  } = post;

  const tableOfContents = getTableOfContents(content);

  return (
    <>
      <MobileSidebar
        className="col-span-full hidden md:flex md:pt-[72px]"
        data={sidebar}
        currentUrl={currentUrl}
        expandedList={expandedList}
      />
      <div className="container grid grid-cols-12 gap-x-10 pt-[136px] 2xl:pt-[140px] xl:gap-x-9 xl:pt-32 lg:gap-x-6 md:mt-6 md:gap-x-5 md:pt-0 sm:gap-x-4">
        <Sidebar data={sidebar} expandedList={expandedList} currentUrl={currentUrl} />
        <PostLayout
          title={title}
          currentSlug={currentSlug}
          breadcrumbs={breadcrumbs}
          navigationLinks={navigationLinks}
          tableOfContents={tableOfContents}
        >
          <Content content={content} />
        </PostLayout>
      </div>
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
