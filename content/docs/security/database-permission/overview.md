---
title: Database Permission
feature_name: DATABASE_PERMISSION
---

<TutorialBlock url="/docs/tutorials/how-to-manage-data-access-for-developers" title="How to Manage Data Access for Developers" />

Database permission controls individual users' or groups' actions within the database. Below shows the built-in roles' database permissions.

| Role              | EXPLAIN | Query | Export |
| ----------------- | ------- | ----- | ------ |
| Workspace Admin   | ✅      | ✅    | ✅     |
| Workspace DBA     | ✅      | ✅    | ✅     |
| Project Owner     | ✅      | ✅    | ✅     |
| Project Developer |         |       |        |
| Project Querier   | ✅      | ✅    |        |
| Project Exporter  |         |       | ✅     |
| Project Releaser  |         |       |        |
| Project Viewer    |         |       |        |

You can also pick out specific permissions to build [custom roles](/docs/administration/custom-roles/).

| Permission               | Action                                               |
| ------------------------ | ---------------------------------------------------- |
| `databases.queryExplain` | [EXPLAIN](/docs/security/explain/)                   |
| `databases.query`        | [Query](/docs/security/database-permission/query/)   |
| `databases.export`       | [Export](/docs/security/database-permission/export/) |
