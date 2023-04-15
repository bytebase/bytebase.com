import Hero from '@/components/pages/pricing/hero';
import Table from '@/components/pages/pricing/table';
import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription-form';

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
