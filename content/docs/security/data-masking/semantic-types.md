---
title: Semantic Types
---

![overview](/content/docs/security/data-masking/bb-semantic-type-overview.webp)

You may define semantic types and apply them to columns of different tables. Columns with the same semantic type will be masked with the same [masking algorithm](/docs/security/data-masking/masking-algorithm). This allows you to manage masking algorithms for many columns by controlling only a small number of semantic types.

1. Go to **Settings** > **Security & Policy** > **Data Masking**.
1. Click **Semantic Types**.
1. Click **Add**, and fill in the name and description. Choose a masking algorithm for full and partial conditions respectively, or you may leave it as `default` which means it will use the system default masking algorithm. Click the checkmark to save.

   ![bb-semantic-types-choose](/content/docs/security/data-masking/bb-semantic-types-choose.webp)

1. Go to a table detail page. Click pencil icon and choose value for **Semantic Types** and **Masking Level**.

   ![bb-table-detail](/content/docs/security/data-masking/bb-table-detail.webp)

1. Go to **SQL Editor**, run a query and you will see the masked data.

   ![bb-birth-date-full-masking](/content/docs/security/data-masking/bb-birth-date-full-masking.webp)

1. Go back to table detail page, click pencil to edit the column **Masking Level** and change the masking level to `Partial`.

1. Go to **SQL Editor**, run a query and you will see the partially masked data.

   ![bb-birth-date-partial-masking](/content/docs/security/data-masking/bb-birth-date-partial-masking.webp)
