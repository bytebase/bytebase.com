import { BsGithub, BsDiscord, BsTwitterX, BsYoutube, BsLinkedin } from 'react-icons/bs';

import Link from '@/components/shared/link';

import Route from '@/lib/route';

const FOOTER_MENU = [
  {
    name: 'COMPARISONS',
    items: [
      { name: 'vs. Liquibase', linkUrl: Route.VS_LIQUIBASE },
      { name: 'vs. Flyway', linkUrl: Route.VS_FLYWAY },
      { name: 'vs. DataGrip', linkUrl: Route.VS_DATAGRIP },
      { name: 'vs. DBeaver', linkUrl: Route.VS_DBEAVER },
      { name: 'vs. CloudBeaver', linkUrl: Route.VS_CLOUDBEAVER },
      { name: 'vs. Navicat', linkUrl: Route.VS_NAVICAT },
      { name: 'vs. Metabase', linkUrl: Route.VS_METABASE },
      { name: 'vs. schemachange', linkUrl: Route.VS_SCHEMACHANGE },
      { name: 'vs. Jira', linkUrl: Route.VS_JIRA },
    ],
  },
  {
    name: 'PRODUCT',
    items: [
      { name: 'Pricing', linkUrl: Route.PRICING },
      { name: 'Changelog', linkUrl: Route.CHANGELOG },
      { name: 'Documentation', linkUrl: Route.DOCS },
      { name: 'API', linkUrl: Route.DOCS_API },
      { name: 'Supported Databases', linkUrl: Route.DOCS_SUPPORTED_DB },
      { name: 'Security', linkUrl: Route.SECURITY },
    ],
  },
  {
    name: 'RESOURCES',
    items: [
      { name: 'Resources', linkUrl: Route.RESOURCES },
      { name: 'Terms', linkUrl: Route.TERMS },
      { name: 'Policy', linkUrl: Route.PRIVACY },
      { name: 'Partners', linkUrl: Route.PARTNER },
    ],
  },
  {
    name: 'COMPANY',
    items: [
      { name: 'About', linkUrl: Route.ABOUT },
      { name: 'Brand', linkUrl: Route.BRAND },
      { name: 'Contact', linkUrl: Route.CONTACTS },
    ],
  },
];

const socialLinks = [
  {
    name: 'Github',
    href: Route.GITHUB,
    icon: BsGithub,
  },
  {
    name: 'Discord',
    href: Route.DISCORD,
    icon: BsDiscord,
  },
  {
    name: 'Twitter',
    href: Route.X,
    icon: BsTwitterX,
  },
  {
    name: 'Youtube',
    href: Route.YOUTUBE,
    icon: BsYoutube,
  },
  {
    name: 'LinkedIn',
    href: Route.LINKEDIN,
    icon: BsLinkedin,
  },
];

const Footer = () => {
  return (
    <footer className="safe-paddings container relative z-10 shrink-0 pb-10 pt-24 lg:pt-16 md:pt-14 xs:pt-12">
      <div className="grid grid-cols-10 gap-x-10 xl:gap-x-9 lg:gap-x-6 md:gap-x-7 sm:grid sm:grid-cols-4 sm:gap-x-4 sm:gap-y-14">
        <div className="col-span-2">
          <img
            className="h-16 w-16 xl:h-14 xl:w-14 md:h-12 md:w-12"
            src="/images/soc2.png"
            alt="SOC2 badge"
            width={64}
            height={64}
            loading="lazy"
          />
        </div>
        {FOOTER_MENU.map(({ name, items }) => (
          <div className="col-span-2" key={name}>
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
      <div className="mt-[76px] grid grid-cols-12 gap-x-4 border-t-2 border-tones-purple-light py-6 lg:mt-[58px] lg:gap-x-6 md:mt-11 md:gap-x-5 md:gap-y-6 md:py-5 xs:mt-[34px] xs:grid-rows-2 xs:gap-x-0">
        <div className="col-span-3 flex items-center xl:col-span-3 lg:col-span-3 md:col-span-full">
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
        <div className="col-span-6 flex items-center justify-center gap-x-4 xl:col-span-6 lg:col-span-6 md:col-span-full md:justify-start">
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
                size={24}
                className="shrink-0 transition-opacity duration-200 hover:opacity-80"
              />
            </Link>
          ))}
        </div>
        <div className="col-span-3 flex items-center justify-end xl:col-span-3 lg:col-span-3 md:col-span-full md:justify-start xs:flex-wrap">
          <p className="whitespace-nowrap text-14 font-medium leading-none tracking-tight text-gray-60">
            © {new Date().getFullYear()} Bytebase. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
