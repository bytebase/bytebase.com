---
title: Supported Databases
description: The Bytebase supported databases and corresponding feature matrix
---

Bytebase officially supports the following major versions for each supported database engine:

#### RDBMS

- MySQL, Aurora MySQL - 5.7 and above
- PostgreSQL, Aurora PostgreSQL, AlloyDB - 12.0 and above
- Oracle - 11g and above
- Microsoft SQL Server - 2019 and above
- MariaDB - 10.7 and above
- TiDB - 5.0 and above
- OceanBase - 3.x and above, both MySQL and Oracle modes
- CockroachDB - 24.1 and above, PostgreSQL compatible syntax supported only
- Spanner

#### NoSQL

- MongoDB - 4.0 and above
- Redis - 6.0 and above
- DocumentDB
- DynamoDB

#### Data Warehouse

- Snowflake
- BigQuery
- Redshift
- Hive
- ClickHouse - 21.0 and above
- Databricks
- StarRocks

#### Others

- Elasticsearch
- RisingWave - 1.x and above

Bytebase usually works fine with older database versions, we just won't support features specific to those older versions. We may add other open source databases in the future.

## Feature Matrix

### Change Workflow

| Feature     | [UI Workflow](/docs/concepts/database-change-workflow/#ui-workflow) | [GitOps Workflow](/docs/concepts/database-change-workflow/#gitops-workflow) | [Changelist](/docs/changelist) | [Batch Change](/docs/change-database/batch-change) | [SQL Lint](/docs/sql-review/review-policy) | [Data Rollback\*](/docs/change-database/rollback-data-changes) |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| MySQL       | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         | ✔️                                                             |
| PostgreSQL  | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         | ✔️                                                             |
| Oracle      | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         | ✔️                                                             |
| SQL Server  | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         | ✔️                                                             |
| MongoDB     | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |                                                                |
| Redis       | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |                                                                |
| TiDB        | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |                                                                |
| ClickHouse  | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |                                                                |
| Snowflake   | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |                                                                |
| Redshift    | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |                                                                |
| Spanner     | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |                                                                |
| MariaDB     | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |                                                                |
| OceanBase   | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |                                                                |
| RisingWave  | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |                                                                |
| CockroachDB | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |                                                                |

_\* Data Rollback supports `UPDATE` and `DELETE` statements._

### SQL Editor

| Feature     | [Sheet Management](/docs/sql-editor/manage-sql-scripts) | [Query Mode](/docs/sql-editor/run-queries) | [Admin Mode](/docs/sql-editor/admin-mode) | [Batch Mode](/docs/sql-editor/run-queries/#batch-mode) | [AI Assistant](/docs/sql-editor/ai-assistant) |
| ----------- | ------------------------------------------------------- | ------------------------------------------ | ----------------------------------------- | ------------------------------------------------------ | --------------------------------------------- |
| MySQL       | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| PostgreSQL  | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| Oracle      | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| SQL Server  | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| MongoDB     | ✔️                                                      | ✔️ \*                                      | ✔️                                        | ✔️                                                     | ✔️                                            |
| Redis       | ✔️                                                      | ✔️ \*                                      | ✔️                                        | ✔️                                                     | ✔️                                            |
| TiDB        | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| ClickHouse  | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| Snowflake   | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| Redshift    | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| Spanner     | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| MariaDB     | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| OceanBase   | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| RisingWave  | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |
| CockroachDB | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                                     | ✔️                                            |

_\* Normally, Bytebase will block non-readonly statements in Query Mode. This is not supported in MongoDB and Redis. You can
work around this by configuring a [readonly connection](/docs/get-started/instance/#configure-read-only-connection)._

### Data Security & Compliance

| Feature     | [RBAC](/docs/concepts/roles-and-permissions) | [Audit Log](/docs/security/audit-log) | [External Secret Manager](/docs/get-started/instance/#use-secret-manager) | [Query and Export Control](/docs/security/data-query/) | [Data Masking](/docs/security/mask-data) |
| ----------- | -------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------- |
| MySQL       | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| PostgreSQL  | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| Oracle      | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| SQL Server  | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| MongoDB     | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Redis       | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| TiDB        | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| ClickHouse  | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Snowflake   | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Redshift    | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Spanner     | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| MariaDB     | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| OceanBase   | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| RisingWave  | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| CockroachDB | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |

### Anomaly Detection

| Feature     | Connection Failure | [Drift Detection](/docs/change-database/drift-detection) | [Slow Query](/docs/slow-query/overview/) |
| ----------- | ------------------ | -------------------------------------------------------- | ---------------------------------------- |
| MySQL       | ✔️                 | ✔️                                                       | ✔️                                       |
| PostgreSQL  | ✔️                 | ✔️                                                       | ✔️                                       |
| Oracle      | ✔️                 | ✔️                                                       |                                          |
| SQL Server  | ✔️                 | ✔️                                                       |                                          |
| MongoDB     | ✔️                 |                                                          |                                          |
| Redis       | ✔️                 |                                                          |                                          |
| TiDB        | ✔️                 | ✔️                                                       |                                          |
| ClickHouse  | ✔️                 | ✔️                                                       |                                          |
| Snowflake   | ✔️                 | ✔️                                                       |                                          |
| Redshift    | ✔️                 | ✔️                                                       |                                          |
| Spanner     | ✔️                 | ✔️                                                       |                                          |
| MariaDB     | ✔️                 | ✔️                                                       |                                          |
| OceanBase   | ✔️                 | ✔️                                                       |                                          |
| RisingWave  | ✔️                 | ✔️                                                       |                                          |
| CockroachDB | ✔️                 | ✔️                                                       |                                          |

### Advanced Schema Management

_Bytebase is trailblazing the schema management landscape. Each database engine requires non-trivial investment. If you are looking for a feature not supported in your database, please [contact us](/docs/faq/#how-to-reach-us)._

| Feature     | [Schema Synchronization](/docs/change-database/synchronize-schema) | [Schema Editor](/docs/change-database/schema-editor) | [Online Schema Change](/docs/change-database/online-schema-migration-for-mysql) |
| ----------- | ------------------------------------------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| MySQL       | ✔️                                                                 | ✔️                                                   | ✔️                                                                              |
| PostgreSQL  | ✔️                                                                 | ✔️                                                   |                                                                                 |
| Oracle      | ✔️                                                                 |                                                      |                                                                                 |
| SQL Server  |                                                                    |                                                      |                                                                                 |
| MongoDB     |                                                                    |                                                      |                                                                                 |
| Redis       |                                                                    |                                                      |
| TiDB        | ✔️                                                                 | ✔️                                                   |                                                                                 |
| ClickHouse  |                                                                    |                                                      |                                                                                 |
| Snowflake   |                                                                    |                                                      |                                                                                 |
| Redshift    |                                                                    |                                                      |                                                                                 |
| Spanner     |                                                                    |                                                      |                                                                                 |
| MariaDB     |                                                                    |                                                      |                                                                                 |
| OceanBase   |                                                                    |                                                      |                                                                                 |
| RisingWave  |                                                                    |                                                      |                                                                                 |
| CockroachDB |                                                                    |                                                      |                                                                                 |
