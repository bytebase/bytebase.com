'use client';

import { SidebarItem } from '@/types/docs';

import Item from './item';

export type SidebarProps = {
  data: SidebarItem[];
  expandedList?: string[];
};

const Sidebar = ({ data, expandedList }: SidebarProps) => {
  return (
    <aside className="sidebar">
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
