---
# expand_section_list is the list of default expanded sections.
expand_section_list: ["Introduction", "Get Started"]
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

## [FAQ](/faq)

## [Document Write Guide](/document-write-guide)
