'use client';

import Button from '@/components/shared/button';
import { LinkUnderlined } from '@/components/shared/link-underlined';

import Route from '@/lib/route';

export default function CTA() {
  return (
    <section className="mt-[90px] bg-primary-1 xl:mt-[53px] md:mt-11 sm:mt-[50px]">
      <div className="safe-paddings container py-16 xl:py-12 md:py-10 sm:py-6">
        <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-6">
          <h2 className="font-title text-52 leading-none text-white 2xl:ml-[22px] 2xl:w-[calc(100%+22px)] xl:col-span-5 xl:col-start-3 xl:w-full xl:text-44 lg:ml-0 md:pl-11 md:text-38 sm:col-span-3 sm:col-start-1 sm:pl-0 sm:text-34">
            Try demo to see how Bytebase works
          </h2>
          <Button
            href={Route.DEMO}
            theme="primary-outline"
            size="md"
            className="shrink-0 border-white bg-white"
          >
            Interactive Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
