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
      <AlgoliaSearch className="relative z-10" />
      <nav className="scrollbar-hidden max-h-[calc(100vh-80px)] overflow-y-scroll pt-6 pb-10">
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
