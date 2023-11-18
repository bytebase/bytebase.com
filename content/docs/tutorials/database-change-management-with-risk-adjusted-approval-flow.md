---
title: 'Database Change Management with Risk-Adjusted Approval Flow'
author: Ningjing
published_at: 2023/06/01 16:15
feature_image: /content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/dcm-approval-flow.webp
tags: Tutorial
integrations: General
level: Intermediate
estimated_time: '15 mins'
description: 'Bytebase provides a basic rollout mechanism by default. For more complicated enterprise-level cases, users may need different approval flows to handle database changes according to risk levels.'
---

Bytebase provides a basic yet configurable rollout mechanism by default. This means that manual rollout is skipped for Test environments and required for Prod environments.

However, for more complicated enterprise-level cases, users may need different approval flows to handle database changes according to different potential risks. For example, DDL in Prod environments is considered high risk, while DML in Test environments is low risk. Additionally, users may need to involve roles other than DBA/Developer/Project Leader, such as Testers.

This tutorial will walk you through how to create custom approval flows based on self-defined risk rules and how to add new roles to be involved.

## Feature included

- Custom approval flow
- Risk center
- Custom roles

## Prerequisites

- Have [Docker](https://www.docker.com/) installed.

## Step 1 Prepare the databases and users

1. While the docker is running, run this following command to start a Bytebase instance. Here we name it `bytebase-af` and use `~/.bytebase/data-af` folder to store the meta data.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

2. Start two MySQL instances by running these two commands:

- `mysqld-test` , `3307`
- `mysqld-prod` , `3308`

```bash
docker run --name mysqld-test \
  --publish 3307:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

```bash
docker run --name mysqld-prod\
  --publish 3308:3306 \
  -e MYSQL_ROOT_HOST=172.17.0.1 \
  -e MYSQL_ROOT_PASSWORD=testpwd1 \
  mysql/mysql-server:8.0
```

3. Open `localhost:5678` in a browser, register as an admin and you will be granted as **Workspace Admin** role. Click the avatar on the right top, and click **Settings**. You'll see you have the role `Owner` . Click **Start free trial** on the left bottom to upgrade to Enterprise Plan.
4. Click **Workspace** > **Members** on the left bar. Add one `dba@x.com` as **DBA**, and one `dev@x.com` as **Developer**. You need click them and give the default password `12345`.

![bb-settings-members](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-settings-members.webp)

5. Click **Instances** on the top bar and then click **Add instance**, choose `MySQL` . Here you need to add two instances:

   - **Instance Name**: `MySQL Test` / `MySQL Prod`
   - **Environment**: `Test` / `Prod`
   - **Host or Socket**: `host.docker.internal`
   - **Port**: `3307` / `3308`
   - **Username**: `root`
   - **Password**: `testpwd1`

6. Click **Projects** on the top bar and then click **New Project**. Name it `Demo AF` , Key `DAP` and click **Create**.

7. Go into the project `Demo AF` , and click **New DB.** Fill in with **New database name**: `test_db` / **Environment**: `Test` / **Instance**: `MySQL Test` and click **Create.** It'll create an issue, by default, there isn't any approval flow and since it's for Test environment, it will rollout automatically.
   ![bb-issue-create-db-test-done](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-issue-create-db-test-done.webp)

8. Click **New DB** again. Fill in with **New database name**: `test_db` / **Environment**: `Prod` / **Instance**: `MySQL Prod` and click **Create.** It'll create an issue, by default there is no approval flow and since it's for Prod environment, you will need to click **Rollout**.

9. Go back to the project, click **Databases**. You'll see there're two databases.
   ![bb-project-databases](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-project-databases.webp)

## Step 2 Run schema change without custom approval flow

1. Logout and login as **Developer**. Go into the project `Demo AF` , click **Alter Schema**, select both databases, and click **Next**.

2. Click **Raw SQL**, paste the following SQL and click **Preview issue**.

```sql
CREATE TABLE `t1` (
  `id` INT COMMENT 'ID' NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);
```

3. It'll redirect to the issue page. Click **Apply to other tasks**, and click **Create**. By default, there isn't any approval flow and since it's for Test environment, it will rollout automatically. But for Prod environment, you will need to wait for the **Assignee** `Owner` to rollout. You can click **Environments** to see the difference for default configuration.
   ![bb-issue-t1-waiting-rollout](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-issue-t1-waiting-rollout.webp)

4. Logout and login as **Owner**. Go into the project `Demo AF` , find the issue and click **Rollout**. You can click the **View change** to see the difference.
   ![bb-issue-t1-done-no-af](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-issue-t1-done-no-af.webp)

## Step 3 Configure a custom approval flow and run a schema change

1. Click **Settings** on the top bar, and then click **Security & Policy** > **Custom Approval**. Choose `Project Owner → DBA` for **DDL** > **High Risk** instead of `Skip manual approval` .
   ![bb-settings-custom-approval](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-settings-custom-approval.webp)

2. Click the **related risk rules** or **Security & Policy** > **Risk Center**. Click **Add rule** and then click **Load** on the first row in **Templates** section. This rule is assigning `High` risk to all DDL on Prod environment, which will map the corresponding issue to pick the approval flow we just defined under **Custom Approval**. Click **Add**.
   ![bb-add-rule](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-add-rule.webp)

3. Logout and login as **Developer**. Go into the project `Demo AF` , click **Alter Schema**, select both databases, and click **Next**.

4. Click **Raw SQL**, paste the following snippet and click **Preview issue**.

```sql
ALTER TABLE `t1` ADD COLUMN (`age` INT NOT NULL);
```

5. It'll redirect to the issue page. Click **Apply to other tasks**, and click **Create**. This time, you can see there is an approval flow which follows `Project Owner → DBA` . Here comes a question: "But it's not on the Prod environment!" The answer is, since we only do approval flow once, when there is a pipeline, we always take the highest risk one.
   ![bb-issue-waiting-review-project-owner](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-issue-waiting-review-project-owner.webp)

6. Logout and login as **Owner**. Find the issue and click **Approve**.
   ![bb-issue-waiting-review-dba](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-issue-waiting-review-dba.webp)

7. Logout and login as **DBA**. Find the issue and click **Approve**. Since **Test** environment will skip manual rollout, after the approval flow, the SQL will execute automatically. It's time for Owner or DBA to click **Rollout** to execute it on **Prod** environment.
   ![bb-issue-waiting-rollout-dba](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-issue-waiting-rollout-dba.webp)

8. After the rollout, this issue is `Done`.
   ![bb-issue-t1-done-af](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-issue-t1-done-af.webp)

## Step 4 Add custom roles and build your own approval flow

What if there is other roles in the team, for example, a `Tester` . Bytebase has another feature called **Custom Roles**.

1. Login as **Owner**. Click **Settings** on the top bar, and then click **Workspace** > **Custom Roles**. Click **Add role** and fill in with `Tester` and `custom tester` .
   ![bb-settings-add-role-tester](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-settings-add-role-tester.webp)

2. Click **Settings** on the top bar, and then click **Security & Policy** > **Custom Approval**. Click **Approval flows**, and then click **Create**.
   ![bb-settings-custom-approval-approval-flows](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-settings-custom-approval-approval-flows.webp)

3. Fill in the form like this, and click **Create**.
   ![bb-create-custom-approval-flow](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-create-custom-approval-flow.webp)

4. Choose the approval flow `Tester->Project Owner->DBA` .
   ![bb-settings-custom-approval-tester-flow](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-settings-custom-approval-tester-flow.webp)

5. Go to **Settings** > **Workspace** > **Members**, add `tester@x.com` as a new **Developer**. Go to project `Demo AF` , choose role `Tester` .
   ![bb-project-add-tester](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-project-add-tester.webp)

6. Logout and login as **Developer**. Go into the project `Demo AF` , click **Alter Schema**, select both databases, and click **Next**.

7. Click **Raw SQL**, paste the following snippet and click **Preview issue**. You'll see the approval flow.
   ![bb-issue-waiting-review-tester](/content/docs/tutorials/database-change-management-with-risk-adjusted-approval-flow/bb-issue-waiting-review-tester.webp)

## Summary

Now you have tried database change with risk-adjusted custom approval flow, and also create your own custom roles as well. Bytebase provides more enterprise-level features regarding data security and data access control. If you're interested in that, read this article as well [How to Configure Database Access Control and Data Masking for Developer](/docs/tutorials/how-to-manage-data-access-for-developers/).
