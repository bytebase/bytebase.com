---
# expand_section_list is the list of default expanded sections.
expand_section_list: ['Self-host', 'Get Started']
---

### [What is Bytebase](/introduction/what-is-bytebase)

### [Use Cases](/introduction/use-cases)

### [Supported Databases](/introduction/supported-databases)

### [FAQ](/faq)

---

## Get Started

### [Cloud](/get-started/cloud)

### [Self-host](/get-started/self-host)

#### [Configure External PostgreSQL](/get-started/install/external-postgres)

#### [Configure External URL](/get-started/install/external-url)

### Quickstart

#### [Step 1 - Register Accounts](/get-started/step-by-step/register-accounts)

#### [Step 2 - Set up Environments](/get-started/step-by-step/set-up-environments)

#### [Step 3 - Add an Instance](/get-started/step-by-step/add-an-instance)

#### [Step 4 - Create a Project](/get-started/step-by-step/create-a-project)

#### [Step 5 - Change Schema](/get-started/step-by-step/change-schema)

#### [Step 6 - Query Data](/get-started/step-by-step/query-data)

#### [Step 7 - Manage Members](/get-started/step-by-step/manage-members)

### [Core Concepts](/concepts/data-model)

### [Connect Your Database](/get-started/instance)

### [Roles and Permissions](/concepts/roles-and-permissions)

---

## SQL Review

### [Overview](/sql-review/overview)

### [Review Policy](/sql-review/review-policy)

### [Review Rules](/sql-review/review-rules)

### [SQL Advisor](/sql-review/sql-advisor/overview)

#### [UI](/sql-review/sql-advisor/ui)

#### [API](/sql-review/sql-advisor/api)

#### [GitHub Action](/sql-review/sql-advisor/github-action)

#### [GitHub App](/sql-review/sql-advisor/github-app)

#### [GitOps CI](/sql-review/sql-advisor/gitops-ci)

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

### [Project Webhook](/change-database/webhook)

## SQL Editor

### [Overview](/sql-editor/overview)

### [Run and EXPLAIN Query](/sql-editor/run-queries)

### [Batch Query](/sql-editor/batch-query)

### [Admin Mode](/sql-editor/admin-mode)

### [Data Masking](/sql-editor/mask-data)

### [Manage SQL Scripts with Sheet](/sql-editor/manage-sql-scripts)

### [Explore Schema](/sql-editor/explore-schema)

### [ChatSQL](/sql-editor/chatsql)

## Secure Data

### Dynamic Data Masking

#### [Overview](/security/data-masking/overview)

#### [Global Masking Rule](/security/data-masking/global-masking-rule)

#### [Column Data Masking](/security/data-masking/column-masking)

#### [Access Unmasked Data](/security/data-masking/access-unmasked-data)

### [Data Access Control](/security/data-access-control)

### [Data Query Approval Flow](/security/data-query)

### [Data Export Approval Flow](/security/data-export)

### [Secret Variable](/security/secret)

### [Watermark](/security/watermark)

### [Audit Log](/security/audit-log)

## VCS Integration (GitOps)

### [Overview](/vcs-integration/overview)

### [Add Git Provider](/vcs-integration/add-git-provider)

#### [Self-host GitLab EE/CE](/vcs-integration/self-host-gitlab)

#### [GitLab.com](/vcs-integration/gitlab-com)

#### [GitHub.com](/vcs-integration/github-com)

#### [GitHub Enterprise](/vcs-integration/github-enterprise)

#### [Bitbucket.org](/vcs-integration/bitbucket-org)

#### [Azure DevOps](/vcs-integration/azure-devops)

### [Enable GitOps Workflow in Project](/vcs-integration/enable-gitops-workflow)

### [Name and Organize Schema Files](/vcs-integration/name-and-organize-schema-files)

### [Batch Change Tenant Databases](/vcs-integration/tenant-gitops)

### [Troubleshoot](/vcs-integration/troubleshoot)

## Slow Query

### [Overview](/slow-query/overview)

### [Enable Slow Query Log for MySQL](/slow-query/enable-slow-query-log-for-mysql)

### [Enable pg_stat_statements for PostgreSQL](/slow-query/enable-pg-stat-statements-for-postgresql)

### [Turn on Slow Query Report in Bytebase](/slow-query/slow-query-report)

### [Weekly Email Report](/slow-query/email-report)

### [Index Advisor](/slow-query/index-advisor)

## Disaster Recovery

### [Backup](/disaster-recovery/backup)

### [Restore from Backup](/disaster-recovery/restore-from-backup)

### [Point-in-time Recovery for MySQL](/disaster-recovery/point-in-time-recovery-for-mysql)

### [Backup Retention Policy](/disaster-recovery/backup-retention-policy)

---

## Administration

### [Manage License](/administration/license)

### [Production Setup](/administration/production-setup)

### [Back up Data](/administration/back-up-data)

### [Environment Policy](/administration/environment-policy/overview)

#### [Environment Tier](/administration/environment-policy/tier)

#### [Rollout Policy](/administration/environment-policy/rollout-policy)

#### [Backup Schedule Policy](/administration/environment-policy/backup-schedule-policy)

### [Single Sign-On](/administration/sso/overview)

#### [OAuth 2.0](/administration/sso/oauth2)

#### [OpenID Connect (OIDC)](/administration/sso/oidc)

#### [LDAP](/administration/sso/ldap)

### [Two-Factor Authentication](/administration/2fa)

### [Sign-in Frequency](/administration/sign-in-frequency)

### [Anomaly Center](/administration/anomaly-center)

### [Schema Template](/administration/schema-template)

### [Risk Center](/administration/risk-center)

### [Custom Approval](/administration/custom-approval)

### [Custom Roles](/administration/custom-roles)

### [Customize Logo](/administration/customize-logo)

### [Announcement](/administration/announcement)

### [SMTP and Email Delivery](/administration/mail-delivery)

### [Archive](/administration/archive)

## Integrations

### [Terraform](/docs/get-started/terraform)

### [Supabase](/how-to/integrations/supabase)

### [Render](/how-to/integrations/render)

### [Neon](/how-to/integrations/neon)

## API

### [Getting Started](/api/overview)

### [SQL Advise](/api/sql-advise)

### [External Approval](/api/external-approval)

## CLI

### [Getting Started](/cli/overview)

### [Integrate with GitLab CI](/cli/integrate-with-gitlab)

### [Reference](/cli/reference)

## How-To

### Workflow

#### [GitOps with Feature Branch](/how-to/workflow/gitops-feature-branch)

### ClickHouse

#### [How to Create a Database](/how-to/clickhouse/how-to-create-a-database-clickhouse)

#### [How to Create a Table](/how-to/clickhouse/how-to-create-a-table-clickhouse)

#### [How to List Tables from a Database](/how-to/clickhouse/how-to-list-tables-from-a-database-clickhouse)

#### [How to Rename a Table](/how-to/clickhouse/how-to-rename-a-table-clickhouse)

### Spanner

#### [How to Find Project ID and Instance ID](/how-to/spanner/how-to-find-project-id-and-instance-id)

#### [How to Create a Service Account for Bytebase](/how-to/spanner/how-to-create-a-service-account-for-bytebase)

## Reference

### [Server Startup Options](/reference/command-line)

### [Schema Definition Language](/reference/schema-definition-language)

### [Error Code](/reference/error-code/overview)

#### [Error Code for Bytebase Core](/reference/error-code/core)

#### [Error Code for SQL Advisor](/reference/error-code/advisor)

### [PostgreSQL SQL Review Guide](/how-to/sql-review/postgres-sql-review-guide)
