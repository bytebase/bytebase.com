---
title: PostgreSQL SQL Review and Style Guide
description: The SQL Review and Style Guide for PostgreSQL
---

## Background

<HintBlock type="info">

The guide is based on [pigsty](https://pigsty.cc/zh/blog/2018/06/20/postgresql%E5%BC%80%E5%8F%91%E8%A7%84%E7%BA%A6/) by [@Vonng](http://vonng.com/en/). You can configure many of the listed [SQL Review rules in Bytebase](https://bytebase.com/docs/sql-review/review-policy).

</HintBlock>

PostgreSQL is a very powerful database, but to use PostgreSQL well, it needs the collaboration of backend engineers, Ops/SREs, and DBAs.

In this article, we have compiled best practices for using PostgreSQL, which we hope will reduce the barrier for operating PostgreSQL in production. There are several PostgreSQL SQL Review Guide on the Internet, this guide is unique in several ways:

- **Pragmatic**. This is not a textbook guide. The guide is based on real-world operating experiences
  and is adopted by giant internet companies.

- **Comprehensive**. The guide covers:

  - [Naming Rules](#naming-rules)
  - [Design Rules](#design-rules)
  - [Index Rules](#index-rules)
  - [Query Rules](#query-rules)
  - [Deployment Process](#deployment-process)
  - [Cluster Management](#cluster-management)

## Naming Rules

### General Naming

**Required**

- This rule applies to all object names, including: database names, table names, column names, function names, view names, serial names, aliases, etc.
- Object names must use only lowercase letters, underscores, and numbers, but the first letter must be a lowercase letter, and regular tables are forbidden to start with \_.
- The length of the object name should not exceed 63 characters, and the naming must follow snake_case.
- The use of SQL reserved words is prohibited, use `SELECT pg_get_keywords();` to get the list of reserved keywords.
- Prohibit the dollar sign ($), prohibit the use of non-English letters, and do not start with pg.
- Avoid using niche words and abbreviations.

### Database Naming

**Required**

- The database name should preferably be consistent with the application or service and must be a distinguishable English word.
- Names must start with `<biz>-`, `<biz>` being the name of the specific business line, and must end with `-shard` if it is a sharded database.
- Multiple sections are concatenated using -. For example, `<biz>-chat-shard`, `<biz>-payment`, etc., with no more than three segments in total.

### Role Naming

**Required**

- There is one and only one `su` database: `postgres`
- The user for stream replication is named `replication`.
- All databases have three base roles by default: `<biz>-read`, `<biz>-write`, and `<biz>-usage`, which have read-only, write-only, and function execution permissions for all tables, respectively.
- Production users, ETL users, and individual users gain privileges by inheriting the corresponding base roles.
- Use separate roles for more granular permissions, which vary by business.

### Schema Naming

**Required**

- Businesses use `<*>` as the schema name, and `<*>` is the business name. The schema name must be set to the first element of search_path.
- `dba`, `monitor`, `trash` are reserved schema names.
- The partition schema naming rule follows: `rel_<partition_total_num>_<partition_index>`.
- Unless excepted, objects should not be created in other schemas.

### Table Naming

**Recommended**

- Clarity is the first priority, should not use ambiguous abbreviations, should not be excessively long, and follow common naming rules.
- Table names should use plural nouns, or in line with historical conventions, but words with irregular plural forms should be avoided as much as possible.
- Views use `v_` as the naming prefix, materialized views use `mv_` as the naming prefix, and temporary tables use `tmp_` as the naming prefix.
- Inherited or partitioned tables should be prefixed with the parent table name and suffixed with the child table characteristics (rules, partition ranges, etc.).

### Index Naming

**Recommended**

- If possible, the index name should be specified when creating an index, and be consistent with the default naming rules of PostgreSQL to avoid creating duplicate indexes when repeatedly executed.

- Indexes used for primary keys end with `_pkey`, unique indexes end with `_key`, indexes used for EXCLUDED constraints end with `_excl`, and normal indexes end with `_idx`.

### Function Naming

**Recommended**

- Starting with one of `select`, `insert`, `delete`, `update`, `upsert` to indicate action type.

- Important parameters can be dictated in the function name by suffixing `_by_ids`, `_by_user_ids`.

- Avoid function overloading and try to keep only one function with the same name.

- Overloading BIGINT/INTEGER/SMALLINT and other integer types is prohibited, otherwise it may generate ambiguity when called.

### Column Naming

**Recommended**

- Should not use reserved system column names: `oid`, `xmin`, `xmax`, `cmin`, `cmax`, `ctid`, etc.

- The primary key column is usually named `id`, or suffixed with `id`.

- The creation time is usually named `created_time` and the modification time is usually named `updated_time`.

- It is recommended to use `is_`, `has_`, etc. as prefixes for boolean columns.

- Newly added column names need to be consistent with existing column naming conventions.

### Variable Naming

**Recommended**

- Variables in stored procedures and functions use named parameters, not positional parameters.

- If there is a conflict between a parameter name and an object name, add `_` after the parameter, e.g. `user_id_`.

### Comment

**Recommended**

- Try to provide comments (`COMMENT`) for the object, use concise and one-line comments.

- When the semantics of the object's schema or content changes, be sure to update the comments accordingly.

## Design Rules

### Character Set must be UTF8

**Required**

- Only UTF8 is allowed

### Capacity Planning

**Required**

- Criteria to consider partitioning table, a single table over 100 million records, or more than 10GB in size.

- Criteria to consider sharding database, a single table is over 1TB and a single database is over 2TB in size.

### Do not Abuse Stored Procedure

**Required**

- Stored procedures are suitable for encapsulating transactions, reducing concurrency conflicts, reducing network round trips, reducing the amount of data returned, and performing a **small amount** of custom logic.

- Stored procedures are **not** suitable for complex calculations and for mundane/frequent type conversions and wrappers.

### Separate Storage from Computation

**Required**

- Remove unnecessary computationally intensive logic from the database, such as using SQL in the database for WGS84 to other coordinate systems conversions.

- Exception: computational logic closely related to data acquisition and filtering is allowed in the database, e.g. geometric calculation in PostGIS.

### Primary Key and Identity Column

**Required**

- Every table must have an identity column, which in principle must have a primary key, with a minimum requirement of having a non-null unique constraint.

- The identity column is used to uniquely identify any tuple in the table, on which logical replication and many 3rd party tools depend.

### Foreign Key

**Required**

- It is not recommended to use foreign keys, and it is recommended to enforce them at the application level. When using foreign keys, the reference key must set the corresponding action: `SET NULL`, `SET DEFAULT`, `CASCADE`, and be careful with cascading operations.

### Use Wide Table with Caution

**Required**

- Tables with more than 15 columns are regarded as wide tables, and wide tables should be considered for vertical splitting and cross-referenced to the main table by the same primary key.

- Because of the MVCC mechanism, the write amplification phenomenon of wide tables is more obvious, so try to reduce the frequent updates to wide tables.

### Default Value

**Required**

- Columns that have default values must have the `DEFAULT` clause added to specify the default values.

- Default values can be generated dynamically using functions in the `DEFAULT` clause (e.g. primary key generator).

### Zero and NULL Value

**Required**

- Column semantics do not distinguish between zero and `NULL` values, do not allow `NULL` values, and specify `NOT NULL` constraint on columns.

### Enforce Unique Value via Database Constraint.

**Required**

- The uniqueness shall be guaranteed by the database and any unique column shall have a `UNIQUE` constraint.

- `EXCLUDE` constraint is the generalized `UNIQUE` constraint that can be used to ensure data integrity in low-frequency update scenarios.

### Watch out Integer Overflow

**Required**

- SQL standard does not define unsigned integers, values exceeding `INTMAX` but not `UINTMAX` need to be stored in larger type.

- Do not store values that exceed `INT64MAX` into the `BIGINT` column, they will overflow into negative numbers.

- When using integer type as primary key and the table has frequent insert conflicts, you need to pay attention to integer overflow.

### Unify Time Zone

**Required**

- Use `TIMESTAMP` to store time with `UTC` time zone.

- Uniformly use ISO-8601 format to input and output time type: `2006-01-02 15:04:05` to avoid DMY and MDY problems.

- Use `TIMESTAMPTZ` with GMT/UTC time and 0 time zone standard time.

### Clean Obsolete Functions

**Required**

- Unused functions should be taken offline in time to avoid conflicts with new functions.

### Primary Key Type

**Recommended**

- Primary keys usually use integers, `BIGINT` is recommended, and strings of up to 64 bytes are allowed.

- The primary key is allowed to be generated automatically using `Serial`, and it is recommended to use the Default `next_id()` genarator function.

### Choose Proper Column Type

**Recommended**

- Prefer more specific types over general text types (numeric, enum, network address, monetary, JSON, UUID, and etc).

- Using the right data types can significantly improve the efficiency of data storage, querying, indexing, computation, and maintainability.

### Use ENUM

**Recommended**

- Columns have fixed and small value space (within a dozen) should use `ENUM` types, not integers or strings.

- There are performance, storage, and maintainability advantages to using `ENUM` types.

### Use Proper String Types

**Recommended**

- PostgreSQL's string types include `CHAR(n)`, `VARCHAR(n)`, `TEXT`.

- It is usually recommended to use `VARCHAR` or `TEXT`. Types with the (n) modifier check the string length, which causes a tiny extra overhead, and `VARCHAR(n)` should be used when there is a limit on the string length to avoid inserting excessively long dirty data.

- Avoid `CHAR(n)`, to conform with the SQL standard, it fills unused with spaces or truncates excessive letters, and has no storage or performance benefits.

### Use Proper Numeric Types

**Recommended**

- Use `INTEGER` for regular numeric fields. If not certain, use `BIGINT` for primary keys and numeric columns.

- Unless excepted, do not use `SMALLINT`, performance and storage improvement is negligible, while it will bring a lot of additional problems.

- `REAL` means 4-byte floating point number, `FLOAT` means 8-byte floating point number.

- `FLOAT` can only be used in scenarios where the end precision does not matter, such as geographic coordinates, do not use equivalence comparison for floating values.

- `NUMERIC` is used for precise numeric type, pay attention to precision and decimal position.

- Use `MONEY` for monetary value type.

### Use Unified Form to Create Functions

**Recommended**

- The signature occupies a separate line (function name and arguments), the return value starts a new line, and the language is the first label.

- Be sure to label the function volatility: `IMMUTABLE`, `STABLE`, `VOLATILE`.

- Annotate attribute labels, such as: `RETURNS NULL ON NULL INPUT`, `PARALLEL SAFE` , `ROWS 1`, pay attention to version compatibility.

```sql
CREATE OR REPLACE FUNCTION
  nspname.myfunc(arg1_ TEXT, arg2_ INTEGER)
  RETURNS VOID
LANGUAGE SQL
STABLE
PARALLEL SAFE
ROWS 1
RETURNS NULL ON NULL INPUT
AS $function$
SELECT 1;
$function$;
```

### Design for Extensibility

**Recommended**

- When designing the table, future expansion needs should be considered, and may reserve 1 ~ 3 fields in advance.

- For non-key columns which can change frequently, you can use `JSON` type.

### Pick Sensible Normalization Level

**Recommended**

- Allow proper denormalization to reduce multi-table joins and improve performance.

### Use New PostgreSQL Release

**Recommended**

- The new version has performance improvements, stability enhancements, and more new features.

- Take advantage of new features and reduce design complexity.

### Use Trigger Judiciously

**Recommended**

- Triggers increase the complexity and maintenance cost of the system and are discouraged.

## Index Rules

### Online Queries Must have Matching Indexes

**Required**

- All online queries must be indexed according to their access patterns, and full table scans are not allowed except for very few small tables.

- Indexes have a cost and are not allowed to create unused indexes.

### Index on Large Columns are Prohibited

**Required**

- The size of the indexed column cannot exceed 2KB (1/3 of the page capacity), and in principle, it is prohibited to exceed 64 characters.

- If there is a need for indexing large fields, you can consider taking a hash of the large fields and creating a function index. Or use other types of indexes (GIN).

### Explicit NULL Sorting Rules

**Required**

- If there is a sorting requirement on a nullable column, you need to explicitly specify in the query and index whether `NULLS FIRST` or `NULLS LAST`.

- Note that the default rule for `DESC` sorting is `NULLS FIRST`, i.e., `NULL` values appear at the top of the sort, which is usually not the expected behavior.

- The sort condition of the index must match the query, e.g., `CREATE INDEX ON tbl (id DESC NULLS LAST);`.

### Use GiST Indexes for Nearest Neighbor Queries

**Required**

- Traditional B-tree indexes do not provide good support for KNN problems and `GiST` indexes should be used.

### Use Functional Index

**Recommended**

- Any redundant columns that can be inferred from other columns in the same row can be replaced using a functional index.

- For statements that often use expressions as query conditions, expressions or functional indexes can be used to speed up queries.

- Typical scenarios: create a hash functional index on a large field and a reverse functional index for a text column that requires a left fuzzy query.

### Use Partial Index

**Recommended**

- Partial indexes can be used to reduce the size of the index and improve the efficiency of the query if the query conditions are fixed.

- If there are only a limited number of possible values for a column to be indexed in a query, you can also create several corresponding partial indexes.

### Use Range Index

**Recommended**

- For data whose values are linearly related to the storage order of the heap table, it is recommended to use the `BRIN` index if the usual query is a range query.

- Temporal data is one of the most typical scenarios with appending-only writes, `BRIN` indexes are more efficient.

### Watch out Cardinality of Composite Index

**Recommended**

- Put higher cardinality columns first.

## Query Rules

### Split Read and Write

**Required**

- In principle, write requests go to the primary and read requests go to the replica.

- Exception: Consistency guarantees are needed for read-after-write, or significant replication delays are detected.

### Split Fast and Slow

**Required**

- Queries that take less than 1 millisecond in production are called fast queries, and queries that take more than 1 second in production are called slow queries.

- Slow queries must be routed to offline databases, and the corresponding timeout must be set.

- The execution time of online query in production should be controlled within 1ms in principle.

- If the execution time of online query in production is over 10ms, it needs to be optimized before going online.

- Online queries should be configured with a timeout of 10ms or faster to avoid cascading failures.

- Online primary and replica should not allow large data pulling, the warehouse ETL program should pull data from offline read replica.

### Configure Timeout

**Required**

- Configure active timeouts for all statements, and actively cancel requests after the timeout to avoid cascading failures.

- Statements that are executed periodically must be configured with a timeout less than the execution cycle.

### Watch out Replication Delay

**Required**

- Applications must be aware of the replication delay between primary and replicas and properly handle situations where replication delay is outside of a reasonable range.

- Delays that are normally in the 0.1ms range can reach the order of ten minutes or even hours in extreme cases. The application can choose to either read from the primary, retry read, or report an error.

### Use Connection Pool

**Required**

- The application must access the database through a connection pool, connecting to pgbouncer on port 6432 instead of postgres on 5432.

- Note the difference between using a connection pool and a direct connection to the database, some features may not work (e.g. Notify/Listen) and there may be connection pollution issues.

### Prohibit Changing Connection Setting from a Connection Pool

**Required**

- It is prohibited to modify the connection setting when using a public connection pool, including modifying connection parameters, modifying search paths, changing roles, and changing databases.

- The connection must be completely destroyed after modification as a last resort. Putting a connection back into the connection pool after changing the setting can cause connection pollution to spread.

### Retry Connection

**Required**

- Queries can be killed due to concurrent contention, administrator commands, etc. Applications need to be aware of this and retry when necessary.

- Applications can trigger a circuit breaker to avoid a cascade failure in case of a large number of errors reported by the database. However, care should be taken to distinguish the error types.

### Reconnect

**Required**

- The connection may be aborted for various reasons and the application must have a reconnection mechanism.

- You can use `SELECT 1` as a heartbeat packet query to detect the presence of messages from the connection and periodically keep it alive.

### Prohibits DDL in Online Application

**Required**

- Don't bring surprise in your application code.

### Explicitly Specify Columns

**Required**

- Avoid using `SELECT *`, or using `*` in the `RETURNING` clause. Use a specific list of columns and do not return unused columns. Queries that use column wildcards are likely to have a column mismatch error when the table structure changes (e.g., new columns).

- Exception: Wildcards are allowed when the stored procedure returns table row type.

### Prohibit Full Table Scan

**Required**

- Exceptions: fixed small tables, very low frequency operations, very small tables/returned result sets (within a hundred records/hundred KB).

- Avoid using negation operators such as `!=`, `<>` negation operators on the first filter condition, which will result in a full table scan.

### Prohibit Long Waits in a Transaction

**Required**

- The transaction must be committed or rolled back as soon as possible after it is opened, and `IDLE IN transactions` longer than 10 minutes will be forced to kill.

- Applications should enable AutoCommit to avoid `BEGIN` followed by no paired `ROLLBACK` or `COMMIT`.

- Try to use the transaction manageer provided by the standard library, and do not control transactions manually if possible.

### Must Close the Cursor after Use.

**Required**

### Count Row Number

**Required**

- `count(*)` is the standard syntax for counting the number of rows, the presense of `NULL` values is irrelevant.

- `count(col)` counts the number of `non-NULL` rows in the col column. `NULL` values in the column are not counted.

- `count(distinct col)` counts the number of rows in column col, also ignoring `NULL` values, i.e. only the number of non-NULL distinct values are counted.

- `count(col1, col2)` counts multiple columns even if all the columns to be counted are empty, e.g. (NULL, NULL) are counted.

- `distinct (col1, col2))` counts multiple columns even if all the columns to be counted are empty, e.g. (NULL, NULL) are counted.

### Watch out NULL in Aggregation Function

**Required**

- All aggregation functions except `count` ignore `NULL` values, so when the input values are all `NULL`, the result is `NULL`. the exception is `count(col)`, which returns 0 in this case.

- If the aggregation function returns `NULL` is not the expected result, use `coalesce` to set the default value.

### Handle NULL with Caution

**Required**

- Clearly distinguish between `Zero` values and `NULL` values, using `IS NULL` for `NULL` equivalence and the regular `=` operator for `Zero` values.

- `NULL` as a function input parameter should have a type modifier, otherwise it will be impossible to identify which one to use for functions with overloads.

- Note the logic of comparing `NULL` values: any comparison operation involving `NULL` values results in `UNKNOWN`, and pay attention to the logic of `UNKNOWN` participation in Boolean operations:

  - or: `TRUE` or `UNKNOWN` will return `TRUE` because of logical short-circuit.
  - and: `FALSE` and `UNKNOWN` will return `FALSE` because of logical short-circuit.
  - Other cases as long as `UNKNOWN` appears, the result is `UNKNOWN`.

- Comparing `NULL` with any value, the result is `NULL`, e.g. `NULL = NULL` returns `NULL` instead of TRUE/FALSE.

- For equivalence comparison between `NULL` and `non-NULL` values, use `IS DISTINCT FROM`, to ensure that the comparison result is `non-NULL`.

- `NULL` and aggregation function: when the input value to the aggregation function is all `NULL`, the return result is `NULL`.

### Watch out Serial Gap

**Required**

- When using `Serial` type, `INSERT`, `UPSERT` and other operations will consume serial number, and the consumption will not be rolled back if the transaction fails.

### Use Prepared Statement for Repeated Query

**Recommended**

- Repeated queries should use a prepared statement to eliminate the CPU overhead of parsing SQL.

- The Prepared Statement modifies the connection state, so be aware of the effect of connection pooling on the prepared statement.

### Choose Proper Isolation Level

**Recommended**

- The default isolation level is read-committed, which is suitable for most simple read and write transactions. Normal transactions choose the lowest isolation level that meets their needs.

- For write transactions that require transaction-level consistency snapshots, use the repeatable read isolation level.

- For write transactions with strict correctness requirements, use the serializable isolation level.

- In the event of a concurrent conflict between the RR and SR isolation levels, aggressive retries should be performed depending on the type of error.

### Do not Use count for Existence Check

**Recommended**

- To determine if a column satisfies the condition, `SELECT 1 FROM tbl WHERE xxx LIMIT 1` is faster than `count`.
- Use `SELECT EXISTS(SELECT * FROM tbl WHERE xxx LIMIT 1)` to convert the existence result to a Boolean value.

### Use `RETURNING`

**Recommended**

- If the user needs to get the inserted, deleted or modified data immediately after, it is recommended to use the `RETURNING` clause to reduce the number of database interactions.

### Use `UPSERT` to Simplify Logic

**Recommended**

- When the business has an insert-fail-update sequence of operations, consider using `UPSERT` instead.

### Use Advisory Lock to Handle Hotspot

**Recommended**

- For very high frequency concurrent writes (spikes) to single row record, record ID should be locked using advisory lock.

- If high concurrent contention can be resolved at the application level, do not address it at the database level.

### Optimize `IN` Operator

**Recommended**

- Use `EXISTS` clause instead of the `IN` operator for better performance.

- For singular value comparision, use `= ANY(ARRAY[1,2,3,4])` instead of `IN (1,2,3,4)` for better performance.

- For row value type comparison, still use `IN`. Because clause like `WHERE (a, b) = ANY(ARRAY[(1, 2), (2, 3)])` won't hit index.
  Similar if the array is generated from a function like `= ANY (call_function())`.

### Avoid Left Fuzzy Search

**Recommended**

- Left fuzzy search `WHERE col LIKE '%xxx'` can not take advantage of the B-tree index, if necessary, use `reverse` expression functional index.

### Use Arrays instead of Temporary Tables

**Recommended**

- Consider using an array instead of a temporary table, for example when fetching the corresponding records for a series of IDs. `= ANY(ARRAY[1,2,3])` is better than the temporary table JOIN.

## Deployment Process

<HintBlock type="info">

You can use [Bytebase Change Workflow](/docs/change-database/change-workflow) to streamline and bookkeep the deployment process.

</HintBlock>

### Communication

**Required**

- Submitting deployment request by emailing to dba@example.com.

- Clear title: xx project needs to perform xx action on xx database.

- Clear objectives: which actions need to be performed on which database instance for each step and how to verify the results.

- Rollback plan: Any changes need to provide a rollback plan, and newly created objects also need to pair with cleanup scripts.

## Evaluation

### Communication

**Required**

- The online database deployment needs to go through several evaluation phases: R&D self-test, supervisor review, (optional) QA review, and DBA review.

- The self-test phase should ensure that the changes are executed correctly in the development and staging environment.

- If it is a new table, the number of records, the estimated daily data increment, and the estimated read/write volume should be given in advance.

- If it is a new function, a pressure test report should be given, or at least the average execution time should be given.

- If it is a schema migration, all upstream and downstream dependencies must be sorted out.

- The Technical Lead (TL) is responsible for the changes, and needs to evaluate and review the change.

- The DBA evaluates and reviews the deployment process and impact to the database.

### Deployment Window

**Required**

- No database change is allowed after 19:00. For urgent deployment, TL needs to request exception from CTO/Eng VP.

- Database Change confirmed by TL after 16:00 will be postponed to the next day for execution.

## Cluster Management

### Watch out Backup

**Required**

- Daily full backup and continously archive segement files.

### Watch out Transaction XID Wraparound

**Required**

- Pay attention to database/table ages, avoid [XID wraparound](https://www.postgresql.org/docs/current/routine-vacuuming.html).

### Watch out Decay and Bloat

**Required**

- Pay attention to table and index bloat, avoid performance degradation.

### Watch out Replication Delay

**Required**

- Monitor replication delay and be extra careful when using replication slots.

### Follow the Principle of Least Privilege

**Required**

### Use `CONCURRENT` to Create/Drop index

**Required**

- For production tables, indexes must be created concurrently using `CREATE INDEX CONCURRENTLY`.

### Prewarm Replica

**Required**

- Use `pg_prewarm`, or gradually onboard traffic.

### Perform Schema Change Judiciously

**Required**

- Before 11, you must use syntax without default values when adding new columns to avoid full table rewrites.
  After 11, [only volatile default value](https://www.postgresql.org/docs/current/ddl-alter.html#DDL-ALTER-ADDING-A-COLUMN) causes full table rewrites.

- When changing types, all functions that depend on the type should be rebuilt if necessary.

### Split Large Writes into Batches

**Recommended**

- Large write operations should be splitted into small batches to avoid generating large WALs at once.

### Optimize Data Loading

**Recommended**

- Turn off `autovacuum` and use `COPY` to load the data.

- Create constraints and indexes after loading the data.

- Increase `maintenance_work_mem` and `max_wal_size`.

- Execute the `VACUUM VERBOSE ANALYZE tbl` after loading the data.
