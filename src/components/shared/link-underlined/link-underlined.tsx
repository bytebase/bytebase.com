import Link from 'next/link';

import { ReactNode } from 'react';

import clsx from 'clsx';

const styles = {
  theme: {
    black: 'text-black',
    white: 'text-white',
  },
};

interface LinkProps {
  children: ReactNode;
  className?: string;
  to: string;
  theme?: keyof typeof styles.theme;
}

const LinkUnderlined = ({ to, theme, children, className }: LinkProps) => {
  const linkClassName = clsx(className, theme && styles.theme[theme]);

  return (
    <Link href={to} className="py-2">
      <div
        className={clsx(
          'pb-1 w-fit border-b-[3px] leading-4 tracking-[1%] border-secondary-2 text-16 md:text-13 font-bold uppercase',
          linkClassName,
        )}
      >
        {children}
      </div>
    </Link>
  );
};

export { LinkUnderlined };
