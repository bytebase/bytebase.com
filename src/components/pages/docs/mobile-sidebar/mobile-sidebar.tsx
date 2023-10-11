'use client';

import { useEffect, useRef, useState } from 'react';

import useClickOutside from '@/hooks/use-click-outside';
import { useWindowHeight } from '@react-hook/window-size';
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

// TODO: refactor this component to use the same component instead of duplicating it
const MobileSidebar = ({
  className,
  data,
  expandedList,
}: {
  className?: string;
  data: SidebarItem[];
  expandedList?: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bannerSize, setBannerSize] = useState(0);
  const [containerHeight, setContainerHeight] = useState<string | undefined>(undefined);
  const height = useWindowHeight();
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

  // NOTE: this effect is needed to get the height of the top banner if it exists
  useEffect(() => {
    const banner = document.querySelector('.top-banner');
    if (banner) {
      setBannerSize(banner.clientHeight);
    }
  }, []);

  // 122px is the height of header + button Documentation menu
  useEffect(() => {
    setContainerHeight(`${height - 122 - bannerSize}px`);
  }, [height, bannerSize]);

  useEffect(() => {
    controls.start(isOpen ? 'to' : 'from');
  }, [controls, isOpen]);

  return (
    <LazyMotion features={domAnimation}>
      <nav className={clsx('relative', className)} ref={wrapperRef}>
        <button
          className="relative z-10 flex w-full cursor-pointer appearance-none items-center justify-between text-ellipsis border-b border-t border-gray-94 bg-gray-97 px-7 py-4 leading-none outline-none transition-colors duration-200 hover:bg-gray-90 active:bg-gray-90 sm:px-4"
          type="button"
          onClick={toggleMenu}
        >
          <span>Documentation menu</span>

          <span className="relative">
            <span
              className={clsx(
                'absolute -left-[17px] top-1/2 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
                isOpen ? 'rotate-45' : 'rotate-[135deg]',
              )}
            />
            <span
              className={clsx(
                'absolute -left-3 top-1/2 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
                isOpen ? '-rotate-45' : '-rotate-[135deg]',
              )}
            />
          </span>
        </button>

        <m.ul
          className="fixed inset-x-0 bottom-0 z-20 flex flex-col overflow-y-scroll bg-white px-7 py-4 sm:px-4"
          initial="from"
          animate={controls}
          variants={variants}
          style={{ maxHeight: containerHeight, top: `${122 + bannerSize}px` }}
        >
          {data.map((item, index) => (
            <Item {...item} closeMenu={toggleMenu} expandedList={expandedList} key={index} />
          ))}
        </m.ul>
      </nav>
    </LazyMotion>
  );
};

export default MobileSidebar;
