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
          className="absolute -top-7 -left-9 lg:w-[58px] lg:h-[42px] lg:-top-4.5 lg:-left-6 sm:w-16 sm:h-[46px]"
        />
      )}
      <Image
        className={clsx({
          'shadow-[0px_5px_15px_0px_rgba(156,186,201,0.5)] w-full':
            cover === '/images/change-database.png',
          'shadow-[0px_5px_15px_0px_rgba(143,188,169,0.4)] w-full':
            cover === '/images/query-data.png',
          'shadow-[0px_5px_15px_0px_rgba(210,172,210,0.4)] w-full':
            cover === '/images/secure-access.png',
        })}
        src={cover}
        width={464}
        height={600}
        alt=""
      />
      <h3 className="mt-8 lg:mt-6 md:mt-5 text-36 lg:text-32 md:text-30 font-bold leading-extra-tight tracking-tighter lg:tracking-normal">
        {title}
      </h3>
      <p className="mt-4 lg:mt-3 md:mt-1.5 text-20 lg:text-18 md:text-16 leading-normal lg:leading-snug max-w-[75%] 2xl:max-w-none">
        {description}
      </p>
      <LinkUnderlined to={href} className="mt-6 lg:mt-5 md:mt-3">
        Learn more
      </LinkUnderlined>
    </article>
  );
};

export default Card;
