import Image from 'next/image';

import Form from '@/components/shared/subscription/form';

const SubscribeCta = () => {
  return (
    <section className="mt-[90px] bg-primary-1 xl:mt-[53px] md:mt-11 sm:mt-[50px]">
      <div className="container gap-x-grid relative grid grid-cols-12 items-center py-[37px] xl:pt-9 xl:pb-[30px] md:py-8 sm:grid-cols-4 sm:pt-7">
        <Image
          className="absolute left-12 bottom-0 max-w-[16.5%] 2xl:left-12 xl:left-3 lg:-top-1 lg:bottom-auto lg:w-[17.7%] lg:max-w-[200px] md:left-1.5 md:w-auto md:max-w-[189px] sm:hidden"
          src="/images/form-image-lg.png"
          alt=""
          width={252}
          height={212}
        />
        <Image
          className="absolute right-0 -top-5 hidden sm:block 2xs:-top-1.5"
          src="/images/form-image-sm.png"
          alt=""
          width={127}
          height={132}
        />
        <h2 className="col-span-4 col-start-3 ml-4 font-title text-52 leading-none text-white 2xl:ml-[22px] 2xl:w-[calc(100%+22px)] xl:col-span-5 xl:col-start-3 xl:w-full xl:text-44 lg:ml-0 md:pl-11 md:text-38 sm:col-span-3 sm:col-start-1 sm:pl-0 sm:text-34">
          Learn product updates and database&nbsp;insight.
        </h2>
        <div className="col-span-6 2xl:pl-12 xl:col-span-5 xl:pl-0 sm:col-span-full sm:mt-5">
          <Form />
        </div>
      </div>
    </section>
  );
};

export default SubscribeCta;
