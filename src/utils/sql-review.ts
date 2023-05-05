import translationEn from '@/locales/sql-review/en.json';

import { CategoryType, RuleCategory, RuleTemplate } from '@/types/sql-review';

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
