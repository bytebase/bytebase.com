import SubscriptionForm from '@/components/shared/subscription';

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SubscriptionForm />
    </>
  );
}
