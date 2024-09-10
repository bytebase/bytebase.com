---
title: Batch Change with Database Group
author: Ningjing
updated_at: 2024/07/23 18:00
tags: Tutorial
integrations: General
level: Intermediate
estimated_time: '20 mins'
description: This article describes using Deployment Configure and Database Group to batch change databases.
---

Bytebase offers multiple features to simplify batch change management. In this tutorial, we will guide you on how to use **Deployment Configure** and **Database Group** to batch change databases for various scenarios.

![deployment-configure-banner](/content/docs/tutorials/batch-change-with-database-group/deployment-configure-banner.webp)

- The graph above is for Step 2 - Deployment Configure (Community Plan)

![database-group-banner](/content/docs/tutorials/batch-change-with-database-group/database-group-banner.webp)

- The graph above is for Step 3 - Database Group (Enterprise Plan) & Step 4 - Multitenancy Database Group (Enterprise Plan)

## Preparation

1. Make sure you have [Docker](https://www.docker.com/) installed, and if you don’t have important existing Bytebase data locally, you can start over from scratch by `rm -rf ~/.bytebase/data`.

1. **Deployment configure** is a **Community Plan** feature and **Database group** is an **Enterprise Plan** feature, you need to have a valid license to enable it. You can request a trial license key from [here](https://bytebase.com/pricing).

## Procedure

### Step 1 - Start Bytebase and prepare the databases

To demonstrate the batch change, we need to prepare some databases first.

1. Copy and paste the commands to start one Bytebase via Docker.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

1. Regsiter an admin account and it will be granted the `workspace admin` role automatically.

1. Bytebase provides two sample PostgreSQL instances. Click `Select Project` on the top bar, and click **New Project** on the popup. Fill it with a name `batch project` and create **Create**.
   ![bb-new-project](/content/docs/tutorials/batch-change-with-database-group/bb-new-project.webp)

1. Go into project `batch change`, click **Database > Databases** on the left side bar. There is no databases belonging to this project yet. Click **New DB**. To mimic the real-world scenario, firstly, create `demo-test` which should be created on sample test instance. An issue will be created automatically, since we haven't configured any rollout mechanism or custom approval workflow, it will roll out automatically. After the issue is done, the database is created.
   ![bb-new-project](/content/docs/tutorials/batch-change-with-database-group/bb-new-db-test.webp)

   ![bb-issue-test-done](/content/docs/tutorials/batch-change-with-database-group/bb-issue-test-done.webp)

1. In the same way, create `demo-prod-1`,`demo-prod-2`,`demo-prod-3`,`demo-prod-4`,`demo-prod-5`,`demo-prod-6`, `other-prod-1` and `other-prod-2`.

   ![bb-new-db-prod-1](/content/docs/tutorials/batch-change-with-database-group/bb-new-db-prod-1.webp)

1. Select both `demo-prod-1` and `demo-prod-2` , and click **Edit Labels**. Assign a label Key: `Location`, Value: `Asia`.

   ![bb-assign-label](/content/docs/tutorials/batch-change-with-database-group/bb-assign-label.webp)

1. In the same way, assign `EU` and `NA` to other demo-prod databases.

   ![bb-dbs-label](/content/docs/tutorials/batch-change-with-database-group/bb-dbs-label.webp)

### Step 2 - Deployment Configure (Community Plan)

We'll show you the difference deployment configuration makes.

1. Go to **Databases > Database** in the project, select `demo-test` and `demo-prod-1`~`demo-prod-6` and click **Edit Schema**. Fill in a SQL and click **Create**. You can see the pipeline has two stages - Test and Prod, and there're six databases, which means the SQL will run against these six databases simutaneously.

   ```SQL
      CREATE TABLE t2("id" INTEGER NOT NULL);
   ```

   ![bb-select-demo-dbs](/content/docs/tutorials/batch-change-with-database-group/bb-select-demo-dbs.webp)

   ![bb-issue-t2-done](/content/docs/tutorials/batch-change-with-database-group/bb-issue-t2-done.webp)

1. What if we want to do the change to Asia first, then EU,and NA the last? Stay in the project, click **Deployment Configure** on the leftside bar. Add new stages with label filtering.

   ![bb-deployment-config](/content/docs/tutorials/batch-change-with-database-group/bb-deployment-config.webp)

1. Go to **Databases > Database** in the project, select `demo-test` and `demo-prod-1`~`demo-prod-6` and click **Edit Schema**. Fill in a SQL and click **Create**. You can see the pipeline has four stages as we configure.

   ```SQL
      CREATE TABLE t1("id" INTEGER NOT NULL);
   ```

   ![bb-issue-t1-done](/content/docs/tutorials/batch-change-with-database-group/bb-issue-t1-done.webp)

### Step 3 - Database Group (Enterprise Plan)

We need first to upgrade to Enterprise Plan to use Database Group.

1. Click the **Setting icon** on the top right, and then click **Workspace > Subscription** to upload the license.

1. Click the pen icon, select the instances you want to enable Enterprise features , and click **Confirm**.

   ![bb-subscription](/content/docs/tutorials/data-rollback/bb-subscription.webp)

1. Go to **Database > Groups** in the project, click **New database group**, fill the fields as follows, when you scroll down, you will see there's an option **Multitennancy**, keep it unchecked for now and click **Save**.

   - **Name:** `demo-prod-all`
   - **Condition:** `Environment == Prod` & `Database name startsWith demo-prod-`

   ![bb-new-db-group](/content/docs/tutorials/batch-change-with-database-group/bb-new-db-group.webp)

   ![bb-db-group-multi-t-uncheck](/content/docs/tutorials/batch-change-with-database-group/bb-db-group-multi-t-uncheck.webp)

1. Go to **Database > Groups** in the project, click **Edit Schema**, and choose **Database group** and click **Next**.

   ![bb-edit-schema-db-group](/content/docs/tutorials/batch-change-with-database-group/bb-edit-schema-db-group.webp)

1. You many see the six databases in three stages. Fill in the SQLs and click **Create**.

   ```SQL
      CREATE TABLE t3("id" INTEGER NOT NULL);
   ```

   ![bb-issue-db-group-multi-uncheck](/content/docs/tutorials/batch-change-with-database-group/bb-issue-db-group-multi-uncheck.webp)

1. Go to **Database > Databases** in the project, and click **New DB**. Create a database `demo-prod-7` which belongs to the database group. Check the schema, it's empty.

   ![bb-demo-7-empty](/content/docs/tutorials/batch-change-with-database-group/bb-demo-7-empty.webp)

### Step 4 - Multitenancy Database Group (Enterprise Plan)

When the database group has **Multitenancy** enabled, the new database will inherit group schemas automatically.

1. Go to **Database > Groups** in the project, click **Configure**, this time we check **Multitenancy** and click **Confirm**.

1. Go to **Database > Databases** in the project, and click **New DB**. Create a database `demo-prod-8` which belongs to the database group. Check the schema, it's the same schema as other demo-prod databases. Pay attention here, even if there is an on going issue, the new database will be appended.

   ![bb-demo-8-same](/content/docs/tutorials/batch-change-with-database-group/bb-demo-8-same.webp)

## Summary

Now you have learned how to use deployment config and database group to run batch changes in Bytebase.
