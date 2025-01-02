'use client';

import clsx from 'clsx';

import Button from '@/components/shared/button';
import Link from '@/components/shared/link';
import { LinkUnderlined } from '@/components/shared/link-underlined';

import Route from '@/lib/route';

import SmallArrowIcon from '@/svgs/small-arrow.inline.svg';
import DBScheme from './db-scheme';
import PromoCards from '../promo-cards';

const HeroV1 = ({ latestVersion }: { latestVersion: { number: string; slug: string } | null }) => {
  return (
    <div className={clsx('container mt-16 flex w-full flex-col md:mt-8 sm:mt-4')}>
      <section className="flex w-full flex-col items-center justify-center">
        {latestVersion !== null && (
          <Link href="/changelog/bytebase-3-1-2/" className="group/link">
            <span className="inline-flex items-center gap-1 rounded-full bg-tones-purple-light p-1 text-12 font-semibold leading-none text-primary-1 transition-colors duration-200 group-hover/link:text-primary-2">
              <span className="rounded-full bg-primary-1 px-2 py-1 text-white transition-colors duration-200 group-hover/link:bg-primary-2">
                Dec 19th, 2024
              </span>
              <span className="flex items-center gap-1.5 px-2">
                🚀 3.1.2: Tooltips for tables, columns, and PostgreSQL view comments in SQL Editor
                <SmallArrowIcon width={7} height={6} />
              </span>
            </span>
          </Link>
        )}
        <header className="relative mt-4 xl:mt-3.5 sm:mt-3">
          <h1 className="mx-auto mt-3 max-w-4xl text-center font-title text-72 font-semibold leading-none xl:text-56 xl:leading-none md:text-48 md:leading-none sm:text-48 sm:leading-95">
            Change, Query, Secure, Govern{' '}
            <mark className="whitespace-nowrap bg-transparent text-center text-primary-1">
              all databases
            </mark>{' '}
            in a single place
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

export default HeroV1;
