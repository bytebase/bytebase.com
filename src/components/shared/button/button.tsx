import clsx from 'clsx';

import Link from '@/components/shared/link';

import ArrowIcon from '@/svgs/arrow.inline.svg';

const styles = {
  base: 'inline-flex items-center justify-center leading-none text-center whitespace-nowrap rounded transition-colors duration-200 outline-none',
  size: {
    sm: 'h-9 text-13 font-bold py-3 px-4.5 uppercase',
    md: 'h-12 text-13 font-bold py-4.5 px-6 2xs:w-full uppercase',
    lg: 'h-16 text-16 font-bold py-[21px] px-9 2xs:w-full uppercase md:py-4.5 md:text-13 md:h-12',
  },
  theme: {
    'primary-filled':
      'text-white bg-primary-1 hover:bg-primary-2 disabled:tones-purple-dark tracking-wide rounded-full',
    'primary-outline':
      'text-black border-[3px] border-primary-1 hover:border-gray-15 disabled:text-gray-60 disabled:border-tones-purple-dark rounded-full tracking-wide',
    'gray-filled':
      'bg-gray-15 text-white hover:bg-gray-40 disabled:bg-gray-80 tracking-wide rounded-full',
  },
};

type ButtonProps = {
  className?: string;
  href: string;
  size?: keyof typeof styles.size;
  theme?: keyof typeof styles.theme;
  children: React.ReactNode;
  withArrow?: boolean;
  target?: string;
  rel?: string;
};

const Button = ({
  className: additionalClassName,
  size,
  theme,
  href,
  children,
  withArrow = false,
  ...props
}: ButtonProps) => {
  const className = clsx(
    styles.base,
    size && styles.size[size],
    theme && styles.theme[theme],
    additionalClassName,
  );

  const Tag = href ? Link : 'button';

  const content = (
    <>
      {withArrow ? <span>{children}</span> : children}
      {withArrow && <ArrowIcon className={clsx('ml-5 w-4 shrink-0')} />}
    </>
  );

  return (
    <Tag className={className} href={href} {...props}>
      {content}
    </Tag>
  );
};

export default Button;
