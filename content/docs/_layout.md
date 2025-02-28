---
# expand_section_list is the list of default expanded sections.
expand_section_list: ['Self-host']
---

## [Why Bytebase](/introduction/what-is-bytebase)

## [Supported Databases](/introduction/supported-databases)

## [Use Cases](/introduction/use-cases)

## [POC Checklist 📝](/poc)

## [Best Practices 📘](/onboarding)

## [FAQ](/faq)

---

## Self-host

### [Install](/get-started/self-host)

### [Upgrade](/get-started/upgrade)

### [Configure External PostgreSQL](/get-started/install/external-postgres)

### [Configure External URL](/get-started/install/external-url)

## [Cloud](/get-started/cloud)

## Quickstart

### [Step 1 - Deploy with Docker](/get-started/step-by-step/deploy-with-docker)

### [Step 2 - Register Accounts](/get-started/step-by-step/register-accounts)

### [Step 3 - Configure Environments](/get-started/step-by-step/set-up-environments)

### [Step 4 - Add an Instance](/get-started/step-by-step/add-an-instance)

### [Step 5 - Create a Project](/get-started/step-by-step/create-a-project)

### [Step 6 - Change Schema](/get-started/step-by-step/change-schema)

### [Step 7 - Query Data](/get-started/step-by-step/query-data)

## [Connect Your Database](/get-started/instance)

## [Core Concepts](/concepts/data-model)

## [Terraform](/get-started/terraform)

---

## Database CI/CD

### [Overview](/change-database/change-workflow)

### Change

#### [Batch Change](/change-database/batch-change)

#### [Schema Sync](/change-database/synchronize-schema)

#### [Changelist](/changelist)

#### [Stored Procedure](/change-database/stored-procedure)

#### [Schema Editor](/change-database/schema-editor)

#### [Schema Diagram](/change-database/schema-diagram)

#### [Online Schema Migration](/change-database/online-schema-migration-for-mysql)

#### [Secret Variable](/change-database/secret)

### Review

#### [Overview](/sql-review/overview)

#### [Review Policy](/sql-review/review-policy)

#### [Review Rules](/sql-review/review-rules)

#### [UI Integration](/sql-review/ui)

#### [CI Integration](/sql-review/gitops-ci)

#### [API](/sql-review/api)

### Approve

#### [Custom Approval](/administration/custom-approval)

### Roll out

#### [Rollout Policy](/administration/environment-policy/rollout-policy)

### Roll back

#### [Data Rollback](/change-database/rollback-data-changes)

#### [Schema Rollback](/change-database/rollback-schema-changes)

### Version

#### [Change History](/change-database/change-history)

### Monitor

#### [Schema Drift Detection](/change-database/drift-detection)

#### Slow Query

##### [Overview](/slow-query/overview)

##### [Enable Slow Query Log for MySQL](/slow-query/enable-slow-query-log-for-mysql)

##### [Enable pg_stat_statements for PostgreSQL](/slow-query/enable-pg-stat-statements-for-postgresql)

##### [Turn on Slow Query Report in Bytebase](/slow-query/slow-query-report)

##### [Weekly Email Report](/slow-query/email-report)

##### [Index Advisor](/slow-query/index-advisor)

### Settings

#### [Webhook](/change-database/webhook)

#### [Risk Center](/administration/risk-center)

#### [Issue](/change-database/issue)

#### [Schema Template](/administration/schema-template)

### [Troubleshoot 🐞](/change-database/troubleshoot)

## GitOps

### [Overview](/vcs-integration/overview)

### [Release](/vcs-integration/release)

## SQL Editor

### [Overview](/sql-editor/overview)

### [Query](/sql-editor/run-queries)

### [Admin Mode](/sql-editor/admin-mode)

### [Data Masking](/sql-editor/mask-data)

### [Manage SQL Scripts](/sql-editor/manage-sql-scripts)

### [Explore Schema](/sql-editor/explore-schema)

### [AI Assistant](/sql-editor/ai-assistant)

## Database Permission

### [Overview](/security/database-permission/overview)

### [Query](/security/database-permission/query)

### [Export](/security/database-permission/export)

### [EXPLAIN](/security/database-permission/explain)

## Dynamic Data Masking

### [Overview](/security/data-masking/overview)

### [Semantic Types](/security/data-masking/semantic-types)

#### [Masking Algorithm](/security/data-masking/masking-algorithm)

### [Global Masking Rule](/security/data-masking/global-masking-rule)

#### [Data Classification](/security/data-masking/data-classification)

### [Column Masking](/security/data-masking/column-masking)

### [Masking Exemption](/security/data-masking/access-unmasked-data)

---

## Security Admin 🔐

### [Single Sign-On](/administration/sso/overview)

#### [OAuth 2.0](/administration/sso/oauth2)

#### [OpenID Connect (OIDC)](/administration/sso/oidc)

#### [LDAP](/administration/sso/ldap)

### [Roles and Permissions](/concepts/roles-and-permissions)

### [User Groups](/administration/user-groups)

### [Custom Roles](/administration/custom-roles)

### [Audit Log](/security/audit-log)

### [SCIM](/administration/scim/overview)

### [2FA](/administration/2fa)

### [Password Restriction](/administration/password)

### [Sign-in Restriction](/administration/sign-in-restriction)

### [Watermark](/security/watermark)

## General Admin ⚙️

### [Manage License](/administration/license)

### [Production Setup](/administration/production-setup)

### [Back up Data](/administration/back-up-data)

### [Database Change Mode](/administration/mode)

### [AI Assistant](/ai-assistant)

### [Database Instance](/administration/instance)

### [Environment Policy](/administration/environment-policy/overview)

### [Customize Logo](/administration/customize-logo)

### [Announcement](/administration/announcement)

### [SMTP and Email Delivery](/administration/mail-delivery)

### [Archive](/administration/archive)

## API

### [Overview](/api/overview)

### [Authentication](/api/authentication)

### [SQL Review](/api/sql-review)

### [Issue](/api/issue)

### [SQL Editor](/api/sql-editor)

### [Permission](/api/permission)

### [Data Classification](/api/data-classification)

### [Audit Log](/api/audit-log)

## Integrations

### [Terraform](/get-started/terraform)

### [Slack](/how-to/integrations/slack)

### [Jira](/how-to/integrations/jira)

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

#### [How to Check Postgres version](/how-to/postgres/how-to-check-postgres-version)

#### [How to Fix Permission denied for table](/how-to/postgres/permission-denied-for-table-postgres)

#### [How to Fix Must be owner of table](/how-to/postgres/must-be-owner-of-table-postgres)

#### [How to Create Index in Postgres](/how-to/postgres/how-to-create-index-postgres)

### ClickHouse

#### [How to Create a Database](/how-to/clickhouse/how-to-create-a-database-clickhouse)

#### [How to Create a Table](/how-to/clickhouse/how-to-create-a-table-clickhouse)

#### [How to List Tables from a Database](/how-to/clickhouse/how-to-list-tables-from-a-database-clickhouse)

#### [How to Rename a Table](/how-to/clickhouse/how-to-rename-a-table-clickhouse)

### Spanner

#### [How to Find Project ID and Instance ID](/how-to/spanner/how-to-find-project-id-and-instance-id)

#### [How to Create a Service Account for Bytebase](/how-to/spanner/how-to-create-a-service-account-for-bytebase)
