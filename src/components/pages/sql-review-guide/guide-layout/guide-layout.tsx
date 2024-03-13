'use client';

import { useMemo, useState } from 'react';

import { convertToCategoryList } from '@/utils/sql-review';

import MobileSidebar from '@/components/pages/sql-review-guide/mobile-sidebar';

import { ActiveFilters, GuidelineTemplate } from '@/types/sql-review';

import Content from '../content';
import DropdownFilterBar from '../dropdown-filter-bar';
import FilterBar from '../filter-bar';
import Sidebar from '../sidebar';

const GuideLayout = ({
  children,
  templateList,
  schema,
}: {
  children: React.ReactNode;
  templateList: GuidelineTemplate[];
  schema: any;
}) => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    template: templateList[0],
    categories: [],
  });

  const categoryList = useMemo(() => {
    const { template, categories } = activeFilters;

    const ruleList = template.ruleList.filter((rule) => {
      if (categories.length === 0) return true;

      return categories.some(({ id, type, checked }) => {
        if (checked) {
          if (type === 'level') {
            return rule.level === id.toLocaleUpperCase();
          }

          if (type === 'engine') {
            return rule.engineList.some((engine) => engine === id.toLocaleUpperCase());
          }
        }
      });
    });

    return convertToCategoryList(ruleList);
  }, [activeFilters, schema]);

  return (
    <>
      <MobileSidebar className="hidden lg:flex" categoryList={categoryList} />
      {children}
      <section className="guide-layout container mt-11 lg:mt-10 md:mt-8 xs:mt-6">
        <div className="gap-x-grid grid grid-cols-12 border-t border-gray-90 pt-16 lg:pt-14 md:gap-y-8 md:pt-8 xs:pt-6">
          <DropdownFilterBar
            className="col-span-full hidden md:grid"
            templateList={templateList}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
          <Sidebar className="col-span-3 lg:hidden" categoryList={categoryList} />
          <Content
            className="col-span-6 lg:col-span-9 md:order-1 md:col-span-full"
            categoryList={categoryList}
          />
          <FilterBar
            className="col-span-3 md:hidden"
            templateList={templateList}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
          />
        </div>
      </section>
    </>
  );
};

export default GuideLayout;
