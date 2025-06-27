---
title: 'How to fix pg_restore "input file appears to be a text format dump. please use psql"'
---

## Error Message

```bash
pg_restore: error: input file appears to be a text format dump. Please use psql.
```

## Description

This error occurs because you're trying to use `pg_restore` on a plain text SQL dump file, but `pg_restore` only works with binary or directory format dumps created with specific pg_dump flags.

## Dump Format Compatibility

- **Text format** (`.sql`): Use `psql` to restore
- **Custom format** (`-Fc`): Use `pg_restore` to restore
- **Directory format** (`-Fd`): Use `pg_restore` to restore
- **Tar format** (`-Ft`): Use `pg_restore` to restore

## Solutions

1. **Use psql instead of pg_restore**:

   ```bash
   psql -U username -d database_name -f dump_file.sql
   ```

2. **For compressed dumps**, decompress and pipe to psql:

   ```bash
   gunzip -c dump_file.sql.gz | psql -U username -d database_name
   ```

3. **Create future dumps in custom format** for pg_restore compatibility:

   ```bash
   # Create dump in custom format
   pg_dump -Fc -d source_database > backup.dump

   # Restore using pg_restore
   pg_restore -d target_database backup.dump
   ```

## Prevention

- Use `pg_dump -Fc` for dumps that need pg_restore functionality
- Use consistent naming conventions (`.sql` for text, `.dump` for custom format)
- Document backup format requirements in your procedures
