---
title: Deploy Schema Migration with Bytebase API
author: Ningjing
published_at: 2023/12/21 18:00
feature_image: /content/docs/tutorials/api/api-banner.webp
tags: Tutorial
integrations: General
level: Advanced
estimated_time: '30 mins'
description: "In this tutorial, you will test a sample application that utilizes the Bytebase API to create a change. By following the instructions, you'll gain hands-on experience in running the application and initiating a change using the Bytebase API."
---

Bytebase is a database DevOps and CI/CD Tool for Developer, DBA and Platform Engineering teams.

It provides an intuitive GUI to manage database schema changes. On the other hand, for some teams,
they may want to integrate Bytebase into their existing DevOps platform. This requires calling the
Bytebase API.

![before-after](/content/docs/tutorials/api/before-after.webp)

In this tutorial, you will begin by creating a schema change within the Bytebase console. Then, you will proceed to run an external sample application that utilizes the API to create a similar change.

By following the step-by-step instructions provided, you will have the opportunity to explore and experiment with the Bytebase API. This will give you a practical understanding of how to incorporate it into your own application.

<HintBlock type="info">

The API example repository is at https://github.com/bytebase/api-example

</HintBlock>

## Prerequisites

1. [Docker](https://www.docker.com/) installed
2. Node.js >= v18

## Start Bytebase and prepare the accounts

1. Make sure your Docker daemon is running. Copy and paste the commands to start one Bytebase and two MySQL instances via Docker.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

1. Bytebase is now running via Docker, and you can access it via `localhost:5678`. Register the first admin account which will be granted [`Workspace Admin`](/docs/concepts/roles-and-permissions).

1. Log in as the admin user, click on the gear icon on the top right corner and click on **Workspace** > **Members**.

1. Turn on **Create as service account**, fill in with `api-example`, choose the `DBA` role that is sufficient for this tutorial and click **Add**.
   ![service-account-create](/content/docs/tutorials/api/service-account-create.webp)

1. Find the newly created service account in the **Active members** section and click on **Copy Service Key**. We will use this token to authenticate the API calls.
   ![service-account-key](/content/docs/tutorials/api/service-account-key.webp)

1. Click **Select Project** on the top bar, and you'll see there's a sample project called **Sample Project**. Click on it to enter the project page, there are two databases: `hr_prod` and `hr_test`.

## Create a schema change in Bytebase Console

Let's first review how to create a schema change from console directly.

1. Stay in Bytebase console, go to `Sample Project`. Click the checkbox for `hr_prod` and click **Edit Schema**.

1. Switch **Raw SQL**, paste the following SQL statement and click **Preview issue**.

   ```sql
   CREATE TABLE test_from_console (
     id integer NOT NULL
   );
   ```

1. Click **Create**, after the automatic checks are done, it'll automatically roll out the change. The issue will become **Done**.

## Create a schema change via Bytebase API

Below is an example app demonstrating the following APIs:

- List all projects
- List all database under a project
- Create a schema change issue in the project
- Get the created issue status.

---

1. Go to [Bytebase API Example
   repo](https://github.com/bytebase/api-example) and clone it.

1. Copy `env-template.local` to `.env.local`.Update the variables.

   - `NEXT_PUBLIC_BB_URL`: `http://localhost:5678`
   - `NEXT_PUBLIC_BB_SERVICE_ACCOUNT`: `api-example`
   - `NEXT_PUBLIC_BB_SERVICE_KEY`: service key copied in Step 2

1. Run the following commands to start the sample application.

   ```bash
   pnpm i && pnpm dev
   ```

1. Open the application in your browser, you'll see the following page.
   ![sample-empty](/content/docs/tutorials/api/sample-empty.webp)

1. Choose `Sample Project`, then `hr_prod`, input the following SQL and click **Create New Issue**.

   ```sql
   CREATE TABLE test_from_api (
     id integer NOT NULL
   );
   ```

1. The issue will be created and you'll see the following page.
   ![sample-open](/content/docs/tutorials/api/sample-open.webp)

1. Click the link `View issue xxx in Bytebase[OPEN]` to see the issue in Bytebase Console. You'll notice the issue rolls out automatically and becomes `Done`.
   ![bb-issue-from-api](/content/docs/tutorials/api/bb-issue-from-api.webp)

1. Go back to the sample application, and click **Refresh status**. You'll see the status has changed from [OPEN] to [DONE].
   ![sample-done](/content/docs/tutorials/api/sample-done.webp)

1. For additional information about the example application, refer to the README in its corresponding [GitHub repository](https://github.com/bytebase/api-example/).

## Summary

Congratulations! You've successfully created a schema change via Bytebase API. In similar ways, you could integrate Bytebase API into your existing DevOps platform to automate your schema change process, and benefit Bytebase features such as [SQL Review](/docs/sql-review/overview/), [Custom Approval](/docs/administration/custom-approval/) and [Schema Drift Detection](/docs/change-database/drift-detection/).
