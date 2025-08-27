'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import Button from '@/components/shared/button';
import Link from '@/components/shared/link';
import MobileMenu from '@/components/shared/mobile-menu';

import Route from '@/lib/route';

import AboutIcon from '@/svgs/about.inline.svg';
import BlogIcon from '@/svgs/blog.inline.svg';
import CaseStudyIcon from '@/svgs/case-study.inline.svg';
import ChangelogIcon from '@/svgs/changelog.inline.svg';
import ConceptIcon from '@/svgs/concept.inline.svg';
import EditorIcon from '@/svgs/editor-menu-docs.inline.svg';
import EnterpriseIcon from '@/svgs/enterprise-menu-docs.inline.svg';
import IntroIcon from '@/svgs/intro.inline.svg';
import ArrowIcon from '@/svgs/arrow.inline.svg';
import UseCaseIcon from '@/svgs/usecase.inline.svg';
import DbIcon from '@/svgs/db.inline.svg';
import RocketIcon from '@/svgs/rocket.inline.svg';
import MigrateIcon from '@/svgs/migrate-menu-docs.inline.svg';
import TutorialsIcon from '@/svgs/tutorials.inline.svg';
import ChevronIcon from '@/svgs/chevron-menu-docs.inline.svg';
import MaskIcon from '@/svgs/mask-menu-docs.inline.svg';
import BatchIcon from '@/svgs/batch-menu-docs.inline.svg';
import BranchIcon from '@/svgs/branch-menu-docs.inline.svg';
import ContactIcon from '@/svgs/contact.inline.svg';
import LockIcon from '@/svgs/lock.inline.svg';
import SLAIcon from '@/svgs/sla.inline.svg';

import PROMO_DATA from '@/lib/promo-data';
import GithubStarCounter from './github-star-counter';
import Banner from '../banner';
import clsx from 'clsx';

const icons: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
} = {
  about: AboutIcon,
  blog: BlogIcon,
  casestudy: CaseStudyIcon,
  changelog: ChangelogIcon,
  rocket: RocketIcon,
  concept: ConceptIcon,
  contact: ContactIcon,
  usecase: UseCaseIcon,
  intro: IntroIcon,
  db: DbIcon,
  editor: EditorIcon,
  enterprise: EnterpriseIcon,
  migrate: MigrateIcon,
  mask: MaskIcon,
  batch: BatchIcon,
  branch: BranchIcon,
  tutorial: TutorialsIcon,
  lock: LockIcon,
  sla: SLAIcon,
};

type Menu = {
  items: MenuItem[];
  title?: string;
};

type MenuItem = {
  name: string;
  linkUrl: string;
  description?: string;
  iconName?: string;
};

type HighlightItem = {
  name: string;
  description: string;
  linkUrl: string;
  cta: string;
  iconName: string;
};

type Header = {
  title: string;
  href?: string;
  menus?: Menu[];
  highlight?: HighlightItem;
  breakpoint?: 'md' | 'lg'; // New attribute to indicate at which breakpoint the item will be shown
};

