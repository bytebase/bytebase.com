---
title: Column Masking
---

<HintBlock type="info">

The [global masking rule](../global-masking-rule) takes precedence over the column masking.

</HintBlock>

In the project level, besides `Workspace Admin` and `DBA`, `Project Owner` can set table columns semantic type to mask the data. However, the [global masking rule](../global-masking-rule) takes precedence over the column masking.

Go to the **table detail** page, and click the **pen icon** and apply the semantic type.

![bb-column-masking](/content/docs/security/data-masking/bb-column-masking.webp)

Combined with [Semantic Types](/docs/security/data-masking/semantic-types), here is the result you will get in **SQL Editor**.

![bb-sql-editor-partial-masking](/content/docs/security/data-masking/bb-sql-editor-partial-masking.webp)

However, if the global masking rule is also applied, the result will be as follows. Because the global masking rule takes precedence over the column masking.

![bb-sql-editor-full-masking](/content/docs/security/data-masking/bb-sql-editor-full-masking.webp)