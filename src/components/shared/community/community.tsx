import Image from 'next/image';

import Cards from './components';

const Community = () => {
  return (
    <section className="mt-[160px] 2xl:mt-36 lg:mt-32 md:mt-24 sm:mt-[75px] pb-[80px] container">
      <header className="flex 2xl:justify-between sm:flex-col">
        <div className="mt-[104px] 2xl:mt-[98px] lg:mt-[60px] md:mt-12 sm:mt-0 flex flex-col max-w-[630px] 2xl:max-w-[575px] md:max-w-[456px] ">
          <div className="font-title font-semibold leading-none lg:leading-95 text-112 lg:text-90 md:text-80 sm:text-56">
            <span className="flex items-center ">
              <mark className="bg-transparent text-primary-1 flex items-center">
                <span>Join</span>
              </mark>
              <img
                src="/images/plus-icon.svg"
                alt=""
                className="w-20 h-20 lg:h-[62px] lg:w-[62px] md:w-[55px] md:h-[55px] sm:h-[39px] sm:w-[39px] ml-1.5 mr-[6px] mt-3.5 lg:mt-1 md:mt-1 sm:mt-2 sm:mx-1"
              />
              <span>the</span>
            </span>
            <p>community</p>
          </div>
          <p className="mt-9 lg:mt-5 md:mt-3.5 text-20 lg:text-18 md:text-16 leading-normal lg:leading-snug self-start">
            At Bytebase, we believe in the power of collaboration and open communication, and we
            have a number of communities that you can join to connect with other like-minded.
          </p>
        </div>
        <div className="ml-[126px] 2xl:ml-0 lg:ml-16 md:ml-5 sm:ml-0 shrink-0 sm:self-center sm:mt-2.5">
          <Image
            src="/images/welcome.png"
            width={591}
            height={613}
            alt=""
            objectFit="contain"
            className="lg:h-[415px] lg:w-[400px] md:h-[357px] md:w-[346px] sm:w-[328px] sm:h-auto"
          />
        </div>
      </header>
      <Cards />
    </section>
  );
};

export { Community };
