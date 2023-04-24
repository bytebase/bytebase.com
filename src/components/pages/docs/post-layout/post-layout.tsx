'use client';

import { useRef } from 'react';

import Link from '@/components/shared/link';

import { Breadcrumb, SidebarItem } from '@/types/docs';

import ExternalLinkIcon from '@/svgs/external.inline.svg';

import Breadcrumbs from '../breadcrumbs';
import Navigation from '../navigation';
import TableOfContents from '../table-of-contents';

interface PostLayoutProps {
  title: string;
  currentSlug: string;
  children: React.ReactNode;
  breadcrumbs: Breadcrumb[];
  navigationLinks: { previousLink: SidebarItem | undefined; nextLink: SidebarItem | undefined };
}

const FILE_ORIGIN_PATH = 'https://github.com/bytebase/bytebase.com/tree/main/content/docs';

const PostLayout = ({
  title,
  children,
  currentSlug,
  breadcrumbs,
  navigationLinks: { previousLink, nextLink },
}: PostLayoutProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <article className="col-start-4 col-span-6 lg:col-span-9 md:col-span-full">
        {breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <h1 className="text-44 leading-extra-tight tracking-tighter font-bold text-gray-15 lg:text-36 md:text-32 sm:text-30">
          {title}
        </h1>
        <div className="mt-5" ref={contentRef}>
          {children}
        </div>
        <Link
          className="inline-flex mt-20 text-18 hover:text-gray-60 font-medium leading-none text-gray-15 items-center md:mt-14 sm:mt-10"
          href={`${FILE_ORIGIN_PATH}/${currentSlug}.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Edit this page on GitHub</span>
          <ExternalLinkIcon className="w-3 h-3 ml-2" />
        </Link>
        <Navigation previousLink={previousLink} nextLink={nextLink} />
      </article>
      <div className="sticky bottom-0 top-10 ml-auto max-h-[calc(100vh-40px)] overflow-y-auto col-end-13 col-span-3 lg:hidden w-full max-w-[314px] xl:max-w-none">
        <TableOfContents contentRef={contentRef} />
      </div>
    </>
  );
};

export default PostLayout;
