import { useCallback } from 'react';

import { convertToCategoryList, getFilterOptionList } from '@/utils/sql-review';

import { FilterItem, GuidelineTemplate, RuleCategory } from '@/types/sql-review';

const useSQLReviewFilter = ({
  schema,
  template,
  templateList,
  setTemplate,
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

  const onFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [setCategoryList, template.ruleList],
  );

  const filterItemCount = useCallback(
    (filter: FilterItem) => {
      return template.ruleList.filter((r) => {
        return (
          (filter.type === 'level' && filter.id === (r.level as unknown as string)) ||
          (filter.type === 'engine' && r.engineList.some((engine) => engine === filter.id))
        );
      }).length;
    },
    [template.ruleList],
  );

  return {
    filterOptionList,
    onTemplateChange,
    onFilterChange,
    filterItemCount,
  };
};

export default useSQLReviewFilter;
