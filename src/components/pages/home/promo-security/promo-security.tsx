'use client';

import Image from 'next/image';

import { useEffect, useRef } from 'react';

import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';

import { LinkUnderlined } from '@/components/shared/link-underlined';
import Pill from '@/components/shared/pill';

import Route from '@/lib/route';

const PromoSecurity = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const animationRef = useRef<null | HTMLDivElement>(null);

  const { isIntersecting } = useIntersectionObserver(containerRef, {
    once: true,
    rootMargin: '500px 0px 0px 0px',
  });
  const { isIntersecting: isVisible } = useIntersectionObserver(animationRef, {
    once: true,
    threshold: 0.4,
  });

  const {
    rive,
    RiveComponent,
    setContainerRef: setRiveRef,
  } = useRive({
    src: '/rive/security.riv',
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
    if (rive && isVisible) {
      rive.play();
    }
  }, [rive, isVisible]);

  return (
    <section className="overflow-x-hidden bg-black text-white" ref={containerRef}>
      <div className="container gap-x-grid grid grid-cols-12 md:grid-cols-none">
        <div className="col-start-1 col-end-5 py-[216px] 3xl:col-end-7 3xl:py-[200px] xl:col-end-6 xl:py-[180px] md:col-auto md:pb-0 md:pt-16 sm:pt-14">
          <Pill theme="secondary-1">Secure</Pill>
          <h2 className="mt-3 font-title text-112 font-semibold leading-none 3xl:mt-3.5 xl:mt-2.5 xl:text-90 xl:leading-95 md:mt-2 md:text-80 sm:text-48">
            <mark className="bg-transparent text-secondary-3">Secure</mark> by&nbsp;design
          </h2>
          <p className="mr-12 mt-8 text-20 leading-normal 3xl:-mr-9 xl:mr-0 xl:mt-5 xl:text-18 xl:leading-snug md:mt-3 md:max-w-xl md:text-16">
            Air-gapped deployment to protect your data with access control, data masking, audit log,
            watermarking and more.
          </p>
          <LinkUnderlined
            className="mt-8 text-white hover:text-secondary-2 xl:mt-6 md:mt-4 sm:mt-3"
            href={Route.DOCS_DATA_ACCESS_CONTROL}
          >
            Learn more
          </LinkUnderlined>
        </div>
        <div
          className="relative col-start-5 col-end-13 self-stretch pt-[95px] before:absolute before:bottom-0 before:right-[166px] before:top-0 before:w-[252px] before:bg-security 3xl:col-start-7 3xl:pt-[80px] 3xl:before:right-[104px] 2xl:before:right-[114px] xl:col-start-6 xl:before:right-[106px] xl:before:w-[216px] md:col-auto md:-mx-7 md:pb-[39px] md:pt-[49px] md:before:right-0 md:before:top-auto md:before:h-[427px] md:before:w-full md:before:bg-security-phone sm:-mx-4 sm:pb-[32px] sm:pt-[31px] sm:before:h-[324px]"
          ref={animationRef}
        >
          <div
            className="relative ml-auto mr-[9px] aspect-[1.0597014925] w-[710px] 3xl:-mr-14 2xl:-mr-9 2xl:w-[692px] xl:-mr-2 xl:w-[560px] lg:mx-auto lg:mr-0 lg:w-[530px] md:hidden"
            ref={setRiveRef}
          >
            {isIntersecting ? <RiveComponent /> : null}
          </div>
          <Image
            className="relative mx-auto hidden md:block sm:hidden"
            src="/images/page/main/security-tablet.png"
            width={629}
            height={715}
            alt=""
            loading="lazy"
          />
          <Image
            className="relative mx-auto hidden sm:block"
            src="/images/page/main/security-phone.png"
            width={350}
            height={505}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoSecurity;
