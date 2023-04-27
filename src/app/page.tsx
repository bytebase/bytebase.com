import getMetadata from '@/utils/get-metadata';

import Benefits from '@/components/pages/home/benefits';
import DBScheme from '@/components/pages/home/db-scheme';
import Features from '@/components/pages/home/features/features';
import Hero from '@/components/pages/home/hero';
import Logos from '@/components/pages/home/logos';
import PromoAutomationChanges from '@/components/pages/home/promo-automation-changes';
import PromoSecurity from '@/components/pages/home/promo-security';
import PromoSQLEditor from '@/components/pages/home/promo-sql-editor';
import Testimonials from '@/components/pages/home/testimonials';
import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription-form';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.INDEX);

export default function Page() {
  return (
    <>
      <Hero />
      <DBScheme />
      <PromoAutomationChanges />
      <Benefits />
      <PromoSQLEditor />
      <PromoSecurity />
      <Features />
      <Logos />
      <Testimonials />
      <Community />
      <SubscriptionForm />
    </>
  );
}
