import Link from '@/components/shared/link';

import Route from '@/lib/route';

import { COLORS } from '../table/data/pricing-plans';
import Card from './card';
import Logos from './logos';

type TCard = {
  image: string;
  planTitle: keyof typeof COLORS;
  price: string | number;
  description: string;
  buttonText: string;
  buttonTheme: 'primary-filled' | 'primary-outline';
  buttonLink: string;
  planConditions: Array<string>;
  priceDescription?: string;
  additionalDescription?: string;
};

const cards: TCard[] = [
  {
    image: '/images/page/pricing/free.webp',
    planTitle: 'community',
    price: 'Free',
    description: 'Process Standarization',
    buttonText: 'Deploy in 5 Minutes',
    buttonTheme: 'primary-outline',
    buttonLink: '/docs/get-started/self-host/#docker',
    planConditions: ['Community support', 'Up to 20 users', 'Up to 10 database instances'],
  },
  {
    image: '/images/page/pricing/team.webp',
    planTitle: 'pro',
    price: 100,
    priceDescription: 'instance per month',
    description: 'Advanced Collaboration',
    additionalDescription: 'Annual subscription, cancel anytime',
    buttonText: 'Buy Now',
    buttonTheme: 'primary-outline',
    buttonLink: Route.PRO_PAYMENT,
    planConditions: [
      'Email support',
      'Unlimited users',
      'Up to 20 database instances',
      'Rollout policy',
    ],
  },
  {
    image: '/images/page/pricing/enterprise.webp',
    planTitle: 'enterprise',
    price: 'Custom',
    description: 'Security and Compliance',
    additionalDescription: 'Free trial for 14 days, volume discount',
    buttonText: 'Contact Us',
    buttonTheme: 'primary-filled',
    buttonLink: '/contact-us',
    planConditions: [
      'SLA support',
      'Unlimited users',
      'Unlimited database instances',
      'SSO and 2FA',
      'Audit log',
    ],
  },
];

const Hero = () => (
  <section className="bg-pricing-hero pb-20 pt-[64px] lg:pb-16 md:pb-[54px] md:pt-24 sm:pb-11">
    <div className="container max-w-[1396px] 2xl:max-w-full">
      <header className="text-center">
        <h1 className="sr-only">Bytebase pricing page</h1>
        <Logos />
      </header>
      <ul className="mt-14 flex gap-x-12 lg:mt-12 lg:gap-x-6 md:gap-x-5 sm:flex-wrap sm:gap-x-0 sm:gap-y-5">
        {cards.map((card) => (
          <li className="grow basis-1/3 sm:basis-full" key={card.planTitle}>
            <Card {...card} />
          </li>
        ))}
      </ul>
      <p
        aria-label="You can upgrade, downgrade, or cancel your subscription anytime. No hidden charges"
        className="mt-9 text-center text-15 leading-snug text-gray-40 lg:mt-8 lg:text-14 lg:leading-tight md:mt-7 sm:mt-6"
      >
        What is a{' '}
        <Link
          className="lg:text-14 sm:inline"
          size="sm"
          href={Route.DOCS_CONCEPT_DB_INSTANCE}
          theme="primary-1"
        >
          database instance
        </Link>
        ❓
      </p>
    </div>
  </section>
);

export default Hero;
