---
title: Data Access Control
---

<EnterpriseOnlyBlock />

<TutorialBlock url="/docs/tutorials/how-to-manage-data-access-for-developers" title="How to Manage Data Access for Developers" />

Data Access Control restricts how the `Workspace Developer` access and export the data. `Workspace Owner` or `DBA` are exempt from these restrictions.

At the project level, a `Workspace Developer` can be a `Project Owner` or `Project Developer`. The
`Project Owner` is also exempt from these restrictions. And for `Project Developer`, `Workspace Owner` or `DBA` can configure the following data access control:

- **Query**: query data via [SQL Editor](/docs/sql-editor/overview)
- **Export**: export data by SQL or Database
- **Copy from SQL Editor**: copy data from the query result table in SQL Editor

## Configure Data Access Control

This section is for `Workspace Owner` or `DBA` to configure data access control for `Project Developer`.

1. Click **Settings** > **Security & Policy** > **Data Access Control**.
   ![bb-settings-data-access-control](/content/docs/security/data-access-control/bb-settings-data-access-control.webp)

1. If `Skip approval` for **Query Data** is checked, then by default `Project Developer` can query data from databases belonging to that Environment via SQL Editor; If unchecked, then `Project Developer` needs to **Request Query** for approval.
1. If `Skip approval` for **Export Data** is checked, then by default `Project Developer` can export data from databases belonging to that Environment via SQL Editor; If unchecked, then `Project Developer` needs to **Request Export** for approval.
   ![bb-sql-editor-export](/content/docs/security/data-access-control/bb-sql-editor-export.webp)

For how to request approval, please refer to [Request Query](/docs/security/data-query/) and [Request Export](/docs/security/data-export/).

1. If `Disallowed` for **Copy Data From SQL Editor** is checked, then no one can copy data from databases belonging to that Environment via SQL Editor; If unchecked, then all can copy data.

![bb-sql-editor-copy-allow](/content/docs/security/data-access-control/bb-sql-editor-copy-allow.webp)
