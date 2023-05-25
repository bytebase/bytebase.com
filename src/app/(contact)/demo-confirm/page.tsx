import getMetadata from '@/utils/get-metadata';

import CalForm from '@/components/pages/contact/cal-form';
import Logos from '@/components/pages/contact/logos';

import SEO_DATA from '@/lib/seo-data';
import { refundAndDemoLogos } from '@/lib/logos';

export const metadata = getMetadata(SEO_DATA.DEMO);

export default function Page() {
  return (
    <div className="container gap-x-grid relative grid grid-cols-12 sm:grid-cols-4">
      <div className="col-span-5 lg:col-span-8 sm:col-span-full">
        <h1 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
          Request a demo
        </h1>
        <p className="mt-3 text-18">
          Tell us a little about yourself and we&apos;ll contact you to share more about the product
          and answer any questions you have.
        </p>
      </div>
      <div className="col-span-6 col-start-7 row-span-4 rounded-2xl bg-white p-8 shadow-dark-big 2xl:col-span-7 2xl:col-start-6 2xl:p-7 2xl:pb-8 xl:p-6 lg:col-span-full lg:mt-8 lg:p-8 md:mt-6 md:grid-cols-1 md:px-4 md:py-7">
        <CalForm />
      </div>
      <Logos items={refundAndDemoLogos} />
    </div>
  );
}
