import ROUTE from '@/lib/route';

const PROMO_DATA = {
  TOP_BANNER: {
    title: 'White Paper: Just-in-Time Database Access Best Practices for Enterprises',
    pathname: `/whitepaper/just-in-time-database-access/?source=top-banner`,
  },
  BLOG_ASIDE: {
    title: 'What is Bytebase?',
    description:
      'Database DevSecOps platform for Developer, Security, DBA, and Platform Engineering team to manage the database development lifecycle.',
    cta: 'Pricing',
    pathname: `${ROUTE.PRICING}?source=blog`,
  },
  DOC_ASIDE: {
    title: '🕹️ Live Demo',
    description: 'We have prepared a guided live demo for you to play with.',
    cta: 'View Now',
    pathname: `${ROUTE.VIEW_LIVE_DEMO}?source=docs`,
  },
};

export default PROMO_DATA;
