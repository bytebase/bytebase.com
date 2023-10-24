import Route from '@/lib/route';

import Card from '@/components/pages/home/features/card';

type TCard = {
  icon: string;
  href: string;
  title: string;
  description: string;
};

const cards: TCard[] = [
  {
    href: '/docs/tutorials/batch-change-with-database-group',
    icon: '/images/batch-change-consistency.svg',
    title: 'Consistency',
    description: 'Same change, all databases.',
  },
  {
    href: Route.DOCS_BATCH_CHANGE,
    icon: '/images/batch-change-streamlined.svg',
    title: 'Streamlined',
    description: 'Single issue to track change across environments.',
  },
  {
    href: Route.DOCS_BATCH_CHANGE,
    icon: '/images/batch-change-compliance.svg',
    title: 'Compliance',
    description: 'Manage geographically isolated databases.',
  },
];

const Features = () => {
  return (
    <section className="container mt-10 3xl:mt-9 xl:mt-8 md:mt-3 sm:mt-2">
      <header className="flex flex-col items-center text-center sm:items-start sm:text-start">
        <h2 className="font-title text-88 font-semibold leading-95 xl:text-68 xl:leading-104 md:text-54 sm:text-48">
          Change multiple databases efficiently and consistently
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
