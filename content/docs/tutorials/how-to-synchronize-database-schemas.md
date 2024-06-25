---
title: How to Synchronize Database Schemas
author: Ningjing
published_at: 2024/02/29 18:00
feature_image: /content/docs/tutorials/how-to-synchronize-database-schemas/sync-schema.webp
tags: Tutorial
integrations: General
level: Beginner
estimated_time: '10 mins'
description: 'This tutorial will walk you through the typical use cases for database schema synchronization** in Bytebase with **pure UI operations'
---

This tutorial will walk you through the typical use cases for **database schema synchronization** in Bytebase with **pure UI operations**.

The **Sync Schema** feature in Bytebase supports copying a specific schema version from one database to multiple others. Without it, developers have to write SQL statements cautiously and apply them manually. Additionally, this feature may also be used for rollback purpose.

## Preparation

Make sure you installed [Docker](https://www.docker.com/).

1. Copy and paste the commands to start one Bytebase via Docker.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

1. Register and sign in **Bytebase Console**.

## Case 1 - Sync Schema to a New Database

When you set up a new environment or find the current database is nearing capacity, it becomes necessary to establish a new database and synchronize the schema from the original database.

1. Go into `Sample Project`, there are two databases `hr_test` on `Test` environment and `hr_prod` on `Prod` environment. Let's create another one on `Prod`.

2. Click **New DB**, fill in the form as follows and click **Create**:

   - **Name**: `hr_prod_2`
   - **Environment**: `Prod`
   - **Instance**: `Prod Sample Instance`
   - **Database owner name**: `bbsample`
     ![bb-new-db-prod-2](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-new-db-prod-2.webp)

3. An issue will be created and executed automatically, and the database `hr_prod_2` will be ready when the issue is `Done`.
   ![bb-new-db-prod-2-issue](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-new-db-prod-2-issue.webp)

4. Within the project, click **Sync Schema**, choose `hr_prod` as the source schema, and click **Next**.
   ![bb-sync-schema-source](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-schema-source.webp)

5. You may select as many target databases as you like to sync to. Here we select all (including the source) and click **Select**.
   ![bb-sync-schema-all-selected](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-schema-all-selected.webp)

6. Bytebase will calculate the schema differences between the source and target databases, and generate the suggested DDL statements. Click **Preview Issue**.
   ![bb-sync-schema-before-preview](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-schema-before-preview.webp)

7. An issue with the generated DDL is created automatically. Click **Rollout** ignoring the SQL review warning. After the issue execution is `Done`, the schema synchronization is completed.
   ![bb-issue-rollout-anyway](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-issue-rollout-anyway.webp)

## Case 2 - Sync Schema from One to Many

During the product release process, for different environments, such as dev, staging and prod, you'll need to do schema synchronization. Furthermore, for the prod environment, databases with identical schemas, such as SaaS, and multi-region game deployment, you may also need to sync the schema to multiple databases at the same time.

1. Within the project, select `hr_test` and click **Edit Schema**. With the help of Schema Editor, add a new column `email` as follows and click **Preview issue**:

   - **Name**: `email`
   - **Type**: `text`
   - **Default**: `Empty string`
   - **Not Null**: `checked`

   ![bb-schema-editor-email](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-schema-editor-email.webp)

2. An issue is created and executed automatically. After it's `Done`, the new column `email` is added.
   ![bb-issue-add-email-done](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-issue-add-email-done.webp)

3. Within the project, click **Sync Schema**, choose `hr_test` as the source schema and click **Next**.
   ![bb-sync-schema-email-source](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-schema-email-source.webp)

4. Select `hr_prod` and `hr_prod_2` as the target databases. Schema differences are calculated and the suggested DDL statements are generated. Click **Preview issue**.
   ![bb-sync-schema-add-email](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-schema-add-email.webp)

5. An issue with the generated DDL is created automatically. Because two databases need to be synced, there're two task blocks. After they execute one by one, the issue is `Done`, and `email` is added.
   ![bb-issue-add-email-prod](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-issue-add-email-prod.webp)

## Case 3 - Rollback to Previous Schema Versions

In Bytebase **Community Plan**, you can choose the latest history version; In **Pro Plan** or **Enterprise Plan**, you can choose an arbitrary schema version from the full migration history. Which means you can roll back to any previous schema version.

1. After upgrading to **Enterprise Plan**, go into `Sample Project`, click **Sync Schema** and select `hr_test` as the source schema. When you choose the schema version, you will see the following prompt. That's because we haven't assigned the enterprise license to database instances.
   ![bb-sync-test-lock](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-test-lock.webp)

1. Click on the lock sign, select both two instances, and click **Confirm**.
   ![bb-manage-license](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-manage-license.webp)

1. After the license is assigned, you can choose the schema version freely, we'll choose the previous version and click **Next**.
   ![bb-sync-schema-prev](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-schema-prev.webp)

1. Choose the same database `hr_test` as the target, and click **Select**.
   ![bb-sync-rollback-target](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-rollback-target.webp)

1. Bytebase will calculate the schema differences between the source and target databases, and generate the suggested DDL statements. Here means if you want to roll back to the previous version, you'll need to delete this line. Click **Preview Issue**.
   ![bb-sync-rollback-preview](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-rollback-preview.webp)

1. Click **Create**, an issue with the generated DDL is created and rollout automatically. After the issue execution is `Done`, the schema rolls back to the previous version.
   ![bb-sync-rollback-done](/content/docs/tutorials/how-to-synchronize-database-schemas/bb-sync-rollback-done.webp)

## Summary

Is the experience smooth? Or do you encounter any problems? Feel free to join our [Discord Group](https://discord.gg/huyw7gRsyA) to talk about it!
