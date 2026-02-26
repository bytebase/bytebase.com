---
title: How to Create a Database in MySQL
updated_at: 2026/02/26 09:00:00
---

_Official documentation: [CREATE DATABASE](https://dev.mysql.com/doc/refman/8.4/en/create-database.html)_

## Basic syntax

```sql
CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name
    [CHARACTER SET [=] charset_name]
    [COLLATE [=] collation_name]
    [ENCRYPTION [=] {'Y' | 'N'}]
```

`CREATE SCHEMA` is a synonym for `CREATE DATABASE`.

The `CREATE` privilege on the database is required.

## Create a database

Connect to MySQL and run:

```sql
CREATE DATABASE myapp;
```

Verify it was created:

```sql
SHOW DATABASES;
```

Switch to the new database:

```sql
USE myapp;
```

You can also inspect the exact definition MySQL stored:

```sql
SHOW CREATE DATABASE myapp;
```

## CREATE DATABASE IF NOT EXISTS

Without `IF NOT EXISTS`, MySQL returns an error if the database already exists. Add the clause to make the statement idempotent — useful in scripts and migrations:

```sql
CREATE DATABASE IF NOT EXISTS myapp;
```

## Specify CHARACTER SET and COLLATION

If you don't set a character set, MySQL uses the server default (typically `utf8mb4` on MySQL 8.0+). For applications that store multilingual text, set it explicitly:

```sql
CREATE DATABASE myapp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

You can also prefer the MySQL 8.x collation series which uses the newer Unicode Collation Algorithm implementation, for example:

```sql
CREATE DATABASE myapp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
```

`utf8mb4` is the correct choice for full Unicode support, including emoji. The older `utf8` type in MySQL is a 3-byte encoding that cannot store characters above U+FFFF.

To see all available character sets:

```sql
SHOW CHARACTER SET;
```

To see collations for a specific character set:

```sql
SHOW COLLATION WHERE Charset = 'utf8mb4';
```

To check the server default character set and collation, run:

```sql
SHOW VARIABLES LIKE 'character_set_server';
SHOW VARIABLES LIKE 'collation_server';
```

## Enable encryption (MySQL 8.0+)

The `ENCRYPTION` option (introduced in MySQL 8.0.16) sets the default for tables created in the database. It requires InnoDB with a keyring plugin configured and an appropriate keyring backend:

```sql
CREATE DATABASE myapp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci
  ENCRYPTION = 'Y';
```

If `table_encryption_privilege_check` is enabled on the server, setting a value that differs from `default_table_encryption` requires the `TABLE_ENCRYPTION_ADMIN` privilege.

## Create a database from the command line

The `mysqladmin` tool can create a database without opening a MySQL session:

```bash
mysqladmin -u root -p create myapp
```

You can also specify host and port when connecting remotely:

```bash
mysqladmin -h 127.0.0.1 -P 3306 -u root -p create myapp
```

## Common errors

**ERROR 1007: Can't create database; database exists**

The database already exists. Either drop it first or use `IF NOT EXISTS`:

```sql
CREATE DATABASE IF NOT EXISTS myapp;
```

**ERROR 1044: Access denied for user to database**

The user lacks the `CREATE` privilege. Grant it from a privileged account:

```sql
GRANT CREATE ON `myapp`.* TO 'youruser'@'localhost';
```

**ERROR 1115: Unknown character set**

The character set name is misspelled or not supported on this server. Run `SHOW CHARACTER SET` to see valid options.

<HintBlock type="info">

Managing databases across multiple environments — dev, staging, production — gets complex quickly. [Bytebase](https://www.bytebase.com/) provides a web UI and API to create databases, apply schema migrations, and enforce SQL review rules across all your MySQL instances. See the [Bytebase docs](https://docs.bytebase.com/) to get started.

</HintBlock>

## Database name rules and case-sensitivity

Database (schema) names follow the general identifier rules in MySQL. Names are limited to 64 characters and are mapped to filesystem names; avoid special characters when possible. Case-sensitivity of database and table names depends on the `lower_case_table_names` setting and the operating system (Linux filesystems are usually case-sensitive; macOS and Windows typically are not). See Section 11.2 "Schema Object Names" in the MySQL manual for details.

## Related

- [How to CREATE TABLE in MySQL](/reference/mysql/how-to/how-to-create-table-mysql/)
- [Top MySQL commands with examples](/reference/mysql/how-to/top-mysql-commands-with-examples/)
- [How to install MySQL on Mac, Ubuntu, CentOS, Windows](/reference/mysql/how-to/how-to-install-mysql-on-mac-ubuntu-centos-windows/)
- [Top MySQL GUI clients](/blog/top-mysql-gui-client/)
