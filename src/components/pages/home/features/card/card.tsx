import { LinkUnderlined } from '@/components/shared/link-underlined';

const Card = ({
  icon,
  title,
  href,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <article>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="h-24 xl:h-[88px] lg:w-[88px] md:h-[60px] md:w-[60px]"
        src={icon}
        alt=""
        width={96}
        height={96}
        loading="lazy"
      />
      <h3 className="mt-5 font-title text-56 font-semibold leading-none 2xl:mt-4 lg:text-44 md:mt-1 md:text-34">
        {title}
      </h3>
      <p className="mt-4 max-w-[449px] text-20 leading-normal 2xl:mt-5 lg:mt-4 lg:text-18 lg:leading-snug md:mt-2 md:text-16 sm:mt-2.5 sm:max-w-xl 2xs:max-w-[296px] ">
        {description}
      </p>
      <LinkUnderlined
        className="mt-6 h-6 lg:mt-5 md:mt-3 md:h-auto sm:mt-2.5 sm:tracking-wide"
        href={href}
      >
        Learn more
      </LinkUnderlined>
    </article>
  );
};

export default Card;
