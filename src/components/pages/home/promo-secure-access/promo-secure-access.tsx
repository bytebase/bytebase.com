import Image from 'next/image';

import { LinkUnderlined } from '@/components/shared/link-underlined';

const PromoSecureAccess = () => {
  return (
    <section className="mt-[192px] bg-black text-white 2xl:mt-36 lg:mt-32 md:mt-24 md:pt-16 sm:mt-20 sm:pt-[58px]">
      <div className="container grid-gap grid grid-cols-12">
        <div className="col-start-1 col-end-7 self-center lg:col-end-6 md:col-end-13">
          <span className="inline-flex rounded-3xl bg-secondary-1 px-2.5 py-2 text-12 font-bold uppercase leading-none tracking-wider text-gray-15">
            Secure
          </span>
          <h2 className="mt-3.5 max-w-[400px] font-title text-112 font-semibold leading-none xl:leading-95 lg:mt-2 lg:text-90 md:mt-1.5 md:text-80 sm:mt-2 sm:text-48">
            <span className="bg-transparent text-secondary-3">Security</span> by design
          </h2>
          <p className="mt-8 max-w-[416px] text-20 leading-normal 2xl:max-w-[960px] lg:mt-4 lg:text-18 lg:leading-snug md:mt-3.5 md:max-w-[590px] md:text-16">
            Bytebase streamlines database deployment from non-prod to prod by integrating with
            version control systems for a GitOps workflow.
          </p>
          <div className="col-span-4 mt-8 self-start md:mt-3 sm:mt-3">
            <LinkUnderlined to="">Learn more</LinkUnderlined>
          </div>
        </div>
        <div className="col-start-7 col-end-13 2xl:col-start-7 lg:col-start-6">
          <Image
            className="ml-auto w-fit 2xl:h-auto md:hidden"
            src="/images/security-by-design-lg.png"
            width={716}
            height={904}
            alt=""
          />
        </div>
      </div>
      <div className="relative mt-10 hidden w-full md:block xs:mt-8">
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
