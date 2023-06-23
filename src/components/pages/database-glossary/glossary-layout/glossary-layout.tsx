'use client';

import { ReactNode, useMemo, useRef, useState } from 'react';

import useGlossaryActiveHash from '@/hooks/use-glossary-active-hash';

import { GlossaryLetterSet } from '@/types/glossary';

import Aside from '../aside';
import DropdownFilter from '../dropdown-filter';
import Filter from '../filter';
import MobileSidebar from '../mobile-sidebar';
import Posts from '../posts';

type GlossaryLayoutProps = {
  posts: GlossaryLetterSet[];
  children: ReactNode;
  filters: [string, number][];
};

const GlossaryLayout = ({ posts, filters, children }: GlossaryLayoutProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [activeHash] = useGlossaryActiveHash(activeFilters);
  const wrapperRef = useRef<HTMLElement>(null);

  const filteredItems = useMemo(() => {
    if (activeFilters.length === 0) return posts;

    return posts
      .map((post) => ({
        ...post,
        list: post.list.filter((item) => item.tagList.some((tag) => activeFilters.includes(tag))),
      }))
      .filter((post) => post.list.length > 0);
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
      <MobileSidebar className="hidden lg:flex" categoryList={filteredItems} />
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
          <Aside posts={filteredItems} activeHash={activeHash} />
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

export default GlossaryLayout;
