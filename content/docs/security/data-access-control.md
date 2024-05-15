---
title: Data Access Control
feature_name: DATA_ACCESS_CONTROL
---

<TutorialBlock url="/docs/tutorials/how-to-manage-data-access-for-developers" title="How to Manage Data Access for Developers" />

Data Access Control restricts how the `Developer` access and export the data. `Workspace Admin` or `DBA` are exempt from these restrictions.

At the project level, the `Project Owner` is also exempt from these restrictions. `Workspace Admin` or `DBA` can configure the following data access control:

- **Query**: query data via [SQL Editor](/docs/sql-editor/overview)
- **Export**: export data by SQL or Database
- **Copy from SQL Editor**: copy data from the query result table in SQL Editor

## How to configure

Within a project, the `Workspace Admin`, `Workspace DBA` or `Project Owner` can configure the following data access control:

1. Click **Members** and then click **Grant Access**.

1. There's a special user called `AllUsers` which represents all users in the workspace. If you assign `Project Querier` role to `AllUsers` with Manually selecting the whole Test database, then all users in the workspace can query data from the Test database without approval. `Project Exporter` is similar.

   ![bb-allusers-test](/content/docs/security/data-access-control/bb-allusers-test.webp)

   For how to request approval, please refer to [Request Query](/docs/security/data-query/) and [Request Export](/docs/security/data-export/).

1. Go to **Environments**, If **Disable copy data from SQL editor** is checked, then no one can copy data from databases belonging to that environment via SQL Editor.

   ![bb-env-ac](/content/docs/security/data-access-control/bb-env-ac.webp)

   ![bb-sql-editor-copy-allow](/content/docs/security/data-access-control/bb-sql-editor-copy-allow.webp)
