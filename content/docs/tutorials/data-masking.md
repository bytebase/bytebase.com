---
title: How to Configure Dynamic Data Masking
author: Ningjing
updated_at: 2025/02/05 18:00
tags: Tutorial
integrations: General
level: Intermediate
estimated_time: '30 mins'
pinned: true
feature_name: DATA_MASKING
description: This tutorial will teach you how to set up and try out data masking in Bytebase.
---

Bytebase [Dynamic Data Masking](/docs/security/data-masking/overview/) can mask sensitive data in
the query result based on the context on the fly. It helps organizations to **protect sensitive data**
from being exposed to unauthorized users.

![bb-masking-overview](/content/docs/security/data-masking/bb-masking-overview.webp)

<HintBlock type="info">

This tutorial covers configuration via UI console. You can also codify the masking policies, check
out [this sample](https://github.com/bytebase/database-security-github-actions-example/tree/main/masking).

</HintBlock>

## Prerequisites

- [Docker](https://www.docker.com/)
- Bytebase Enterprise plan, you can request a free trial [here](/contact-us/)

## Preparation

1. Make sure your [Docker](https://www.docker.com/) is running, and start the Bytebase Docker container with command:

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

1. Having Bytebase successfully running in Docker, visit it via `localhost:8080`. Register an admin account and it will be granted the `workspace admin` role automatically.

1. Acquire the Enterprise license. Enter **Instances** on the left. Select both instances to **Assign License**.

### No Masking

Enter **SQL Editor** on top right. Without any worksheet open (no tab page open on top), click **Connect to a database** or **Select a database to start**.

![sql-editor-entry](/content/docs/tutorials/data-masking/sql-editor-entry.webp)

Choose database `hr_prod` under `Prod Sample Instance` within the Connection detail page. Run `SELECT * FROM employee;`, you'll see the following result without any masking.

![prod-without-masking](/content/docs/tutorials/data-masking/prod-without-masking.webp)

### Semantic Types

Semantic type is a way to classify data into different categories. You may apply them to columns to apply the same masking rule.

1. Enter **Data Access > Semantic Types**, click **Add**.
1. Fill in the name, description and specify the **Masking Algorithm**. Click the check mark.

![bb-semantic-type](/content/docs/tutorials/data-masking/bb-semantic-type.webp)

There are two ways to apply the semantic type and its masking algorithm:

1. Apply to a column directly.
2. Apply according to a global masking rule.

### Column Masking Rule

As a project owner, you may want to apply the semantic type to a column, usually it's a column that you want to mask on production environment.

1. Go into the project `Sample Project`, and click database `hr_prod`.

1. Go into the `employee` table, and set the `birth_date` column to apply the `birth_date` semantic type.

   ![bb-column-semantic-type](/content/docs/tutorials/data-masking/bb-column-semantic-type.webp)

1. Go back to SQL Editor, run `SELECT * FROM employee;` within `hr_prod`. You'll see the `birth_date` is masked based on the masking algorithm.

   ![bb-sql-editor-column-masking](/content/docs/tutorials/data-masking/bb-sql-editor-column-masking.webp)

### Global Masking Rule

As a DBA, you may want to batch apply masking settings. Use [Global Masking Rule](/docs/security/data-masking/global-masking-rule/) to achieve this.

1. Enter **Data Access > Semantic Types**, click **Use Predefined Type**.
1. Add the predefined type `Default`.
1. Enter **Data Access > Global Masking Rule**, click **Add**.
1. Here define a global masking rule to mask all the `birth_date` columns in all tables on production environment with semantic type `Default`, and click **Confirm**.

   ![bb-global-masking-rule](/content/docs/tutorials/data-masking/bb-global-masking-rule.webp)

1. Go back to SQL Editor, run `SELECT * FROM employee;` within `hr_prod`. You'll see the `birth_date` is masked.

   ![bb-sql-editor-column-masking](/content/docs/tutorials/data-masking/bb-sql-editor-column-masking.webp)

1. You may also notice that the global masking rule take precedence over the column masking rule.

### Export data with masked columns

Exported data is masked in the same way as query results.

1. Stay on the SQL Editor after querying, and click **Export**.

   ![bb-sql-editor-export](/content/docs/tutorials/data-masking/bb-sql-editor-export.webp)

1. Fill in the export rows number, choose the format and click **Confirm**. The file will start downloading.

1. Open the downloaded file, you'll see the `birth_date` is masked.

   ![exported-data](/content/docs/tutorials/data-masking/exported-data.webp)

### Masking Exemptions

You can reveal masked data to a specific user by granting masking exemption.

1. Go into the project `Sample Project`, and click **Manage > Masking Exemptions**.
1. Grant exemption to the user and click **Confirm**.

   ![bb-masking-exemption](/content/docs/tutorials/data-masking/bb-masking-exemption.webp)

1. Go back to SQL Editor, run `SELECT * FROM employee;` within database `hr_prod`. You'll see the `birth_date` is unmasked.

   ![bb-sql-editor-exemption](/content/docs/tutorials/data-masking/bb-sql-editor-exemption.webp)

1. If you export the data, the `birth_date` is also unmasked.

   ![exported-data-exemption](/content/docs/tutorials/data-masking/exported-data-exemption.webp)

## Related content

- [Docs for Dynamic Data Masking](/docs/security/data-masking/overview/)
- [How to Manage Data Access for Developers](/docs/tutorials/how-to-manage-data-access-for-developers/)
