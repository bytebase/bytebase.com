---
title: Column Masking
feature_name: DATA_MASKING
---

`Workspace Admin` and `DBA` can set table columns as different **Masking Level** to mask the data. This
takes precedence over the [global masking rule](../global-masking-rule).

1. Go to the table detail page, and click the **pen icon** in the row.

![bb-table-detail-click-masking-pen](/content/docs/security/data-masking/bb-table-detail-click-masking-pen.webp)

2. Choose the **Masking Level** according to your needs.

![bb-masking-setting](/content/docs/security/data-masking/bb-masking-setting.webp)

- **Follow [global masking rules](../global-masking-rule)**
- **Full**: Mask the original data entirely
  ![bb-masking-full](/content/docs/security/data-masking/bb-masking-full.webp)
- **Partial**: Mask the original data partialy
  ![bb-masking-partial](/content/docs/security/data-masking/bb-masking-partial.webp)
- **None**: No masking
  ![bb-masking-none](/content/docs/security/data-masking/bb-masking-none.webp)
