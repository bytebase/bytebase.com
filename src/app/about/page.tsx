import Backed from '@/components/pages/about/backed';
import Crew from '@/components/pages/about/crew';
import Hero from '@/components/pages/about/hero';
import MeetCrew from '@/components/pages/about/meet-crew';
import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription-form';

const AboutUsPage = () => {
  return (
    <>
      <h1 className="sr-only">About us</h1>
      <Hero />
      <MeetCrew />
      <Crew />
      <Backed />
      <Community />
      <SubscriptionForm />
    </>
  );
};

export default AboutUsPage;
