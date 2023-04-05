import { MouseEventHandler } from 'react';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';

const ANIMATION_DURATION = 0.2;

type BurgerProps = {
  className?: string;
  isToggled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Burger = ({ className, isToggled = false, onClick }: BurgerProps) => (
  <LazyMotion features={domAnimation}>
    <m.button
      className={clsx('relative h-[72px] w-[72px] shrink-0 py-[22px]', className)}
      type="button"
      animate={isToggled ? 'toggled' : 'initial'}
      aria-label={isToggled ? 'Close menu' : 'Open menu'}
      onClick={onClick}
    >
      <m.span
        className="absolute top-[22px] right-0 block h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
        variants={{
          initial: {
            top: 22,
            display: 'block',
            transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
          },
          toggled: {
            top: 31,
            transition: { duration: ANIMATION_DURATION },
            transitionEnd: { display: 'none' },
          },
        }}
      />
      <m.span
        className="absolute top-[31px] right-0 block h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
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
        className="absolute top-10 right-0 block h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
        variants={{
          initial: {
            bottom: 22,
            display: 'block',
            transition: { duration: ANIMATION_DURATION, delay: ANIMATION_DURATION },
          },
          toggled: {
            bottom: 31,
            transition: { duration: ANIMATION_DURATION },
            transitionEnd: { display: 'none' },
          },
        }}
      />
      <m.span
        className="absolute top-[31px] right-0 hidden h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
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
        className="absolute top-[31px] right-0 hidden h-0.5 w-7 rounded-full bg-gray-15 transition-colors duration-200"
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
    </m.button>
  </LazyMotion>
);

export default Burger;
