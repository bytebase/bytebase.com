import ROUTE from '@/lib/route';

const PROMO_DATA = {
  TOP_BANNER: {
    title: '🔒 Secure-first SQL Editor with data access control and masking 🎭',
    pathname: `${ROUTE.SQL_EDITOR}?source=top-banner`,
  },
  BLOG_ASIDE: {
    title: 'What is Bytebase?',
    description:
      'Bytebase offers a web-based collaboration workspace to help DBAs and Developers manage the lifecycle of application database schemas.',
    cta: 'See Features',
    pathname: `${ROUTE.PRICING}?source=blog`,
  },
  DOC_ASIDE: {
    title: 'Database Migration Best Practice',
    description: 'Challenges, mistakes, and best practices for database schema migration',
    cta: 'Read Now',
    pathname: `/blog/how-to-handle-database-schema-change/?source=docs`,
  },
};

export default PROMO_DATA;
