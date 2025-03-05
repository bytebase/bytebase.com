---
# expand_section_list is the list of default expanded sections.
expand_section_list: ['Self-host']
---

## [Why Bytebase](/docs/introduction/what-is-bytebase)

## [Supported Databases](/docs/introduction/supported-databases)

## [Use Cases](/docs/introduction/use-cases)

## [POC Checklist 📝](/docs/poc)

## [Best Practices 📘](/docs/onboarding)

## [Core Concepts 💡](/docs/concepts/data-model)

## [FAQ](/docs/faq)

---

## Install

### [Self-host](/docs/get-started/self-host)

### [Upgrade](/docs/get-started/upgrade)

### [Configure External PostgreSQL](/docs/get-started/install/external-postgres)

### [Configure External URL](/docs/get-started/install/external-url)

### [Cloud](/docs/get-started/cloud)

## Quickstart

### [Step 1 - Deploy with Docker](/docs/get-started/step-by-step/deploy-with-docker)

### [Step 2 - Register Accounts](/docs/get-started/step-by-step/register-accounts)

### [Step 3 - Configure Environments](/docs/get-started/step-by-step/set-up-environments)

### [Step 4 - Add an Instance](/docs/get-started/step-by-step/add-an-instance)

### [Step 5 - Create a Project](/docs/get-started/step-by-step/create-a-project)

### [Step 6 - Change Schema](/docs/get-started/step-by-step/change-schema)

### [Step 7 - Query Data](/docs/get-started/step-by-step/query-data)

## [Connect Your Database](/docs/get-started/instance)

## [Terraform Provider](/docs/get-started/terraform)

---

## Database CI/CD

### [Overview](/docs/change-database/change-workflow)

### Change

#### [Batch Change](/docs/change-database/batch-change)

#### [Schema Sync](/docs/change-database/synchronize-schema)

#### [Changelist](/docs/changelist)

#### [Stored Procedure](/docs/change-database/stored-procedure)

#### [Schema Editor](/docs/change-database/schema-editor)

#### [Schema Diagram](/docs/change-database/schema-diagram)

#### [Online Schema Migration](/docs/change-database/online-schema-migration-for-mysql)

#### [Secret Variable](/docs/change-database/secret)

### Review

#### [Overview](/docs/sql-review/overview)

#### [Review Policy](/docs/sql-review/review-policy)

#### [Review Rules](/docs/sql-review/review-rules)

#### [UI Integration](/docs/sql-review/ui)

#### [CI Integration](/docs/sql-review/gitops-ci)

#### [API](/docs/sql-review/api)

### Approve

#### [Custom Approval](/docs/administration/custom-approval)

### Roll out

#### [Rollout Policy](/docs/administration/environment-policy/rollout-policy)

### Roll back

#### [Data Rollback](/docs/change-database/rollback-data-changes)

#### [Schema Rollback](/docs/change-database/rollback-schema-changes)

### Version

#### [Change History](/docs/change-database/change-history)

### Monitor

#### [Schema Drift Detection](/docs/change-database/drift-detection)

#### Slow Query

##### [Overview](/docs/slow-query/overview)

##### [Enable Slow Query Log for MySQL](/docs/slow-query/enable-slow-query-log-for-mysql)

##### [Enable pg_stat_statements for PostgreSQL](/docs/slow-query/enable-pg-stat-statements-for-postgresql)

##### [Turn on Slow Query Report in Bytebase](/docs/slow-query/slow-query-report)

##### [Weekly Email Report](/docs/slow-query/email-report)

##### [Index Advisor](/docs/slow-query/index-advisor)

### Settings

#### [Webhook](/docs/change-database/webhook)

#### [Risk Center](/docs/administration/risk-center)

#### [Issue](/docs/change-database/issue)

#### [Schema Template](/docs/administration/schema-template)

### [Troubleshoot 🐞](/docs/change-database/troubleshoot)

## GitOps

### [Overview](/docs/vcs-integration/overview)

### [Release](/docs/vcs-integration/release)

## SQL Editor

### [Overview](/docs/sql-editor/overview)

### [Query](/docs/sql-editor/run-queries)

### [Admin Mode](/docs/sql-editor/admin-mode)

