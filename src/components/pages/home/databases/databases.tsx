import Image from 'next/image';

const Databases = () => {
  return (
    <section className="container grid-gap mt-[244px] grid grid-cols-12 2xl:mt-[140px] lg:mt-32 md:mt-[90px] xs:mt-[74px]">
      <h2 className="col-span-12 col-start-1 max-w-[1219px] place-self-center text-center font-title text-88 font-semibold leading-none lg:text-68 md:col-start-1 md:col-end-13 md:text-54 sm:text-48 xs:leading-95">
        <span className="-ml-2.5">Change, Query, Secure, Govern </span>
        <mark className="whitespace-nowrap bg-transparent text-center text-primary-1">
          all databases
        </mark>{' '}
        in a single place
      </h2>
      <div className="col-span-12 mt-[68px] 2xl:mt-14 md:mt-9 xs:mt-5">
        <Image src="/images/scheme-lg.png" width={1472} height={650} alt="" className="sm:hidden" />
        <Image
          src="/images/scheme-mobile.png"
          width={1472}
          height={650}
          alt=""
          className="hidden sm:block"
        />
      </div>
    </section>
  );
};

export default Databases;