export const HEADER_MENU: Header[] = [
  {
    title: 'Features',
    breakpoint: 'md',
    menus: [
      {
        items: [
          {
            name: 'Schema Migration',
            description: 'GUI-based, database CI/CD with GitOps',
            linkUrl: Route.SCHEMA_MIGRATION,
            iconName: 'migrate',
          },
          {
            name: 'Permission-based SQL Editor',
            description: 'Bastion-less human-to-database permission control',
            linkUrl: Route.SQL_EDITOR,
            iconName: 'editor',
          },
          {
            name: 'Dynamic Data Masking',
            description: 'Role-based multi-level masking policy',
            linkUrl: Route.DATA_MASKING,
            iconName: 'mask',
          },
          {
            name: 'Batch Change',
            description: 'Multi-environments, multi-regions, multi-tenants',
            linkUrl: Route.BATCH_CHANGE,
            iconName: 'batch',
          },
        ],
      },
    ],
  },
  {
    title: 'Solutions',
    breakpoint: 'md',
    menus: [
      {
        title: 'Use Case',
        items: [
          {
            name: 'Planned Database CI/CD',
            linkUrl: Route.DOCS_DATABASE_CI_CD,
          },
          {
            name: 'Just-in-Time Database Access',
            linkUrl: Route.DOCS_JUST_IN_TIME_DATABASE_ACCESS,
          },
          {
            name: 'Adhoc Data Fix',
            linkUrl: Route.DOCS_DATABASE_ADHOC_CHANGE,
          },
          {
            name: 'Batch Tenant Change',
            linkUrl: Route.DOCS_MULTI_TENANCY_DEPLOYMENT,
          },
          {
            name: 'Headless Database Backend',
            linkUrl: Route.DOCS_API,
          },
        ],
      },
      {
        title: 'Industry',
        items: [
          {
            name: '🏦 Financial Services',
            linkUrl: Route.INDUSTRY_FINANCIAL_SERVICES,
          },
          {
            name: '🌐 Technology',
            linkUrl: Route.INDUSTRY_TECHNOLOGY,
          },
          {
            name: '🏭 Manufacturing',
            linkUrl: Route.INDUSTRY_MANUFACTURING,
          },
          {
            name: '🕹️ Gaming',
            linkUrl: Route.INDUSTRY_GAMING,
          },
          {
            name: '🔗 Web3',
            linkUrl: Route.INDUSTRY_WEB3,
          },
        ],
      },
    ],
  },
  { title: 'Docs', href: Route.DOCS, breakpoint: 'md' },
  { title: 'Pricing', href: Route.PRICING, breakpoint: 'md' },
  {
    title: 'Company',
    breakpoint: 'lg',
    menus: [
      {
        items: [
          {
            name: 'Case Study',
            linkUrl: Route.BLOG_CASE_STUDY,
            iconName: 'casestudy',
          },
          {
            name: 'Security',
            linkUrl: Route.SECURITY,
            iconName: 'lock',
          },
          {
            name: 'SLA',
            linkUrl: Route.SLA,
            iconName: 'sla',
          },
          {
            name: 'Contact',
            linkUrl: Route.CONTACTS,
            iconName: 'contact',
          },
          {
            name: 'About Us',
            linkUrl: Route.ABOUT,
            iconName: 'about',
          },
        ],
      },
    ],
    highlight: {
      name: 'Blog',
      description: 'Product updates and database insight',
      linkUrl: Route.BLOG,
      cta: 'Start Learning',
      iconName: 'blog',
    },
  },
];

