'use client';

import Button from '@/components/shared/button';

import Route from '@/lib/route';

export default function CTA() {
  return (
    <section className="mt-40 bg-primary-1 3xl:mt-36 xl:mt-32 md:mt-24 sm:mt-20">
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
