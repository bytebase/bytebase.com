import Image from 'next/image';

import { LinkUnderlined } from '@/components/shared/link-underlined';

const PromoChangeDatabase = () => {
  return (
    <section className="change mt-[160px] bg-black text-white 2xl:mt-36 lg:mt-32 md:mt-24 md:pt-16 sm:mt-20 xs:pt-[58px]">
      <div className="container gap-x-grid grid grid-cols-12">
        <div className="col-start-1 col-end-7 self-center lg:col-end-6 lg:mt-[140px] lg:self-auto md:col-end-13 md:mt-0">
          <span className="inline-flex rounded-3xl bg-primary-1 px-2.5 py-2 text-12 font-bold uppercase leading-none tracking-wider xs:leading-95">
            Change
          </span>
          <h2 className="mt-3.5 font-title text-112 font-semibold leading-none lg:mt-2.5 lg:text-90 lg:leading-95 md:mt-1.5 md:text-80 sm:text-48 xs:mt-2">
            <span className="bg-transparent text-secondary-1">Automate</span> database changes
          </h2>
          <p className="mt-7 max-w-[504px] text-20 leading-normal 2xl:mt-8 2xl:max-w-[460px] lg:mt-5 lg:text-18 lg:leading-snug md:mt-3.5 md:max-w-[590px] md:text-16">
            Bytebase streamlines database deployment from non-prod to prod by integrating with
            version control systems for a GitOps workflow.
          </p>
          <div className="col-span-4 mt-8 self-start lg:mt-6 md:mt-[16px] xs:mt-3">
            <LinkUnderlined to="">Learn more</LinkUnderlined>
          </div>
        </div>
        <div className="col-start-7 col-end-13 2xl:col-start-7 lg:col-start-6">
          <Image
            className="-ml-3 h-[904px] w-fit 2xl:ml-0 2xl:h-[874px] lg:h-[743px] md:hidden"
            src="/images/automate-database-changes-lg.png"
            width={610}
            height={904}
            alt=""
          />
        </div>
      </div>
      <div className="hidden w-full lg:mt-10 md:block xs:mt-8">
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
