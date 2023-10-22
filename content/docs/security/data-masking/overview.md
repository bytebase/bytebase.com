---
title: Dynamic Data Masking
---

<EnterpriseOnlyBlock />

Dynamic Data Masking can mask sensitive data in the [SQL Editor](/docs/sql-editor/overview) query result based on the context. It helps
organizations to protect sensitive data from being exposed to unauthorized users.

![bb-masking-overview](/content/docs/security/data-masking/bb-masking-overview.webp)

Bytebase dynamic masking consists of following components:

- [Global masking rule](../global-masking-rule)
- [Column level masking](../column-masking) which takes precedency over global masking rule
- [Access grants](../access-unmasked-data)
- Custom masking algorithm (coming soon)
