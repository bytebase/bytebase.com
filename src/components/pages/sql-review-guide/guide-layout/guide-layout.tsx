'use client';

import { JSXElementConstructor, useState } from 'react';

import { convertToCategoryList, en, getRuleLocalizationKey } from '@/utils/sql-review';
import clsx from 'clsx';
import format from 'date-fns/format';

import { GuidelineTemplate } from '@/types/sql-review';

import MySQLIcon from '@/svgs/aurora.inline.svg';
import ExternalIcon from '@/svgs/external-sm.inline.svg';
import PostgresIcon from '@/svgs/postgres.inline.svg';
import TidbIcon from '@/svgs/tidb.inline.svg';

import FilterBar from '../filter-bar';
import Sidebar from '../sidebar';

const icons: Record<string, JSXElementConstructor<{ key: string; className: string }>> = {
  MYSQL: MySQLIcon,
  TIDB: TidbIcon,
  POSTGRES: PostgresIcon,
};

const GuideLayout = ({
  templateList,
  schema,
}: {
  templateList: GuidelineTemplate[];
  schema: any;
}) => {
  const [template, setTemplate] = useState(templateList[0]);
  const [categoryList, setCategoryList] = useState(
    convertToCategoryList(schema, template.ruleList),
  );

  return (
    <section className="guide-layout container mt-11">
      <div className="gap-x-grid grid grid-cols-12 border-t border-gray-90 pt-16">
        <Sidebar categoryList={categoryList} />
        <article className="col-span-6">
          <h2 className="text-44 font-bold leading-tight text-gray-15">Database Review Guide</h2>
          <div className="mt-[60px] flex flex-col gap-y-[60px]">
            {categoryList.map(({ id, ruleList }) => {
              const lowerCaseId: string = id.toLocaleLowerCase();
              return (
                <div key={id}>
                  <h3 className="text-24 font-bold leading-tight text-gray-15">
                    {en.category[lowerCaseId]}
                  </h3>
                  <ul className="mt-5">
                    {ruleList.map(({ type, engineList, componentList, level }) => {
                      const key: string = getRuleLocalizationKey(type);
                      //FIXME: use proper ts type
                      const lowerCaseLevel: string = (
                        level as unknown as string
                      ).toLocaleLowerCase();
                      const anchor = getRuleLocalizationKey(type);

                      return (
                        <li className="border-t border-gray-90 py-5 last:pb-0" key={type}>
                          <div>
                            <div className="flex justify-between">
                              <div>
                                <span
                                  className={clsx('mt-5 text-14 font-medium leading-none', {
                                    'text-secondary-4': lowerCaseLevel === 'error',
                                    'text-primary-1': lowerCaseLevel === 'warning',
                                  })}
                                >
                                  {en.level[lowerCaseLevel]}
                                </span>
                                <h4
                                  className="mt-2 text-18 font-medium leading-tight text-gray-15"
                                  id={anchor}
                                >
                                  {en.rule[key].title}
                                </h4>
                              </div>
                              <div className="flex gap-x-3">
                                <div
                                  className={clsx(
                                    'flex h-10 items-center gap-x-3 rounded-full border border-gray-90',
                                    engineList.length === 1 ? 'px-2.5' : 'px-4',
                                  )}
                                >
                                  {engineList.map((engine) => {
                                    const Icon = icons[engine];
                                    return <Icon className="h-5 w-5" key={engine} />;
                                  })}
                                </div>
                                <a
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-90"
                                  href={`/docs/sql-review/review-rules#${type}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <ExternalIcon className="h-5 w-5" />
                                </a>
                              </div>
                            </div>

                            <p className="mt-3 text-14 leading-tight tracking-tight text-gray-40">
                              {en.rule[key].description}
                            </p>
                            {componentList?.length > 0 && (
                              <div className="mt-5">
                                {componentList.map((config, index) => {
                                  const defaultPayload =
                                    config.payload.type === 'STRING_ARRAY'
                                      ? config.payload.default.join(', ')
                                      : config.payload.default.toString();

                                  return (
                                    <div className="text-14" key={index}>
                                      <span className="leading-none text-gray-40">
                                        {en.rule[key].component[config.key].title}
                                      </span>
                                      : <span>{config.payload.value || defaultPayload}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <span className="mt-20 inline-flex w-full items-center border-t border-gray-90 pt-8 text-18 font-medium leading-none">
            Made by{' '}
            <img
              className="mx-2"
              src="/images/logo-full.svg"
              width={96}
              height={20}
              loading="lazy"
            />
            at {format(new Date(), 'yyyy-MM-dd')}
          </span>
        </article>
        <FilterBar
          schema={schema}
          template={template}
          templateList={templateList}
          setTemplate={setTemplate}
          setCategoryList={setCategoryList}
        />
      </div>
    </section>
  );
};

export default GuideLayout;
