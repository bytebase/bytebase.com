import clsx from 'clsx';
import DollarIcon from '@/svgs/dollar.inline.svg';
import { PRICING_PLANS } from '@/lib/pricing-plan';
import Link from '@/components/shared/link';

import Route from '@/lib/route';

/*** two ways to use this component:

Example 1: 

---
title: Data Access Control
feature_name: DATA_ACCESS_CONTROL
---

Example 2: 

<PricingPlanBlock feature_name='BATCH_CHANGE' />

***/

// TODO: handle features having basic and advanced versions

const PricingPlanBlock = ({ feature_name }: { feature_name: string }) => {
  if (
    !feature_name ||
    !PRICING_PLANS.get(feature_name) ||
    PRICING_PLANS.get(feature_name) == 'COMMUNITY'
  ) {
    return null;
  } else {
    let text = 'Enterprise Plan';
    if (PRICING_PLANS.get(feature_name) == 'PRO') {
      text = 'Pro and Enterprise Plan';
    }
    return (
      <figure
        className={clsx(
          'hint-block mt-8 mb-4 border',
          'border-tones-purple-dark shadow-[0px_5px_15px_rgba(156,186,201,0.5)]',
        )}
      >
        <div
          className={clsx(
            'flex gap-x-2 px-5 pb-6 pt-6 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(172,178,210,0.5)] md:gap-x-3 md:px-4 md:pb-5 md:pt-5 sm:gap-x-2 sm:px-3 sm:pb-4 sm:pt-4',
            'items-center bg-tones-purple-light',
          )}
        >
          <span
            className={clsx(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
              'bg-primary-1',
            )}
          >
            <DollarIcon className="h-4 w-4 text-white" />
          </span>

          <div className="flex flex-col">
            <div
              className={clsx(
                'prose space-y-2.5 !text-15 !leading-snug prose-p:my-2.5 prose-p:first:mt-0 prose-p:last:mb-0 prose-a:break-all prose-ol:my-0 prose-ol:!pl-0 prose-ul:!pl-0 sm:mt-0 sm:!text-14 sm:leading-snug',
                'prose-a:font-semibold prose-a:text-primary-1 prose-a:no-underline prose-li:marker:!text-primary-1',
              )}
            >
              This feature is available in <Link href={Route.PRICING}>{text}</Link>.
            </div>
          </div>
        </div>
      </figure>
    );
  }
};

export default PricingPlanBlock;
