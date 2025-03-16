---
title: Automate Database Change with Jira
author: Adela
updated_at: 2024/10/14 21:15
tags: Tutorial
level: Advanced
integrations: Jira, API
estimated_time: '45 mins'
description: Automate database changes using Jira and Bytebase.
---

In the [previous tutorial](/docs/tutorials/database-change-management-with-jira-manual), we have set up a manual database change workflow with Jira and Bytebase. In this tutorial, we will show you how to automate the process by leveraging Jira and Bytebase Webhook and API. You need to finish the previous tutorial first.

Bytebase is an open-source database DevSecOps solution for Developer, Security, DBA, and Platform Engineering teams. The GitLab for database DevSecOps.

Here is what you will achieve by the end of this tutorial:

<iframe width="100%" height="320" src="https://www.youtube.com/embed/t23dFR6ZJl0?si=g_UkL8fTm6WnZihW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="allowFullScreen"></iframe>

![auto-jira](/content/docs/tutorials/database-change-management-with-jira-automated/auto-jira.webp)

## Prerequisites

- A Jira workspace
- A Bytebase instance
- [Manual Database Change with Jira](/docs/tutorials/database-change-management-with-jira-manual) completed
- Download the [api-example repository](https://github.com/bytebase/example-api), you'll only need `jira` folder for this tutorial

## Workflow Overview

### Setup

1. Configure the environment variables and run the `jira` demo app
1. Setup Jira Webhook and API
1. Setup Bytebase Webhook and API

### Change process

1. (Jira) Developer creates a Jira `Database Change` issue filling the **summary**, **SQL**, **database**, and **description** fields, the status is `Todo`.
1. (Jira Webhook -> Bytebase API) Once the Jira issue is created, Jira webhook will trigger Bytebase API to create a corresponding issue.
1. (Bytebase API -> Jira API) Once the Bytebase issue is created, the success response will trigger Jira API to set Jira issue with the Bytebase issue link and change the status to `In Progress`.
1. (Bytebase) DBA goes to Bytebase to roll out the database change.
1. (Bytebase Webhook -> Jira API) Once the Bytebase issue rolls out and becomes `Done`, Bytebase Webhook will trigger Jira API to set Jira issue status to `Done`.

![auto-jira](/content/docs/tutorials/database-change-management-with-jira-automated/auto-jira.webp)

## Setup

### Configure the environment variables and run the `jira` demo app.

1. Go to the `jira` folder of the `api-example` repository, and copy `env-template.local` file as `.env.local`. Replace the placeholders with yours.

   ```javascript

   NEXT_PUBLIC_JIRA_BASE_URL=https://xxxxxx.atlassian.net
   NEXT_PUBLIC_JIRA_EMAIL=xxx@xxxx.com
   NEXT_PUBLIC_JIRA_API_TOKEN=xxxxxxx
   NEXT_PUBLIC_BB_HOST=https://xxxxxxx
   NEXT_PUBLIC_BB_SERVICE_ACCOUNT=xxxx@service.bytebase.com
   NEXT_PUBLIC_BB_SERVICE_KEY=bbs_xxxxxx

   ```

1. Run `pnpm i` and `pnpm run dev`, you can run the demo app locally with `localhost:xxxx`. However, the app need to listen to webhook from Jira and Bytebase, so you need to make the app network accessible from both. By using [ngrok](https://ngrok.com/) or [vscode ports](https://code.visualstudio.com/docs/editor/port-forwarding), you can acheive this.

   ![wm-empty](/content/docs/tutorials/database-change-management-with-jira-automated/wm-empty.webp)

### Jira webhook: To trigger when Jira issue is created or updated

1. Go to Jira, click **Settings** and then **System settings** in the dropdown menu.

   ![jira-go-setting](/content/docs/tutorials/database-change-management-with-jira-automated/jira-go-setting.webp)

1. Click **WebHooks** on the left sidebar, and then click **+ Create a WebHook**.

   ![jira-create-webhook](/content/docs/tutorials/database-change-management-with-jira-automated/jira-create-webhook.webp)

1. Fill in the **URL**, remember to append `/api/receive-jira-issue-webhook` to your base URL for the demo jira app, select `Issue created and updated`, and click **Create**.

   ![jira-webhook-details](/content/docs/tutorials/database-change-management-with-jira-automated/jira-webhook-details.webp)

### Bytebase API: To create a Bytebase issue

1. Go to Bytebase, click **IAM & Admin > Users & Groups** on the left sidebar, and then click **+Add User**.

   ![bb-add-user](/content/docs/tutorials/database-change-management-with-jira-automated/bb-add-user.webp)

1. Choose `Service Account` as **User Type**, fill in the **Email**, give it `Workspace DBA` role, and then click **Create**. Copy the **API Token** to the `.env.local` file.

   ![bb-new-user](/content/docs/tutorials/database-change-management-with-jira-automated/bb-new-user.webp)

### Jira API: To update Jira issue status to `In Progress`/ `Done` and set its Bytebase issue link

1. Go to [Atlassian Account >Security > API tokens](https://id.atlassian.com/manage-profile/security/api-tokens) to generate an API token. Copy the **API Token** to the `.env.local` file.

   ![jira-api-tokens](/content/docs/tutorials/database-change-management-with-jira-automated/jira-api-tokens.webp)

### Bytebase Webhook: To trigger when Bytebase issue is set to `Done`

1. Go in to the project, click **Integration > Webhooks** on the left sidebar and click **Add A Webhook**.

   ![bb-add-webhook](/content/docs/tutorials/database-change-management-with-jira-automated/bb-add-webhook.webp)

1. Choose `Custom` as **Destination**, fill in the **Webhook URL**, remember to append `/api/receive-bb-issue-webhook` to your base URL for the demo jira app, select `Issue status change` as **Triggering activities** and click **Create**.

   ![bb-new-webhook](/content/docs/tutorials/database-change-management-with-jira-automated/bb-new-webhook.webp)

## Change process

### Step 1 (Jira): Create a database change issue

1. You act as a developer, now go to the Jira project to create a `Database Change` issue, fill in the fields **summary**, **SQL**, **database**, and **description**, and click **Create**. Here's the screenshot of the issue.

   ![jira-todo](/content/docs/tutorials/database-change-management-with-jira-automated/jira-todo.webp)

1. View the `jira` app demo, you will see there's a jira webhook received with `Todo` status.

   ![wm-todo](/content/docs/tutorials/database-change-management-with-jira-automated/wm-todo.webp)

### Step 2 (Jira Webhook -> Bytebase API) Once the Jira issue is created, Jira Webhook will trigger Bytebase API to create a corresponding issue

Go to the Bytebase project and find the issue which is waiting to rollout.

![bb-to-rollout](/content/docs/tutorials/database-change-management-with-jira-automated/bb-to-rollout.webp)

It's because the jira webhook trigger Bytebase API to create an issue there. The logic is in `src/api/receive-jira-issue-webhook/route.ts`.

1. When it receive the trigger, it checks if the issue type is `Database Change`. and then if the webhook event is `issue_created`.

   ```javascript

      const body: JiraWebhookPayload = await request.json();

      const issueType = body.issue.fields.issuetype.name;
      if (issueType !== 'Database Change') {
         return Response.json({ error: 'Not a Database Change issue' }, { status: 400 });
      }

      const issueKey = body.issue.key;
      ...
      let bytebaseIssueLink = body.issue.fields.customfield_10039;

      f (body.webhookEvent === "jira:issue_created" && body.issue_event_type_name === "issue_created") {
         ...
   ```

1. If both are true, via Bytebase API, it will try to match the Jira's `project key` with Bytebase's `project key` to make sure they're the same. then it will try to match the Jira's `database` with the database belonging to that matching Bytebase project.

   <HintBlock type="warning">
   The Bytebase project `key` is deprecated since 3.4.0, use `ID` instead. You may need to update the code to use `ID` instead of `key`.
   </HintBlock>

   ```javascript
     ...
      // Find matching Bytebase project
      const matchingProject = allProjectData.projects.find((project: BytebaseProject) => project.key === projectKey);
      if (!matchingProject) {
            return Response.json({ error: 'No matching Bytebase project found' }, { status: 400 });
      }
      // Fetch databases for the matching project
      const databasesData = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${matchingProject.name}/databases`, token);

      // Find matching database
      const matchingDatabase = databasesData.databases.find((db: BytebaseDatabase) => db.name.split('/').pop() === database);
      if (!matchingDatabase) {
            return Response.json({ error: 'No matching Bytebase database found' }, { status: 400 });
      }

      // Create Bytebase issue
      const result = await createBBIssueWorkflow(matchingProject.name, matchingDatabase, sqlStatement, summary, description, issueKey);

   ```

1. Only if the project and database are both matched, it will create a Bytebase issue.

   ```javascript
   // Create Bytebase issue
   const result = await createBBIssueWorkflow(
     matchingProject.name,
     matchingDatabase,
     sqlStatement,
     summary,
     description,
     issueKey,
   );
   ```

   which internally involves four steps:

   ```javascript
   const sheetData = await createSheet(project, database, SQL);

   const planData = await createPlan(project, database, sheetData.name);

   const issueData = await createIssue(
     project,
     database,
     planData.name,
     summary,
     description,
     jiraIssueKey,
   );

   const rolloutData = await createRollout(project, planData.name);
   ```

### Step 3 (Bytebase API -> Jira API) Once the Bytebase issue is created, the Jira API will set Bytebase issue link in Jira issue, and set status as `In Progress`

1. If you go back to Jira, you'll see the Jira issue status becomes `In Progress` with **Bytebase url link** filled.

   ![jira-in-progress](/content/docs/tutorials/database-change-management-with-jira-automated/jira-in-progress.webp)

1. View the `jira` app demo, it's updated, too.

   ![wm-in-progress](/content/docs/tutorials/database-change-management-with-jira-automated/wm-in-progress.webp)

The logic is still in `src/api/receive-jira-issue-webhook/route.ts`.

1. Once the Bytebase issue is created via API, the demo app will parse the **Bytebase issue link**.

   ```javascript
   if (result.success && result.issueLink) {
     bytebaseIssueLink = result.issueLink;
     parsedData.bytebaseIssueLink = bytebaseIssueLink;

     try {
       // Update Jira issue with Bytebase link and set status to "In Progress"
       await updateJiraIssueAfterBBIssueCreated(issueKey, bytebaseIssueLink);
     } catch (error) {
       return Response.json(
         {
           error: 'Failed to update Jira issue',
           details: error instanceof Error ? error.message : String(error),
         },
         { status: 500 },
       );
     }
   }
   ```

1. Then call the Jira API to update **Bytebase issue link** field and change the status from `Todo` to `In Progress`.

   ```javascript
      ...
      await updateJiraIssueAfterBBIssueCreated(issueKey, bytebaseIssueLink);

   ```

   Here we need to call two Jira APIs:

   - `/rest/api/3/issue/${issueKey}` to update Bytebase Link
   - `/rest/api/3/issue/${issueKey}/transitions` to change the status

### Step 4 (Bytebase) DBA goes to Bytebase to roll out the database change.

1. You now act as DBA, go to Bytebase to roll out the database change.

   ![bb-done](/content/docs/tutorials/database-change-management-with-jira-automated/bb-done.webp)

1. Once change is rolled out, Bytebase will record the change in the database **Change History**.

   ![bb-history](/content/docs/tutorials/database-change-management-with-jira-automated/bb-history.webp)

1. You can also click **View change** to view the change diff.

   ![bb-diff](/content/docs/tutorials/database-change-management-with-jira-automated/bb-diff.webp)

### Step 5 (Bytebase Webhook -> Jira API) Once the Bytebase issue rolls out and becomes `Done`, Bytebase Webhook will trigger Jira API to set Jira issue status as `Done`.

1. Once the issue has rolled out in Bytebase, the configured webhook will trigger `jira` app demo.

   ![wm-done](/content/docs/tutorials/database-change-management-with-jira-automated/wm-done.webp)

1. Go to Jira, you'll see the Jira issue status becomes `Done`.

   ![jira-done](/content/docs/tutorials/database-change-management-with-jira-automated/jira-done.webp)

The logic is in `src/app/api/receive-bb-issue-webhook/route.ts`. If it's a issue update, it will parse the Jira issue key from the Bytebase issue name, and then call the Jira API to update the issue status to `Done`.

```javascript

   const payload: BytebaseWebhookPayload = await request.json();

   if (payload.activity_type === "bb.issue.status.update") {
      ...
      const jiraIssueKeyMatch = payload.issue.name.match(/\[JIRA>([^\]]+)\]/);

      ...
      if (payload.issue.status === "DONE") {
         jiraStatus = "Done";
      } ...
      }
   }

```

## Summary

In this tutorial, you have successfully set up a automatic database change workflow with Jira and Bytebase.
We eliminate most of the manual process in the last tutorial.

1. Bytebase issue is automatically created. And the created issue link is set automatically in the Jira issue.
1. Once Bytebase rolls out the SQL, the Jira issue status is updated automatically.

If you want to automate further, you can also call Bytebase API to approve and roll out the SQL.
