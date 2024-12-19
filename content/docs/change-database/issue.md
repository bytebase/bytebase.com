---
title: Issue
---

**Issue** drives the database change workflow. You can change the issue behavior under **Project**->**Setting**.

## Postgres database tenant mode

![postgres-database-tenant](/content/docs/change-database/issue/postgres-database-tenant.webp)

By default, Bytebase runs the database change using the user you configure in the Bytebase instance.

If you turn on this setting, Bytebase will call `SET LOCAL ROLE` to the targeting PostgreSQL database OWNER
before running the database change. You may need this if you have a multi-tenant service and each
database has separate database OWNER.
