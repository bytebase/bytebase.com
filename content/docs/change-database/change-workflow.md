---
title: Database Change Workflow
---

<TutorialBlock url="/docs/tutorials/first-schema-change" title="Your First Schema Change in 5 Minutes" />

For a typical change workflow, a developer first submits the SQL statement for DBA to review. After review is approved, the SQL statement will then be applied to the corresponding database. For a single change, this step would normally be repeated for each environment (e.g. integration, staging, prod).

There are 2 typical workflows employed by the team to deal with database schema changes (DDL) and data changes (DML). [UI workflow](#ui-workflow) and [GitOps workflow (GitOps)](#gitops-workflow).

## UI workflow

Classic SQL Review workflow where the developer submits a SQL review ticket directly from Bytebase and waits for the assigned DBA or peer developer to review. Bytebase applies the SQL change after review approved.

![Issue detail interface](/content/docs/change-database/change-workflow/issue-detail.webp)

## GitOps Workflow

Aka `Database-as-Code`. Database migration scripts are stored in a git repository. To make schema changes, a developer would create a migration script and submit for review in the corresponding VCS such as GitLab. After the script is approved and merged into the configured branch, Bytebase will automatically kicks off the task to apply the new schema change.

![workflow-vcs](/content/docs/change-database/change-workflow/workflow-vcs.webp)

## Rollout Time

<PricingPlanBlock feature_name='SCHEDULE_CHANGE' />

If you want to roll out changes during non-business hours, you can set a rollout time.

![rollout-time](/content/docs/change-database/change-workflow/rollout-time.webp)

## Migration Types

Bytebase records the migration history with the migration type information.

### Schema Migration

Schema migration is the migration type for DDL statements.

### Data Migration

Data migration is the migration type for DML statements.

### Baseline Migration

Baseline migration instructs Bytebase to use the latest live schema as the source of truth. This is normally used when [schema drift](/docs/change-database/drift-detection) occurs and Bytebase needs to re-establish the baseline based on the latest live schema.

## Migration History

Bytebase records the detailed migration history and the before/after schema snapshot for each migration it applies. It also leverages these records to [detect schema drifts](/docs/change-database/drift-detection).

![schema-migration-bytebase](/content/docs/change-database/change-workflow/schema-migration-bytebase.webp)

![schema-migration-gitlab](/content/docs/change-database/change-workflow/schema-migration-gitlab.webp)
