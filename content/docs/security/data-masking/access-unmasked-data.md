---
title: Access Unmasked Data
---

`Workspace Admin` and `DBA` can relax the masking levels for the users.

- For the full masked columns, users can be granted to access the unmasked or partial masked data.
- For the partial masked columns, users can be granted to access the unmasked data.

## Grant from the database

1. Go to a table detail page, and click the **pen icon** on the masking level column.
   ![bb-table-detail-click-masking-pen](/content/docs/security/data-masking/bb-table-detail-click-masking-pen.webp)
2. Choose `Full` as the **Masking Level**. You'll see the data is masked in **SQL Editor**.
   ![bb-masking-full](/content/docs/security/data-masking/bb-masking-full.webp)
3. Go back to the column masking setting, click **Grant Access**. Choose `None` as the **Masking Level** and pick a user. Click **Confirm**.
   ![bb-masking-grant-access](/content/docs/security/data-masking/bb-masking-grant-access.webp)
4. Log in as the granted user, query or export in **SQL Editor.** You'll see the unmasked data.

## Grant from the project

You can also grant masking access for the databases under a project.

![bb-project-access-masking](/content/docs/security/data-masking/bb-project-access-masking.webp)
