---
title: 'Just-in-Time Database Access - Part 1'
author: Ningjing
tags: Tutorial
updated_at: 2024/12/06 18:15
integrations: General
level: Beginner
estimated_time: '30 mins'
description: 'In this tutorial, we will demonstrate how to set up Just-in-Time (JIT) access using the Bytebase GUI.'
---

In a production environment, an incident arises that requires a developer to access the production database for troubleshooting. However, the developer does not have the necessary access privileges. To address this, the developer can request Just-in-Time (JIT) access to the production database. Bytebase streamlines this process, allowing developers to efficiently request and obtain temporary access when needed.

This tutorial will guide you through setting up Just-in-Time (JIT) access using the Bytebase GUI. In the next tutorial, we will explore automating JIT access through Slack by leveraging Bytebase webhooks and API.

![jit-graph1](/content/docs/tutorials/just-in-time-database-access-part1/jit-graph1.webp)

---

This is Part 1 of our tutorial series on implementing Just-in-Time (JIT) access:

- Part 1: JIT database access via Bytebase GUI
- Part 2: [Approve JIT database access via Slack](/docs/tutorials/just-in-time-database-access-part2)
- Part 3: Request JIT database access via Slack

## Prerequisites

Before you begin, make sure you have:

- [Docker](https://www.docker.com/) installed

## Step 1 - Run Bytebase in Docker and register a developer user

1. Make sure your docker daemon is running, and start the Bytebase docker container by typing the following command in the terminal.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

   Bytebase starts successfully if you see following message.

   <IncludeBlock url="/docs/get-started/install/terminal-startup-output-success"></IncludeBlock>

   Now you have Bytebase running in Docker.

1. Open your browser and navigate to http://localhost:8080, you should see the Bytebase Signup page. The first registration user will be granted as the `Workspace Admin`.

1. Go into Bytebase console, click **IAM & Admin > Users & Groups** on the left sidebar, add a new dev user, giving it a `Project Developer` role which will apply to all projects.

## Step 2 - No access to production database

As a developer user, you will not have the access to query the production database by default.

1. Login as the developer user you created in Step 1, click **Select Project** on the top sidebar, choose `Sample Project`.

1. Click **Database** > **Databases** on the left bar, you should see two databases listed: `hr_prod` and `hr_test`.

1. Click `hr_prod`, you will see the SQL Editor icon is greyed out, which means you don't have access to this database in SQL Editor. Even you click **SQL Editor** button on the top bar to navigate to the SQL Editor page, you still don't have access to this database.

   ![bb-sql-editor-grey](/content/docs/tutorials/just-in-time-database-access-part1/bb-sql-editor-grey.webp)

## Step 3 - DBA assign you access to the production database (Community and Pro Plan)

In Bytebase **Community** and **Pro Plan**, the Admin/DBA can assign you access to the production database.

1. Login as the Admin user, go into `Sample Project`, click **Manage** > **Members** on the left sidebar.

1. Find the developer user you created in Step 1, click **Edit** pen button and then click **Grant Access** button.

1. In the **Grant Access** modal, select the `SQL Editor User` role, then set 1 day Expiration, and click **Confirm** button. Here you may notice in Community and Pro Plan, you can only set access to all databases in the project.

   ![bb-community-grant-query](/content/docs/tutorials/just-in-time-database-access-part1/bb-community-grant-query.webp)

1. After the access is granted, login as the developer user again, you should see the SQL Editor icon is no longer greyed out, which means you have access to the production database in SQL Editor. After one day, the access will expire automatically.

   ![bb-sql-editor-query](/content/docs/tutorials/just-in-time-database-access-part1/bb-sql-editor-query.webp)

## Step 4 - Request a JIT access to the production database (Enterprise Plan)

In Bytebase **Enterprise Plan**, you can request a JIT access to the production database.

1. Login as Admin user, go into `Sample Project` and revoke the developer user's access to the production database.

1. Upgrade to the **Enterprise Plan**. You may request a 14-day trial from [here](https://www.bytebase.com/contact-us/).

1. Click **CI/CD** > **Custom Approval** on the left sidebar. Assign licenses to the instances to enable this feature.

   ![bb-assign-license](/content/docs/tutorials/just-in-time-database-access-part1/bb-assign-license.webp)

1. Scroll down to **Request Querier Role** section, add `high` risk an approval flow `Project Owner`.

   ![bb-custom-approval](/content/docs/tutorials/just-in-time-database-access-part1/bb-custom-approval.webp)

1. Click **CI/CD** > **Risk Center** on the left sidebar. Define a High risk policy for `Request Querier Role` which triggers when the environment is `Prod`.

   ![bb-risk-center](/content/docs/tutorials/just-in-time-database-access-part1/bb-risk-center.webp)

1. Login as the developer user again, then go to SQL Editor page. Click **Connect to a database** or **Select a database to start**. You should see the `hr_prod` and `hr_test` databases listed, click **Request query** to request a JIT access.

   ![bb-sql-editor-request](/content/docs/tutorials/just-in-time-database-access-part1/bb-sql-editor-request.webp)

1. Another way is to go to **Database > Databases** page, click **Request Querier Role**.

   ![bb-databases-request](/content/docs/tutorials/just-in-time-database-access-part1/bb-databases-request.webp)

1. In the **Request Querier Role** modal, choose **Manually select**, then `employee` `salary` and `title` under `hr_prod` database, and click **OK** button. Here you may also specify the expiration time which can be a specific time, or relative time from now.

   ![bb-sql-editor-choose](/content/docs/tutorials/just-in-time-database-access-part1/bb-sql-editor-choose.webp)

   ![bb-sql-editor-custom-expr](/content/docs/tutorials/just-in-time-database-access-part1/bb-sql-editor-custom-expr.webp)

1. An request issue will be created, switch to the project owner (the admin user), go to **Issue** page, you should see the request issue. Click **Approve** button to approve the request.

   ![bb-request-waiting](/content/docs/tutorials/just-in-time-database-access-part1/bb-request-waiting.webp)

1. Switch back to the developer user, go to SQL Editor page, you should be able to query from these three tables. If you query from other tables, you will get errors and suggest to request a JIT access.

   ![bb-sql-editor-not-ok](/content/docs/tutorials/just-in-time-database-access-part1/bb-sql-editor-not-ok.webp)

1. After the developer user get the access, he can solve the incident. The admin user can revoke the access directly from the **Manage** > **Members** page or wait for the access expiration.

## Conclusion

In this tutorial, we demonstrated how to set up Just-in-Time (JIT) access using the Bytebase GUI. In the next tutorial, we will explore automating JIT access via Slack, utilizing Bytebase webhooks and API. Stay tuned!
