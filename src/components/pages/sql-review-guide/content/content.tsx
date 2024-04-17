import { en, getRuleLocalizationKey } from '@/utils/sql-review';
import clsx from 'clsx';
import format from 'date-fns/format';

import { RuleCategory } from '@/types/sql-review';

import MySQLIcon from '@/svgs/aurora.inline.svg';
import ExternalIcon from '@/svgs/external-sm.inline.svg';
import PostgresIcon from '@/svgs/postgres.inline.svg';
import TidbIcon from '@/svgs/tidb.inline.svg';
import OceanBaseIcon from '@/svgs/oceanbase.inline.svg';
import OracleIcon from '@/svgs/oracle.inline.svg';
import SnowflakeIcon from '@/svgs/snowflake.inline.svg';
import MssqlIcon from '@/svgs/mssql.inline.svg';
import MariadbIcon from '@/svgs/mariadb.inline.svg';
import OceanBaseOracleIcon from '@/svgs/oceanbase-oracle.inline.svg';

import { JSXElementConstructor } from 'react';

const icons: Record<string, JSXElementConstructor<{ key: string; className: string }>> = {
  MYSQL: MySQLIcon,
  TIDB: TidbIcon,
  POSTGRES: PostgresIcon,
  OCEANBASE: OceanBaseIcon,
  ORACLE: OracleIcon,
  SNOWFLAKE: SnowflakeIcon,
  MSSQL: MssqlIcon,
  MARIADB: MariadbIcon,
  OCEANBASE_ORACLE: OceanBaseOracleIcon,
};

const EngineList = ({
  className,
  engineList,
  type,
}: {
  className?: string;
  engineList: string[];
  type: string;
}) => (
  <div className={clsx('flex space-x-3', className)}>
    <div
      className={clsx(
        'flex h-10 items-center gap-3 rounded-full border border-gray-90',
        engineList.length === 1 ? 'px-2.5' : 'px-4',
      )}
    >
      {engineList.map((engine) => {
        if (icons[engine]) {
          const Icon = icons[engine];
          return <Icon className="h-5 w-5" key={engine} />;
        }

        return engine;
      })}
    </div>
    <a
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-90 transition-colors duration-200 hover:bg-gray-94"
      href={`/docs/sql-review/review-rules#${type}`}
      target="_blank"
      rel="noreferrer"
    >
      <ExternalIcon className="h-5 w-5" />
    </a>
  </div>
);

const Content = ({
  className,
  categoryList,
}: {
  className: string;
  categoryList: RuleCategory[];
}) => (
  <article className={className}>
    <h2 className="text-44 font-bold leading-extra-tight text-gray-15 lg:text-36 md:text-30">
      Database Review Guide
    </h2>
    <div className="mt-[60px] flex flex-col gap-y-[60px] lg:mt-14 lg:gap-y-14 md:mt-12 md:gap-y-12 xs:mt-8 xs:gap-y-10">
      {categoryList.map(({ id, ruleList }) => {
        const lowerCaseId: string = id.toLocaleLowerCase();
        return (
          <div key={id}>
            <h3 className="text-30 font-semibold leading-tight text-gray-15 lg:text-24 md:text-20 xs:text-18">
              {en.category[lowerCaseId]}
            </h3>
            <ul className="mt-8 lg:mt-6 md:mt-5 xs:mt-4">
              {ruleList.map(({ type, engineList, componentList, level }) => {
                const key: string = getRuleLocalizationKey(type);

                const lowerCaseLevel: string = level.toLocaleLowerCase();
                const anchor = getRuleLocalizationKey(type);

                return (
                  <li
                    className="border-t border-gray-90 pb-8 pt-5 last:pb-0 lg:pb-6 md:pb-5 xs:py-4"
                    key={type}
                  >
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <span
                          className={clsx('text-14 font-medium leading-none', {
                            'text-secondary-4': lowerCaseLevel === 'error',
                            'text-primary-1': lowerCaseLevel === 'warning',
                          })}
                        >
                          {en.level[lowerCaseLevel]}
                        </span>
                        <h4
                          className={clsx(
                            'text-18 font-medium leading-tight text-gray-15',
                            '!-mt-[144px] !pt-[180px] lg:!pt-[168px] md:!pt-[160px]',
                          )}
                          id={anchor}
                        >
                          {en.rule[key].title}
                        </h4>
                      </div>
                      <EngineList className="flex xs:hidden" engineList={engineList} type={type} />
                    </div>

                    <p className="mt-3 text-14 tracking-tight text-gray-40">
                      {en.rule[key].description}
                    </p>
                    {(componentList?.length ?? 0) > 0 && (
                      <div className="mt-5 space-y-2">
                        {(componentList ?? []).map((config, index) => {
                          const defaultPayload =
                            config.payload.type === 'STRING_ARRAY'
                              ? config.payload.default.join(', ')
                              : config.payload.default.toString();

                          return (
                            <div
                              className="break-words text-14 leading-none md:leading-tight"
                              key={index}
                            >
                              <span className="text-gray-40">
                                {en.rule[key].component && en.rule[key].component[config.key].title}
                              </span>
                              : <span>{config.payload.value || defaultPayload}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <EngineList
                      className="mt-4 hidden xs:flex"
                      engineList={engineList}
                      type={type}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
    <span className="mt-20 inline-flex w-full items-center border-t border-gray-90 pt-8 text-18 font-medium leading-none lg:mt-16 md:mt-12 xs:pt-7 2xs:text-16 3xs:text-14">
      Made by{' '}
      <img
        className="mx-2"
        src="/images/logo.svg"
        width={96}
        height={20}
        loading="lazy"
        alt="Bytebase"
      />
      at {format(new Date(), 'yyyy-MM-dd')}
    </span>
  </article>
);

export default Content;
