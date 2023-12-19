import getMetadata from '@/utils/get-metadata';

import Logos from '@/components/pages/contact/logos';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.CONFIRM_VIEW_LIVE_DEMO);

export default function Page() {
  return (
    <div className="container">
      <h1 className="font-title text-80 font-semibold leading-none 2xl:text-64 lg:text-56 sm:text-40">
        See live demo in the new tab.
      </h1>
      <Logos />
    </div>
  );
}
