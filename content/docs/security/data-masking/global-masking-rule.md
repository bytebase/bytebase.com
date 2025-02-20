---
title: Global Masking Rule
---

<HintBlock type="info">

Masking precedence: [Masking Exemption](/docs/security/data-masking/access-unmasked-data) > [Global Masking Rule](/docs/security/data-masking/global-masking-rule) > [Column Masking](/docs/security/data-masking/column-masking).

</HintBlock>

Admins may want to batch apply masking settings globally. e.g.

- Mask all data in production
- Mask all data for database under a specific project
- Mask data conditionally according to [Data Classification](../data-classification)

Global masking rule along with [Semantic Types](/docs/security/data-masking/semantic-types) allows you to do this. It's similar to the iptables where you configure an ordered
rule list. The first matching rule will be applied. If no rule matches, no `Semantic Type` will be applied.

`Workspace Admin` and `DBA` can set global masking rules to mask the data.

1. Go to **Data Access**>**Global Masking**.
1. Click **Add**. Click **+Add condition** or **+Add condition group**, set **Semantic Type** and then click **Confirm**.
   ![bb-global-masking](/content/docs/security/data-masking/bb-global-masking.webp)
1. Repeat to add more rules.
   ![bb-global-masking-2](/content/docs/security/data-masking/bb-global-masking-2.webp)

Combined with [Semantic Types](/docs/security/data-masking/semantic-types), here is the result you will get in **SQL Editor**.
![bb-sql-editor-full-masking](/content/docs/security/data-masking/bb-sql-editor-full-masking.webp)
