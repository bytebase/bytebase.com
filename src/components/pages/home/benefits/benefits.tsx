'use client';

import Image from 'next/image';

import { useState } from 'react';

import clsx from 'clsx';

const benefits = [
  {
    title: 'SQL anti-pattern checks',
    description:
      '100+ SQL lint rules to detect anti-patterns and enforce consistent SQL style in the organization.',
    image: { src: '/images/page/main/benefits/auto-style.png', width: 590, height: 320 },
  },
  {
    title: 'Batch changes to multi-environment, multi-tenant or partitioned databases',
    description:
      'Batch change to multiple databases across different environments and tenants in a single ticket.',
    image: { src: '/images/page/main/benefits/batch-schemas.png', width: 590, height: 300 },
  },
  {
    title: 'GitOps - Database-as-Code',
    description: 'Reuse developer workflow and manage change scripts in VCS.',
    image: { src: '/images/page/main/benefits/git-ops.png', width: 464, height: 346 },
  },
  {
    title: 'Online schema change',
    description: 'Lockless schema change to reduce database downtime from hours to seconds.',
    image: { src: '/images/page/main/benefits/online-schemas.png', width: 464, height: 342 },
  },
];

const Benefits = () => {
  const [openedItemIdx, setOpenedItemIdx] = useState(0);

  return (
    <section>
      <h2 className="sr-only">Benefits</h2>
      <ul className="space-y-0.5">
        {benefits.map(({ title, description, image }, idx) => (
          <li
            key={idx}
            className={clsx('bg-tones-purple-light', {
              'bg-opacity-20': openedItemIdx === idx,
              'cursor-pointer transition-colors duration-200 hover:bg-tones-deep-purple-light':
                openedItemIdx !== idx,
            })}
            onClick={() => setOpenedItemIdx(idx)}
          >
            {openedItemIdx === idx ? (
              <article className="container gap-x-grid grid min-h-[418px] grid-cols-12 xl:min-h-[366px] md:min-h-0 md:grid-cols-none md:py-12 sm:py-10">
                <div className="col-span-7 pt-[165px] 3xl:pt-[124px] xl:col-span-6 xl:pt-[120px] md:col-auto md:pt-0">
                  <div className="flex items-center gap-[30px] xl:gap-6 md:gap-4 sm:gap-3">
                    <img
                      className="h-14 w-14 rounded-full shadow-[0_5px_15px_0_rgba(172,178,210,0.8)] xl:h-11 xl:w-11 md:h-9 md:w-9 sm:h-7 sm:w-7"
                      width={44}
                      height={44}
                      src="/images/page/main/accordion-opened.svg"
                      alt=""
                      loading="lazy"
                    />
                    <h3 className="text-44 font-bold leading-extra-tight tracking-tighter xl:text-36 md:text-30 sm:text-24">
                      {title}
                    </h3>
                  </div>
                  <p className="ml-[86px] mt-4 text-18 leading-tight xl:ml-[68px] xl:mt-2 xl:text-16 xl:leading-snug md:ml-[52px] md:max-w-xl md:text-14 sm:ml-10">
                    {description}
                  </p>
                </div>
                <div className="col-span-5 flex items-center justify-end self-stretch xl:col-span-6 md:col-auto md:-mb-5 md:mt-6 md:justify-center sm:mb-0">
                  <Image
                    {...image}
                    alt=""
                    className="h-auto max-w-full translate-x-[15px] xl:translate-x-0"
                  />
                </div>
              </article>
            ) : (
              <div className="container flex items-center gap-7 py-[26px] xl:gap-6 md:gap-4 md:py-6 sm:gap-3 sm:py-[30px]">
                <img
                  className="ml-1.5 h-11 w-11 xl:ml-0 xl:h-[38px] xl:w-[38px] md:h-8 md:w-8 sm:h-7 sm:w-7"
                  src="/images/page/main/accordion-closed-primary-1.svg"
                  alt=""
                  width={44}
                  height={44}
                  loading="lazy"
                />
                <p className="text-30 font-bold leading-extra-tight tracking-tighter xl:text-24 md:text-20 sm:text-18">
                  {title}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Benefits;
