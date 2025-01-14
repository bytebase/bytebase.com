import Image from 'next/image';

import getMetadata from '@/utils/get-metadata';

import Logos from '@/components/pages/contact/logos';
import ContactForm from '@/components/shared/contact-form';

import SEO_DATA from '@/lib/seo-data';
import { WHITE_PAPER } from '@/lib/forms';
export const metadata = getMetadata(SEO_DATA.CONTACTS);

export default function Page() {
  return (
    <div className="container gap-x-grid relative grid grid-cols-12 gap-16 sm:grid-cols-4 sm:gap-8">
      <div className="col-span-5 lg:col-span-8 sm:col-span-full">
        <div className="relative w-full" style={{ paddingBottom: 'calc(22/17 * 100%)' }}>
          <Image
            src="/content/whitepaper/just-in-time-database-access/cover.webp"
            alt="Just-in-time Database Access Whitepaper Cover"
            width={612}
            height={792}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="col-span-7 lg:col-span-full">
        <ContactForm
          className="rounded-2xl bg-white p-8 shadow-dark-big lg:my-10 md:my-8 md:p-6 sm:p-5 sm:px-4 xs:my-7"
          formId={WHITE_PAPER}
          redirectURL="/content/whitepaper/just-in-time-database-access/bytebase-whitepaper-just-in-time-database-access-best-practices.pdf"
        />
        <Logos />
      </div>
    </div>
  );
}
