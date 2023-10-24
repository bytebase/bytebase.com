'use client';

import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';

import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { Alignment, Fit, Layout, useRive, useStateMachineInput } from '@rive-app/react-canvas';
import clsx from 'clsx';

import Pill from '@/components/shared/pill';

import Accordion from './accordion';

export type AccordionHead = {
  pill: string;
  highlight: string;
  text: string;
};

export type AccordionData = {
  title: string;
  description: string;
  image: string;
};

type PromoAccordionProps = {
  head: AccordionHead;
  data: AccordionData[];
};

const PromoAccordion = ({ head, data }: PromoAccordionProps) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { isIntersecting } = useIntersectionObserver(containerRef, {
    once: true,
    rootMargin: '500px 0px 0px 0px',
  });

  const {
    rive,
    RiveComponent,
    setContainerRef: setRiveRef,
  } = useRive({
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

  const handleAccordionClick = (index: number) => {
    input?.fire();
    setActiveIndex(index);
  };

  return (
    <section
      className="container relative mt-[62px] pt-[98px] pb-[192px] 3xl:mt-[62px] 3xl:pt-[84px] 3xl:pb-36 xl:mt-10 xl:pt-[88px] xl:pb-[126px] md:mt-[30px] md:pt-[66px] md:pb-24 sm:mt-20 sm:overflow-hidden sm:pt-0 sm:pb-[78px]"
      ref={containerRef}
    >
      <div
        className="absolute top-0 right-[96px] aspect-square h-auto w-[270px] 3xl:right-[76px] xl:w-[250px] md:right-[30px] md:w-[200px] sm:hidden"
        ref={setRiveRef}
      >
        {isIntersecting ? <RiveComponent /> : null}
      </div>
      <header>
        <Pill theme="secondary-1">{head.pill}</Pill>
        <h2 className="mt-3 max-w-3xl font-title text-88 font-semibold leading-none xl:mt-3 xl:max-w-2xl xl:text-68 xl:leading-104 md:mt-3 md:max-w-lg md:text-54 md:leading-none sm:text-48 sm:leading-95">
          <mark className="whitespace-nowrap bg-transparent text-center text-primary-1 sm:whitespace-normal xs:pr-24">
            {head.highlight}
          </mark>{' '}
          {head.text}
        </h2>
      </header>
      <div className="gap-x-grid mt-12 grid grid-cols-12 xl:mt-7 md:mt-10 sm:relative sm:mt-10 sm:grid-cols-none">
        <Image
          className="absolute -top-[88px] -right-8 z-20 hidden sm:block"
          width={141}
          height={135}
          src="/images/page/main/ufo.png"
          alt=""
        />
        <div className="relative z-10 col-start-9 col-end-13 row-span-full 3xl:col-start-8 3xl:col-end-12 xl:col-end-13 md:col-start-7 sm:col-span-full sm:row-auto">
          <div className="mr-10 -mt-10 border border-tones-green-dark bg-tones-green-light px-6 py-10 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(143,188,169,0.5)] 3xl:mr-0 xl:-mt-6 xl:-translate-x-6 xl:px-5 xl:py-8 md:mr-4.5 md:translate-x-0 md:px-4 md:py-7 sm:mt-0 sm:mr-0">
            <Accordion activeIndex={activeIndex} items={data} onChange={handleAccordionClick} />
          </div>
        </div>
        <div className="relative z-0 col-span-full row-span-full sm:row-auto sm:mt-6">
          {data.map(({ image, title }, index) => (
            <Image
              className={clsx(
                index != 0 ? 'absolute top-0 left-0 h-full' : 'relative h-auto',
                activeIndex === index ? 'z-10 opacity-100' : 'opacity-0',
                'w-full rounded shadow-[0_5px_15px_rgba(15,22,36,0.2)] transition-opacity duration-[400ms]',
              )}
              src={image}
              width={1472}
              height={845}
              alt={title}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoAccordion;
