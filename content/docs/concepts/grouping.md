---
title: Grouping
---

## Database Group

A database group is a collection of physical databases from one or more database instances that are considered as a single unit. To be grouped in the same database group, physical databases must meet the following criteria:

- They must belong to the same project.
- They must be in the same environment.
- They must conform to the rules specific to the database group.

To learn how to create database groups, you can visit [Create a Database Group](/content/docs/change-database/batch-change#create_a_database_group) for details.

## Table Group

A table group is a collection of physical tables from a single database group. Within a database group, you can create multiple table groups using configurable rules. A physical table can belong to one or more table groups.

Visit [Create a Table Group](/content/docs/change-database/batch-change#create_a_table_group) to learn how to create a table group within a database group.

To apply a database change across multiple physical databases simultaneously, you can use [database groups](/content/docs/concepts/grouping#database_group) and [table groups](/content/docs/concepts/grouping#table_group). Head over to [batch database changes from database groups](/content/docs/change-database/batch-change#change-databases-from-database-groups) for details.
