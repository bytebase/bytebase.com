import useSQLReviewFilter from '@/hooks/use-sql-review-filter';
import { en, getRuleLocalizationKey } from '@/utils/sql-review';

import { GuidelineTemplate, RuleCategory } from '@/types/sql-review';

import InfoIcon from '@/svgs/info.inline.svg';

const FilterBar = ({
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
  const { filterOptionList, onTemplateChange, onFilterChange, filterItemCount } =
    useSQLReviewFilter({
      template,
      templateList,
      setTemplate,
      schema,
      setCategoryList,
    });
  return (
    <form className={className}>
      <div className="space-y-10 border-l border-gray-90 pl-5">
        {templateList.length > 0 && (
          <fieldset>
            <legend className="text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
              Template
            </legend>
            <ul className="mt-5 flex flex-col gap-y-4">
              {templateList.map(({ id }) => {
                const key: string = getRuleLocalizationKey(id);
                return (
                  <li className="flex cursor-pointer items-center" key={id}>
                    <input
                      className="relative h-4 w-4 appearance-none rounded-full border border-gray-30 transition-colors duration-100 after:absolute after:top-1/2 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white checked:border-primary-1 checked:bg-primary-1"
                      type="radio"
                      name="template"
                      id={id}
                      value={id}
                      checked={template.id === id}
                      onChange={onTemplateChange}
                    />
                    <label className="ml-2 font-medium text-gray-30" htmlFor={id}>
                      {en.template[key].split(' ')[0]}
                    </label>
                    <div className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-94">
                      <InfoIcon className="h-2.5 w-auto rotate-180" />
                    </div>
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
            </ul>
          </fieldset>
        )}
      </div>
    </form>
  );
};

export default FilterBar;
