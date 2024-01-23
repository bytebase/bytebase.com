import { Arcade } from '@/components/arcade';

const Demo = () => {
  return (
    <section className="mt-40 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0)34.28%,rgba(240,242,255,0.5)100%)] py-36 2xl:mt-36 2xl:py-32 xl:mt-32 xl:py-28 md:mt-24 md:py-24 sm:mt-20 sm:py-16">
      <div className="container flex w-full flex-col items-center">
        <Arcade />
      </div>
    </section>
  );
};

export default Demo;
