import getMetadata from '@/utils/get-metadata';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.INDEX);

export default function Page() {
  return (
    <>
      <p>Test</p>
    </>
  );
}
