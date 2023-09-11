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
    description: 'Up to 20 users, 10 instances',
    buttonText: 'Free Deploy',
    buttonTheme: 'primary-outline',
    buttonLink: '/docs/get-started/self-host/#docker',
    planConditions: [
      'Schema and data change review workflow',
      'SQL Editor',
      'RBAC (Owner, DBA and Developer roles)',
      '100+ SQL lint rules',
      'VCS integration with GitOps workflow',
      'Multi-environment batch change',
      'Database backup / restore',
    ],
  },
  {
    image: '/images/page/pricing/team.webp',
    planTitle: 'pro',
    price: 100,
    priceDescription: 'instance per month',
    description: 'Unlimited users, up to 20 instances',
    additionalDescription: 'You can start <b>a&nbsp;free&nbsp;trial for 14 days.</b>',
    buttonText: 'Try Free now',
    buttonTheme: 'primary-outline',
    buttonLink:
      'https://bytebase-hub-prod.us.auth0.com/u/login?state=hKFo2SByU1VxQzVzb0JpSm01TjF5TjZmU1JoTTVndXNpU3FuY6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIF9JakVqd1RRaVBjczh0NTVEQmxqSHo3ZGxzWV9zelBUo2NpZNkgN0IySDFrb05Sa3hQY0pENzBHeVJEbzVIbVNNMGI5V1E',
    planConditions: [
      'Advanced GitOps workflow',
      'Rollout and backup policy',
      'Scheduled change',
      'Arbitrary schema synchronization',
      'Large table online schema migration',
      'Point-in-Time-Recovery',
      'SQL script sharing',
    ],
  },
  {
    image: '/images/page/pricing/enterprise.webp',
    planTitle: 'enterprise',
    price: 'Custom',
    description: 'Volume discount available',
    buttonText: 'Contact us',
    buttonTheme: 'primary-filled',
    buttonLink: '/contact-us',
    planConditions: [
      'Dedicated line and SLA support',
      'Single Sign-On (SSO) and 2FA',
      'Sensitive data masking',
      'Data access request workflow',
      'Custom approval workflow',
      'Multi-region / Multi-tenancy batch change',
      'Custom branding',
    ],
  },
];

const Hero = () => (
  <section className="bg-pricing-hero pb-20 pt-[120px] xl:pt-[112px] lg:pb-16 md:pb-[54px] md:pt-24 sm:pb-11">
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
        You can upgrade, downgrade, or{' '}
        <Link className="lg:text-14 sm:inline" size="sm" href={Route.REFUND} theme="primary-1">
          cancel your subscription
        </Link>{' '}
        anytime. No hidden charges.
      </p>
    </div>
  </section>
);

export default Hero;
