---
title: 'How to fix pg_dump "aborting because of server version mismatch"'
---

## Error Message

```bash
pg_dump: server version: 15.1; pg_dump version: 14.5
pg_dump: aborting because of server version mismatch
```

## Description

This error occurs when the version of pg_dump client tool doesn't match the PostgreSQL server version you're trying to back up. PostgreSQL requires pg_dump to be the same version or newer than the target server.

## Version Compatibility Rules

- **Newer pg_dump with older server**: Works fine
- **Older pg_dump with newer server**: Will fail
- **Same versions**: Recommended for best compatibility

## Solutions

1. **Check versions**:

   ```bash
   # Check server version
   psql -c "SELECT version();"

   # Check pg_dump version
   pg_dump --version
   ```

2. **Install matching PostgreSQL client tools**:

   ```bash
   # Debian/Ubuntu
   sudo apt-get install postgresql-client-15

   # RHEL/CentOS
   sudo yum install postgresql15
   ```

3. **Use full path to correct version**:

   ```bash
   # Find correct pg_dump binary
   find /usr -name "pg_dump" | grep postgres

   # Use full path
   /usr/lib/postgresql/15/bin/pg_dump -h hostname -U username -d dbname > backup.sql
   ```

4. **Use Docker with matching version**:

   ```bash
   docker run --rm -v "$PWD":/backup postgres:15 pg_dump -h host -U username -d dbname > backup.sql
   ```

## Prevention

- Use package managers that maintain version consistency
- Document PostgreSQL versions in your infrastructure
- Consider using containerized backup solutions for version isolation
