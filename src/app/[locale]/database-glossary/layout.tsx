import SubscriptionForm from '@/components/shared/subscription';

export default function DatabaseGlossaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SubscriptionForm />
    </>
  );
}
