import SubscriptionForm from '@/components/shared/subscription';

export default function UseCaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SubscriptionForm />
    </>
  );
}
