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
    <section className="mt-[94px] 2xl:mt-20 lg:mt-[60px] md:mt-7 sm:mt-20 container relative overflow-x-clip">
      <header className="pt-[66px] sm:p-0">
        <Image
          className="absolute top-0 2xl:top-4 lg:top-[11px] md:top-6 right-[156px] 2xl:right-32 lg:right-[124px] md:right-[72px] lg:w-[216px] lg:h-[204px] md:w-[183px] md:h-[172px] sm:w-[141px] sm:hidden"
          src="/images/ufo.png"
          width={230}
          height={218}
          alt=""
        />
        <span className="inline-flex font-bold uppercase text-12 leading-none tracking-wider bg-secondary-1 px-2.5 py-2 rounded-3xl text-gray-15">
          Query
        </span>
        <h2 className="mt-3 md:mt-2 font-title font-semibold leading-none lg:leading-104 md:leading-none sm:leading-95 text-88 lg:text-68 max-w-3xl lg:max-w-2xl md:text-54 sm:text-48 md:max-w-lg sm:max-w-[340px]">
          Explore data with <span className="whitespace-nowrap">all-in-one</span>{' '}
          <mark className="bg-transparent text-primary-1 whitespace-nowrap sm:whitespace-normal text-center">
            SQL editor
          </mark>
        </h2>
      </header>
      <div className="mt-[46px] lg:mt-7 md:mt-11 sm:mt-7 grid grid-cols-12 grid-gap sm:flex sm:flex-col-reverse">
        <div className="row-span-full col-span-full sm:mt-2">
          <Image
            src="/images/interface.png"
            className="w-full h-auto shadow-[0_5px_15px_rgba(15,22,36,0.2)] rounded"
            width={1472}
            height={845}
            alt=""
          />
        </div>

        <div className="row-span-full col-start-9 col-span-4 pr-10 2xl:pr-0 md:pr-4 sm:pr-0 2xl:col-start-8 lg:col-start-8 lg:col-span-5 lg:-translate-x-6 md:-translate-x-0 md:col-start-7 md:col-span-6 sm:translate-y-0 sm:translate-x-0 relative sm:mt-[25px]">
          <Image
            className="hidden absolute -top-[100px] sm:-top-[98px] -right-[32px] sm:h-[135px] sm:block z-20"
            src="/images/ufo.png"
            width={141}
            height={135}
            alt=""
          />
          <ul className="bg-tones-green-light border shadow-[inset_6px_6px_0_#fff,0_5px_15px_rgba(143,188,169,0.5)] border-tones-green-dark -translate-y-10 px-6 lg:px-5 md:px-4 py-3.5 divide-y divide-tones-green-dark min-h-[520px] 2xl:min-h-[496px] lg:min-h-[391px] md:min-h-[344px] lg:-translate-y-6 md:-translate-y-6">
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
