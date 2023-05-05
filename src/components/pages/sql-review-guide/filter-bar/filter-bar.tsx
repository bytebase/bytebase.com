import { LEVEL_LIST, convertToCategoryList, en, getRuleLocalizationKey } from '@/utils/sql-review';

import { FilterItem, GuidelineTemplate, RuleCategory, RuleTemplate } from '@/types/sql-review';

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

const Checkbox = ({
  filter,
  count,
}: {
  filter: FilterItem;
  count: number;
  isFilteredRule: (rule: RuleTemplate) => boolean;
}) => {
  const { id, type, checked } = filter;
  const key: string = id.toLocaleLowerCase();
  return (
    <li className="flex items-center" key={id}>
      <input type="checkbox" name={type} id={id} value={id} />
      <label className="ml-2 font-medium text-gray-30" htmlFor={id}>
        {en[type][key]}
      </label>
      <span>{count}</span>
    </li>
  );
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
          <ul className="mt-5 flex flex-col gap-y-4">
            {filterOptionList.map((filter) => {
              const { id, type } = filter;
              const key: string = id.toLocaleLowerCase();
              return (
                <li className="flex items-center" key={id}>
                  <input type="checkbox" name={type} id={id} value={id} onChange={onFilterChange} />
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
