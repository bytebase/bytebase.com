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
    href: Route.DOCS_DATA_MASKING_COLUMN,
    icon: '/images/masking.svg',
    title: 'Column level',
    description: 'Granular column level masking.',
  },
  {
    href: Route.DOCS_DATA_MASKING_GLOBAL,
    icon: '/images/masking-global-rule.svg',
    title: 'Global policy',
    description: 'Global policy based on environment, classification and others.',
  },
  {
    href: Route.DOCS_DATA_MASKING_ACCESS,
    icon: '/images/masking-access-control.svg',
    title: 'Access control',
    description: 'Grant workflow to access unmasked data.',
  },
];

const Features = () => {
  return (
    <section className="container mt-10 3xl:mt-9 xl:mt-8 md:mt-3 sm:mt-2">
      <header className="flex flex-col items-center text-center sm:items-start sm:text-start">
        <h2 className="font-title text-88 font-semibold leading-95 xl:text-68 xl:leading-104 md:text-54 sm:text-48">
          Flexible data masking with access control
        </h2>
        <p className="mt-5 max-w-[716px] text-20 leading-normal 3xl:mt-[22px] xl:mt-5 xl:text-18 xl:leading-snug md:mt-3 md:max-w-[468px] md:text-14 sm:mt-2">
          Combined column level and global masking policy with grant flow
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
