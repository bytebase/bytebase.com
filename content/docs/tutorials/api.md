---
title: Deploy schema migration with Bytebase API
author: Ningjing
published_at: 2023/12/21 18:00
feature_image: /content/docs/tutorials/api/banner.webp
tags: Tutorial
integrations: General
level: Intermediate
estimated_time: '20 mins'
description: "In this tutorial, you will execute a sample application that utilizes the Bytebase API to create a change. By following the instructions, you'll gain hands-on experience in running the application and initiating a change using the Bytebase API."
---

Bytebase is a database DevOps and CI/CD Tool for Developer, DBA and Platform Engineering teams.

It provides an intuitive GUI to manage database schema changes. However, for some teams, they may want to integrate Bytebase into their existing DevOps platform. For example, they may want to automatically deploy application code after certain schema changes are done.

![before-after](/content/docs/tutorials/api/before-after.webp)

In this tutorial, you will begin by creating a schema change within the Bytebase console. Then, you will proceed to run an external sample application that utilizes the API to create a change.

By following the step-by-step instructions provided, you will have the opportunity to explore and experiment with the Bytebase API. This will give you a practical understanding of how to incorporate it into your own application.

## Prerequisites

1. [Docker](https://www.docker.com/) installed
2. Node.js >= v18

### Step 1 - Run Bytebase and prepare the accounts

1. Make sure your Docker daemon is running. Copy and paste the commands to start one Bytebase and two MySQL instances via Docker.

<IncludeBlock url="/docs/get-started/install/terminal-docker-run"></IncludeBlock>

2. Bytebase is now running via Docker, and you can access it via `localhost:5678`. Register the first admin account which will be granted [`Workspace Admin`](/docs/concepts/roles-and-permissions).

3. Log in as the admin user, click on the gear icon on the top right corner and click on **Workspace** > **Members**.

4. Turn on **Create as service account**, fill in with `api-sample`, choose the DBA role that is sufficient for this tutorial and click **Add**.
![service-account-create](/content/docs/tutorials/api/service-account-create.webp)

5. Find the newly created service account in the **Active members** section and click on **Copy Service Key**. We will use this token to authenticate the API calls.
![service-account-key](/content/docs/tutorials/api/service-account-key.webp)

6. Click **Select Project** on the top bar, and you'll see there's a sample project called **Sample Project**. Click on it to enter the project page, there are two databases: `hr_prod` and `hr_test`.
//todo pic

### Step 2 - Create a schema change in Bytebase Console

1. Stay in Bytebase console, go to `Sample Project`. Click the checkbox for `hr_prod` and click **Edit Schema**.

2. Switch **Raw SQL**, paste the following SQL statement and click **Preview issue**.

```sql
CREATE TABLE test_from_console (
  id integer NOT NULL
);
```

3. Click **Create**, after the automatic checks are done, it'll automatically roll out the change. The issue will become **Done**.

### Step 3 - Create a schema change via Bytebase API

1. Go to [Bytebase API Sample
repo](https://github.com/adela-bytebase/bb-api-sample) and clone it.

2. Copy `env-template.local` to `.env.local`.Update the variables.
   - `NEXT_PUBLIC_BB_URL`: `http://localhost:5678`
   - `NEXT_PUBLIC_BB_SERVICE_ACCOUNT`: `api-sample`
   - `NEXT_PUBLIC_BB_SERVICE_KEY`: service key copied in Step 2

3. Run the following commands to start the sample application.
  
  ```bash
  pnpm i
  pnpm run dev
  ```
  
4. Open the sample application in your browser, you'll see the following page.
![sample-empty](/content/docs/tutorials/api/sample-empty.webp)

5. Choose `Sample Project`, then `hr_prod`, input the following SQL and click **Create New Issue**.
  
  ```sql
  CREATE TABLE test_from_api (
    id integer NOT NULL
  );
  ```

6. The issue will be created and you'll see the following page.
![sample-open](/content/docs/tutorials/api/sample-open.webp)

7. Click the link `View issue xxx in Bytebase[OPEN]` to see the issue in Bytebase Console. You'll notice the issue rolls out automatically and becomes `Done`.

8. Go back to the sample application, and click **Refresh status**. You'll see it's from [OPEN] to [DONE].
![sample-done](/content/docs/tutorials/api/sample-done.webp)

1. For additional information about the sample application, refer to the README in its corresponding [GitHub repository](https://github.com/adela-bytebase/bb-api-sample/).

## Summary

Congratulations! You've successfully created a schema change via Bytebase API. In similar ways, you might integrate Bytebase API into your existing DevOps platform to automate your schema change process, with features such as **SQL Review**, **Custom Approval** and **History Tracking**.