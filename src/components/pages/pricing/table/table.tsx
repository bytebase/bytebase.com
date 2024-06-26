'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';

import clsx from 'clsx';

import { LABELS, PLANS } from '@/components/pages/pricing/table/data/pricing-plans';
import PlanCard from '@/components/pages/pricing/table/plan-card';
import Link from '@/components/shared/link';

import { calculateCellHeight } from './data/calculate-cell-height';
import FeatureList from './plan-card/feature-list';

const Table = () => {
  const [currentRow, setCurrentRow] = useState('');

  useEffect(() => {
    const cells = document.querySelectorAll(`[data-row-id]`);

    cells.forEach((cell) => {
      const rowId = cell.getAttribute('data-row-id') || '';

      cell.addEventListener('mouseenter', () => setCurrentRow(rowId));
      cell.addEventListener('mouseleave', () => setCurrentRow(''));
    });

    return () => {
      cells.forEach((cell) => {
        const rowId = cell.getAttribute('data-row-id') || '';

        cell.removeEventListener('mouseenter', () => setCurrentRow(rowId));
        cell.removeEventListener('mouseleave', () => setCurrentRow(''));
      });
    };
  }, []);

  return (
    <>
      <section className="container gap-x-grid grid grid-cols-12 pt-20 xl:pt-16 md:pt-14 sm:pt-3.5">
        <h2 className="sr-only">Rate plans comparison</h2>
        <div className="relative z-20 col-span-3 col-start-2 3xl:col-span-4 3xl:col-start-1 sm:col-span-6">
          <Image
            src="/images/page/pricing/table-decor.webp"
            width={338}
            height={330}
            alt=""
            className="absolute -left-10 -top-[123px] max-w-none 3xl:-top-[124px] 3xl:left-0 3xl:h-auto 3xl:w-[345px] xl:-top-[83px] xl:w-[280px] md:-top-[10px] md:w-[225px] sm:-top-px xs:-left-[68px] xs:w-[204px]"
          />
          <div
            className={clsx(
              'flex grow flex-col shadow-labels',
              '-mr-10 3xl:-mr-9 xl:-mr-6 md:-mr-5 sm:mr-0',
              'pt-[233px] xl:pt-[237px] md:pt-[210px] sm:pt-[227px] xs:pt-[209px]',
            )}
          >
            {LABELS.map(({ title, items }, idx) => (
              <div
                className="relative mt-11 border-b border-black border-opacity-10 first:mt-0 last:border-b-0"
                key={`${title}_${idx}`}
              >
                <p
                  className={clsx(
                    title.length > 20 && 'flex items-center md:min-h-[50px] sm:min-h-[45px]',
                    'text-24 font-bold leading-none xl:text-20 sm:text-18 xs:max-w-[180px]',
                  )}
                >
                  {title}
                </p>
                <ul className="mt-4 flex flex-col divide-y divide-black divide-opacity-10">
                  {Object.keys(items).map((item, rowIdx) => {
                    const isActive = `${item}-${rowIdx}` === currentRow;
                    return (
                      <li
                        className={clsx(
                          'flex h-12 items-center text-16 font-medium leading-normal text-gray-15 sm:pr-4.5 sm:text-15',
                          {
                            'bg-[#FCFBFF]': isActive,
                          },

                          calculateCellHeight(item),
                        )}
                        data-row-id={`${item}-${rowIdx}`}
                        key={`${item}_${rowIdx}`}
                      >
                        {items[item as keyof typeof items]}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 col-span-7 3xl:col-span-8 sm:col-span-6">
          <div className="md:scrollbar-hidden md:-mr-7 md:overflow-x-auto sm:-mx-4">
            <div className="flex flex-row items-stretch justify-start md:w-[852px] sm:w-[468px]">
              {Object.keys(PLANS).map((plan, idx) => {
                const currentPlan = PLANS[plan as keyof typeof PLANS];

                return (
                  <div className="w-1/3 shrink grow" key={`${currentPlan.title}_${idx}`}>
                    <div
                      className={clsx(
                        'sticky top-[122px] z-30 md:static',
                        'h-[276px] 3xl:h-[272px] md:h-[245px] sm:h-[260px]',
                        {
                          'border-r border-tones-purple-dark': currentPlan.title === 'enterprise',
                        },
                      )}
                    >
                      <PlanCard {...currentPlan} />
                    </div>
                    <div
                      className={clsx('border border-tones-purple-dark', {
                        'border-l-0': currentPlan.title === 'pro',
                        'border-l-0 bg-[#F9FAFF]': currentPlan.title === 'enterprise',
                      })}
                    >
                      <FeatureList
                        title={currentPlan.title}
                        features={currentPlan.changeManagement}
                        currentRow={currentRow}
                      />
                      <FeatureList
                        title={currentPlan.title}
                        features={currentPlan.sql}
                        currentRow={currentRow}
                      />
                      <FeatureList
                        title={currentPlan.title}
                        features={currentPlan.collaboration}
                        currentRow={currentRow}
                      />
                      <FeatureList
                        title={currentPlan.title}
                        features={currentPlan.security}
                        currentRow={currentRow}
                        withLongTitle
                      />
                      <FeatureList
                        title={currentPlan.title}
                        features={currentPlan.bespoke}
                        currentRow={currentRow}
                        isLastSection
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-7 col-start-5 pt-7 3xl:col-span-8 3xl:col-start-5 xl:pt-6 md:pt-4 sm:col-span-12 sm:col-start-1 sm:pt-3">
          <p
            aria-label="You can upgrade, downgrade, or cancel your subscription anytime. No hidden charges"
            className="text-center text-15 leading-snug text-gray-40 xl:text-14 xl:leading-tight"
          >
            You can upgrade, downgrade, or{' '}
            <Link className="xl:text-14 sm:inline" size="sm" href="/refund" theme="primary-1">
              cancel your subscription
            </Link>{' '}
            anytime. No hidden charges.
          </p>
        </div>
      </section>
    </>
  );
};

export default Table;
