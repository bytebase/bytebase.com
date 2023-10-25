'use client';

import PromoAccordian from '@/components/pages/home/promo-accordion';
import {
  AccordionHead,
  AccordionData,
} from '@/components/pages/home/promo-accordion/promo-accordion';

const head: AccordionHead = {
  pill: 'Git-like',
  highlight: 'Branch, design, merge, apply',
  text: 'database changes',
};

const data: AccordionData[] = [
  {
    title: 'Branching like Git',
    description: 'Create branch from baseline schema.',
    image: '/images/page/main/branching/create-branch.webp',
  },
  {
    title: 'Design schema visually',
    description: 'Edit schema with visual designer.',
    image: '/images/page/main/branching/schema-editor.webp',
  },
  {
    title: 'Merge when ready',
    description: 'Merge between different branches and apply changes when ready.',
    image: '/images/page/main/branching/merge-branch.webp',
  },
  {
    title: 'Protection rules',
    description: 'Fine-grained control in how branch can be created and merged.',
    image: '/images/page/main/branching/protection-rules.webp',
  },
];

const PromoBatchChange = () => {
  return (
    <>
      <PromoAccordian head={head} data={data} />
    </>
  );
};

export default PromoBatchChange;
