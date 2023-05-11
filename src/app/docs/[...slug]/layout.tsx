import SubscriptionForm from '@/components/shared/subscription';

import '@/styles/docsearch.css';

export default function DocLayout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  return (
    <>
      {children}
      <SubscriptionForm className="mt-[124px] 3xl:mt-[110px] xl:mt-[97px] md:mt-[117px] sm:mt-4.5" />
    </>
  );
}
