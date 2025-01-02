'use client';

import Image from 'next/image';

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
    <section className="mt-16 xl:mt-10 sm:mt-0" ref={containerRef}>
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
