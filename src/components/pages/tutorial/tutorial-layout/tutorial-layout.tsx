'use client';

import { ReactNode, useMemo, useRef, useState } from 'react';

// import Aside from '../aside';
import DropdownFilter from '../dropdown-filter';
import Filter from '../filter';
import Posts from '../posts';
import { BlogPost } from '@/types/blog-post';

type TutorialLayoutProps = {
  posts: BlogPost[];
  children: ReactNode;
  filters: [string, number][];
};

const TutorialLayout = ({ posts, filters, children }: TutorialLayoutProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLElement>(null);

  const filteredItems = useMemo(() => {
    let filteredPosts = posts;
    if (activeFilters.length > 0) {
      filteredPosts = posts.filter(
        (post) =>
          post.pinned ||
          post.integrations?.split(', ').some((integration) => activeFilters.includes(integration)),
      );
    }

    return filteredPosts.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  }, [activeFilters, posts]);

  const toggleFilter = (filter: string) => {
    if (wrapperRef.current && window?.scrollY > wrapperRef?.current?.offsetTop) {
      window.scrollTo(0, wrapperRef.current.offsetTop);
    }
    setActiveFilters(
      activeFilters.includes(filter)
        ? activeFilters.filter((f) => f !== filter)
        : [...activeFilters, filter],
    );
  };

  return (
    <>
      {children}
      <section ref={wrapperRef} className="container lg:pt-12 md:pt-8 sm:pt-6">
        <div className="gap-x-grid grid grid-cols-12">
          <DropdownFilter
            title="Category"
            className="col-span-6 hidden md:block xs:col-span-full"
            fieldsList={filters}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            toggleFilter={toggleFilter}
          />
          <Posts posts={filteredItems} />
          <Filter
            title="Category"
            className="col-span-3 pt-16 lg:pt-0 md:hidden"
            fieldsList={filters}
            activeFilters={activeFilters}
            toggleFilter={toggleFilter}
          />
        </div>
      </section>
    </>
  );
};

export default TutorialLayout;
