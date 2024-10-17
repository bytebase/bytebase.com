import ROUTE from '@/lib/route';

const PROMO_DATA = {
  TOP_BANNER: {
    title: 'Database DevSecOps: Embedding Security into Database Operations',
    pathname: `/blog/what-is-database-devsecops/?source=top-banner`,
  },
  BLOG_ASIDE: {
    title: 'What is Bytebase?',
    description:
      'A database DevSecOps platform for Developer, Security, DBA, and Platform Engineering team to manage the database development lifecycle.',
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
