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
      <SubscriptionForm />
    </>
  );
}
