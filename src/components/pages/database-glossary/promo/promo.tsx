import Link from '@/components/shared/link';

import Route from '@/lib/route';

import Integrations from '@/components/shared/integrations';

const Promo = () => {
  return (
    <section className="col-span-6 col-start-4 mt-14 xl:col-span-8 xl:col-start-3 xl:mt-12 md:col-span-full md:mt-10 sm:mt-9">
      <h2 className="text-44 font-bold leading-extra-tight xl:text-36 md:text-30">
        Database schema migration and version control, Database CI/CD, and DevOps for developers and
        DBAs
      </h2>
      <p className="mt-5 text-18 xl:mt-4 xl:text-16 xl:leading-snug md:mt-4">
        Bytebase is an{' '}
        <Link href={Route.GITHUB} className="font-semibold text-primary-1 hover:text-primary-2">
          open source
        </Link>
        , web-based database schema change and version control tool for teams. It offers a web-based
        collaboration workspace to help DBAs and Developers manage the lifecycle of application
        database schemas.
      </p>
      <Integrations />
    </section>
  );
};

export default Promo;
