import getMetadata from '@/utils/get-metadata';

import Benefits from '@/components/pages/home/benefits';
import Features from '@/components/pages/home/features/features';
import HeroV1 from '@/components/pages/home/hero-v1';
import Demo from '@/components/pages/home/demo';
import Logos from '@/components/pages/home/logos';
import PromoSQLEditor from '@/components/pages/home/promo-sql-editor';
import PromoAutomationChanges from '@/components/pages/home/promo-automation-changes';
import PromoSecurity from '@/components/pages/home/promo-security';
import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription';

import { getLatestChangelogPost } from '@/lib/api-changelog';
import SEO_DATA from '@/lib/seo-data';
import { getStaticParams } from '@/locales/server';

export const metadata = getMetadata(SEO_DATA.INDEX);

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page() {
  const latestChangelogPost = getLatestChangelogPost();
  const latestVersion = latestChangelogPost
    ? {
        number: latestChangelogPost.title.replace(/^bytebase\s/gi, ''),
        slug: latestChangelogPost.slug,
      }
    : null;

  return (
    <>
      <HeroV1 latestVersion={latestVersion} />
      <Logos />
      <Demo />
      <PromoAutomationChanges />
      <Benefits />
      <PromoSQLEditor />
      <PromoSecurity />
      <Features />
      <Community />
      <SubscriptionForm />
    </>
  );
}
