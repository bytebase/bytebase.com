import { useCallback } from 'react';

import { ActiveFilters } from '@/types/tutorial';

const useIntegrationFilter = ({
  activeFilters,
  setActiveFilters,
}: {
  activeFilters: ActiveFilters;
  setActiveFilters: (filter: ActiveFilters) => void;
}) => {
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
  return {
    onCategoryChange,
  };
};

export default useIntegrationFilter;
