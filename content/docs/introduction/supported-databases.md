---
title: Supported Databases
description: The Bytebase supported databases and corresponding feature matrix
---

Bytebase officially supports the following major versions for each supported database engine:

- MySQL, Aurora MySQL - 5.7 and above
- PostgreSQL, Aurora PostgreSQL, AlloyDB - 12.0 and above
- TiDB - 5.0 and above
- ClickHouse - 21.0 and above
- Snowflake
- Redshift
- MongoDB - 4.0 and above
- Spanner
- Redis - 6.0 and above
- Oracle - 11g and above
- Microsoft SQL Server - 2019 and above
- MariaDB - 10.7 and above
- OceanBase - 3.x and above, MySQL tenant
- RisingWave - 1.x and above

Bytebase usually works fine with older database versions, we just won't support features specific to those older versions. We may add other open source databases in the future.

## Feature Matrix

### Change Workflow

| Feature    | [UI Workflow](/docs/concepts/database-change-workflow/#ui-workflow) | [GitOps Workflow](/docs/concepts/database-change-workflow/#gitops-workflow) | [Changelist](/docs/changelist) | [Batch Change](/docs/change-database/batch-change) | [SQL Lint](/docs/sql-review/review-policy) |
| ---------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------- | ------------------------------------------ |
| MySQL      | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |
| PostgreSQL | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |
| TiDB       | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |
| ClickHouse | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |
| Snowflake  | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |
| Redshift   | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |
| MongoDB    | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |
| Spanner    | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |
| Redis      | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |
| Oracle     | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |
| SQL Server | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |
| MariaDB    | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |
| OceanBase  | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 | ✔️                                         |
| RisingWave | ✔️                                                                  | ✔️                                                                          | ✔️                             | ✔️                                                 |                                            |

### Advanced Schema Management

_Bytebase is trailblazing the schema management landscape. Each database engine requires non-trivial investment. If you are looking for a feature not supported in your database, please [contact us](/docs/faq/#how-to-reach-us)._

| Feature    | [Branching](/docs/branching) | [Schema Synchronization](/docs/change-database/synchronize-schema) | [State-based Migration](/docs/change-database/state-based-migration) | [Schema Editor](/docs/change-database/schema-editor) | [Online Schema Change](/docs/change-database/online-schema-migration-for-mysql) |
| ---------- | ---------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| MySQL      | ✔️                           | ✔️                                                                 | ✔️                                                                   | ✔️                                                   | ✔️                                                                              |
| PostgreSQL | ✔️                           | ✔️                                                                 | ✔️                                                                   | ✔️                                                   |                                                                                 |
| TiDB       | ✔️                           | ✔️                                                                 | ✔️                                                                   | ✔️                                                   |                                                                                 |
| ClickHouse |                              |                                                                    |                                                                      |                                                      |
| Snowflake  |                              |                                                                    |                                                                      |                                                      |
| Redshift   |                              |                                                                    |                                                                      |                                                      |
| MongoDB    |                              |                                                                    |                                                                      |                                                      |
| Spanner    |                              |                                                                    |                                                                      |                                                      |
| Redis      |                              |                                                                    |                                                                      |                                                      |
| Oracle     |                              |                                                                    |                                                                      |                                                      |
| SQL Server |                              |                                                                    |                                                                      |                                                      |
| MariaDB    |                              |                                                                    |                                                                      |                                                      |
| OceanBase  |                              |                                                                    |                                                                      |                                                      |
| RisingWave |                              |                                                                    |                                                                      |                                                      |

### SQL Editor

| Feature    | [Sheet Management](/docs/sql-editor/manage-sql-scripts) | [Query Mode](/docs/sql-editor/run-queries) | [Admin Mode](/docs/sql-editor/admin-mode) | [Batch Query](/docs/sql-editor/batch-query) | [ChatSQL](/docs/sql-editor/chatsql) |
| ---------- | ------------------------------------------------------- | ------------------------------------------ | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| MySQL      | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| PostgreSQL | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| TiDB       | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| ClickHouse | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| Snowflake  | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| Redshift   | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| MongoDB    | ✔️                                                      |                                            | ✔️                                        | ✔️                                          | ✔️                                  |
| Spanner    | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| Redis      | ✔️                                                      |                                            | ✔️                                        | ✔️                                          | ✔️                                  |
| Oracle     | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| SQL Server | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| MariaDB    | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| OceanBase  | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |
| RisingWave | ✔️                                                      | ✔️                                         | ✔️                                        | ✔️                                          | ✔️                                  |

### Data Security & Governance

| Feature    | [RBAC](/docs/concepts/roles-and-permissions) | [Audit Log](/docs/security/audit-log) | [External Secret Manager](/docs/get-started/instance/#use-secret-manager) | [Query and Export Control](/docs/security/data-query/) | [Data Masking](/docs/security/mask-data) |
| ---------- | -------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------- |
| MySQL      | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| PostgreSQL | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| TiDB       | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| ClickHouse | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Snowflake  | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Redshift   | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| MongoDB    | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Spanner    | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Redis      | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |
| Oracle     | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| SQL Server | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| MariaDB    | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| OceanBase  | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     | ✔️                                       |
| RisingWave | ✔️                                           | ✔️                                    | ✔️                                                                        | ✔️                                                     |                                          |

### Disaster Recovery

| Feature    | [Local Backup and Restore](/docs/disaster-recovery/backup) | [Cloud Backup](/docs/disaster-recovery/backup/#cloud-storage) | [Data Change Rollback](/docs/change-database/rollback-data-changes) | [Point-in-time Recovery (PITR)](/docs/disaster-recovery/point-in-time-recovery-for-mysql) |
| ---------- | ---------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| MySQL      | ✔️                                                         | ✔️                                                            | ✔️                                                                  | ✔️                                                                                        |
| PostgreSQL | ✔️                                                         | ✔️                                                            |                                                                     |                                                                                           |
| TiDB       | ✔️                                                         | ✔️                                                            |                                                                     |                                                                                           |
| ClickHouse |                                                            |                                                               |                                                                     |                                                                                           |
| Snowflake  | ✔️                                                         | ✔️                                                            |                                                                     |                                                                                           |
| Redshift   | ✔️                                                         | ✔️                                                            |                                                                     |                                                                                           |
| MongoDB    |                                                            |                                                               |                                                                     |                                                                                           |
| Spanner    |                                                            |                                                               |                                                                     |                                                                                           |
| Redis      |                                                            |                                                               |                                                                     |                                                                                           |
| Oracle     |                                                            |                                                               |                                                                     |                                                                                           |
| SQL Server |                                                            |                                                               |                                                                     |                                                                                           |
| MariaDB    | ✔️                                                         | ✔️                                                            |                                                                     |                                                                                           |
| OceanBase  |                                                            |                                                               |                                                                     |                                                                                           |
| RisingWave |                                                            |                                                               |                                                                     |                                                                                           |

### Anomaly Detection

| Feature    | Connection Failure | [Drift Detection](/docs/change-database/drift-detection) | [Backup Policy Violation](/docs/administration/environment-policy/backup-schedule-policy) | [Backup Missing](/docs/disaster-recovery/backup) | [Slow Query](/docs/slow-query/overview/) |
| ---------- | ------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------- |
| MySQL      | ✔️                 | ✔️                                                       | ✔️                                                                                        | ✔️                                               | ✔️                                       |
| PostgreSQL | ✔️                 | ✔️                                                       | ✔️                                                                                        | ✔️                                               | ✔️                                       |
| TiDB       | ✔️                 | ✔️                                                       | ✔️                                                                                        | ✔️                                               |                                          |
| ClickHouse | ✔️                 | ✔️                                                       |                                                                                           |                                                  |                                          |
| Snowflake  | ✔️                 | ✔️                                                       | ✔️                                                                                        | ✔️                                               |                                          |
| Redshift   | ✔️                 | ✔️                                                       | ✔️                                                                                        | ✔️                                               |                                          |
| MongoDB    | ✔️                 |                                                          |                                                                                           |                                                  |                                          |
| Spanner    | ✔️                 | ✔️                                                       |                                                                                           |                                                  |                                          |
| Redis      | ✔️                 |                                                          |                                                                                           |                                                  |                                          |
| Oracle     | ✔️                 | ✔️                                                       |                                                                                           |                                                  |                                          |
| SQL Server | ✔️                 | ✔️                                                       |                                                                                           |                                                  |                                          |
| MariaDB    | ✔️                 | ✔️                                                       | ✔️                                                                                        | ✔️                                               |                                          |
| OceanBase  | ✔️                 | ✔️                                                       |                                                                                           |                                                  |                                          |
| RisingWave | ✔️                 | ✔️                                                       |                                                                                           |                                                  |                                          |
