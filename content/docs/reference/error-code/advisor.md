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

## Column

<h3 id="401">401 - Missing required columns</h3>

Cannot find the required columns defined in your schema review policy. Check [Enforce the required columns in each table](/docs/sql-review/review-rules#column.required) for details.

<h3 id="402">402 - Column cannot be null</h3>

The column cannot be `NULL`. Check [Columns no NULL value](/docs/sql-review/review-rules#column.no-null) for details.

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

## Database

<h3 id="701">701 - Drop database restriction</h3>

Can only drop the database if there's no table in it. Check [Drop database restriction](/docs/sql-review/review-rules#database.drop-empty-database) for details.

<h3 id="702">702 - Not current database</h3>

The database in your SQL statement mismatches with the database in the catalog. Please check the statement to ensure the database name is correct.
