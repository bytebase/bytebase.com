import Features from '@/components/shared/features';
import SubscriptionForm from '@/components/shared/subscription';

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container gap-x-grid grid grid-cols-12">
        {children}
        <Features className="mt-40 2xl:mt-20 xl:mt-16 sm:mt-12" />
      </div>
      <SubscriptionForm />
    </>
  );
}
