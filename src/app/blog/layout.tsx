import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription-form';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Community />
      <SubscriptionForm />
    </>
  );
}
