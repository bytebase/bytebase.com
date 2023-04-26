'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m, useAnimation } from 'framer-motion';

import Button from '@/components/shared/button';
import GithubStarsButton from '@/components/shared/github-stars-button';
import Link from '@/components/shared/link';

import { MENUS } from '@/lib/menus.js';

import APIIcon from '@/svgs/api.inline.svg';
import ChevronIcon from '@/svgs/chevron.inline.svg';
import CLIIcon from '@/svgs/cli.inline.svg';
import HowToIcon from '@/svgs/how-to.inline.svg';
import RocketIcon from '@/svgs/rocket.inline.svg';

import Burger from './burger';

// FIXME: Set the correct type for `icons`.
const icons: {
  [key: string]: any;
} = { rocket: RocketIcon, api: APIIcon, cli: CLIIcon, howTo: HowToIcon };

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

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openedDropdown, setOpenedDropdown] = useState(-1);
  const controls = useAnimation();

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

  return (
    <>
      <Burger
        className="hidden md:block"
        isToggled={isOpen}
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      />
      <LazyMotion features={domAnimation}>
        <m.nav
          className="safe-paddings fixed inset-0 z-40 hidden bg-black bg-opacity-80"
          initial="from"
          animate={controls}
          variants={menuVariants}
          onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        >
          <div
            className="ml-auto h-full w-1/2 bg-white pt-[60px] sm:w-full"
            onClick={(evt) => evt.stopPropagation()}
          >
            <div className="flex h-full flex-col justify-between overflow-y-auto px-7 pb-8 pt-3 md:px-5 sm:px-4 xs:pb-5">
              <ul className="flex flex-col items-stretch divide-y divide-gray-90">
                {MENUS.mobile.map(({ title, href = '', items }, idx) => (
                  <li key={idx} className="relative first:-mt-4 last:border-b last:border-gray-90">
                    {items ? (
                      <button
                        className="flex w-full flex-col items-start justify-center whitespace-nowrap py-5 text-20 font-medium leading-none tracking-tight transition-colors duration-200 hover:cursor-pointer"
                        tabIndex={0}
                        onClick={() =>
                          openedDropdown === idx ? setOpenedDropdown(-1) : setOpenedDropdown(idx)
                        }
                      >
                        <div className="flex w-full items-center justify-between">
                          <span>{title}</span>
                          {items && (
                            <ChevronIcon
                              className={clsx(
                                'h-4 w-4 shrink-0 transition-transform duration-200',
                                {
                                  'rotate-180': openedDropdown === idx,
                                },
                              )}
                            />
                          )}
                        </div>
                      </button>
                    ) : (
                      <Link
                        href={href}
                        className="flex w-full flex-col items-start justify-center whitespace-nowrap py-5 text-20 font-medium leading-none tracking-tight transition-colors duration-200 hover:cursor-pointer"
                      >
                        {title}
                      </Link>
                    )}
                    <LazyMotion features={domAnimation}>
                      {openedDropdown === idx && items && (
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
                    </LazyMotion>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col gap-4">
                <GithubStarsButton />
                <Button href="/" theme="gray-filled" size="md">
                  Sign up for Cloud
                </Button>
              </div>
            </div>
          </div>
        </m.nav>
      </LazyMotion>
    </>
  );
};

export default MobileMenu;
