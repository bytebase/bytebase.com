import Link from '@/components/shared/link';

import Route from '@/lib/route';

import ExternalLinkIcon from '@/svgs/external-square.inline.svg';
import clsx from 'clsx';

const ITEMS = [
  {
    title: 'SQL Review',
    url: Route.DOCS_SQL_REVIEW,
  },
  {
    title: 'Change Propagation & Rollback',
    url: Route.DOCS_CHANGE_DATABASE,
  },
  {
    title: 'SQL Editor',
    url: Route.DOCS_SQL_EDITOR,
  },
  {
    title: 'Dynamic Data Masking',
    url: Route.DOCS_DATA_MASKING,
  },
  {
    title: 'Data Access Control',
    url: Route.DOCS_DATA_ACCESS_CONTROL,
  },
  {
    title: 'GitOps',
    url: Route.DOCS_VCS_INTEGRATION,
  },
  {
    title: 'Batch Change',
    url: Route.DOCS_BATCH_CHANGE,
  },
  {
    title: 'Schema Synchronization',
    url: Route.DOCS_SCHEMA_SYNC,
  },
  {
    title: 'Index Advisor',
    url: Route.DOCS_INDEX_ADVISOR,
  },
  {
    title: 'Online Schema Change',
    url: Route.DOCS_ONLINE_SCHEMA_CHANGE,
  },
  {
    title: 'RBAC',
    url: Route.DOCS_RBAC,
  },
  {
    title: 'SSO',
    url: Route.DOCS_SSO,
  },
];

const Features = ({ className }: { className?: string }) => {
  return (
    <section
      className={clsx(
        'col-span-6 col-start-4 xl:col-span-8 xl:col-start-3 md:col-span-full',
        className,
      )}
    >
      <h2 className="text-44 font-bold leading-extra-tight xl:text-36 md:text-30">Features</h2>
      <ul className="mt-11 grid grid-cols-2 gap-10 2xl:gap-9 xl:mt-10 xl:gap-6 md:mt-9 md:gap-5 sm:mt-6 sm:gap-3">
        {ITEMS.map(({ title, url }, index) => {
          return (
            <li className="sm:col-span-full" key={index}>
              <Link
                href={url}
                className="group flex h-[61px] items-center justify-between border border-gray-90 px-4 py-5 hover:border-gray-60 2xl:h-[63px] xl:h-[62px] xl:pr-3"
              >
                <span className="text-20 font-semibold leading-tight 2xl:text-18 xl:text-16 xl:leading-snug">
                  {title}
                </span>
                <span className="flex items-center gap-x-1.5 text-14 leading-none text-gray-40 group-hover:text-gray-15">
                  More
                  <ExternalLinkIcon className="w-[13px]" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Features;
