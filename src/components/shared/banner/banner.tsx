import Link from '@/components/shared/link';

import ArrowIcon from '@/svgs/arrow.inline.svg';

const Banner = ({ bannerText, bannerUrl }: { bannerText: string; bannerUrl: string }) => {
  return (
    <div className="banner relative z-20 bg-primary-1 text-white transition-colors duration-200 hover:bg-primary-2">
      <Link
        className="group/link relative -z-10 mx-auto flex h-14 w-full items-center justify-center px-4 sm:mx-0 sm:max-w-[90%] sm:justify-start xs:max-w-[85%]"
        href={bannerUrl}
      >
        <p className="text-center text-16 font-medium leading-tight transition-colors duration-200 line-clamp-1 md:text-14 sm:text-left">
          {bannerText}
        </p>
        <ArrowIcon className="ml-2 h-2.5 w-4 shrink-0 transition-transform duration-200 group-hover/link:translate-x-1 md:inline-block" />
      </Link>
    </div>
  );
};

export default Banner;
