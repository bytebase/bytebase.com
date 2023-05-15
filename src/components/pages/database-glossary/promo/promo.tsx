import Link from '@/components/shared/link';

import Route from '@/lib/route';

import Logos from './logos';

const Promo = () => {
  return (
    <section className="col-span-6 col-start-4 mt-14 lg:col-span-8 lg:col-start-3 lg:mt-12 md:col-span-full md:mt-10 sm:mt-9">
      <h2 className="text-44 font-bold leading-extra-tight lg:text-36 md:text-30">
        Safer and faster database change and version control for DBAs and Developers
      </h2>
      <p className="mt-5 text-18 lg:mt-4 lg:text-16 lg:leading-snug md:mt-2">
        Bytebase is an{' '}
        <Link href={Route.GITHUB} className="font-semibold text-primary-1">
          open source
        </Link>
        , web-based database schema change and version control tool for teams. It offers a web-based
        collaboration workspace to help DBAs and Developers manage the lifecycle of application
        database schemas.
      </p>
      <Logos />
    </section>
  );
};

export default Promo;
