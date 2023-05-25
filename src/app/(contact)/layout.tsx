import Community from '@/components/shared/community';
import SubscriptionForm from '@/components/shared/subscription';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-pricing-hero pb-20 pt-[136px] 2xl:pt-32 lg:pb-16 lg:pt-[120px] md:pb-12 md:pt-[104px] sm:pb-10 sm:pt-24">
        {children}
      </section>
      <Community />
      <SubscriptionForm />
    </>
  );
}
