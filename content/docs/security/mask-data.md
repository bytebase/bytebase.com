---
title: Data Masking
---

<EnterpriseOnlyBlock />

Workspace Owners and DBAs can mark table columns as `Sensitive` to mask the data.

See the following example, the `amount` column is marked as `Sensitive`.

![setting](/content/docs/security/mask-data/mask-data-setting.webp)

You may also manage all `Sensitive` columns in **"Settings / Workspace / Sensitive Data"**.

![workspace setting](/content/docs/security/mask-data/mask-data-workspace-setting.webp)

Then, the query result of `Sensitive` columns from the [SQL Editor](/docs/sql-editor/overview) will be masked as "\*\*\*\*\*\*".

![query result](/content/docs/security/mask-data/mask-data-masked.webp)

Note that the query result will not be masked while using [Admin Mode](/docs/sql-editor/admin-mode).
