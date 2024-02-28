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
    href: Route.DOCS_ANOMALY_CENTER,
    icon: '/images/attention.svg',
    title: 'Anomaly center',
    description: 'Surface and review all databases anomalies in a single place.',
  },
  {
    href: Route.DOCS_DRIFT_DETECTION,
    icon: '/images/database.svg',
    title: 'Drift detection',
    description: 'Proactively detect schema drift caused by unexpected out-of-band change.',
  },
  {
    href: Route.DOCS_BATCH_CHANGE,
    icon: '/images/batch-change-streamlined.svg',
    title: 'Batch Change',
    description: 'Manage geographically isolated databases.',
  },
];

const Features = () => {
  return (
    <section className="container mt-32 md:mt-16 sm:mt-8">
      <header className="flex flex-col items-center text-center sm:items-start sm:text-start">
        <h2 className="font-title text-88 font-semibold leading-95 xl:text-68 xl:leading-104 md:text-54 sm:text-48">
          The GitLab for database DevOps
        </h2>
        <p className="mt-5 max-w-[716px] text-20 leading-normal 3xl:mt-[22px] xl:mt-5 xl:text-18 xl:leading-snug md:mt-3 md:max-w-[468px] md:text-14 sm:mt-2">
          Change, review, deploy, rollback. All in one place.
        </p>
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
