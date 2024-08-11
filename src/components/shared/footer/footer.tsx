import Link from '@/components/shared/link';

import { MENU } from '@/lib/menus';
import Route from '@/lib/route';

import DiscordIcon from '@/svgs/discord.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';
import TwitterIcon from '@/svgs/twitter.inline.svg';
import LinkedInIcon from '@/svgs/linkedin.inline.svg';
import YoutubeIcon from '@/svgs/youtube.inline.svg';
import LocaleSwitcher from '@/components/locale-switcher';

const socialLinks = [
  {
    name: 'Github',
    href: Route.GITHUB,
    icon: GithubIcon,
  },
  {
    name: 'Discord',
    href: Route.DISCORD,
    icon: DiscordIcon,
  },
  {
    name: 'Twitter',
    href: Route.TWITTER,
    icon: TwitterIcon,
  },
  {
    name: 'Youtube',
    href: Route.YOUTUBE,
    icon: YoutubeIcon,
  },
  {
    name: 'LinkedIn',
    href: Route.LINKEDIN,
    icon: LinkedInIcon,
  },
];

const Footer = () => {
  const registration = () => {
    return process.env.NEXT_PUBLIC_DEFAULT_SITE_URL?.includes('bytebase.cc')
      ? '沪ICP备2024059253号'
      : '';
  };

  return (
    <footer className="safe-paddings container relative z-10 shrink-0 pt-20 lg:pt-14 md:pt-12 xs:pt-10">
      <div className="grid grid-cols-10 gap-x-10 xl:gap-x-9 lg:gap-x-6 md:gap-x-7 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:gap-y-14">
        {MENU.footer.map(({ name, items }, idx) => (
          <div className="col-span-2" key={idx}>
            <h3 className="text-14 font-bold leading-none tracking-wider text-gray-60">{name}</h3>
            <ul className="mt-7 flex flex-col gap-[18px]">
              {items.map(({ name: childName, linkUrl }, childIdx) => (
                <li className="leading-none" key={childIdx}>
                  <Link
                    className="group flex items-center font-medium !leading-snug tracking-tight md:-mt-1 sm:mt-0"
                    size="md"
                    theme="gray"
                    href={linkUrl}
                  >
                    <span>{childName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-[76px] grid grid-cols-12 gap-x-4 border-t-4 border-tones-purple-light py-6 lg:mt-[58px] lg:gap-x-6 md:mt-11 md:grid-rows-2 md:gap-x-5 md:gap-y-6 md:py-5 xs:mt-[34px] xs:grid-rows-4 xs:gap-x-0">
        <div className="col-span-4 flex items-center gap-x-4 xl:col-span-5 lg:col-span-6 md:row-span-2 md:flex-col md:items-start md:justify-center md:gap-x-0 md:gap-y-6 xs:col-span-full xs:row-span-1">
          <Link className="shrink-0" href="/">
            <span className="sr-only">Bytebase Logo</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-8 w-[150px] xl:h-7 xl:w-[132px]"
              src="/images/logo.svg"
              alt="Bytebase logo"
              width={150}
              height={32}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="col-span-2 col-start-7 flex items-center gap-x-4 lg:justify-self-end md:col-span-3 md:col-start-10 md:row-span-1 md:row-start-1 xs:col-span-full xs:col-start-1 xs:row-start-2 xs:-mt-1 xs:justify-self-start">
          {socialLinks.map(({ name, href, icon: Icon }, idx) => (
            <Link
              className="flex items-center justify-center rounded-full"
              key={idx}
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sr-only">{name}</span>
              <Icon
                width={24}
                height={24}
                className="shrink-0 transition-opacity duration-200 hover:opacity-80"
              />
            </Link>
          ))}
        </div>
        <div className="col-span-1 col-start-12 flex flex-row items-center justify-end gap-x-4 lg:gap-x-6 md:col-span-3 md:col-start-10 md:row-start-2 md:justify-self-end xs:col-start-1 xs:row-start-3 xs:justify-self-start">
          <p className="whitespace-nowrap text-14 font-medium leading-none tracking-tight text-gray-60 xs:hidden">
            © {new Date().getFullYear()} Bytebase. All Rights Reserved. {registration()}
          </p>
        </div>
        <p className="hidden whitespace-nowrap text-14 font-medium leading-none tracking-tight text-gray-60 xs:col-span-full xs:row-span-1 xs:row-start-4 xs:block">
          © {new Date().getFullYear()} Bytebase. All Rights Reserved. {registration()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
