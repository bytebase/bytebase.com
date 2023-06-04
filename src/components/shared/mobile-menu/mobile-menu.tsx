'use client';

import { usePathname } from 'next/navigation';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';

import AlgoliaSearch from '@/components/pages/docs/algolia-search';
import Button from '@/components/shared/button';
import Link from '@/components/shared/link';

import { MENU } from '@/lib/menus';
import Route from '@/lib/route';

import IntroIcon from '@/svgs/intro.inline.svg';
import ConceptIcon from '@/svgs/concept.inline.svg';
import DbIcon from '@/svgs/db.inline.svg';
import RocketIcon from '@/svgs/rocket.inline.svg';
import TutorialsIcon from '@/svgs/tutorials.inline.svg';

import Burger from './burger';

const icons: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
} = {
  rocket: RocketIcon,
  intro: IntroIcon,
  concept: ConceptIcon,
  db: DbIcon,
  tutorials: TutorialsIcon,
};

const ANIMATION_DURATION = 0.2;
const MOTION_EASY = [0.25, 0.1, 0.25, 1];

const menuVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
    transitionEnd: {
      display: 'none',
    },
  },
  opened: {
    opacity: 1,
    display: 'block',
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

const dropdownVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: MOTION_EASY,
    },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATION,
      ease: MOTION_EASY,
    },
  },
};

const MobileMenu = ({ hasBanner }: { hasBanner: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openedDropdown, setOpenedDropdown] = useState(-1);
  const controls = useAnimation();
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      controls.start('opened');
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      controls.start('closed');
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [isOpen, controls]);

  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const isDocs = pathname?.startsWith(Route.DOCS);

  return (
    <>
      {isDocs && (
        <AlgoliaSearch className={clsx(isOpen ? 'z-40' : 'z-50', 'relative hidden md:block')} />
      )}
      <Burger className="hidden md:block" isToggled={isOpen} onClick={toggleMenu} />
      <LazyMotion features={domAnimation}>
        <m.nav
          className="safe-paddings absolute inset-x-0 bottom-0 top-0 z-40 hidden bg-black bg-opacity-80"
          initial="from"
          animate={controls}
          variants={menuVariants}
          onClick={toggleMenu}
        >
          <div
            className={clsx(
              'ml-auto flex w-1/2 flex-col justify-between bg-white px-7 pb-8 pt-[84px] md:px-5 sm:w-full sm:px-4 xs:pb-5',
              hasBanner ? 'h-[calc(100vh-56px)] md:h-[calc(100vh-46px)]' : 'h-full',
            )}
            onClick={(evt) => evt.stopPropagation()}
          >
            <ul className="flex max-h-[70%] flex-col items-stretch divide-y divide-gray-90 overflow-y-auto">
              {MENU.mobile.map(({ title, href = '', items }, idx) => {
                const isDropdownOpened = openedDropdown === idx;
                return (
                  <li className="relative first:-mt-4 last:border-b last:border-gray-90" key={idx}>
                    {items ? (
                      <button
                        className="flex w-full flex-col items-start justify-center whitespace-nowrap py-5 text-20 font-medium leading-none tracking-tight transition-colors duration-200 hover:cursor-pointer"
                        tabIndex={0}
                        onClick={() =>
                          isDropdownOpened ? setOpenedDropdown(-1) : setOpenedDropdown(idx)
                        }
                      >
                        <span className="flex w-full items-center justify-between">
                          <span>{title}</span>
                          {items && (
                            <span className="relative">
                              <span
                                className={clsx(
                                  'absolute -left-[17px] top-1/2 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
                                  isDropdownOpened ? 'rotate-45' : 'rotate-[135deg]',
                                )}
                              />
                              <span
                                className={clsx(
                                  'absolute -left-3 top-1/2 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
                                  isDropdownOpened ? '-rotate-45' : '-rotate-[135deg]',
                                )}
                              />
                            </span>
                          )}
                        </span>
                      </button>
                    ) : (
                      <Link
                        className="flex w-full flex-col items-start justify-center whitespace-nowrap py-5 text-20 font-medium leading-none tracking-tight transition-colors duration-200 hover:cursor-pointer"
                        href={href}
                        prefetch={href === Route.BLOG ? false : undefined}
                        onClick={toggleMenu}
                      >
                        {title}
                      </Link>
                    )}
                    <LazyMotion features={domAnimation}>
                      <AnimatePresence initial={false} mode="wait">
                        {isDropdownOpened && items && (
                          <m.ul
                            className="flex flex-col items-start"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={dropdownVariants}
                          >
                            {items.map(({ name, description, iconName, linkUrl }) => {
                              const Icon = icons[iconName];
                              return (
                                <li className="w-full first:-mt-4 last:pb-4" key={name}>
                                  <Link
                                    className="group block pt-4"
                                    size="lg"
                                    theme="gray"
                                    href={linkUrl}
                                    prefetch={isDropdownOpened && items ? false : undefined}
                                    onClick={() => {
                                      toggleMenu();
                                      setOpenedDropdown(-1);
                                    }}
                                  >
                                    <div className="flex flex-col gap-y-1">
                                      <div className="flex items-center gap-x-2 group-hover:text-primary-1">
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
                          </m.ul>
                        )}
                      </AnimatePresence>
                    </LazyMotion>
                  </li>
                );
              })}
              <li className="relative hidden first:-mt-4 last:border-b last:border-gray-90 sm:block">
                <Link
                  className="flex w-full flex-col items-start justify-center whitespace-nowrap py-5 text-20 font-medium leading-none tracking-tight transition-colors duration-200 hover:cursor-pointer"
                  href={Route.GITHUB}
                >
                  GitHub
                </Link>
              </li>
            </ul>
            <div className="sticky bottom-0 z-10 mt-auto hidden flex-col gap-4 sm:flex sm:gap-2">
              <Button href="https://hub.bytebase.com/workspace" theme="gray-filled" size="md">
                Sign up for Cloud
              </Button>
              <Button href={Route.DOCS_SELF_HOST} theme="primary-outline" size="md">
                Self host
              </Button>
            </div>
          </div>
        </m.nav>
      </LazyMotion>
    </>
  );
};

export default MobileMenu;
