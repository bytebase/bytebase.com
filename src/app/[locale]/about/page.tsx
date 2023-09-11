import getMetadata from '@/utils/get-metadata';

import BrandKit from '@/components/pages/about/brand-kit';
import Hero from '@/components/pages/about/hero';
import MeetCrew from '@/components/pages/about/meet-crew';
import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.ABOUT);

const AboutUsPage = () => {
  return (
    <>
      <h1 className="sr-only">About us</h1>
      <Hero />
      <MeetCrew />
      <BrandKit />
      <Community />
      <SubscriptionForm />
    </>
  );
};

export default AboutUsPage;
