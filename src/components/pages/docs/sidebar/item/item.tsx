'use client';

import { useState } from 'react';

import clsx from 'clsx';

import Link from '@/components/shared/link';

import { SidebarItem } from '@/types/docs';

import Route from '@/lib/route';

import ChevronIcon from '../images/chevron.inline.svg';

const isActiveItem = (children: SidebarItem[] | undefined, currentUrl: string): boolean => {
  if (!children) return false;

  return children.some(
    (item) => item.url === currentUrl || isActiveItem(item.children, currentUrl),
  );
};

interface ItemProps extends SidebarItem {
  currentUrl: string;
  expandedList?: string[];
}

const Item = ({ title, url, children, depth, currentUrl, expandedList }: ItemProps) => {
  const hasActiveChild = isActiveItem(children, currentUrl);
  const [isOpen, setIsOpen] = useState(() => {
    return (
      url === currentUrl ||
      hasActiveChild ||
      (title && depth === 1 && expandedList?.includes(title))
    );
  });

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const Tag = url ? Link : 'button';

  return (
    <li
      className={clsx('flex flex-col items-start', {
        'pl-4': depth >= 2,
      })}
    >
      <Tag
        className={clsx(
          'text-gray-30 text-15 py-2 flex items-center w-full hover:text-gray-60 duration-200 transition-colors relative before:absolute before:transition-colors before:duration-200 before:w-0.5 before:h-4/5 before:rounded-sm before:top-1/2 before:-translate-y-1/2 before:-left-[14.5px]',
          depth === 1 ? 'font-semibold' : 'font-medium',
          url === currentUrl && 'text-primary-1',
          depth === 1 && hasActiveChild && 'text-black',
          depth >= 2 && url === currentUrl && 'before:bg-primary-1',
        )}
        href={Route.DOCS + url}
        onClick={toggle}
      >
        {children && (
          <ChevronIcon
            className={clsx(
              'w-[5px] h-1.5 mr-2 transition-transform duration-200 shrink-0',
              depth === 1 && hasActiveChild && 'text-primary-1',
              {
                'rotate-90': isOpen,
              },
            )}
          />
        )}
        <span>{title}</span>
      </Tag>

      {children && (
        <ul
          className={clsx(
            'w-full before:absolute before:left-0.5 before:h-full before:w-px before:bg-gray-90 relative flex flex-col',
            isOpen ? 'h-auto opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none',
          )}
        >
          {children.map((item, index) => (
            <Item {...item} currentUrl={currentUrl} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Item;
