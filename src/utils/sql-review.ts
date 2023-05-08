import translationEn from '@/locales/sql-review/en.json';

import { CategoryType, FilterItem, RuleCategory, RuleTemplate } from '@/types/sql-review';

export const getRuleLocalizationKey = (type: string): string => {
  return type.split('.').join('-');
};

export const convertToCategoryList = (
  sqlReviewSchema: {
    categoryList: CategoryType[];
  },
  ruleList: RuleTemplate[],
): RuleCategory[] => {
  const categoryList = sqlReviewSchema.categoryList;
  const categoryOrder = categoryList.reduce((map, category, index) => {
    map.set(category, index);
    return map;
  }, new Map<CategoryType, number>());

  const dict = ruleList.reduce((dictionary, rule) => {
    if (!dictionary[rule.category]) {
      dictionary[rule.category] = {
        id: rule.category,
        ruleList: [],
      };
    }
    dictionary[rule.category].ruleList.push(rule);
    return dictionary;
  }, {} as { [key: string]: RuleCategory });

  return Object.values(dict).sort(
    (c1, c2) =>
      (categoryOrder.get(c2.id as CategoryType) || 0) -
      (categoryOrder.get(c1.id as CategoryType) || 0),
  );
};

export const RuleLevel = {
  DISABLED: 'DISABLED',
  ERROR: 'ERROR',
  WARNING: 'WARNING',
};

export const LEVEL_LIST = [RuleLevel.ERROR, RuleLevel.WARNING, RuleLevel.DISABLED];

export type JSONStructure = { [key: string]: string | JSONStructure | any };

export const en: JSONStructure = translationEn;

const baseFilterOptionList: FilterItem[] = LEVEL_LIST.map((level) => ({
  id: level,
  type: 'level',
  checked: false,
}));

export const getFilterOptionList = (ruleList: RuleTemplate[]): FilterItem[] => {
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
