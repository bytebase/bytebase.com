---
title: How to enable auditing in MySQL
---

<HintBlock type="info">

MySQL auditing allows you to track and log database activity, including user connections, query execution, and data modifications. Audit logs are crucial for security compliance, troubleshooting, and monitoring user activity in your database environment.

Bytebase provides [centralized audit logging](/docs/security/audit-logging/) and [access control](/docs/security/data-access-control/) features that complement MySQL's native auditing capabilities for enterprise environments.

</HintBlock>

## MySQL Enterprise Audit Plugin (Enterprise Edition)

If you are using MySQL Enterprise Edition, you can enable the built-in audit plugin:

### Install the Audit Plugin

```sql
-- Check if the plugin is already installed
SELECT PLUGIN_NAME, PLUGIN_STATUS FROM INFORMATION_SCHEMA.PLUGINS
WHERE PLUGIN_NAME LIKE 'audit%';

-- Install the plugin if not already installed
INSTALL PLUGIN audit_log SONAME 'audit_log.so';
```

### Configure Audit Settings

Add the following to your MySQL configuration file (e.g., `/etc/mysql/my.cnf`):

```plain
[mysqld]
audit_log=FORCE_PLUS_PERMANENT
audit_log_format=JSON
audit_log_file=/var/log/mysql/audit.log
audit_log_policy=ALL
```

- `audit_log`: Enables the audit log plugin
- `audit_log_format`: Log format (JSON, NEW, or OLD)
- `audit_log_file`: Path to the audit log file
- `audit_log_policy`: Logging policy (ALL, LOGINS, QUERIES, NONE)

## MariaDB Audit Plugin (Community Edition)

For MySQL Community Edition, you can use the MariaDB Audit Plugin:

### Install the MariaDB Audit Plugin

Download the appropriate plugin for your MySQL version from [GitHub](https://github.com/mariadb-corporation/server-audit-plugin) and install it:

```sql
-- Install the plugin
INSTALL PLUGIN server_audit SONAME 'server_audit.so';
```

### Configure MariaDB Audit Plugin

Add the following to your MySQL configuration file:

```plain
[mysqld]
server_audit_logging=ON
server_audit_events=CONNECT,QUERY,TABLE
server_audit_output_type=file
server_audit_file_path=/var/log/mysql/audit.log
```

- `server_audit_logging`: Enable or disable audit logging
- `server_audit_events`: Types of events to log (CONNECT, QUERY, TABLE, etc.)
- `server_audit_output_type`: Output type (file or syslog)
- `server_audit_file_path`: Path to the audit log file

## Alternative: Using General Query Log

If you don't have access to audit plugins, you can use the general query log as a basic auditing solution:

```plain
[mysqld]
general_log=ON
general_log_file=/var/log/mysql/general.log
```

<HintBlock type="info">

Using general query logs for auditing produces large log files and can impact performance.

Bytebase offers [SQL review](/docs/sql-review/overview/) and [data access control](/docs/security/data-access-control/) features that provide audit capabilities with less overhead.

</HintBlock>

## Restart MySQL

After changing the MySQL configuration, restart MySQL to apply the changes:

```bash
sudo systemctl restart mysql
```

## Verify Auditing is Enabled

### For Enterprise Audit Plugin

```sql
-- Check if the plugin is active
SELECT PLUGIN_NAME, PLUGIN_STATUS FROM INFORMATION_SCHEMA.PLUGINS
WHERE PLUGIN_NAME = 'audit_log';

-- View audit log variables
SHOW VARIABLES LIKE 'audit_log%';
```

### For MariaDB Audit Plugin

```sql
-- Check if the plugin is active
SELECT PLUGIN_NAME, PLUGIN_STATUS FROM INFORMATION_SCHEMA.PLUGINS
WHERE PLUGIN_NAME = 'server_audit';

-- View audit variables
SHOW VARIABLES LIKE 'server_audit%';
```

### For General Log

```sql
-- Check general log status
SHOW VARIABLES LIKE 'general_log%';
```

<HintBlock type="info">

For enterprise environments managing multiple MySQL instances, Bytebase provides [centralized schema change workflows](/docs/change-database/change-workflow/) with comprehensive [audit trails](/docs/security/audit-logging/) and [compliance checks](/docs/sql-review/review-policy/). This approach allows you to enforce consistent auditing policies across your database fleet.

</HintBlock>

## References

- [MySQL Enterprise Audit](https://dev.mysql.com/doc/refman/8.0/en/audit-log.html)
- [MariaDB Audit Plugin](https://mariadb.com/kb/en/mariadb-audit-plugin/)
- [MySQL General Query Log](https://dev.mysql.com/doc/refman/8.0/en/query-log.html)
