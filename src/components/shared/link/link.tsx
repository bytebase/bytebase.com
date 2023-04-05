/* eslint-disable jsx-a11y/anchor-is-valid */
import NextLink from 'next/link';

import ArrowIcon from '@/svgs/arrow.inline.svg';
import clsx from 'clsx';

const styles = {
  transition: 'transition-colors duration-200',
  base: 'inline-flex leading-none items-center',
  size: {
    md: 'text-16',
  },
  theme: {
    gray: 'text-gray-15 hover:text-primary-1 disabled:text-gray-60',
  },
};

type LinkProps = {
  additionalClassName?: string;
  to: string;
  size?: keyof typeof styles.size;
  theme?: keyof typeof styles.theme;
  children: React.ReactNode;
  withArrow?: boolean;
  target?: string;
  rel?: string;
};

const Link = ({
  additionalClassName,
  size,
  theme,
  to,
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

  if (to.startsWith('/')) {
    return (
      <NextLink className={linkClassName} href={to} {...props}>
        {content}
      </NextLink>
    );
  }

  return (
    <a className={linkClassName} href={to} {...props}>
      {content}
    </a>
  );
};

export default Link;
