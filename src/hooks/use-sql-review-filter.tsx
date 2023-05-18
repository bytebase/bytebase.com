import { useCallback } from 'react';

import { getFilterOptionList } from '@/utils/sql-review';

import { ActiveFilters, FilterItem, GuidelineTemplate } from '@/types/sql-review';

const useSQLReviewFilter = ({
  templateList,
  activeFilters,
  setActiveFilters,
}: {
  templateList: GuidelineTemplate[];
  activeFilters: ActiveFilters;
  setActiveFilters: (filter: ActiveFilters) => void;
}) => {
  const filterOptionList = getFilterOptionList(activeFilters.template.ruleList);

  const onTemplateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const id = event.target.id;

      templateList.find((item) => {
        if (item.id === id) {
          const newTemplate = item;

          setActiveFilters({
            ...activeFilters,
            template: newTemplate,
          });
        }
      });
    },
    [activeFilters, setActiveFilters, templateList],
  );

  const onCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const id = event.target.id;
      const type = event.target.name;
      const checked = event.target.checked;

      setActiveFilters({
        ...activeFilters,
        categories: checked
          ? [...activeFilters.categories, { id, type, checked }]
          : activeFilters.categories.filter((item) => item.id !== id),
      });
    },
    [activeFilters, setActiveFilters],
  );

  const filterItemCount = useCallback(
    (filter: FilterItem) => {
      return activeFilters.template.ruleList.filter((r) => {
        return (
          (filter.type === 'level' && filter.id === r.level) ||
          (filter.type === 'engine' && r.engineList.some((engine) => engine === filter.id))
        );
      }).length;
    },
    [activeFilters.template.ruleList],
  );

  return {
    filterOptionList,
    onTemplateChange,
    onCategoryChange,
    filterItemCount,
  };
};

export default useSQLReviewFilter;
