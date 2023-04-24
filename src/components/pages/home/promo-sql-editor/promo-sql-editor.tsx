'use client';

import Image from 'next/image';

import { useEffect, useRef } from 'react';

import useIntersectionObserver from '@react-hook/intersection-observer';
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';

import Accordion from './accordion';

const PromoSQLEditor = () => {
  const ref = useRef(null);

  const { isIntersecting } = useIntersectionObserver(ref);

  const { rive, RiveComponent } = useRive({
    src: '/rive/ufo.riv',
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

  const input = useStateMachineInput(rive, 'SM', 'RUN', false);

  useEffect(() => {
    if (rive && isIntersecting) {
      rive.play();
    }
  }, [rive, isIntersecting]);

  return (
    <section
      className="container relative mt-[62px] pt-[98px] pb-[192px] 3xl:mt-[62px] 3xl:pt-[84px] 3xl:pb-[144px] xl:mt-[40px] xl:pt-[88px] xl:pb-[126px] md:mt-[30px] md:pt-[66px] md:pb-[96px] sm:mt-20 sm:overflow-hidden sm:pt-0 sm:pb-[78px]"
      ref={ref}
    >
      <div className="absolute top-0 right-[96px] aspect-square h-auto w-[270px] 3xl:right-[76px] xl:w-[250px] md:right-[30px] md:w-[200px] sm:hidden">
        <RiveComponent />
      </div>
      <header>
        {/* TODO: move to separate <Label /> component */}
        <span className="inline-flex rounded-3xl bg-secondary-1 px-2.5 py-2 text-12 font-bold uppercase leading-none tracking-wider text-gray-15">
          Query
        </span>
        <h2 className="mt-3 max-w-3xl font-title text-88 font-semibold leading-none xl:mt-3 xl:max-w-2xl xl:text-68 xl:leading-104 md:mt-3 md:max-w-lg md:text-54 md:leading-none sm:text-48 sm:leading-95">
          Explore data with <span className="whitespace-nowrap">all-in-one</span>{' '}
          <mark className="whitespace-nowrap bg-transparent text-center text-primary-1 sm:whitespace-normal">
            SQL editor
          </mark>
        </h2>
      </header>
      <div className="gap-x-grid mt-12 grid grid-cols-12 xl:mt-7 md:mt-10 sm:relative sm:mt-6 sm:grid-cols-none">
        <Image
          width={141}
          height={135}
          src="/images/page/main/ufo.png"
          alt=""
          className="absolute -top-[72px] -right-8 z-20 hidden sm:block"
        />
        <div className="relative z-10 col-start-9 col-end-13 row-span-full 3xl:col-start-8 3xl:col-end-12 xl:col-end-13 md:col-start-7 sm:col-span-full sm:row-auto">
          <div className="mr-10 -mt-10 border border-tones-green-dark bg-tones-green-light px-6 py-10 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(143,188,169,0.5)] 3xl:mr-0 xl:-mt-6 xl:-translate-x-6 xl:px-5 xl:py-8 md:mr-4.5 md:translate-x-0 md:px-4 md:py-7 sm:mt-0 sm:mr-0">
            <Accordion onChange={() => input?.fire()} />
          </div>
        </div>
        <div className="relative z-0 col-span-full row-span-full sm:row-auto sm:mt-6">
          <Image
            src="/images/interface.png"
            className="h-auto w-full rounded shadow-[0_5px_15px_rgba(15,22,36,0.2)]"
            width={1472}
            height={845}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default PromoSQLEditor;
