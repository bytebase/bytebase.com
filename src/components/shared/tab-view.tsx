'use client';

import { useState } from 'react';

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
  defaultActiveTab?: number;
}

export default function TabView({ tabs, defaultActiveTab = 0 }: TabViewProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <div className="border-gray-200 inline-flex border">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-6 py-3 font-medium ${
                activeTab === index
                  ? 'bg-gray-15 text-white'
                  : 'text-gray-600 hover:text-primary bg-white'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full">
        {tabs.map((tab, index) => (
          <div key={index} className={activeTab === index ? 'block' : 'hidden'}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
