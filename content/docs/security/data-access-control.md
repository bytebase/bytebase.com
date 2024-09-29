---
title: Data Access Control
feature_name: DATA_ACCESS_CONTROL
---

<TutorialBlock url="/docs/tutorials/how-to-manage-data-access-for-developers" title="How to Manage Data Access for Developers" />

Data Access Control restricts how the users access and export the data. `Workspace Admin` or `DBA` are exempt from these restrictions. `Project Owner` is also exempt from these restrictions for all the databases under that project. Below shows the detailed built-in roles' query and export permissions.

| Role              | Query | Export |
| ----------------- | ----- | ------ |
| Workspace Admin   | ✅    | ✅     |
| Workspace DBA     | ✅    | ✅     |
| Project Owner     | ✅    | ✅     |
| Project Developer |       |        |
| Project Querier   | ✅    |        |
| Project Exporter  |       | ✅     |
| Project Releaser  |       |        |
| Project Viewer    |       |        |

If you want to create [custom roles](/docs/administration/custom-roles/), include `databases.query`, `databases.export` permissions.

## Query permission

Query permission controls whether the users can query the data from the SQL Editor. Check [Data Query](/docs/security/data-query/).

## Export permission

Export permission controls whether the users can export the data from the SQL Editor. Check [Data Export](/docs/security/data-export/).
