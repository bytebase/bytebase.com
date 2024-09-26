---
title: How to Manage Roles
author: Ningjing
updated_at: 2024/09/26 20:15
tags: Tutorial
integrations: General
level: Intermediate
estimated_time: '20 mins'
description: Assign a manager role who can only roll out issue but not query or change database.
---

A typical requirement is to create a `Manager` role in Bytebase who can only roll out issue but not query or change database. This tutorial will show you how to achieve this with two approaches:

    - Using a system predefined role
    - Creating a custom role

![manage-roles-graph](/content/docs/tutorials/how-to-manage-roles/manage-roles-graph.webp)

## Approach 1: Using a System Predefined Role

1. Log in Bytebase, go to **IAM & Admin > Custom Roles**. You'll see that besides three **Workspace** level roles: **Admin/DBA/Member**; at **Project** level, Bytebase also predefined several system roles:

   - **Project Owner**: All permissions within the project
   - **Project Developer**: All viewer permissions, plus permissions for requesting database changes.
   - **Project Querier**: Permissions for querying database data.
   - **Project Exporter**: Permissions for exporting database data.
   - **Project Releaser**: All viewer permissions, plus permission for reviewing database change requests for release purposes.
   - **Project Viewer**: Read-only permissions for viewing basic project information, accessing databases, and initiating privilege requests.

   ![bb-system-roles](/content/docs/tutorials/how-to-manage-roles/bb-system-roles.webp)

1. You may find the `Project Releaser` is the role our customer wants to create. So the easiest way is to use this role directly along with another step config: Go to **Environments**, select the environment and go to **Rollout Policy** section. Check **Manual rollout by dedicated roles** and `Project releaser`. For Manual rollout, you need to have **Pro or Enterprise Plan** licenses.

   ![bb-rollout-policy](/content/docs/tutorials/how-to-manage-roles/bb-rollout-policy.webp)

1. Now, the role is ready. There are two ways to assign this role to our manager.

   ### Assign role at the Workspace level

   You can assign the `Project Releaser` role to the manager at the **Workspace** level. Then the manager will
   obtain the `Project Releaser` role for all projects.

   #### Create user

   Create the user if not added yet. Go to **IAM & Admin > Users & Groups**, click **Add User**.

   ![bb-workspace-user-role](/content/docs/tutorials/how-to-manage-roles/bb-workspace-user-role.webp)

   #### Grant role

   Go to **IAM & Admin > Members** click **Grant Access**.

   ![bb-workspace-grant-access](/content/docs/tutorials/how-to-manage-roles/bb-workspace-grant-access.webp)

   ### Assign role at the Project level

   If you want to assign the role to the manager user for a single project, go to the project > **Manage** > **Members**, click **Grant Access**.

   ![bb-project-grant-access](/content/docs/tutorials/how-to-manage-roles/bb-project-grant-access.webp)

## Approach 2: Creating a Custom Role

What if you want to create a custom role with slightly differet permissions or you just want to rename it as a manager role?

1. Go to **IAM & Admin > Custom Roles**, and click **Add Role** button on the top right.

1. Click **Import from role**, here you choose `Project releaser` and click **Confirm**. The related permissions will be imported.

   ![bb-add-role-releaser-import](/content/docs/tutorials/how-to-manage-roles/bb-add-role-releaser-import.webp)

1. As a manager, you can add two more permissions: `auditLogs.search` and `auditLogs.export`. Click **Add**.

   ![bb-role-audit](/content/docs/tutorials/how-to-manage-roles/bb-role-audit.webp)

1. Go back to **Environments**, select the environment and go to **Rollout Policy** section. Check **Manual rollout by dedicated roles** and **Custom project roles > Project Manager**.

   ![bb-env-rollout-policy-manager](/content/docs/tutorials/how-to-manage-roles/bb-env-rollout-policy-manager.webp)

1. The same as for `Project Releaser`, you can assign the role to our manager user at **Workspace** or **Project** level.

## Summary

By utilizing either a system predefined role or creating a custom role, you can grant permissions for database rollout while restricting query and modification access.
