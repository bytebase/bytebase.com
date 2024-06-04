import Image from 'next/image';
import { FULL_LOGO_LIST } from '@/lib/logo-data';

const Logos = () => {
  return (
    <section className="container flex flex-col items-center">
      <h2 className="max-w-3xl text-center font-title text-56 font-semibold leading-none xl:max-w-2xl xl:text-56 md:max-w-lg md:text-48 sm:text-40">
        8-in-1 Open-Source Database DevOps Solution
      </h2>
      <ul className="mt-12 grid max-w-[1000px] grid-cols-4 gap-x-24 gap-y-12 2xl:mt-14 xl:mt-12 xl:max-w-[740px] xl:gap-x-16 xl:gap-y-8 md:mt-10 md:max-w-[660px] md:gap-x-10 md:gap-y-7 sm:mt-8 xs:flex xs:max-w-[460px] xs:flex-wrap xs:justify-center xs:gap-x-6 xs:gap-y-6">
        {FULL_LOGO_LIST.map((logo) => (
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

export default Logos;
