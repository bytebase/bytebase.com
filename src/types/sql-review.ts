import { RuleLevel } from '@/utils/sql-review';

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
  id: string;
  ruleList: RuleTemplate[];
};

export type RuleTemplate = {
  type: string;
  category: string;
  engineList: string[];
  componentList?: RuleConfigComponent[];
  level: keyof typeof RuleLevel;
};

export type ActiveFilters = {
  template: GuidelineTemplate;
  categories: (FilterItem | { id: string; type: string; checked: boolean })[];
};
