'use client';

import { JSXElementConstructor, useState } from 'react';

import translationEn from '@/locales/sql-review/en.json';
import { convertToCategoryList, getRuleLocalizationKey } from '@/utils/sql-review';
import clsx from 'clsx';

import Link from '@/components/shared/link';

import { RuleCategory } from '@/types/sql-review';

import MySQLIcon from '@/svgs/aurora.inline.svg';
import ExternalIcon from '@/svgs/external-sm.inline.svg';
import PostgresIcon from '@/svgs/postgres.inline.svg';
import TidbIcon from '@/svgs/tidb.inline.svg';

const icons: Record<string, JSXElementConstructor<{ key: string; className: string }>> = {
  MYSQL: MySQLIcon,
  TIDB: TidbIcon,
  POSTGRES: PostgresIcon,
};

type JSONStructure = { [key: string]: string | JSONStructure | any };

const en: JSONStructure = translationEn;
//TODO: refactor divide this component to 3
const GuideLayout = ({ templateList, schema }: { templateList: RuleCategory[]; schema: any }) => {
  const [template, setTemplate] = useState(templateList[0]);
  const [categoryList, setCategoryList] = useState(
    convertToCategoryList(schema, template.ruleList),
  );

  const onTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    templateList.find((item) => {
      if (item.id === id) {
        const newTemplate = item;
        setTemplate(newTemplate);
        setCategoryList(convertToCategoryList(schema, newTemplate.ruleList));
      }
    });
  };

  return (
    <section className="guide-layout container mt-11">
      <div className="gap-x-grid grid grid-cols-12 border-t border-gray-90 pt-16">
        <aside className="col-span-3">
          <h3 className="text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
            Rules
          </h3>
          <ul className="mt-10 flex flex-col gap-y-11 border-l border-gray-90 pl-5">
            {categoryList.map(({ id, ruleList }) => {
              const lowerCaseId: string = id.toLocaleLowerCase();

              return (
                <li key={id}>
                  <h4 className="text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
                    {en.category[lowerCaseId]}
                  </h4>
                  <ul className="mt-4">
                    {ruleList.map(({ type }) => {
                      const key: string = getRuleLocalizationKey(type);

                      return (
                        <li className="group" key={type}>
                          <Link
                            className="py-[5px] text-14 leading-tight tracking-tight text-gray-40 group-first:pt-0 group-last:pb-0"
                            href="#"
                          >
                            {en.rule[key].title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </aside>
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
                    {ruleList.map(({ type, category, engineList, componentList, level }) => {
                      const key: string = getRuleLocalizationKey(type);
                      //FIXME: use proper ts type
                      const lowerCaseLevel: string = (
                        level as unknown as string
                      ).toLocaleLowerCase();

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
                                <h4 className="mt-2 text-18 font-medium leading-none text-gray-15">
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
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </article>
        <div className="col-span-3">
          {templateList.length > 0 && (
            <div className="border-l border-gray-90 pl-5">
              <h3 className="text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
                Template
              </h3>
              <ul className="mt-5 flex flex-col gap-y-4">
                {templateList.map(({ id }) => {
                  const key: string = getRuleLocalizationKey(id);
                  return (
                    <li className="flex cursor-pointer items-center" key={id}>
                      <input
                        type="radio"
                        name="template"
                        id={id}
                        value={id}
                        checked={template.id === id}
                        onChange={onTemplateChange}
                      />
                      <label className="ml-2 font-medium text-gray-30" htmlFor={id}>
                        {en.template[key]}
                      </label>
                    </li>
                  );
                })}
              </ul>

              <h3 className="mt-10 text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
                Category
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GuideLayout;
