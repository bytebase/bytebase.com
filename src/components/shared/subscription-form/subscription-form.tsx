'use client';

import Image from 'next/image';
import NextLink from 'next/link';

import { useEffect, useRef } from 'react';

import useIntersectionObserver from '@react-hook/intersection-observer';
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';

import Route from '@/lib/route';

const SubscriptionForm = () => {
  const ref = useRef(null);

  const { isIntersecting } = useIntersectionObserver(ref);

  const { rive, RiveComponent } = useRive({
    src: '/rive/rocket.riv',
    autoplay: false,
    stateMachines: 'SM',
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center,
    }),
    onLoad: () => {
      rive?.resizeDrawingSurfaceToCanvas();
    },
  });

  const input = useStateMachineInput(rive, 'SM', 'Type', false);

  useEffect(() => {
    if (rive && isIntersecting) {
      rive.play();
    }
  }, [rive, isIntersecting]);
  return (
    <section
      className="mt-[124px] bg-primary-1 text-white 3xl:mt-[110px] xl:mt-[97px] md:mt-[54px] sm:mt-4.5"
      ref={ref}
    >
      <div className="container gap-x-grid grid grid-cols-12 overflow-x-clip sm:flex sm:flex-col">
        <div className="relative col-span-5 col-start-2 -ml-10 xl:col-span-6 xl:col-start-1 xl:ml-0">
          <div className="absolute -top-14 -bottom-10 w-full xl:-top-6 xl:-bottom-8 md:-top-4.5 md:-bottom-4.5 sm:hidden">
            <div className="aspect-square w-full max-w-[520px] 3xl:-ml-2 3xl:max-w-[510px] xl:ml-0 xl:max-w-[410px] md:max-w-full">
              <RiveComponent />
            </div>
          </div>
          <Image
            className="hidden sm:absolute sm:-right-[86px] sm:-top-[84px] sm:block"
            src="/images/page/main/rocket.png"
            width={214}
            height={200}
            alt=""
          />
        </div>
        <div className="col-span-5 col-start-7 xl:col-span-6 xl:col-start-7 md:col-span-6 md:col-start-7  sm:max-w-[80%] 2xs:max-w-none">
          <form className="-ml-10 pt-16 pb-[75px] 3xl:ml-0 xl:-ml-6 xl:pb-[60px] xl:pt-[51px] md:ml-0 md:pt-10 md:pb-11 sm:pt-9 sm:pb-11">
            <h3 className="font-title text-88 font-semibold leading-none xl:text-68 xl:leading-104 md:text-56 md:leading-none sm:text-48 sm:leading-95">
              Subscribe to&nbsp;Newsletter
            </h3>
            <p className="relative mt-9 flex h-16 xl:mt-6 xl:h-12 md:mt-4 sm:mt-5">
              <input
                className="remove-autocomplete-styles flex-grow rounded-l-full py-6 px-7 text-16 leading-none tracking-tight text-gray-15 placeholder-gray-40 outline-none xl:py-4 xl:px-5 sm:px-5"
                type="text"
                placeholder="Your email address..."
                onInput={() => input?.fire()}
              />
              <button className="flex-shrink-0 rounded-r-full bg-black py-6 px-11 text-16 font-bold uppercase leading-none hover:bg-[#17225B] xl:py-4 md:py-3 md:px-5 sm:px-5 sm:py-3">
                <span className="md:hidden">Subscribe</span>{' '}
                <img
                  src="/images/arrow-form.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="hidden h-6 w-6 md:block"
                />
              </button>
            </p>
            <p className="mt-5 text-14 leading-snug xl:mt-3 xl:max-w-[290px] md:mt-2">
              By subscribing, you agree with Revue&apos;s{' '}
              <NextLink href={Route.TERMS} className="border-b-2 border-white border-opacity-40">
                Terms of Service
              </NextLink>{' '}
              and{' '}
              <NextLink href={Route.PRIVACY} className="border-b-2 border-white border-opacity-40">
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
