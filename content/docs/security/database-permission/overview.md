---
title: Database Permission
feature_name: DATABASE_PERMISSION
---

<TutorialBlock url="/docs/tutorials/how-to-manage-data-access-for-developers" title="How to Manage Data Access for Developers" />

Database permission controls individual users' or groups' actions within the database. Below shows the built-in roles' database permissions.

| Role              | Query | Export | EXPLAIN |
| ----------------- | ----- | ------ | ------- |
| Workspace Admin   | ✅    | ✅     | ✅      |
| Workspace DBA     | ✅    | ✅     | ✅      |
| Project Owner     | ✅    | ✅     | ✅      |
| Project Developer |       |        |         |
| Project Querier   | ✅    |        |         |
| Project Exporter  |       | ✅     |         |
| Project Releaser  |       |        |         |
| Project Viewer    |       |        |         |

You can also pick out specific permissions to build [custom roles](/docs/administration/custom-roles/).

| Action                                                 | Permission               |
| ------------------------------------------------------ | ------------------------ |
| [Query](/docs/security/database-permission/query/)     | `databases.query`        |
| [Export](/docs/security/database-permission/export/)   | `databases.export`       |
| [EXPLAIN](/docs/security/database-permission/explain/) | `databases.queryExplain` |
