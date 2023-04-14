import Image from 'next/image';

import { LinkUnderlined } from '@/components/shared/link-underlined';

const PromoChangeDatabase = () => {
  return (
    <section className="change mt-[160px] 2xl:mt-36 lg:mt-32 md:mt-24 sm:mt-20 bg-black text-white md:pt-16 xs:pt-[58px]">
      <div className="container grid grid-cols-12 grid-gap">
        <div className="self-center lg:self-auto lg:mt-[140px] md:mt-0 col-start-1 col-end-7 lg:col-end-6 md:col-end-13">
          <span className="inline-flex font-bold uppercase text-12 leading-none xs:leading-95 tracking-wider bg-primary-1 px-2.5 py-2 rounded-3xl">
            Change
          </span>
          <h2 className="mt-3.5 lg:mt-2.5 md:mt-1.5 xs:mt-2 font-title font-semibold leading-none lg:leading-95 text-112 lg:text-90 md:text-80 sm:text-48">
            <span className="bg-transparent text-secondary-1">Automate</span> database changes
          </h2>
          <p className="mt-7 2xl:mt-8 lg:mt-5 md:mt-3.5 text-20 lg:text-18 md:text-16 leading-normal lg:leading-snug max-w-[504px] 2xl:max-w-[460px] md:max-w-[590px]">
            Bytebase streamlines database deployment from non-prod to prod by integrating with
            version control systems for a GitOps workflow.
          </p>
          <div className="mt-8 lg:mt-6 md:mt-[16px] xs:mt-3 col-span-4 self-start">
            <LinkUnderlined to="">Learn more</LinkUnderlined>
          </div>
        </div>
        <div className="col-start-7 2xl:col-start-7 lg:col-start-6 col-end-13">
          <Image
            className="md:hidden w-fit -ml-3 2xl:ml-0 h-[904px] 2xl:h-[874px] lg:h-[743px]"
            src="/images/automate-database-changes-lg.png"
            width={610}
            height={904}
            alt=""
          />
        </div>
      </div>
      <div className="lg:mt-10 xs:mt-8 hidden md:block w-full">
        <Image
          className="ml-auto  hidden md:block"
          src="/images/automate-database-changes-md.png"
          alt=""
          width={1023}
          height={654}
        />
      </div>
    </section>
  );
};

export default PromoChangeDatabase;
