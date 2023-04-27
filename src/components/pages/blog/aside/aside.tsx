import TableOfContents from '@/components/pages/docs/table-of-contents';

import { TableOfContents as TOCProps } from '@/types/docs';

import Author from './author';
import { AuthorProps } from './author/author';
import WhatIsBytebase from './what-is-bytebase/what-is-bytebase';

type AsideProps = AuthorProps & {
  tocItems: TOCProps[];
};

const Aside = ({ author, tocItems }: AsideProps) => {
  return (
    <aside className="scrollbar-hidden lg:gap-x-grid col-span-3 ml-auto flex w-full flex-col gap-y-9 overflow-y-auto lg:static lg:col-span-full lg:mt-14 lg:grid lg:grid-cols-12 md:mt-10 sm:mt-8 sm:gap-y-4">
      <WhatIsBytebase />
      <Author author={author} />
      {tocItems.length > 0 && <TableOfContents items={tocItems} />}
    </aside>
  );
};

export default Aside;
