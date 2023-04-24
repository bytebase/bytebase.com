import Link from '@/components/shared/link';

import { SidebarItem } from '@/types/docs';

import Route from '@/lib/route';

import ArrowIcon from '@/svgs/arrow.inline.svg';

interface NavigationProps {
  previousLink?: SidebarItem;
  nextLink?: SidebarItem;
}

const Navigation = ({ previousLink, nextLink }: NavigationProps) => {
  const previousLinkUrl = previousLink?.url;
  const nextLinkUrl = nextLink?.url;
  return (
    <nav className="navigation gap-x-10 flex mt-8 pt-8 border-t border-gray-90 sm:flex-col sm:gap-y-3">
      {previousLinkUrl && (
        <Link
          className="mr-auto w-[47%] gap-x-4 rounded-lg hover:bg-gray-90 flex bg-gray-97 py-3.5 px-5 sm:w-full"
          href={Route.DOCS + previousLinkUrl}
        >
          <ArrowIcon className="w-[18px] h-auto rotate-180" />
          <div className="flex flex-col">
            <span className="text-14 font-medium leading-none text-gray-50">Previous article</span>
            <span className="text-18 font-medium leading-snug text-gray-15 mt-2">
              {previousLink.title}
            </span>
          </div>
        </Link>
      )}
      {nextLinkUrl && (
        <Link
          className="ml-auto w-[47%] justify-between rounded-lg hover:bg-gray-90 flex bg-gray-97 py-3.5 px-5 sm:w-full"
          href={Route.DOCS + nextLinkUrl}
        >
          <div className="flex-col flex">
            <span className="text-14 font-medium leading-none text-gray-50">Next article</span>
            <span className="text-18 font-medium leading-snug text-gray-15 mt-2">
              {nextLink.title}
            </span>
          </div>
          <ArrowIcon className="w-[18px] h-auto" />
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
