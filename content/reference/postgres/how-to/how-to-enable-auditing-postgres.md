---
title: How to enable auditing in PostgreSQL
---

## PostgreSQL's Built-in Logging

**Configure Log Settings:**

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

**Restart PostgreSQL:**

```bash
# For systemd-based systems
sudo systemctl restart postgresql

# For older systems
sudo service postgresql restart
```

**Verify:**

```sql
-- Check current logging settings
SHOW log_statement;
SHOW log_connections;
SHOW logging_collector;
```

## pgAudit Extension (Recommended)

For comprehensive auditing capabilities, install the `pgaudit` extension:

**Install pgaudit:**

```bash
# Debian/Ubuntu
sudo apt-get install postgresql-[version]-pgaudit

# RHEL/CentOS
sudo yum install pgaudit_[version]
```

**Configure pgaudit:**

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

**Restart PostgreSQL:**

```bash
sudo systemctl restart postgresql
```

**Verify:**

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

<HintBlock type="info">

For large databases, selective auditing using `pgaudit.log_relation` can help minimize performance impact by focusing only on important tables.

</HintBlock>

## WAL-based Auditing

For advanced use cases, you can use write-ahead log (WAL) decoding for auditing:

**Configure WAL Settings:**

```plain
# Enable logical decoding in postgresql.conf
wal_level = logical
max_replication_slots = 10
```

**Create Replication Slot:**

```sql
-- Create a replication slot for audit purposes
SELECT * FROM pg_create_logical_replication_slot('audit_slot', 'test_decoding');
```

**Restart PostgreSQL:**

```bash
sudo systemctl restart postgresql
```

**Verify:**

```sql
-- Check if slot was created
SELECT * FROM pg_replication_slots WHERE slot_name = 'audit_slot';

-- View recent changes
SELECT * FROM pg_logical_slot_peek_changes('audit_slot', NULL, NULL);
```

## PostgreSQL API-Based Auditing

You can implement auditing at the application level using the PostgreSQL client libraries:

**Basic Implementation:**

- Create a custom connection wrapper that intercepts SQL operations
- Capture user, database, query text, and parameters before execution
- Record this information to a log file or audit table
- Extend PostgreSQL's client interface to add auditing transparently
- Implement hooks that applications can use without modifying existing code

**Additional Considerations:**

- Extend this approach to capture connection events and prepared statements
- Forward audit logs to a central logging system (ELK, Prometheus, etc.)
- Consider adding application context (user ID, request ID) to enhance traceability
- Use async logging to minimize performance impact

<HintBlock type="info">

For enterprise environments managing multiple PostgreSQL instances, Bytebase provides [centralized schema change workflows](/docs/change-database/change-workflow/) with comprehensive [audit trails](/docs/security/audit-logging/) and [compliance checks](/docs/sql-review/review-policy/). This approach allows you to enforce consistent auditing policies across your database fleet.

</HintBlock>

## References

- [PostgreSQL Logging Documentation](https://www.postgresql.org/docs/current/runtime-config-logging.html)
- [pgAudit Extension](https://github.com/pgaudit/pgaudit)
- [PostgreSQL WAL-based Auditing](https://www.postgresql.org/docs/current/logical-replication.html)
- [Timescale Guide: What is Audit Logging in PostgreSQL](https://www.timescale.com/learn/what-is-audit-logging-and-how-to-enable-it-in-postgresql)
