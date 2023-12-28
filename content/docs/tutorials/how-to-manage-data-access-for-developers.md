---
title: How to Manage Data Access for Developers
author: Ningjing
published_at: 2023/09/04 20:15
feature_image: /content/docs/tutorials/how-to-manage-data-access-for-developers/feature.webp
tags: Tutorial
integrations: General
level: Intermediate
pinned: true
estimated_time: '15 mins'
description: When you have a team of developers, it is critical to restrict their access to data to only what they need to do their job. This ensures to protect sensitive data and prevent unauthorized access.
---

When you have a team of developers, it is critical to restrict their access to data to only what they need to do their job. This ensures to protect sensitive data and prevent unauthorized access.

Bytebase provides several powerful features to help you achieve this:

- You can restrict users to only view data in a specific environment.
- Developer can require approval to access a specific table.
- You can mask sensitive data, such as salary.
- You can track who has accessed which data.
- You can add watermarks to your data to deter unauthorized copying.

This tutorial will walk you through how to use these features in Bytebase.

All are **Enterprise Plan** only features. However, you can start a **14-day trial of the Enterprise Plan** with one click without providing additional information (no credit card required).

## Preparation

Make sure you have [Docker](https://www.docker.com/) installed, and if you don’t have important existing Bytebase data locally, you can start over from scratch by `rm -rf ~/.bytebase/data`.

You’ll need two Bytebase accounts –  one **Owner** and one **Developer**.

- **Owner** is the one who configures the settings.
- **Developer** is the one who should only see information based on the configuration.

### Step 1 - Run Bytebase via Docker

1. Make sure your docker daemon is running, and then start the Bytebase docker container by typing the following command in the terminal.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

### Step 2 - Register accounts Owner and Developer

1. Visit `localhost:8080` in the browser. Register an admin account, we’ll refer to it as **Owner**. This account will be granted `Workspace Admin` role. To keep it simple, we use this **Owner** instead of registerating another **DBA** in this tutorial. Check [Roles and Permissions](/docs/concepts/roles-and-permissions).

![admin-register](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-admin-register.webp)

1. Log out and register another account.

![register](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-normal-register.webp)

3. Switch back to **Owner**, now you can see there's a `Sample Project` with two embedded databases both named `employee` mapping to `Test` and `Prod` environments respectively.
   ![bb-proj-db](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-proj-db.webp)

4. Click **Members** and **Grant Access** to add **Developer** as `Developer`. Only after this, can he see the project.
   ![bb-proj-members-dev](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-proj-members-dev.webp)

### Step 3 - Start Enterprise Plan trial and assign license to instances

1. Click **Start free trial** on the left bottom. Click **Start 14 days trial (no credit card required)**.

2. Click **Instances** on the top navigation bar. You can see there are two instances. Click them one by one, and turn on **Assign License** for both. You may check [Manage License](/docs/administration/license/) for more details.
   ![bb-instance-assign-license](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-instance-assign-license.webp)

## Data Access Control - Query Data

Log in as **Developer**, and you can see `Sample Project`. Click **SQL Editor** on the left bar. Within SQL Editor, you can't see anything. It's because you don't have any database access permission yet.
![bb-sql-editor-blank](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-sql-editor-blank.webp)

### Step 1 - Developer can skip approvals to query data

1. Log in as **Owner**, and go to **Settings** > **Data Access Control**. Check `Skip approval` for **Query Data** in `Test` environment.
   ![bb-owner-dac-skip](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-owner-dac-skip.webp)

2. Log in as **Developer** and go into SQL Editor again. Now you can see database under `Test` environment. Select `(Prod)employee`, input `SELECT * FROM salary;` and run and you can see the result. Change `salary` to any other tables and run, you can see data as well.
   ![bb-dev-sql-editor-test-select-salary](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-dev-sql-editor-test-select-salary.webp)

### Step 2 - Developer can request to query data

In practice, developers can access any database on `Test` environment, but they need to obtain permission to access `Prod` environment. In this step, we'll show you how to implement this.

1. Log in as **Owner**, and go to **Settings** > **Custom Approval**. Scroll down to **Request Query**, and choose `Workspace Admin` as **Approval flow**.
2. Go to **Settings** > **Risk Center**. Click **Add Rule**. Choose `Request Query` as **Type**. Choose `High` as **Risk**. Click **Load** for the first template on the right. Click **Add**.
   ![bb-owner-risk-center-request-query](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-owner-risk-center-request-query.webp)

3. Log in as **Developer**, and go to `Sample Project`, click **Request Query**. Choose **Manual select** and then `employee` table under `Prod` environment. Click **OK**.
   ![bb-proj-request-query-salary](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-proj-request-query-salary.webp)

4. A request issue is created with the approval flow `Workspace Admin` we just defined.
   ![bb-issue-request](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-issue-request.webp)

5. Log in as **Owner**, go to this issue and click **Approve**.

6. Log in as **Developer**, and go to SQL Editor. You can see `salary` table under `Prod` environment. Select `(Prod)employee`, input `SELECT * FROM salary;` and run, you'll see the result.
   ![bb-salary-before-masking](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-salary-before-masking.webp)

7. Input `SELECT * FROM employee;` and run, it'll show permission denied. You can click **Request Query** to request permission.

### Step 3 - Owner can grant access to query data directly

1. Log in as **Owner**, and go to `Sample Project`. Click **Members** and then **Grant Access**. Choose `Developer` and assign the role `Querier`, `All` for **Databases**. Click **Confirm**.
2. Log in as **Developer**, and go to SQL Editor. You can see all databases under `Test` and `Prod` environment. Select `(Prod)employee`, input `SELECT * FROM employee;` and run, you can see the result. Change `employee` to any other tables and run, you can see data as well.

## Data Access Control - Export Data

Export Data is similar to Query Data. **Developer** can skip approvals, request approvals to export data or be granted `Exporter` role directly by **Owner**.
![bb-export-request](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-export-request.webp)

## Data Masking

1. Log in as **Developer**, and go to SQL Editor. Select `(Prod)employee`, input `SELECT * FROM salary;` and run, you can see all the information. We want to mask the `amount` column.
2. Login in as **Owner**, click **Databases** on the top navigation bar and then choose `employee` under `Prod` environment. Scroll down to **Tables**, click `salary` table, and check `amount` row as **Sensitive**.
   ![bb-owner-masking-salary](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-owner-masking-salary.webp)

3. Log in as **Developer**, and go to SQL Editor. Select `(Prod)employee`, input `SELECT * FROM salary;` and run, you can see the `amount` column is masked.
   ![bb-masking-salary](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-masking-salary.webp)

## Audit Log

Bytebase records everything happened within the system. You may check the audit log.
Log in as **Owner**, and go to **Settings** > **Audit Log**. You can see all the queries you've run.
![bb-owner-audit-log](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-owner-audit-log.webp)

## Watermark

Bytebase provides watermark feature to help you identify the data source. You can click **Settings** > **General**, and scroll to **Security** to enable it.
![bb-watermark](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-watermark.webp)

## Summary

With Bytebase, you have now tried out the basic management of data access for developers. If you want to know more about database change as well, you can check [Database CI/CD and Schema Migration with PostgreSQL](/docs/tutorials/database-change-management-with-postgresql/).
