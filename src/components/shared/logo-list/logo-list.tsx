import Image from 'next/image';

import { Logo } from '@/types/logo';

export type LogoListProps = {
  list: Logo[];
};

export const LogoList = ({ list }: LogoListProps) => {
  return (
    <section className="container flex flex-col items-center">
      <ul
        className={`mt-12 grid max-w-[1000px] grid-cols-${list.length} gap-x-24 gap-y-12 2xl:mt-14 xl:mt-12 xl:max-w-[740px] xl:gap-x-16 xl:gap-y-8 md:mt-10 md:max-w-[660px] md:gap-x-10 md:gap-y-7 sm:mt-8 xs:flex xs:max-w-[460px] xs:flex-wrap xs:justify-center xs:gap-x-6 xs:gap-y-6`}
      >
        {list.map((logo) => (
          <li key={logo.alt} className="mx-auto flex items-center xs:mx-0">
            <Image
              className="xl:h-12 xl:w-auto md:h-10 xs:h-8"
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
