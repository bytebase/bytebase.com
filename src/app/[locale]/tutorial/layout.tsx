import SubscriptionForm from '@/components/shared/subscription';

export default function TutorialLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SubscriptionForm />
    </>
  );
}
