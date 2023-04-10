import ExternalIcon from '@/svgs/external.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';

import Link from '@/components/shared/link';

import { MENUS } from '@/lib/menus.js';
import ROUTE from '@/lib/route';

const socialLinks = [
  {
    name: 'Discord',
    href: ROUTE.DISCORD,
    icon: 'images/discord.svg',
  },
  {
    name: 'Twitter',
    href: ROUTE.TWITTER,
    icon: 'images/twitter.svg',
  },

  {
    name: 'Github',
    href: ROUTE.GITHUB,
    icon: 'images/github.svg',
  },
];

const Footer = () => (
  <footer className="pt-20 lg:pt-14 sm:pt-12 xs:pt-10 safe-paddings z-50 shrink-0 container">
    <div className="grid grid-cols-12 gap-x-10 xl:gap-x-9 lg:gap-x-6 md:gap-x-5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-10">
      {MENUS.footer.map(({ name, items }, idx) => (
        <div
          className="col-span-3 md:last:col-start-11 md:last:col-span-2 md:last:justify-self-center md:[&:nth-child(3)]:justify-self-center sm:col-span-2 sm:!justify-self-start sm:last:col-start-3"
          key={idx}
        >
          <h3 className="text-14 font-bold leading-none tracking-wide text-gray-60">{name}</h3>
          <ul className="mt-7 flex flex-col gap-6">
            {items.map(({ name: childName, linkUrl, isExternal, withGithubIcon }, childIdx) => (
              <li className="leading-none" key={childIdx}>
                <Link
                  additionalClassName="group font-medium tracking-tight flex items-center"
                  size="md"
                  theme="gray"
                  to={linkUrl}
                >
                  <span>{childName}</span>
                  {withGithubIcon && (
                    <GithubIcon className="ml-1.5 shrink-0 fill-gray-15 group-hover:fill-primary-1 h-5 w-5" />
                  )}
                  {isExternal && (
                    <ExternalIcon className="ml-3 shrink-0 stroke-gray-15 group-hover:stroke-primary-1 h-4 w-4" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-20 lg:mt-16 grid grid-cols-12 gap-x-10 xl:gap-x-9 lg:gap-x-6 md:gap-x-5 xs:gap-x-0 py-6 border-t-4 border-tones-purple-light md:grid-rows-2 md:gap-y-6 md:py-5 xs:grid-rows-4 md:mt-[50px] xs:mt-[42px]">
      <div className="col-span-4 xl:col-span-5 lg:col-span-6 flex items-center gap-x-9 md:flex-col md:gap-x-0 md:gap-y-6 md:items-start md:justify-center md:row-span-2 xs:row-span-1 xs:col-span-full">
        <Link additionalClassName="shrink-0" to="/">
          <span className="sr-only">Bytebase Logo</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-8 w-[150px] xl:w-[132px] xl:h-7"
            src="/images/logo.svg"
            alt="Bytebase logo"
            width={150}
            height={32}
            loading="eager"
          />
        </Link>
        <p className="whitespace-nowrap text-16 font-medium leading-none tracking-tight text-gray-60 xs:hidden">
          © {new Date().getFullYear()} Bytebase. All Rights Reserved.
        </p>
      </div>
      <div className="col-start-7 col-span-2 lg:col-span-3 lg:justify-self-end flex items-center gap-x-5 md:col-start-10 md:row-start-1 md:row-span-1 md:col-span-3 xs:col-span-full xs:row-start-2 xs:col-start-1 xs:justify-self-start">
        {socialLinks.map(({ name, href, icon }, idx) => (
          <Link
            key={idx}
            to={href}
            additionalClassName="flex items-center justify-center rounded-full"
          >
            <span className="sr-only">{name}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icon}
              className="w-6 h-6 shrink-0 transition-opacity duration-200 hover:opacity-80"
              alt={name}
            />
          </Link>
        ))}
      </div>

      <div className="col-start-10 lg:col-start-11 flex items-center gap-x-8 lg:gap-x-6 md:col-start-10 md:row-start-2 md:col-span-3 md:justify-self-end xs:row-start-3 xs:justify-self-start xs:col-start-1">
        <Link
          additionalClassName="text-16 xs:text-14 font-medium leading-none tracking-tight"
          theme="gray"
          to={ROUTE.TERMS}
        >
          Terms
        </Link>
        <Link
          additionalClassName="text-16 xs:text-14 font-medium leading-none tracking-tight"
          theme="gray"
          to={ROUTE.PRIVACY}
        >
          Policy
        </Link>
      </div>
      <p className="whitespace-nowrap text-14 font-medium leading-none tracking-tight text-gray-60 hidden xs:block xs:row-start-4 xs:row-span-1 xs:col-span-full">
        © {new Date().getFullYear()} Bytebase. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
