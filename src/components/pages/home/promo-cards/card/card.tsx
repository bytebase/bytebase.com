'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import clsx from 'clsx';

import { LinkUnderlined } from '@/components/shared/link-underlined';

export type CardProps = {
  color: 'blue' | 'green' | 'red';
  cover: string;
  href: string;
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
};

const Card = forwardRef<HTMLElement, CardProps>(function CardComponent(
  { color, className, cover, title, href, description, style },
  ref,
) {
  return (
    <article className={clsx(className)} style={style} ref={ref}>
      <div className="grid">
        <Image
          className={clsx('h-auto w-full border', {
            'border-tones-blue-dark shadow-blue': color === 'blue',
            'border-tones-green-dark shadow-green': color === 'green',
            'border-tones-pink-dark shadow-red': color === 'red',
          })}
          src={cover}
          width={464}
          height={604}
          alt=""
        />
      </div>
      <div className="mt-8">
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-36 font-bold leading-extra-tight tracking-tighter xl:text-32 md:text-30 sm:text-24">
          {title}
        </h3>
        <p className="mt-4 w-3/4 text-20 leading-normal 3xl:w-full xl:relative xl:mt-3 xl:overflow-hidden xl:text-18 xl:after:absolute xl:after:bottom-0 xl:after:right-0 xl:after:h-[30px] xl:after:w-2/3 xl:after:bg-gradient-to-r xl:after:from-transparent xl:after:to-white lg:max-h-[81px] md:mt-1.5 md:max-h-[72px] md:text-16 sm:h-auto sm:leading-snug sm:after:hidden">
          {description}
        </p>
        <LinkUnderlined href={href} className="mt-6 xl:mt-5 md:mt-3">
          Learn more
        </LinkUnderlined>
      </div>
    </article>
  );
});

export default Card;
