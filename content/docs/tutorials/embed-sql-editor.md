---
title: Embed SQL Editor in Your Internal Web Portal
author: Ningjing
updated_at: 2024/10/31 21:15
tags: Tutorial
level: Intermediate
integrations: API
estimated_time: '25 mins'
description: Embed Bytebase SQL Editor in your own internal web portal.
---

Bytebase is an open-source database DevSecOps solution for Developer, Security, DBA, and Platform Engineering teams. The GitLab for database DevSecOps.

The SQL Editor is Bytebase's SQL client, offering powerful features such as **centralized access control**, **data masking**, **audit logs**, **AI assistance**, and more. This tutorial will guide you through the process of integrating it into your internal web portal using the Bytebase API.

Imagine you are a SaaS provider and you provision a separate database to store the data for each customer. Sometimes, you need your support team to query the customer database for troubleshooting. You want to embed SQL Editor into your internal support portal and grant query permission to the support team on demand.

By the end of this tutorial, you will have achieved the following:

<iframe width="100%" height="320" src="https://www.youtube.com/embed/SrH2kwQhALI?si=hI-b3sGMnscLwvgt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Prerequisites

- A Google Cloud account
- Docker installed
- Download the [api-example repository](https://github.com/bytebase/api-example), you'll only need `sql-editor` folder for this tutorial

## Workflow Overview

### Setup

1. Setup Google OAuth
1. Run a Bytebase instance and setup Google SSO
1. Configure the environment variables and run the `sql-editor` demo app

### Demo App

1. Purpose
1. Process

## Setup

### Setup Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/), create a new project `GoogleAuth`, and then click **APIs & Services**.
1. On the left bar, click **Credentials**, then click **+CREATE CREDENTIALS**, and select **OAuth client ID**.
1. Choose `Web application` as the **Application type**, give it a **Name**.

   ![gc-new-oauth](/content/docs/tutorials/embed-sql-editor/gc-new-oauth.webp)

1. For **Authorized redirect URIs**, add `http://localhost:8080/oauth/callback` and click **CREATE**.
1. Save the **Client ID** and **Client Secret** for later use.

### Run Bytebase, setup SSO and an admin user

1. Start Bytebase via Docker and register an account which will be granted `Workspace Admin` role.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

1. Log in to Bytebase, go to **IAM&Admin > SSO**, click **Create SSO**.
   
   ![bb-sso-create](/content/docs/tutorials/embed-sql-editor/bb-sso-create.webp)

1. Select `OAuth 2.0` as the **Type**, and `Google` used as the **template**.
1. Fill in the **Client ID** and **Client Secret**, which you can save from Google Cloud Console.
1. Click **Test Connection**, if it's successful, click **Create**.

You'll need an API service account user too:

1. Go to **IAM&Admin > Users&Groups**, click **+Add User**.
1. Choose `Service Account` as the **Type**, fill in the **Email** with `super-api@service.bytebase.com`, choose `Workspace Admin` as **Roles**, and click **Confirm**.
1. Copy the **Service Key** for later use.

### Configure the environment variables and run the `sql-editor` demo app

1. Go to the `sql-editor` folder of the `api-example` repository, and copy `env-template.local` file as `.env.local`. Replace the placeholders with yours.

   ```javascript

   NEXT_PUBLIC_BB_HOST=http://localhost:8080
   NEXT_PUBLIC_BB_SERVICE_ACCOUNT=super-api@service.bytebase.com
   NEXT_PUBLIC_BB_SERVICE_KEY=bbs_xfdsfdsafxxxxxxxfhui
   NEXT_PUBLIC_BB_OAUTH_CLIENT_ID=12345-xxxxxxxxxxx.apps.googleusercontent.com
   NEXT_PUBLIC_BB_OAUTH_CLIENT_CALLBACK_URL=http://localhost:8080/oauth/callback

   ```

1. Run `pnpm i` and `pnpm run dev`, you can run the demo app locally with `localhost:3000`.

   ![demo-empty](/content/docs/tutorials/embed-sql-editor/demo-empty.webp)

## Demo App

_Note: Due to security constraints, Google OAuth only permits the SQL Editor to be opened in an iframe by users who are logged in as the Google Cloud Console configurator. This application is solely for demonstration purposes._

### Purpose

The demo app simulates the process of receiving your email from your internal portal. It then uses this email to authenticate via SSO (Google OAuth) with Bytebase and opens the Bytebase SQL Editor within an iframe.

A real world will be like: You are a SaaS provider and you provision a separate database to store the data for each customer. Sometimes, you need your support team to query the customer database for troubleshooting. You want to embed SQL Editor into your internal support portal and grant query permission to the support team on demand

### Process

1. The demo app receives your email from your internal portal.
1. It then uses that email to check if there is a Bytebase user with that email using the API `/v1/users/${email}`. If no user is found, it creates a new user with the email. The username is derived by removing the `@` and `.` symbols from the email.

   ```javascript

      const createUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: username,
          email: email,
          password: password,
          userType: 'USER',
          state: 'ACTIVE',
        }),
      });

   ```

1. It then use the username to check if there is a project with that name with the API `/v1/projects/${username}`, if there is no project, it'll create a new project with the username.

   ```javascript

      const createProjectResponse = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects?projectId=${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: username,
          key: username,
        }),
      });

   ```

1. Within the project, it'll create a database with the username. The database will be created on Bytebase's embedded PostgreSQL instance `test-sample-instance`. First check if there is a database with that name using the API `/v1/instances/test-sample-instance/databases/${username}`, if no, it'll create a new database by creating an issue.

   Typically, the issue creation process in Bytebase involves four steps: **sheet -> plan -> issue -> rollout**. However, for a database creation issue, it only includes three steps: **plan -> issue -> rollout**.

   ```javascript
      const newPlan = {
         "steps": [
               {
                  "specs": [
                     {
                           "id": v4(),
                           "create_database_config": {
                              "target": `instances/test-sample-instance`,
                              "database": project,
                              "owner": "bbsample",
                              "characterSet": `UTF8`
                           }
                     }
                  ]
               }
         ],
         "title": `Create database ${project}`,
         "description": "Create a database"
      };
   ```

   ```javascript
      const newIssue = {
         "approvers": [],
         "approvalTemplates": [],
         "subscribers": [],
         "title": `Create a empty database ${project}`,
         "description": `Create a database`,
         "type": "DATABASE_CHANGE",
         "assignee": "",
         "plan": planName
      };
   ```

   ```javascript
      const newRollout = { "plan": planName };
   ```

1. Once the database is created, you must assign the necessary permissions to the user for database access. In this case, the user is granted the `Project Owner` role.

   First, fetch the project IAM using the API `/v1/projects/${project}:getIamPolicy`. Then, add the new role to the array and update the IAM using the API `/v1/projects/${project}:setIamPolicy`.

   ```javascript
      response.bindings.push({
        "role": "roles/projectOwner",
        "members": [`user:${email}`],
        "condition": {
          "expression": "",
          "title": "",
          "description": "",
          "location": ""
        },
        "parsedExpr": null
      });
   ```

1. To show the SQL Editor and allow editing directly instead of the issue system. You'll need to switch the workspace mode from **Issue** to **SQL Editor**:

   ```javascript
      const response = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/settings/bb.workspace.profile?updateMask=value.workspace_profile_setting_value.database_change_mode`, token, {
         method: 'PATCH',
         body: JSON.stringify({
               "value": { 
                  "workspaceProfileSettingValue": {
                     "databaseChangeMode": "EDITOR"
                  }
               }
         })
      });
   ```

1. After all this is done, the app will open the Bytebase instance in an iframe with your SSO logged in credentials.

   ![demo-finish](/content/docs/tutorials/embed-sql-editor/demo-finish.webp)

## Summary

Now you've learned how to embed the Bytebase SQL Editor in your own internal portal with Google OAuth SSO setup. Bytebase SQL Editor is a powerful tool with centralized access control and auditability, with the help of the Bytebase API, it can be easily customized and integrated into your own internal web portal.