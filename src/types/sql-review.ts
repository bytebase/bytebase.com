export const RuleLevel = {
  DISABLED: 'DISABLED',
  ERROR: 'ERROR',
  WARNING: 'WARNING',
};

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

export type RuleConfigComponent = {
  key: string;
  payload: StringPayload | NumberPayload | TemplatePayload | StringArrayPayload | BooleanPayload;
};
