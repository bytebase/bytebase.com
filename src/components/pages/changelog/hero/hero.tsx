import Link from '@/components/shared/link';

import Route from '@/lib/route';

const Hero = () => {
  return (
    <section className="pt-[136px] 2xl:pt-32 lg:pt-[120px] md:pt-[104px] sm:pt-24">
      <div className="container">
        <h1 className="font-title text-90 font-semibold leading-none lg:text-68 md:text-56 sm:text-40">
          Bytebase <mark className="bg-transparent text-primary-1">Changelog</mark>
        </h1>
        <p className="mt-4 border-b border-gray-90 pb-11 text-18 lg:mt-3 lg:pb-9 lg:text-16 md:mt-2 md:pb-8 md:leading-snug sm:pb-6">
          Reliable Database change for DevOps and DBA teams.
          <br />
          Want to be notifed? Follow us on{' '}
          <Link
            href={Route.TWITTER}
            target="_blank"
            className="font-semibold text-primary-1 hover:text-gray-60"
          >
            Twitter
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default Hero;
