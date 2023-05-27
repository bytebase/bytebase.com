import Link from '@/components/shared/link';

import { MENUS } from '@/lib/menus';
import Route from '@/lib/route';

import DiscordIcon from '@/svgs/discord.inline.svg';
import ExternalIcon from '@/svgs/external.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';
import TwitterIcon from '@/svgs/twitter.inline.svg';

const socialLinks = [
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
    name: 'Github',
    href: Route.GITHUB,
    icon: GithubIcon,
  },
];

const Footer = () => (
  <footer className="safe-paddings container relative z-10 shrink-0 pt-20 lg:pt-14 md:pt-12 xs:pt-10">
    <div className="grid grid-cols-12 gap-x-10 xl:gap-x-9 lg:gap-x-6 md:gap-x-5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-10">
      {MENUS.footer.map(({ name, items }, idx) => (
        <div
          className="col-span-3 md:last:col-span-2 md:last:col-start-11 md:last:justify-self-center sm:col-span-2 sm:!justify-self-start sm:last:col-start-3 md:[&:nth-child(3)]:justify-self-center"
          key={idx}
        >
          <h3 className="text-14 font-bold leading-none tracking-wider text-gray-60">{name}</h3>
          <ul className="mt-7 flex flex-col gap-6">
            {items.map(({ name: childName, linkUrl, isExternal, withGithubIcon }, childIdx) => (
              <li className="leading-none" key={childIdx}>
                <Link
                  className="group flex items-center font-medium tracking-tight md:-mt-1 sm:mt-0"
                  size="md"
                  theme="gray"
                  href={linkUrl}
                  target={isExternal ? 'blank' : undefined}
                >
                  <span>{childName}</span>
                  {withGithubIcon && (
                    <div className="relative ml-3 w-[20px]">
                      <GithubIcon className="absolute top-0 h-5 w-5 shrink-0 -translate-x-1/4 -translate-y-1/2 fill-gray-15 group-hover:fill-primary-1" />
                    </div>
                  )}
                  {isExternal && (
                    <ExternalIcon className="ml-3 h-4 w-4 shrink-0 stroke-gray-15 group-hover:stroke-primary-1" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-[76px] grid grid-cols-12 gap-x-10 border-t-4 border-tones-purple-light py-6 xl:gap-x-9 lg:mt-[58px] lg:gap-x-6 md:mt-11 md:grid-rows-2 md:gap-x-5 md:gap-y-6 md:py-5 xs:mt-[34px] xs:grid-rows-4  xs:gap-x-0">
      <div className="col-span-4 flex items-center gap-x-9 xl:col-span-5 lg:col-span-6 md:row-span-2 md:flex-col md:items-start md:justify-center md:gap-x-0 md:gap-y-6 xs:col-span-full xs:row-span-1">
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
        <p className="whitespace-nowrap text-16 font-medium leading-none tracking-tight text-gray-60 xs:hidden">
          © {new Date().getFullYear()} Bytebase. All Rights Reserved.
        </p>
      </div>
      <div className="col-span-2 col-start-7 flex items-center gap-x-5 lg:col-span-3 lg:justify-self-end md:col-span-3 md:col-start-10 md:row-span-1 md:row-start-1 xs:col-span-full xs:col-start-1 xs:row-start-2 xs:-mt-1 xs:justify-self-start">
        {socialLinks.map(({ name, href, icon: Icon }, idx) => (
          <Link className="flex items-center justify-center rounded-full" key={idx} href={href}>
            <span className="sr-only">{name}</span>
            <Icon
              width={24}
              height={24}
              className="shrink-0 transition-opacity duration-200 hover:opacity-80"
            />
          </Link>
        ))}
      </div>
      <div className="col-start-10 flex items-center gap-x-8 lg:col-start-11 lg:mt-1 lg:gap-x-6 md:col-span-3 md:col-start-10 md:row-start-2 md:justify-self-end xs:col-start-1 xs:row-start-3 xs:justify-self-start">
        <Link
          className="text-16 font-medium leading-none tracking-tight xs:text-14"
          theme="gray"
          href={Route.TERMS}
        >
          Terms
        </Link>
        <Link
          className="text-16 font-medium leading-none tracking-tight xs:text-14"
          theme="gray"
          href={Route.PRIVACY}
        >
          Policy
        </Link>
      </div>
      <p className="hidden whitespace-nowrap text-14 font-medium leading-none tracking-tight text-gray-60 xs:col-span-full xs:row-span-1 xs:row-start-4 xs:block">
        © {new Date().getFullYear()} Bytebase. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
