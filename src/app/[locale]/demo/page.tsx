import getMetadata from '@/utils/get-metadata';

import Button from '@/components/shared/button';
import { Arcade } from '@/components/arcade';

import Route from '@/lib/route';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.DEMO);

export default function Page() {
  return (
    <section className="pt-20 2xl:pt-16 xl:pt-12 md:pt-8 sm:pt-4">
      <div className="container mb-16 flex w-full flex-col space-y-20 2xl:space-y-16 xl:space-y-12 md:space-y-8 sm:space-y-4">
        <h2 className="max-w-3xl font-title text-72 font-semibold leading-none xl:max-w-2xl xl:text-56 md:max-w-lg md:text-48 sm:text-40">
          Try Interactive Demo👇
        </h2>
        <Arcade />
        <div className="border-gray-200 flex items-center gap-8 border p-8 xl:gap-6 md:flex-col md:items-start md:gap-4">
          <div className="flex-grow">
            <p className="text-24 leading-normal xl:text-20 md:text-18">
              Alternatively, you can view live demo or schedule a personalized walkthrough with our
              team.
            </p>
          </div>
          <div className="flex shrink-0 gap-4 md:w-full md:flex-col">
            <Button
              href={Route.VIEW_LIVE_DEMO}
              theme="primary-outline"
              size="md"
              className="sm:!w-fit sm:!px-6"
            >
              Live Demo
            </Button>
            <Button
              href={Route.REQUEST_DEMO}
              theme="gray-filled"
              size="md"
              className="sm:!w-fit sm:!px-6"
            >
              Book a Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
