import Button from '@/components/shared/button';
import { LinkUnderlined } from '@/components/shared/link-underlined';

import Route from '@/lib/route';

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
    <section className="mt-32 2xl:mt-[120px] lg:mt-[120px] md:mt-[104px] sm:mt-24 container grid grid-cols-12 sm:grid-cols-4 grid-gap">
      <div className="row-start-1 col-span-12 sm:col-span-4">
        <span className="inline-flex items-center text-12 leading-none p-1 bg-tones-purple-light text-primary-1 font-semibold rounded-full gap-1">
          <span className="px-2 py-1 bg-primary-1 rounded-full text-white">What’s new?</span>
          <span className="flex items-center px-2">
            1.10.0 Released
            <img src="/images/arrow-hero.svg" alt="" className="ml-1.5 h-1.5" />
          </span>
        </span>
      </div>
      <header className="mt-4.5 lg:mt-3.5 sm:mt-3 row-start-2 col-span-8 2xl:col-span-9 md:col-span-12 sm:col-span-4 relative max-w-[844px] 2xl:max-w-[824px] lg:max-w-[696px]">
        <h1 className="sm:hidden">
          <span className="font-title font-semibold leading-none lg:leading-95 text-112 lg:text-90 md:text-80 sm:text-48">
            <mark className="bg-transparent text-primary-1">Database</mark> schema change and
            version
          </span>
          <span className="flex sm:flex-col">
            <span className="font-title font-semibold leading-none lg:leading-95 text-112 lg:text-90 md:text-80 sm:text-48">
              control
            </span>
            <p className="ml-11 2xl:ml-[42px] lg:ml-9 mt-5 lg:mt-[7px] md:ml-5 md:mt-2 text-20 xl:text-18 md:text-16 leading-[140%] md:max-w-sm">
              Bytebase offers a web-based collaboration workspace to help DBAs and Developers manage
              the lifecycle of application database schemas.
            </p>
          </span>
        </h1>
        <div className="hidden sm:block max-w-sm">
          <h1 className="font-title font-semibold leading-95 text-48">
            <mark className="bg-transparent text-primary-1">Database</mark> schema change and
            version control
          </h1>
          <p className="mt-3 text-16 leading-[140%]">
            Bytebase offers a web-based collaboration workspace to help DBAs and Developers manage
            the lifecycle of application database schemas.
          </p>
        </div>
      </header>

      <ul className="mt-20 sm:mt-7 row-start-4 col-span-12 sm:col-span-4 grid grid-cols-12 grid-gap sm:grid-cols-4 sm:gap-y-8">
        {cards.map((card, idx) => (
          <li key={idx} className="col-span-4 sm:col-span-3 2xs:col-span-4">
            <Card {...card} />
          </li>
        ))}
      </ul>
      <footer className="mt-14 lg:mt-[46px] md:mt-[30px] sm:mt-6 row-start-3 col-span-4 lg:col-span-6 sm:col-span-4 flex items-center gap-9">
        <Button
          to={Route.INDEX}
          theme="primary-filled"
          size="lg"
          additionalClassName="sm:text-13 md:py-[18px] md:px-[36px] md:max-w-[167px] md:text-13 tracking-wide w-full max-w-[218px]"
        >
          Request a Demo
        </Button>
        <LinkUnderlined className="min-w-fit md:-ml-4" to={Route.INDEX}>
          See Live Demo
        </LinkUnderlined>
      </footer>
    </section>
  );
};

export default Hero;
