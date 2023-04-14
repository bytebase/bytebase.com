import { LinkUnderlined } from '@/components/shared/link-underlined';

interface CardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
}

const Card = ({ icon, title, href, description }: CardProps) => {
  return (
    <article className="">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        width={96}
        height={96}
        className="h-[96px] xl:h-[88px] lg:w-[88px] md:h-[60px] md:w-[60px]"
      />
      <h3 className="mt-5 2xl:mt-4 md:mt-1 leading-none text-56 lg:text-44 md:text-34 font-title font-semibold">
        {title}
      </h3>
      <p className="mt-4 2xl:mt-5 lg:mt-4 md:mt-2 sm:mt-2.5 text-20 lg:text-18 md:text-16 leading-normal lg:leading-snug sm:max-w-[296px] max-w-[449px] ">
        {description}
      </p>
      <LinkUnderlined className="mt-6 lg:mt-5 md:mt-3 sm:mt-2.5 h-6 sm:tracking-wide" to={href}>
        Learn more
      </LinkUnderlined>
    </article>
  );
};

export default Card;
