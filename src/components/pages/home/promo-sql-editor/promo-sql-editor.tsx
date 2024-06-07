'use client';

import PromoAccordian from '@/components/pages/home/promo-accordion';
import {
  AccordionHead,
  AccordionData,
} from '@/components/pages/home/promo-accordion/promo-accordion';

const head: AccordionHead = {
  pill: 'Query',
  highlight: 'Permission-based',
  text: 'SQL Editor for team',
};

const data: AccordionData[] = [
  {
    title: 'Run and explain query',
    description: 'Run ad-hoc queries to explore data.',
    image: '/images/page/main/sql-editor/run.webp',
  },
  {
    title: 'Control data access',
    description: 'Centralized access control to ensure data security.',
    image: '/images/page/main/sql-editor/access-control.webp',
  },
  {
    title: 'Mask data',
    description:
      'Built-in dynamic data masking to protect sensitive information without performance impact.',
    image: '/images/page/main/sql-editor/mask.webp',
  },
  {
    title: 'Explore the schema',
    description: 'Navigate database schema to understand data.',
    image: '/images/page/main/sql-editor/explore.webp',
  },
];

const PromoSQLEditor = () => {
  return (
    <>
      <PromoAccordian head={head} data={data} />
    </>
  );
};

export default PromoSQLEditor;
