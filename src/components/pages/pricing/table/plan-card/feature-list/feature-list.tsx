import clsx from 'clsx';

import Tooltip from '@/components/shared/tooltip';

import { PricingTableItem } from '@/types/pricing';

import { calculateCellHeight } from '../../data/calculate-cell-height';
import { COLORS } from '../../data/pricing-plans';

const presentFeature = (
  <img src="/images/check.svg" className="h-6 w-6" alt="Present Feature" loading="lazy" />
);
const missingFeature = (
  <img src="/images/cross.svg" className="h-6 w-6" alt="Missing Feature" loading="lazy" />
);

const renderFeature = (feature: boolean | { value: string; tooltip: string } | string) => {
  if (typeof feature === 'boolean') {
    return feature ? presentFeature : missingFeature;
  }
  if (typeof feature === 'object') {
    return (
      <div className="flex items-center">
        <span>{feature.value}</span>
        <Tooltip text={feature.tooltip} />
      </div>
    );
  }
  return feature;
};

type FeatureListProps = {
  title: keyof typeof COLORS;
  features: PricingTableItem;
  currentRow: string;
  isLastSection?: boolean;
  withLongTitle?: boolean;
};

const FeatureList = ({
  title,
  features,
  currentRow,
  isLastSection,
  withLongTitle,
}: FeatureListProps) => (
  <div
    className={clsx(
      'divide-y divide-black divide-opacity-10 border-b border-black border-opacity-10 text-center',
      'pt-[84px] first:pt-0 xl:pt-[80px]',
      withLongTitle ? 'md:pt-[110px] sm:pt-[105px]' : 'sm:pt-[78px]',
      isLastSection && 'last:border-b-0',
    )}
  >
    {Object.keys(features).map((item, idx) => {
      const isActive = `${item}-${idx}` === currentRow;

      return (
        <span
          className={clsx(
            'flex h-12 w-full items-center justify-center text-16 leading-normal text-gray-15',
            calculateCellHeight(item),
            isActive ? 'bg-primary-1 bg-opacity-[0.04]' : '',
          )}
          data-row-id={`${item}-${idx}`}
          key={`${title}_${item}_${idx}`}
        >
          {renderFeature(features[item])}
        </span>
      );
    })}
  </div>
);

export default FeatureList;
