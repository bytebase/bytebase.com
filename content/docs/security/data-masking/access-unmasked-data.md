---
title: Masking Exemption
---

<HintBlock type="info">

Masking precedence: [Masking Exemption](/security/data-masking/access-unmasked-data) > [Global Masking Rule](/security/data-masking/global-masking-rule) > [Column Masking](/security/data-masking/column-masking).

</HintBlock>

Certain roles can grant masking exemption to the users to access the unmasked data:

- Built-in roles: `Workspace Admin`, `DBA`, `Project Owner`.
- [Custom roles](/docs/administration/custom-roles/): `bb.policies.create`, `bb.policies.update`, `bb.policies.delete`.

To grant masking exemption:

1. Go to the project, click **Manage** > **Masking Exemptions**.
1. Click **Grant Exemption**. You can grant either `Export` or `Query` exemption.
1. Select the user/groups and the database/table, and click **Confirm**.

   ![bb-grant-exemption](/content/docs/security/data-masking/bb-grant-exemption.webp)
