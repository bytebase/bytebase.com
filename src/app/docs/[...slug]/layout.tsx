import MobileSidebar from '@/components/pages/docs/mobile-sidebar';
import Sidebar from '@/components/pages/docs/sidebar';
import SubscriptionForm from '@/components/shared/subscription-form';

import { getSidebar } from '@/lib/api-docs';

export default function DocLayout({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: string[] };
}) {
  const { sidebar, expandedList } = getSidebar();
  const currentUrl = `/${slug.join('/')}`;

  return (
    <>
      <MobileSidebar
        className="col-span-full hidden md:flex md:pt-[72px]"
        data={sidebar}
        currentUrl={currentUrl}
        expandedList={expandedList}
      />
      <div className="pt-36 2xl:pt-[137px] xl:pt-32 md:pt-0 container md:mt-6 grid grid-cols-12 gap-x-10 xl:gap-x-9 lg:gap-x-6 md:gap-x-5 sm:gap-x-4">
        <Sidebar
          className="md:hidden col-span-3"
          data={sidebar}
          expandedList={expandedList}
          currentUrl={currentUrl}
        />

        {children}
      </div>

      <SubscriptionForm />
    </>
  );
}
