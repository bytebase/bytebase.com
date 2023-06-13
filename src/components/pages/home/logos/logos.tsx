import clsx from 'clsx';

import LOGO_LIST from '@/lib/logo-data';

const Logos = () => {
  return (
    <section className="mt-40 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0)34.28%,rgba(240,242,255,0.5)100%)] py-36 2xl:mt-36 2xl:py-32 xl:mt-32 xl:py-28 md:mt-24 md:py-24 sm:mt-20 sm:py-16">
      <div className="container flex flex-col items-center">
        <h2 className="max-w-3xl text-center font-title text-72 font-semibold leading-none xl:max-w-2xl xl:text-56 md:max-w-lg md:text-48 sm:text-40">
          Trusted by engineers worldwide
        </h2>
        <ul className="mt-16 grid max-w-[1133px] grid-cols-[repeat(4,auto)] flex-wrap justify-center gap-x-24 gap-y-12 2xl:mt-14 xl:mt-12 xl:max-w-[740px] xl:gap-y-8 xl:gap-x-16 md:mt-10 md:max-w-[580px] md:gap-y-7 md:gap-x-10 sm:mt-8 xs:flex xs:max-w-[460px] xs:flex-wrap xs:justify-center xs:gap-x-5 xs:gap-y-6">
          {LOGO_LIST.map((logo) => (
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
