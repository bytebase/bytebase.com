const Hero = () => {
  return (
    <section className="container pt-[48px] 2xl:pt-16 lg:pt-8">
      <div className="grid grid-cols-12 border-b border-gray-90 pb-11 lg:pb-10 md:pb-8 sm:pb-6">
        <h1 className="col-span-full font-title text-90 font-semibold leading-none lg:text-68 md:text-56 sm:text-48">
          Database <mark className="bg-transparent text-primary-1">Glossary</mark>
        </h1>
        <p className="col-span-4 mt-4 text-18 2xl:col-span-6 lg:col-span-8 lg:mt-3 md:col-span-10 md:mt-2 md:text-16 md:leading-snug sm:col-span-full sm:text-14">
          A complete database term dictionary on the internet. We cover general database, MySQL,
          PostgreSQL as well as Bytebase specific topics.
        </p>
      </div>
    </section>
  );
};

export default Hero;
