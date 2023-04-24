'use client';

import { useState } from 'react';

import clsx from 'clsx';

const data = [
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

const Accordion = ({ onChange }: { onChange: () => void }) => {
  const [openedItemIdx, setOpenedItemIdx] = useState(0);

  return (
    <ul className="divide-y divide-tones-green-dark">
      {data.map(({ title, description }, idx) => (
        <li
          key={idx}
          className={clsx('py-6 first:pt-0 last:pb-0 xl:py-5 md:py-4.5 sm:py-4', {
            'cursor-pointer': openedItemIdx !== idx,
          })}
          onClick={() => {
            setOpenedItemIdx(idx);
            onChange();
          }}
        >
          <p className="flex items-center gap-4 text-24 leading-extra-tight tracking-tight xl:text-20 xl:leading-tight xl:tracking-normal md:gap-3 md:text-18">
            {openedItemIdx === idx ? (
              <img
                src="/images/page/main/accordion-opened.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full shadow-[0_5px_10px_0_rgba(156,201,182,0.8)] md:h-7 md:w-7"
              />
            ) : (
              <img
                src="/images/page/main/accordion-closed-secondary-2.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 md:h-7 md:w-7"
              />
            )}
            <b className="font-bold md:font-semibold">{title}</b>
          </p>
          {openedItemIdx === idx && (
            <p className="pt-2 pl-12 text-16 xl:pt-1 xl:text-14 xl:leading-snug md:pt-1.5 md:pl-10">
              {description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
