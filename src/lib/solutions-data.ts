import { LogoListProps } from '@/components/shared/logo-list';
import {
  FINANCIAL_LOGO_LIST,
  TECHNOLOGY_LOGO_LIST,
  MANUFACTURING_LOGO_LIST,
  GAMING_LOGO_LIST,
  WEB3_LOGO_LIST,
} from './logo-data';
import { BlogPost } from '@/types/blog-post';
import { getBlogPostBySlug } from '@/lib/api-blog';

export interface Solution {
  title: string;
  values: string[];
  logoList: LogoListProps;
  posts: BlogPost[];
}

interface SolutionsData {
  FINANCIAL_SERVICES: Solution;
  TECHNOLOGY: Solution;
  MANUFACTURING: Solution;
  GAMING: Solution;
  WEB3: Solution;
}

const SOLUTIONS_DATA: SolutionsData = {
  FINANCIAL_SERVICES: {
    title: 'Financial Services',
    values: ['Data Security & Compliance', 'Change Review & Automation', 'Audit Logging'],
    logoList: {
      list: FINANCIAL_LOGO_LIST,
    },
    posts: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('longbridge-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('how-to-handle-database-schema-change')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('integrate-sql-review-into-github')!,
    ],
  },
  TECHNOLOGY: {
    title: 'Technology',
    values: [
      'VCS Integration (GitOps)',
      'Multi-Tenant Database Management',
      'API Integration (Headless)',
    ],
    logoList: {
      list: TECHNOLOGY_LOGO_LIST,
    },
    posts: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('salla-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('how-to-handle-database-schema-change')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('integrate-sql-review-into-github')!,
    ],
  },
  MANUFACTURING: {
    title: 'Manufacturing',
    values: [
      'Factory Database Change Automation',
      'Data Access Control',
      'API Integration (Headless)',
    ],
    logoList: {
      list: MANUFACTURING_LOGO_LIST,
    },
    posts: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('ev-manufacturer-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('cvte-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('how-to-handle-database-schema-change')!,
    ],
  },
  GAMING: {
    title: 'GAMING',
    values: ['Multi-Server Schema Management', 'Data Access Control', 'Change Review & Rollback'],
    logoList: {
      list: GAMING_LOGO_LIST,
    },
    posts: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('how-to-handle-database-schema-change')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('integrate-sql-review-into-github')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('database-automation-levels')!,
    ],
  },
  WEB3: {
    title: 'Web3',
    values: ['Data Security & Compliance', 'Change Review & Automation', 'Audit Logging'],
    logoList: {
      list: WEB3_LOGO_LIST,
    },
    posts: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('how-to-handle-database-schema-change')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('integrate-sql-review-into-github')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('database-automation-levels')!,
    ],
  },
};

export default SOLUTIONS_DATA;
