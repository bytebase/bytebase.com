const extraLongLabels = ['connection'];
const longerLabels = ['synchronize'];
const longLabels = ['schedule'];
const mediumLabels = [
  'schema',
  'sql-check',
  'terraform',
  'ui',
  'webhook',
  'approval',
  'sso',
  'masking',
  'access-control',
  'roadmap',
  'msa',
];

export const calculateCellHeight = (label: string) => {
  if (extraLongLabels.includes(label)) {
    return 'xl:h-[72px] sm:h-[129px]';
  }
  if (longerLabels.includes(label)) {
    return 'xl:h-[72px] sm:h-[94px]';
  }
  if (longLabels.includes(label)) {
    return 'md:h-[72px]';
  }
  if (mediumLabels.includes(label)) {
    return 'sm:h-[72px]';
  }
  return '';
};
