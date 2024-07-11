---
title: Manage Database Change with Data Rollback
author: Ningjing
published_at: 2024/07/09 16:15
tags: Tutorial
integrations: General
level: Beginner
estimated_time: '30 mins'
description: This tutorial will guide you on how to use the Data Rollback feature to manage database data changes in Bytebase.
---

When changing data in the database, it's advisable to have a backup of the data you plan to modify in case you need to roll back. Bytebase offers a feature called [**Data Rollback**](/docs/change-database/rollback-data-changes/) to assist with this. This tutorial will guide you through this process.

## Preparation

1. Make sure you have [Docker](https://www.docker.com/) installed, and if you don’t have important existing Bytebase data locally, you can start over from scratch by `rm -rf ~/.bytebase/data`.

1. It's an Enterprise Plan feature, you need to have a valid license to enable it. You can request a trial license key from [here](https://bytebase.com/pricing).

## Procedure

### Step 1 - Start Bytebase and upgrade to Enterprise Plan

1. Copy and paste the commands to start one Bytebase via Docker.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

1. Regsiter an admin account and it will be granted the `workspace admin` role automatically.

1. Click the **Setting icon** on the top right, and then click **Workspace > Subscription** to upload the license.

1. Click the pen icon, select the instances you want to enable Enterprise features, and click **Confirm**.

   ![bb-subscription](/content/docs/tutorials/data-rollback/bb-subscription.webp)

### Step 2 - Prepare schema `bbdataarchive`

Bytebase stores the backup data in a dedicated place. For Postgres, it's stored under the `bbdataarchive`
schema for the changing database.

1. Go to `Sample Project`, click **Database > Databases** on the left side, choose `hr_test`, and then click **Edit Schema**.

1. In the **Schema Editor**, click `...` and then click **Create Schema**. Fill it with the name `bbdataarchive` and click **Create**.

   ![bb-schema-editor-create-schema](/content/docs/tutorials/data-rollback/bb-schema-editor-create-schema.webp)

1. You can now see the `bbdataarchive` schema in green color. Click **Preview issue**. Create the issue and wait till it rolls out automatically. Now the `bbdataarchive` schema is created.

   ![bb-issue-schema-done](/content/docs/tutorials/data-rollback/bb-issue-schema-done.webp)

### Step 3 - Change Data and roll back

1. Before the change, go to **SQL Editor**, choose `hr_test` and double click `employee` table, and you'll see the current data. We'll try to change the `first_name` for `Georgi`.

   ![bb-sql-editor-query](/content/docs/tutorials/data-rollback/bb-sql-editor-query.webp)

1. Go to `Sample Project` and **Database > Databases** again, choose `hr_test`, and then click **Change Data**.

1. Turn on **Prior Backup** on the right, input the SQL into the field, and then click **Create**.

   ```sql
   UPDATE employee SET first_name = 'Adela' WHERE emp_no = 10001;
   ```

   ![bb-issue-change-data](/content/docs/tutorials/data-rollback/bb-issue-change-data.webp)

1. After the issue is created and then rolled out, you can see there is an activity saying the data is backed up to a new table under the previously created `bbdataarchive` schema.

   ![bb-change-data-backup](/content/docs/tutorials/data-rollback/bb-change-data-backup.webp)

1. Go to **Database > Databases** again, and click `hr_test`. You'll be redirected to the database page.

1. Choose `bbdataarchive` schema, and you can see the backup table.

   ![bb-db-schema](/content/docs/tutorials/data-rollback/bb-db-schema.webp)

1. To verify, go to **SQL Editor**. Choose `employee` table in `hr_test` under `public` schema, input the following SQL script and click **Run**, and you'll see the data is changed.

   ```sql
      SELECT * FROM "public"."employee" ORDER BY emp_no LIMIT 50;
   ```

   ![bb-sql-editor-query-after](/content/docs/tutorials/data-rollback/bb-sql-editor-query-after.webp)

1. Choose `bbdataarchive` schema, and double-click the table below. You'll see the backup data in the query result.

   ![bb-sql-editor-schema-archieve](/content/docs/tutorials/data-rollback/bb-sql-editor-schema-archieve.webp)

## Noteworthy Difference

If you want to use MySQL/SQL Server/Oracle, instead of creating a `bbdataarchive` schema, you should create a `bbdataarchive` database to store the backup data. Check the doc for more details.

<DocLinkBlock url="/docs/change-database/rollback-data-changes/" title="Data Rollback Doc"></DocLinkBlock>
