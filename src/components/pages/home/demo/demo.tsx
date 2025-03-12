import { Arcade } from '@/components/arcade';

const Demo = () => {
  return (
    <section className="pt-20 2xl:pt-16 xl:pt-12 md:pt-8 sm:pt-4">
      <div className="container mb-16 flex w-full flex-col items-center space-y-20 2xl:space-y-16 xl:space-y-12 md:space-y-8 sm:space-y-4">
        <h2 className="max-w-3xl text-center font-title text-72 font-semibold leading-none xl:max-w-2xl xl:text-56 md:max-w-lg md:text-48 sm:text-40">
          Interactive Demo👇
        </h2>
        <Arcade />
      </div>
    </section>
  );
};

export default Demo;
