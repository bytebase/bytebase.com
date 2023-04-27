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
      'divide-y border-b pt-[84px] text-center first:pt-4 3xl:first:pt-[19px] xl:pt-[85px] md:first:pt-[23px] sm:first:pt-[37px]',
      title === 'pro'
        ? 'divide-transparent border-transparent'
        : 'divide-y divide-black divide-opacity-10 border-b  border-black  border-opacity-10',
      withLongTitle ? 'md:pt-[110px] sm:pt-[105px]' : 'sm:pt-[82.5px]',
      { 'last:border-b-0': isLastSection },
    )}
  >
    {Object.keys(features).map((item, idx) => {
      const isActive = `${item}-${idx}` === currentRow;

      return (
        <span
          className={clsx(
            'flex h-12 w-full items-center justify-center text-16 leading-normal text-gray-15',
            calculateCellHeight(item),
            isActive ? (title === 'pro' ? 'bg-[#F9FAFF]' : 'bg-[#FCFBFF]') : '',
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
