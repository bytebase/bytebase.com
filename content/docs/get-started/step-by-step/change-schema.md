---
title: Make a Database Schema Change
---

**Issues** represents a collaboration between developer and DBA (like creating a database or altering a schema). It's similar to the issue concept in other issue management tools.

Issue drives the database change workflow covering `Database Creation`, `DDL` and `DML`.

## Create an issue

Go to your project page, choose one or several databases to **Edit Schema**.

You may use the **Schema Editor** to visually design the schema.

![schema-editor](/content/docs/get-started/step-by-step/change-schema/schema-editor.webp)

Alternatively, you can switch to the **Raw SQL** mode. You can sync the raw SQL from the schema editor or supply your own
SQL statements.

![raw-sql](/content/docs/get-started/step-by-step/change-schema/raw-sql.webp)

Once you finish writing the SQL, click **Preview issue**.

![preview-issue](/content/docs/get-started/step-by-step/change-schema/preview-issue.webp)

By default, Bytebase will create a **Rollout issue**. You can check **SQL Review Only** to create a review-only issue.

## Rollout an issue

![rollout-issue](/content/docs/get-started/step-by-step/change-schema/rollout-issue.webp)

If there's a [SQL review](/docs/sql-review/overview) warning, you may need to fix it first.

An issue may also require one or multiple manual approvals. Once all approvals are granted, the issue can be rolled out.

## Issue lifecycle

Here's a graph demonstrating the issue lifecycle.

![issue-lifecycle](/content/docs/get-started/step-by-step/change-schema/issue-lifecycle.webp)

Bytebase supports 2 change workflow, **UI** and **GitOps**. Check [Database Change Workflow](/docs/change-database/change-workflow/) for further details.
