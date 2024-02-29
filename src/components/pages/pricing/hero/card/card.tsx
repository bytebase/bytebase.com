import Image from 'next/image';

import clsx from 'clsx';

import { COLORS } from '@/components/pages/pricing/table/data/pricing-plans';
import Button from '@/components/shared/button';
import { EVENTS } from '@/lib/events';

type CardProps = {
  planTitle: keyof typeof COLORS;
  image: string;
  price: string | number;
  description: string;
  buttonText: string;
  buttonTheme: 'primary-filled' | 'primary-outline';
  buttonLink: string;
  planConditions: Array<string>;
  priceDescription?: string;
  additionalDescription?: string;
};

const Card = ({
  planTitle,
  image,
  price,
  priceDescription,
  description,
  additionalDescription,
  buttonText,
  buttonLink,
  buttonTheme,
  planConditions,
}: CardProps) => {
  const planColor = COLORS[planTitle];
  const eventProp = {
    value: planTitle,
    position: 'hero',
  };
  return (
    <article
      className="relative flex h-full flex-col items-center border border-t-8 border-gray-70 bg-white px-6 pb-10 pt-3.5 shadow-pricing lg:px-5 md:px-4.5 md:pb-9 md:pt-2.5 sm:px-6 sm:pt-4"
      style={{ borderTopColor: planColor }}
    >
      <div
        className={clsx(
          'flex min-h-[548px] w-full flex-col items-center xl:min-h-[588px] lg:min-h-[525px] md:min-h-[462px] sm:min-h-0 sm:items-start',
          additionalDescription ? 'sm:pb-4' : 'sm:pb-6',
        )}
      >
        <h2
          className="self-start text-16 font-bold uppercase leading-none tracking-wide"
          style={{ color: planColor }}
        >
          {planTitle}
        </h2>
        <Image
          src={image}
          width={240}
          height={240}
          alt=""
          className="mt-3 lg:w-[220px] md:w-[180px] sm:absolute sm:right-4 sm:top-0 xs:w-[140px]"
          priority
        />
        <span
          className={clsx(
            'relative mt-4 font-title text-104 font-semibold leading-none tracking-tighter text-gray-15 lg:text-72 lg:tracking-normal md:mt-3 md:text-56',
            { 'text-primary-1 lg:-ml-11 sm:ml-0': planTitle.toLowerCase() === 'enterprise' },
          )}
        >
          {typeof price === 'number' ? `$${price}` : price}
          {priceDescription && (
            <span
              className="absolute -right-[76px] top-4 max-w-[64px] font-sans text-15 font-normal leading-none tracking-normal text-gray-15 lg:-right-[72px] md:top-2 md:text-14"
              dangerouslySetInnerHTML={{ __html: priceDescription }}
            />
          )}
        </span>
        <p
          className="mt-2 text-center text-18 leading-normal text-gray-30 xl:mt-3.5 xl:min-h-[48px] xl:leading-snug md:mt-1.5 md:text-16 sm:mt-4 sm:max-w-full sm:text-left sm:leading-normal 2xs:max-w-[180px]"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <Button
          className="mt-5 w-full sm:z-10 sm:mt-7 sm:w-auto 2xs:w-full"
          size="lg"
          theme={buttonTheme}
          href={buttonLink}
          event={EVENTS.PLAN_CLICK}
          eventProp={eventProp}
        >
          {buttonText}
        </Button>
        {additionalDescription && (
          <p
            className="with-medium-text mx-auto mt-3 text-center text-14 leading-tight tracking-tight text-gray-40 md:mt-4 md:max-w-[150px] md:leading-snug sm:mt-3 sm:max-w-full sm:leading-tight"
            dangerouslySetInnerHTML={{ __html: additionalDescription }}
          />
        )}
      </div>
      <footer className="w-full border-t border-gray-70 pt-6 md:pt-5 sm:pt-7">
        <ul className="flex flex-col gap-y-4">
          {planConditions.map((condition, index) => (
            <li className="flex items-center gap-x-2 lg:items-start" key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-5 w-5 shrink-0" src="/images/check.svg" alt="" loading="lazy" />
              <span className="text-left text-15 leading-none text-gray-15 lg:leading-normal md:text-14 md:leading-snug 2xs:max-w-[220px]">
                {condition}
              </span>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
};

export default Card;
