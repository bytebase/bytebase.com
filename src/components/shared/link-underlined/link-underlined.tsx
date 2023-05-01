import Link from 'next/link';

import { ReactNode } from 'react';

import clsx from 'clsx';

const styles = {
  theme: {
    black: 'text-black',
    white: 'text-white',
  },
};

const LinkUnderlined = ({
  href,
  theme,
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  theme?: keyof typeof styles.theme;
}) => {
  const linkClassName = clsx(className, theme && styles.theme[theme]);

  return (
    <Link
      href={href}
      className={clsx(
        'block w-fit border-b-[3px] border-secondary-2 pb-1 text-16 font-bold uppercase leading-none tracking-wide text-black transition-colors duration-200 hover:border-transparent hover:text-primary-1 active:border-transparent active:text-primary-1 md:text-13',
        linkClassName,
      )}
    >
      {children}
    </Link>
  );
};

export { LinkUnderlined };
