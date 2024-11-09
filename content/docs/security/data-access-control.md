---
title: Data Access Control
feature_name: DATA_ACCESS_CONTROL
---

<TutorialBlock url="/docs/tutorials/how-to-manage-data-access-for-developers" title="How to Manage Data Access for Developers" />

Data Access Control restricts how the users access and export the data. `Workspace Admin` or `DBA` are exempt from these restrictions. `Project Owner` is also exempt from these restrictions for all the databases under that project. Below shows the detailed built-in roles' database permissions.

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

| Permission               | Action                                |
| ------------------------ | ------------------------------------- |
| `databases.queryExplain` | [EXPLAIN](/docs/security/explain/)    |
| `databases.query`        | [Query](/docs/security/data-query/)   |
| `databases.export`       | [Export](/docs/security/data-export/) |
