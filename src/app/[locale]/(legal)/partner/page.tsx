import getMetadata from '@/utils/get-metadata';

import Link from '@/components/shared/link';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.PARTNER);

export default function Page() {
  return (
    <>
      <h1 className="font-title text-90 font-semibold leading-none lg:text-68 md:text-56 sm:text-40">
        Bytebase Partner Program
      </h1>
      <p className="sm:mt-3">
        Grow your business with the Bytebase Partner Program to advance Database DevSecOps. For more
        information, please contact us at{' '}
        <Link href="mailto:support@bytebase.com">support@bytebase.com</Link>.
      </p>
      <h2 id="personal-information">Channel Partner</h2>
      <p>
        Applicable to value added resellers (VARs), systems integrators (SIs), managed service
        providers (MSPs).
      </p>
      <h2 id="personal-information">Technology Partner</h2>
      <p>
        Applicable to Independent Software Vendors (ISV) with complementary products that integrate
        with Bytebase to deliver a cohesive solution.
      </p>
    </>
  );
}
