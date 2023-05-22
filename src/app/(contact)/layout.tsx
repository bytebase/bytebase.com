import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="pt-[136px] pb-20 2xl:pt-32 lg:pt-[120px] md:pt-[104px] sm:pt-24">
        {children}
      </section>
      <Community />
      <SubscriptionForm />
    </>
  );
}
