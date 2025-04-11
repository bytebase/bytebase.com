---
title: How to enable auditing in MySQL
---

## Using General Query Log

Enable General Query Log:

```plain
[mysqld]
general_log=ON
general_log_file=/var/log/mysql/general.log
```

Restart MySQL:

```bash
sudo systemctl restart mysql
```

Verify:

```sql
-- Check general log status
SHOW VARIABLES LIKE 'general_log%';
```

## MariaDB Audit Plugin (Community Edition)

For MySQL Community Edition, you can use the MariaDB Audit Plugin:

### Install the MariaDB Audit Plugin

[Download](https://mariadb.com/kb/en/mariadb-audit-plugin/) the appropriate plugin for your MySQL version and install it:

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

### Restart MySQL

```bash
sudo systemctl restart mysql
```

## MySQL Enterprise Audit Plugin (Enterprise Edition)

If you are using MySQL Enterprise Edition, you can enable the [built-in audit plugin](https://dev.mysql.com/doc/refman/8.4/en/audit-log.html):

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

### Restart MySQL

```bash
sudo systemctl restart mysql
```

### Verify

```sql
-- Check if the plugin is active
SELECT PLUGIN_NAME, PLUGIN_STATUS FROM INFORMATION_SCHEMA.PLUGINS
WHERE PLUGIN_NAME = 'audit_log';

-- View audit log variables
SHOW VARIABLES LIKE 'audit_log%';
```

## MySQL API-Based Auditing

You can implement auditing directly using MySQL Connector API to capture all database operations with minimal performance impact:

### Basic Implementation

- Create a custom database cursor class that intercepts SQL operations
- Capture user, database, query text, and parameters when executed
- Log this information to a file before allowing normal query execution
- Extend MySQL Connector's standard cursor class by overriding execute methods
- Implement logging functionality transparently to applications

### Additional Considerations

- Extend this approach to capture connection events and stored procedure calls
- Forward audit logs to a central logging system (ELK, Prometheus, etc.)
- Consider adding application context (user ID, request ID) to enhance traceability
- Use async logging to minimize performance impact

## References

- [MySQL Enterprise Audit](https://dev.mysql.com/doc/refman/8.0/en/audit-log.html)
- [MariaDB Audit Plugin](https://mariadb.com/kb/en/mariadb-audit-plugin/)
- [MySQL General Query Log](https://dev.mysql.com/doc/refman/8.0/en/query-log.html)
