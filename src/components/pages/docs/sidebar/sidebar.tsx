'use client';

import { SidebarItem } from '@/types/docs';

import AlgoliaSearch from '../algolia-search';
import Item from './item';

export type SidebarProps = {
  data: SidebarItem[];
  expandedList?: string[];
  includeSearch?: boolean;
};

const Sidebar = ({ data, expandedList, includeSearch = true }: SidebarProps) => {
  return (
    <aside className="sidebar">
      {includeSearch && <AlgoliaSearch className="relative z-10" />}
      <nav className="scrollbar-hidden max-h-[calc(100vh-200px)] overflow-y-scroll pb-10 pt-6">
        <ul>
          {data.map((item, index) => (
            <Item {...item} expandedList={expandedList} key={index} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
