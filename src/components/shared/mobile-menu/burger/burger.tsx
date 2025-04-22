'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import PROMO_DATA from '@/lib/promo-data';

const ANIMATION_DURATION = 0.2;

const Burger = ({
  className,
  isToggled,
  onClick,
}: {
  className?: string;
  isToggled: boolean;
  onClick: () => void;
}) => {
  const topBanner = PROMO_DATA.TOP_BANNER;
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the banner height
      const bannerHeight = topBanner ? 40 : 0;
      const currentPosition = window.scrollY;

      setScrollPosition(currentPosition);
      setIsSticky(currentPosition >= bannerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [topBanner]);

  return (
    <LazyMotion features={domAnimation}>
      <m.button
        className={clsx(
          'fixed right-0 z-50 px-[22px] py-[14px] transition-all duration-200 sm:py-[10px] sm:pr-4',
          isSticky ? 'top-0' : `top-0 ${topBanner ? 'mt-[40px]' : ''}`,
          className,
        )}
        type="button"
        animate={isToggled ? 'toggled' : 'initial'}
        aria-label={isToggled ? 'Close menu' : 'Open menu'}
        onClick={onClick}
      >
        <span className="relative block h-7 w-7">
          <m.span
            className="absolute right-0 top-1 block h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
            variants={{
              initial: {
                top: 4,
                display: 'block',
                transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
              },
              toggled: {
                top: 9,
                transition: { duration: ANIMATION_DURATION },
                transitionEnd: { display: 'none' },
              },
            }}
          />
          <m.span
            className="absolute right-0 top-[13px] block h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
            variants={{
              initial: {
                display: 'block',
                transition: { delay: ANIMATION_DURATION },
              },
              toggled: {
                display: 'none',
                transition: { delay: ANIMATION_DURATION },
              },
            }}
          />
          <m.span
            className="absolute bottom-1 right-0 block h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
            variants={{
              initial: {
                bottom: 4,
                display: 'block',
                transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
              },
              toggled: {
                bottom: 9,
                transition: { duration: ANIMATION_DURATION },
                transitionEnd: { display: 'none' },
              },
            }}
          />
          <m.span
            className="absolute right-0 top-3.5 hidden h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
            variants={{
              initial: {
                rotate: '0deg',
                transition: { duration: ANIMATION_DURATION },
                transitionEnd: { display: 'none' },
              },
              toggled: {
                display: 'block',
                rotate: '45deg',
                transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
              },
            }}
          />
          <m.span
            className="absolute right-0 top-3.5 hidden h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
            variants={{
              initial: {
                rotate: '0deg',
                transition: { duration: ANIMATION_DURATION },
                transitionEnd: { display: 'none' },
              },
              toggled: {
                display: 'block',
                rotate: '-45deg',
                transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
              },
            }}
          />
        </span>
      </m.button>
    </LazyMotion>
  );
};

export default Burger;
