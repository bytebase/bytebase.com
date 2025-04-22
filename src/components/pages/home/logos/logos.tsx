import { LANDING_LOGO_LIST } from '@/lib/logo-data';

const Logos = () => {
  return (
    <section className="mt-28 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0)34.28%,rgba(240,242,255,0.5)100%)] py-24 2xl:mt-24 2xl:py-20 xl:mt-20 xl:py-16 md:mt-12 md:py-12 sm:mt-8 sm:py-4">
      <div className="container mx-auto flex max-w-6xl flex-col items-center px-4">
        <ul className="grid w-full grid-cols-6 items-center gap-8 2xl:grid-cols-6 xl:grid-cols-6 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2">
          {LANDING_LOGO_LIST.map((logo) => (
            <li key={logo.alt} className="flex items-center justify-center px-4">
              <img
                className="mx-auto h-16 xl:h-12 xl:w-auto md:h-10 xs:h-8"
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Logos;
