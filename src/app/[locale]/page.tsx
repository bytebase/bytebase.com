import dynamic from 'next/dynamic';
import getMetadata from '@/utils/get-metadata';

import Hero from '@/components/pages/home/hero';
import Logos from '@/components/pages/home/logos';

// Lazy load below-the-fold components for better initial load performance
const Benefits = dynamic(() => import('@/components/pages/home/benefits'), {
  loading: () => null,
});
const Features = dynamic(() => import('@/components/pages/home/features/features'), {
  loading: () => null,
});
const PromoSQLEditor = dynamic(() => import('@/components/pages/home/promo-sql-editor'), {
  loading: () => null,
});
const PromoAutomationChanges = dynamic(
  () => import('@/components/pages/home/promo-automation-changes'),
  {
    loading: () => null,
  },
);
const PromoSecurity = dynamic(() => import('@/components/pages/home/promo-security'), {
  loading: () => null,
});
const CTA = dynamic(() => import('@/components/pages/home/cta'), {
  loading: () => null,
});

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
      <CTA />
    </>
  );
}
