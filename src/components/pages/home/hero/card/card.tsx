import Image from 'next/image';

import clsx from 'clsx';

import { LinkUnderlined } from '@/components/shared/link-underlined';

interface CardProps {
  cover: string;
  href: string;
  title: string;
  description: string;
  image?: string;
}

const Card = ({ cover, title, href, description, image }: CardProps) => {
  return (
    <article className="relative">
      {image && (
        <Image
          src={image}
          width={92}
          height={65}
          alt=""
          className="absolute -top-7 -left-9 lg:-top-4.5 lg:-left-6 lg:h-[42px] lg:w-[58px] sm:h-[46px] sm:w-16"
        />
      )}
      <Image
        className={clsx({
          'w-full shadow-[0px_5px_15px_0px_rgba(156,186,201,0.5)]':
            cover === '/images/change-database.png',
          'w-full shadow-[0px_5px_15px_0px_rgba(143,188,169,0.4)]':
            cover === '/images/query-data.png',
          'w-full shadow-[0px_5px_15px_0px_rgba(210,172,210,0.4)]':
            cover === '/images/secure-access.png',
        })}
        src={cover}
        width={464}
        height={600}
        alt=""
      />
      <h3 className="mt-8 text-36 font-bold leading-extra-tight tracking-tighter lg:mt-6 lg:text-32 lg:tracking-normal md:mt-5 md:text-30">
        {title}
      </h3>
      <p className="mt-4 max-w-[75%] text-20 leading-normal 2xl:max-w-none lg:mt-3 lg:text-18 lg:leading-snug md:mt-1.5 md:text-16">
        {description}
      </p>
      <LinkUnderlined href={href} className="mt-6 lg:mt-5 md:mt-3">
        Learn more
      </LinkUnderlined>
    </article>
  );
};

export default Card;
