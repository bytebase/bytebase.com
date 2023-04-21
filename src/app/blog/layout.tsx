import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription-form';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      {children}
      <Community />
      <SubscriptionForm />
    </>
  );
}
