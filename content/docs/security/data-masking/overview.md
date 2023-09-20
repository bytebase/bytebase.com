---
title: Data Masking
---

<EnterpriseOnlyBlock />

Data Masking can dynamically mask sensitive data in the query result based on the context. It helps
organizations to protect sensitive data from being exposed to unauthorized users.

Bytebase allows you to configure masking settings on the [column level](../column-masking) and the [global level](../global-masking-rule). The column level settings take precedence over the global level settings.

You can also grant specific users to [access unmasking data](../access-unmasked-data).
