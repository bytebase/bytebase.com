---
# expand_section_list is the list of default expanded sections.
expand_section_list: ['Self-host']
---

## [Why Bytebase](/introduction/what-is-bytebase)

## [Supported Databases](/introduction/supported-databases)

## [Use Cases](/introduction/use-cases)

## [POC Checklist](/poc)

## [Onboarding Phases 🚀](/onboarding)

## [FAQ](/faq)

---

## Install

### [Self-host](/get-started/self-host)

### [Upgrade](/get-started/upgrade)

### [Configure External PostgreSQL](/get-started/install/external-postgres)

### [Configure External URL](/get-started/install/external-url)

### [Cloud](/get-started/cloud)

## Quickstart

### [Step 1 - Deploy with Docker](/get-started/step-by-step/deploy-with-docker)

### [Step 2 - Register Accounts](/get-started/step-by-step/register-accounts)

### [Step 3 - Set up Environments](/get-started/step-by-step/set-up-environments)

### [Step 4 - Add an Instance](/get-started/step-by-step/add-an-instance)

### [Step 5 - Create a Project](/get-started/step-by-step/create-a-project)

### [Step 6 - Change Schema](/get-started/step-by-step/change-schema)

### [Step 7 - Query Data](/get-started/step-by-step/query-data)

## [Connect Your Database](/get-started/instance)

## [Core Concepts](/concepts/data-model)

## [Roles and Permissions](/concepts/roles-and-permissions)

---

## SQL Review

### [Overview](/sql-review/overview)

### [Review Policy](/sql-review/review-policy)

### [Review Rules](/sql-review/review-rules)

### [UI Integration](/sql-review/ui)

### [CI Integration](/sql-review/gitops-ci)

### [API](/sql-review/api)

## GitOps

### [Overview](/vcs-integration/overview)

### [Add Git Provider](/vcs-integration/add-git-provider)

### [Add GitOps Connector in Project](/vcs-integration/add-gitops-connector)

### [Create Migration Files](/vcs-integration/create-migration-files)

### [Troubleshoot 🐞](/vcs-integration/troubleshoot)

## Dynamic Data Masking

### [Overview](/security/data-masking/overview)

### [Global Masking Rule](/security/data-masking/global-masking-rule)

### [Column Masking](/security/data-masking/column-masking)

### [Data Classification](/security/data-masking/data-classification)

### [Masking Algorithm](/security/data-masking/masking-algorithm)

### [Semantic Types](/security/data-masking/semantic-types)

### [Access Unmasked Data](/security/data-masking/access-unmasked-data)

### [Export Masked Data](/security/data-masking/export-masked-data)

## [AI Assistant](/ai-assistant)

## [Batch Change](/change-database/batch-change)

## [Changelist](/changelist)

---

## Change Database

### [Change Workflow](/change-database/change-workflow)

### [1-click Data Rollback](/change-database/rollback-data-changes)

### [Schema Sync and Rollback](/change-database/synchronize-schema)

### [Stored Procedure](/change-database/stored-procedure)

### [Drift Detection](/change-database/drift-detection)

### [Schema Editor](/change-database/schema-editor)

### [Schema Diagram](/change-database/schema-diagram)

### [Online Schema Migration](/change-database/online-schema-migration-for-mysql)

### [Webhook](/change-database/webhook)

### [Troubleshoot 🐞](/change-database/troubleshoot)

## SQL Editor

### [Overview](/sql-editor/overview)

### [Run Query](/sql-editor/run-queries)

### [Admin Mode](/sql-editor/admin-mode)

### [Data Masking](/sql-editor/mask-data)

### [Manage SQL Scripts](/sql-editor/manage-sql-scripts)

### [Explore Schema](/sql-editor/explore-schema)

### [Query with Natural Language](/sql-editor/text-to-sql)

## Secure Data

### [Data Access Control](/security/data-access-control)

### [Data Query Approval Flow](/security/data-query)

### [Data Export Approval Flow](/security/data-export)

### [Secret Variable](/security/secret)

### [Watermark](/security/watermark)

### [Audit Log](/security/audit-log)

## Slow Query

### [Overview](/slow-query/overview)

### [Enable Slow Query Log for MySQL](/slow-query/enable-slow-query-log-for-mysql)

### [Enable pg_stat_statements for PostgreSQL](/slow-query/enable-pg-stat-statements-for-postgresql)

### [Turn on Slow Query Report in Bytebase](/slow-query/slow-query-report)

### [Weekly Email Report](/slow-query/email-report)

### [Index Advisor](/slow-query/index-advisor)

---

## Administration

### [Manage License](/administration/license)

### [Production Setup](/administration/production-setup)

### [Back up Data](/administration/back-up-data)

### [Environment Policy](/administration/environment-policy/overview)

#### [Environment Tier](/administration/environment-policy/tier)

#### [Rollout Policy](/administration/environment-policy/rollout-policy)

### [Single Sign-On](/administration/sso/overview)

#### [OAuth 2.0](/administration/sso/oauth2)

#### [OpenID Connect (OIDC)](/administration/sso/oidc)

#### [LDAP](/administration/sso/ldap)

### [SCIM](/administration/scim/overview)

### [Two-Factor Authentication](/administration/2fa)

### [Sign-in Frequency](/administration/sign-in-frequency)

### [Custom Approval](/administration/custom-approval)

### [Risk Center](/administration/risk-center)

### [Anomaly Center](/administration/anomaly-center)

### [Custom Roles](/administration/custom-roles)

### [Customize Logo](/administration/customize-logo)

### [Announcement](/administration/announcement)

### [Schema Template](/administration/schema-template)

### [SMTP and Email Delivery](/administration/mail-delivery)

### [Archive](/administration/archive)

## API

### [Overview](/api/overview)

### [Authentication](/api/authentication)

### [SQL Review](/api/sql-review)

### [Issue](/api/issue)

### [Permission](/api/permission)

### [Audit Log](/api/audit-log)

### [Data Classification](/api/data-classification)

### [External Approval](/api/external-approval)

## Integrations

### [Terraform](/get-started/terraform)

### [Supabase](/how-to/integrations/supabase)

### [Render](/how-to/integrations/render)

### [Neon](/how-to/integrations/neon)

## Reference

### [Server Startup Options](/reference/command-line)

### [Error Code for Bytebase Core](/reference/error-code/core)

### [Error Code for SQL Advisor](/reference/error-code/advisor)

### [Schema Definition Language](/reference/schema-definition-language)

### [PostgreSQL SQL Review Guide](/how-to/sql-review/postgres-sql-review-guide)

### Postgres

#### [How to check Postgres version](/how-to/postgres/how-to-check-postgres-version)

#### [Permission denied for table](/how-to/postgres/permission-denied-for-table-postgres)

#### [Must be owner of table](/how-to/postgres/must-be-owner-of-table-postgres)

### ClickHouse

#### [How to Create a Database](/how-to/clickhouse/how-to-create-a-database-clickhouse)

#### [How to Create a Table](/how-to/clickhouse/how-to-create-a-table-clickhouse)

#### [How to List Tables from a Database](/how-to/clickhouse/how-to-list-tables-from-a-database-clickhouse)

#### [How to Rename a Table](/how-to/clickhouse/how-to-rename-a-table-clickhouse)

### Spanner

#### [How to Find Project ID and Instance ID](/how-to/spanner/how-to-find-project-id-and-instance-id)

#### [How to Create a Service Account for Bytebase](/how-to/spanner/how-to-create-a-service-account-for-bytebase)
