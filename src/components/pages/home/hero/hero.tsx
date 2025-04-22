'use client';

import clsx from 'clsx';

import Button from '@/components/shared/button';
import { LinkUnderlined } from '@/components/shared/link-underlined';

import Route from '@/lib/route';

import DBScheme from './db-scheme';
import PromoCards from '../promo-cards';

const Hero = () => {
  return (
    <div className={clsx('container mt-16 flex w-full flex-col md:mt-8 sm:mt-4')}>
      <section className="flex w-full flex-col items-center justify-center">
        <header className="relative mt-4 xl:mt-3.5 sm:mt-3">
          <h1 className="mx-auto mt-3 max-w-4xl text-balance text-center font-title text-108 font-semibold leading-none xl:text-80 xl:leading-none md:text-48 md:leading-none sm:text-48 sm:leading-95">
            Database CI/CD and Security{' '}
            <mark className="whitespace-nowrap bg-transparent text-center text-primary-1">
              at Scale
            </mark>
          </h1>
        </header>
        <footer className="mt-12 flex items-center gap-9 2xl:gap-8 xl:mt-11 xl:gap-6 md:mt-7 sm:mt-6 sm:gap-3.5">
          <Button
            href={Route.VIEW_LIVE_DEMO}
            theme="primary-filled"
            size="lg"
            className="sm:!w-fit sm:!px-6"
          >
            View Live Demo
          </Button>
          <LinkUnderlined href={Route.REQUEST_DEMO}>Book a demo</LinkUnderlined>
        </footer>
      </section>
      <DBScheme />
      <PromoCards />
    </div>
  );
};

export default Hero;
