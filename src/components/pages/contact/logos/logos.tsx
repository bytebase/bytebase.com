import { FULL_LOGO_LIST } from '@/lib/logo-data';

const Logos = () => {
  return (
    <div className="col-span-5 mt-9 border-t border-gray-90 pt-9 lg:col-span-full lg:mt-0 lg:border-none lg:pt-0">
      <p className="text-18 leading-extra-tight text-gray-40">Over 3,000,000 downloads worldwide</p>
      <ul className="it mt-7 flex flex-wrap items-start gap-x-9 gap-y-5 2xl:gap-x-7 xl:gap-x-9 md:gap-x-6 xs:gap-x-5 xs:gap-y-6">
        {FULL_LOGO_LIST.map((logo, idx) => (
          <li key={idx} className={logo.mobileOrderClassName}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              className="h-10 2xl:h-[38px] xl:h-10 md:h-[38px] xs:h-8 xs:w-auto"
              src={logo.src}
              alt={logo.alt}
              width={logo.small.width}
              height={logo.small.height}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logos;