const Header = () => {
  const topBanner = PROMO_DATA.TOP_BANNER;
  const [canShowSubmenu, setCanShowSubmenu] = useState(true);
  const [showShadow, setShowShadow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get the banner height (or use an approximate value)
      const bannerHeight = topBanner ? 40 : 0; // Slightly increased banner height

      // Calculate progress between 0 and 1 based on scroll position relative to banner height
      const progress = Math.min(window.scrollY / bannerHeight, 1);

      setScrollProgress(progress);
      setShowShadow(progress > 0.9); // Add shadow when almost completed transition
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [topBanner]);

  const handleSubmenuClick = () => {
    setCanShowSubmenu(false);
    setTimeout(() => setCanShowSubmenu(true), 300);
  };

  return (
    <>
      <header className="safe-paddings h-auto w-full bg-white">
        {topBanner && (
          <div
            style={{
              transform: `translateY(-${scrollProgress * 100}%)`,
              opacity: 1 - scrollProgress,
              transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
              height: scrollProgress === 1 ? '0' : 'auto',
              overflow: 'hidden',
            }}
          >
            <Banner bannerText={topBanner.title} bannerUrl={topBanner.pathname} />
          </div>
        )}

        {/* Placeholder to maintain layout when navbar is fixed */}
        {scrollProgress === 1 && <div className="h-[64px] md:h-[56px]" />}

        <nav
          className={clsx(
            'mx-auto flex w-full max-w-[1920px] items-center px-10 py-[18px] transition-all duration-200 md:justify-between md:py-[10px] sm:px-4',
            scrollProgress === 1 && 'fixed left-0 right-0 top-0 z-30 bg-white sm:z-50',
            showShadow && 'shadow',
          )}
          aria-label="Global"
        >
          <Link className="shrink-0" href="/">
            <Image
              className="h-8 w-auto xl:h-7"
              src="/images/logo.svg"
              alt="Bytebase logo"
              width={150}
              height={32}
              loading="eager"
            />
          </Link>
          <ul className="ml-8 mt-0.5 flex items-center gap-1 md:hidden">
            {HEADER_MENU.map(({ title, href = '', menus, highlight, breakpoint }: Header) => {
              return (
                <li
                  key={title}
                  className={`group relative inline-block ${
                    breakpoint === 'lg' ? 'lg:hidden' : ''
                  }`}
                >
                  {href ? (
                    <Link
                      className="px-3 py-2.5 text-16 font-medium tracking-wider"
                      prefetch={href === Route.BLOG ? false : undefined}
                      href={href}
                      size="xs"
                      theme="gray"
                    >
                      {title}
                    </Link>
                  ) : (
                    <button className="inline-flex items-center gap-1 rounded-[44px] px-3 py-2.5 font-sans text-16 font-medium leading-none tracking-wider transition-colors duration-200 group-hover:bg-gray-94">
                      {title}
                      <ChevronIcon className="h-3 w-3 transition-transform duration-200 group-hover:-rotate-180" />
                    </button>
                  )}
                  {menus?.length && canShowSubmenu && (
                    <div className="invisible absolute left-0 top-6 z-50 pt-4 opacity-0 transition-[opacity,visibility] duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="relative -left-1/3 flex items-start gap-x-8 rounded-lg border border-gray-80 bg-white p-6 shadow-menu">
                        {menus.map(({ items, title: subtitle }) => (
                          <div
                            key={`${title}-${subtitle}`}
                            className="flex h-full flex-col items-start justify-start"
                          >
                            {subtitle && (
                              <p className="pb-3 pt-1 text-16 font-medium leading-none text-gray-60">
                                {subtitle}
                              </p>
                            )}
                            <ul className="flex flex-col justify-between">
                              {items?.map(({ name, linkUrl, description, iconName }) => {
                                const Icon = iconName ? icons[iconName] : null;
                                return (
                                  <li key={name} className="pt-6 first:pt-2">
                                    <Link
                                      className="group/link block whitespace-nowrap"
                                      size="md"
                                      theme="gray"
                                      href={linkUrl}
                                      prefetch={false}
                                      onClick={handleSubmenuClick}
                                    >
                                      <div className="flex flex-col">
                                        <div className="flex items-center gap-x-2 group-hover/link:text-primary-1">
                                          {Icon && (
                                            <Icon className="inline-block h-5 w-5 shrink-0 opacity-80" />
                                          )}
                                          <span className="font-medium tracking-tight">{name}</span>
                                        </div>
                                        {description && (
                                          <span className="pt-1 text-16 leading-normal text-gray-40">
                                            {description}
                                          </span>
                                        )}
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                        {highlight && (
                          <Link
                            className="group/box -my-2 flex h-full min-h-[258px] w-[244px] grow flex-col justify-between rounded-md bg-tutorials p-5 text-gray-15"
                            href={highlight.linkUrl}
                            prefetch={false}
                            onClick={handleSubmenuClick}
                          >
                            <div className="flex flex-col">
                              <TutorialsIcon className="h-7 w-7" />
                              <span className="mt-5 text-20 font-medium leading-none text-gray-15">
                                {highlight.name}
                              </span>
                              <span className="mt-2.5">{highlight.description}</span>
                            </div>
                            <div className="flex items-center justify-start transition-colors duration-200 group-hover/box:text-primary-1">
                              <span className="text-16 font-medium leading-normal">
                                {highlight.cta}
                              </span>
                              <ArrowIcon className="ml-1.5 h-4 w-4" />
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="ml-auto flex items-center gap-2 md:mr-10 sm:hidden">
            <GithubStarCounter />
            <Button href={Route.DEMO} theme="primary-outline" className="w-[88px]" size="sm">
              Demo
            </Button>
            <Button href={Route.DOCS_SELF_HOST} theme="gray-filled" className="w-[116px]" size="sm">
              Self-host
            </Button>
          </div>
        </nav>
      </header>
      <MobileMenu />
    </>
  );
};

export default Header;
