---
title: Step-by-Step Guide to Data Masking
author: Ningjing
updated_at: 2024/10/09 18:00
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

## Prerequisites

Before starting, make sure you have installed [Docker](https://www.docker.com/).

## Preparation

1. Make sure your Docker is running, and start the Bytebase Docker container with command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

2. Having Bytebase successfully running in Docker, visit it via `localhost:8080`. Register an admin account and it will be granted the `workspace admin` role automatically.

3. Click your avatar on top right and **Start free trial** from the dropdown menu. Upgrade to **Enterprise plan**.

4. Enter **Instances** on the left. Select both instances to **Assign License**.

### No Masking

Enter **SQL Editor** on top right. Without any worksheet open(no tab page open on top), click **Connect to a database** or **Select a database to start**.

![sql-editor-entry](/content/docs/tutorials/step-by-step-guide-to-data-masking/sql-editor-entry.webp)

Choose database `hr_prod` under `Prod Sample Instance` within the Connection detail page. Run `SELECT * FROM employee;`, you'll see the following result.

![prod-without-masking](/content/docs/tutorials/step-by-step-guide-to-data-masking/prod-without-masking.webp)

Run the same query against database `hr_test`, the result is the same.

### Global Masking Rule

You may want to batch apply masking settings. Use [Global Masking Rule](https://www.bytebase.com/docs/security/data-masking/global-masking-rule/) to achieve this.

Here for example, we'll mask all the `birth_date` columns in all tables.

1. Within Workspace, enter **Security & Policy** > **Data Masking** on the left. Click **Add** on top right of `Global Masking Rule` page.

2. Name the rule as `birth_date should be masked`, select `Column name`, `==`. Fill `birth_date` in the input box, and **Confirm**.
   ![global-birth-date](/content/docs/tutorials/step-by-step-guide-to-data-masking/global-birth-date.webp)

3. Go back to SQL Editor. Run `SELECT * FROM employee;` within `hr_prod` again. You'll see the `birth_date` is masked. Result within `hr_test` is the same.
   ![query-prod-masked](/content/docs/tutorials/step-by-step-guide-to-data-masking/query-prod-masked.webp)

For a more organized and hierarchical global masking management, check [Data Classification](https://www.bytebase.com/docs/security/data-masking/data-classification/).

### Export data with masked columns

Exported data is masked in the same way as query results.

1. Stay on the SQL Editor after querying, and click **Export**.
   ![prod-export](/content/docs/tutorials/step-by-step-guide-to-data-masking/prod-export.webp)

2. Fill in the export rows number, choose the format and click **Confirm**. The file will start downloading.

3. Open the downloaded file, you'll see the `birth_date` is masked.
   ![exported-data](/content/docs/tutorials/step-by-step-guide-to-data-masking/exported-data.webp)

### Column Masking Rule

If you want to mask a specific column in a specific table, you can use **Column Masking Rule**.

1. Enter **Database** > **Databases** within `Sample Project`. Choose table `salary` of database `hr_prod`.

2. Click the pencil icon by `Masking level` of row `amount`, choose `Full` for Masking level in Setting detail page.
   ![prod-salary-amount](/content/docs/tutorials/step-by-step-guide-to-data-masking/prod-salary-amount.webp)

3. Go back to SQL Editor. Run `SELECT * FROM salary;` within `hr_prod`. You'll see `amount` been masked.
   ![query-prod-salary-amount-masked](/content/docs/tutorials/step-by-step-guide-to-data-masking/query-prod-salary-amount-masked.webp)
   
   Switch to database `hr_test` to run the same command, `amount` will appear not masked.
   
   ![query-prod-salary-amount-masked](/content/docs/tutorials/step-by-step-guide-to-data-masking/query-prod-salary-amount-masked.webp)
   
### Grant unmasked access to a user

What if you want to reveal masked data to a specific user (other than yourself)? Grant unmasked access.

1. Have this DBA user granted access of `Project Developer`, otherwise he couldn't see the project in his workspace.

In case you didn't have this DBA yet:
   - Click your avatar, Logout from the dropdown menu and Sign up for another DBA account.
   - Login as Workspace Admin again, choose `Sample Project`, enter **Manage** > **Members** from the left.
   - **Grant Access** on top right, assign `Project Querier` and `Project Exporter` role for your DBA user and **Confirm**.

1. In **Database** > **Databases** within `Sample Project`, choose table `salary` of database `hr_prod`.

1. Click the pencil icon by `Masking level` of row `amount`, **Grant Access**. Select the `DBA` user and **Confirm**.
   ![grant-access](/content/docs/tutorials/step-by-step-guide-to-data-masking/grant-access.webp)

   ![grant-access-detail](/content/docs/tutorials/step-by-step-guide-to-data-masking/grant-access-detail.webp)

1. Login as the `DBA` user. Run `SELECT * FROM salary;` within database `hr_prod` in SQL Editor. `amount` appears not masked.
   ![dba-query-salary](/content/docs/tutorials/step-by-step-guide-to-data-masking/dba-query-salary.webp)

## Related content

- [Deploy Schema Migration with Rollout Policy](/docs/tutorials/deploy-schema-migration/)
- [How to Manage Data Access for Developers](/docs/tutorials/how-to-manage-data-access-for-developers/)
