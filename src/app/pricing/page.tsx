import getMetadata from '@/utils/get-metadata';

import Hero from '@/components/pages/pricing/hero';
import Table from '@/components/pages/pricing/table';
import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.PRICING);

export default function Page() {
  return (
    <>
      <Hero />
      <Table />
      <Community />
      <SubscriptionForm />
    </>
  );
}
