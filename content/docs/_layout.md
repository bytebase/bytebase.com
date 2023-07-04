---
# expand_section_list is the list of default expanded sections.
expand_section_list: ['Introduction', 'Get Started', 'Core Concepts']
---

## Introduction

### [What is Bytebase](/introduction/what-is-bytebase)

### [Use Cases](/introduction/use-cases)

### [Supported Databases](/introduction/supported-databases)

### [Tutorials](/tutorials)

### [FAQ](/faq)

## Get Started

### [Bytebase Cloud](/get-started/cloud)

### [Self-host](/get-started/self-host)

### [Configure External PostgreSQL](/get-started/install/external-postgres)

### [Configure External URL](/get-started/install/external-url)

### [Manage with Terraform](/get-started/terraform)

### [Step-by-Step Quick Start](/get-started/quick-start)

#### [Step 1 - Register Accounts](/get-started/step-by-step/register-accounts)

#### [Step 2 - Manage Members](/get-started/step-by-step/manage-members)

#### [Step 3 - Set up Environments](/get-started/step-by-step/set-up-environments)

#### [Step 4 - Add an Instance](/get-started/step-by-step/add-an-instance)

#### [Step 5 - Create a Project](/get-started/step-by-step/create-a-project)

#### [Step 6 - Change Schema ](/get-started/step-by-step/change-schema)

---

## Core Concepts

### [Data Model](/concepts/data-model)

### [Roles and Permissions](/concepts/roles-and-permissions)

### [Change Workflow](/concepts/database-change-workflow)

### [Batch Mode](/concepts/batch-mode)

---

## [SQL Review](/sql-review/overview)

### [SQL Advisor](/sql-review/sql-advisor/overview)

#### [UI](/sql-review/sql-advisor/ui)

#### [API](/sql-review/sql-advisor/api)

#### [GitHub Action](/sql-review/sql-advisor/github-action)

#### [GitHub App](/sql-review/sql-advisor/github-app)

#### [GitOps CI](/sql-review/sql-advisor/gitops-ci)

### [Review Policy](/sql-review/review-policy/overview)

#### [Create Schema Review Policy](/sql-review/review-policy/create-schema-review-policy)

#### [Schema Review Check in the Issue](/sql-review/review-policy/schema-review-check-in-the-issue)

#### [View Schema Review Policy](/sql-review/review-policy/view-schema-review-policy)

#### [Edit Schema Review Policy](/sql-review/review-policy/edit-schema-review-policy)

#### [Disable and Delete Schema Review Policy](/sql-review/review-policy/disable-delete-policy)

### [Review Rules](/sql-review/review-rules)

## Change Database

### [Change Workflow](/change-database/change-workflow)

### [Batch Change](/change-database/batch-change)

### [State-based Migration](/change-database/state-based-migration)

### [Drift Detection](/change-database/drift-detection)

### [Schema Editor](/change-database/schema-editor)

### [Schema Diagram](/change-database/schema-diagram)

### [Migration History](/change-database/migration-history)

### [Synchronize Schema](/change-database/synchronize-schema)

### [Rollback Data Changes](/change-database/rollback-data-changes)

### [Online Schema Migration for MySQL](/change-database/online-schema-migration-for-mysql)

### [Change Secret](/change-database/secret)

### [Project Webhook](/change-database/webhook)

## [SQL Editor](/sql-editor/overview)

### [Manage SQL Scripts with Sheet](/sql-editor/manage-sql-scripts)

### [Run and EXPLAIN Query](/sql-editor/run-queries)

### [Anonymize Data](/sql-editor/anonymize-data)

### [Admin Mode](/sql-editor/admin-mode)

### [Explore Schema](/sql-editor/explore-schema)

### [ChatSQL](/sql-editor/chatsql)

## Secure Data

### [Data Query Approval Flow](/security/data-query)

### [Data Export Approval Flow](/security/data-export)

### [Anonymize Data](/security/anonymize-data)

### [Data Access Control](/security/data-access-control)

### [Watermark](/security/watermark)

### [Audit Log](/security/audit-log)

## [VCS Integration (GitOps)](/vcs-integration/overview)

