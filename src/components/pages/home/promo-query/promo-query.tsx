'use client';

import Image from 'next/image';

import { useCallback, useState } from 'react';

import Accordion from './components';

const accordionData = [
  {
    title: 'Explore the schema',
    description:
      'Perform complex SQL tasks and protect data privacy with ByteBase’s web-based IDE, anonymization engine, and access controls.',
  },
  {
    title: 'Run and explain query',
    description:
      'Perform complex SQL tasks and protect data privacy with ByteBase’s web-based IDE, anonymization engine, and access controls.',
  },
  {
    title: 'Anonymize data',
    description:
      'Perform complex SQL tasks and protect data privacy with ByteBase’s web-based IDE, anonymization engine, and access controls.',
  },
  {
    title: 'Database access control',
    description:
      'Perform complex SQL tasks and protect data privacy with ByteBase’s web-based IDE, anonymization engine, and access controls.',
  },
];

const PromoQuery = () => {
  const defaultOpenPanelId = 0;
  const [activePanelId, setActivePanelId] = useState<number | undefined>(defaultOpenPanelId);

  const createHandleToggle = useCallback(
    (id: number) => () => {
      setActivePanelId((prevId) => {
        return prevId === id ? undefined : id;
      });
    },
    [],
  );
  return (
    <section className="container relative mt-[94px] overflow-x-clip 2xl:mt-20 lg:mt-[60px] md:mt-7 sm:mt-20">
      <header className="pt-[66px] sm:p-0">
        <Image
          className="absolute top-0 right-[156px] 2xl:top-4 2xl:right-32 lg:top-[11px] lg:right-[124px] lg:h-[204px] lg:w-[216px] md:top-6 md:right-[72px] md:h-[172px] md:w-[183px] sm:hidden sm:w-[141px]"
          src="/images/ufo.png"
          width={230}
          height={218}
          alt=""
        />
        <span className="inline-flex rounded-3xl bg-secondary-1 px-2.5 py-2 text-12 font-bold uppercase leading-none tracking-wider text-gray-15">
          Query
        </span>
        <h2 className="mt-3 max-w-3xl font-title text-88 font-semibold leading-none lg:max-w-2xl lg:text-68 lg:leading-104 md:mt-2 md:max-w-lg md:text-54 md:leading-none sm:max-w-[340px] sm:text-48 sm:leading-95">
          Explore data with <span className="whitespace-nowrap">all-in-one</span>{' '}
          <mark className="whitespace-nowrap bg-transparent text-center text-primary-1 sm:whitespace-normal">
            SQL editor
          </mark>
        </h2>
      </header>
      <div className="gap-x-grid mt-[46px] grid grid-cols-12 lg:mt-7 md:mt-11 sm:mt-7 sm:flex sm:flex-col-reverse">
        <div className="col-span-full row-span-full sm:mt-2">
          <Image
            src="/images/interface.png"
            className="h-auto w-full rounded shadow-[0_5px_15px_rgba(15,22,36,0.2)]"
            width={1472}
            height={845}
            alt=""
          />
        </div>

        <div className="relative col-span-4 col-start-9 row-span-full pr-10 2xl:col-start-8 2xl:pr-0 lg:col-span-5 lg:col-start-8 lg:-translate-x-6 md:col-span-6 md:col-start-7 md:-translate-x-0 md:pr-4 sm:mt-[25px] sm:translate-y-0 sm:translate-x-0 sm:pr-0">
          <Image
            className="absolute -top-[100px] -right-[32px] z-20 hidden sm:-top-[98px] sm:block sm:h-[135px]"
            src="/images/ufo.png"
            width={141}
            height={135}
            alt=""
          />
          <ul className="min-h-[520px] -translate-y-10 divide-y divide-tones-green-dark border border-tones-green-dark bg-tones-green-light px-6 py-3.5 shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(143,188,169,0.5)] 2xl:min-h-[496px] lg:min-h-[391px] lg:-translate-y-6 lg:px-5 md:min-h-[344px] md:-translate-y-6 md:px-4">
            {accordionData.map((option, index) => (
              <li key={index}>
                <Accordion
                  title={option.title}
                  description={option.description}
                  isOpenExternal={index === activePanelId}
                  defaultOpen={index === defaultOpenPanelId}
                  onChange={createHandleToggle(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PromoQuery;
