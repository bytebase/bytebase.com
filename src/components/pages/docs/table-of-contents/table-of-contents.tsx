import { RefObject, useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import debounce from '@/utils/debounce';
import clsx from 'clsx';

import BackToTopIcon from '@/svgs/back-to-top.inline.svg';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: RefObject<HTMLDivElement>;
}

const TableOfContents = ({ contentRef }: TableOfContentsProps): JSX.Element | null => {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
  const [debouncedActiveAnchor, setDebouncedActiveAnchor] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    const anchors = items.map(({ id }) => document.getElementById(id));
    const currentActiveAnchor = anchors.find((anchor) => {
      const top = anchor?.getBoundingClientRect()?.top;
      return top && top >= 0 && top <= window.innerHeight;
    });
    if (currentActiveAnchor) {
      setActiveAnchor(`#${currentActiveAnchor.id}`);
    }
  }, [items]);

  useEffect(() => {
    const cb = debounce(handleScroll, 250);
    window.addEventListener('scroll', cb);
    return () => {
      window.removeEventListener('scroll', cb);
    };
  }, [handleScroll]);

  useDebounce(() => setDebouncedActiveAnchor(activeAnchor), 10, [activeAnchor]);

  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h2, h3');
      const arr = Array.from(headings).map((heading) => ({
        id: heading.id,
        text: heading.textContent ?? '',
        level: heading.tagName === 'H2' ? 2 : 3,
      }));
      setItems(arr);
    }
  }, [contentRef]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    document.querySelector(anchor)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    // changing hash without default jumps to anchor
    // eslint-disable-next-line no-restricted-globals
    if (history.pushState) {
      // eslint-disable-next-line no-restricted-globals
      history.pushState(false, '', anchor.toString());
    } else {
      // old browser support
      window.location.hash = anchor;
    }
  };

  if (items.length === 0) return null;

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className="table-of-contents">
      <div className="pl-5 relative before:absolute before:w-px before:h-full before:bg-gray-90 before:top-0 before:left-px">
        <h3 className="uppercase font-bold text-14 leading-none tracking-tight">
          Table of contents
        </h3>
        <ul className="mt-3 flex flex-col border-b border-gray-90 pb-6">
          {items.map(({ id, text, level }) => (
            <li
              className={clsx(
                'py-2 text-15 relative before:absolute before:w-0.5 before:h-4/5 before:-left-[19.5px] before:duration-200 before:transition-colors before:rounded-sm before:top-1/2 before:-translate-y-1/2 font-medium',
                {
                  'before:bg-primary-1': debouncedActiveAnchor === `#${id}`,
                },
              )}
              key={id}
            >
              <a
                className={clsx(
                  'flex hover:text-gray-60 transition-colors text-gray-30 duration-200',
                  {
                    'pl-2.5': level === 3,
                    'text-primary-1': debouncedActiveAnchor === `#${id}`,
                  },
                )}
                href={`#${id}`}
                onClick={(e) => handleAnchorClick(e, `#${id}`)}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        className="flex gap-x-2 pl-5 pb-5 text-15 text-gray-30 hover:text-gray-60 duration-200 transition-colors mt-8 items-center font-medium"
        type="button"
        onClick={backToTop}
      >
        <BackToTopIcon className="w-[18px] h-[18px]" />
        <span>Back to top</span>
      </button>
    </nav>
  );
};

export default TableOfContents;
