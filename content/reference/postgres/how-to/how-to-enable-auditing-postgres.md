---
title: How to enable auditing in PostgreSQL
---

<HintBlock type="info">

PostgreSQL auditing allows you to track and log database activity, including user connections, query execution, and data modifications. Audit logs are crucial for security compliance, troubleshooting, and monitoring user activity in your database environment.

Bytebase provides [centralized audit logging](/docs/security/audit-logging/) and [access control](/docs/security/data-access-control/) features that complement PostgreSQL's native auditing capabilities for enterprise environments.

</HintBlock>

## PostgreSQL's Built-in Logging

PostgreSQL offers built-in logging capabilities that can be configured for basic auditing:

### Configure Log Settings

Add the following to your PostgreSQL configuration file (`postgresql.conf`):

```plain
# Basic logging settings
log_destination = 'csvlog'
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 10MB

# What to log
log_statement = 'all'        # Options: none, ddl, mod, all
log_connections = on
log_disconnections = on
log_duration = on
```

- `log_statement`: Controls which SQL statements to log (none, ddl, mod, all)
- `log_connections`: Log successful connections
- `log_disconnections`: Log session terminations
- `log_duration`: Include query execution time

## pg_audit Extension (Recommended)

For comprehensive auditing capabilities, install the `pgaudit` extension:

### Install pgaudit

For most distributions:

```bash
# Debian/Ubuntu
sudo apt-get install postgresql-[version]-pgaudit

# RHEL/CentOS
sudo yum install pgaudit_[version]
```

For source installation:

```bash
git clone https://github.com/pgaudit/pgaudit.git
cd pgaudit
make install
```

### Configure pgaudit

Add the following to your PostgreSQL configuration file (`postgresql.conf`):

```plain
# Load the extension
shared_preload_libraries = 'pgaudit'

# Audit settings
pgaudit.log = 'write, ddl'
pgaudit.log_catalog = on
pgaudit.log_parameter = on
pgaudit.log_statement_once = on
pgaudit.log_level = 'log'
```

Then enable the extension in your database:

```sql
-- Connect to your database and run:
CREATE EXTENSION pgaudit;
```

### Audit Session Logging

For session-level auditing, which audits operations by specific users:

```sql
-- Enable session audit logging for a user
ALTER USER audited_user SET pgaudit.log = 'read, write';
```

### Object-level Audit Logging

For more granular auditing of specific objects:

```sql
-- Create audit role
CREATE ROLE auditor;

-- Grant audit privileges on table
GRANT SELECT ON sensitive_table TO auditor;

-- Enable object-level auditing for the table
ALTER TABLE sensitive_table ENABLE AUDIT;
```

<HintBlock type="info">

For large databases, selective auditing using `pgaudit.log_relation` can help minimize performance impact by focusing only on important tables.

Bytebase offers [SQL review](/docs/sql-review/overview/) and [data access control](/docs/security/data-access-control/) features that provide audit capabilities with less overhead.

</HintBlock>

## Alternative: WAL-based Auditing

For advanced use cases, you can use write-ahead log (WAL) decoding for auditing:

```plain
# Enable logical decoding
wal_level = logical
max_replication_slots = 10
```

This approach is more advanced but allows real-time monitoring of all data changes.

## Restart PostgreSQL

After changing the PostgreSQL configuration, restart the service to apply the changes:

```bash
# For systemd-based systems
sudo systemctl restart postgresql

# For older systems
sudo service postgresql restart
```

## Verify Auditing is Enabled

### For Built-in Logging

```sql
-- Check current logging settings
SHOW log_statement;
SHOW log_connections;
SHOW logging_collector;

-- View recent logs (if using csvlog format)
SELECT * FROM pg_logical_slot_peek_changes('audit_slot', NULL, NULL);
```

### For pgaudit Extension

```sql
-- Verify the extension is installed
SELECT * FROM pg_extension WHERE extname = 'pgaudit';

-- Check current pgaudit settings
SHOW pgaudit.log;
SHOW pgaudit.log_catalog;

-- Test with an auditable operation
CREATE TABLE test_audit(id int);
INSERT INTO test_audit VALUES (1);
DROP TABLE test_audit;
```

After these operations, check your log files for audit entries.

<HintBlock type="info">

For enterprise environments managing multiple PostgreSQL instances, Bytebase provides [centralized schema change workflows](/docs/change-database/change-workflow/) with comprehensive [audit trails](/docs/security/audit-logging/) and [compliance checks](/docs/sql-review/review-policy/). This approach allows you to enforce consistent auditing policies across your database fleet.

</HintBlock>

## References

- [PostgreSQL Logging Documentation](https://www.postgresql.org/docs/current/runtime-config-logging.html)
- [pgAudit Extension](https://github.com/pgaudit/pgaudit)
- [PostgreSQL WAL-based Auditing](https://www.postgresql.org/docs/current/logical-replication.html)
- [Timescale Guide: What is Audit Logging in PostgreSQL](https://www.timescale.com/learn/what-is-audit-logging-and-how-to-enable-it-in-postgresql)
