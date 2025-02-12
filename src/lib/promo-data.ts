import ROUTE from '@/lib/route';

const PROMO_DATA = {
  TOP_BANNER: {
    title: 'White Paper: Just-in-Time Database Access Best Practices',
    pathname: `/content/whitepaper/just-in-time-database-access/bytebase-whitepaper-just-in-time-database-access-best-practices.pdf`,
  },
  BLOG_ASIDE: {
    title: 'What is Bytebase?',
    description:
      'Schema migrations, adhoc changes, just-in-time (JIT) database access, and data masking in one place.',
    cta: 'Learn more',
    pathname: `/blog/all-database-tools-bytebase-replaces/?source=blog`,
  },
  DOC_ASIDE: {
    title: '🕹️ Live Demo',
    description: 'We have prepared a guided live demo for you to play with.',
    cta: 'View Now',
    pathname: `${ROUTE.VIEW_LIVE_DEMO}?source=docs`,
  },
};

export default PROMO_DATA;
