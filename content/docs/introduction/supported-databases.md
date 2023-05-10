---
title: Supported Databases
description: The Bytebase supported databases and corresponding feature matrix
---

Bytebase officially supports the following major versions for each supported database engine:

- MySQL - 5.7 and 8.0
- PostgreSQL - 12.0, 13.0, 14.0
- TiDB - 5.0
- ClickHouse - 21.0
- Snowflake
- MongoDB - 4.0, 5.0, 6.0
- Spanner
- Redis - 6.0, 6.2, 7.0
- Oracle - 21c at least
- Microsoft SQL Server - 2019 at least
- MariaDB - 10.7 at least
- OceanBase - 3.x and 4.x, MySQL tenant

Bytebase usually works fine with older database versions, we just won't support features specific to those older versions. We may add other open source databases in the future.

## Feature Matrix

### Change Management

|                                                                         Feature | MySQL | PostgreSQL | TiDB | ClickHouse | Snowflake | MongoDB | Spanner | Redis | Oracle | SQL Server | MariaDB  | OceanBase  |
| ------------------------------------------------------------------------------: | :---: | :--------: | :--: | :--------: | :-------: | :-----: | :-----: | :---: | :----: | :--------: | :------: | :--------: |
|            [UI Change Workflow](/docs/change-database/change-workflow/overview) |  ✔️    |     ✔️      |  ✔️   |     ✔️      |     ✔️     |    ✔️    |   ✔️     |  ✔️    |    ✔️   |     ✔️      |     ✔️    |       ✔️    |
|                        [GitOps Change Workflow](/docs/vcs-integration/overview) |  ✔️    |     ✔️      |  ✔️   |     ✔️      |     ✔️     |    ✔️    |   ✔️     |  ✔️    |    ✔️   |     ✔️      |     ✔️    |       ✔️    |
|                       [Tenant Database Management](/docs/batch-change/overview) |  ✔️    |     ✔️      |  ✔️   |     ✔️      |     ✔️     |    ✔️    |   ✔️     |  ✔️    |    ✔️   |     ✔️      |     ✔️    |       ✔️    |
|                    [Migration History](/docs/change-database/migration-history) |  ✔️    |     ✔️      |  ✔️   |     ✔️      |     ✔️     |    ✔️    |   ✔️     |  ✔️    |    ✔️   |     ✔️      |     ✔️    |       ✔️    |
|          [SQL Review Policy and Rules](/docs/sql-review/review-policy/overview) |  ✔️    |     ✔️      |  ✔️   |            |           |         |         |       |        |            |          |            |
|              [Schema Synchronization](/docs/change-database/synchronize-schema) |  ✔️    |     ✔️      |      |            |           |         |         |       |        |            |          |            |
|                            [Schema Editor](/docs/change-database/schema-editor) |  ✔️    |            |      |            |           |         |         |       |        |            |          |            |
|   [State-based Migration](/docs/change-database/state-based-migration/overview) |  ✔️    |            |      |            |           |         |         |       |        |            |          |            |
| [Rollback Data Changes](/docs/change-database/rollback-data-changes)            |  ✔️    |            |      |            |           |         |         |       |        |            |          |            |
| [Online Schema Change](/docs/change-database/online-schema-migration-for-mysql) |  ✔️    |            |      |            |           |         |         |       |        |            |          |            |

### SQL Editor

|                                                 Feature | MySQL | PostgreSQL | TiDB | ClickHouse | Snowflake | MongoDB | Spanner | Redis | Oracle | SQL Server | MariaDB  | OceanBase  |
| ------------------------------------------------------: | :---: | :--------: | :--: | :--------: | :-------: | :-----: | :-----: | :---: | :----: | :--------: | :------: | :--------: |
|          [Read-only Mode](/docs/sql-editor/run-queries) |  ✔️    |     ✔️      |  ✔️   |     ✔️      |    ✔️      |         |   ✔️     |       |    ✔️   |       ✔️    |    ✔️     |      ✔️     |
|               [Admin Mode](/docs/sql-editor/admin-mode) |  ✔️    |     ✔️      |  ✔️   |     ✔️      |    ✔️      |   ✔️     |   ✔️     |   ✔️   |    ✔️   |       ✔️    |    ✔️     |      ✔️     |
| [Sheet Management](/docs/sql-editor/manage-sql-scripts) |  ✔️    |     ✔️      |  ✔️   |     ✔️      |    ✔️      |   ✔️     |   ✔️     |   ✔️   |    ✔️   |       ✔️    |    ✔️     |      ✔️     |

