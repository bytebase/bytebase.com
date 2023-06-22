export type CategoryType = 'MariaDB' | 'GitHub';

export type IntegrationCategory = {
  id: CategoryType;
};

export type FilterItem = {
  id: string;
  type: 'engine' | 'level';
  checked: boolean;
};

export type ActiveFilters = {
  categories: (FilterItem | { id: string; type: string; checked: boolean })[];
};

export type Tutorial = {
  letter: string;
  list: Glossary[];
};
