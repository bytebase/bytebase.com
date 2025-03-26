---
title: 'How to fix ERROR 1142 (42000): command denied to user in MySQL'
---

`ERROR 1142 (42000): command denied to user` indicates a permissions issue when a user lacks sufficient privileges for a specific command.

## Resolution Steps

### 1. Identify Missing Privilege

Examine the error message:

```sql
ERROR 1142 (42000): command denied to user 'username'@'host' for table 'tablename'
```

### 2. Connect with Admin Privileges

```sql
mysql -u root -p
```

### 3. Check Current Privileges

```sql
SHOW GRANTS FOR 'username'@'host';
```

### 4. Grant Required Privileges

For a specific table:

```sql
GRANT SELECT, INSERT, UPDATE ON database_name.table_name TO 'user'@'localhost';
```

For an entire database:

```sql
GRANT ALL PRIVILEGES ON database_name.* TO 'user'@'localhost';
```

For global privileges:

```sql
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost';
```

### 5. Apply Changes

```sql
FLUSH PRIVILEGES;
```

### 6. Verify New Privileges

```sql
SHOW GRANTS FOR 'username'@'host';
```

## Cloud Vendor Limitations

Many cloud database services restrict superuser privileges:

- **AWS RDS**: The root user lacks certain privileges like `SUPER`, `FILE`, and cannot modify system tables
- **Azure Database for MySQL**: Root account limitations on global grants and system schema modifications
- **Google Cloud SQL**: Unable to grant `SUPER`, `PROCESS`, `FILE` privileges
- **DigitalOcean Managed Databases**: Limited ability to modify `performance_schema` and system variables

For cloud environments, use service-specific privilege management:

- AWS: Parameter groups and option groups
- Azure: Server parameters
- GCP: Database flags
