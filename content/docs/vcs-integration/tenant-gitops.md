---
title: Batch Change Tenant Databases
---

<EnterpriseOnlyBlock />

To practice GitOps with [tenant databases](/docs/change-database/batch-change/multi-tenant-change), you need to enable the [VCS Integration](/docs/vcs-integration/overview) for your selected project, then use the VCS repository instead of our UI to organize and propose schema and data changes.

## Migration scripts

Migration scripts are stored in the VCS repository for a GitOps-enabled tenant project, and use the file path to provide important migration information, including environment, database, version, type, and description. These information are captured through the [**File path template**](/docs/vcs-integration/name-and-organize-schema-files#file-path-template).

### Use SQL files

Typically, SQL files are used as migration scripts for both schema (DDL) and data (DML) changes.

For example, to add a new table for all databases in the project, you can use the default **File path template** (`{{VERSION}}##{{TYPE}}##{{DESCRIPTION}}.sql`), the file path of the SQL file would look like `bytebase/0001##ddl##add-company-table.sql` with the following content:

```sql
CREATE TABLE company (
  id INT PRIMARY KEY     NOT NULL,
  name           TEXT    NOT NULL,
  address        CHAR(50)
);
```

Where `bytebase/` is the **Base directory**, depending on [your configuration](/docs/vcs-integration/enable-gitops-workflow#step-3---configure-deploy).

### Use YAML manifest

<HintBlock type="warning">

1. This feature is currently experimental, behaviors are subject to change, please only use with guidance from our technical support.
1. The **File path template** must use `.sql` as the file extension for migration scripts, both SQL files and YAML manifest share the same setting of the **File path template**.
1. Only data change (DML) is supported.

</HintBlock>

Using SQL files as migration scripts has the limitation of only being able to target a single database, to make a data change across an arbitrary set of databases.

A YAML manifest follows the same file path convention as defined by the **File path template** but using `.yml` instead of `.sql` as the file extension:

```diff
-bytebase/0003##dml##insert-companies.sql
+bytebase/0003##dml##insert-companies.yml
```

Below is the file content for inserting a new row to the database `supermarket`:

```yml
databases:
  - name: supermarket
statement: |
  INSERT INTO company (id, name, address) VALUES (1, 'Bytebase', '1 DevOps street');
```

Both SQL files and YAML manifests can co-exist and be used on per-migration basis depending on your needs. After several migrations, your VCS repository for storing migration scripts could look like follows:

```bash
bytebase/0001##ddl##add-company-table.sql
bytebase/0002##ddl##add-payout-table.sql
bytebase/0003##dml##insert-companies.yml
bytebase/0003##ddl##insert-payouts.sql
```

To target multiple databases, add more entries to the `databases` section:

```yml
databases:
  - name: supermarket
  - name: supermarket_east
  - name: supermarket_west
statement: |
  INSERT INTO company (id, name, address) VALUES (1, 'Bytebase', '1 DevOps street');
```
