import ROUTE from '@/lib/route';

const PROMO_DATA = {
  TOP_BANNER: {
    title: 'Bytebase vs Liquibase: a side-by-side comparison for Database CI/CD',
    pathname: '/blog/bytebase-vs-liquibase/',
  },
  BLOG_ASIDE: {
    title: 'What is Bytebase?',
    description:
      'Bytebase offers a web-based collaboration workspace to help DBAs and Developers manage the lifecycle of application database schemas.',
    cta: 'See Features',
    pathname: `${ROUTE.PRICING}/source=blog`,
  },
};

export default PROMO_DATA;
