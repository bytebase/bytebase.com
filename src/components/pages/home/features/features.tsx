import Card from './card';

type TCard = {
  icon: string;
  href: string;
  title: string;
  description: string;
};

const cards: TCard[] = [
  {
    href: '#',
    icon: '/images/attention.svg',
    title: 'Anomaly center',
    description:
      'Simplify database changes with standardization, lint rules, and GitOps integration. It automatically starts deployment processes for new database change scripts.',
  },
  {
    href: '#',
    icon: '/images/database.svg',
    title: 'Drift detection',
    description:
      "Perform complex SQL tasks and protect data privacy with ByteBase's web-based IDE, anonymization engine, and access controls.",
  },
  {
    href: '#',
    icon: '/images/disk.svg',
    title: 'Disaster recovery',
    description:
      'Eliminate administrative complexity and ensure compliance with one-stop resource management, policy enforcement and CLI-like SQL editor experience.',
  },
];

const Features = () => {
  return (
    <section className="container mt-[232px] 2xl:mt-[138px] lg:mt-[124px] md:mt-[90px] sm:mt-[76px]">
      <header className="flex flex-col items-center text-center sm:items-start sm:text-start">
        <h2 className="font-title text-88 font-semibold leading-none lg:text-68 lg:leading-104 md:text-54 sm:text-48">
          Stay confident
        </h2>
        <p className="mt-5 max-w-[716px] text-20 leading-normal 2xl:mt-[22px] lg:mt-5 lg:text-18 lg:leading-snug md:mt-3 md:max-w-[468px] md:text-14 sm:mt-2">
          Bytebase streamlines database deployment from non-prod to prod by integrating with version
          control systems for a GitOps workflow.
        </p>
      </header>
      <ul className="gap-x-grid mt-14 grid grid-cols-3 gap-y-8 2xl:mt-12 lg:mt-11 lg:grid-cols-12 md:mt-9 sm:mt-6 sm:flex sm:flex-col">
        {cards.map((card, idx) => (
          <li key={idx} className="xl:col-span-4">
            <Card {...card} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
