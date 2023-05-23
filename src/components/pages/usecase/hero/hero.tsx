type HeroProps = {
  title: string;
  description: string;
};

import Button from '@/components/shared/button';
import { LinkUnderlined } from '@/components/shared/link-underlined';
import Logos from '@/components/shared/logos';

import Route from '@/lib/route';
import Image from 'next/image';

const Hero = ({ title, description }: HeroProps) => {
  return (
    <section className="col-span-6 col-start-4 pt-[136px] xl:col-span-8 xl:col-start-3 xl:pt-[120px] md:col-span-full md:pt-24">
      <h1 className="text-left font-title text-90 font-semibold leading-none xl:text-68 md:text-56 sm:text-48">
        {title}
      </h1>
      <p className="font-regular mt-4 text-18 leading-normal xl:text-16 xl:leading-snug md:text-14 md:leading-tight sm:text-14">
        {description}
      </p>
      <Logos />
      <div className="mt-11 flex items-center gap-9 2xl:gap-8 xl:mt-10 xl:gap-6 md:mt-7 sm:mt-6 sm:gap-3.5">
        <Button
          href={Route.REQUEST_DEMO}
          theme="primary-filled"
          size="lg"
          className="sm:!w-fit sm:!px-6"
        >
          Request a Demo
        </Button>
        <LinkUnderlined href={Route.LIVE_DEMO}>See Live Demo</LinkUnderlined>
      </div>
      <Image
        src="/images/page/usecase/db-scheme-lg.png"
        width={716}
        height={545}
        alt="Bytebase Database scheme"
        className="mx-auto mt-20 sm:hidden"
        loading="lazy"
      />
      <Image
        className="mx-auto mt-12 hidden sm:block"
        src="/images/page/main/db-scheme.png"
        alt="Bytebase Database scheme"
        width={366}
        height={498}
        loading="lazy"
      />
    </section>
  );
};

export default Hero;
