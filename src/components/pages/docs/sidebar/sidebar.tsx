'use client';

import { SidebarItem } from '@/types/docs';

import AlgoliaSearch from '../algolia-search';
import Item from './item';

export type SidebarProps = {
  data: SidebarItem[];
  currentUrl: string;
  expandedList?: string[];
};

const Sidebar = ({ currentUrl, data, expandedList }: SidebarProps) => {
  return (
    <aside className="sidebar col-span-3 md:hidden">
      <AlgoliaSearch />
      <nav className="mt-6 pl-1.5 lg:mt-5">
        <ul>
          {data.map((item, index) => (
            <Item {...item} currentUrl={currentUrl} expandedList={expandedList} key={index} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
