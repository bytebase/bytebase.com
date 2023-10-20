'use client';

import Image from 'next/image';

import Pill from '@/components/shared/pill';
import { useEffect, useRef } from 'react';

import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { Alignment, Fit, Layout, useRive } from '@rive-app/react-canvas';

const DBScheme = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  const animationRef = useRef<null | HTMLDivElement>(null);

  const { isIntersecting } = useIntersectionObserver(containerRef, {
    once: true,
    rootMargin: '500px 0px 0px 0px',
  });
  const { isIntersecting: isVisible } = useIntersectionObserver(animationRef, {
    rootMargin: '100px 0px 0px 0px',
  });

  const {
    rive,
    RiveComponent,
    setContainerRef: setRiveRef,
  } = useRive({
    src: '/rive/db-scheme.riv',
    autoplay: false,
    artboard: 'scheme',
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
    if (rive) {
      if (isVisible) {
        rive.play();
      } else {
        rive.pause();
      }
    }
  }, [rive, isVisible]);

  return (
    <section className="mt-40 3xl:mt-36 xl:mt-32 md:mt-[90px] sm:mt-[74px]" ref={containerRef}>
      <header className="container relative z-20">
        <h2 className="mx-auto mt-3 max-w-4xl text-center font-title text-72 font-semibold leading-none xl:text-56 xl:leading-none md:text-48 md:leading-none sm:text-48 sm:leading-95">
          Change, Query, Secure, Govern{' '}
          <mark className="whitespace-nowrap bg-transparent text-center text-primary-1">
            all databases
          </mark>{' '}
          in a single place
        </h2>
      </header>
      <div
        className="relative z-10 3xl:mt-12 2xl:px-5 xl:mt-10 md:mt-9 md:px-3 sm:mt-5 sm:px-0"
        ref={animationRef}
      >
        <div
          className="mx-auto aspect-[2.2676470588] h-auto w-auto max-w-[1542px] sm:hidden"
          ref={setRiveRef}
        >
          {isIntersecting ? <RiveComponent /> : null}
        </div>
        <Image
          className="mx-auto hidden sm:block"
          src="/images/db-scheme.png"
          alt=""
          width={366}
          height={498}
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default DBScheme;
