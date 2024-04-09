---
# expand_section_list is the list of default expanded sections.
expand_section_list: ['Self-host', 'Get Started']
---

## [Why Bytebase](/introduction/what-is-bytebase)

## [Use Cases](/introduction/use-cases)

## [Supported Databases](/introduction/supported-databases)

## [POC Checklist](/poc)

## [FAQ](/faq)

---

## [Cloud](/get-started/cloud)

## Self-host

### [Install](/get-started/self-host)

### [Configure External PostgreSQL](/get-started/install/external-postgres)

### [Configure External URL](/get-started/install/external-url)

## Quickstart

### [Step 1 - Deploy with Docker](/get-started/step-by-step/deploy-with-docker)

### [Step 2 - Register Accounts](/get-started/step-by-step/register-accounts)

### [Step 3 - Set up Environments](/get-started/step-by-step/set-up-environments)

### [Step 4 - Add an Instance](/get-started/step-by-step/add-an-instance)

### [Step 5 - Create a Project](/get-started/step-by-step/create-a-project)

### [Step 6 - Change Schema](/get-started/step-by-step/change-schema)

### [Step 7 - Query Data](/get-started/step-by-step/query-data)

## [Core Concepts](/concepts/data-model)

## [Connect Your Database](/get-started/instance)

## [Roles and Permissions](/concepts/roles-and-permissions)

---

## SQL Review

### [Overview](/sql-review/overview)

### [Review Policy](/sql-review/review-policy)

### [Review Rules](/sql-review/review-rules)

### [UI Integration](/sql-review/ui)

### [CI Integration](/sql-review/gitops-ci)

### [API](/sql-review/api)

### [GitHub Actions](/sql-review/github-action)

### [GitHub App](/sql-review/github-app)

## GitOps

### [Overview](/vcs-integration/overview)

### [Add Git Provider](/vcs-integration/add-git-provider)

### [Add GitOps Connector in Project](/vcs-integration/add-gitops-connector)

### [Create Migration Files](/vcs-integration/create-migration-files)

### [Troubleshoot 🐞](/vcs-integration/troubleshoot)

## Dynamic Data Masking

### [Overview](/security/data-masking/overview)

### [Global Masking Rule](/security/data-masking/global-masking-rule)

### [Column Data Masking](/security/data-masking/column-masking)

### [Semantic Types](/security/data-masking/semantic-types)

### [Masking Algorithm](/security/data-masking/masking-algorithm)

### [Access Unmasked Data](/security/data-masking/access-unmasked-data)

### [Export Masked Data](/security/data-masking/export-masked-data)

## [Batch Change](/change-database/batch-change)

## [Branching](/branching)

## [Changelist](/changelist)

---

## Change Database

### [Change Workflow](/change-database/change-workflow)

### [State-based Migration](/change-database/state-based-migration)

### [Stored Procedure](/change-database/stored-procedure)

### [Drift Detection](/change-database/drift-detection)

### [Schema Editor](/change-database/schema-editor)

### [Schema Diagram](/change-database/schema-diagram)

### [Synchronize Schema](/change-database/synchronize-schema)

### [Rollback Data Changes](/change-database/rollback-data-changes)

### [Online Schema Migration for MySQL](/change-database/online-schema-migration-for-mysql)

### [Project Webhook](/change-database/webhook)

### [Troubleshoot 🐞](/change-database/troubleshoot)

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

### [Upgrade](/administration/upgrade)

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

### [Two-Factor Authentication](/administration/2fa)

### [Sign-in Frequency](/administration/sign-in-frequency)

### [Anomaly Center](/administration/anomaly-center)

### [Schema Template](/administration/schema-template)

### [Custom Approval](/administration/custom-approval)

### [Risk Center](/administration/risk-center)

### [Custom Roles](/administration/custom-roles)

### [Customize Logo](/administration/customize-logo)

### [Announcement](/administration/announcement)

### [SMTP and Email Delivery](/administration/mail-delivery)

### [Archive](/administration/archive)

## API

### [Overview](/api/overview)

### [Authentication](/api/authentication)

### [SQL Review](/api/sql-review)

### [External Approval](/api/external-approval)

## Integrations

### [Terraform](/get-started/terraform)

### [Supabase](/how-to/integrations/supabase)

### [Render](/how-to/integrations/render)

### [Neon](/how-to/integrations/neon)

## CLI

### [Getting Started](/cli/overview)

### [Integrate with GitLab CI](/cli/integrate-with-gitlab)

### [Reference](/cli/reference)

## Reference

### [Server Startup Options](/reference/command-line)

### [Error Code for Bytebase Core](/reference/error-code/core)

### [Error Code for SQL Advisor](/reference/error-code/advisor)

### [Schema Definition Language](/reference/schema-definition-language)

### [PostgreSQL SQL Review Guide](/how-to/sql-review/postgres-sql-review-guide)

### Postgres

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
