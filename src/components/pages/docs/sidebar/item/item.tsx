'use client';

import { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';

import Link from '@/components/shared/link';

import { SidebarItem } from '@/types/docs';

import Route from '@/lib/route';

import ChevronIcon from '../images/chevron.inline.svg';
import { usePathname } from 'next/navigation';

const isActiveItem = (children: SidebarItem[] | undefined, currentUrl: string): boolean => {
  if (!children) return false;

  return children.some(
    (item) => item.url === currentUrl || isActiveItem(item.children, currentUrl),
  );
};

const Item = ({
  title,
  url,
  children,
  depth,
  expandedList,
  closeMenu,
  isParentOpen = true,
}: {
  closeMenu?: () => void;
  expandedList?: string[];
  isParentOpen?: boolean;
} & SidebarItem) => {
  // Normalize the pathname to remove the trailing slash
  const pathname = (usePathname() ?? '').replace(/\/$/, '');
  const hasActiveChild = isActiveItem(children, pathname);
  const shouldBeOpen =
    url === pathname || hasActiveChild || (title && depth === 1 && expandedList?.includes(title));

  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const isActive = url === pathname;

  // Initialize open state after component mounts to avoid hydration issues
  useEffect(() => {
    setIsOpen(!!shouldBeOpen);
    setIsInitialized(true);
  }, [shouldBeOpen]);

  // Update open state when pathname changes (e.g., when coming from search)
  useEffect(() => {
    if (isInitialized && shouldBeOpen && !isOpen) {
      setIsOpen(true);
    }
  }, [pathname, shouldBeOpen, isOpen, isInitialized]);

  // Auto-scroll to active item
  useEffect(() => {
    if (isActive && itemRef.current && isInitialized && isOpen) {
      // Small delay to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        const element = itemRef.current;
        if (!element) return;

        const sidebar = element.closest('[data-sidebar]') || element.closest('.sidebar');

        if (sidebar) {
          const sidebarRect = sidebar.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();

          // Check if element is not visible in sidebar
          if (elementRect.top < sidebarRect.top || elementRect.bottom > sidebarRect.bottom) {
            element.scrollIntoView({
              behavior: 'instant',
              block: 'center',
            });
          }
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive, pathname, isInitialized, isOpen]);

  const toggle = () => {
    if (closeMenu && url) {
      closeMenu();
    }
    setIsOpen((prev) => !prev);
  };

  const Tag = url ? Link : 'button';

  if (title == '---') {
    return (
      <li>
        <hr className={clsx('mb-2 mt-2 w-3/5 opacity-10', '', '')} />
      </li>
    );
  }

  return (
    <li
      ref={itemRef}
      className={clsx('flex flex-col items-start', depth >= 2 && 'pl-4', !isParentOpen && 'hidden')}
    >
      <Tag
        className={clsx(
          'relative flex w-full items-center py-2 text-15 text-gray-30 transition-colors duration-200 before:absolute before:-left-[14.5px] before:top-1/2 before:h-4/5 before:w-0.5 before:-translate-y-1/2 before:rounded-sm before:transition-colors before:duration-200 hover:text-gray-60',
          depth === 1 ? 'font-semibold' : 'font-medium',
          url === pathname && 'text-primary-1',
          depth === 1 && hasActiveChild && 'text-black',
          depth >= 2 && url === pathname && 'before:bg-primary-1',
        )}
        href={url ?? ''}
        onClick={toggle}
      >
        {children && (
          <ChevronIcon
            className={clsx(
              'mr-2 h-2 w-2 shrink-0 transition-transform duration-200',
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
            'relative flex w-full flex-col before:absolute before:left-0.5 before:h-full before:w-px before:bg-gray-90',
            isOpen ? 'pointer-events-auto h-auto opacity-100' : 'pointer-events-none h-0 opacity-0',
          )}
        >
          {children.map((item, index) => (
            <Item
              {...item}
              closeMenu={closeMenu}
              isParentOpen={isOpen || false}
              key={item.url || item.title || index}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Item;
