import getMetadata from '@/utils/get-metadata';

import Logos from '@/components/pages/contact/logos';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.CONFIRM_DEMO);

export default function Page() {
  return (
    <div className="container">
      <h1 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
        Demo Booking Confirmed!
      </h1>
      <p className="mt-3 text-18">Thanks for booking time with us. Talk to you soon!</p>
      <Logos />
    </div>
  );
}
