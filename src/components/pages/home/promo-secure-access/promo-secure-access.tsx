import Image from 'next/image';

import { LinkUnderlined } from '@/components/shared/link-underlined';

const PromoSecureAccess = () => {
  return (
    <section className="mt-[192px] 2xl:mt-36 lg:mt-32 md:mt-24 sm:mt-20 bg-black text-white md:pt-16 sm:pt-[58px]">
      <div className="container grid grid-cols-12 grid-gap">
        <div className="self-center col-start-1 col-end-7 lg:col-end-6 md:col-end-13">
          <span className="inline-flex font-bold uppercase text-12 leading-none tracking-wider bg-secondary-1 px-2.5 py-2 rounded-3xl text-gray-15">
            Secure
          </span>
          <h2 className="mt-3.5 lg:mt-2 md:mt-1.5 sm:mt-2 font-title font-semibold leading-none xl:leading-95 text-112 lg:text-90 md:text-80 sm:text-48 max-w-[400px]">
            <span className="bg-transparent text-secondary-3">Security</span> by design
          </h2>
          <p className="mt-8 lg:mt-4 md:mt-3.5 text-20 lg:text-18 md:text-16 leading-normal lg:leading-snug max-w-[416px] 2xl:max-w-[960px] md:max-w-[590px]">
            Bytebase streamlines database deployment from non-prod to prod by integrating with
            version control systems for a GitOps workflow.
          </p>
          <div className="mt-8 md:mt-3 sm:mt-3 col-span-4 self-start">
            <LinkUnderlined to="">Learn more</LinkUnderlined>
          </div>
        </div>
        <div className="col-start-7 2xl:col-start-7 lg:col-start-6 col-end-13">
          <Image
            className="md:hidden ml-auto w-fit 2xl:h-auto"
            src="/images/security-by-design-lg.png"
            width={716}
            height={904}
            alt=""
          />
        </div>
      </div>
      <div className="relative mt-10 xs:mt-8 hidden md:block w-full">
        <Image
          className="ml-auto hidden md:block"
          src="/images/security-by-design-md.png"
          alt=""
          width={1023}
          height={654}
        />
      </div>
    </section>
  );
};

export default PromoSecureAccess;
