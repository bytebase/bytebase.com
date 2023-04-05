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
  <footer className="pt-20 xl:pt-14 md:pt-12 sm:pt-10 safe-paddings z-50 shrink-0 container">
    <div className="grid grid-cols-12 gap-x-10 2xl:gap-x-9 xl:gap-x-6 lg:gap-x-5 md:grid-cols-4 md:gap-x-4 md:gap-y-10">
      {MENUS.footer.map(({ name, items }, idx) => (
        <div
          className="col-span-3 lg:last:col-start-11 lg:last:col-span-2 lg:last:justify-self-center lg:[&:nth-child(3)]:justify-self-center md:col-span-2 md:!justify-self-start md:last:col-start-3"
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
    <div className="mt-20 xl:mt-16 grid grid-cols-12 gap-x-10 2xl:gap-x-9 xl:gap-x-6 lg:gap-x-5 sm:gap-x-0 py-6 border-t-4 border-tones-purple-light lg:grid-rows-2 lg:gap-y-6 lg:py-5 sm:grid-rows-4 lg:mt-[50px] sm:mt-[42px]">
      <div className="col-span-4 2xl:col-span-5 xl:col-span-6 flex items-center gap-x-9 lg:flex-col lg:gap-x-0 lg:gap-y-6 lg:items-start lg:justify-center lg:row-span-2 sm:row-span-1 sm:col-span-full">
        <Link additionalClassName="shrink-0" to="/">
          <span className="sr-only">Bytebase Logo</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-8 w-[150px] 2xl:w-[132px] 2xl:h-7"
            src="/images/logo.svg"
            alt="Bytebase logo"
            width={150}
            height={32}
            loading="eager"
          />
        </Link>
        <p className="whitespace-nowrap text-16 font-medium leading-none tracking-tight text-gray-60 sm:hidden">
          © {new Date().getFullYear()} Bytebase. All Rights Reserved.
        </p>
      </div>
      <div className="col-start-7 col-span-2 xl:col-span-3 xl:justify-self-end flex items-center gap-x-5 lg:col-start-10 lg:row-start-1 lg:row-span-1 lg:col-span-3 sm:col-span-full sm:row-start-2 sm:col-start-1 sm:justify-self-start">
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

      <div className="col-start-10 xl:col-start-11 flex items-center gap-x-8 xl:gap-x-6 lg:col-start-10 lg:row-start-2 lg:col-span-3 lg:justify-self-end sm:row-start-3 sm:justify-self-start sm:col-start-1">
        <Link
          additionalClassName="text-16 sm:text-14 font-medium leading-none tracking-tight"
          theme="gray"
          to={ROUTE.TERMS}
        >
          Terms
        </Link>
        <Link
          additionalClassName="text-16 sm:text-14 font-medium leading-none tracking-tight"
          theme="gray"
          to={ROUTE.PRIVACY}
        >
          Policy
        </Link>
      </div>
      <p className="whitespace-nowrap text-14 font-medium leading-none tracking-tight text-gray-60 hidden sm:block sm:row-start-4 sm:row-span-1 sm:col-span-full">
        © {new Date().getFullYear()} Bytebase. All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
