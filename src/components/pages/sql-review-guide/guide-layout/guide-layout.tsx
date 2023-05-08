'use client';

import { useState } from 'react';

import { convertToCategoryList } from '@/utils/sql-review';

import MobileSidebar from '@/components/pages/sql-review-guide/mobile-sidebar';

import { GuidelineTemplate } from '@/types/sql-review';

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
  const [template, setTemplate] = useState(templateList[0]);
  const [categoryList, setCategoryList] = useState(
    convertToCategoryList(schema, template.ruleList),
  );

  return (
    <>
      <MobileSidebar className="hidden lg:flex" categoryList={categoryList} />
      {children}
      <section className="guide-layout container mt-11 lg:mt-10">
        <div className="gap-x-grid grid grid-cols-12 border-t border-gray-90 pt-16 lg:pt-14 md:gap-y-8 md:pt-8">
          <DropdownFilterBar
            className="col-span-full hidden md:grid"
            schema={schema}
            template={template}
            templateList={templateList}
            setTemplate={setTemplate}
            setCategoryList={setCategoryList}
          />
          <Sidebar className="col-span-3 lg:hidden" categoryList={categoryList} />
          <Content
            className="col-span-6 lg:col-span-9 md:order-1 md:col-span-full"
            categoryList={categoryList}
          />
          <FilterBar
            className="col-span-3 md:hidden"
            schema={schema}
            template={template}
            templateList={templateList}
            setTemplate={setTemplate}
            setCategoryList={setCategoryList}
          />
        </div>
      </section>
    </>
  );
};

export default GuideLayout;
