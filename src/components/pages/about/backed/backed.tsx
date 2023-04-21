import Image from 'next/image';

const Backed = () => (
  <section className="container gap-x-grid mt-40 grid grid-cols-12 sm:grid-cols-4">
    <span className="col-span-12 block w-fit justify-self-center rounded-[20px] bg-secondary-1 py-2 px-2.5 text-12 font-bold uppercase leading-none tracking-wider">
      Our Partners
    </span>
    <h2 className="col-span-12 mt-5 justify-self-center font-title text-88 font-semibold leading-none">
      Backed by the best
    </h2>
    <div className="col-span-6 row-start-3 mt-14 grid place-items-center border border-gray-90 bg-gray-97 py-[91px]">
      <Image
        src="/images/page/about/matrix-logo.svg"
        alt="Matrix Partners"
        width={353}
        height={142}
      />
    </div>
    <div className="col-span-6 row-start-3 mt-14 flex items-center border border-gray-90">
      <Image
        src="/images/page/about/cto.webp"
        alt=""
        width={308}
        height={306}
        className="self-start"
      />
      <div>
        <p className="text-18 font-semibold leading-normal text-primary-1">
          Co-Founder & CTO - PingCAP
        </p>
        <p className="mt-2 font-title text-56 font-semibold leading-none">Dongxu Huang</p>
      </div>
    </div>
  </section>
);

export default Backed;
