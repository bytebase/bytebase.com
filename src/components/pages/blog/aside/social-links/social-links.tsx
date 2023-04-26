import Link from '@/components/shared/link';

import LinkedinIcon from '@/svgs/linkedin.inline.svg';
import TwitterIcon from '@/svgs/twitter.inline.svg';

const icons = {
  twitter: {
    Icon: TwitterIcon,
    className: 'text-secondary-3 hover:text-primary-1',
  },
  // TODO: hover state for linkedin
  linkedIn: {
    Icon: LinkedinIcon,
    className: '',
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
            <Link className={className} href={url}>
              <Icon className="h-[26px] w-[26px]" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
