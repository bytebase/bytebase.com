import Image from 'next/image';
import NextLink from 'next/link';

import Route from '@/lib/route';

const SubscriptionForm = () => {
  return (
    <section className="mt-[206px] bg-primary-1 text-white 2xl:mt-[186px] lg:mt-[134px] md:mt-[74px] sm:mt-9">
      <div className="container gap-x-grid grid grid-cols-12 overflow-x-clip sm:flex sm:flex-col">
        <div className="col-span-5 col-start-2 -ml-10 lg:col-start-1 lg:ml-0 sm:relative">
          <Image
            className="-mt-[46px] -mb-[22px] lg:-mt-6 lg:h-[422px] lg:w-[376px] md:-mt-[15px] md:h-[342px] md:min-w-[305px] md:max-w-[305px] sm:hidden sm:h-[201px] sm:w-[170px]"
            src="/images/star-ship.png"
            width={464}
            height={521}
            alt=""
          />
          <Image
            className="hidden sm:absolute sm:-right-[86px] sm:-top-[82px] sm:block"
            src="/images/star-ship-sm.png"
            width={214}
            height={200}
            alt=""
          />
        </div>
        <div className="col-span-5 col-start-7 -ml-10 2xl:ml-0 lg:col-span-6 lg:col-start-7 lg:-ml-6 md:col-span-6 md:col-start-7 md:ml-0 sm:max-w-[80%] 2xs:max-w-none">
          <form className="py-[72px] lg:py-14 md:py-11 sm:py-10">
            <p>
              <b className="font-title text-88 font-semibold leading-none lg:text-68 lg:leading-104 md:text-56 md:leading-none sm:text-48 sm:leading-95">
                Subscribe to&nbsp;Newsletter
              </b>
            </p>
            <p className="relative mt-7 flex h-16 lg:mt-[22px] lg:h-12 md:mt-[10px] sm:mt-4">
              <input
                className=" remove-autocomplete-styles flex-grow rounded-l-full py-6 px-7 text-16 leading-none tracking-tight text-gray-40 placeholder-gray-15 outline-none lg:py-4 lg:px-5 sm:px-5"
                type="text"
                placeholder="Your email address..."
              />
              <button className="flex-shrink-0 rounded-r-full bg-black py-6 px-11 text-16 font-bold uppercase leading-none lg:py-4 md:py-3 md:px-5 sm:px-5 sm:py-3">
                <span className="md:hidden">Subscribe</span>{' '}
                <img src="/images/arrow-form.svg" alt="" className="hidden h-6 w-6 md:!block" />
              </button>
            </p>
            <p className="mt-5 text-14 leading-snug lg:mt-3 lg:max-w-[290px] sm:mt-2 [&>a]:border-b-[2px]">
              By subscribing, you agree with Revue&apos;s{' '}
              <NextLink href={Route.TERMS} className="border-b-[2px] border-[#FFFFFF40] pb-[3px]">
                Terms of Service
              </NextLink>{' '}
              and{' '}
              <NextLink href={Route.PRIVACY} className="border-b-[2px] border-[#FFFFFF40] pb-[3px]">
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
