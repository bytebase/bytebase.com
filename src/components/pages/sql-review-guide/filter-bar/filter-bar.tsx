import { LEVEL_LIST, convertToCategoryList, en, getRuleLocalizationKey } from '@/utils/sql-review';

import { FilterItem, GuidelineTemplate, RuleCategory, RuleTemplate } from '@/types/sql-review';

import InfoIcon from '@/svgs/info.inline.svg';

const baseFilterOptionList: FilterItem[] = LEVEL_LIST.map((level) => ({
  id: level,
  type: 'level',
  checked: false,
}));

const getFilterOptionList = (ruleList: RuleTemplate[]): FilterItem[] => {
  const engineSet = new Set<string>();
  for (const rule of ruleList) {
    for (const engine of rule.engineList) {
      engineSet.add(engine);
    }
  }
  const engineFilterOptionList: FilterItem[] = Array.from(engineSet.keys()).map((engine) => ({
    id: engine,
    type: 'engine',
    checked: false,
  }));

  return [...engineFilterOptionList, ...baseFilterOptionList];
};

const FilterBar = ({
  template,
  templateList,
  setTemplate,
  schema,
  setCategoryList,
}: {
  template: GuidelineTemplate;
  templateList: GuidelineTemplate[];
  setTemplate: (temp: GuidelineTemplate) => void;
  schema: any;
  setCategoryList: (list: RuleCategory[]) => void;
}) => {
  const filterOptionList = getFilterOptionList(template.ruleList);

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

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const type = event.target.name;
    const checked = event.target.checked;

    const newRuleList = template.ruleList.filter((rule) => {
      return (
        !checked ||
        (type === 'level' && id === (rule.level as unknown as string)) ||
        (type === 'engine' && rule.engineList.some((engine) => engine === id))
      );
    });

    setCategoryList(convertToCategoryList(schema, newRuleList));
  };

  const filterItemCount = (filter: FilterItem) => {
    return template.ruleList.filter((r) => {
      return (
        (filter.type === 'level' && filter.id === (r.level as unknown as string)) ||
        (filter.type === 'engine' && r.engineList.some((engine) => engine === filter.id))
      );
    }).length;
  };

  return (
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
                    className="relative h-4 w-4 appearance-none rounded-full border border-gray-30 transition-colors duration-100 after:absolute after:top-1/2 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white checked:border-primary-1 checked:bg-primary-1"
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
                  <div className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-94">
                    <InfoIcon className="h-2.5 w-auto rotate-180" />
                  </div>
                </li>
              );
            })}
          </ul>

          <h3 className="mt-10 text-14 font-bold uppercase leading-none tracking-[-0.025em] text-gray-15">
            Category
          </h3>
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
        </div>
      )}
    </div>
  );
};

export default FilterBar;
