'use client';

import Image from 'next/image';

import { useEffect, useRef } from 'react';

import useIntersectionObserver from '@react-hook/intersection-observer';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';

import { LinkUnderlined } from '@/components/shared/link-underlined';

const PromoAutomationChanges = () => {
  const ref = useRef(null);

  const { isIntersecting } = useIntersectionObserver(ref, { rootMargin: '-150px' });

  const { rive, RiveComponent } = useRive({
    src: '/rive/automation-changes.riv',
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

  useEffect(() => {
    if (rive && isIntersecting) {
      rive.play();
    }
  }, [rive, isIntersecting]);

  return (
    <section
      className="md: mt-[146px] overflow-hidden bg-black text-white 3xl:mt-[117px] xl:mt-[100px] lg:mt-[80px]"
      ref={ref}
    >
      <div className="container gap-x-grid grid grid-cols-12 md:grid-cols-none">
        <div className="col-start-1 col-end-5 py-[175px] 3xl:py-[160px] xl:col-end-6 xl:py-[140px] md:col-auto md:py-0 md:pt-16 sm:pt-[60px]">
          <span className="inline-flex rounded-3xl bg-primary-1 px-2.5 py-2 text-12 font-bold uppercase leading-none tracking-wider xs:leading-95">
            Change
          </span>
          <h2 className="mt-3 font-title text-112 font-semibold leading-none 3xl:mt-3.5 xl:mt-2.5 xl:text-90 xl:leading-95 lg:mt-3 lg:text-80 md:mt-1.5 sm:mt-2 sm:text-48">
            <span className="bg-transparent text-secondary-1">Automate</span> database changes
          </h2>
          <p className="-mr-10 mt-8 text-20 leading-normal xl:mt-5 xl:mr-0 xl:text-18 xl:leading-snug lg:mt-2 md:mt-4 md:max-w-xl md:text-16 sm:mt-3 sm:max-w-none">
            Bytebase streamlines database deployment from non-prod to prod by integrating with
            version control systems for a GitOps workflow.
          </p>
          <LinkUnderlined className="mt-8 xl:mt-7 lg:mt-4 md:mt-3" href="#">
            Learn more
          </LinkUnderlined>
        </div>
        <div className="relative col-start-5 col-end-13 self-stretch pt-[100px] before:absolute before:bottom-0 before:top-0 before:right-[166px] before:w-[252px] before:bg-automation-changes 3xl:pt-[84px] 3xl:before:right-[40px] xl:col-start-6 xl:pt-[115px] xl:before:right-[20px] xl:before:w-[216px]  md:col-auto md:-mx-7 md:pt-10 md:pb-10 md:before:right-0 md:before:top-auto md:before:h-[315px] md:before:w-full md:before:bg-automation-changes-phone sm:-mx-4 sm:pb-7 sm:pt-[30px] sm:before:h-[260px]">
          <div className="relative ml-auto mr-[64px] aspect-[1.0597014925] w-full max-w-[710px] 3xl:-mr-[60px] xl:-mr-[46px] md:hidden">
            <RiveComponent />
          </div>
          <Image
            src="/images/page/main/automation-changes-tablet.png"
            width={626}
            height={614}
            alt=""
            loading="lazy"
            className="relative mx-auto hidden md:block sm:hidden"
          />
          <Image
            src="/images/page/main/automation-changes-phone.png"
            width={348}
            height={408}
            alt=""
            loading="lazy"
            className="relative mx-auto hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoAutomationChanges;
