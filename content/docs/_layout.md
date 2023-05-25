---
# expand_section_list is the list of default expanded sections.
expand_section_list: ['Introduction', 'Get Started']
---

## Introduction

### [What is Bytebase](/introduction/what-is-bytebase)

### [Use Cases](/introduction/use-cases)

### [Supported Databases](/introduction/supported-databases)

## Get Started

### [Cloud](/get-started/cloud)

### [Self-Hosted](/get-started/self-hosted)

#### [5 Mins Quick Start](/get-started/quick-start)

#### [Installation](/get-started/install/overview)

##### [Option 1 Docker (5 seconds)](/get-started/install/deploy-with-docker)

##### [Option 2 Deploy to Kubernetes](/get-started/install/deploy-to-kubernetes)

##### [Option 3 Deploy to sealos](/get-started/install/deploy-to-sealos)

##### [Option 4 Deploy to Rainbond](/get-started/install/deploy-to-rainbond)

##### [Option 5 Deploy to render](/get-started/install/deploy-to-render)

##### [Option 6 Installation Script](/get-started/install/installation-script)

##### [Option 7 Build from Source Code](/get-started/install/build-from-source-code)

##### [Configure External PostgreSQL](/get-started/install/external-postgres)

##### [Configure External URL](/get-started/install/external-url)

#### [Configure Testing MySQL Instance](/get-started/install/local-mysql-instance)

### [Configure Workspace](/get-started/configure-workspace/overview)

#### [Register Accounts](/get-started/configure-workspace/register-accounts)

#### [Manage Members](/get-started/configure-workspace/manage-members)

#### [Set up Environments](/get-started/configure-workspace/set-up-environments)

#### [Add an Instance](/get-started/configure-workspace/add-an-instance)

#### [Customize the Logo](/get-started/configure-workspace/customize-the-logo)

### [Work with a Project](/get-started/work-with-a-project/overview)

#### [Create a Project](/get-started/work-with-a-project/create-a-project)

#### [Run a UI Workflow](/get-started/work-with-a-project/run-a-ui-workflow)

### [Manage with Terraform](/get-started/terraform)

---

## Concepts

### [Data Model](/concepts/data-model)

### [Roles and Permissions](/concepts/roles-and-permissions)

### [Schema Change Workflow](/concepts/schema-change-workflow)

### [Migration Types](/concepts/migration-types)

### [Tenant Database](/concepts/tenant-database)

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

### [Change Workflow](/change-database/change-workflow/overview)

#### [Issue Need Attention](/change-database/change-workflow/issue-need-attention)

### [State-based Migration](/change-database/state-based-migration/overview)

#### [Schema Definition Language](/change-database/state-based-migration/schema-definition-language)

#### [Baseline SDL Schema](/change-database/state-based-migration/baseline-sdl-schema)

### [Schema Editor](/change-database/schema-editor)

### [Schema Diagram](/change-database/schema-diagram)

### [Migration History](/change-database/migration-history)

### [Synchronize Schema](/change-database/synchronize-schema)

### [Rollback Data Changes](/change-database/rollback-data-changes)

### [Online Schema Migration for MySQL](/change-database/online-schema-migration-for-mysql)

## [Batch Change](/batch-change/overview)

### [Change Multiple Environments](/batch-change/multi-environment-change)

### [Change Multiple Tenants](/batch-change/multi-tenant-change)

## [SQL Editor](/sql-editor/overview)

### [Manage SQL Scripts with Sheet](/sql-editor/manage-sql-scripts)

### [Run and EXPLAIN Query](/sql-editor/run-queries)

### [Anonymize Data](/sql-editor/anonymize-data)

### [Admin Mode](/sql-editor/admin-mode)

### [Explore Schema](/sql-editor/explore-schema)

### [ChatSQL](/sql-editor/chatsql)

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

### [Backup and Restore Database](/disaster-recovery/backup-restore-database/overview)

#### [Backup](/disaster-recovery/backup-restore-database/backup)

#### [Restore from Backup](/disaster-recovery/backup-restore-database/restore-from-backup)

#### [Backup to the Cloud](/disaster-recovery/backup-restore-database/cloud-backup)

### [Point-in-time Recovery for MySQL](/disaster-recovery/point-in-time-recovery-for-mysql)

### [Backup Retention Policy](/disaster-recovery/backup-retention-policy)

## Anomaly Detection

### [Drift Detection](/anomaly-detection/drift-detection)

### [Anomaly Center](/anomaly-detection/anomaly-center)

## [Data Query and Export](/data-query-and-export/overview)

### [Data Query Approval Flow](/data-query-and-export/data-query)

### [Data Export Approval Flow](/data-query-and-export/data-export)

---

## Administration

### [Production Setup](/administration/production-setup)

### [Single Sign-On](/administration/sso/overview)

#### [OAuth 2.0](/administration/sso/oauth2)

#### [OpenID Connect (OIDC)](/administration/sso/oidc)

### [Two-Factor Authentication](/administration/2fa)

