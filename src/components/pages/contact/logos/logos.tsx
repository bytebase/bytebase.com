import Image from 'next/image';
import LOGO_LIST from '@/lib/logo-data';

const Logos = () => {
  return (
    <div className="col-span-5 mt-9 border-t border-gray-90 pt-9 lg:col-span-8 lg:mt-0 lg:border-none lg:pt-0 sm:col-span-full">
      <p className="text-18 leading-extra-tight text-gray-40">Trusted by engineers worldwide</p>
      <ul className="it mt-7 inline-grid grid-cols-[repeat(4,auto)] items-center gap-y-5 gap-x-9 xl:gap-x-8 md:gap-x-9 sm:flex sm:flex-wrap sm:gap-6">
        {LOGO_LIST.map((logo, idx) => (
          <li key={idx} className="flex justify-center">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image {...logo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logos;
