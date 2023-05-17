import { ReactNode } from 'react';

import { GlossaryLetterSet } from '@/types/glossary';

import Posts from '../posts';

type GlossaryLayoutProps = {
  posts: GlossaryLetterSet[];
  children: ReactNode;
};

const GlossaryLayout = ({ posts, children }: GlossaryLayoutProps) => {
  const filteredItems = posts;

  return (
    <>
      {children}
      <section className="container pt-16 lg:pt-12 md:pt-8 sm:pt-6">
        <div className="gap-x-grid grid grid-cols-12">
          <Posts posts={filteredItems} />
        </div>
      </section>
    </>
  );
};

export default GlossaryLayout;
