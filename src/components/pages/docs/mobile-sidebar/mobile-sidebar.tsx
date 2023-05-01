'use client';

import { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';

import useClickOutside from '@/hooks/use-click-outside';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';

import { SidebarItem } from '@/types/docs';

import Item from '../sidebar/item';

const ANIMATION_DURATION = 0.2;

const variants = {
  from: {
    opacity: 0,
    translateY: 10,
    transition: {
      duration: ANIMATION_DURATION,
    },
    transitionEnd: {
      zIndex: -1,
    },
  },
  to: {
    zIndex: 20,
    opacity: 1,
    translateY: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

const MobileSidebar = ({
  className,
  data,
  currentUrl,
  expandedList,
}: {
  className?: string;
  data: SidebarItem[];
  currentUrl: string;
  expandedList?: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState<string | undefined>(undefined);
  const { height } = useWindowSize();
  const wrapperRef = useRef<null | HTMLDivElement>(null);
  const controls = useAnimation();
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const onOutsideClick = () => {
    setIsOpen(false);
  };

  useClickOutside([wrapperRef], onOutsideClick);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  // 122px is the height of header + button Documentation menu
  useEffect(() => {
    setContainerHeight(`${height - 122}px`);
  }, [height]);

  useEffect(() => {
    controls.start(isOpen ? 'to' : 'from');
  }, [controls, isOpen]);
  return (
    <LazyMotion features={domAnimation}>
      <nav className={clsx('safe-paddings relative', className)} ref={wrapperRef}>
        <button
          className="relative z-10 flex w-full cursor-pointer appearance-none items-center justify-between text-ellipsis border-t border-b border-gray-94 bg-gray-97 py-4 px-7 leading-none outline-none transition-colors duration-200 hover:bg-gray-90 active:bg-gray-90 sm:px-4"
          type="button"
          onClick={toggleMenu}
        >
          <span>Documentation menu</span>

          <span className="relative">
            <span
              className={clsx(
                'absolute top-1/2 -left-[17px] h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
                isOpen ? 'rotate-45' : 'rotate-[135deg]',
              )}
            />
            <span
              className={clsx(
                'absolute top-1/2 -left-3 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
                isOpen ? '-rotate-45' : '-rotate-[135deg]',
              )}
            />
          </span>
        </button>

        <m.ul
          className={clsx(
            'fixed inset-x-0 top-[122px] bottom-0 z-20 flex flex-col overflow-y-scroll bg-white px-7 py-4 sm:px-4',
          )}
          initial="from"
          animate={controls}
          variants={variants}
          style={{ maxHeight: containerHeight }}
        >
          {data.map((item, index) => (
            <Item {...item} currentUrl={currentUrl} expandedList={expandedList} key={index} />
          ))}
        </m.ul>
      </nav>
    </LazyMotion>
  );
};

export default MobileSidebar;
