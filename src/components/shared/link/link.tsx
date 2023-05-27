/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link';

import clsx from 'clsx';

import ArrowIcon from '@/svgs/arrow.inline.svg';

const styles = {
  transition: 'transition-colors duration-200',
  base: 'inline-flex leading-none items-center',
  size: {
    xs: 'text-14',
    sm: 'text-15',
    md: 'text-16',
    lg: 'text-18',
  },
  theme: {
    gray: 'text-gray-15 hover:text-primary-1 disabled:text-gray-60',
    'gray-30': 'text-gray-30 hover:text-primary-1 disabled:text-gray-60',
    'primary-1':
      'text-primary-1 border-b-2 border-primary-1 border-opacity-40 transition-opacity hover:border-opacity-100 pb-1 sm:pb-px',
    underline:
      'text-gray-60 hover:text-primary-1 border-b-2 border-gray-60 border-opacity-40 transition-opacity hover:border-opacity-100 hover:border-primary-1 pb-1 sm:pb-px',
  },
};

type LinkProps = {
  className?: string;
  href: string;
  size?: keyof typeof styles.size;
  theme?: keyof typeof styles.theme;
  children: React.ReactNode;
  withArrow?: boolean;
  prefetch?: boolean;
  target?: string;
  rel?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const Link = ({
  className: additionalClassName,
  size,
  theme,
  href,
  children,
  withArrow = false,
  ...props
}: LinkProps) => {
  const linkClassName = clsx(
    styles.transition,
    size && theme && styles.base,
    size && styles.size[size],
    theme && styles.theme[theme],
    additionalClassName,
  );

  const content = (
    <>
      {withArrow ? <span>{children}</span> : children}
      {withArrow && <ArrowIcon className={clsx('ml-5 w-4 shrink-0')} />}
    </>
  );

  if (href.startsWith('/')) {
    return (
      <NextLink className={linkClassName} href={href} {...props}>
        {content}
      </NextLink>
    );
  }

  return (
    <a className={linkClassName} href={href} {...props}>
      {content}
    </a>
  );
};

export default Link;
