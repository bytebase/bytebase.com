import clsx from 'clsx';

const themes = {
  'primary-1': {
    color: 'text-white',
    bg: 'bg-primary-1',
  },
  'secondary-1': {
    color: 'text-gray-15',
    bg: 'bg-secondary-1',
  },
};

type PillProps = {
  children: React.ReactNode;
  theme: keyof typeof themes;
  className?: string;
};

const Pill = ({ children, theme, className }: PillProps) => (
  <div
    className={clsx(
      'w-fit rounded-[20px] py-2 px-2.5 text-12 font-bold uppercase leading-none tracking-wider',
      themes[theme].color,
      themes[theme].bg,
      className,
    )}
  >
    {children}
  </div>
);

export default Pill;
