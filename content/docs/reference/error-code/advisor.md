---
title: Error Code for SQL Advisor
---

Error code for Bytebase SQL Advisor.

## General

<h3 id="0">0 - OK</h3>

Success

<h3 id="1">1 - Internal error</h3>

Something unexpected happened, you can open a [GitHub issue](https://github.com/bytebase/bytebase/issues) or [contact us](mailto:support@bytebase.com?subject=Got-internal-error).

<h3 id="2">2 - Schema review policy not found</h3>

Cannot find the schema review policy in a specific environment. Please [follow the doc](/docs/sql-review/review-policy/create-schema-review-policy) to create the policy.

## Compatibility

<h3 id="101">101 - DROP DATABASE</h3>

Applications usually specifies database in their connection string. Dropping the database will definitely break those applications.

<h3 id="102">102 - RENAME TABLE</h3>

Renaming the table will break the code referring that table.

<h3 id="103">103 - DROP TABLE</h3>

Dropping the table will break the code referring that table.

<h3 id="104">104 - RENAME COLUMN</h3>

Renaming the column will break the code referring that column.

<h3 id="105">105 - DROP COLUMN</h3>

Dropping the column will break the code referring that column.

<h3 id="106">106 - ADD PRIMARY KEY</h3>

Primary key requires the candidate key set has unique value and the chosen candidate key set might not meet this requirement.

<h3 id="107">107 - ADD UNIQUE KEY</h3>

Unique key requires the candidate key set has unique value and the chosen candidate key set might not meet this requirement.

<h3 id="108">108 - ADD FOREIGN KEY</h3>

The existing values on the candidate foreign key and the referenced key might not meet the referential requirements.

<h3 id="109">109 - ADD CHECK</h3>

The existing value might not meet the check requirement.

<h3 id="110">110 - ALTER CHECK</h3>

The existing value might not meet the check requirement.

<h3 id="111">111 - ALTER COLUMN</h3>

Some ALTER COLUMN change is backward incompatible such as changing the data type from VARCHAR to INT. On the other hand, some change is backward compatible such as changing the database type from INT to BIGINT, or adding a comment and etc. User should review the actual statement.

## Statement

<h3 id="201">201 - Statement syntax error</h3>

A syntax error in your SQL statement.

<h3 id="202">202 - Statement missing where</h3>

The SQL has no WHERE clause. Check [Require WHERE clause](/docs/sql-review/review-rules#statement.where.require) for details.

<h3 id="203">203 - Statement not select all</h3>

The SQL has `SELECT *`. Check [Disallow SELECT \*](/docs/sql-review/review-rules#statement.select.no-select-all) for details.

<h3 id="204">204 - Statement not allow leading wildcard like</h3>

The SQL has leading wildcard LIKE. Check [Disallow leading % in LIKE](/docs/sql-review/review-rules#statement.where.no-leading-wildcard-like) for details.

<h3 id="206">206 - Statement disallow COMMIT</h3>

The SQL has `COMMIT`. Check [Disallow COMMIT](/docs/sql-review/review-rules#statement.disallow-commit) for details.

<h3 id="207">207 - Statement redundant ALTER TABLE</h3>

The SQL has redundant `ALTER TABLE`. Check [Merge ALTER TABLE](/docs/sql-review/review-rules#statement.merge-alter-table) for details.

<h3 id="208">208 - Statement dry run failed</h3>

The SQL dry-run failed. Check [Dry run DML statements](/docs/sql-review/review-rules#statement.dml-dry-run) for details.

<h3 id="209">209 - Statement affected rows exceed limit</h3>

The SQL affected rows exceed the limit. Check [Limit affected rows](/docs/sql-review/review-rules#statement.affected-row-limit) for details.

<h3 id="210">210 - Statement add column with default</h3>

The SQL adds column with default value. Check [Disallow add column with default](/docs/sql-review/review-rules#statement.disallow-add-column-with-default) for details.

<h3 id="211">211 - Statement add check with validation</h3>

The SQL adds check with validation. Check [Add CHECK constraints with NOT VALID option](/docs/sql-review/review-rules#statement.add-check-not-valid) for details.

<h3 id="212">212 - Statement add NOT NULL</h3>

The SQL adds NOT NULL. Check [Disallow add NOT NULL constraints to an existing column](/docs/sql-review/review-rules#statement.disallow-add-not-null) for details.

## Naming

<h3 id="301">301 - Table naming convention mismatch</h3>

Mismatch the table naming convention in your schema review policy. Check [Table naming convention](/docs/sql-review/review-rules#naming.table) for details.

<h3 id="302">302 - Column naming convention mismatch</h3>

Mismatch the column naming convention in your schema review policy. Check [Column naming convention](/docs/sql-review/review-rules#naming.column) for details.

<h3 id="303">303 - Index naming convention mismatch</h3>

Mismatch the index naming convention in your schema review policy. Check [Index naming convention](/docs/sql-review/review-rules#naming.index.idx) for details.

<h3 id="304">304 - Unique key naming convention mismatch</h3>

Mismatch the unique key naming convention in your schema review policy. Check [Unique key naming convention](/docs/sql-review/review-rules#naming.index.uk) for details.

<h3 id="305">305 - Foreign key naming convention mismatch</h3>

Mismatch the foreign key naming convention in your schema review policy. Check [Foreign key naming convention](/docs/sql-review/review-rules#naming.index.fk) for details.

<h3 id="306">306 - Primary key naming convention mismatch</h3>

Mismatch the primary key naming convention in your schema review policy. Check [Primary key naming convention](/docs/sql-review/review-rules#naming.index.pk) for details.

<h3 id="307">307 - Auto-increment column naming convention mismatch</h3>

Mismatch the auto-increment column naming convention in your schema review policy. Check [Auto-increment column naming convention](/docs/sql-review/review-rules#naming.column.auto-increment) for details.

## Column

<h3 id="401">401 - Missing required columns</h3>

Cannot find the required columns defined in your schema review policy. Check [Enforce the required columns in each table](/docs/sql-review/review-rules#column.required) for details.

<h3 id="402">402 - Column cannot be null</h3>

The column cannot be `NULL`. Check [Columns no NULL value](/docs/sql-review/review-rules#column.no-null) for details.

<h3 id="403">403 - Change column type</h3>

The column type is changed. Check [Disallow change column type](/docs/sql-review/review-rules#column.disallow-change-type) for details.

<h3 id="404">404 - NOT NULL column with no default</h3>

The NOT NULL column has no default value. Check [Set DEFAULT value for NOT NULL columns](/docs/sql-review/review-rules#column.set-default-for-not-null) for details.

<h3 id="405">405 - Column not exists</h3>

The column does not exist. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="406">406 - Use CHANGE COLUMN statement</h3>

The column is changed with `CHANGE COLUMN`. Check [Disallow ALTER TABLE CHANGE COLUMN statements](/docs/sql-review/review-rules#column.disallow-change) for details.

<h3 id="407">407 - change column order</h3>

The column order is changed. Check [Disallow changing column order](/docs/sql-review/review-rules#column.disallow-changing-order) for details.

<h3 id="408">408 - Column has no comment</h3>

The column has no comment. Check [Column comment convention](/docs/sql-review/review-rules#column.comment) for details.

<h3 id="409">409 - Column comment too long</h3>

The column comment is too long. Check [Column comment convention](/docs/sql-review/review-rules#column.comment) for details.

<h3 id="410">410 - Auto-increment column is not integer</h3>

The auto-increment column is not an integer. Check [Use integer for auto-increment columns](/docs/sql-review/review-rules#column.auto-increment-must-integer) for details.

<h3 id="411">411 - Disabled column type</h3>

The column type is disabled. Check [Column type disallow list](/docs/sql-review/review-rules#column.disallow-list) for details.

<h3 id="412">412 - Column already exists</h3>

The column already exists. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="413">413 - Drop all columns</h3>

The column is dropped. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="414">414 - Set column charset</h3>

Set the column charset. Check [Disallow set charset for columns](/docs/sql-review/review-rules#column.disallow-set-charset) for details.

<h3 id="415">415 - Char length exceeds limit</h3>

The char length exceeds the limit. Check [Maximum CHAR length](/docs/sql-review/review-rules#column.maximum-character-length) for details.

<h3 id="416">416 - Auto-increment column initial value not match</h3>

The auto-increment column initial value does not match. Check [Auto-increment initial value](/docs/sql-review/review-rules#column.auto-increment-initial-value) for details.

<h3 id="417">417 - Auto-increment column is signed</h3>

The auto-increment column is signed. Check [Set unsigned attribute on auto-increment columns](/docs/sql-review/review-rules#column.auto-increment-must-unsigned) for details.

<h3 id="418">418 - Default current time column count exceeds limit</h3>

The default current time column count exceeds the limit. Check [Limit the count of current time columns](/docs/sql-review/review-rules#column.current-time-count-limit) for details.

<h3 id="419">419 - On update current time column count exceeds limit</h3>

The on update current time column count exceeds the limit. Check [Limit the count of current time columns](/docs/sql-review/review-rules#column.current-time-count-limit) for details.

<h3 id="420">420 - No default value</h3>

The column has no default value. Check [Require column default value](/docs/sql-review/review-rules#column.require-default) for details.

<h3 id="421">421 - Column is referenced by view</h3>

The column is referenced by view. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

## Engine

<h3 id="501">501 - Use InnoDB engine</h3>

Should se InnoDB as MySQL storage engine. Check [Require InnoDB](/docs/sql-review/review-rules#engine.mysql.use-innodb) for details.

## Table

<h3 id="601">601 - Table missing primary key</h3>

The table needs a primary key. Check [Require primary key](/docs/sql-review/review-rules#table.require-pk) for details.

<h3 id="602">602 - Table disallow foreign key</h3>

The table disallows the foreign key. Check [Disallow foreign key](/docs/sql-review/review-rules#table.no-foreign-key) for details.

<h3 id="603">603 - Table drop naming convention mismatch</h3>

The table name mismatches with the naming convention for drop table operation. Check [Drop table naming convention](/docs/sql-review/review-rules#table.drop-naming-convention) for details.

<h3 id="604">604 - Table not exists</h3>

The table does not exist. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="605">605 - Table has no comment</h3>

The table has no comment. Check [Table comment convention](/docs/sql-review/review-rules#table.comment) for details.

<h3 id="606">606 - Table comment too long</h3>

The table comment is too long. Check [Table comment convention](/docs/sql-review/review-rules#table.comment) for details.

<h3 id="607">607 - Table already exists</h3>

The table already exists. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="608">608 - Create table partition</h3>

Create table partition. Check [Disallow partition table](/docs/sql-review/review-rules#table.disallow-partition) for details.

<h3 id="609">609 - Table is referenced by views</h3>

The table is referenced by views. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

## Database

<h3 id="701">701 - Drop database restriction</h3>

Can only drop the database if there's no table in it. Check [Drop database restriction](/docs/sql-review/review-rules#database.drop-empty-database) for details.

<h3 id="702">702 - Not current database</h3>

The database in your SQL statement mismatches with the database in the catalog. Please check the statement to ensure the database name is correct.

<h3 id="703">703 - Database is deleted</h3>

The database is deleted. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

## Index

<h3 id="801">801 - Not use index</h3>

The query does not use any index.

<h3 id="802">802 - Index key number exceeds limit</h3>

The index key number exceeds the limit. Check [Limit the count of index keys](/docs/sql-review/review-rules#index.key-number-limit) for details.

<h3 id="803">803 - Index primary key type</h3>

The index primary key type is not allowed. Check [Limit key type for primary keys](/docs/sql-review/review-rules#index.pk-type-limit) for details.

<h3 id="804">804 - Index type no blob</h3>

The index type is not allowed. Check [Disallow BLOB and TEXT for index keys](/docs/sql-review/review-rules#index.type-no-blob) for details.

<h3 id="805">805 - Index exists</h3>

The index already exists. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="806">806 - Primary key exists</h3>

The primary key already exists. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="807">807 - Index empty keys</h3>

The index has no keys. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="808">808 - Primary key not exists</h3>

The primary key does not exist. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="809">809 - Index not exists</h3>

The index does not exist. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="810">810 - Incorrect index name</h3>

The index name is incorrect. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="811">811 - Spatial index key nullable</h3>

The spatial index key is nullable. Found in Bytebase's pre-execution checks, please confirm if there is a problem with the SQL.

<h3 id="812">812 - Duplicate column in index</h3>

The index has duplicate columns. Check [Disallow duplicate column in index keys](/docs/sql-review/review-rules#index.no-duplicate-column) for details.

<h3 id="813">813 - Index count exceeds limit</h3>

The index count exceeds the limit. Check [Index count limit](/docs/sql-review/review-rules#index.total-number-limit) for details.

<h3 id="814">814 - Create index unconcurrently</h3>

The index is created without CONCURRENTLY. Check [Create index concurrently](/docs/sql-review/review-rules#index.create-concurrently) for details.

## Charset

<h3 id="1001">1001 - Disabled charset</h3>

The charset is disabled. Check [Charset allow list](/docs/sql-review/review-rules#system.charset.allowlist) for details.

## DML

<h3 id="1101">1101 - Insert too many rows</h3>

The number of rows to be inserted exceeds the limit. Check [Limit the inserted rows](/docs/sql-review/review-rules#statement.insert.row-limit) for details.

<h3 id="1102">1102 - Update use limit</h3>

The UPDATE statement uses LIMIT. Check [Disallow LIMIT](/docs/sql-review/review-rules#statement.disallow-limit) for details.

<h3 id="1103">1103 - Insert use limit</h3>

The INSERT statement uses LIMIT. Check [Disallow LIMIT](/docs/sql-review/review-rules#statement.disallow-limit) for details.

<h3 id="1104">1104 - Update use order by</h3>

The UPDATE statement uses ORDER BY. Check [Disallow ORDER BY](/docs/sql-review/review-rules#statement.disallow-order-by) for details.

<h3 id="1105">1105 - Delete use order by</h3>

The DELETE statement uses ORDER BY. Check [Disallow ORDER BY](/docs/sql-review/review-rules#statement.disallow-order-by) for details.

<h3 id="1106">1106 - Delete use limit</h3>

The DELETE statement uses LIMIT. Check [Disallow LIMIT](/docs/sql-review/review-rules#statement.disallow-limit) for details.

<h3 id="1107">1107 - Insert not specify column</h3>

The INSERT statement does not specify columns. Check [INSERT statements must specify columns](/docs/sql-review/review-rules#statement.insert.must-specify-column) for details.

<h3 id="1108">1108 - Insert use order by rand</h3>

The INSERT statement uses ORDER BY RAND. Check [Disallow ORDER BY RAND in INSERT statements](/docs/sql-review/review-rules#statement.insert.disallow-order-by-rand) for details.

## Collation

<h3 id="1201">1201 - Disabled collation</h3>

The collation is disabled. Check [Collation allow list](/docs/sql-review/review-rules#system.collation.allowlist) for details.

## Comment

<h3 id="1301">1301 - Comment too long</h3>

The comment is too long. Check [Comment length limit](/docs/sql-review/review-rules#system.comment.length) for details.