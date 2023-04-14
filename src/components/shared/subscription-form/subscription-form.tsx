import Image from 'next/image';
import NextLink from 'next/link';

import Route from '@/lib/route';

const SubscriptionForm = () => {
  return (
    <section className="mt-[206px] 2xl:mt-[186px] lg:mt-[134px] md:mt-[74px] sm:mt-9 bg-primary-1 text-white">
      <div className="container grid grid-cols-12 grid-gap sm:flex sm:flex-col overflow-x-clip">
        <div className="col-start-2 -ml-10 lg:ml-0 col-span-5 lg:col-start-1 sm:relative">
          <Image
            className="-mt-[46px] lg:-mt-6 md:-mt-[15px] -mb-[22px] lg:h-[422px] lg:w-[376px] md:max-w-[305px] md:min-w-[305px] md:h-[342px] sm:h-[201px] sm:w-[170px] sm:hidden"
            src="/images/star-ship.png"
            width={464}
            height={521}
            alt=""
          />
          <Image
            className="sm:absolute sm:-right-[86px] sm:-top-[82px] hidden sm:block"
            src="/images/star-ship-sm.png"
            width={214}
            height={200}
            alt=""
          />
        </div>
        <div className="col-start-7 -ml-10 2xl:ml-0 col-span-5 lg:col-start-7 lg:-ml-6 md:ml-0 lg:col-span-6 md:col-start-7 md:col-span-6 sm:max-w-[80%] 2xs:max-w-none">
          <form className="py-[72px] lg:py-14 md:py-11 sm:py-10">
            <p>
              <b className="text-88 lg:text-68 md:text-56 sm:text-48 font-semibold leading-none lg:leading-104 md:leading-none sm:leading-95 font-title">
                Subscribe to&nbsp;Newsletter
              </b>
            </p>
            <p className="mt-7 lg:mt-[22px] md:mt-[10px] sm:mt-4 flex relative h-16 lg:h-12">
              <input
                className=" placeholder-gray-15 remove-autocomplete-styles outline-none flex-grow py-6 lg:py-4 px-7 lg:px-5 sm:px-5 text-16 leading-none tracking-tight text-gray-40 rounded-l-full"
                type="text"
                placeholder="Your email address..."
              />
              <button className="flex-shrink-0 bg-black py-6 lg:py-4 px-11 md:py-3 md:px-5 sm:px-5 sm:py-3 rounded-r-full uppercase text-16 font-bold leading-none">
                <span className="md:hidden">Subscribe</span>{' '}
                <img src="/images/arrow-form.svg" alt="" className="hidden md:!block w-6 h-6" />
              </button>
            </p>
            <p className="mt-5 lg:mt-3 sm:mt-2 [&>a]:border-b-[2px] text-14 leading-snug lg:max-w-[290px]">
              By subscribing, you agree with Revue&apos;s{' '}
              <NextLink href={Route.TERMS} className="pb-[3px] border-b-[2px] border-[#FFFFFF40]">
                Terms of Service
              </NextLink>{' '}
              and{' '}
              <NextLink href={Route.PRIVACY} className="pb-[3px] border-b-[2px] border-[#FFFFFF40]">
                Privacy Policy
              </NextLink>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionForm;