### [Add Git Provider](/vcs-integration/add-git-provider)

#### [Self-host GitLab EE/CE](/vcs-integration/self-host-gitlab)

#### [GitLab.com](/vcs-integration/gitlab-com)

#### [GitHub.com](/vcs-integration/github-com)

#### [Bitbucket.org](/vcs-integration/bitbucket-org)

### [Enable GitOps Workflow in Project](/vcs-integration/enable-gitops-workflow)

### [Name and Organize Schema Files](/vcs-integration/name-and-organize-schema-files)

### [Batch Change Tenant Databases](/vcs-integration/tenant-gitops)

### [Troubleshoot](/vcs-integration/troubleshoot)

## [Slow Query](/slow-query/overview)

### [Enable slow query log for MySQL](/slow-query/enable-slow-query-log-for-mysql)

### [Enable pg_stat_statements for PostgreSQL](/slow-query/enable-pg-stat-statements-for-postgresql)

### [Index Advisor](/slow-query/index-advisor)

## Disaster Recovery

### [Backup](/disaster-recovery/backup)

### [Restore from Backup](/disaster-recovery/restore-from-backup)

### [Point-in-time Recovery for MySQL](/disaster-recovery/point-in-time-recovery-for-mysql)

### [Backup Retention Policy](/disaster-recovery/backup-retention-policy)

---

## Administration

### [License](/administration/license)

### [Production Setup](/administration/production-setup)

### [Back up Data](/administration/back-up-data)

### [Environment Policy](/administration/environment-policy/overview)

#### [Environment Tier](/administration/environment-policy/tier)

#### [Rollout Policy](/administration/environment-policy/rollout-policy)

#### [Backup Schedule Policy](/administration/environment-policy/backup-schedule-policy)

### [Single Sign-On](/administration/sso/overview)

#### [OAuth 2.0](/administration/sso/oauth2)

#### [OpenID Connect (OIDC)](/administration/sso/oidc)

### [Two-Factor Authentication](/administration/2fa)

### [Anomaly Center](/administration/anomaly-center)

### [Risk Center](/administration/risk-center)

### [Custom Approval](/administration/custom-approval)

### [Custom Roles](/administration/custom-roles)

### [External Approval](/administration/external-approval)

### [Customize Logo](/administration/customize-logo)

### [SMTP and Email Delivery](/administration/mail-delivery)

### [Archive](/administration/archive)

## Reference

### [Server Startup Options](/reference/command-line)

### [Schema Definition Language](/reference/schema-definition-language)

### [Error Code](/reference/error-code/overview)

#### [Error Code for Bytebase Core](/reference/error-code/core)

#### [Error Code for SQL Advisor](/reference/error-code/advisor)

## API

### [Getting Started](/api/overview)

### [SQL Advise](/api/sql-advise)

### [External Approval](/api/external-approval)

## CLI

### [Getting Started](/cli/overview)

### [Integrate with GitLab CI](/cli/integrate-with-gitlab)

### [Reference](/cli/reference)

## How-To

### SQL Review Guide

#### [PostgreSQL](/how-to/sql-review/postgres-sql-review-guide)

### Workflow

#### [GitOps with Feature Branch](/how-to/workflow/gitops-feature-branch)

### Integrations

#### [Supabase](/how-to/integrations/supabase)

#### [Render](/how-to/integrations/render)

#### [Neon](/how-to/integrations/neon)

### ClickHouse

#### [How to Create a Database](/how-to/clickhouse/how-to-create-a-database-clickhouse)

#### [How to Create a Table](/how-to/clickhouse/how-to-create-a-table-clickhouse)

#### [How to List Tables from a Database](/how-to/clickhouse/how-to-list-tables-from-a-database-clickhouse)

#### [How to Rename a Table](/how-to/clickhouse/how-to-rename-a-table-clickhouse)

### Spanner

#### [How to Find Project ID and Instance ID](/how-to/spanner/how-to-find-project-id-and-instance-id)

#### [How to Create a Service Account for Bytebase](/how-to/spanner/how-to-create-a-service-account-for-bytebase)

## [Document Write Guide](/document-write-guide)
