import Route from '@/lib/route';

import Card from './card';

type TCard = {
  icon: string;
  href: string;
  title: string;
  description: string;
};

const cards: TCard[] = [
  {
    href: Route.DOCS_AUDIT_LOG,
    icon: '/images/attention.svg',
    title: 'Audit Logging',
    description: 'Complete audit trail of all database operations and schema changes.',
  },
  {
    href: Route.DOCS_ROLLBACK_DATA,
    icon: '/images/disk.svg',
    title: '1-Click Rollback',
    description: '1-click data rollback with the automated snapshot.',
  },
  {
    href: Route.DOCS_SCHEMA_SYNC,
    icon: '/images/database.svg',
    title: 'Schema Sync',
    description: 'Calculate and apply schema diff to make multiple databases consistent.',
  },
];

const Features = () => {
  return (
    <section className="container mt-40 3xl:mt-36 xl:mt-32 md:mt-24 sm:mt-20">
      <header className="flex flex-col items-center text-center sm:items-start sm:text-start">
        <h2 className="font-title text-88 font-semibold leading-95 xl:text-68 xl:leading-104 md:text-54 sm:text-48">
          Monitor & Recover
        </h2>
      </header>
      <ul className="gap-x-grid mt-14 grid grid-cols-12 3xl:mt-12 xl:mt-11 md:mt-9 sm:mt-6 sm:gap-y-8">
        {cards.map((card, idx) => (
          <li key={idx} className="col-span-4 sm:col-span-full">
            <Card {...card} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
