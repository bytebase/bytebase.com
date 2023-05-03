import Hero from '@/components/pages/changelog/hero';
import SubscriptionForm from '@/components/shared/subscription';

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Hero />
      {children}
      <SubscriptionForm className="mt-[205px] 3xl:mt-[189px] xl:mt-[156px] md:mt-[114px] sm:mt-[117px]" />
    </>
  );
}
