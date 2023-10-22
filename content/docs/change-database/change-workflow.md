---
title: Database Change Workflow
---

For a typical change workflow, a developer first submits the SQL statement for DBA to review. After review is approved, the SQL statement will then be applied to the corresponding database. For a single change, this step would normally be repeated for each environment (e.g. integration, staging, prod).

There are 2 typical workflows employed by the team to deal with database schema changes (DDL) and data changes (DML). [UI workflow](#ui-workflow) and [GitOps workflow (GitOps)](#gitops-workflow).

## UI workflow

Classic SQL Review workflow where the developer submits a SQL review ticket directly from Bytebase and waits for the assigned DBA or peer developer to review. Bytebase applies the SQL change after review approved.

![Issue detail interface](/content/docs/issue-view-annotated.png)

1. Status banner highlighting the issue status.

2. Issue abstract. If the issue is created by a code commit from a linked repository, that code commit information will be displayed.

3. Action buttons to change the issue status.

4. Flow bar showing the stage progression.

5. Task execution status for the selected stage. By default, the current active stage is selected. User can click the flow bar (Item 4) or use the stage dropdown on the right side bar (Item 10) to switch the stage.

6. SQL statement for the selected stage. The statement could also change by selecting different stages.

7. Issue description.

8. Issue activity and comment area.

9. Issue status and assignee.

10. Stage info. User can use the stage dropdown to check info from other stages.

11. Issue misc info.

12. Subscription list.

### Issue Need Attention

On the issue page, the issue creator can click the bell button to mark the issue as requiring attention from the assignee.

![the position of the bell button on the issue page](/content/docs/change-database/change-workflow/position.webp)

- The marked issue will be highlighted in the assignee's view.

![the highlighted attention-needed issues](/content/docs/change-database/change-workflow/highlighted.webp)

## GitOps Workflow

Aka `Database-as-Code`. Database migration scripts are stored in a git repository. To make schema changes, a developer would create a migration script and submit for review in the corresponding VCS such as GitLab. After the script is approved and merged into the configured branch, Bytebase will automatically kicks off the task to apply the new schema change.

![workflow-vcs](/content/docs/workflow-vcs.png)

## Migration Types

Bytebase records the migration history with the migration type information.

### Schema Migration

Schema migration is the migration type for DDL statements.

### Data Migration

Data migration is the migration type for DML statements.

### Baseline Migration

Baseline migration instructs Bytebase to use the latest live schema as the source of truth. This is normally used when [schema drift](/docs/change-database/drift-detection) occurs and Bytebase needs to re-establish the baseline based on the latest live schema.

### Branch Migration

A branch migration history is recorded when a database is restored from a backup. See [Restore from Backup](/docs/disaster-recovery/restore-from-backup#step-4-view-the-restored-database) for details.

## Migration History

Bytebase records the detailed migration history and the before/after schema snapshot for each migration it applies. It also leverages these records to [detect schema drifts](/docs/change-database/drift-detection).

![schema-migration-bytebase](/content/docs/schema-migration-bytebase.png)

![schema-migration-gitlab](/content/docs/schema-migration-gitlab.png)
