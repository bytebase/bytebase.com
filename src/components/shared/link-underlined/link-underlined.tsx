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
        'group/link relative block w-fit text-16 font-bold uppercase leading-none tracking-wide text-black transition-colors duration-200 hover:text-primary-1 active:border-transparent active:text-primary-1 md:text-13',
        linkClassName,
      )}
    >
      {children}
      <span className="absolute -bottom-1.5 left-0 h-[3px] w-full rounded-full bg-secondary-2 transition-colors duration-200 group-hover/link:bg-transparent" />
    </Link>
  );
};

export { LinkUnderlined };
