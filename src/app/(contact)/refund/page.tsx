import getMetadata from '@/utils/get-metadata';

import Logos from '@/components/pages/home/logos';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.PRIVACY);

// TODO: seo, styles, complite form
export default function Page() {
  return (
    <div className="container gap-x-grid relative grid grid-cols-12 lg:grid-cols-1">
      <div className="col-span-5 border-b border-gray-90 pb-9">
        <h1 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
          Refund form
        </h1>
        <p className="mt-3 text-18">
          We try to deliver a product valuable to your business and delightful to use. If
          you&apos;re ever unhappy with it for any reason, just fill and submit the form on this
          page.
        </p>
      </div>
      <form className="col-span-6 col-start-7 row-span-4 grid grid-cols-2 gap-5 rounded-2xl bg-white p-8 shadow-dark-big 2xl:col-span-7 2xl:col-start-6 2xl:gap-x-[22px] 2xl:p-7 2xl:pb-8 xl:gap-x-4 xl:gap-y-5 xl:p-6 lg:col-span-full lg:mt-8 lg:gap-x-6 lg:gap-y-6 lg:p-8 md:mt-6 md:grid-cols-1 md:gap-y-5 md:px-4 md:py-7" />
      <Logos />
    </div>
  );
}
