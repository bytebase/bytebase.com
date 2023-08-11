'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Link from '@/components/shared/link';
import TwitterIcon from '@/svgs/twitter.inline.svg';
import LinkedinIcon from '@/svgs/linkedin.inline.svg';
import HackerNewsIcon from '@/svgs/hackernews.inline.svg';

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
    // Hacknew news's icon is a bit bigger than others. So we need to make it smaller.
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
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    setSocialLinks(
      items.map((item) => {
        return {
          ...item,
          url:
            item.url ||
            icons[item.network].getShareUrl(
              item.text || window.document.title,
              item.url || window.location.href,
            ),
        };
      }),
    );
  }, [items]);

  if (socialLinks.length === 0) return null;

  return (
    <ul className="mt-2 flex gap-x-3">
      {socialLinks.map(({ network, url }) => {
        const { Icon, className, iconClassName } = icons[network];
        return (
          <li key={network} className="flex items-center justify-center ">
            <Link
              className={clsx(className, 'grayscale hover:grayscale-0')}
              href={url || ''}
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
