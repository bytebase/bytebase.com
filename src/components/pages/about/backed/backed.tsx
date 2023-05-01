import Image from 'next/image';

import Pill from '@/components/shared/pill';

const Backed = () => (
  <section className="container mt-[165px] 3xl:mt-[144px] xl:mt-32 md:mt-24 sm:mt-[71px]">
    <div className="gap-x-grid grid grid-cols-12 sm:grid-cols-4">
      <Pill theme="secondary-1" className="col-span-full justify-self-center">
        Our Partners
      </Pill>
      <h2 className="col-span-full mt-3.5 justify-self-center text-center font-title text-88 font-semibold leading-none xl:mt-4 xl:text-68 md:mt-2 md:text-54 sm:text-48 sm:leading-95">
        Backed by the best
      </h2>
      <div className="md:py-21 col-span-6 row-start-3 mt-16 grid place-items-center border border-gray-90 bg-gray-97 py-20 xl:mt-12 xl:py-10 md:mt-11 sm:col-span-4 sm:mt-9 sm:py-12">
        <Image
          src="/images/page/about/matrix-logo.svg"
          alt="Matrix Partners"
          width={303}
          height={164}
          className="xl:h-[126px] xl:w-[233px] sm:h-[100px] sm:w-[185px]"
        />
      </div>
      <div className="col-span-6 row-start-3 mt-16 flex items-center border border-gray-90 xl:mt-12 md:mt-11 md:flex-col md:py-6 md:text-center sm:col-span-4 sm:row-start-4 sm:mt-4">
        <Image
          src="/images/page/about/cto.webp"
          alt=""
          width={308}
          height={306}
          className="self-start 3xl:hidden xl:w-[206px] md:w-[198px] md:self-center sm:w-[124px]"
        />
        <Image
          src="/images/page/about/cto-3xl.webp"
          alt=""
          width={296}
          height={296}
          className="hidden 3xl:block xl:w-[206px] md:hidden"
        />
        <Image
          src="/images/page/about/cto-md.webp"
          alt=""
          width={198}
          height={174}
          className="hidden md:block sm:w-[144px]"
        />
        <div>
          <p className="text-18 font-semibold leading-normal text-primary-1 xl:text-16 xl:leading-snug md:mt-2 md:text-15 sm:text-14">
            Co-Founder & CTO - PingCAP
          </p>
          <p className="mt-2 font-title text-56 font-semibold leading-none xl:mt-1.5 xl:text-44 md:mt-0.5 md:text-38 sm:text-34">
            Dongxu Huang
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Backed;
