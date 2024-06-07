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
  caseStudyList: BlogPost[];
  quote: string;
  author: string;
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
    caseStudyList: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('longbridge-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('salla-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('cvte-case-study')!,
    ],
    quote:
      'Bytebase enables us to automate the database change process. In particular, its batch mode ensures consistent changes across all databases for each of our tenants.',
    author: 'Frank Yao - Head of Infrastructure at Longbridge',
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
    caseStudyList: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('salla-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('longbridge-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('cvte-case-study')!,
    ],
    quote:
      'We use Bytebase to manage our multi-region database migrations. Bytebase has been great and their team has been very responsive in addressing any requests we’ve had.',
    author: 'Tuomas Artman - Co-founder at Linear',
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
    caseStudyList: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('cvte-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('ev-manufacturer-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('salla-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('longbridge-case-study')!,
    ],
    quote:
      'Bytebase enables us to automate the database change process. In particular, its batch mode ensures consistent changes across all databases for each of our tenants.',
    author: 'Frank Yao - Head of Infrastructure at Longbridge',
  },
  GAMING: {
    title: 'GAMING',
    values: ['Multi-Server Schema Management', 'Data Access Control', 'Change Review & Rollback'],
    logoList: {
      list: GAMING_LOGO_LIST,
    },
    caseStudyList: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('longbridge-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('salla-case-study')!,
    ],
    quote:
      'We use Bytebase to manage our multi-region database migrations. Bytebase has been great and their team has been very responsive in addressing any requests we’ve had.',
    author: 'Tuomas Artman - Co-founder at Linear',
  },
  WEB3: {
    title: 'Web3',
    values: ['Data Security & Compliance', 'Change Review & Automation', 'Audit Logging'],
    logoList: {
      list: WEB3_LOGO_LIST,
    },
    caseStudyList: [
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('longbridge-case-study')!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getBlogPostBySlug('salla-case-study')!,
    ],
    quote:
      'Bytebase enables us to automate the database change process. In particular, its batch mode ensures consistent changes across all databases for each of our tenants.',
    author: 'Frank Yao - Head of Infrastructure at Longbridge',
  },
};

export default SOLUTIONS_DATA;
