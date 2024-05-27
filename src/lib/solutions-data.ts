import { LogoListProps } from '@/components/shared/logo-list';

export interface Solution {
  title: string;
  logoList: LogoListProps;
}

interface SolutionsData {
  FINANCIAL_SERVICES: Solution;
  TECHNOLOGY: Solution;
  MANUFACTURING: Solution;
}

const SOLUTIONS_DATA: SolutionsData = {
  FINANCIAL_SERVICES: {
    title: 'Financial Services',
    logoList: {
      title: 'Financial Services',
    },
  },
  TECHNOLOGY: {
    title: 'Technology',
    logoList: {
      title: 'Technology',
    },
  },
  MANUFACTURING: {
    title: 'Manufacturing',
    logoList: {
      title: 'Manufacturing',
    },
  },
};

export default SOLUTIONS_DATA;
