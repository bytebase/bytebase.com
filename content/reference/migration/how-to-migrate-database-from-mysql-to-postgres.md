---
title: 'How to Migrate database from MySQL to PostgreSQL'
---

## When you should consider migrating from MySQL to PostgreSQL

### Advanced feature requirements

- **Complex Data Types**: PostgreSQL provides robust support for JSON, arrays, hstore, and custom types, making it ideal for applications with complex data structures.
- **Geospatial Support**: PostgreSQL with PostGIS offers superior geospatial capabilities compared to MySQL's spatial extensions.

### Scalability needs

- **Table Partitioning**: PostgreSQL's declarative partitioning is more flexible and powerful than MySQL's partitioning system.
- **Parallel Query Execution**: PostgreSQL can utilize multiple CPU cores for single queries, improving performance for complex analytical workloads.
- **Advanced Indexing**: PostgreSQL supports more index types (B-tree, Hash, GiST, SP-GiST, GIN, and BRIN) and offers partial and expression indexes.

### Licensing concerns

PostgreSQL offers freedoms that MySQL's GPL version doesn't:

- **Permissive License**: PostgreSQL uses a PostgreSQL License (similar to MIT/BSD), which:

  - Allows unrestricted use in proprietary applications
  - Doesn't require source code disclosure
  - Permits creating closed-source derivatives

- **Unrestricted Embedding**: You can embed PostgreSQL in commercial products without licensing fees or source code obligations.
- **Fork Freedom**: You can create proprietary forks of PostgreSQL without license obligations.
- **No Corporate Control**: PostgreSQL is developed by a community organization rather than a single company, reducing concerns about commercial interests affecting the license.

## When you should think twice

