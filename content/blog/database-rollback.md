---
title: 'Database Rollback: When Shit Hits the Fan'
author: Adela
updated_at: 2024/11/01 18:00:00
feature_image: /content/blog/database-rollback/database-rollback-cover.webp
tags: Explanation
description: Explain database rollback and how to automate it
---

## What is Database Rollback?

In database technologies, a rollback is an operation which returns the database to some previous state by undoing one or several changes made to the database. It's a critical mechanism for maintaining data integrity and recovering from errors.

## When Do We Need Database Rollback?

Database rollbacks are necessary in several scenarios:

1. **Human Error**: When someone accidentally performs unintended actions such as data deletion, data modifications, or incorrect schema changes.

1. **Application Issues**: When a new feature is deployed but it's buggy, either there's failed deployments or buggy code releases.

1. **Data Quality Problems**: when data is corrupted or inconsistent.

1. **Compliance Requirements**: a regulatory requirement to rollback the database.

## Types of Database Rollback

Database rollbacks can be categorized based on their scope. There are three main types:

### Complete Rollback

A complete rollback involves restoring both the database schema and data to a previous state. This is typically achieved through:

- **Restore from backup**

  Restore from backup is the most straightforward way. A backup creates a snapshot of your database at a specific time. When rollback is needed, you use this backup file to overwrite the existing database or to create a new instance. This restoration brings the database back to the exact state it was in at the backup's timestamp. Most cloud providers (AWS, GCP, Azure) offer automated backup solutions with simple restore procedures.

  This approach is particularly effective for disaster recovery scenarios, testing environments, and data migration processes.

- **Point-in-time recovery (PITR)**

  In comparison with restore from backup, PITR is more flexible. It allows you to restore a database to a specific moment in time, rather than to the static moment when a backup was taken. This works by combining base backups with continuous transaction logs. Cloud providers also offer this feature.

  This capability is particularly valuable in situations where you want to undo recent changes. Human errors such as accidental data deletion or wrong schema changes are fit for this scenario.

<HintBlock type="info">

Complete rollback is rarely used because it's a hard reset. It removes the bad changes as well as the good ones.

</HintBlock>

### Schema Rollback (DDL)

When a new version of your application is deployed, it's common to have a new migration script to update the database schema. If the new version is buggy, you can rollback the schema to the previous version. Schema rollbacks involve reverting structural changes to the database including table structure, index, constraint, stored procedure, etc.

It'd be a good practice to maintain a migration history for your database just as your code version history, so you can easily find the version you need.

### Data Rollback (DML)

Data rollbacks focus on reverting changes to the actual data within database tables. These operations typically involve DML (Data Manipulation Language) statements like INSERT, UPDATE, and DELETE.

Accidental data modifications such as incorrect mass update or unintended data deletion; data quality issues such as data corruption and data inconsistency are fit for this scenario.

## Database Rollback Automation

To automate database rollback effectively, systems need to maintain comprehensive change tracking. While cloud providers offer automated backup solutions with straightforward restore procedures for complete rollbacks, more granular control requires detailed migration history management.

Bytebase provides an intuitive GUI-based solution with enhanced collaboration features. It keeps a history of all human-to-database changes.

For schema rollback, you can review the change history and pick the specific version you need. The system will generate the rollback script for you.
![bb-schema-rollback](/content/blog/database-rollback/version-rollback.webp)

For data rollback, it offers a handy 1-click data rollback from automatic backups.

    ![bb-prior-bk-rollback](/content/blog/database-rollback/bb-prior-bk-rollback.webp)

You can also trigger the Bytebase rollback via [API](/docs/api/issue/) and build a GitOps workflow to combine the reliability of GitOps workflows with the convenience of visual management tools.

## Conclusion

Database rollbacks are essential for maintaining data integrity and recovering from errors. A well-planned rollback strategy, combined with proper automation and testing, ensures your organization can quickly recover from database issues while minimizing impact on business operations.
