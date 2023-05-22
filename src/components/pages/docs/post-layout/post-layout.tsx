import Image from 'next/image';

import clsx from 'clsx';

import Link from '@/components/shared/link';

import { TableOfContents as TOCProps } from '@/types/docs';

import { Breadcrumb } from '@/types/breadcrumb';

import ExternalLinkIcon from '@/svgs/external.inline.svg';

import Navigation, { type NavigationProps } from '../navigation';
import TableOfContents from '../table-of-contents';
import Breadcrumbs from '@/components/shared/breadcrumbs';

const FILE_ORIGIN_PATH = 'https://github.com/bytebase/bytebase.com/tree/main/content/docs';

const PostLayout = ({
  title,
  featureImage = null,
  children,
  currentSlug,
  breadcrumbs,
  navigationLinks: { previousLink, nextLink },
  tableOfContents,
}: {
  title: string;
  featureImage: string | null;
  currentSlug: string;
  children: React.ReactNode;
  breadcrumbs: Breadcrumb[];
  navigationLinks: NavigationProps;
  tableOfContents?: TOCProps[];
}) => {
  return (
    <>
      <article className="col-span-6 col-start-4 flex flex-col lg:col-span-9 md:col-span-full">
        {breadcrumbs.length > 0 && <Breadcrumbs className="mb-7 mt-[13px]" items={breadcrumbs} />}
        <h1 className="mt-2.5 text-44 font-bold leading-extra-tight tracking-tighter text-gray-15 2xl:mt-1.5 lg:text-36 md:text-32 sm:mt-0 sm:text-30">
          {title}
        </h1>
        {featureImage && (
          <Image
            className="my-11 w-full rounded lg:mt-10 lg:mb-8 sm:mt-5 sm:mb-6"
            src={featureImage}
            alt={title}
            width={967}
            height={545}
            priority
          />
        )}
        <div className={clsx(!featureImage && 'mt-5 xl:mt-3.5')}>{children}</div>
        <Link
          className="mt-20 flex items-center text-18 font-medium leading-none text-gray-15 hover:text-gray-60 xl:mt-14 xl:text-16 sm:mt-10"
          href={`${FILE_ORIGIN_PATH}/${currentSlug}.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Edit this page on GitHub</span>
          <ExternalLinkIcon className="ml-2 h-3 w-3" />
        </Link>
        <Navigation previousLink={previousLink} nextLink={nextLink} />
      </article>
      {tableOfContents && tableOfContents.length > 0 && (
        <div className="col-span-3 col-end-13 ml-auto w-full max-w-[314px] pt-2.5 pb-28 xl:max-w-none lg:hidden">
          <TableOfContents
            items={tableOfContents}
            className="scrollbar-hidden sticky top-10 max-h-[calc(100vh-40px)] overflow-y-auto"
            hasBackToTop={true}
          />
        </div>
      )}
    </>
  );
};

export default PostLayout;
