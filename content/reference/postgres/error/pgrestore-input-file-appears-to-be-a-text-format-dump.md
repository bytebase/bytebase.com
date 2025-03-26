---
title: 'How to fix pg_restore "input file appears to be a text format dump. please use psql"'
---

This error occurs because you're trying to use `pg_restore` on a plain text SQL dump file, but `pg_restore` only works with binary or directory format dumps.

### Option 1: Use psql instead

```bash
psql -U username -d database_name -f dump_file.sql
```

### Option 2: Check if your dump is compressed

If your file has a .gz extension:

```bash
gunzip -c dump_file.sql.gz | psql -U username -d database_name
```

### Option 3: Create a custom/binary format dump

When creating dumps in the future, use the `-Fc` flag with pg_dump:

```bash
pg_dump -Fc -d source_database > backup.dump
```

Then you can use pg_restore with this file:

```bash
pg_restore -d target_database backup.dump
```
