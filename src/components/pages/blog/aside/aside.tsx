import TableOfContents from '@/components/pages/docs/table-of-contents';

import { TableOfContents as TOCProps } from '@/types/docs';

// TODO: remove the comment when the real information about the author appears
// import Author from './author';
import { AuthorProps } from './author/author';
import Promo from './promo/promo';

type AsideProps = AuthorProps & {
  tocItems: TOCProps[];
};

const Aside = ({ tocItems }: AsideProps) => {
  return (
    <aside className="scrollbar-hidden lg:gap-x-grid sticky top-[144px] col-span-3 ml-auto flex max-h-[calc(100vh-40px)] w-full flex-col overflow-y-auto lg:col-span-full lg:mt-14 lg:grid lg:grid-cols-12 md:mt-10 sm:mt-8 sm:gap-y-4">
      {tocItems.length > 0 && (
        <TableOfContents items={tocItems} className="overflow-y-auto" showSocialShare />
      )}
      <div className="mt-4 flex w-full flex-col items-start justify-start pl-5 lg:hidden">
        <Promo />
      </div>
    </aside>
  );
};

export default Aside;
