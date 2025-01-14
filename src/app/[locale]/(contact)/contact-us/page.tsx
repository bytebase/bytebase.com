import getMetadata from '@/utils/get-metadata';

import Logos from '@/components/pages/contact/logos';
import ContactForm from '@/components/shared/contact-form';

import SEO_DATA from '@/lib/seo-data';
import Route from '@/lib/route';
import { ENTERPRISE_INQUIRY } from '@/lib/forms';
export const metadata = getMetadata(SEO_DATA.CONTACTS);

export default function Page() {
  return (
    <div className="container gap-x-grid relative grid grid-cols-12 sm:grid-cols-4">
      <div className="col-span-5 lg:col-span-8 sm:col-span-full">
        <h1 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
          Enterprise Inquiry
        </h1>
        <p className="mt-3 text-18">
          Flexible usage-based plan, volume discount available. Contact us for scheduling demo and
          pricing details.
        </p>
      </div>
      <ContactForm
        className="col-span-6 col-start-7 row-span-4 rounded-2xl bg-white p-8 shadow-dark-big lg:col-span-full lg:my-10 md:my-8 md:p-6 sm:p-5 sm:px-4 xs:my-7"
        formId={ENTERPRISE_INQUIRY}
        redirectURL={Route.CONFIRM_INQUIRY}
      />
      <Logos />
    </div>
  );
}
