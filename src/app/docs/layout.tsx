import Sidebar from '@/components/pages/docs/sidebar';
import SubscriptionForm from '@/components/shared/subscription';

import { getSidebar } from '@/lib/api-docs';

import '@/styles/docsearch.css';

export default function DocLayout({ children }: { children: React.ReactNode }) {
  const currentUrl = '';
  const { sidebar, expandedList } = getSidebar();

  return (
    <>
      <div className="container grid grid-cols-12 gap-x-10 pt-[136px] 2xl:pt-[140px] xl:gap-x-9 xl:pt-32 lg:gap-x-6 md:mt-6 md:gap-x-5 md:pt-0 sm:gap-x-4">
        <div className="sticky top-0 col-span-3 h-[500px] overflow-y-scroll md:hidden">
          <Sidebar data={sidebar} expandedList={expandedList} currentUrl={currentUrl} />
        </div>
        {children}
      </div>
      <SubscriptionForm />
    </>
  );
}
