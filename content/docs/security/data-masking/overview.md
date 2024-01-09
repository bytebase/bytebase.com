---
title: Dynamic Data Masking
feature_name: DATA_MASKING
---

<TutorialBlock url="/docs/tutorials/data-masking" title="Step-by-Step Guide to Data Masking" />

Dynamic Data Masking can mask sensitive data in the [SQL Editor](/docs/sql-editor/overview) query result based on the context. It helps
organizations to protect sensitive data from being exposed to unauthorized users.

![bb-masking-overview](/content/docs/security/data-masking/bb-masking-overview.webp)

Bytebase dynamic masking consists of the following components:

- [Global masking rule](../global-masking-rule)
- [Column level masking](../column-masking) which takes precedency over global masking rule
- [Access grants](../access-unmasked-data)
- [Masking algorithm](../masking-algorithm)
- [Semantic types](../semantic-types)
