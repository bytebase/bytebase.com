'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import useScrollPosition from '@react-hook/window-scroll';

import Button from '@/components/shared/button';
import Link from '@/components/shared/link';
import { LinkUnderlined } from '@/components/shared/link-underlined';

import Route from '@/lib/route';

import SmallArrowIcon from '@/svgs/small-arrow.inline.svg';

import Card, { type CardProps } from './card';

// TODO: prepare webm videos and optimize them
const cards: Omit<CardProps, 'autoplay' | 'onLoad'>[] = [
  {
    videos: [
      {
        type: 'video/webm',
        src: '/videos/page/main/hero/1.webm',
      },
      {
        type: 'video/mp4',
        src: '/videos/page/main/hero/1.mp4',
      },
    ],
    color: 'blue',
    href: '#',
    cover: '/images/page/main/hero/change-database.webp',
    title: 'Change database',
    description:
      'Simplify database changes with standardization, lint rules, and GitOps integration.',
  },
  {
    videos: [
      {
        type: 'video/webm',
        src: '/videos/page/main/hero/2.webm',
      },
      {
        type: 'video/mp4',
        src: '/videos/page/main/hero/2.mp4',
      },
    ],
    color: 'green',
    href: '#',
    cover: '/images/page/main/hero/query-data.webp',
    title: 'Query data',
    description:
      "Perform complex SQL tasks and protect data privacy with ByteBase's web-based IDE.",
  },
  {
    videos: [
      {
        type: 'video/webm',
        src: '/videos/page/main/hero/3.webm',
      },
      {
        type: 'video/mp4',
        src: '/videos/page/main/hero/3.mp4',
      },
    ],
    color: 'red',
    href: '#',
    cover: '/images/page/main/hero/secure-access.webp',
    title: 'Secure access',
    description:
      'Eliminate administrative complexity and ensure compliance with one-stop resource management.',
  },
];

const Hero = ({ latestVersion }: { latestVersion?: string }) => {
  const [autoplay, setAutoplay] = useState(false);
  const loadRef = useRef<boolean[]>([]);
  const containerRef = useRef<null | HTMLDivElement>(null);
  const anchorRef = useRef<null | HTMLDivElement>(null);
  const topPositionRef = useRef<number>(0);
  const scrollY = useScrollPosition();

  useEffect(() => {
    topPositionRef.current = anchorRef.current ? anchorRef.current.getBoundingClientRect().top : 0;
  }, []);

  // TODO: update on resize
  useEffect(() => {
    if (containerRef.current) {
      const topPosition = topPositionRef.current - window.innerWidth >= 1280 ? 500 : 200;
      const isDone = containerRef.current.classList.contains('done');

      if (scrollY >= topPosition && !isDone) {
        containerRef.current.classList.add('done');
      }
      if (scrollY < topPosition && isDone) {
        containerRef.current.classList.remove('done');
      }
    }
  }, [scrollY]);

  const onLoad = useCallback(() => {
    loadRef.current.push(true);
    if (loadRef.current.length === cards.length) {
      setAutoplay(true);
    }
  }, []);

  return (
    <div
      className="container gap-x-grid group mt-32 grid grid-cols-12 2xl:mt-[120px] lg:mt-[120px] md:mt-[104px] sm:mt-24 sm:grid-cols-none"
      ref={containerRef}
    >
      <section className="col-start-1 col-end-8 row-start-1 row-end-2 3xl:col-end-9 xl:col-end-10 md:col-end-12 sm:col-auto sm:row-auto">
        <header>
          {latestVersion && (
            <Link href={Route.CHANGELOG}>
              <span className="inline-flex items-center gap-1 rounded-full bg-tones-purple-light p-1 text-12 font-semibold leading-none text-primary-1">
                <span className="rounded-full bg-primary-1 px-2 py-1 text-white">What’s new?</span>
                <span className="flex items-center gap-1.5 px-2">
                  {latestVersion} Released
                  <SmallArrowIcon width={7} height={6} />
                </span>
              </span>
            </Link>
          )}
          <div className="relative mt-4 xl:mt-3.5 sm:mt-3">
            <h1 className="font-title text-112 font-semibold leading-none 3xl:max-w-4xl xl:max-w-2xl xl:text-90 xl:leading-95 md:max-w-2xl md:text-80 sm:text-48">
              <mark className="bg-transparent text-primary-1">Database</mark> schema change and
              version control
            </h1>
            <p className="absolute top-[244px] left-[338px] max-w-lg text-20 leading-140 xl:top-[177px] xl:left-[271px] xl:max-w-md xl:text-18 xl:leading-snug md:left-[230px] md:top-[158px] md:max-w-sm md:text-16 sm:static sm:mt-3 sm:max-w-full">
              Bytebase offers a web-based collaboration workspace to help DBAs and Developers manage
              the lifecycle of application database schemas.
            </p>
          </div>
        </header>
        <footer className="mt-14 flex items-center gap-9 2xl:gap-8 xl:mt-11 xl:gap-6 md:mt-7 sm:mt-6 sm:gap-3.5">
          <Button
            href={Route.INDEX}
            theme="primary-filled"
            size="lg"
            className="sm:!w-fit sm:!px-6"
          >
            Request a Demo
          </Button>
          <LinkUnderlined href={Route.INDEX}>See Live Demo</LinkUnderlined>
        </footer>
      </section>
      <div className="col-span-full col-start-1 row-start-2 h-20 md:h-[60px] sm:col-auto sm:row-auto sm:mt-8 sm:h-auto">
        <div className="mx-auto hidden w-fit border border-gray-40 shadow-[0_5px_15px_0_rgba(15,22,36,0.2)] sm:block">
          <video
            className="aspect-[0.7754137116]"
            controls={false}
            width={464}
            height={604}
            loop
            playsInline
            autoPlay
            muted
          >
            {cards[0].videos.map((video) => (
              <source key={video.type} src={video.src} type={video.type} />
            ))}
          </video>
        </div>
      </div>
      <div
        className="col-start-1 col-end-5 row-start-3 row-end-4 sm:col-auto sm:row-auto sm:mt-8"
        ref={anchorRef}
      >
        <Card
          {...cards[0]}
          className="sticky top-[200px] sm:static"
          autoplay={autoplay}
          onLoad={onLoad}
        />
      </div>
      <div className="col-start-5 col-end-9 row-start-1 row-end-4 pt-[461px] 3xl:pt-[459px] xl:row-start-2 xl:-mt-5 xl:pt-0 lg:mt-0 lg:pt-7 sm:col-auto sm:row-auto sm:mt-8 sm:pt-0">
        <Card
          {...cards[1]}
          className="sticky top-[200px] delay-150 sm:static"
          autoplay={autoplay}
          onLoad={onLoad}
        />
      </div>
      <div className="col-start-9 col-end-13 row-start-1 row-end-4 pt-[136px] 3xl:pt-[140px] lg:row-start-2 lg:-mt-20 lg:pt-0 md:-mt-7 sm:col-auto sm:row-auto sm:mt-8">
        <Card
          {...cards[2]}
          className="sticky top-[200px] delay-300 sm:static"
          autoplay={autoplay}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
};

export default Hero;
