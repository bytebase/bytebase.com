---
title: How to Configure Data Access Control and Data Anonymization for Developer
author: Ningjing
published_at: 2023/01/05 21:15
feature_image: /content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/ac-feature.webp
tags: Tutorial
integrations: General
level: Intermediate
description: This tutorial will walk you through how data access control and data anonymization works in Bytebase. You’ll need two Bytebase accounts – one DBA and one Developer.
---

This tutorial will walk you through how **data access control** and **data anonymization** works in Bytebase. You’ll need two Bytebase accounts –  one **DBA** and one **Developer**. DBA is the one who configures the settings and Developer is the one who should only see information based on the configuration.

Both data access control and data anonymization are **Enterprise Plan** only features. However, you can start a **14-day trial of the Enterprise Plan** with one click without providing additional information (no credit card required).

## Preparation phase

This phase will guide you configure and prepare testing data in Bytebase. You can adjust to your needs if you’re familiar with the system. If you already have set up the Bytebase environment, you can skip this part and start from [Test phase](#test-phase).

During this phase, you’ll run one Bytebase and two MySQL instances, add the corresponding database instance to Bytebase’s Test and Prod environments, create tables, and populate them with data.

Make sure you have [Docker](https://www.docker.com/) installed, and if you don’t have important existing Bytebase data locally, you can start over from scratch by `rm -rf ~/.bytebase/data`.

### Step 1 - Start Bytebase with Docker

1. Make sure your docker daemon is running, and then start the Bytebase docker container by typing the following command in the terminal.

```bash
docker run --init \
--name bytebase \
--platform linux/amd64 \
--restart always \
--publish 5678:8080 \
--health-cmd "curl --fail http://localhost:5678/healthz || exit 1" \
--health-interval 5m \
--health-timeout 60s \
--volume ~/.bytebase/data:/var/opt/bytebase \
bytebase/bytebase:$$bb_version$$ \
--data /var/opt/bytebase \
--port 8080
```

2. Type the following commands one by one in the terminal to start two MySQL instances, and they will be mapped to Test and Prod environments later.

```bash
docker run --name mysqldtest \
--publish 3307:3306 \
-e MYSQL_ROOT_HOST=172.17.0.1 \
-e MYSQL_ROOT_PASSWORD=testpwd1 \
mysql/mysql-server:8.0
```

```bash
docker run --name mysqldprod \
--publish 3308:3306 \
-e MYSQL_ROOT_HOST=172.17.0.1 \
-e MYSQL_ROOT_PASSWORD=testpwd1 \
mysql/mysql-server:8.0
```

1. Register admin account DBA - we’ll refer to it as DBA. This account will be granted `Workspace Owner` role. Check [Roles and Permissions (RBAC)](/docs/concepts/roles-and-permissions).

![admin-register](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/admin-register.webp)

4. Open another browser, and register a developer account DEV - we’ll refer to it as Developer. This account will be granted `Workspace Developer` role.

![register](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/register.webp)

### Step 2 - Configuration

1. Follow the onboard guidance or click **Add instance** on home page.

![add-instance](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/add-instance.webp)

2. Create an instance for `Test` Environment with the following configuration. Fill **username**/**password** as `root`/`testpwd1`.

![create-instance](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/create-instance.webp)

3. Follow the onboard guidance or click **New Project** on Projects page. Create a project `TestAccess` and click **Next**.

![new-project](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/new-project.webp)

![create-project](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/create-project.webp)

4. Follow the onboard guidance or Click **New DB** on the project `TestAccess` page.
   ![new-db.webp](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/new-db.webp)

5. Create a database `demo`, and click **Next**.

![create-db](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/create-db.webp)

6. You'll be redirected to the issue page, and an issue is created. Since it’s for `Test` environment, it will execute without approval from you. Click **Resolve issue**, and the issue will be done.

![issue-create-demo](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-create-demo.webp)

7. Repeat 1 and 2 to add another instance `MySQL Prod` for `Prod` environment. The adjustments are environment should be `Prod` instead of `Test`,  and port number should be `3308` instead of `3307`.

![2-instances](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/2-instances.webp)

8. Repeat 4 and 5 to create another database `demo` but for `Prod` environment. Since it’s for `Prod` environment, the `Assignee` should click **Approve** to allow it to execute. After its execution, click **Resolve issue**, and the issue will be done.

![issue-create-demo-waiting](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-create-demo-waiting.webp)

![issue-create-demo-done](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-create-demo-done.webp)

### Step 3 - Table and Data

1. Go to the project `TestAccess`, and click **Alter Schema**.

![alter-schema](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/alter-schema.webp)

2. Choose both **Test** and **Prod**, and click **Next**.

![select-test-prod](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/select-test-prod.webp)

3. Use Schema Editor to create `t1` table for both Test and Prod environments. Click **Preview issue**.

![schema-editor](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/schema-editor.webp)

4. An issue with the pipeline is created with information filled. Click **Create**.

![issue-alter-schema-preview](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-alter-schema-preview.webp)

5. The issue will execute against `Test` environment without approval and then become `Waiting Approval` on `Prod` environment. Click **Approve** and it will continue executing against `Prod` environment.

![issue-alter-schema-waiting](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-alter-schema-waiting.webp)

6. Click **Resolve issue** and the issue will be done.

![issue-alter-schema-done](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-alter-schema-done.webp)

7. Go back to project `TestAccess` page, and click **Change Data**.

![change-data](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/change-data.webp)

8. Choose databases for both environments, and click **Next**.

![select-test-prod-change-data](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/select-test-prod-change-data.webp)

9. Fill SQL as follows:

```sql
INSERT INTO t1
VALUES
(1,'Adela','12345678'),
(2,'Bela','11111111');
```

and click **Apply to other tasks**. Click **Create** and the issue will be created.

![issue-change-data-preview](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-change-data-preview.webp)

10. Repeat 5 and 6, and the issue is done.

![issue-change-data-waiting](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-change-data-waiting.webp)

![issue-change-data-done](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/issue-change-data-done.webp)

## Upgrade phase

With the preparation from the previous phase, you’re almost ready for testing. However, since access control and data anonymization are only available in the **Enterprise Plan**, you need to request a **free 14-day Enterprise Plan trial**.

### Step 1 - Upgrade to a 14-day Enterprise Plan trial

1. Log in as DBA, click **Environments** on the top navigation bar.  Check **Mark as protected environment** under `Test` environment. Click **Update**, and click **Upgrade trial**.

![env-test-mark](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/env-test-free-to-enterprise.webp)

![upgrade-trial-popup](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/upgrade-trial-popup.webp)

2. Now it’s Enterprise Plan. Uncheck **Mark as protected environment** and click **Update**.

![enterprise-plan](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/enterprise-plan.webp)

### Step 2 -  Add developer as project member

Go to project `TestAccess` > **Settings** > **Manage members** to add Developer as `Project Developer`. Only after this, can Developer see the project.

![add-dev](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/add-dev.webp)

## Test phase

### Test Data Access Control

1. Log in as DBA, and click **Environments** on the top navigation bar. Click **Prod**, and make sure the **Mark as protected environment** is unchecked. It means the prod environment is not protected.

![env-prod-unmark](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/env-prod-unmark.webp)

2. Log in as Developer, and click **SQL Editor** on the left bar.

![home-sql-editor](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/home-sql-editor.webp)

3. Within SQL Editor, you can view both databases under `Prod` and `Test` environments.

![sql-editor-visible](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/sql-editor-visible.webp)

4. Log in as DBA, and click **Environments** on the top navigation bar. Click **Prod**, and check **Mark as protected environment** and click **Update**. You can see there is a shield beside Prod, which means the environment is protected.

![env-prod-protected](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/env-prod-protected.webp)

5. Log in as Developer and go into SQL Editor again. Now you can only see database under `Test` environment. It’s because `Prod` environment is protected.

![sql-editor-invisible](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/sql-editor-invisible.webp)

6. Log in as DBA, and click **Settings** on the top navigation bar. Click **Workspace** > **Access Control**. Click **Add rule**.

![settings-ac-add-rule](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/settings-ac-add-rule.webp)

7. Choose `demo` under `Prod` environment and click **Add**. Only databases under protected environments will list here.

![add-rule-popup](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/add-rule-popup.webp)

8. Log in as Developer, and go to SQL Editor. You can see database `demo` under protected `Prod` environment because of the Access rule DBA just granted.

![sql-editor-protected](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/sql-editor-protected.webp)

9. Login as DBA, click **Environments**, uncheck **Mark as protected environment** under Prod, and click **Update**. Click **Settings** > **Workspace** > **Access Control**, and click the trash icon to delete the rule.

![settings-ac-rule-list](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/settings-ac-rule-list.webp)

### Test Data Anonymization

1. Log in as Developer, and go to SQL Editor. Currently, you can view all the information. We want to anonymize the `mobile` column.

![sql-editor-select](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/sql-editor-select.webp)

2. Log in as DBA, and click **Databases** on the top navigation bar. Click the `demo` under Prod environment, and click `t1`. Under the **Columns** section, you can see the **Sensitive** checkbox for each row.

![db-t1](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/db-t1.webp)

3. Check the checkbox for mobile row.

![db-t1-mobile](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/db-t1-mobile.webp)

4. Click **Settings** > **Workspace** > **Sensitive Data**, and you should see the sensitive rule list.

![settings-sensitive-data](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/settings-sensitive-data.webp)

5. Log in as Developer, and go to SQL Editor. The `mobile` column is anonymized.

![sql-editor-select-sensitive](/content/docs/tutorials/how-to-configure-database-access-control-and-data-anonymization-for-developer/sql-editor-select-sensitive.webp)

## Summary

You have now tried out the basics of data access control and data anonymization in Bytebase. If you want to learn the overall picture of data access control, please check out [How to Manage Data Access Control](/blog/how-to-manage-database-access-control).
