import Link from '@/components/shared/link';

import LinkedinIcon from '@/svgs/linkedin.inline.svg';
import TwitterIcon from '@/svgs/twitter.inline.svg';
import clsx from 'clsx';

const icons = {
  twitter: {
    Icon: TwitterIcon,
    className: 'text-secondary-3',
  },
  linkedIn: {
    Icon: LinkedinIcon,
    className: 'text-[#0077b5]',
  },
};

export type SocialLink = {
  network: keyof typeof icons;
  url: string;
};

type SocialLinksProps = {
  items: SocialLink[];
};

const SocialLinks = ({ items }: SocialLinksProps) => {
  if (!items) return null;

  return (
    <ul className="mt-4 flex gap-x-2">
      {items.map(({ network, url }) => {
        const { Icon, className } = icons[network];
        return (
          <li key={network}>
            <Link
              className={clsx(className, 'grayscale hover:grayscale-0')}
              href={url}
              aria-label={`Author on ${network}`}
            >
              <Icon className="h-[26px] w-[26px]" role="presentation" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
