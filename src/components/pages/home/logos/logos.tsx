import clsx from 'clsx';

import { FULL_LOGO_LIST } from '@/lib/logo-data';

const Logos = () => {
  return (
    <section className="mt-28 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0)34.28%,rgba(240,242,255,0.5)100%)] py-24 2xl:mt-24 2xl:py-20 xl:mt-20 xl:py-16 md:mt-12 md:py-12 sm:mt-8 sm:py-4">
      <div className="container flex flex-col items-center">
        <h2 className="max-w-3xl text-center font-title text-72 font-semibold leading-none xl:max-w-2xl xl:text-56 md:max-w-lg md:text-48 sm:text-40">
          8-in-1 Open-Source Database DevOps Solution
        </h2>
        <ul className="mt-16 grid max-w-[1133px] grid-cols-[repeat(4,auto)] flex-wrap justify-center gap-x-24 gap-y-12 2xl:mt-14 xl:mt-12 xl:max-w-[740px] xl:gap-x-16 xl:gap-y-8 md:mt-10 md:max-w-[580px] md:gap-x-10 md:gap-y-7 sm:mt-8 xs:flex xs:max-w-[460px] xs:flex-wrap xs:justify-center xs:gap-x-5 xs:gap-y-6">
          {FULL_LOGO_LIST.map((logo) => (
            <li key={logo.alt} className={clsx('flex items-center', logo.mobileOrderClassName)}>
              <img
                className="mx-auto h-16 xl:h-12 xl:w-auto md:h-10 xs:h-8"
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Logos;
