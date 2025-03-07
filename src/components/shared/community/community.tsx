'use client';

import Image from 'next/image';

import { useRef } from 'react';

import Cards from './cards';

const Community = () => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  return (
    <section className="container mt-40 3xl:mt-36 xl:mt-32 md:mt-24 sm:mt-7" ref={containerRef}>
      <header className="gap-x-grid grid grid-cols-12 sm:grid-cols-none sm:gap-3">
        <div className="col-span-10 col-start-2 text-center xl:col-span-10 xl:col-start-2 sm:col-span-full">
          <h2 className="mt-[105px] font-title text-112 font-semibold leading-none 3xl:mt-[97px] xl:mt-[58px] xl:text-90 xl:leading-95 md:mt-12 md:text-80 sm:text-56">
            <span className="mx-auto inline-flex items-center justify-center">
              <mark className="whitespace-nowrap bg-transparent text-primary-1">Join</mark>
              <img
                className="ml-1.5 mr-[6px] mt-3.5 h-20 w-20 lg:mt-1 lg:h-[62px] lg:w-[62px] md:mt-1 md:h-[55px] md:w-[55px] sm:mx-1 sm:mt-2 sm:h-[39px] sm:w-[39px]"
                src="/images/plus-icon.svg"
                alt=""
                width={80}
                height={80}
                loading="lazy"
              />
              the
            </span>{' '}
            community
          </h2>
          <p className="mx-auto mt-9 max-w-3xl text-20 xl:mt-4.5 xl:leading-snug md:mt-3.5 md:text-16 sm:mt-3">
            At Bytebase, we believe in the power of collaboration and open communication, and we
            have a number of communities that you can join to connect with other like-minded.
          </p>
        </div>
        <div className="col-span-5 col-start-7 3xl:col-span-6 3xl:col-start-7 sm:col-span-full">
          <Image
            className="mx-auto hidden sm:block"
            src="/images/page/main/community.png"
            alt=""
            width={328}
            height={270}
          />
        </div>
      </header>
      <Cards />
    </section>
  );
};

export { Community };
