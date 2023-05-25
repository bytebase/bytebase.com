---
title: gh-ost Based Online Schema Migration for MySQL
author: Candy
published_at: 2022/08/09 16:37:17
feature_image: /content/blog/gh-ost-based-online-schema-migration-for-mysql/cover.webp
tags: Announcement
integrations: MySQL
featured: true
description: Introduce gh-ost based online schema migration and how to perform an online schema migration without downtime in Bytebase.
---

Bytebase is an open-source database DevOps tool; it’s the GitLab for managing databases throughout the software development lifecycle (SDLC). It offers a web-based workspace for Developers and DBAs to collaborate and execute database changes safely and efficiently.

Database schema migration is one of the most common operations for developers and DBAs. However, it is one of the most challenging operations as well. What’s more painful, it will take hours, even days to migrate schema for large tables. Regular schema migration must lock the database table and render the service offline. For most businesses, it’s unacceptable to endure such extended downtime. To solve it, the industry has developed various online schema change solutions:

- [gh-ost](https://github.com/github/gh-ost)
- [Pt-online-schema-change](https://www.percona.com/doc/percona-toolkit/3.0/pt-online-schema-change.html)
- [Facebook OSC](https://github.com/facebookincubator/OnlineSchemaChange)

By adopting these tools, teams can reduce schema migration downtime from days and hours to seconds. On the other hand, operating these tools still requires a lot of expertise. And their usage is limited to the seasoned DBAs, while Developers still need to ask their DBA peers to perform online schema changes on their behalf.

Since Bytebase is a database tool for the DevOps teams, we want to hand over the powerful online schema change capability to the Developers.

In this blog post, we will introduce you to the beta release of Bytebase online schema migration solution based on gh-ost. Bytebase solution provides a step-by-step interface with continuous progress updates to oversee the entire migration process.

## Why We Choose gh-ost

All existing online schema change solutions share a similar workflow:
![online-schema-migration](/content/blog/gh-ost-based-online-schema-migration-for-mysql/online-schema-migration.webp)

1. Create a new, empty table (called ghost/shadow table) with an exact copy of the original table’s schema
2. Apply schema migration to the ghost table
3. Copy the existing rows from the original table to the ghost table
4. Capture the ongoing changes to the original table and continuously apply them to the ghost table
5. Swap the original table with the ghost table

Why do we decide to integrate gh-ost into Bytebase? The most crucial factor is that gh-ost is a triggerless online schema migration solution for MySQL. gh-ost uses the binary log stream to capture table changes and asynchronously applies them to the ghost table. As a result, it avoids the performance overhead due to trigger and lock contention. Secondly, gh-ost has greater control over the migration process. Bytebase can leverage it to expose the migration progress and provide a better user experience with parameters supported by gh-ost.

## How to Make Online Schema Migration for Large Tables

Bytebase provides two types of schema migration: regular migration and gh-ost. You can operate it by creating an issue in three steps. Let’s demonstrate how to use gh-ost to alter schema.

The screenshot below shows the table “sbtest1” information before applying schema migration. We can see that the table has 4 columns and 694 MB data.
![overview](/content/blog/gh-ost-based-online-schema-migration-for-mysql/overview.webp)

**Step 1**. Create a gh-ost issue

1. Click **Alter Schema** on the database details page.
   ![step_1_1](/content/blog/gh-ost-based-online-schema-migration-for-mysql/step_1_1.webp)

2. Select **Online migration** and click **Next.**
   ![step_1_2](/content/blog/gh-ost-based-online-schema-migration-for-mysql/step_1_2.webp)

3. Enter SQL statements for the task “Sync data”, and click **Create** after selecting a reviewer to approve the issue.
   ![step_1_3](/content/blog/gh-ost-based-online-schema-migration-for-mysql/step_1_3.webp)

**Step 2**. Execute the task “Sync data”.
The task “Sync data” runs after the designated reviewer clicks **Approve**. See the screenshot below, it shows that the progress of “Sync data” is 59%.
![step_3](/content/blog/gh-ost-based-online-schema-migration-for-mysql/step_3.webp)

**Step 3**. Perform the task “Switch tables”.
The screenshot below shows that the first task has been completed.  
![step_4_1](/content/blog/gh-ost-based-online-schema-migration-for-mysql/step_4_1.webp)

Then the designated reviewer clicks **Approve** to execute the second task “Switch tables”.
![step_4_2](/content/blog/gh-ost-based-online-schema-migration-for-mysql/step_4_2.webp)

Here is the result of gh-ost. It says that the database performs gh-ost successfully.
![result](/content/blog/gh-ost-based-online-schema-migration-for-mysql/result.webp)

## Learn More

Bytebase supports online schema migration for large tables based on gh-ost, a triggerless online schema migration solution that can reduce the application downtime from hours to seconds. It offers a step-by-step interface with continuous progress update to oversee the entire migration process. You can check out the [documentation](/docs/change-database/online-schema-migration-for-mysql) to learn more.

If you have any feedback, we’d love to hear from you. You can find us on our [GitHub issue board](https://github.com/bytebase/bytebase/issues).
