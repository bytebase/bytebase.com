---
title: Database Access Control
---

<EnterpriseOnlyBlock />

By default, instances and databases in a [production environment](/docs/administration/environment-policy/tier) will be inaccessible to users with Workspace Developer role from the [SQL Editor](/docs/sql-editor/overview).

For databases in the [production environment](/docs/administration/environment-policy/tier), workspace owners and DBAs can grant database access to workspace developers via **Settings / Workspace / Access Control**.

Click **Add rule**, search and select databases in the production environments.

![setting-add-rule](/content/docs/security/data-access-control/access-control-add-rule.webp)

See the following example, the `employee` database is configured as accessible to developers even if it is in a production environment.

![setting](/content/docs/security/data-access-control/access-control-settings.webp)

Then, developers are allowed to query the `employee` database from the [SQL Editor](/docs/sql-editor/overview).
