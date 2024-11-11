---
title: Database Permission
feature_name: DATABASE_PERMISSION
---

<TutorialBlock url="/docs/tutorials/how-to-manage-data-access-for-developers" title="How to Manage Data Access for Developers" />

Database permission controls individual users' or groups' actions within the database. Below shows the built-in roles' database permissions.

| Role              | EXPLAIN | Query | Export | Data-modifying DML | DDL | Admin |
| ----------------- | ------- | ----- | ------ | ------------------ | --- | ----- |
| Workspace Admin   | ✅      | ✅    | ✅     | ✅                 | ✅  | ✅    |
| Workspace DBA     | ✅      | ✅    | ✅     | ✅                 | ✅  | ✅    |
| Project Owner     | ✅      | ✅    | ✅     | ✅                 | ✅  | ✅    |
| Project Developer |         |       |        | ✅                 | ✅  | ✅    |
| Project Querier   |         | ✅    |        |                    |     |       |
| Project Exporter  |         |       | ✅     |                    |     |       |
| Project Releaser  |         |       |        |                    |     |       |
| Project Viewer    |         |       |        |                    |     |       |

You can also pick out specific permissions to build [custom roles](/docs/administration/custom-roles/). e.g. create a custom role that grants only the [EXPLAIN](/docs/security/database-permission/explain/) permission.

<IncludeBlock url="/docs/share/database-permission-table"></IncludeBlock>
