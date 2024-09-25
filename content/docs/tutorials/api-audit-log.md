---
title: Audit Database Activities with Bytebase API
author: Ningjing
updated_at: 2024/09/23 18:00
tags: Tutorial
integrations: General, API
level: Advanced
estimated_time: '40 mins'
description: 'Learn how to use the Bytebase API to fetch audit log in Bytebase'
---

Bytebase is a database DevOps and CI/CD tool designed for developers, DBAs, and platform engineering teams. While it offers an intuitive GUI for managing database schema changes and access control, some teams may want to integrate Bytebase into their existing DevOps platforms using the [Bytebase API](/docs/api/overview/).

![before-after](/content/docs/tutorials/api-audit-log/api-audit-log-graph.webp)

In our previous tutorials, we demonstrated how to use the Bytebase API to:

  1. [Create a schema change](/docs/tutorials/api-issue)
  1. [Check user and database permissions](/docs/tutorials/api-user-database-permission)

This tutorial will focus on fetch and filter audit log in Bytebase, it's OK if you haven't gone through the previous tutorials.

<HintBlock type="info">

This tutorial code repository is at https://github.com/bytebase/api-example/tree/main/audit-log

</HintBlock>

## Prerequisites

1. [Docker](https://www.docker.com/) installed
1. Node.js >= v18

## Start Bytebase

<IncludeBlock url="/docs/tutorials/share/start-bytebase"></IncludeBlock>

## Create Service Account

<IncludeBlock url="/docs/tutorials/share/create-service-account"></IncludeBlock>

## Run Demo

1. Go to [Bytebase API Example
   repo](https://github.com/bytebase/api-example) and clone it.

1. Copy `env-template.local` to `.env.local`.Update the variables.

   - `NEXT_PUBLIC_BB_URL`: `http://localhost:8080`
   - `NEXT_PUBLIC_BB_SERVICE_ACCOUNT`: `api-example`
   - `NEXT_PUBLIC_BB_SERVICE_KEY`: service key copied in previous step

1. Go to subfolder `audit-log`, and run the following commands to start the demo application.

   ```text
   pnpm i && pnpm dev
   ```

1. Open the demo in your browser, you'll see the following page.
   ![api-audit-log-demo](/content/docs/tutorials/api-audit-log/api-audit-log-demo.webp)

1. To enhance the demo's realism, go to Bytebase:
   - Go to **SQL Editor** to query the database
   - Go to a specific project and do some database changes, e.g. create a database, create a table, add some data.

## Fetch and Filter Audit Log

Let's dig into the [code](https://github.com/bytebase/api-example/tree/main/audit-log/src):

1. In `page.tsx`, we fetch all projects by calling the [/v1/projects](https://api.bytebase.com/#tag/projectservice/GET/v1/projects) API before any project selection.

1. Bytebase has two levels of audit log: **Workspace** and **Project**. When the user first visit the demo, We fetch Workspace-level audit log via [/v1/auditLogs:search](https://api.bytebase.com/#tag/auditlogservice/POST/v1/auditLogs:search) API. The default time range is 7 days back till now. You may also adjust the time range by passing `startTime` and `endTime` in the request body via `filter`.

   ```javascript
   const filter = `create_time >= '${startDate}' && create_time <= '${endDate}'`;
   ```

1. In `db-fetch-user-permission.tsx`, if the user select a speicifc project, we fetch the project-level audit log via [/v1/projects/PROJECT_ID/auditLogs:search​](https://api.bytebase.com/#tag/auditlogservice/POST/v1/projects/{project}/auditLogs:search) API. The time range filter is the same as the workspace-level audit log.

## Summary

Congratulations! You've successfully created a database audit viewer using the Bytebase API. Similarly, you may export the log by calling [/v1/auditLogs:export](https://api.bytebase.com/#tag/auditlogservice/POST/v1/auditLogs:export) API.