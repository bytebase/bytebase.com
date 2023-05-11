import { DEV_TEMPLATE, PROD_TEMPLATE, SCHEMA_FILE } from '@/scripts/constants';
import { RuleLevel } from '@/utils/sql-review';
import fs from 'fs';
import jsYaml from 'js-yaml';
import path from 'path';

import { GuidelineTemplate, RuleTemplate } from '@/types/sql-review';

export const sqlReviewSchema: any = jsYaml.load(
  fs.readFileSync(path.resolve(`data/${SCHEMA_FILE}`), 'utf8'),
);

const sqlReviewProdTemplate = jsYaml.load(
  fs.readFileSync(path.resolve(`data/${PROD_TEMPLATE}`), 'utf8'),
);

const sqlReviewDevTemplate = jsYaml.load(
  fs.readFileSync(path.resolve(`data/${DEV_TEMPLATE}`), 'utf8'),
);

// Build the frontend template list based on schema and template.
export const getGuidelineTemplateList = (): GuidelineTemplate[] => {
  const ruleSchemaMap = (sqlReviewSchema.ruleList as RuleTemplate[]).reduce((map, ruleSchema) => {
    map.set(ruleSchema.type, ruleSchema);
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
      const componentList = ruleTemplate.componentList.map((component) => {
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
      });
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
