import { RuleLevel } from '@/utils/sql-review';

// The category type for rule template
export type CategoryType =
  | 'ENGINE'
  | 'NAMING'
  | 'STATEMENT'
  | 'TABLE'
  | 'COLUMN'
  | 'SCHEMA'
  | 'DATABASE'
  | 'INDEX'
  | 'SYSTEM';

type Payload<N, T> = {
  type: N;
  default: T;
  value?: T;
};

type RuleConfigComponent = {
  type: string;
  key: string;
  payload:
    | Payload<'STRING', string>
    | Payload<'NUMBER', number>
    | Payload<'STRING_ARRAY', string[]>
    | Payload<'BOOLEAN', boolean>
    | (Payload<'TEMPLATE', string> & { templateList: string[] });
};

export type FilterItem = {
  id: string;
  type: 'engine' | 'level';
  checked: boolean;
};

export type GuidelineTemplate = {
  id: string;
  ruleList: RuleTemplate[];
};

export type RuleCategory = {
  id: CategoryType;
  ruleList: RuleTemplate[];
};

export type RuleTemplate = {
  type: string;
  category: CategoryType;
  engineList: string[];
  componentList: RuleConfigComponent[];
  level: keyof typeof RuleLevel;
};

export type ActiveFilters = {
  template: GuidelineTemplate;
  categories: (FilterItem | { id: string; type: string; checked: boolean })[];
};
