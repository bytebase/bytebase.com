'use client';

import { useState } from 'react';

import clsx from 'clsx';

import Button from '@/components/shared/button';
import GithubStarsButton from '@/components/shared/github-stars-button';
import Link from '@/components/shared/link';
import MobileMenu from '@/components/shared/mobile-menu';

import { MENUS } from '@/lib/menus';

import APIIcon from '@/svgs/api.inline.svg';
import CLIIcon from '@/svgs/cli.inline.svg';
import DiagonalArrowIcon from '@/svgs/diagonal-arrow.inline.svg';
import HowToIcon from '@/svgs/how-to.inline.svg';
import RocketIcon from '@/svgs/rocket.inline.svg';

import Burger from './burger';

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

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleHeaderBurgerClick = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header className="safe-paddings absolute top-0 left-0 right-0 z-[999] h-[72px] w-full">
        <nav
          className="container flex items-center justify-between py-4.5 md:py-0"
          aria-label="Global"
        >
          <Link href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
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
            {MENUS.header.map(({ title, href = '', items }: Header) => {
              return (
                <li key={title} className="group relative inline-block">
                  {href ? (
                    <Link className="px-3 py-[9px] font-medium" href={href} size="md" theme="gray">
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
                  {items?.length && (
                    <div className="invisible absolute top-6 -left-5 pt-6 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="relative z-30 flex items-center gap-x-[30px] rounded-lg border border-gray-80 bg-white p-4 pl-8 shadow-menu before:absolute before:-top-[8.5px] before:left-11 before:-z-50 before:h-4 before:w-4 before:rotate-45 before:rounded-tl before:border-t before:border-l before:border-gray-80 before:bg-white">
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
                          className="group/box flex h-full min-h-[324px] w-[244px] grow flex-col justify-between rounded-md bg-gray-97 p-6 pt-4.5 text-gray-40 hover:bg-gray-94"
                          href="/"
                        >
                          <div className="flex items-center justify-between group-hover/box:text-gray-15">
                            <span className="text-16 leading-normal">Start Learning</span>
                            <DiagonalArrowIcon className="h-4 w-4 shrink-0" />
                          </div>
                          <div className="flex flex-col gap-y-3">
                            <span className="text-20 leading-none text-gray-15">Tutorials</span>
                            <span>In this article, we’ll go over the benefits of</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-x-9 xl:gap-x-7 lg:gap-x-5 md:hidden">
            <GithubStarsButton />
            <Button href="/" theme="gray-filled" size="sm">
              Sign up for Cloud
            </Button>
          </div>
          <Burger
            className="hidden md:inline-flex"
            isToggled={isMobileMenuOpen}
            onClick={handleHeaderBurgerClick}
          />
        </nav>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
};

export default Header;
