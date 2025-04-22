import getMetadata from '@/utils/get-metadata';

import Benefits from '@/components/pages/home/benefits';
import Features from '@/components/pages/home/features/features';
import Hero from '@/components/pages/home/hero';
import Logos from '@/components/pages/home/logos';
import PromoSQLEditor from '@/components/pages/home/promo-sql-editor';
import PromoAutomationChanges from '@/components/pages/home/promo-automation-changes';
import PromoSecurity from '@/components/pages/home/promo-security';

import SEO_DATA from '@/lib/seo-data';
import { getStaticParams } from '@/locales/server';

export const metadata = getMetadata(SEO_DATA.INDEX);

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page() {
  return (
    <>
      <Hero />
      <Logos />
      <PromoAutomationChanges />
      <Benefits />
      <PromoSQLEditor />
      <PromoSecurity />
      <Features />
    </>
  );
}