### [Back up Data](/administration/back-up-data)

### [Risk Center](/administration/risk-center)

### [Custom Approval](/administration/custom-approval)

### [Custom Roles](/administration/custom-roles)

### [Environment Policy](/administration/environment-policy/overview)

#### [Environment Tier](/administration/environment-policy/tier)

#### [Rollout Policy](/administration/environment-policy/rollout-policy)

#### [Backup Schedule Policy](/administration/environment-policy/backup-schedule-policy)

### [Database Access Control](/administration/database-access-control)

### [Audit Log](/administration/audit-log)

### [Anonymize Data](/administration/anonymize-data)

### [Watermark](/administration/watermark)

### [Webhook Integration](/administration/webhook-integration/overview)

#### [Project Webhook](/administration/webhook-integration/project-webhook)

#### [Database Webhook](/administration/webhook-integration/database-webhook)

#### [External Approval](/administration/webhook-integration/external-approval)

### [Archive](/administration/archive)

### [Mail Delivery](/administration/mail-delivery)

### [Secret](/administration/secret)

---

## Reference

### [Server Startup Options](/reference/command-line)

### [Error Code](/reference/error-code/overview)

#### [Error Code for Bytebase Core](/reference/error-code/core)

#### [Error Code for SQL Advisor](/reference/error-code/advisor)

---

## API

### [Getting Started](/api/overview)

### [SQL Advise](/api/sql-advise)

---

## CLI

### [Getting Started](/cli/overview)

### [Integrate with GitLab CI](/cli/integrate-with-gitlab)

### [Reference](/cli/reference)

---

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

---

## Tutorials

### [Overview](/tutorials/overview)

### Beginner

#### [Change Management with Spanner](/tutorials/beginner/database-change-management-with-spanner)

#### [Change Management using Bytebase Cloud](/tutorials/beginner/database-change-management-using-bytebase-cloud)

#### [Change Management with Amazon Aurora](/tutorials/beginner/database-change-management-with-amazon-aurora)

#### [Change Management with ClickHouse](/tutorials/beginner/database-change-management-with-clickhouse)

#### [Change Management with MongoDB](/tutorials/beginner/database-change-management-with-mongodb)

#### [Change Management with MySQL](/tutorials/beginner/database-change-management-with-mysql)

#### [Change Management with PostgreSQL](/tutorials/beginner/database-change-management-with-postgresql)

#### [Change Management with Redis](/tutorials/beginner/database-change-management-with-redis)

#### [Change Management with Snowflake](/tutorials/beginner/database-change-management-with-snowflake)

#### [Change Management with TiDB](/tutorials/beginner/database-change-management-with-tidb)

#### [How to Synchronize Database Schemas](/tutorials/beginner/how-to-synchronize-database-schemas)

### Intermediate

#### [Change Management with Spanner and GitHub](/tutorials/intermediate/database-change-management-with-spanner-and-github)

#### [Change Management with Amazon Aurora and GitHub](/tutorials/intermediate/database-change-management-with-amazon-aurora-and-github)

#### [Change Management with ClickHouse and GitHub](/tutorials/intermediate/database-change-management-with-clickhouse-and-github)

#### [Change Management with GitHub using Bytebase Cloud](/tutorials/intermediate/database-change-management-with-github-using-bytebase-cloud)

#### [Change Management with MongoDB and GitHub](/tutorials/intermediate/database-change-management-with-mongodb-and-github)

#### [Change Management with MySQL and GitHub](/tutorials/intermediate/database-change-management-with-mysql-and-github)

#### [Change Management with PostgreSQL and GitHub](/tutorials/intermediate/database-change-management-with-postgresql-and-github)

#### [Change Management with Redis and GitHub](/tutorials/intermediate/database-change-management-with-redis-and-github)

#### [Change Management with Snowflake and GitHub](/tutorials/intermediate/database-change-management-with-snowflake-and-github)

#### [Change Management with TiDB and GitHub](/tutorials/intermediate/database-change-management-with-tidb-and-github)

#### [The Database CI/CD Best Practice with GitHub](/tutorials/intermediate/database-cicd-best-practice-with-github)

#### [How to Setup Database CI/CD with GitHub Actions](/tutorials/intermediate/github-database-cicd-part-1-sql-review-github-actions)

#### [How to Setup Database CI/CD with GitHub Database GitOps](/tutorials/intermediate/github-database-cicd-part-2-github-database-gitops)

#### [How to Setup Database CI/CD with GitHub: Put Them Together](/tutorials/intermediate/github-database-cicd-part-3-put-them-together)

#### [How to Configure Database Access Control](/tutorials/intermediate/how-to-configure-database-access-control-and-data-anonymization-for-developer)

#### [How to integrate SQL Review](/tutorials/intermediate/how-to-integrate-sql-review-into-gitlab-github-ci)

#### [Manage Databases in Bytebase with Terraform](/tutorials/intermediate/manage-databases-in-bytebase-with-terraform)

---

## [FAQ](/faq)

## [Document Write Guide](/document-write-guide)
