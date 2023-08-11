import Link from '@/components/shared/link';

import TwitterIcon from '@/svgs/twitter.inline.svg';
import LinkedinIcon from '@/svgs/linkedin.inline.svg';
import HackerNewsIcon from '@/svgs/hackernews.inline.svg';
import clsx from 'clsx';

const icons = {
  twitter: {
    Icon: TwitterIcon,
    className: 'text-secondary-3',
    iconClassName: 'h-6 w-6',
    getShareUrl: (text: string, url: string) => {
      return `https://twitter.com/share?text=${text}&url=${url}`;
    },
  },
  linkedIn: {
    Icon: LinkedinIcon,
    className: 'text-secondary-3',
    iconClassName: 'h-6 w-6',
    getShareUrl: (text: string, url: string) => {
      return `https://www.linkedin.com/shareArticle?url=${url}&title=${text}`;
    },
  },
  hackerNews: {
    Icon: HackerNewsIcon,
    className: 'text-secondary-3',
    iconClassName: 'h-5 w-5',
    getShareUrl: (text: string, url: string) => {
      return `https://news.ycombinator.com/submitlink?u=${url}&t=${text}`;
    },
  },
};

export type SocialLink = {
  network: keyof typeof icons;
  text?: string;
  url?: string;
};

type SocialLinksProps = {
  items: SocialLink[];
};

const SocialLinks = ({ items }: SocialLinksProps) => {
  if (!items) return null;

  return (
    <ul className="mt-2 flex gap-x-3">
      {items.map(({ network, text, url }) => {
        const { Icon, className, iconClassName, getShareUrl } = icons[network];
        // If no url is provided, generate one from the text and current url.
        const shareUrl = url || getShareUrl(text || document.title, url || location.href);
        return (
          <li key={network} className="flex items-center justify-center ">
            <Link
              className={clsx(className, 'grayscale hover:grayscale-0')}
              href={shareUrl}
              target="_blank"
            >
              <Icon className={clsx(iconClassName)} role="presentation" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
