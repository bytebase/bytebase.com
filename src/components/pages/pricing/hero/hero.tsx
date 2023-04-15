import Link from '@/components/shared/link';

import { COLORS } from '../table/data/pricing-plans';
import Card from './card';

type TCard = {
  image: '/images/pricing/free.jpg' | '/images/pricing/team.jpg' | '/images/pricing/enterprise.jpg';
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
    image: '/images/pricing/free.jpg',
    planTitle: 'free',
    price: 0,
    description: 'Up to 10 seats and&nbsp;10&nbsp;instances',
    buttonText: 'Free Deploy',
    buttonTheme: 'primary-outline',
    buttonLink: '/docs/get-started/install/deploy-with-docker',
    planConditions: [
      'Schema and data change review workflow',
      'Multi-environment batch change',
      'VCS integration #GitOps',
      'SQL Editor',
      'Database backup / restore',
      'Terraform integration',
    ],
  },
  {
    image: '/images/pricing/team.jpg',
    planTitle: 'team',
    price: 19,
    priceDescription: '/ starts at month',
    description: 'Up to 10 seats and 10 instances (first 3 FREE)',
    additionalDescription: 'You can start <b>a&nbsp;free&nbsp;trial for 14 days.</b>',
    buttonText: 'Try Free now',
    buttonTheme: 'primary-filled',
    buttonLink:
      'https://bytebase-hub-prod.us.auth0.com/u/login?state=hKFo2SByU1VxQzVzb0JpSm01TjF5TjZmU1JoTTVndXNpU3FuY6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIF9JakVqd1RRaVBjczh0NTVEQmxqSHo3ZGxzWV9zelBUo2NpZNkgN0IySDFrb05Sa3hQY0pENzBHeVJEbzVIbVNNMGI5V1E',
    planConditions: [
      'Everything in free plan',
      'Owner, DBA and Developer roles',
      'Advanced SQL check',
      'Review and backup policy',
      'Large table online schema migration',
      'Point-in-Time-Recovery',
    ],
  },
  {
    image: '/images/pricing/enterprise.jpg',
    planTitle: 'enterprise',
    price: 'Custom',
    description: 'Customized, billed&nbsp;annually',
    buttonText: 'Contact us',
    buttonTheme: 'primary-outline',
    buttonLink: 'mailto:support@bytebase.com',
    planConditions: [
      'Dedicated CSM and SLA support',
      'Everything in team plan',
      'Single Sign-On (SSO)',
      'Multi-region / Multi-tenancy batch change',
      'Sensitive data masking',
      'Database access control',
      'Roadmap prioritization',
    ],
  },
];

const Hero = () => (
  <section className="hero bg-pricing-hero pt-[120px] pb-20 2xl:pt-[108px] lg:pb-16 md:pt-24 md:pb-[54px] sm:pb-11">
    <div className="container max-w-[1396px] 2xl:max-w-full">
      <header className="text-center">
        <h1 className="sr-only">Bytebase pricing page</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/quote.svg" alt="" className="mx-auto md:h-auto md:w-10" />
        <p className="mx-auto mt-5 max-w-[1048px] text-40 font-semibold leading-tight tracking-tighter lg:max-w-[800px] lg:text-30 lg:leading-extra-tight md:mt-6 md:max-w-[670px] md:text-24 md:tracking-tight sm:mt-4 xs:text-20 xs:leading-tight xs:tracking-normal">
          Bytebase is not a better tool to manage database changes. It&apos;s a better way to manage
          database changes.
        </p>
        <p className="mt-2.5 text-18 leading-extra-tight text-gray-40 lg:text-16 lg:leading-snug md:mt-4.5 md:text-14 xs:mt-3.5">
          Built by engineers knowing database development flow
        </p>
        <ul className="mt-11 flex items-center justify-center gap-x-16 lg:gap-x-[52px] md:mt-10 md:gap-x-10 sm:mt-6 sm:flex-wrap sm:gap-y-4 sm:gap-x-14">
          <li>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pricing/microsoft.svg"
              alt="Microsoft logo"
              className="h-10 w-auto lg:h-9 md:h-[30px]"
            />
          </li>
          <li>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pricing/google.svg"
              alt="Google logo"
              className="h-10 w-auto lg:h-9 md:h-[30px]"
            />
          </li>
          <li>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pricing/ant-group.svg"
              alt="Ant Group logo"
              className="h-10 w-auto lg:h-9 md:h-[30px]"
            />
          </li>
          <li>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pricing/pingcap.svg"
              alt="Pingcap logo"
              className="h-10 w-auto lg:h-9 md:h-[30px]"
            />
          </li>
        </ul>
      </header>
      <ul className="mt-14 flex gap-x-8 lg:mt-12 lg:gap-x-6 md:gap-x-5 sm:flex-wrap sm:gap-x-0 sm:gap-y-5">
        {cards.map((card, idx) => (
          <li className="grow basis-1/3 sm:basis-full" key={idx}>
            <Card {...card} />
          </li>
        ))}
      </ul>
      <p className="mt-9 text-center text-15 leading-snug text-gray-40 lg:mt-8 lg:text-14 lg:leading-tight md:mt-7 sm:mt-6">
        You can upgrade, downgrade, or{' '}
        <Link size="sm" to="/refund" theme="primary-1" additionalClassName="lg:text-14 sm:inline">
          cancel your subscription
        </Link>{' '}
        anytime. No hidden charges.
      </p>
    </div>
  </section>
);

export default Hero;
