---
title: How to Manage Data Access for Developers
author: Ningjing
updated_at: 2024/10/08 20:00
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

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

### Step 2 - Register accounts Owner and Developer

1. Visit `localhost:8080` in the browser. Register an admin account, we’ll refer to it as **Owner**. This account will be granted `Workspace Admin` role. To keep it simple, we use this **Owner** instead of registerating another **DBA** in this tutorial. Check [Roles and Permissions](/docs/concepts/roles-and-permissions).

![admin-register](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-admin-register.webp)

1. Log out and register another account.

![register](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-normal-register.webp)

3. Switch back to **Owner**, enter **Projects** section on the left, where you can see a `Sample Project` with two embedded databases mapping to `Test` and `Prod` environments respectively.
   ![bb-proj-db](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-proj-db.webp)

4. Click **Members** and **Grant Access** to assign `Project Developer` to the other account. Only after this can he see the project.
   ![bb-proj-members-dev](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-proj-members-dev.webp)

### Step 3 - Start Enterprise Plan trial and assign license to instances

1. Click your avatar on the upper-right. Click **Start free trial** and **Request 14 days trial (no credit card required)**.

2. You have to click the `Sample Project` selection bar on the upper-left and go **Back to workspace** first.
   ![back-to-workspace](/content/docs/tutorials/how-to-manage-data-access-for-developers/back-to-workspace.webp)

3. Enter **Instances** section on the left. **Assign License** for both intances here. You may check [Manage License](/docs/administration/license/) for more details.
   ![bb-instance-assign-license](/content/docs/tutorials/how-to-manage-data-access-for-developers/bb-instance-assign-license.webp)

## Data Access Control - Query Data

Log in as `Developer`, and you can see `Sample Project`. Enter **SQL Editor** on the upper-right. You ought to **Connect to a database** to get started, yet there's no database data. It's because you don't have any database access permission yet.
![connect-to-a-database-no-data](/content/docs/tutorials/how-to-manage-data-access-for-developers/connect-to-a-database-no-data.webp)

### Step 1 - Developer can skip approvals to query data

1. Log in as **Owner**, and go into the `Sample Project`. Click **Members** and then click **Grant Access**. Choose `AllUsers`, assign the role `Project Querier`, manually choose the whole Test Database and click **Confirm**.

2. Log in as **Developer** and go into SQL Editor again. Now you can see database under `Test` environment. Select `(Test)employee`, input `SELECT * FROM salary;` (`salary` can be changed to any other table) and run, you will see the result.

### Step 2 - Developer can request to query data

In practice, developers can access any database on `Test` environment, but they need to obtain permission to access `Prod` environment. In this step, we'll show you how to implement this.

1. Log in as **Owner**, and go to **CI/CD** > **Custom Approval**. Scroll down to **Request Querier Role**, and choose `Workspace Admin` as **Approval flow**.

2. Go to **CI/CD** > **Risk Center**. Click **Add Rule**. Choose `Request Querier Role` as **Type**. Choose `High` as **Risk**. Click **Load** for the first template on the right. Click **Add**.
   ![owner-risk-center-request-query](/content/docs/tutorials/how-to-manage-data-access-for-developers/owner-risk-center-request-query.webp)

3. Log in as **Developer**, and go to `Sample Project`. Enter **Database** > **Databases** on the left and click **Request Querier Role**. Choose **Manual select** and then `salary` table under `Prod` environment. Click **OK**.
   ![proj-request-query-salary](/content/docs/tutorials/how-to-manage-data-access-for-developers/proj-request-query-salary.webp)

4. A request issue is created with the approval flow `Workspace Admin` we just defined.
   ![issue-request](/content/docs/tutorials/how-to-manage-data-access-for-developers/issue-request.webp)

5. Log in as **Owner**, go to this issue and click **Approve**.

6. Log in as **Developer**, and go to SQL Editor. You can see `salary` table under `Prod` environment. Select `hr_prod`, input `SELECT * FROM salary;` and run, you'll see the result.
   ![salary-with-masking](/content/docs/tutorials/how-to-manage-data-access-for-developers/salary-with-masking.webp)

7. Input `SELECT * FROM employee;` and run, it'll show permission denied. You can click **Request Query** to request permission.

### Step 3 - Owner can grant access to query data directly

1. Log in as **Owner**, and go to `Sample Project`. Click **Members** and then **Grant Access**. Choose `Developer` and assign the role `Project Querier`, `All` for **Databases**. Click **Confirm**.

2. Log in as **Developer**, and go to SQL Editor. You can see all databases under `Test` and `Prod` environment. Select `hr_prod`, input `SELECT * FROM employee;` and run, you can see the result. Change `employee` to any other tables and run, you can see data as well.

## Summary

With Bytebase, you have tried out basic management of data access for developers. For more about database change, check [Database CI/CD and Schema Migration with PostgreSQL](/docs/tutorials/database-change-management-with-postgresql/).
