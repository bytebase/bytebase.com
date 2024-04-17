import { useEffect, useRef, useState } from 'react';

import { en, getRuleLocalizationKey } from '@/utils/sql-review';
import { useWindowHeight } from '@react-hook/window-size';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';

import { RuleCategory } from '@/types/sql-review';

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
  categoryList,
}: {
  className: string;
  categoryList: RuleCategory[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bannerSize, setBannerSize] = useState(0);
  const [containerHeight, setContainerHeight] = useState<string | undefined>(undefined);
  const height = useWindowHeight();
  const wrapperRef = useRef<null | HTMLDivElement>(null);
  const controls = useAnimation();
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // NOTE: this effect is needed to get the height of the top banner if it exists
  useEffect(() => {
    const banner = document.querySelector('.top-banner');
    if (banner) {
      setBannerSize(banner.clientHeight);
    }
  }, []);

  // 125px is the height of header + button Documentation menu
  useEffect(() => {
    setContainerHeight(`${height - 125 - bannerSize}px`);
  }, [height, bannerSize]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    controls.start(isOpen ? 'to' : 'from');
  }, [controls, isOpen]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(false);

    const id = e.currentTarget.hash.slice(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    // Changing hash without default jumps to anchor
    if (history.pushState) {
      history.pushState(null, '', `#${id}`);
    } else {
      // Old browser support
      window.location.hash = `#${id}`;
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <nav className={clsx('mobile-sidebar pt-[75px]', className)} ref={wrapperRef}>
        <button
          className="flex w-full cursor-pointer appearance-none items-center justify-between text-ellipsis border-b border-t border-gray-94 bg-gray-97 px-11 py-4 leading-none tracking-tight text-gray-15 outline-none transition-colors duration-200 hover:bg-gray-90 active:bg-gray-90 md:px-7 sm:px-4"
          type="button"
          onClick={toggleMenu}
        >
          <span>Rules menu</span>
          <span className="relative">
            <span
              className={clsx(
                'absolute -left-3 top-1/2 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
                isOpen ? 'rotate-45' : 'rotate-[135deg]',
              )}
            />
            <span
              className={clsx(
                'absolute -left-[7px] top-1/2 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
                isOpen ? '-rotate-45' : '-rotate-[135deg]',
              )}
            />
          </span>
        </button>

        <m.ul
          className="fixed inset-x-0 bottom-0 z-20 flex flex-col gap-y-6 overflow-y-scroll bg-white px-11 py-6 md:px-7 sm:px-4"
          initial="from"
          animate={controls}
          variants={variants}
          style={{ maxHeight: containerHeight, top: `${125 + bannerSize}px` }}
        >
          {categoryList.map(({ id, ruleList }) => {
            const lowerCaseId: string = id.toLocaleLowerCase();
            return (
              <div key={id}>
                <h3 className="text-14 font-bold uppercase leading-none tracking-[0.025em] text-gray-15">
                  {en.category[lowerCaseId]}
                </h3>
                <ul className="mt-3">
                  {ruleList.map(({ type }) => {
                    const key: string = getRuleLocalizationKey(type);

                    return (
                      <li className="group flex leading-tight" key={type}>
                        <a
                          className="py-[5px] text-14 leading-tight tracking-tight text-gray-40 group-first:pt-0 group-last:pb-0"
                          href={`#${key}`}
                          onClick={onClick}
                        >
                          {en.rule[key].title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </m.ul>
      </nav>
    </LazyMotion>
  );
};

export default MobileSidebar;
