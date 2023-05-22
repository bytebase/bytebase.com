'use client';

import useLocalStorage from 'react-use/lib/useLocalStorage';

import { LazyMotion, domAnimation, m } from 'framer-motion';

import Link from '@/components/shared/link';

import ArrowIcon from '@/svgs/arrow.inline.svg';
import CloseIcon from '@/svgs/close.inline.svg';

const animationVariants = {
  open: {
    height: '56px',
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    height: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const Banner = ({ bannerText, bannerUrl }: { bannerText: string; bannerUrl: string }) => {
  const [hasBanner, setHasBanner] = useLocalStorage('isBanner', true);

  const isClient = typeof window !== 'undefined';

  const closeBanner = () => {
    setHasBanner(false);
  };
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="banner relative z-20 bg-primary-1 text-white transition-colors duration-200 hover:bg-primary-2"
        variants={animationVariants}
        initial="closed"
        animate={hasBanner && isClient ? 'open' : 'closed'}
      >
        <Link
          className="container group/link relative flex h-14 max-w-[80%] items-center justify-center"
          href={bannerUrl}
        >
          <p className="text-center text-16 font-medium leading-tight transition-colors duration-200 line-clamp-1 md:text-14">
            {bannerText}
          </p>
          <ArrowIcon className="ml-2 h-2.5 w-4 shrink-0 transition-transform duration-200 group-hover/link:translate-x-[4px] md:inline-block xs:hidden" />
        </Link>
        <button
          type="button"
          className="group/button absolute right-0 top-0 flex h-14 w-14 items-center justify-center p-5"
          aria-label="Close the promo banner"
          onClick={closeBanner}
        >
          <CloseIcon className="h-3 w-3 shrink-0 text-white transition-colors duration-200 group-hover/button:text-gray-80" />
        </button>
      </m.div>
    </LazyMotion>
  );
};

export default Banner;
