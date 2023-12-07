import ROUTE from '@/lib/route';

const PROMO_DATA = {
  TOP_BANNER: {
    title: '📆  Book a product demo with our product expert',
    pathname: `${ROUTE.REQUEST_DEMO}?source=top-banner`,
  },
  BLOG_ASIDE: {
    title: 'What is Bytebase?',
    description:
      'A web-based collaboration workspace to help DBAs and Developers manage the database development lifecycle.',
    cta: 'See Features',
    pathname: `${ROUTE.PRICING}?source=blog`,
  },
  DOC_ASIDE: {
    title: 'Tutorials',
    description: "Maximize the benefits and leverage the full potential of Bytebase's features.",
    cta: 'Start Learning',
    pathname: `/tutorial/?source=docs`,
  },
};

export default PROMO_DATA;
