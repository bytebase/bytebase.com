import { useState } from 'react';

import useSQLReviewFilter from '@/hooks/use-sql-review-filter';
import { en, getRuleLocalizationKey } from '@/utils/sql-review';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import { GuidelineTemplate, RuleCategory } from '@/types/sql-review';

import ChevronIcon from '@/svgs/chevron.inline.svg';

const variants = {
  hidden: {
    opacity: 0,
    y: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};
const DropdownFilterBar = ({
  className,
  template,
  templateList,
  setTemplate,
  schema,
  setCategoryList,
}: {
  className: string;
  template: GuidelineTemplate;
  templateList: GuidelineTemplate[];
  setTemplate: (temp: GuidelineTemplate) => void;
  schema: any;
  setCategoryList: (list: RuleCategory[]) => void;
}) => {
  const [isFilterTemplateOpen, setIsFilterTemplateOpen] = useState(false);
  const [isFilterCategoryOpen, setIsFilterCategoryOpen] = useState(false);
  const { filterOptionList, onTemplateChange, onFilterChange, filterItemCount } =
    useSQLReviewFilter({
      template,
      templateList,
      setTemplate,
      schema,
      setCategoryList,
    });

  return (
    <LazyMotion features={domAnimation}>
      <form className={clsx('dropdown-filter-bar grid grid-cols-2 gap-x-5', className)}>
        <fieldset className="relative w-full">
          <div>
            <legend className="text-14 font-bold uppercase leading-none tracking-[0.025em] text-gray-15">
              Template
            </legend>
            <button
              className={clsx(
                'group mt-4 flex w-full items-center justify-between rounded-xl border border-gray-70 py-3 pl-5 pr-4 leading-none',
                isFilterTemplateOpen && 'rounded-b-none',
              )}
              type="button"
              onClick={() => setIsFilterTemplateOpen((prev) => !prev)}
            >
              <span className="whitespace-nowrap leading-none text-gray-60">Select a template</span>
              <ChevronIcon
                className={clsx(
                  'h-auto w-4 text-gray-15 transition-transform duration-200',
                  isFilterTemplateOpen ? '-rotate-180' : 'rotate-0',
                )}
              />
            </button>
          </div>

          <m.ul
            className="absolute inset-x-0 flex flex-col gap-y-4 rounded-b-xl border border-t-0 border-gray-70 bg-white p-5"
            initial="hidden"
            animate={isFilterTemplateOpen ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
              duration: 0.2,
            }}
          >
            {templateList.map(({ id }) => {
              const key: string = getRuleLocalizationKey(id);
              const keyDesc = key + '-desc';
              return (
                <li className="flex cursor-pointer items-center" key={id}>
                  <div>
                    <input
                      className="relative h-4 w-4 shrink-0 appearance-none rounded-full border border-gray-30 transition-colors duration-100 after:absolute after:top-1/2 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white checked:border-primary-1 checked:bg-primary-1"
                      type="radio"
                      name="template"
                      id={id}
                      value={id}
                      checked={template.id === id}
                      onChange={onTemplateChange}
                    />
                    <label className="ml-2 font-medium leading-none text-gray-30" htmlFor={id}>
                      {en.template[key].split(' ')[0]}
                    </label>
                    <label className="mt-1 block text-14 leading-snug text-gray-30" htmlFor={id}>
                      {en.template[keyDesc]}
                    </label>
                  </div>
                </li>
              );
            })}
          </m.ul>
        </fieldset>

        <fieldset className="relative w-full">
          <legend className="text-14 font-bold uppercase leading-none tracking-[0.025em] text-gray-15">
            Category
          </legend>
          <button
            className={clsx(
              'group mt-4 flex w-full items-center justify-between rounded-xl border border-gray-70 py-3 pl-5 pr-4 leading-none',
              isFilterCategoryOpen && 'rounded-b-none',
            )}
            type="button"
            onClick={() => setIsFilterCategoryOpen((prev) => !prev)}
          >
            <span className="whitespace-nowrap text-gray-60">Select a category</span>
            <ChevronIcon className="h-auto w-4 text-gray-15" />
          </button>

          <m.ul
            className="absolute inset-x-0 flex flex-col gap-y-4 rounded-b-xl border border-t-0 border-gray-70 bg-white p-5"
            initial="hidden"
            animate={isFilterCategoryOpen ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
              duration: 0.2,
            }}
          >
            {filterOptionList.map((filter) => {
              const { id, type } = filter;
              const key: string = id.toLocaleLowerCase();
              return (
                <li className="flex items-center" key={id}>
                  <input
                    className="h-4 w-4 appearance-none rounded-sm border border-gray-30 bg-center bg-no-repeat transition-colors duration-100 checked:border-primary-1 checked:bg-primary-1 checked:bg-[url('/images/check-checkbox.svg')]"
                    type="checkbox"
                    name={type}
                    id={id}
                    value={id}
                    onChange={onFilterChange}
                  />
                  <label className="ml-2 font-medium text-gray-30" htmlFor={id}>
                    {en[type][key]}
                  </label>
                  <span className="ml-2 shrink-0 rounded-full bg-gray-94 p-1 text-14 font-medium leading-none text-gray-30">
                    {filterItemCount(filter)}
                  </span>
                </li>
              );
            })}
          </m.ul>
        </fieldset>
      </form>
    </LazyMotion>
  );
};

export default DropdownFilterBar;
