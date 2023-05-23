---
title: Database Change Management using Bytebase Cloud
author: Ningjing
published_at: 2023/04/17 16:15
feature_image: /docs/tutorials/beginner/database-change-management-using-bytebase-cloud/feature-image.webp
tags: Tutorial
integrations: MySQL
level: Beginner
description: Bytebase provide its Cloud version since 1.15.0, this tutorial is a step-by-step guide to set up Database Change Management for Amazon Aurora MySQL using Bytebase Cloud.
---

This is a series of articles about Database Change Management using Bytebase Cloud. We take Amazon Aurora MySQL as an example and is also applicable to Amazon Aurora Serverless.

- Database Change Management using Bytebase Cloud (this one)
- [DevOps: Database Change Management with GitHub using Bytebase Cloud](/docs/tutorials/intermediate/database-change-management-with-github-using-bytebase-cloud)

---

Bytebase is an open-source database CI/CD tool for developers and DBAs. It provides its Cloud version since [1.15.0](/changelog/bytebase-1-15-0) in addition to the existing [self-hosted version](/docs/get-started/install/deploy-with-docker).

[Amazon Aurora](https://aws.amazon.com/rds/aurora/) is a fully managed relational database engine that's compatible with MySQL and PostgreSQL.

This tutorial is a step-by-step guide to set up Database Change Management for **Amazon Aurora MySQL** using **Bytebase Cloud**. With Bytebase, a team can have a formalized review and rollout process to make Amazon Aurora database schema change and data change.

Bytebase provides a GUI for teams to **perform database changes** and **retain full change history**. You can use Bytebase free version to finish the tutorial.

At the end, there is a bonus section about **Schema Drift Detection** for those advanced users.

## Features included

- Change Workflow
- Schema Editor
- SQL Editor
- Change History
- DML Rollback
- Drift Detection

## Prerequisites

Before you start, make sure you have:

- An Amazon Aurora MySQL instance.

## Step 1 - Start Bytebase Cloud

1. Visit [`https://www.bytebase.com/`](/), and click **Sign Up for Cloud** on the top right.

2. Signup or Log in to Bytebase Hub via your email / Google / GitHub / Microsoft account.

3. You'll be redirected to the workspace page, click **Create workspace**, and give it a name.

4. After its provision, the workspace is ready. You'll receive an email with the password. Click **Login to your workspace**, and you'll be redirected to the Bytebase Cloud login page.
   ![email-workspace-ready](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/email-workspace-ready.webp)
   ![bb-login](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-login.webp)

## Step 2 - Add an Amazon Aurora Instance to Bytebase

In Bytebase, ​​an Instance could be your on-premises MySQL instance, an AWS RDS instance etc, in this tutorial, ​an **Instance** is your `Amazon Aurora MySQL instance`.

1. Before adding your Amazon Aurora MySQL instance, go to your Amazon and find the instance. Click **Connectivity & Security**, and click the belonging **VPC security groups**.
   ![aws-security-groups](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/aws-security-groups.webp)

2. Click **Edit inbound rules**, choose `Custom TCP` as **Type**, and fill **Source** with [Bytebase Cloud IP](/docs/get-started/cloud#whitelist-bytebase-cloud-ip), which is `34.27.188.162/32` as of writing.
   ![aws-inbound-rules](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/aws-inbound-rules.webp)
   ![aws-edit-inbound-rules](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/aws-edit-inbound-rules.webp)

3. Go to Bytebase Cloud console, and click **Add Instance**.
   ![bb-home-add-instance](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-home-add-instance.webp)

4. Fill in the fields and click **Create**. Pay attention to these fields:

**Type**: `MySQL`, if you use Aurora PostgreSQL, choose `PostgreSQL` instead.
**Environment**: choose `Test`, if you choose `Prod`, you'll need manual approval for all future change requests by default, let's keep it simple for this tutorial.
![bb-create-instance](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-create-instance.webp)

## Step 3 - Create a Project

In Bytebase, **Project** groups logically-related **Databases, Issues** and **Users** together, which is similar to the project concept in other DevTools such as Jira and GitLab. So before you deal with the database, a Project must be created.

1. Click **Projects** on the top navigation bar.

2. Click **New Project** to create a new project `TestAurora`, key is `TAR`, mode is `standard`. Click **Create**.
   ![bb-projects-new-project](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-projects-new-project.webp)

## Step 4 - Create an Amazon Aurora Database via Bytebase

In Bytebase, a **Database** is created by `CREATE DATABASE xxx`. A database always belongs to a single **Project**. An **Issue** represents a specific collaboration activity between Developer and DBA for when creating a database, altering a schema. It's similar to the issue concept in other issue management tools.

1. Click **Projects** > `TestAurora` on the left sidebar. Click **New DB** to create a new database. You can click **Transfer in DB** to transfer in your existing databases.

2. Fill the form with **Name** - `db_demo`, **Environment** - `Test`, and **Instance** - `Amazon Aurora MySQL`. Click **Create**.

3. Bytebase will create an issue to create the database automatically. As it's the `Test` environment, the issue will run without waiting for your approval by default. Click **Resolve**, and the issue is `Done`.
   ![bb-issue-create-dbdemo](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-create-dbdemo.webp)

## Step 5 - Create a Table in Amazon Aurora MySQL

In Step 4, you created an issue to create a database using UI workflow and then executed it. Let’s continue to create a table.

1. Visit your project, and click on **Alter Schema**.

2. Choose `db_demo` and click **Next**.
   ![bb-alter-schema-select-db](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-alter-schema-select-db.webp)

3. This is where you get to try out the **Schema Editor**. It’s a visual editor for schema changes. Create a table called `t1` with 2 columns: `id` and `name`.
   ![bb-schema-editor](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-schema-editor.webp)

4. Click **Preview issue**, and Bytebase will automatically preview an issue with the corresponding SQL statement. Verify it's right, and click **Create**.
   ![bb-issue-create-t1](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-create-t1.webp)

5. The issue is automatically approved by default since it’s for the `Test` environment. Meanwhile, Bytebase has run several task checks before executing the SQL, and one such task check is called SQL Reivew. You may [customize your own SQL Review policies](/docs/sql-review/review-policy/overview).

6. Click **Resolve issue**. The issue will become `Done` .
   ![bb-issue-t1-done](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-t1-done.webp)

7. From the issue page, click **View change**, and you can see schema diff.
   ![bb-change-diff-t1](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-change-diff-t1.webp)

## Step 6 - Add Some Data and Query via SQL Editor

1. Go to the project `TestAurora` , and click **Change Data**.
2. Choose `db_demo` and click **Next**.
3. Fill in the SQL as follows and then click **Create**.

```sql
INSERT INTO
  t1
VALUES
  (1, 'Adela');
```

4. After its execution, Click **Resolve**.
   ![bb-issue-insert-data-done](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-insert-data-done.webp)

5. Click **SQL Editor** on the left side bar. Input the query and click **Run**. You can see the new row is there.
   ![bb-sql-editor-select-1](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-sql-editor-select-1.webp)

## Step 7 - Rollback the Data Change

Bytebase support [Rollback for MySQL](https://www.bytebase.com/docs/change-database/rollback-data-changes).

After a data change completes, Bytebase can parse MySQL binary logs and build rollback SQL statements from the logs. This allows you to revert that data change if needed.

1. Go back to the issue, turn the **SQL Rollback** on.
   ![bb-issue-before-rollback](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-before-rollback.webp)

2. It may fail if the instance hasn't set `binlog_format = ROW`.
   ![bb-issue-rollback-fail](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-rollback-fail.webp)

3. Go to Amazon RDS, click **Parameter groups** to create a new parameter group and set **binlog_format** to `ROW`.
   ![aws-create-param](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/aws-create-param.webp)
   ![aws-param-row](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/aws-param-row.webp)

4. Apply the parameter group to your database instance.
   ![aws-apply-param-group-bb](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/aws-apply-param-group-bb.webp)

5. Go back to Bytebase **SQL Editor**, and switch to **Admin Mode**.
   ![bb-sql-editor-admin](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-sql-editor-admin.webp)

6. According to [Amazon documentation](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/mysql-stored-proc-configuring.html#mysql_rds_show_configuration). Type as following to set the binlog retention hours to 24.

```SQL
call mysql.rds_set_configuration('binlog retention hours', 24);
```

7. Type as following to check it's set successfully.

```SQL
CALL mysql.rds_show_configuration;
```

![bb-sql-editor-admin-show-config](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-sql-editor-admin-show-config.webp)

8. Reboot the Aurora MySQL instance.
   ![aws-reboot](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/aws-reboot.webp)

9. Repeat the Step 6, but this time, we can see the **Preview rollback issue**. Click it and then click **Create** on the issue page.
   ![bb-issue-before-rollback-preview](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-before-rollback-preview.webp)
   ![bb-issue-rollback-preview](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-rollback-preview.webp)

10. Rollback always requires explicit approval.
    ![bb-issue-rollback-to-approve](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-rollback-to-approve.webp)

11. Before approving rollback, let's go to **SQL Editor** and query. `Bella` is there.
    ![bb-sql-editor-query-2](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-sql-editor-query-2.webp)

12. Go back to the issue page and click **Approve**. The rollback SQL will execute.
    ![bb-issue-rollback-executed](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-issue-rollback-executed.webp)

13. Go to **SQL Editor** and query again. `Bella` is no longer there - The rollback is successful. You may rollback the rollback too, and yes, rollback the rollback for rollback... As long as the binlog is within the 24-hour retention period.
    ![bb-sql-editor-query-3](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-sql-editor-query-3.webp)

## Bonus Section - Schema Drift Detection

To follow this section, you need to activate the **Enterprise Plan** (you can start a 14-day trial directly, no credit card required).

Now you can see the full change history of database `db_demo`. However, what is **Establish new baseline**? When to use it?

By adopting Bytebase, we expect teams to use Bytebase exclusively for all schema changes. Meanwhile, if someone has made Amazon Aurora schema change out side of Bytebase, obviously Bytebase won’t know it. And because Bytebase has recorded its own copy of schema, when Bytebase compares that with the live schema having that out-of-band schema change, it will notice a discrepancy and surface a schema drift anomaly. If that change is intended, then you should establish new baseline to reconcile the schema state again.

In this section, you’ll be guided through this process.

1. You can use an external GUI or terminal to make a change to `db_demo` . In this tutorial, we use Bytebase **SQL Editor’s Admin mode** which also counts when we say **change outside of Bytebase**. Go to **SQL Editor**, and switch to **Admin mode**.

When you make a change in **Admin Mode**, it will not record any history as in a normal process [www.bytebase.com/docs/sql-editor/admin-mode](https://www.bytebase.com/docs/sql-editor/admin-mode)

![bb-sql-editor-admin](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-sql-editor-admin.webp)

2. Paste the following and then press **Enter**:

```sql
ALTER TABLE t1
ADD COLUMN age integer;
```

3. Paste the following and then press **Enter** to verify it’s there:

```sql
SELECT
  table_name,
  column_name,
  data_type
FROM
  information_schema.columns
WHERE
  table_name = 't1';
```

![bb-sql-editor-admin-age](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-sql-editor-admin-age.webp)

4. Wait for 10 mins (as Bytebase does the check roughly every 10 mins). Go to **Anomaly Center**, and you can find the **Schema Drift**.
   ![bb-ac-schema-drift](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-ac-schema-drift.webp)

5. Click on **View diff**, you will see the exact drift.
   ![bb-drift-age](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-drift-age.webp)

6. You may also find the drift by clicking **Databases** > **db_demo**.
   ![bb-dbdemo-drift](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-dbdemo-drift.webp)

7. Go to **Databases** > **db_demo** > **Change History** and click **Establish new baseline**, this step establishes a new baseline to reconcile the schema state from the live database schema.
   ![bb-dbdemo-new-baseline](/docs/tutorials/beginner/database-change-management-using-bytebase-cloud/bb-dbdemo-new-baseline.webp)

8. Bytebase will create an issue to establish the new baseline, click **Create**, and then **Resolve** to mark it done.

9. Go back to **Databases** > **db_demo** or **Anomaly Center**, and you will find the drift is gone.

## Summary and What's Next

Now you have connected Amazon Aurora with Bytebase, and used the UI workflow to accomplish schema change and data change. Bytebase will record the full change history for you. Furthermore, the **Enterprise Plan** is equipped with **Schema Drift Detection** to detect out-of-band schema changes performed outside of Bytebase.

In the [next post](/docs/tutorials/intermediate/database-change-management-with-github-using-bytebase-cloud), you’ll try out GitOps workflow: store your Amazon Aurora schema in GitHub and Bytebase will pick up the changes to the repo, bringing your Amazon Aurora change workflow to the next level, aka **Database DevOps** - [Database as Code](https://www.bytebase.com/blog/database-as-code).
