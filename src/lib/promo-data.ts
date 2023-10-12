import ROUTE from '@/lib/route';

const PROMO_DATA = {
  TOP_BANNER: {
    title: '🚘  Try live demo - no login required',
    pathname: `${ROUTE.LIVE_DEMO}?source=top-banner`,
  },
  BLOG_ASIDE: {
    title: 'What is Bytebase?',
    description:
      'A web-based collaboration workspace to help DBAs and Developers manage the database development lifecycle.',
    cta: 'See Features',
    pathname: `${ROUTE.PRICING}?source=blog`,
  },
  DOC_ASIDE: {
    title: 'Schema Migration Best Practice',
    description: 'Challenges, mistakes, and best practices for database schema migration',
    cta: 'Learn How',
    pathname: `/blog/how-to-handle-database-schema-change/?source=docs`,
  },
};

export default PROMO_DATA;
