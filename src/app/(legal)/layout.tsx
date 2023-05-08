import SubscriptionForm from '@/components/shared/subscription';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="container gap-x-grid grid grid-cols-12 pt-[136px] 2xl:pt-32 lg:pt-[120px] md:pt-[104px] sm:pt-24">
        <article className="content content-legal prose col-span-6 col-start-4 lg:col-span-8 lg:col-start-3 md:col-span-full md:max-w-full">
          {children}
        </article>
      </section>
      <SubscriptionForm />
    </>
  );
}
