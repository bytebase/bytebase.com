import Link from '@/components/shared/link';

import { SidebarItem } from '@/types/docs';

import Route from '@/lib/route';

import ArrowIcon from '@/svgs/arrow.inline.svg';

export type NavigationProps = {
  previousLink?: SidebarItem;
  nextLink?: SidebarItem;
};

const Navigation = ({ previousLink, nextLink }: NavigationProps) => {
  const previousLinkUrl = previousLink?.url;
  const nextLinkUrl = nextLink?.url;
  return (
    <nav className="navigation mt-8 flex gap-x-10 border-t border-gray-90 pt-8 2xl:gap-x-9 xl:gap-x-14 sm:flex-col sm:gap-y-3">
      {previousLinkUrl && (
        <Link
          className="mr-auto flex w-1/2 gap-x-4 rounded-lg bg-gray-97 py-3.5 px-5 hover:bg-gray-90 sm:order-1 sm:w-full"
          href={Route.DOCS + previousLinkUrl}
        >
          <ArrowIcon className="h-auto w-[18px] shrink-0 rotate-180" />
          <div className="flex flex-col">
            <span className="text-14 font-medium leading-none text-gray-50">Previous article</span>
            <span className="mt-2 text-18 font-medium leading-snug text-gray-15">
              {previousLink.title}
            </span>
          </div>
        </Link>
      )}
      {nextLinkUrl && (
        <Link
          className="ml-auto flex w-1/2 justify-between rounded-lg bg-gray-97 py-3.5 px-5 hover:bg-gray-90 sm:w-full"
          href={Route.DOCS + nextLinkUrl}
        >
          <div className="flex flex-col">
            <span className="text-14 font-medium leading-none text-gray-50">Next article</span>
            <span className="mt-2 text-18 font-medium leading-snug text-gray-15">
              {nextLink.title}
            </span>
          </div>
          <ArrowIcon className="h-auto w-[18px] shrink-0" />
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
