---
title: Semantic Types
feature_name: DATA_MASKING
---

You may define semantic types and apply them to columns of different tables. Columns with the same semantic type will be masked with the same masking algorithm.

1. Go to **Settings** > **Security & Policy** > **Data Masking**.
2. Click **Semantic Types**.
3. Click **Add**, and fill in the name and description. Choose [masking algorithm](/docs/security/data-masking/masking-algorithm) for full or partial conditions, or you may leave it as `default` which means no masking is applied to this semantic type. Click the checkmark to save.

    ![bb-semantic-types-choose](/content/docs/security/data-masking/bb-semantic-types-choose.webp)

4. Go to a table detail page. Click pencil icon and choose value for **Semantic Types** and **Masking Level**.

    ![bb-table-detail](/content/docs/security/data-masking/bb-table-detail.webp)

5. Go to **SQL Editor**, run a query and you will see the masked data.

    ![bb-birth-date-full-masking](/content/docs/security/data-masking/bb-birth-date-full-masking.webp)

6. Go back to table detail page, click pencil to edit the column **Masking Level** and change the masking level to `Partial`.

7. Go to **SQL Editor**, run a query and you will see the partially masked data.

    ![bb-birth-date-partial-masking](/content/docs/security/data-masking/bb-birth-date-partial-masking.webp)