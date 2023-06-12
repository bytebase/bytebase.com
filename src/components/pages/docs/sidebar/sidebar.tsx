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
    <aside className="sidebar">
      <AlgoliaSearch className="sticky top-0" />
      <nav className="scrollbar-hidden mt-4 max-h-[calc(100vh-90px)] overflow-y-scroll pb-10 lg:mt-5">
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
