import Image from 'next/image';

const Databases = () => {
  return (
    <section className="mt-[244px] 2xl:mt-[140px] lg:mt-32 md:mt-[90px] xs:mt-[74px] container grid grid-cols-12 grid-gap">
      <h2 className="col-span-12 place-self-center col-start-1 max-w-[1219px] md:col-start-1 md:col-end-13 font-title font-semibold leading-none xs:leading-95 text-88 lg:text-68 md:text-54 sm:text-48 text-center">
        <span className="-ml-2.5">Change, Query, Secure, Govern </span>
        <mark className="bg-transparent text-primary-1 whitespace-nowrap text-center">
          all databases
        </mark>{' '}
        in a single place
      </h2>
      <div className="mt-[68px] 2xl:mt-14 md:mt-9 xs:mt-5 col-span-12">
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
