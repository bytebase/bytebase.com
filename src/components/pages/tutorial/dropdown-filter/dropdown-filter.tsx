import { useRef, useState } from 'react';

import useClickOutside from '@/hooks/use-click-outside';
import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';

import CloseIcon from '@/svgs/close.inline.svg';

import { FilterProps } from '../filter/filter';

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
        'absolute top-1/2 -left-3 h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
        isOpen ? 'rotate-45' : 'rotate-[135deg]',
      )}
    />
    <span
      className={clsx(
        'absolute top-1/2 -left-[7px] h-2 w-[1.5px] -translate-y-1/2 bg-current transition-transform duration-200',
        isOpen ? '-rotate-45' : '-rotate-[135deg]',
      )}
    />
  </span>
);

const DropdownFilter = ({
  title,
  className,
  fieldsList,
  activeFilters,
  setActiveFilters,
  toggleFilter,
}: FilterProps & { setActiveFilters: (filters: string[]) => void }) => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useClickOutside([categoryRef], () => {
    setIsCategoryOpen(false);
  });

  return (
    <LazyMotion features={domAnimation}>
      <form
        className={clsx(
          'dropdown-filter grid grid-cols-2 gap-x-5 xs:grid-cols-1 xs:gap-y-6',
          className,
        )}
      >
        <fieldset className="relative z-10 w-full">
          <legend className="text-14 font-bold uppercase leading-none tracking-[0.025em] text-gray-15">
            {title}
          </legend>
          <div className="relative mt-4" ref={categoryRef}>
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
                  activeFilters.length > 0 ? 'text-gray-15' : 'text-gray-60',
                )}
              >
                {activeFilters.length > 0
                  ? activeFilters.join(', ')
                  : `Select a ${title.toLocaleLowerCase()}`}
              </span>
              <Chevron isOpen={isCategoryOpen} />
            </button>
            {activeFilters.length > 0 && (
              <button
                className="absolute top-2 right-12 flex h-6 w-6 items-center justify-center"
                type="button"
                aria-label="clear all filters"
                onClick={() => setActiveFilters([])}
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            )}

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
              {fieldsList.map((filter) => {
                const [name, count] = filter;
                const key: string = name.toLocaleLowerCase() + '-' + count;

                return (
                  <li className="flex items-center gap-x-2" key={key}>
                    <input
                      className="h-4 w-4 appearance-none rounded-sm border border-gray-30 bg-center bg-no-repeat transition-colors duration-100 checked:border-primary-1 checked:bg-primary-1 checked:bg-[url('/images/check-checkbox.svg')]"
                      type="checkbox"
                      name={`${title.toLocaleLowerCase()}[]`}
                      id={key}
                      value={name}
                      checked={activeFilters.includes(name)}
                      onChange={() => toggleFilter(name)}
                    />
                    <label
                      className="flex cursor-pointer items-center gap-x-2 font-medium text-gray-30"
                      htmlFor={key}
                    >
                      {name}
                      {count > 0 && (
                        <span className="flex min-w-[20px] items-center justify-center rounded-full bg-gray-94 px-[5px] pt-1 pb-0.5 text-14 font-medium leading-none text-gray-30">
                          {count}
                        </span>
                      )}
                    </label>
                  </li>
                );
              })}
            </m.ul>
          </div>
        </fieldset>
      </form>
    </LazyMotion>
  );
};

export default DropdownFilter;
