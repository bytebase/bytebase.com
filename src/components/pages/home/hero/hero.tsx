import Button from '@/components/shared/button';
import { LinkUnderlined } from '@/components/shared/link-underlined';

import Route from '@/lib/route';

import SmallArrowIcon from '@/svgs/small-arrow.inline.svg';

import Card from './card';

const cards = [
  {
    href: '#',
    cover: '/images/change-database.png',
    title: 'Change database',
    description:
      'Simplify database changes with standardization, lint rules, and GitOps integration.',
    image: '/images/hat.png',
  },
  {
    href: '#',
    cover: '/images/query-data.png',
    title: 'Query data',
    description:
      "Perform complex SQL tasks and protect data privacy with ByteBase's web-based IDE.",
  },
  {
    href: '#',
    cover: '/images/secure-access.png',
    title: 'Secure access',
    description:
      'Eliminate administrative complexity and ensure compliance with one-stop resource management.',
  },
];

const Hero = () => {
  return (
    <section className="container gap-x-grid mt-32 grid grid-cols-12 2xl:mt-[120px] lg:mt-[120px] md:mt-[104px] sm:mt-24 sm:grid-cols-4">
      <div className="col-span-12 row-start-1 sm:col-span-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-tones-purple-light p-1 text-12 font-semibold leading-none text-primary-1">
          <span className="rounded-full bg-primary-1 px-2 py-1 text-white">What’s new?</span>
          <span className="flex items-center gap-1.5 px-2">
            1.10.0 Released
            <SmallArrowIcon width={7} height={6} />
          </span>
        </span>
      </div>
      <header className="relative col-span-8 row-start-2 mt-4.5 max-w-[844px] 2xl:col-span-9 2xl:max-w-[824px] lg:mt-3.5 lg:max-w-[696px] md:col-span-12 sm:col-span-4 sm:mt-3">
        <h1 className="sm:hidden">
          <span className="font-title text-112 font-semibold leading-none lg:text-90 lg:leading-95 md:text-80 sm:text-48">
            <mark className="bg-transparent text-primary-1">Database</mark> schema change and
            version
          </span>
          <span className="flex sm:flex-col">
            <span className="font-title text-112 font-semibold leading-none lg:text-90 lg:leading-95 md:text-80 sm:text-48">
              control
            </span>
            <p className="ml-11 mt-5 text-20 leading-[140%] 2xl:ml-[42px] xl:text-18 lg:ml-9 lg:mt-[7px] md:ml-5 md:mt-2 md:max-w-sm md:text-16">
              Bytebase offers a web-based collaboration workspace to help DBAs and Developers manage
              the lifecycle of application database schemas.
            </p>
          </span>
        </h1>
        <div className="hidden max-w-sm sm:block">
          <h1 className="font-title text-48 font-semibold leading-95">
            <mark className="bg-transparent text-primary-1">Database</mark> schema change and
            version control
          </h1>
          <p className="mt-3 text-16 leading-[140%]">
            Bytebase offers a web-based collaboration workspace to help DBAs and Developers manage
            the lifecycle of application database schemas.
          </p>
        </div>
      </header>

      <ul className="gap-x-grid col-span-12 row-start-4 mt-20 grid grid-cols-12 sm:col-span-4 sm:mt-7 sm:grid-cols-4 sm:gap-y-8">
        {cards.map((card, idx) => (
          <li key={idx} className="col-span-4 sm:col-span-3 2xs:col-span-4">
            <Card {...card} />
          </li>
        ))}
      </ul>
      <footer className="col-span-4 row-start-3 mt-14 flex items-center gap-9 lg:col-span-6 lg:mt-[46px] md:mt-[30px] sm:col-span-4 sm:mt-6">
        <Button
          className="w-full max-w-[218px] tracking-wide md:max-w-[167px] md:py-[18px] md:px-[36px] md:text-13 sm:text-13"
          href={Route.INDEX}
          theme="primary-filled"
          size="lg"
        >
          Request a Demo
        </Button>
        <LinkUnderlined className="min-w-fit md:-ml-4" href={Route.INDEX}>
          See Live Demo
        </LinkUnderlined>
      </footer>
    </section>
  );
};

export default Hero;
