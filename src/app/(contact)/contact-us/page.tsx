import getMetadata from '@/utils/get-metadata';

import Logos from '@/components/pages/contact/logos';
import ContacForm from '@/components/shared/contact-form';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.PRIVACY);

// TODO: seo, complite form
export default function Page() {
  return (
    <div className="container gap-x-grid relative grid grid-cols-12 sm:grid-cols-4">
      <div className="col-span-5 lg:col-span-8 sm:col-span-full">
        <h1 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
          Enterprise Inquiry
        </h1>
        <p className="mt-3 text-18">
          Tell us a little about yourself and we&apos;ll contact you to share more about the product
          and answer any questions you have.
        </p>
      </div>
      <ContacForm className="col-span-6 col-start-7 row-span-4 grid grid-cols-2 gap-5 rounded-2xl bg-white p-8 shadow-dark-big lg:col-span-full lg:my-10 md:my-8 md:p-6 sm:grid-cols-1 sm:gap-4 sm:px-4 sm:py-5 xs:my-7" />
      <Logos />
    </div>
  );
}
