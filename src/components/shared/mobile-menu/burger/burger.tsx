'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';

const ANIMATION_DURATION = 0.2;

const Burger = ({
  className,
  isToggled,
  onClick,
}: {
  className?: string;
  isToggled: boolean;
  onClick: () => void;
}) => (
  <LazyMotion features={domAnimation}>
    <m.button
      className={clsx(
        'fixed top-0 right-0 z-50 mt-[48px] px-[22px] py-[14px] sm:py-[10px] sm:pr-4',
        className,
      )}
      type="button"
      animate={isToggled ? 'toggled' : 'initial'}
      aria-label={isToggled ? 'Close menu' : 'Open menu'}
      onClick={onClick}
    >
      <span className="relative block h-7 w-7">
        <m.span
          className="absolute top-1 right-0 block h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
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
          className="absolute top-[13px] right-0 block h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
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
          className="absolute top-3.5 right-0 hidden h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
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
          className="absolute top-3.5 right-0 hidden h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
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

export default Burger;
