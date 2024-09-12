---
title: Building a Database Permission Monitor with Bytebase API
author: Ningjing
updated_at: 2024/09/12 18:00
tags: Tutorial
integrations: General, API
level: Advanced
estimated_time: '40 mins'
description: "Learn how to use the Bytebase API to monitor database permissions, including user access and database accessibility."
---

Bytebase is a database DevOps and CI/CD tool designed for developers, DBAs, and platform engineering teams. While it offers an intuitive GUI for managing database schema changes and access control, some teams may want to integrate Bytebase into their existing DevOps platforms using the Bytebase API.

![before-after](/content/docs/tutorials/api-permission/api-permission.webp)

In our [previous tutorial](/docs/tutorials/api), we demonstrated how to create a schema change using the Bytebase API. This tutorial will focus on monitoring database permissions in Bytebase, it's OK if you haven't gone through the previous tutorial.

By following this guide, you'll learn how to:

- Set up and configure API access
- Fetch users with specific permissions for a given database
- Fetch databases for a specific user with given permissions

Let's dive in and explore how to effectively manage Bytebase API permissions for your team's needs.

<HintBlock type="info">

The API example repository is at https://github.com/bytebase/api-example

</HintBlock>

## Prerequisites

1. [Docker](https://www.docker.com/) installed
1. Node.js >= v18

## Start Bytebase and Prepare the Accounts

1. Make sure your Docker daemon is running. Copy and paste the commands to start Bytebase.

   <IncludeBlock url="/docs/get-started/install/terminal-docker-run-volume"></IncludeBlock>

1. Bytebase is now running via Docker, and you can access it via `localhost:8080`. Register the first admin account which will be granted [`Workspace Admin`](/docs/concepts/roles-and-permissions).

1. Log in as the admin user, and go to **Security & Policy > Users & Groups**. Click **+ Add User**, fill in with `api-example`, choose the `DBA` role that is sufficient for this tutorial and click **Confirm**.
   ![service-account-create](/content/docs/tutorials/api-permission/bb-add-service-account.webp)

1. Find the newly created service account and click on **Copy Service Key**. We will use this token to authenticate the API calls.
   ![service-account-key](/content/docs/tutorials/api/service-account-key.webp)

1. Go to [Bytebase API Example
   repo](https://github.com/bytebase/api-example) and clone it.

1. Copy `env-template.local` to `.env.local`.Update the variables.

   - `NEXT_PUBLIC_BB_URL`: `http://localhost:8080`
   - `NEXT_PUBLIC_BB_SERVICE_ACCOUNT`: `api-example`
   - `NEXT_PUBLIC_BB_SERVICE_KEY`: service key copied in Step 2

1. Enter `permission-check`, and run the following commands to start the demo application.

   ```text
   pnpm i && pnpm dev
   ```

1. Open the demo in your browser, you'll see the following page.
   ![api-permission-home](/content/docs/tutorials/api-permission/api-permission-demo.webp)

1. To enhance the demo's realism, go to Bytebase and add more users and set up user permissions:
   - Add new users in **Security & Policy > Users & Groups**
   - Grant roles:
     - For workspace-level access: **Security & Policy > Members & Roles**
     - For project-specific access: Navigate to a project and use **Manage > Members**

## Implementing Permission Checks

### Database + Permission => Users

The left side form demonstrates a scenario where you have a **database** and want to monitor who has access to it. This is useful for continuously tracking access to sensitive databases and ensuring only authorized users have permissions.

Let's dig into the code:

1. In `page.tsx`, we fetch all roles by calling the `/v1/roles` API before any user selection.

1. In `db-fetch-user-permission.tsx`, after the user selects a **project**, **database**, and **permission**, we filter the roles with the given permission:

   ```javascript
   const rolesWithPermission = allRoles.filter((role) => role.permissions.includes(permission));
   ```

1. Bytebase has two levels of Identity Access Management (IAM): **Workspace** and **Project**. We fetch both:
   - Workspace-level IAM: `/v1/workspaces/*:getIamPolicy` API
   - Project-level IAM: `/v1/projects/${shortproject}:getIamPolicy` API

   The IAM object structure varies slightly between levels. Here's an example of a workspace-level IAM:

   ```json
   {
      "role": "roles/workspaceDBA",
      "members": [
         "user:api-sample@service.bytebase.com",
         "user:a@bytebase.com",
         "user:admin2@x.com"
      ],
      "condition": {
         "expression": "",
         "title": "",
         "description": "",
         "location": ""
      },
      "parsedExpr": null
   }
   ```

1. We compare the roles with the given IAM to find matches:

   ```javascript
   rolesWithPermission.some((role) => role.name === iam.role)
   ```

1. Some project-level IAM objects include a `condition` field for fine-grained access control. For example:

   ```json
   {
     "role": "roles/projectQuerier",
     "members": ["user:dev@x.com", "user:dev2@x.com"],
     "condition": {
       "expression": "(resource.database in [\"instances/test-sample-instance/databases/hr_test\"])",
       "title": "project querier hr_prod",
       "description": "",
       "location": ""
     }
   }
   ```

   This grants the `projectQuerier` role only for the `hr_test` database in `test-sample-instance`.

1. When processing IAM policies, handle CEL (Common Expression Language) format conditions carefully. In this demo, we parse these conditions using a custom `parseCelExpression` function:

   ```javascript
   const celValue = await parseCelExpression(iam.condition.expression);
   ```

   This function, adapted from Bytebase's [cel plugin](https://github.com/bytebase/bytebase/tree/main/frontend/src/plugins/cel) and [cel.ts](https://github.com/bytebase/bytebase/blob/main/frontend/src/utils/issue/cel.ts), parses the condition expression string and returns an array of database resources along with their expiration times.

   The `parseCelExpression` function and related CEL parsing logic are implemented in a custom `plugins/cel` folder in the demo project.

1. We then check if the conditions are met for the specific database:

   ```javascript
   for (let dbrs of celValue.databaseResources) {
      if (dbrs.databaseName == database) {
         return iam.members.map(member => ({ member, expiredTime }));
      }
   }
   ```
 
1. The `members` array may include both users and groups. To handle groups, use the `v1/groups` API:

   ```json
   {
      "role": "roles/projectQuerier",
      "members": ["user:dev2@x.com", "group:bbbb@x.com"],
      ...
   }
   ```

By following these steps, you can effectively determine which users have access to a specific database, taking into account both direct user assignments and group memberships, as well as any conditional access rules.

### User + Permission => Databases

The right side form demonstrates a scenario where you have a user and want to monitor which databases they have access to. This is useful for ongoing tracking of user permissions, especially when roles change or users leave the company.

1. Fetch all roles using the `/v1/roles` API in `page.tsx`.

1. In `user-fetch-db-permission.tsx`, filter roles based on the selected permission:

   ```javascript
   const rolesWithPermission = allRoles.filter((role) => role.permissions.includes(permission));
   ```

1. Fetch and compare workspace-level and project-level IAM policies:

   - Workspace-level check:

   ```javascript
   const hasUserWorkspacePermission = (rolesWithPermission, rolesToBeMatched) => {
     if (rolesToBeMatched.length === 0) return false;
     return rolesToBeMatched.some(roleToBeMatched => 
       rolesWithPermission.some(roleWithPermission => 
         roleWithPermission.name === roleToBeMatched.role &&
         roleToBeMatched.members.includes(`user:${user}`)
       )
     );
   };
   ```

   - Project-level check:
  
   ```javascript
   for (const project of allProjects) {
     const projectIamData = await fetchData(`/api/projectiam/${encodeURIComponent(project.name.split("/")[1])}`);
     const userHasMatchedRoles = getUserProjectPermissionRoles(rolesWithPermission, projectIamData.bindings, userGroups.length > 0, project.name);
     // ... process matched roles
   }
   ```

1. Handle CEL (Common Expression Language) conditions:

   ```javascript
   if (role.condition && role.condition.expression === '') {
     userHasFullProjectPermission = true;
   } else {
     const celValue = await parseCelExpression(role.condition.expression);
     celsConverted.push(celValue);
   }
   ```

1. Group should be taken into consideration too.

   ```javascript
         return refinedRolesToBeMatched.filter(roleToBeMatched => {
            const memberMatch = roleToBeMatched.members.includes(`user:${user}`);
            const groupMatch = hasGroups && userGroups.some(group => 
                roleToBeMatched.members.includes(group.replace('groups/', 'group:'))
            );
            return memberMatch || groupMatch;
        });
   ```

By following these steps, you can effectively identify all databases a specific user has access to, taking into account various permission levels and conditions.

## Summary

Congratulations! You've successfully created a database permission monitoring tool using the Bytebase API. This monitor allows you to:

1. Track which users have access to specific databases
1. Monitor which databases a particular user can access

By leveraging these API calls within existing DevOps platforms, organizations can significantly improve their database access governance and security posture.
