---
title: Environment Policy
---

## Execution Mode

Even if you have `databases.queryDML` and `databases.queryDDL` permissions, you can only run SELECT in [SQL Editor](/docs/sql-editor/overview/) by default. If you attempt to run mutation DML or DDL, it will prompt you to submit an issue.

![change-prompt](/content/docs/administration/environment-policy/sql-editor-change-prompt.webp)

If you want to run those statements directly in SQL Editor, you need to turn on the statement execution setting.

![statement-execution](/content/docs/administration/environment-policy/sql-editor-statement-execution.webp)

## Environment Tier

<PricingPlanBlock feature_name='ENVIRONMENT_TIER' />

For production environments, extra care should be taken. Bytebase allows marking such an environment as a production environment. Workspace admin or DBA can configure this under the Environment Tier section from the environment detail page.

When an environment is marked as a production environment, a shield indicator will appear before the environment label. It lets users know that it is a production environment.

See the following example, the environment “Prod” is marked as a production environment. You can find the shield indicator on different pages.

![tier-envs](/content/docs/administration/environment-policy/tier/env-tier-envs.webp)

![tier-issue-details](/content/docs/administration/environment-policy/tier/env-tier-issue-details.webp)

A caution notice will also appear at the top of the SQL Editor when you connect to an instance in a production environment.

![tier-editor](/content/docs/administration/environment-policy/tier/env-tier-editor.webp)

By default, instances and databases in a production environment will be inaccessible to developers. Workspace admins and DBAs can configure some databases as accessible to developers via [Database Permission](/docs/security/database-permission/overview).
