---
title: Step-by-Step Guide to Data Masking
author: Ningjing
published_at: 2023/10/11 18:00
feature_image: /content/docs/tutorials/step-by-step-guide-to-data-masking/data-mask-banner.webp
tags: Tutorial
integrations: General
level: Beginner
estimated_time: '15 mins'
pinned: true
feature_name: DATA_MASKING
description: This tutorial will teach you how to set up and try out data masking in Bytebase.
---

Bytebase **Dynamic Data Masking** can mask sensitive data in the query result based on the context on the fly.
It helps organizations to **protect sensitive data** from being exposed to unauthorized users.

![bb-masking-overview](/content/docs/security/data-masking/bb-masking-overview.webp)

This tutorial will teach you how to set up and try out data masking in Bytebase within 30 mins.

### Prerequisites

Before starting, make sure you have installed [Docker](https://www.docker.com/).

### Preparation

1. Make sure your Docker is running, and start the Bytebase Docker container with following command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

2. Bytebase is running successfully in Docker, and you can visit it via `localhost:5678`. Register an admin account and it will be granted the `workspace admin` role automatically.

3. Go back to the Bytebase console, click **Start free trial** on the left bottom and upgrade to **Enterprise plan**.

4. Click **Instances**, and click **Assign License**. Select both instances, and click **Confirm**. Without doing this, the enterprise plan required for data masking won't be enabled on instances.

### No Masking

Login to Bytebase,click **SQL Editor**, you'll be redirected to SQL Editor page. Choose `(Prod) employee` > `public` > `employee`, and then run `SELECT * FROM employee;`, you'll see the following result. Run the same query against `(Test) employee`, the result is the same.

![bb-sql-editor-query-employee-prod](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-sql-editor-query-employee-prod.webp)

![bb-sql-editor-query-employee-test](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-sql-editor-query-employee-test.webp)

### Global Masking Rule

You may want to batch apply masking settings, for example, you want to mask all the `birth_date` columns in all the tables in the `employee` database. You can use **Global Masking Rule** to achieve this.

1. Click the **Setting icon** on the top right. Click **Security & Policy** > **Data Masking**. Click **Global Masking Rule** and then **Add rule**.

2. Name the rule as `birth_date should be masked`, and select `Column name`, `==`. Fill `birth_date` in the input box, and click **Confirm**.

   ![bb-data-masking-global-birth-date](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-data-masking-global-birth-date.webp)

3. Go back to the SQL Editor page, Choose `(Prod) employee` > `public` > `employee` and run `SELECT * FROM employee;` again. You'll see the `birth_date` is masked. Choose `(Test) employee`, the result is the same.

   ![bb-sql-editor-query-employee-prod-masked](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-sql-editor-query-employee-prod-masked.webp)
   ![bb-sql-editor-query-employee-test-masked](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-sql-editor-query-employee-test-masked.webp)

### Column Masking Rule

If you want to mask a specific column in a specific table, you can use **Column Masking Rule**.

1. Click **Databases** and choose `employee` on `Prod`, and select `salary` table.
2. Click the edit(pen) icon on the `amount` row, and click **Full**.

   ![bb-database-table-amount](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-database-table-amount.webp)

3. Go back to the SQL Editor page, Choose `(Prod) employee` > `public` > `salary` and run `SELECT * FROM salary;` again. You'll see the `amount` is masked. Choose `(Test) employee`, it's not.

   ![bb-sql-editor-query-salary-prod-masked](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-sql-editor-query-salary-prod-masked.webp)
   ![bb-sql-editor-query-salary-test](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-sql-editor-query-salary-test.webp)

### Grant unmasked access to a user

What if you want to reveal the masked data to a specific user? You can grant unmasked access.

1. Click **Settings icon** on the top right, and click **Members**. Add a `DBA` user and click **+ Add**. Click its link in the **Active members** section, click **Edit** to set a password, click **Save**.

2. Click **Databases** and choose `employee` on `Prod`, and select `salary` table.

3. Click the **edit(pen) icon** on the `amount` row, and click **Grant Access**. Select the `DBA` user, and click **Confirm**.

   ![bb-database-table-amount-grant-access](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-database-table-amount-grant-access.webp)

4. Login as the `DBA` user, go to SQL Editor, choose `(Prod)Employee` > `public` > `salary` and run `SELECT * FROM salary;` again. You'll see the `amount` is not masked.

   ![bb-sql-editor-query-salary-prod-not-masked](/content/docs/tutorials/step-by-step-guide-to-data-masking/bb-sql-editor-query-salary-prod-not-masked.webp)

## Summary

You can now mask data in Bytebase using two methods: use **Global Masking Rule** to batch apply masking settings, and use **Column Masking Rule** to mask a specific column in a specific table. You can also grant access to a specific user to reveal the masked data.

If you have any questions, please [join our discord](https://discord.com/invite/huyw7gRsyA).
