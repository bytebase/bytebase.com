---
title: Environment Policy
---

## Execution Mode

Even if you have `databases.queryDML` and `databases.queryDDL` permissions, you can only run SELECT in [SQL Editor](/docs/sql-editor/overview/) by default. If you attempt to run mutation DML or DDL, it will prompt you to submit an issue.

![prompt-issue](/content/docs/administration/environment-policy/prompt-issue.webp)

If you want to run those statements directly in SQL Editor, you need to turn on the statement execution setting.

![statement-execution](/content/docs/administration/environment-policy/statement-execution.webp)

## Environment Tier

<PricingPlanBlock feature_name='ENVIRONMENT_TIER' />

### Prod Indicator

Bytebase allows attaching a shield icon to an environment to indicate that this environment has been marked as production environment. Workspace admin or DBA can configure this under the Environment Tier section from the environment detail page.

![tier-envs](/content/docs/administration/environment-policy/tier-envs.webp)

### Environment color

You can configure any color for an environment either by inputting in **HEX** tab or choosing one in the palette.

![env-color](/content/docs/administration/environment-policy/env-color.webp)

Click **Update** on bottom right. You'll see your databases in this environment featuring the new environment color on its tab page in SQL Editor.

![env-color-sql-editor](/content/docs/administration/environment-policy/env-color-sql-editor.webp)
