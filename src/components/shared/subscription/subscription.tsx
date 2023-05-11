'use client';

import Image from 'next/image';

import { useCallback, useEffect, useRef } from 'react';

import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';

import Form from './form';

const Subscription = () => {
  const containerRef = useRef(null);

  const { isIntersecting } = useIntersectionObserver(containerRef, {
    once: true,
    rootMargin: '500px 0px 0px 0px',
  });

  const {
    rive,
    RiveComponent,
    setContainerRef: setRiveRef,
  } = useRive({
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

  const fireInput = useCallback(() => {
    input?.fire();
  }, [input]);

  return (
    <section
      className="mt-[205px] bg-primary-1 text-white 3xl:mt-[189px] xl:mt-[156px] md:mt-[114px] sm:mt-[117px]"
      ref={containerRef}
    >
      <div className="container gap-x-grid grid grid-cols-12 sm:flex sm:flex-col sm:overflow-x-clip">
        <div className="relative col-span-5 col-start-2 -ml-10 xl:col-span-6 xl:col-start-1 xl:ml-0">
          <div className="absolute -top-12 -bottom-10 w-full 3xl:-top-10 xl:-top-6 md:-top-8 sm:hidden">
            <div
              className="aspect-square w-full max-w-[520px] 3xl:-ml-2 3xl:max-w-[510px] xl:ml-0 xl:max-w-[410px] md:max-w-[370px] sm:max-w-full"
              ref={setRiveRef}
            >
              {isIntersecting ? <RiveComponent /> : null}
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
        <div className="col-span-5 col-start-7 xl:col-start-7 xl:col-end-12 md:col-start-7 md:col-end-13 sm:max-w-[80%] 2xs:max-w-none">
          <div className="-ml-10 pt-16 pb-[75px] 3xl:ml-0 xl:-ml-6 xl:pb-[60px] xl:pt-[51px] md:ml-0 md:pt-10 md:pb-11 sm:pt-9 sm:pb-11">
            <h3 className="font-title text-88 font-semibold leading-none xl:text-68 xl:leading-104 md:text-56 md:leading-none sm:text-48 sm:leading-95">
              Subscribe to&nbsp;Newsletter
            </h3>
            <div className="mt-9 xl:mt-6 md:mt-4 sm:mt-5">
              <Form fireInput={fireInput} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
