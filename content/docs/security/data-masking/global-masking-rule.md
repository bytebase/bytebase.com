---
title: Global Masking Rule
---

<HintBlock type="info">

The [column masking](../column-masking) takes precedence over the global masking rule.

</HintBlock>

You may want to batch apply masking settings. e.g.

- Mask all data in production
- Mask all data for database under a specific project
- Maks data conditionally according to [Data Classification](../data-classification)

Global masking rule allows you to do this. It's similar to the iptables where you configure an ordered
rule list. The first matching rule will be applied. If no rule matches, the default masking level is `None`.

`Workspace Admin` and `DBA` can set global masking rules to mask the data.

1. Go to **Settings**>**Security & Policy**>**Data Masking**.
2. Click **Global Masking Rule** tab.
3. Click **Add rule**. Click **+Add condition** or **+Add condition group**, set **Masking Level** and then click **Confirm**.
   ![bb-global-masking](/content/docs/security/data-masking/bb-global-masking.webp)
4. Repeat step 3 to add more rules.
   ![bb-global-masking-2](/content/docs/security/data-masking/bb-global-masking-2.webp)

Here is the result you will get in **SQL Editor**.
![bb-global-masking-2-preview](/content/docs/security/data-masking/bb-global-masking-2-preview.webp)
