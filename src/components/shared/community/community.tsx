import Image from 'next/image';

import Cards from './components';

const Community = () => {
  return (
    <section className="container mt-[160px] pb-[80px] 2xl:mt-36 lg:mt-32 md:mt-24 sm:mt-[75px]">
      <header className="flex 2xl:justify-between sm:flex-col">
        <div className="mt-[104px] flex max-w-[630px] flex-col 2xl:mt-[98px] 2xl:max-w-[575px] lg:mt-[60px] md:mt-12 md:max-w-[456px] sm:mt-0 ">
          <div className="font-title text-112 font-semibold leading-none lg:text-90 lg:leading-95 md:text-80 sm:text-56">
            <span className="flex items-center ">
              <mark className="flex items-center bg-transparent text-primary-1">
                <span>Join</span>
              </mark>
              <img
                src="/images/plus-icon.svg"
                alt=""
                className="ml-1.5 mr-[6px] mt-3.5 h-20 w-20 lg:mt-1 lg:h-[62px] lg:w-[62px] md:mt-1 md:h-[55px] md:w-[55px] sm:mx-1 sm:mt-2 sm:h-[39px] sm:w-[39px]"
              />
              <span>the</span>
            </span>
            <p>community</p>
          </div>
          <p className="mt-9 self-start text-20 leading-normal lg:mt-5 lg:text-18 lg:leading-snug md:mt-3.5 md:text-16">
            At Bytebase, we believe in the power of collaboration and open communication, and we
            have a number of communities that you can join to connect with other like-minded.
          </p>
        </div>
        <div className="ml-[126px] shrink-0 2xl:ml-0 lg:ml-16 md:ml-5 sm:ml-0 sm:mt-2.5 sm:self-center">
          <Image
            src="/images/welcome.png"
            width={591}
            height={613}
            alt=""
            objectFit="contain"
            className="lg:h-[415px] lg:w-[400px] md:h-[357px] md:w-[346px] sm:h-auto sm:w-[328px]"
          />
        </div>
      </header>
      <Cards />
    </section>
  );
};

export { Community };
