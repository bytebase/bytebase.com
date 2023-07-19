---
title: Data Access Control
---

<EnterpriseOnlyBlock />

`Data Access Control` restricts how the developers access and export the data.

There're two types of configurable data access for `Project Developer`:

- **Query**: query data via [SQL Editor](/docs/sql-editor/overview)
- **Export**: export data by SQL or Database
- **Copy from SQL Editor**: copy data after querying via SQL Editor

`Project Owner` has all access within the project by default.

At workspace level, `Workspace Owner`  or `DBA` can configure for a specific environment whether `Project Developer`
- needs to request approval to acquire **Query** or **Export** access.
- has **Copy from SQL Editor** access.

## Configure Data Access Control

This section is for `Workspace Owner` or `DBA` to configure data access control for `Project Developer`.

1. Click **Settings** > **Security & Policy** > **Data Access Control**.
![bb-settings-data-access-control](/content/docs/security/data-access-control/bb-settings-data-access-control.webp)

2. If `Skip approval` for **Query Data** is checked, then by default `Project Developer` can query data from databases belonging to that Environment via SQL Editor; If unchecked, then `Project Developer` needs to **Request Query** for approval.
3. If `Skip approval` for **Export Data** is checked, then by default `Project Developer` can export data from databases belonging to that Environment via SQL Editor;  If unchecked, then `Project Developer` needs to **Request Export** for approval.
![bb-sql-editor-export](/content/docs/security/data-access-control/bb-sql-editor-export.webp)

For how to request approval, please refer to [Request Query](/docs/security/data-query/) and [Request Export](/docs/security/data-export/).

4. If `Disallowed` for **Copy Data From SQL Editor** is checked, then no one can copy data from databases belonging to that Environment via SQL Editor;  If unchecked, then all can copy data.

![bb-sql-editor-copy-allow](/content/docs/security/data-access-control/bb-sql-editor-copy-allow.webp)