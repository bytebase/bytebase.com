'use client';

import Link from '@/components/shared/link';

import ArrowIcon from '@/svgs/arrow.inline.svg';

const Banner = ({ bannerText, bannerUrl }: { bannerText: string; bannerUrl: string }) => (
  <Link className="banner group relative z-20 block bg-primary-1 py-5 text-white" href={bannerUrl}>
    <div className="container relative flex items-center justify-center">
      <p className="text-center text-16 font-medium leading-tight line-clamp-1 md:text-14">
        {bannerText}
      </p>
      <ArrowIcon className="ml-2 h-2.5 w-4 shrink-0 transition-opacity duration-300 group-hover:opacity-70 md:inline-block" />
    </div>
  </Link>
);

export default Banner;
