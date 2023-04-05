'use client';

import { useState } from 'react';

import APIIcon from '@/svgs/api.inline.svg';
import CLIIcon from '@/svgs/cli.inline.svg';
import DiagonalArrowIcon from '@/svgs/diagonal-arrow.inline.svg';
import HowToIcon from '@/svgs/how-to.inline.svg';
import RocketIcon from '@/svgs/rocket.inline.svg';
import clsx from 'clsx';

import Button from '@/components/shared/button';
import GithubStarsButton from '@/components/shared/github-stars-button';
import Link from '@/components/shared/link';
import MobileMenu from '@/components/shared/mobile-menu';

import { MENUS } from '@/lib/menus';

import Burger from './burger';

interface Icons {
  [key: string]: any;
}

const icons: Icons = { rocket: RocketIcon, api: APIIcon, cli: CLIIcon, howTo: HowToIcon };

interface MenuItem {
  name: string;
  description: string;
  iconName: string;
  linkUrl: string;
}

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
      <header className="safe-paddings absolute top-0 left-0 right-0 z-[1000] h-[72px] w-full">
        <nav
          className="container flex items-center justify-between py-4.5 lg:py-0"
          aria-label="Global"
        >
          <Link to="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-8 w-auto 2xl:h-7"
              src="/images/logo.svg"
              alt="Bytebase logo"
              width={150}
              height={32}
              loading="eager"
            />
          </Link>
          <ul className="flex items-center gap-x-6 xl:gap-x-2 lg:hidden">
            {MENUS.header.map(({ title, href = '', items }: Header) => {
              return (
                <li key={title} className="group relative inline-block">
                  {href ? (
                    <Link
                      additionalClassName="font-medium px-3 py-[9px]"
                      to={href}
                      size="md"
                      theme="gray"
                    >
                      {title}
                    </Link>
                  ) : (
                    <button
                      className={clsx(
                        'font-medium text-16 leading-none transition-colors duration-200 rounded-[44px] px-3 py-[9px]',
                        {
                          'group-hover:bg-gray-94': items,
                        },
                      )}
                    >
                      {title}
                    </button>
                  )}
                  {items?.length && (
                    <div className="top-6 -left-5 absolute transition-[opacity,visibility] duration-200 group-hover:visible invisible opacity-0 group-hover:opacity-100 pt-6">
                      <div className="z-30 relative rounded-lg border border-gray-80 bg-white p-4 pl-8 flex items-center gap-x-[30px] before:bg-white before:h-4 before:w-4 before:absolute before:-top-[8.5px] before:-z-50 before:rotate-45 before:border-gray-80 before:border-t before:border-l before:rounded-tl before:left-11 shadow-menu">
                        <ul className="flex flex-col">
                          {items?.map(({ name, linkUrl, description, iconName }, index) => {
                            const Icon = icons[iconName];
                            return (
                              <li key={index} className="pt-6 first:pt-0">
                                <Link
                                  additionalClassName="whitespace-nowrap group/link block"
                                  size="md"
                                  theme="gray"
                                  to={linkUrl}
                                >
                                  <div className="flex flex-col gap-y-2.5">
                                    <div className="flex gap-x-2 items-center group-hover/link:text-primary-1">
                                      <Icon className="w-5 h-5 shrink-0" />
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
                          additionalClassName="bg-gray-97 group/box rounded-md p-6 pt-4.5 h-full grow hover:bg-gray-94 flex flex-col justify-between min-h-[324px] w-[244px] text-gray-40"
                          to="/"
                        >
                          <div className="flex justify-between items-center group-hover/box:text-gray-15">
                            <span className="text-16 leading-normal">Start Learning</span>
                            <DiagonalArrowIcon className="w-4 h-4 shrink-0" />
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
          <div className="flex items-center gap-x-9 2xl:gap-x-7 xl:gap-x-5 lg:hidden">
            <GithubStarsButton />
            <Button to="/" theme="gray-filled" size="sm">
              Sign up for Cloud
            </Button>
          </div>
          <Burger
            className="hidden lg:inline-flex"
            isToggled={isMobileMenuOpen}
            onClick={handleHeaderBurgerClick}
          />
        </nav>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} />
    </>
  );
};

export default Header;
