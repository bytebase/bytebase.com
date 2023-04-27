import MobileSidebar from '@/components/pages/docs/mobile-sidebar';
import Sidebar from '@/components/pages/docs/sidebar';
import SubscriptionForm from '@/components/shared/subscription';

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
      <div className="container grid grid-cols-12 gap-x-10 pt-36 2xl:pt-[140px] xl:gap-x-9 xl:pt-32 lg:gap-x-6 md:mt-6 md:gap-x-5 md:pt-0 sm:gap-x-4">
        <Sidebar
          className="col-span-3 md:hidden"
          data={sidebar}
          expandedList={expandedList}
          currentUrl={currentUrl}
        />

        {children}
      </div>

      <SubscriptionForm className="md:!mt-[117px]" />
    </>
  );
}
