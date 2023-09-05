'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useThrottleCallback } from '@react-hook/throttle';
import clsx from 'clsx';

import { TableOfContents as TOCProps } from '@/types/docs';

import BackToTopIcon from '@/svgs/back-to-top.inline.svg';
import SocialLinks from '../../blog/aside/social-links';
import { SocialLink } from '../../blog/aside/social-links/social-links';

type TableOfContentsProps = {
  items: TOCProps[];
  hasBackToTop?: boolean;
  className?: string;
};

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const onClick = (evt: React.MouseEvent<HTMLAnchorElement>, id: string) => {
  evt.preventDefault();

  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  // Changing hash without default jumps to anchor
  if (history.pushState) {
    history.pushState(false, '', `#${id}`);
  } else {
    // Old browser support
    window.location.hash = `#${id}`;
  }
};

const SocialItems = [
  {
    network: 'twitter',
  },
  {
    network: 'linkedIn',
  },
  {
    network: 'hackerNews',
  },
] as SocialLink[];

const CURRENT_ANCHOR_GAP_PX = 16;

const TableOfContents = ({ items, hasBackToTop, className }: TableOfContentsProps) => {
  const titles = useRef<HTMLElement[]>([]);
  const [currentAnchor, setCurrentAnchor] = useState<string | null>(null);

  useEffect(() => {
    titles.current = items
      .map(({ id }) => document.getElementById(id))
      .filter((anchor): anchor is HTMLElement => anchor !== null);
  }, []);

  const updateCurrentAnchor = useCallback(() => {
    const currentTitleIdx = titles.current.findIndex(
      (anchor) => anchor.getBoundingClientRect().top - CURRENT_ANCHOR_GAP_PX >= 0,
    );

    const idx =
      currentTitleIdx === -1 ? titles.current.length - 1 : Math.max(currentTitleIdx - 1, 0);

    const currentTitle = titles.current[idx];

    setCurrentAnchor(currentTitle.id);
  }, []);

  const onScroll = useThrottleCallback(updateCurrentAnchor, 5);

  useEffect(() => {
    updateCurrentAnchor();

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={clsx(className, 'table-of-contents lg:hidden')}>
      <div className="relative pl-5 before:absolute before:top-0 before:left-px before:h-full before:w-px before:bg-gray-90">
        <h3 className="text-14 font-bold uppercase leading-none tracking-tight">
          Table of contents
        </h3>
        <ul className={clsx(hasBackToTop && 'border-b border-gray-90 pb-6', 'mt-3 flex flex-col')}>
          {items.map(({ id, title, level }, idx) => (
            <li
              className={clsx(
                'relative py-2 text-15 font-medium before:absolute before:-left-[19.5px] before:top-1/2 before:h-4/5 before:w-0.5 before:-translate-y-1/2 before:rounded-sm before:transition-colors before:duration-200',
                {
                  'before:bg-primary-1': currentAnchor === id,
                },
              )}
              // use index as key because of duplicated ids in the docs
              key={idx}
            >
              <a
                className={clsx(
                  'flex text-gray-30 transition-colors duration-200 hover:text-gray-60',
                  {
                    'pl-2.5': level === 3,
                    'text-primary-1': currentAnchor === id,
                  },
                )}
                href={`#${id}`}
                onClick={(e) => onClick(e, id)}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {hasBackToTop && (
        <button
          className="mt-8 flex items-center gap-x-2 pl-5 text-15 font-medium text-gray-30 transition-colors duration-200 hover:text-gray-60"
          type="button"
          onClick={backToTop}
        >
          <BackToTopIcon className="h-[18px] w-[18px]" />
          <span>Back to top</span>
        </button>
      )}

      <div className="mt-4 flex w-full flex-col items-start justify-start pl-5">
        <h3 className="text-14">Share this article</h3>
        <SocialLinks items={SocialItems} />
      </div>
    </nav>
  );
};

export default TableOfContents;
