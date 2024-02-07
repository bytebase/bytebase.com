---
title: How to Manage Postgres Users and Roles
author: Tianzhou
published_at: 2024/02/07 21:00:00
feature_image: /content/blog/how-to-manage-postgres-users-and-roles/user-role-2.webp
tags: How-To
description: Best practice for managing PostgreSQL users and roles
---

As the world's leading open-source database, PostgreSQL has a powerful user role permission system. Let's compare it with MySQL:

|           | Database  | Schema | Table | Ownership  |
| ----------| --------- | ------ | ----- | ---------- |
| 🐬 MySQL  | ✅    | ❌     | ✅      | ❌      |
| 🐘 PostgreSQL |  ✅       | ✅       | ✅       | ✅       |

But the other side of the coin is that it adds complexity to simple scenarios. In many single-application scenarios, there is actually no need for an additional schema layer or an additional owner. PGer all have encountered "must be owner of table" at some point.

![_](/content/blog/how-to-manage-postgres-users-and-roles/owner-error.webp)

## Use case

Let's talk about the basic use case of PG and how database users should configure it. It's basic because:

* The PG instance has only 1 database.
* The database only has 1 default public schema.
* All tables are under that public schema.

Database access consists of human-to-db and application-to-db:

* Human-to-db
    1. DBA operation
    1. Database changes, including both DDL and DML
    1. Database query
* App-to-db
    1. Database changes. Application may perform DDL upon startup, otherwise, it's all DML.
    1. Database query

## Detailed Setup

The simplest form, of course, is to have a `superuser` handle it. If you install PostgreSQL locally, the default `postgres` user is such a superuser.

![_](/content/blog/how-to-manage-postgres-users-and-roles/user-role-1.webp)

Let's split into human and application. If application needs to DDL upon startup, then it will like below:

![_](/content/blog/how-to-manage-postgres-users-and-roles/user-role-2.webp)

If schema migration has been already decoupled from the application deployment, then the application only needs
the normal database read/write permissions.

![_](/content/blog/how-to-manage-postgres-users-and-roles/user-role-3.webp)

If people other than the DBA want to access the database, it is too risky to directly hand over the DBA user. Therefore, a tool like [Bytebase](/) should be chosen. The DBA configures regular users' database access permissions on Bytebase without handing over db credentials. Moreover, schema migrations can also be performed on Bytebase, greatly reducing the need for direct database operations using the DBA account.

![_](/content/blog/how-to-manage-postgres-users-and-roles/user-role-4.webp)

## Additional Notes

1. Public cloud database services do not provide superuser privileges. They only offer a limited superuser, such as the [cloudsqlsuperuser](https://cloud.google.com/sql/docs/postgres/users) in Google Cloud SQL.

    ![_](/content/blog/how-to-manage-postgres-users-and-roles/cloudsql.webp)

1. The reason for setting up a separate migration user is twofold: on the one hand, it facilitates monitoring, and on the other hand, it allows us to set separate default connection parameters for the migration user. The most common parameter that is often set is [lock_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-LOCK-TIMEOUT). The reason for setting this parameter is that when performing DDL operations, locks need to be acquired. Due to PostgreSQL's queue mechanism, even if another transaction that comes later does not require a DDL lock, it will still be blocked while DDL transaction is waiting. Therefore, it is often necessary to set a `lock_timeout` for the migration user in order to avoid blocking other transactions behind for an extended period of time.

1. When creating objects in Postgres, such as tables, the owner of the created table is the statement executor. Therefore, when using a separate migration user to make schema changes, the owner of the table will also be the migration user. If you want the owner to reflect specific business, such as "payment", you can create a separate role for payment and switch to that role using `SET LOCAL ROLE` during migration execution.

## Troubleshoot

* [Permission denied for table](/docs/how-to/postgres/permission-denied-for-table-postgres/)
* [Must be owner of table](/docs/how-to/postgres/must-be-owner-of-table-postgres/)