- If your application handles a high volume of write operations, PostgreSQL may perform less efficiently. Check [Uber's switch from PostgreSQL to MySQL](https://www.uber.com/en-SG/blog/postgres-to-mysql-migration/)
- All-in-one vs best of breed. While PostgreSQL is like an all-in-one database thanks to its extensible architecture, it may be better to let your relational database handle transactional processing and use more specialized systems for analytical processing, full-text search, etc. If you are considering migrating databases, yours has likely reached a certain scale and encountered bottlenecks. The all-in-one approach is more desirable when you’re just getting started.

## MySQL and PostgreSQL schema differences

### Data types

While many data types are similar, important differences exist:

| MySQL Type                           | PostgreSQL Equivalent    | Notes                                                           |
| ------------------------------------ | ------------------------ | --------------------------------------------------------------- |
| INT                                  | INTEGER                  | Similar functionality                                           |
| BIGINT                               | BIGINT                   | Similar functionality                                           |
| FLOAT                                | REAL                     | PostgreSQL's REAL is equivalent to MySQL's FLOAT                |
| DOUBLE                               | DOUBLE PRECISION         | Similar functionality                                           |
| DECIMAL                              | NUMERIC                  | Similar functionality                                           |
| DATETIME                             | TIMESTAMP                | PostgreSQL's TIMESTAMP has no automatic initialization          |
| TIMESTAMP                            | TIMESTAMP WITH TIME ZONE | PostgreSQL handles time zones more explicitly                   |
| ENUM                                 | ENUM or CHECK constraint | PostgreSQL's ENUM is a custom type, not a string constraint     |
| SET                                  | Array or JSONB           | No direct equivalent; arrays or JSONB can replace functionality |
| TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT | TEXT                     | PostgreSQL has a single TEXT type with no practical size limit  |
| VARCHAR                              | VARCHAR                  | PostgreSQL's VARCHAR has no performance penalty for full length |
| BLOB                                 | BYTEA                    | Different functions for manipulation                            |

### Constraints and keys

PostgreSQL handles constraints differently:

- **Primary Keys**: Both systems support primary keys, but PostgreSQL automatically creates an index for each primary key.
- **Foreign Keys**: PostgreSQL enforces foreign key constraints more strictly and offers more deferral options.
- **CHECK Constraints**: PostgreSQL fully enforces CHECK constraints, while MySQL historically stored but ignored them (this has improved in recent MySQL versions).
- **Unique Constraints**: Both support unique constraints, but PostgreSQL distinguishes between unique constraints and unique indexes.

### Sequences and auto-increment

- MySQL uses `AUTO_INCREMENT` for generating sequential values.
- PostgreSQL uses sequences, typically with `SERIAL` or `IDENTITY` columns.
- Migration requires converting `AUTO_INCREMENT` to PostgreSQL sequences or identity columns.

### Default values

- PostgreSQL supports more complex default values, including functions.
- MySQL's `CURRENT_TIMESTAMP` default for `DATETIME` columns becomes `CURRENT_TIMESTAMP` in PostgreSQL.
- PostgreSQL allows defaults on TEXT columns, which some MySQL versions restricted.

### Schema naming and case sensitivity

- PostgreSQL is case-sensitive for identifiers unless quoted, while MySQL's case sensitivity depends on the operating system and configuration.
- PostgreSQL automatically converts unquoted identifiers to lowercase, which can cause issues during migration.
- PostgreSQL uses schemas (similar to namespaces) more extensively than MySQL's databases.

### Stored procedures and functions

- PostgreSQL uses PL/pgSQL as its primary procedural language, while MySQL uses its own syntax.
- PostgreSQL supports multiple procedural languages (PL/pgSQL, PL/Python, PL/Perl, etc.).

### Views and materialized views

- Both support views, but PostgreSQL also offers materialized views that store data physically.
- PostgreSQL's view updating capabilities are more advanced.
- PostgreSQL allows indexing of materialized views.

## Data migration strategies

| Strategy                    | Pros                                                                                               | Cons                                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Direct export/import        | Simple to implement for small databases                                                            | Requires downtime<br/>Challenging for large databases<br/>Manual conversion may be needed            |
| ETL process                 | Highly customizable<br/>Can handle complex transformations<br/>Can be parallelized                 | Requires more development effort<br/>Potentially complex to set up                                   |
| Replication-based migration | Minimal downtime<br/>Continuous validation possible<br/>Phased migration                           | More complex setup<br/>Requires monitoring<br/>Potential replication lag                             |
| Cloud migration services    | Managed service<br/>Often includes schema conversion<br/>Typically supports continuous replication | Vendor lock-in<br/>Potential costs<br/>May require cloud-to-cloud or on-premises-to-cloud networking |

### Direct export/import

The simplest approach involves exporting data from MySQL and importing it into PostgreSQL:

1. **Export MySQL data** using mysqldump:

   ```bash
   mysqldump --compatible=postgresql --default-character-set=utf8 \
   --no-create-info --complete-insert --extended-insert --single-transaction \
   --skip-triggers --routines=0 --skip-tz-utc \
   database_name > mysql_data.sql
   ```

2. **Convert the SQL** to PostgreSQL format using tools like [pgloader](https://github.com/dimitri/pgloader) or custom scripts.

3. **Import into PostgreSQL** using psql:
   ```bash
   psql -d database_name -f converted_data.sql
   ```

### ETL process

For more complex migrations, an Extract-Transform-Load (ETL) process offers greater control:

1. **Extract** data from MySQL into an intermediate format (CSV, JSON, etc.).
2. **Transform** the data to match PostgreSQL's requirements (data types, constraints, etc.).
3. **Load** the transformed data into PostgreSQL.

### Replication-based migration

For minimal downtime, consider a replication-based approach:

1. **Set up initial data copy** using tools like pgloader or AWS DMS.
2. **Establish ongoing replication** from MySQL to PostgreSQL using tools likes [Debezium](https://debezium.io/).
3. **Validate data consistency** between the systems.
4. **Cut over** to PostgreSQL when ready.

### Cloud migration services

Cloud providers offer specialized services for database migration:

- **AWS Database Migration Service**
- **Google Cloud Database Migration Service**
- **Azure Database Migration Service**

### Handling large datasets

For very large databases, consider these additional strategies:

- **Partitioned Migration**: Migrate data in chunks based on logical partitions.
- **Parallel Processing**: Use multiple threads or processes for data extraction and loading.
- **Incremental Migration**: Migrate historical data first, then recent data during cutover.
- **Data Validation**: Implement checksums or row counts to verify migration completeness.

## Application code changes

### SQL syntax differences

- **String Concatenation**: MySQL uses `CONCAT()` function, PostgreSQL uses `||` operator.
- **Date Functions**: Functions like `DATE_ADD()` in MySQL become `date + interval` in PostgreSQL.
- **LIMIT/OFFSET**: MySQL uses `LIMIT x,y` while PostgreSQL uses `LIMIT y OFFSET x`.
- **Group By Handling**: PostgreSQL requires all non-aggregated columns in the SELECT list to appear in the GROUP BY clause.
- **Boolean Values**: MySQL uses 0/1, PostgreSQL uses true/false.
- **REPLACE INTO**: PostgreSQL doesn't support this MySQL shorthand; use DELETE + INSERT or upsert with ON CONFLICT.

### Connection string

- **Connection Libraries**: Some libraries are database-specific and need replacement.
- **Connection Strings**: Format differs between MySQL and PostgreSQL.
- **Connection Pooling**: Configuration parameters differ between systems.

Example MySQL connection string:

```java
mysql://user:password@host:3306/database
```

Equivalent PostgreSQL connection string:

```java
postgresql://user:password@host:5432/database
```

### ORM configurations

- **Dialect Configuration**: Change the database dialect to PostgreSQL.
- **Type Mappings**: Update custom type mappings to match PostgreSQL types.
- **Query Generation**: Some ORMs generate different SQL for different databases.

Example changes for popular ORMs:

**Hibernate (Java)**:

```java
// MySQL
properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
// PostgreSQL
properties.setProperty("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
```

**Sequelize (Node.js)**:

```javascript
// MySQL
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
});
// PostgreSQL
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'postgres',
});
```

### Transaction management

- **Default Isolation Level**: PostgreSQL uses `Read Committed` by default, while MySQL traditionally used `Repeatable Read`.
- **Locking Behavior**: PostgreSQL's approach to row locking differs from MySQL's. MySQL uses next-key locking in InnoDB to prevent phantom reads. PostgreSQL uses multi-version concurrency control (MVCC) without next-key locking. This can lead to different behavior in highly concurrent applications.
- **Serialization Failures**: PostgreSQL may throw serialization failures that MySQL wouldn't.

### Error handling

- **Error Codes**: Different numeric codes for similar errors.
- **Constraint Violations**: Different formats for constraint violation messages.
- **Connection Errors**: Different error handling for connection issues.

### Database-specific features

If your application uses MySQL-specific features, alternatives must be implemented:

- **Full-Text Search**: Replace MySQL's full-text search with PostgreSQL's text search capabilities.
- **Stored Procedures**: Rewrite in PL/pgSQL syntax.
- **User-Defined Functions**: Convert to PostgreSQL's function syntax.
- **Triggers**: Update to PostgreSQL's trigger syntax.

## Other notable compatibility issues

Beyond schema and code changes, several other compatibility issues require attention:

### Case sensitivity

- MySQL is typically case-insensitive for table and column names on Windows, but case-sensitive on Unix/Linux.
- PostgreSQL is always case-sensitive unless identifiers are quoted, and converts unquoted identifiers to lowercase.
- This can cause unexpected behavior if your application relies on case-insensitive identifiers.

### NULL handling

NULL value handling differs between the systems:

- In MySQL, NULL = NULL returns NULL, while in PostgreSQL, NULL = NULL returns false.
- MySQL treats empty strings as NULL in some contexts, while PostgreSQL distinguishes between empty strings and NULL.
- These differences can affect query results and application logic.

### Character sets and collations

- MySQL uses character sets and collations at the server, database, table, and column levels.
- PostgreSQL uses encoding at the database level and collations at the column level.
- Default character sets differ: MySQL often defaults to `latin1` (though the sane setup should be `utf8mb4`), while PostgreSQL typically uses `UTF-8`.

## Cutover process

The final phase of migration is the cutover—transitioning production traffic from MySQL to PostgreSQL. Here's a structured approach:

### Cutover strategies

| Strategy             | Description                        | Steps                                                                                                                                                                                                                                               | Pros                                                                                                | Cons                                                                                           |
| -------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Big Bang Cutover** | Switch all traffic at once         | 1. Stop all write traffic to MySQL<br/>2. Perform final data synchronization<br/>3. Verify data consistency<br/>4. Update application configuration<br/>5. Restart application services<br/>6. Resume traffic                                       | Simpler to implement;<br/>no need to maintain both systems simultaneously                           | Higher risk;<br/>longer downtime;<br/>all-or-nothing approach                                  |
| **Phased Cutover**   | Transition traffic gradually       | 1. Identify components for independent migration<br/>2. Migrate one component at a time<br/>3. Maintain data synchronization during transition<br/>4. Monitor each component before proceeding<br/>5. Complete when all components are transitioned | Lower risk;<br/>issues affect only part of the system;<br/>easier rollback                          | More complex;<br/>requires maintaining both systems;<br/>potential data consistency challenges |
| **Read/Write Split** | Separate read and write operations | 1. Direct reads to PostgreSQL, writes to MySQL<br/>2. Maintain real-time replication<br/>3. Migrate write operations when confident<br/>4. Decommission MySQL after transition                                                                      | Gradual transition;<br/>reduced risk for read-heavy applications;<br/>easier performance validation | Requires robust replication;<br/>potential replication lag;<br/>complex application changes    |

### Zero-downtime approaches

For systems that cannot tolerate downtime:

1. **Dual-Write Pattern**:

   - Modify application to write to both MySQL and PostgreSQL
   - Read from MySQL initially
   - Gradually shift reads to PostgreSQL
   - Once confident, stop writing to MySQL

2. **Change Data Capture (CDC)**:

   - Use tools like Debezium to capture changes from MySQL
   - Apply changes to PostgreSQL in real-time
   - Switch application connection to PostgreSQL when ready

3. **Proxy-Based Approach**:
   - Implement a database proxy (like ProxySQL or PgBouncer)
   - Configure the proxy to route traffic appropriately during migration
   - Switch routing rules to complete migration

## Common tools

- [pgloader](https://github.com/dimitri/pgloader). A powerful and flexible PostgreSQL migration tool that excels at rapidly loading data into PostgreSQL databases.
- [Ora2Pg](https://github.com/darold/ora2pg). While primarily designed for Oracle to PostgreSQL migrations, Ora2Pg can also be used to migrate from MySQL to PostgreSQL.
- pg_dump and pg_restore. These core PostgreSQL utilities are often used in conjunction with other tools.
- Cloud migration services like [AWS Database Migration Service (DMS)](https://aws.amazon.com/dms/).
