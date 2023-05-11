import Hero from '@/components/pages/changelog/hero';
import SubscriptionForm from '@/components/shared/subscription';

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Hero />
      {children}
      <SubscriptionForm />
    </>
  );
}
