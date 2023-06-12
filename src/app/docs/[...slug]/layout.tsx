import MobileSidebar from '@/components/pages/docs/mobile-sidebar';
import Sidebar from '@/components/pages/docs/sidebar';
import TableOfContents from '@/components/pages/docs/table-of-contents';
import SubscriptionForm from '@/components/shared/subscription';

import { getPostBySlug, getSidebar, getTableOfContents } from '@/lib/api-docs';

import '@/styles/docsearch.css';

export default function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const { slug } = params;
  const currentSlug = slug.join('/');
  const currentUrl = `/${currentSlug}`;
  const { sidebar, expandedList } = getSidebar();

  const post = getPostBySlug(currentSlug);

  if (!post) return null;

  const { content } = post;

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
        <div
          className="sticky top-10 col-span-3 h-[calc(100vh-40px)] overflow-hidden 
        before:absolute before:top-0 before:left-0 before:z-10 before:h-[72px] before:w-full before:bg-docs-sidebar after:absolute after:bottom-0
        after:left-0 after:z-10 after:h-10 after:w-full after:bg-gradient-to-b after:from-transparent after:to-white 
        md:hidden"
        >
          <Sidebar data={sidebar} expandedList={expandedList} currentUrl={currentUrl} />
        </div>

        <article className="col-span-6 col-start-4 flex flex-col lg:col-span-9 md:col-span-full">
          {children}
        </article>

        {tableOfContents && tableOfContents.length > 0 && (
          <div className="col-span-3 col-end-13 ml-auto w-full max-w-[314px] pt-2.5 pb-28 xl:max-w-none lg:hidden">
            <TableOfContents
              items={tableOfContents}
              className="scrollbar-hidden sticky top-10 max-h-[calc(100vh-40px)] overflow-y-auto"
              hasBackToTop
            />
          </div>
        )}
      </div>
      <SubscriptionForm />
    </>
  );
}
