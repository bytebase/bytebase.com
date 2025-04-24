---
title: Dynamic Data Masking
feature_name: DATA_MASKING
---

<TutorialBlock url="/docs/tutorials/data-masking" title="Step-by-Step Guide to Data Masking" />

![bb-masking-overview](/content/docs/security/data-masking/bb-masking-overview.webp)

Dynamic Data Masking (DDM) can mask sensitive data in the [SQL Editor](/docs/sql-editor/overview) query result based on the context. It helps
organizations to protect sensitive data from being exposed to unauthorized users.

<HintBlock type="info">

You can configure the masking policies from UI or via API. Check out [this GitOps example](https://github.com/bytebase/example-database-security) to see how to codify the masking policies.

</HintBlock>

## Configure Dynamic Data Masking

- Workspace-level admins configure the [Global Masking Rule](/docs/security/data-masking/global-masking-rule), [Semantic Types](/docs/security/data-masking/semantic-types), and [Masking Algorithm](/docs/security/data-masking/masking-algorithm).

- Project-level owners configure the [Column Masking](/docs/security/data-masking/column-masking) on the table column. This is only needed when the global masking rule is not applicable to a particular project.

- Workspace-level admins or project-level owners grant [Masking Exemption](/docs/security/data-masking/access-unmasked-data) to the users to access the unmasked data.

## Determine whether to mask data

![bb-masking-detail](/content/docs/security/data-masking/bb-masking-detail.webp)

### Masking precedence

1. [Masking Exemption](/docs/security/data-masking/access-unmasked-data). If user has been granted exemption, the data will not be masked.

1. [Global Masking Rule](/docs/security/data-masking/global-masking-rule). If no exemption is granted, the global masking rule will be applied.

1. [Column Masking](/docs/security/data-masking/column-masking). If no global masking rule is configured, the column masking will be applied.

### Masking algorithm

The global masking rule and column masking are both mapped to the [Semantic Types](/docs/security/data-masking/semantic-types). The semantic type determines the masking algorithm.

### Masking propagation

When a column in a database table is masked, the masking effect is **infectious** in the sense that it propagates to any views or derived structures that depend on that column. This ensures that the protection applied to the underlying data is consistently enforced, even when accessed through alternative pathways like views.
