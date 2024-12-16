---
title: Best Practices 📘
---

## Onboarding Phases

<HintBlock type="info">

For Enterprise customers, **we guarantee 100% implementation success in 90 days**. [Contact us](/contact-us/)
to discuss your specific requirements.

</HintBlock>

The ultimate goal is to make Bytebase the only tool to manage all human-to-db operations. It's fine
if your team has existing tooling and process. Bytebase can be adopted in phases to improve the
database operational practices gradually:

1. [Standardize ad-hoc change process (2 weeks)](#phase-1-standardize-ad-hoc-change-process)
1. [Centralize data query access (2 weeks)](#phase-2-centralize-data-query-access)
1. [Integrate SQL review into CI (1 week)](#phase-3-integrate-sql-review-into-ci)
1. [Manage schema migration (4 ~ 8 weeks)](#phase-4-manage-schema-migration)

### Phase 1 - Standardize ad-hoc change process

|              |                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Duration** | 2 weeks                                                                                                                                              |
| **Goals**    | 1. Remove direct human write access to database.<br/>2. Streamlined change process with review, check, rollout, rollback, notification, and history. |

Manage one-off DML changes (e.g. INSERT/UPDATE/DELETE) and out-of-band schema changes (e.g. add an index on emergency).

Related features:

- [Change Workflow](/docs/change-database/change-workflow/)
- [Data Rollback](/docs/change-database/rollback-data-changes/)
- [Custom Approval](/docs/administration/custom-approval/)
- [Webhook](/docs/change-database/webhook/)
- [SQL Review](/docs/sql-review/overview/) e.g.
  - [Alert when DML attempts to update more than 100 rows](/docs/sql-review/review-rules/#limit-affected-row-limit)
  - [Specify explicit columns in INSERT](/docs/sql-review/review-rules/#insert-statements-must-specify-columns)

### Phase 2 - Centralize data query access

|              |                                                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Duration** | 2 weeks                                                                                                                                                   |
| **Goals**    | 1. Remove direct human read access to database.<br/>2. Access grants are reviewed and recorded. <br/> 3. Dynamic masking policy depending on the querier. |

Bytebase provides a web-based SQL Editor.

Related features:

- [SQL Editor](/docs/sql-editor/overview/)
- [Database Permission](/docs/security/database-permission/overview/)
- [Request Query](/docs/security/database-permission/query/) and [Export](/docs/security/database-permission/export/) access flow
- [Dynamic Data Masking](/docs/security/data-masking/overview/)

### Phase 3 - Integrate SQL review into CI

|              |                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------- |
| **Duration** | 1 week                                                                                       |
| **Goals**    | 1. Auto check SQL anti-patterns during CI.<br/>2. Non-intrusive to the existing CI pipeline. |

If your team has the existing database schema migration process in place. You can start by including the
SQL Review check into the CI.

Related features:

- [SQL Review](/docs/sql-review/overview/)
- [SQL Review API](/docs/api/sql-review/)
- [Service Account](/docs/api/authentication/#service-account)

### Phase 4 - Manage schema migration

|              |                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Duration** | 4 ~ 8 weeks                                                                                                                                         |
| **Goals**    | 1. Decouple schema migration from code release.<br/>2. Streamlined change process with review, check, rollout, rollback, notification, and history. |

You have achieved decent success in implementing Bytebase for your org. You may not need phase 4 if the application
is OK to deploy schema migration together with the code release. On the other hand, it's beneficial to use Bytebase
for schema migration if you have any of the following situations:

1. Multiple servers connecting to the same database.
1. Multi-region database deployment.
1. Multi-tenant service and each tenant has its own database.
1. Long-running schema migration.

The implementation duration depends on how many existing schema migration workflows need to be moved to Bytebase.

Related features (in addition to Phase 1):

1. [Schema Synchronization](/docs/change-database/synchronize-schema/)
1. [GitOps](/docs/vcs-integration/overview/)
1. [Drift Detection](/docs/change-database/drift-detection/)
1. [Batch Change](/docs/change-database/batch-change/)
1. [Changelist](/docs/changelist/)
1. [Online Schema Migration (MySQL only)](/docs/change-database/online-schema-migration-for-mysql/)

## Configuration Guideline

Bytebase provides settings at the workspace, environment, project levels. Below we provide a sample configuration settings for a typical scenarios:

- Three environments `Dev`, `UAT`, `Prod`.
- `Dev` does not enforce any review and access control.
- `UAT` enforces limited review and access control.
- `Prod` enforces strict review and access control.

|                                                                                                        |                                                                           | Dev         | UAT             | Prod               |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ----------- | --------------- | ------------------ |
| [Environment tier](/docs/administration/environment-policy/overview/#environment-tier)                 | Environment color                                                         | Black       | Yellow          | Red                |
|                                                                                                        | Production indicator                                                      | ❌          | ❌              | ✅                 |
| [Statement execution mode](/docs/administration/environment-policy/overview/#statement-execution-mode) | Allow running DDL in SQL Editor                                           | ✅          | ❌              | ❌                 |
|                                                                                                        | Allow running data-modifying DML in SQL Editor                            | ✅          | ❌              | ❌                 |
| Database CI/CD                                                                                         | [Approval Policy](/docs/administration/custom-approval/)                  | No approver | Single approver | Multiple approvers |
|                                                                                                        | [Rollout Policy](/docs/administration/environment-policy/rollout-policy/) | Automatic   | Manual          | Manual             |
| [Database Permission](/docs/security/database-permission/overview/)                                    | EXPLAIN                                                                   | ✅          | ✅              | ✅                 |
|                                                                                                        | Query                                                                     | ✅          | ✅              | Require approval   |
|                                                                                                        | Export                                                                    | ✅          | ✅              | Require approval   |
| [Data masking](/docs/security/data-masking/global-masking-rule/)                                       |                                                                           | ❌          | ❌              | ✅                 |
