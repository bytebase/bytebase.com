---
title: Environment Policy
---

## Statement execution mode

Even if you have `sql.dml` and `sql.ddl` [database permissions](/docs/security/database-permission/overview/), you can only run read-only statements such as `SELECT` in SQL Editor by default. If you attempt to run mutation DML or DDL, it will prompt you to submit an issue.

![prompt-issue](/content/docs/administration/environment-policy/prompt-issue.webp)

If you want to run those statements directly in SQL Editor, you need to turn on the **statement execution** setting.

![statement-execution](/content/docs/administration/environment-policy/statement-execution.webp)

## Environment tier

<PricingPlanBlock feature_name='ENVIRONMENT_TIER' />

### Environment color

You can configure any color for an environment either by inputting in **HEX** tab or choosing one in the palette.

![env-color](/content/docs/administration/environment-policy/env-color.webp)

SQL Editor then displays the configured color tab.

![env-color-sql-editor](/content/docs/administration/environment-policy/env-color-sql-editor.webp)

### Production indicator

Once you mark an environment as a production environment, Bytebase will attach a shield icon 🛡️ besides the environment name.

![tier-envs](/content/docs/administration/environment-policy/tier-envs.webp)