### [Data Masking](/docs/sql-editor/mask-data)

### [Manage SQL Scripts](/docs/sql-editor/manage-sql-scripts)

### [Explore Schema](/docs/sql-editor/explore-schema)

### [AI Assistant](/docs/sql-editor/ai-assistant)

## Database Permission

### [Overview](/docs/security/database-permission/overview)

### [Query](/docs/security/database-permission/query)

### [Export](/docs/security/database-permission/export)

### [EXPLAIN](/docs/security/database-permission/explain)

## Dynamic Data Masking

### [Overview](/docs/security/data-masking/overview)

### [Semantic Types](/docs/security/data-masking/semantic-types)

#### [Masking Algorithm](/docs/security/data-masking/masking-algorithm)

### [Global Masking Rule](/docs/security/data-masking/global-masking-rule)

#### [Data Classification](/docs/security/data-masking/data-classification)

### [Column Masking](/docs/security/data-masking/column-masking)

### [Masking Exemption](/docs/security/data-masking/access-unmasked-data)

---

## Security Admin 🔐

### [Single Sign-On](/docs/administration/sso/overview)

#### [OAuth 2.0](/docs/administration/sso/oauth2)

#### [OpenID Connect (OIDC)](/docs/administration/sso/oidc)

#### [LDAP](/docs/administration/sso/ldap)

### [Roles and Permissions](/docs/concepts/roles-and-permissions)

### [User Groups](/docs/administration/user-groups)

### [Custom Roles](/docs/administration/custom-roles)

### [Audit Log](/docs/security/audit-log)

### [SCIM](/docs/administration/scim/overview)

### [2FA](/docs/administration/2fa)

### [Password Restriction](/docs/administration/password)

### [Sign-in Restriction](/docs/administration/sign-in-restriction)

### [Watermark](/docs/security/watermark)

## General Admin ⚙️

### [Manage License](/docs/administration/license)

### [Production Setup](/docs/administration/production-setup)

### [Back up Data](/docs/administration/back-up-data)

### [Database Change Mode](/docs/administration/mode)

### [AI Assistant](/docs/ai-assistant)

### [Database Instance](/docs/administration/instance)

### [Environment Policy](/docs/administration/environment-policy/overview)

### [Customize Logo](/docs/administration/customize-logo)

### [Announcement](/docs/administration/announcement)

### [SMTP and Email Delivery](/docs/administration/mail-delivery)

### [Archive](/docs/administration/archive)

## API

### [Overview](/docs/api/overview)

### [Authentication](/docs/api/authentication)

### [SQL Review](/docs/api/sql-review)

### [Issue](/docs/api/issue)

### [SQL Editor](/docs/api/sql-editor)

### [Permission](/docs/api/permission)

### [Data Classification](/docs/api/data-classification)

### [Audit Log](/docs/api/audit-log)

## Integrations

### [Terraform](/docs/get-started/terraform)

### [Slack](/docs/how-to/integrations/slack)

### [Jira](/docs/how-to/integrations/jira)

### [Supabase](/docs/how-to/integrations/supabase)

### [Render](/docs/how-to/integrations/render)

### [Neon](/docs/how-to/integrations/neon)

## Reference

### [Server Startup Options](/docs/reference/command-line)

### [Error Code for Bytebase Core](/docs/reference/error-code/core)

### [Error Code for SQL Advisor](/docs/reference/error-code/advisor)

### [Schema Definition Language](/docs/reference/schema-definition-language)

### Postgres

#### [How to Fix Permission denied for table](/docs/how-to/postgres/permission-denied-for-table-postgres)

#### [How to Fix Must be owner of table](/docs/how-to/postgres/must-be-owner-of-table-postgres)

### ClickHouse

#### [How to Create a Database](/docs/how-to/clickhouse/how-to-create-a-database-clickhouse)

#### [How to Create a Table](/docs/how-to/clickhouse/how-to-create-a-table-clickhouse)

#### [How to List Tables from a Database](/docs/how-to/clickhouse/how-to-list-tables-from-a-database-clickhouse)

#### [How to Rename a Table](/docs/how-to/clickhouse/how-to-rename-a-table-clickhouse)
