---
title: 'How to fix pg_dump "aborting because of server version mismatch"'
---

This error occurs when the version of pg_dump client tool doesn't match the PostgreSQL server version you're trying to back up.

## Version Compatibility Rules

- **Newer pg_dump with older server**: Generally works fine. A newer pg_dump can typically back up an older PostgreSQL server.
- **Older pg_dump with newer server**: Will fail. An older pg_dump cannot reliably back up a newer PostgreSQL server.
- **Ideal scenario**: Matching versions provide the most reliable results and prevent potential issues with schema changes.

## Quick Solution Steps

1. Identify PostgreSQL server version
2. Match pg_dump version to server version (same or newer)
3. Execute pg_dump with correct binary

## Detailed Troubleshooting Guide

### 1. Check PostgreSQL Server Version

```bash
psql -c "SELECT version();"
```

Or connect to your database and run:

```sql
SELECT version();
```

### 2. Check pg_dump Version

```bash
pg_dump --version
```

### 3. Fix Version Mismatch

#### Option A: Install Matching PostgreSQL Client Tools

For Debian/Ubuntu:

```bash
sudo apt-get install postgresql-client-X.Y
```

For RHEL/CentOS:

```bash
sudo yum install postgresql-X.Y
```

Replace X.Y with your server version (e.g., 14, 15).

#### Option B: Use Full Path to Correct Version

Locate the correct pg_dump binary:

```bash
find /usr -name "pg_dump" | grep postgres
```

Then use the full path:

```bash
/usr/lib/postgresql/X.Y/bin/pg_dump -h hostname -U username -d dbname > backup.sql
```

#### Option C: Use Docker

```bash
docker run --rm -v "$PWD":/backup postgres:X.Y pg_dump -h host -U username -d dbname > backup.sql
```

### 4. Special Cases

#### Remote Servers

When backing up remote servers, ensure you're using a pg_dump version that is the same or newer than the remote PostgreSQL server.

#### Multiple PostgreSQL Installations

If you have multiple PostgreSQL versions installed:

```bash
update-alternatives --config pg_dump
```

Or adjust your PATH to prioritize the correct version.
