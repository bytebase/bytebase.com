'use client';

import { useState } from 'react';

import clsx from 'clsx';

import Button from '@/components/shared/button';
import Link from '@/components/shared/link';
import MobileMenu from '@/components/shared/mobile-menu';

import { MENU } from '@/lib/menus';
import Route from '@/lib/route';

import APIIcon from '@/svgs/api.inline.svg';
import ArrowIcon from '@/svgs/arrow.inline.svg';
import CLIIcon from '@/svgs/cli.inline.svg';
import HowToIcon from '@/svgs/how-to.inline.svg';
import RocketIcon from '@/svgs/rocket.inline.svg';
import TutorialsIcon from '@/svgs/tutorials.inline.svg';

import GithubStarCounter from './github-star-counter';

// FIXME: Set the correct type for `icons`.
const icons: {
  [key: string]: any;
} = {
  rocket: RocketIcon,
  api: APIIcon,
  cli: CLIIcon,
  howTo: HowToIcon,
};

type MenuItem = {
  name: string;
  description: string;
  iconName: string;
  linkUrl: string;
};

type Header = {
  title: string;
  href?: string;
  items?: MenuItem[];
};

const Header = ({ hasBanner = false }: { hasBanner?: boolean }) => {
  const [canShowSubmenu, setCanShowSubmenu] = useState(true);

  const handleSubmenuClick = () => {
    setCanShowSubmenu(false);
    setTimeout(() => setCanShowSubmenu(true), 300);
  };

  return (
    <>
      <header className="safe-paddings absolute left-0 right-0 top-0 z-30 h-[72px] w-full md:py-[22px] sm:z-50">
        <nav
          className="container flex items-center justify-between py-4.5 md:py-0"
          aria-label="Global"
        >
          <Link href="/">
            <img
              className="h-8 w-auto xl:h-7"
              src="/images/logo.svg"
              alt="Bytebase logo"
              width={150}
              height={32}
              loading="eager"
            />
          </Link>
          <ul className="flex items-center gap-x-6 lg:gap-x-2 md:hidden">
            {MENU.header.map(({ title, href = '', items }: Header) => {
              return (
                <li key={title} className="group relative inline-block">
                  {href ? (
                    <Link
                      className="px-3 py-[9px] font-medium"
                      prefetch={href === Route.BLOG ? false : undefined}
                      href={href}
                      size="md"
                      theme="gray"
                    >
                      {title}
                    </Link>
                  ) : (
                    <button
                      className={clsx(
                        'rounded-[44px] px-3 py-[9px] text-16 font-medium leading-none transition-colors duration-200',
                        {
                          'group-hover:bg-gray-94': items,
                        },
                      )}
                    >
                      {title}
                    </button>
                  )}
                  {items?.length && canShowSubmenu && (
                    <div className="invisible absolute -left-5 top-6 pt-6 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="relative flex items-center gap-x-[30px] rounded-lg border border-gray-80 bg-white p-4 pl-8 shadow-menu before:absolute before:-top-[8.5px] before:left-11 before:h-4 before:w-4 before:rotate-45 before:rounded-tl before:border-l before:border-t before:border-gray-80 before:bg-white">
                        <ul className="flex flex-col">
                          {items?.map(({ name, linkUrl, description, iconName }, index) => {
                            const Icon = icons[iconName];
                            return (
                              <li key={index} className="pt-6 first:pt-0">
                                <Link
                                  className="group/link block whitespace-nowrap"
                                  size="md"
                                  theme="gray"
                                  href={linkUrl}
                                  prefetch={false}
                                  onClick={handleSubmenuClick}
                                >
                                  <div className="flex flex-col gap-y-2.5">
                                    <div className="flex items-center gap-x-2 group-hover/link:text-primary-1">
                                      <Icon className="h-5 w-5 shrink-0" />
                                      <span className="font-medium tracking-tight">{name}</span>
                                    </div>
                                    <span className="text-16 leading-normal text-gray-40">
                                      {description}
                                    </span>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <Link
                          className="group/box flex h-full min-h-[324px] w-[244px] grow flex-col justify-between rounded-md bg-tutorials p-5 text-gray-15"
                          href={Route.DOCS_TUTORIALS}
                          prefetch={false}
                          onClick={handleSubmenuClick}
                        >
                          <div className="flex flex-col">
                            <TutorialsIcon className="h-7 w-7" />
                            <span className="mt-5 text-20 font-medium leading-none text-gray-15">
                              Tutorials
                            </span>
                            <span className="mt-2.5">
                              Guides to help you maximize the benefits and leverage the full
                              potential of Bytebase&apos;s features.
                            </span>
                          </div>
                          <div className="flex items-center justify-start transition-colors duration-200 group-hover/box:text-primary-1">
                            <span className="text-16 font-medium leading-normal">
                              Start Learning
                            </span>
                            <ArrowIcon className="ml-1.5 h-4 w-4" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-5 md:hidden">
            <GithubStarCounter />
            <span className="h-5 w-px bg-gray-80" />
            <Button
              href={Route.DOCS_SELF_HOST}
              theme="primary-outline"
              className="w-[116px]"
              size="sm"
            >
              Self host
            </Button>
            <Button
              href="https://hub.bytebase.com/workspace"
              className="w-[183px]"
              theme="gray-filled"
              size="sm"
            >
              Sign Up for Cloud
            </Button>
          </div>
        </nav>
      </header>
      <MobileMenu hasBanner={hasBanner} />
    </>
  );
};

export default Header;
