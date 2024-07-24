'use client';

import PromoAccordian from '@/components/pages/home/promo-accordion';
import {
  AccordionHead,
  AccordionData,
} from '@/components/pages/home/promo-accordion/promo-accordion';

const head: AccordionHead = {
  pill: 'Batch',
  highlight: 'Batch change',
  text: 'databases consistently',
};

const data: AccordionData[] = [
  {
    title: 'Propagate environments',
    description: 'Propagate changes throughout dev, testing, staging, prod environments.',
    image: '/images/page/main/batch-change/multi-environment.webp',
  },
  {
    title: 'Database group',
    description: 'Group and change partitioned / tenanted databases together.',
    image: '/images/page/main/batch-change/database-group.webp',
  },
  {
    title: 'Deployment config',
    description: 'Pre-configure staged rollouts.',
    image: '/images/page/main/batch-change/deployment-config.webp',
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
