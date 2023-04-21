import Image from 'next/image';

const Hero = () => {
  const title = 'About us page';
  const supTitle = 'Why we build';

  return (
    <section className="container gap-x-grid relative grid grid-cols-12 justify-items-center pt-[136px] sm:grid-cols-4">
      <h1 className="sr-only">{title}</h1>
      <span className="col-span-12 w-fit rounded-[20px] bg-secondary-1 py-2 px-2.5 text-12 font-bold uppercase leading-none tracking-wider">
        {supTitle}
      </span>
      <h2 className="col-span-12 mt-5 max-w-[1000px] text-center font-title text-88 font-semibold leading-none">
        Simplify database changes with{' '}
        <mark className="bg-transparent text-primary-1">standardization</mark>, lint rules
      </h2>
      <Image
        src="/images/page/about/why-we-build.webp"
        alt=""
        width={1292}
        height={631}
        className="col-span-11 col-start-2 mt-[52px]"
        priority
      />
      <div className="absolute bottom-[355px] left-0 col-span-3 col-start-2">
        <span className="font-title text-112 font-semibold leading-none">10+</span>
        <p className="leading-1.4 font-regular max-w-[266px] text-20">
          Bytebase supports every major database systems
        </p>
      </div>
      <div className="absolute bottom-[327px] left-0 col-span-3 col-start-10">
        <span className="font-title text-112 font-semibold leading-none">100+</span>
        <p className="leading-1.4 font-regular max-w-[284px] text-20">
          Bytebase offers the most comprehensive SQL Lint rules
        </p>
      </div>
      <div className="absolute bottom-0 left-0 col-span-3 col-start-6">
        <span className="font-title text-112 font-semibold leading-none">100%</span>
        <p className="leading-1.4 font-regular max-w-[252px] text-20">
          All Bytebase source code is available on GitHub
        </p>
      </div>
    </section>
  );
};

export default Hero;
