---
title: 'Restoring a MySQL Database to a Point in Time'
author: Candy
published_at: 2022/07/11 16:30:17
feature_image: /content/blog/restoring-a-mysql-database-to-a-point-in-time/pitr-cover.webp
tags: How-To
integrations: MySQL
description: This article describes how Point-in-Time-Recovery (PITR) works in Bytebase and the steps to restore a database using this feature.
---

Bytebase is an open source database DevOps tool, it's the GitLab for managing databases throughout the software development lifecycle (SDLC). It offers a web-based workspace for Developers and DBAs to collaborate and execute database changes safely and efficiently.

As an application developer, what would you do if you encountered these scenarios in your daily work?

- Someone accidentally drops a table or deletes a bunch of customer data.
- Team releases a bad version with database changes.

You want a time travel.

For MySQL, this means you would look for the valid backup and the relevant binlog files to recover to a point in the past before the incident occurred. This is a complicated process that requires an experienced DBA to operate. Today, we are introducing Point-in-Time Recovery (PITR) Beta in Bytebase, which enables users to perform this error-prone operation with just a few clicks.

## How MySQL PITR works in Bytebase?

1. Find the most recent backup before the specified recovery point in time.
2. Restore the backup to a temporary database.
3. Replay the binlog files to that temporary database up to the specified point in time.
4. Swap the temporary database with the targeting database.

The last step means Bytebase is doing an in-place database recovery and does not require any application code change.

## How to Restore a Database to a Point in Time?

Let’s say there is a MySQL database `db_pitr_example` that has two tables `pitr_one` and `pitr_two`.
![original](/content/blog/restoring-a-mysql-database-to-a-point-in-time/original.webp)

Suddenly, the application goes down since someone accidentally deletes the table `pitr_two`. Then, the DBA or the on-call developer needs to restore that deleted table.
![del](/content/blog/restoring-a-mysql-database-to-a-point-in-time/del.webp)

The following steps demonstrate how to restore the database `db_pitr_example` with PITR.

**Step1**. Click **Restore to point in time** under **Backup and restore**.
![pitr-step1](/content/blog/restoring-a-mysql-database-to-a-point-in-time/pitr-step1.webp)

**Step2**. Choose a point in time to restore the database, and click **Confirm**.
![pitr-step2](/content/blog/restoring-a-mysql-database-to-a-point-in-time/pitr-step2.webp)

**Step3**. Click **Approve** to execute the first task, or reassign it to someone else to review the task first.
![pitr-step3](/content/blog/restoring-a-mysql-database-to-a-point-in-time/pitr-step3.webp)

After the first task is completed, click **Approve** again to execute the second task.
![pitr-step4](/content/blog/restoring-a-mysql-database-to-a-point-in-time/pitr-step4.webp)

Now, the point-in-time recovery for the database is done. The result says that the database `db_pitr_example` has performed point-in-time recovery successfully.
![result](/content/blog/restoring-a-mysql-database-to-a-point-in-time/result.webp)

Let’s verify tables in the database `db_pitr_example`. The deleted table `pitr_two` is back again.
![verify](/content/blog/restoring-a-mysql-database-to-a-point-in-time/verify.webp)

## Learn more

We just showed you how Bytebase performs a point-in-time recovery. It’s an in-place recovery, which means it does not require extra work to change the application code after the recovery. To learn more about Point-in-Time Recovery in Bytebase, see our [documentation](/docs/operating/disaster-recovery.md).

Thank you for reading this post. If you have any comments or questions, don’t hesitate to [let us know](https://github.com/bytebase/bytebase/issues).
