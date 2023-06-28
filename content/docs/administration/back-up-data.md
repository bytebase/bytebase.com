---
title: Back up Data
---

Bytebase manages its own data under the [--data](/docs/reference/command-line#--data-directory) directory. The data includes:

- Metadata when [--pg](/docs/reference/command-line#--pg-string) is not specified.
- Database backups when [cloud backup flags](/docs/reference/command-line#--backup-bucket-bucket) is not specified.

<HintBlock type="info">

You should periodically back up the entire [--data](/docs/reference/command-line#--data-directory) directory if any data is stored there.

If Bytebase is running and not in the [readonly](/docs/reference/command-line#--readonly) mode, and you want to take the backup, then the underlying data volume must support snapshot feature where the entire directory can take a snapshot at the same time, otherwise it may produce a corrupted backup bundle.

</HintBlock>

## Embedded PostgreSQL Metadata

By default, Bytebase bundles an embedded PostgreSQL instance for storing its own metadata. The metadata is stored under the `--data` directory. You can back up the `--data` direcotry or the `pgdata` subfolder.

## External PostgreSQL Metadata

If [--pg](/docs/reference/command-line#--pg-string) is specified, the metadata will be stored in the specified external PostgreSQL database. Below shows how to back up and restore the Bytebase metadata, let's assume the metadata is stored in `metadb`.

### Back up the metadata

```bash
pg_dump -h <<host>> -p <<port>> -U <<user>> -d metadb > metadb.sql
```

### Restore Option 1 - Restore to the same `metadb`

#### Step 1 - Restore metadata to a temporary db

Create a new db `metadb_new`:

```bash
psql -h <<host>> -p <<port>> -U <<user>> metadb -c "CREATE DATABASE metadb_new"
```

Restore metdata to the new db:

```bash
psql -h <<host>> -p <<port>> -U <<user>> metadb_new < metadb.sql
```

#### Step 2 - Swap the existing metadata db with the temporary db

<HintBlock type="info">

You need to first stop Bytebase otherwise its connection to the metadata db will prevent renaming the database.

Also, you can not rename the connecting database so you need to connect to the PostgreSQL instance using a different database like `postgres`.

</HintBlock>

Rename existing `metadb` to `metadb_old`:

```bash
psql -h <<host>> -p <<port>> -U <<user>> postgres -c "ALTER DATABASE metadb RENAME TO metadb_old"
```

Rename `metadb_new` to the `metadb`, which will serve as the new metadata db:

```bash
psql -h <<host>> -p <<port>> -U <<user>> postgres -c "ALTER DATABASE metadb_new RENAME TO metadb"
```

#### Step 3 - Drop the old metadata db

Restart Bytebase and verify the metadata is restored properly. Afterwards, you can drop the old database:

```bash
psql -h <<host>> -p <<port>> -U <<user>> postgres -c "DROP DATABASE metadb_old"
```

### Restore Option 2 - Restore to a different database `metadb2`

#### Step 1 - Modify the dump file

The dump file records the Bytebase metadata schema change history, and it's database specific. So we
need to change the existing record value from `metadb` to `metadb2` first, which means to transfer
the change history to `metadb2`.

Locate the `migration_history` table in the dump file, and for each record, find the value `metadb`
which corresponds to the `namespace` column, change each occurrence from `metadb` to `metadb2`.

![change-migration-history](/content/docs/administration/back-up-data/change-migration-history.webp)

#### Step 2 - Restore metadata to `metadb2`

Create a new db `metadb2`:

```bash
psql -h <<host>> -p <<port>> -U <<user>> metadb -c "CREATE DATABASE metadb2"
```

Restore metdata to the new db:

```bash
psql -h <<host>> -p <<port>> -U <<user>> metadb2 < metadb.sql
```

#### Step 3 - Drop the old metadata db

Restart Bytebase and verify the metadata is restored properly. Afterwards, you can drop the old database:

```bash
psql -h <<host>> -p <<port>> -U <<user>> postgres -c "DROP DATABASE metadb"
```

## Database Backup

Bytebase allows users to take database [backups](/docs/disaster-recovery/backup).

- Local backup: `backup` directory will be put under the `--data` directory.

- [Cloud backup](/docs/disaster-recovery//backup/#cloud-storage): If Bytebase starts with
  [cloud backup flags](/docs/reference/command-line#--backup-bucket-bucket), then the backup will be
  stored in the corresponding cloud storage.
