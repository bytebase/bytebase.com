import { useRef, useState } from 'react';

import useClickOutside from '@/hooks/use-click-outside';
import useSQLReviewFilter from '@/hooks/use-sql-review-filter';
import { en, getRuleLocalizationKey } from '@/utils/sql-review';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import { ActiveFilters, GuidelineTemplate } from '@/types/sql-review';

import CloseIcon from '@/svgs/close.inline.svg';

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

const Chevron = ({ isOpen }: { isOpen: boolean }) => (
  <span className="relative">
    <span
      className={clsx(
        'absolute -left-3 top-1/2 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
        isOpen ? 'rotate-45' : 'rotate-[135deg]',
      )}
    />
    <span
      className={clsx(
        'absolute -left-[7px] top-1/2 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
        isOpen ? '-rotate-45' : '-rotate-[135deg]',
      )}
    />
  </span>
);

const DropdownFilterBar = ({
  className,
  templateList,
  activeFilters,
  setActiveFilters,
}: {
  className: string;
  templateList: GuidelineTemplate[];
  activeFilters: ActiveFilters;
  setActiveFilters: (filter: ActiveFilters) => void;
}) => {
  const templateRef = useRef<HTMLFieldSetElement | null>(null);
  const categoryRef = useRef<HTMLFieldSetElement | null>(null);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { filterOptionList, onTemplateChange, onCategoryChange, filterItemCount } =
    useSQLReviewFilter({
      templateList,
      activeFilters,
      setActiveFilters,
    });

  useClickOutside([templateRef], () => {
    setIsTemplateOpen(false);
  });

  useClickOutside([categoryRef], () => {
    setIsCategoryOpen(false);
  });

  return (
    <LazyMotion features={domAnimation}>
      <form
        className={clsx(
          'dropdown-filter-bar grid grid-cols-2 gap-x-5 xs:grid-cols-1 xs:gap-y-6',
          className,
        )}
      >
        {/* Template Dropdown filter */}
        <fieldset className="relative w-full" ref={templateRef}>
          <legend className="text-14 font-bold uppercase leading-none tracking-[0.025em] text-gray-15">
            Template
          </legend>
          <button
            className={clsx(
              'group mt-4 flex w-full items-center justify-between rounded-xl border border-gray-70 py-3 pl-5 pr-4 leading-none',
              isTemplateOpen && 'rounded-b-none',
            )}
            type="button"
            onClick={() => setIsTemplateOpen((prev) => !prev)}
          >
            <span className="whitespace-nowrap leading-none text-gray-60">Select a template</span>
            <Chevron isOpen={isTemplateOpen} />
          </button>

          <m.ul
            className={clsx(
              'absolute inset-x-0 z-10 flex flex-col gap-y-4 rounded-b-xl border border-t-0 border-gray-70 bg-white p-5 shadow-[0px_5px_15px_rgba(15,22,36,0.1)]',
              isTemplateOpen ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            initial="hidden"
            animate={isTemplateOpen ? 'visible' : 'hidden'}
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
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <input
                        className="relative h-4 w-4 shrink-0 appearance-none rounded-full border border-gray-30 transition-colors duration-100 after:absolute after:left-1/2 after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white checked:border-primary-1 checked:bg-primary-1"
                        type="radio"
                        name="template"
                        id={id}
                        value={id}
                        checked={activeFilters.template.id === id}
                        onChange={onTemplateChange}
                      />
                      <label className="ml-2 font-medium text-gray-30" htmlFor={id}>
                        {en.template[key].split(' ')[0]}
                      </label>
                    </div>
                    <label className="mt-1 block text-14 leading-snug text-gray-30" htmlFor={id}>
                      {en.template[keyDesc]}
                    </label>
                  </div>
                </li>
              );
            })}
          </m.ul>
        </fieldset>

        {/* Category Dropdown filter */}
        <fieldset className="relative w-full" ref={categoryRef}>
          <legend className="text-14 font-bold uppercase leading-none tracking-[0.025em] text-gray-15">
            Category
          </legend>
          <div className="relative mt-4">
            <button
              className={clsx(
                'group flex h-10 w-full items-center justify-between overflow-hidden rounded-xl border border-gray-70 pl-5 pr-4',
                isCategoryOpen && 'rounded-b-none',
              )}
              type="button"
              onClick={() => setIsCategoryOpen((prev) => !prev)}
            >
              <span
                className={clsx(
                  'w-full pr-12 text-left transition-colors duration-200 line-clamp-1',
                  activeFilters.categories.length > 0 ? 'text-gray-15' : 'text-gray-60',
                )}
              >
                {activeFilters.categories.length > 0
                  ? activeFilters.categories
                      .map(({ id, type }) => en[type][id.toLocaleLowerCase()])
                      .join(', ')
                  : 'Select a category'}
              </span>
              <Chevron isOpen={isCategoryOpen} />
            </button>
            {activeFilters.categories.length > 0 && (
              <button
                className="absolute right-12 top-2 flex h-6 w-6 items-center justify-center"
                type="button"
                onClick={() => setActiveFilters({ ...activeFilters, categories: [] })}
              >
                <CloseIcon className="h-3.5 w-3.5 text-gray-15" />
              </button>
            )}
          </div>

          <m.ul
            className={clsx(
              'absolute inset-x-0 flex flex-col gap-y-4 rounded-b-xl border border-t-0 border-gray-70 bg-white p-5 shadow-[0px_5px_15px_rgba(15,22,36,0.1)]',
              isCategoryOpen ? 'pointer-events-auto' : 'pointer-events-none',
            )}
            initial="hidden"
            animate={isCategoryOpen ? 'visible' : 'hidden'}
            variants={variants}
            transition={{
              duration: 0.2,
            }}
          >
            {filterOptionList.map((filter) => {
              const { id, type } = filter;
              const key: string = id.toLocaleLowerCase();

              if (filterItemCount(filter) === 0) return null;

              return (
                <li className="flex items-center" key={id}>
                  <input
                    className="h-4 w-4 appearance-none rounded-sm border border-gray-30 bg-center bg-no-repeat transition-colors duration-100 checked:border-primary-1 checked:bg-primary-1 checked:bg-[url('/images/check-checkbox.svg')]"
                    type="checkbox"
                    name={type}
                    id={id}
                    value={id}
                    checked={activeFilters.categories.some((cat) => cat.id === id)}
                    onChange={onCategoryChange}
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
