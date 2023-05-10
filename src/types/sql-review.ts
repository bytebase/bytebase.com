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

type StringPayload = {
  type: 'STRING';
  default: string;
  value?: string;
};

type NumberPayload = {
  type: 'NUMBER';
  default: number;
  value?: number;
};

type StringArrayPayload = {
  type: 'STRING_ARRAY';
  default: string[];
  value?: string[];
};

type TemplatePayload = {
  type: 'TEMPLATE';
  default: string;
  templateList: string[];
  value?: string;
};

type BooleanPayload = {
  type: 'BOOLEAN';
  default: boolean;
  value?: boolean;
};
type RuleConfigComponent = {
  type: string;
  key: string;
  payload: StringPayload | NumberPayload | TemplatePayload | StringArrayPayload | BooleanPayload;
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
  level: typeof RuleLevel;
};

export type ActiveFilters = {
  template: GuidelineTemplate;
  categories: (FilterItem | { id: string; type: string; checked: boolean })[];
};
