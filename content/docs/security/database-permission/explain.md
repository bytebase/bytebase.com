---
title: EXPLAIN Query
---

You may only want to allow your developers to run EXPLAIN to debug slow queries, while disallow them
to query the actual data.

To achieve this, you can create a [custom role](/docs/administration/custom-roles/) with
a single `databases.queryExplain` permission.

![project-exporter-grant](/content/docs/security/database-permission/explain/custom-role.webp)

Then go to the project members page and grant this custom role to your users/groups.

![project-exporter-grant](/content/docs/security/database-permission/explain/project-grant.webp)
