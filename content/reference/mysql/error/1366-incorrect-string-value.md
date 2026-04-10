---
title: "ERROR 1366 (HY000): Incorrect String Value in MySQL"
---

## Error Message

```sql
ERROR 1366 (HY000): Incorrect string value: '\xF0\x9F\x98\x80' for column 'name' at row 1
```

Other common variations:

```sql
ERROR 1366 (HY000): Incorrect string value: '\xE4\xB8\xAD' for column 'description' at row 1
ERROR 1366 (HY000): Incorrect string value: '\x80\x81\x82' for column 'content' at row 1
```

## What Triggers This Error

MySQL 1366 fires when a string value contains bytes that cannot be represented in the column's character set. The most common case: inserting emoji or 4-byte Unicode characters into a `utf8` (3-byte) column instead of `utf8mb4` (4-byte). The fix depends on where the charset mismatch occurs:

- **Emoji or 4-byte characters into a `utf8` column** — the column needs `utf8mb4`
- **Connection charset doesn't match column charset** — the client sends bytes the server can't interpret
- **Data migration with unconverted binary data** — migrating from `latin1` to `utf8` without converting the actual bytes
- **Application sends raw bytes without specifying charset** — the driver defaults to a charset that doesn't match the data
- **`LOAD DATA INFILE` with wrong `CHARACTER SET` clause** — the file encoding doesn't match what MySQL expects

## Fix by Scenario

### Emoji or 4-byte characters into a `utf8` column

MySQL's `utf8` is actually `utf8mb3` — it only supports characters up to 3 bytes. Emoji, some CJK characters, and mathematical symbols are 4 bytes and require `utf8mb4`.

```sql
-- Check the column's character set
SELECT COLUMN_NAME, CHARACTER_SET_NAME, COLLATION_NAME
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'users' AND COLUMN_NAME = 'name';

-- If it shows 'utf8' (not 'utf8mb4'), that's the problem
```

**Fix:** Convert the column (or the entire table) to `utf8mb4`:

```sql
-- Convert a single column
ALTER TABLE users MODIFY name VARCHAR(255)
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Convert the entire table
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Convert the database default (for new tables)
ALTER DATABASE mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Important:** If you have indexes on the column and the column is `VARCHAR(255)`, switching to `utf8mb4` increases the index key size from 765 bytes (255 × 3) to 1020 bytes (255 × 4). If this exceeds the InnoDB index key limit (3072 bytes for `DYNAMIC`/`COMPRESSED` row format, 767 bytes for `COMPACT`/`REDUNDANT`), reduce the column length or use a prefix index:

```sql
-- Check your row format
SELECT TABLE_NAME, ROW_FORMAT FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'mydb' AND TABLE_NAME = 'users';

-- If COMPACT/REDUNDANT, you may need a prefix index
ALTER TABLE users MODIFY name VARCHAR(191)
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- 191 × 4 = 764 bytes, just under the 767-byte limit
```

### Connection charset doesn't match column charset

Even if the column is `utf8mb4`, the connection must also use `utf8mb4`. Otherwise MySQL tries to convert the bytes from the connection charset to the column charset and fails.

```sql
-- Check the current connection charset
SHOW VARIABLES LIKE 'character_set%';

-- Look for:
-- character_set_client      = utf8mb4
-- character_set_connection  = utf8mb4
-- character_set_results     = utf8mb4
```

**Fix:** Set the connection charset when connecting:

```python
# Python with mysql-connector
connection = mysql.connector.connect(
    host='localhost',
    user='root',
    database='mydb',
    charset='utf8mb4',
    collation='utf8mb4_unicode_ci'
)

# Python with SQLAlchemy
engine = create_engine(
    'mysql+pymysql://root@localhost/mydb?charset=utf8mb4'
)
```

```java
// Java JDBC
String url = "jdbc:mysql://localhost/mydb?characterEncoding=utf8mb4&connectionCollation=utf8mb4_unicode_ci";
```

Or set it per-session:

```sql
SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';
```

### Data migration from `latin1` to `utf8` with unconverted binary data

A common trap: a `latin1` column that actually stores UTF-8 bytes (because the application wrote UTF-8 through a `latin1` connection). When you `ALTER TABLE ... CONVERT TO CHARACTER SET utf8mb4`, MySQL re-encodes the bytes — double-encoding them and producing garbage or errors.

```sql
-- Check if the data is actually UTF-8 stored in latin1
SELECT name, HEX(name) FROM users WHERE id = 1;
-- If you see valid UTF-8 byte sequences (E4 B8 AD for 中), it's double-encoded
```

**Fix:** Convert via `BINARY` to preserve the raw bytes:

```sql
-- Step 1: convert to BINARY (strips charset metadata, preserves bytes)
ALTER TABLE users MODIFY name VARBINARY(255);

-- Step 2: convert from BINARY to utf8mb4 (interprets bytes as UTF-8)
ALTER TABLE users MODIFY name VARCHAR(255)
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Always back up the table before this operation.** If the bytes are not actually valid UTF-8, step 2 will fail or produce incorrect data.

### Application sends raw bytes without specifying charset

Some applications or scripts write raw bytes to MySQL without setting the connection charset. MySQL interprets them using the server default (`character_set_server`), which may not match.

```sql
-- Check the server default
SHOW VARIABLES LIKE 'character_set_server';
-- If this is 'latin1' but your app sends UTF-8, you'll get 1366
```

**Fix:**

1. Set `character_set_server` to `utf8mb4` in `my.cnf`:

```ini
[mysqld]
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[client]
default-character-set = utf8mb4
```

2. Restart MySQL for the changes to take effect
3. For existing connections, set charset explicitly (see the connection charset fix above)

### `LOAD DATA INFILE` with wrong `CHARACTER SET` clause

When importing a file, MySQL needs to know the file's encoding. If the file is UTF-8 but you don't specify that, MySQL uses the connection charset or `character_set_database`.

```sql
-- This may fail if the file contains UTF-8 but the connection charset is latin1
LOAD DATA INFILE '/tmp/data.csv' INTO TABLE users
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';
-- ERROR 1366: Incorrect string value
```

**Fix:** Specify the file's character set explicitly:

```sql
LOAD DATA INFILE '/tmp/data.csv' INTO TABLE users
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```

For `mysqlimport`:

```bash
mysqlimport --default-character-set=utf8mb4 mydb /tmp/users.txt
```

## Prevention

- Use `utf8mb4` everywhere — server, database, table, column, and connection. MySQL's `utf8` is a legacy alias for the 3-byte subset and should be considered deprecated
- Set `charset=utf8mb4` in all application connection strings
- Add `character-set-server=utf8mb4` and `collation-server=utf8mb4_unicode_ci` to `my.cnf`
- When migrating data between charsets, always check whether the stored bytes already are the target encoding (the `latin1` stores UTF-8 trap)
- Specify `CHARACTER SET utf8mb4` in `LOAD DATA INFILE` and `mysqlimport` commands

<HintBlock type="info">

Bytebase's [SQL Review](https://docs.bytebase.com/sql-review/review-rules/) can enforce `utf8mb4` as the required character set for all new tables and columns, preventing charset mismatches before they reach production. See also [ERROR 1071: Specified Key Was Too Long](/reference/mysql/error/1071-specified-key-was-too-long) if converting to `utf8mb4` causes index size issues.

</HintBlock>
