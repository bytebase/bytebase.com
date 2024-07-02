import { RuleLevel } from '@/utils/sql-review';
import fs from 'fs';
import jsYaml from 'js-yaml';
import path from 'path';

import { GuidelineTemplate, RawRuleTemplate, RuleTemplate } from '@/types/sql-review';

export const sqlReviewSchema: any = jsYaml.load(
  fs.readFileSync(path.resolve(`data/sql-review/sql-review-schema.yaml`), 'utf8'),
);

const sqlReviewProdTemplate = jsYaml.load(
  fs.readFileSync(path.resolve(`data/sql-review/sql-review.prod.yaml`), 'utf8'),
);

const sqlReviewDevTemplate = jsYaml.load(
  fs.readFileSync(path.resolve(`data/sql-review/sql-review.dev.yaml`), 'utf8'),
);

// Build the frontend template list based on schema and template.
export const getGuidelineTemplateList = (): GuidelineTemplate[] => {
  const ruleSchemaMap = (sqlReviewSchema as RawRuleTemplate[]).reduce((map, ruleSchema) => {
    if (!map.has(ruleSchema.type)) {
      map.set(ruleSchema.type, {
        ...ruleSchema,
        engineList: [],
      });
    }
    map.get(ruleSchema.type)?.engineList.push(ruleSchema.engine);
    return map;
  }, new Map<string, RuleTemplate>());
  const templateList = [sqlReviewProdTemplate, sqlReviewDevTemplate] as {
    id: string;
    ruleList: {
      type: string;
      level: keyof typeof RuleLevel;
      payload?: { [key: string]: any };
    }[];
  }[];

  return templateList.map((template) => {
    const ruleList: RuleTemplate[] = [];

    for (const rule of template.ruleList) {
      const ruleTemplate = ruleSchemaMap.get(rule.type);
      if (!ruleTemplate) {
        continue;
      }

      // Using template rule payload to override the component list.
      const componentList =
        ruleTemplate.componentList?.map((component) => {
          if (rule.payload && rule.payload[component.key]) {
            return {
              ...component,
              payload: {
                ...component.payload,
                default: rule.payload[component.key],
              },
            };
          }
          return component;
        }) ?? [];
      ruleList.push({
        ...ruleTemplate,
        level: rule.level,
        componentList,
      });
    }

    return {
      id: template.id,
      ruleList,
    };
  });
};
