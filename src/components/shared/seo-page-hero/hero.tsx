type HeroProps = {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  linkTarget?: string;
};

import Button from '@/components/shared/button';
import { LinkUnderlined } from '@/components/shared/link-underlined';
import Integrations from '@/components/shared/integrations';
import Link from '@/components/shared/link';

import Route from '@/lib/route';
import Image from 'next/image';

const Hero = ({ title, description, linkText, linkUrl, linkTarget }: HeroProps) => {
  return (
    <section className="col-span-6 col-start-4 flex flex-col pt-[136px] xl:col-span-8 xl:col-start-3 xl:pt-[120px] md:col-span-full md:pt-24">
      <h1 className="text-left font-title text-90 font-semibold leading-none xl:text-68 md:text-56 sm:text-48">
        {title}
      </h1>
      <p className="font-regular mt-4 text-18 leading-normal xl:text-16 xl:leading-snug lg:mt-3 md:mt-2 md:text-14 md:leading-tight sm:text-14">
        {description}{' '}
        {linkText && (
          <Link theme="primary-1" size="lg" target={linkTarget} href={linkUrl || ''}>
            {linkText}
          </Link>
        )}
      </p>
      <Integrations className="sm:order-2" />
      <div className="mt-11 flex items-center gap-9 2xl:gap-8 xl:mt-10 md:mt-9 md:gap-5 sm:order-1 sm:mt-8">
        <Button
          href={Route.REQUEST_DEMO}
          theme="primary-filled"
          size="lg"
          className="sm:!w-fit sm:!px-6"
        >
          Learn More
        </Button>
        <LinkUnderlined href={Route.LIVE_DEMO}>See Live Demo</LinkUnderlined>
      </div>
      <Image
        src="/images/db-scheme-lg.png"
        width={716}
        height={545}
        alt="Bytebase Database scheme"
        className="mx-auto mt-20 lg:mt-16 md:mt-12 sm:hidden"
      />
      <Image
        className="mx-auto mt-12 hidden sm:order-3 sm:block"
        src="/images/db-scheme.png"
        alt="Bytebase Database scheme"
        width={366}
        height={498}
        loading="lazy"
      />
    </section>
  );
};

export default Hero;
