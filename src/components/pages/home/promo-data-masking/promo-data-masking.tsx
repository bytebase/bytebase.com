'use client';

import PromoAccordian from '@/components/pages/home/promo-accordion';
import {
  AccordionHead,
  AccordionData,
} from '@/components/pages/home/promo-accordion/promo-accordion';

const head: AccordionHead = {
  pill: 'Query',
  highlight: 'Multi-level',
  text: 'data masking with access control',
};

const data: AccordionData[] = [
  {
    title: 'Integrate with SQL Editor',
    description:
      'Built-in dynamic data masking to protect sensitive information without performance impact.',
    image: '/images/page/main/data-masking/sql-editor.webp',
  },
  {
    title: 'Global policy control',
    description: 'Iptables like global policy control.',
    image: '/images/page/main/data-masking/global-rule.webp',
  },
  {
    title: 'Column level masking',
    description: 'Fine-granular masking at column level.',
    image: '/images/page/main/data-masking/column-level.webp',
  },
  {
    title: 'Unmasked access',
    description: 'Grant access to unmasked data for specific users.',
    image: '/images/page/main/data-masking/access-control.webp',
  },
];

const PromoDataMasking = () => {
  return (
    <>
      <PromoAccordian head={head} data={data} />
    </>
  );
};

export default PromoDataMasking;
