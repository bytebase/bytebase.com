---
title: Environment Tier
---

<EnterpriseOnlyBlock />

For production environments, extra care should be taken. Bytebase allows marking such an environment as a production environment. Workspace OWNER or DBA can configure this under the Environment Tier section from the environment detail page.

When an environment is marked as a production environment, a shield indicator will appear before the environment label. It lets users know that it is a production environment.

See the following example, the environment “Prod” is marked as a production environment. You can find the shield indicator on different pages.

![tier-envs](/content/docs/administration/tier/env-tier-envs.webp)

![tier-issue-details](/content/docs/administration/tier/env-tier-issue-details.webp)

A caution notice will also appear at the top of the SQL Editor when you connect to an instance in a production environment.

![tier-editor](/content/docs/administration/tier/env-tier-editor.webp)

By default, instances and databases in a production environment will be inaccessible to workspace developers. Workspace owners and DBAs can configure some databases as accessible to developers via [Data Access Control](/docs/security/data-access-control).
