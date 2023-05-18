import useSQLReviewFilter from '@/hooks/use-sql-review-filter';
import { en, getRuleLocalizationKey } from '@/utils/sql-review';

import Tooltip from '@/components/shared/tooltip';

import { ActiveFilters, GuidelineTemplate } from '@/types/sql-review';

import ExternalIcon from '@/svgs/external-sm.inline.svg';
import DownloadIcon from '@/svgs/download.inline.svg';
import Route from '@/lib/route';
import Link from '@/components/shared/link';

const FilterBar = ({
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
  const { filterOptionList, onTemplateChange, onCategoryChange, filterItemCount } =
    useSQLReviewFilter({
      templateList,
      activeFilters,
      setActiveFilters,
    });
  return (
    <div className={className}>
      <form>
        <div className="space-y-10 border-l border-gray-90 pl-5 pb-8">
          {templateList.length > 0 && (
            <fieldset>
              <legend className="text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
                Template
              </legend>
              <ul className="mt-5 flex flex-col gap-y-4">
                {templateList.map(({ id }) => {
                  const key: string = getRuleLocalizationKey(id);
                  return (
                    <li className="flex items-center" key={id}>
                      <label className="group flex items-center">
                        <input
                          className="relative h-4 w-4 appearance-none rounded-full border border-gray-30 transition-colors duration-100 after:absolute after:top-1/2 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white checked:border-primary-1 checked:bg-primary-1 hover:after:h-2 hover:after:w-2"
                          type="radio"
                          name={id}
                          id={id}
                          value={id}
                          checked={activeFilters.template.id === id}
                          onChange={onTemplateChange}
                        />
                        <span className="ml-2 font-medium text-gray-30 group-hover:text-gray-60">
                          {en.template[key].split(' ')[0]}
                        </span>
                      </label>
                      <Tooltip text={en.template[`${key}-desc`]} />
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          )}
          {filterOptionList.length > 0 && (
            <fieldset>
              <legend className="mt-10 text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
                Category
              </legend>
              <ul className="mt-5 flex flex-col gap-y-4">
                {filterOptionList.map((filter) => {
                  const { id, type } = filter;
                  const key: string = id.toLocaleLowerCase();

                  if (filterItemCount(filter) === 0) return null;

                  return (
                    <li className="flex items-center" key={id}>
                      <label className="group flex items-center">
                        <input
                          className="h-4 w-4 appearance-none rounded-sm border border-gray-30 bg-center bg-no-repeat transition-colors duration-100 checked:border-primary-1 checked:bg-primary-1 checked:bg-[url('/images/check-checkbox.svg')]"
                          type="checkbox"
                          name={type}
                          id={key}
                          value={id}
                          onChange={onCategoryChange}
                        />
                        <span className="ml-2 font-medium text-gray-30 group-hover:text-gray-60">
                          {en[type][key]}
                        </span>
                      </label>
                      <span className="ml-2 shrink-0 rounded-full bg-gray-94 p-1 text-14 font-medium leading-none text-gray-30">
                        {filterItemCount(filter)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          )}
        </div>
      </form>
      <div className="ml-5 -mt-px border-t border-gray-90 pt-8">
        <a
          href="/download/sql-review.yml"
          download="sql-review.yml"
          className="inline-flex items-center gap-2 font-medium text-gray-30 hover:text-gray-60"
        >
          <DownloadIcon width={18} height={18} />
          Download as YAML
        </a>
        <p className="mt-2.5 text-14 leading-normal text-gray-40">
          Use the YAML file with
          <br />
          <Link
            href={Route.SQL_GITHUB_APP}
            className="inline-flex items-center underline hover:text-gray-60"
            target="blank"
          >
            SQL Review Github Action
            <ExternalIcon className="mt-0.5 ml-1" width={14} height={14} />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FilterBar;