### Security

|                                                                 Feature | MySQL | PostgreSQL | TiDB | ClickHouse | Snowflake | MongoDB | Spanner | Redis | Oracle | SQL Server | MariaDB  | OceanBase  |
| ----------------------------------------------------------------------: | :---: | :--------: | :--: | :--------: | :-------: | :-----: | :-----: | :---: | :----: | :--------: | :------: | :--------: |
|                            [RBAC](/docs/concepts/roles-and-permissions) |  ✔️    |     ✔️      |   ✔️  |      ✔️     |     ✔️     |    ✔️    |    ✔️    |   ✔️   |    ✔️   |       ✔️    |    ✔️     |      ✔️     |
| [Database Access Control](/docs/administration/database-access-control) |  ✔️    |     ✔️      |   ✔️  |      ✔️     |     ✔️     |    ✔️    |    ✔️    |   ✔️   |    ✔️   |       ✔️    |    ✔️     |      ✔️     |
|                             [Audit Log](/docs/administration/audit-log) |  ✔️    |     ✔️      |   ✔️  |      ✔️     |     ✔️     |    ✔️    |    ✔️    |   ✔️   |    ✔️   |       ✔️    |    ✔️     |      ✔️     |
|               [Data Anonymization](/docs/administration/anonymize-data) |  ✔️    |            |      |            |           |         |         |       |        |            |          |            |

### Disaster Recovery

|                                                                                   Feature | MySQL | PostgreSQL | TiDB | ClickHouse | Snowflake | MongoDB | Spanner | Redis | Oracle | SQL Server | MariaDB  | OceanBase  |
| ----------------------------------------------------------------------------------------: | :---: | :--------: | :--: | :--------: | :-------: | :-----: | :-----: | :---: | :----: | :--------: | :------: | :--------: |
|      [Local Backup and Restore](/docs/disaster-recovery/backup-restore-database/overview) |   ✔️   |      ✔️     |   ✔️  |      ✔️     |     ✔️     |         |         |       |        |            |          |            |
|              [Cloud Backup](/docs/disaster-recovery/backup-restore-database/cloud-backup) |   ✔️   |      ✔️     |   ✔️  |      ✔️     |     ✔️     |         |         |       |        |            |          |            |
| [Point-in-time Recovery (PITR)](/docs/disaster-recovery/point-in-time-recovery-for-mysql) |   ✔️   |            |      |            |           |         |         |       |        |            |          |            |

### Anomaly Detection

|                                                                                   Feature | MySQL | PostgreSQL | TiDB | ClickHouse | Snowflake | MongoDB | Spanner | Redis | Oracle | SQL Server | MariaDB  | OceanBase  |
| ----------------------------------------------------------------------------------------: | :---: | :--------: | :--: | :--------: | :-------: | :-----: | :-----: | :---: | :----: | :--------: | :------: | :--------: |
|                                                               Database Connection Failure |   ✔️   |      ✔️     |   ✔️  |      ✔️     |     ✔️     |    ✔️    |    ✔️    |   ✔️   |   ✔️    |     ✔️      |     ✔️    |      ✔️     |
|                                [Drift Detection](/docs/anomaly-detection/drift-detection) |   ✔️   |      ✔️     |   ✔️  |      ✔️     |     ✔️     |         |    ✔️    |       |        |            |          |            |
| [Backup Policy Violation](/docs/administration/environment-policy/backup-schedule-policy) |   ✔️   |      ✔️     |   ✔️  |      ✔️     |     ✔️     |         |         |       |        |            |          |            |
|                  [Backup Missing](/docs/disaster-recovery/backup-restore-database/backup) |   ✔️   |      ✔️     |   ✔️  |      ✔️     |     ✔️     |         |         |       |        |            |          |            |
