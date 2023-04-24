'use client';

import Image from 'next/image';

import { useEffect, useRef } from 'react';

import useIntersectionObserver from '@react-hook/intersection-observer';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';

import { LinkUnderlined } from '@/components/shared/link-underlined';

const PromoSecurity = () => {
  const ref = useRef(null);

  const { isIntersecting } = useIntersectionObserver(ref, { rootMargin: '-150px' });

  const { rive, RiveComponent } = useRive({
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
    if (rive && isIntersecting) {
      rive.play();
    }
  }, [rive, isIntersecting]);

  return (
    <section className="bg-black text-white" ref={ref}>
      <div className="container gap-x-grid grid grid-cols-12 md:grid-cols-none">
        <div className="col-start-1 col-end-5 py-[216px] 3xl:col-end-7 3xl:py-[200px] xl:col-end-6 xl:pt-[154px] xl:pb-[183px] md:col-auto md:pt-16 md:pb-0 sm:pt-[58px]">
          <span className="inline-flex rounded-3xl bg-secondary-1 px-2.5 py-2 text-12 font-bold uppercase leading-none tracking-wider text-gray-15">
            Secure
          </span>
          <h2 className="mt-3 font-title text-112 font-semibold leading-none 3xl:mt-3.5 xl:mt-2.5 xl:text-90 xl:leading-95 md:mt-2 md:text-80 sm:text-48">
            <span className="bg-transparent text-secondary-3">Security</span> by&nbsp;design
          </h2>
          <p className="mr-12 mt-8 text-20 leading-normal 3xl:-mr-9 xl:mt-5 xl:mr-0 xl:text-18 xl:leading-snug md:mt-3 md:max-w-xl md:text-16">
            Bytebase streamlines database deployment from non-prod to prod by integrating with
            version control systems for a GitOps workflow.
          </p>
          <LinkUnderlined className="mt-8 xl:mt-6 md:mt-4 sm:mt-3" href="#">
            Learn more
          </LinkUnderlined>
        </div>
        <div className="relative col-start-5 col-end-13 self-stretch pt-[95px] before:absolute before:bottom-0 before:top-0 before:right-[166px] before:w-[252px] before:bg-security 3xl:col-start-7 3xl:pt-[80px] 3xl:before:right-[104px] xl:col-start-6 xl:before:right-[106px] xl:before:w-[216px] md:col-auto md:-mx-7 md:pt-[49px] md:pb-[39px] md:before:right-0 md:before:top-auto md:before:h-[427px] md:before:w-full md:before:bg-security-phone sm:-mx-4 sm:pb-[32px] sm:pt-[31px] sm:before:h-[324px]">
          <div className="relative mr-[9px] ml-auto aspect-[1.0597014925] w-full max-w-[710px] 3xl:-mr-7 xl:mr-0 md:hidden">
            <RiveComponent />
          </div>
          <Image
            src="/images/page/main/security-tablet.png"
            width={629}
            height={715}
            alt=""
            loading="lazy"
            className="relative mx-auto hidden md:block sm:hidden"
          />
          <Image
            src="/images/page/main/security-phone.png"
            width={350}
            height={505}
            alt=""
            loading="lazy"
            className="relative mx-auto hidden sm:block"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoSecurity;
