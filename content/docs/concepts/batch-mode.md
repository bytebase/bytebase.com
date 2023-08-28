---
title: Batch Mode
---

Often times, you don't apply a change to a single database. Instead, you need to apply a change to
several databases. The most common case is you need to propogate a change from `dev -> test -> staging -> prod`,
and each environment corresponds to a different database. Bytebase supports this case out of the box.
In addition to that, Bytebase also offers a special batch mode to support:

- [Partitioned databases](#database-group) and tables.
- [Isolated tenant databases](#tenant-database) provisioned by multi-tenant service provider for each tenant.

## Database Group

A database group is a collection of physical databases from one or more database instances that are considered as a single unit. To be grouped in the same database group, physical databases must meet the following criteria:

- They must belong to the same project.
- They must be in the same environment.
- They must conform to the rules specific to the database group.

To learn how to create database groups, you can visit [Create a Database Group](/docs/change-database/batch-change/#create_a_database_group) for details.

### Table Group

A table group is a collection of physical tables from a single database group. Within a database group, you can create multiple table groups using configurable rules. A physical table can belong to one or more table groups.

Visit [Create a Table Group](/docs/change-database/batch-change/#create_a_table_group) to learn how to create a table group within a database group.

To apply a database change across multiple physical databases simultaneously, you can use database groupsand table groups. Head over to [Change databases from database groups](/docs/change-database/batch-change/#change-databases-from-database-groups) for details.

## Tenant Database

Tenant databases are the homogeneous databases with identical schema. Each individual database corresponds to the combination of a tenant, location, and deployment environment.

Bytebase offers streamlined experience for tenant databases through [Change databases from multiple tenants](/docs/change-database/batch-change/#change-databases-from-multiple-tenants).
