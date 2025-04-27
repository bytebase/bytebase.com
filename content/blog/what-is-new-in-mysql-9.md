---
title: "What's New in MySQL 9 - a DBA's Perspective"
author: Tianzhou
updated_at: 2025/04/26 12:00
feature_image: /content/blog/what-is-new-in-mysql-9/cover.webp
tags: Industry
description: 'Overview of MySQL 9 features with spicy comments'
---

<HintBlock type="info">

This post is maintained by Bytebase, an open-source database DevSecOps tool that can manage MySQL. We
will constantly update this post to include the latest MySQL 9.x releases.

</HintBlock>

| Update History | Comment          |
| -------------- | ---------------- |
| 2025/04/26     | Initial version. |

## Release Timeline

- **MySQL 9.0.0**: July 1, 2024 (Innovation Release) - _Removed from distribution due to critical bug_
- **MySQL 9.0.1**: Released as replacement for 9.0.0
- **MySQL 9.1.0**: October 15, 2024 (Innovation Release)
- **MySQL 9.2.0**: January 21, 2025 (Innovation Release)
- **MySQL 9.3.0**: April 15, 2025 (Innovation Release)

This post provides a comprehensive overview of what's new in the entire MySQL 9.x series (9.0, 9.1, 9.2, and 9.3), organized by edition type and including notable bug fixes and dropped features.

## MySQL Community New Features

### VECTOR Type Support (9.0)

MySQL 9.0 introduced a new `VECTOR` data type, which is a timely addition for applications working with vector data, such as machine learning and AI applications.

**DBA Note:** _First-generation implementation with significant limitations - can't be used as keys and has limited function compatibility. Don't expect performance to match dedicated vector databases yet._

#### Key Capabilities

- A data structure consisting of a list of entries (4-byte floating-point values)
- Expression as either a binary string value or a list-formatted string
- Declaration with a maximum length or number of entries (in parentheses)
- Default maximum length of 2048, with an absolute maximum of 16383

#### Vector Functions

MySQL 9.0 includes several functions for working with vector data:

- `VECTOR_DIM()`: Returns the length of a vector
- `STRING_TO_VECTOR()` (alias: `TO_VECTOR()`): Converts a list-formatted representation to binary string representation
- `VECTOR_TO_STRING()` (alias: `FROM_VECTOR()`): Converts binary string representation to list-formatted representation
- Vector comparison operators for equality testing

### Enhanced Foreign Key Constraints (9.0)

MySQL 9.0 enhances foreign key handling with long-waited improvements to standards compliance and usability.

**DBA Note:** _This fixes long-standing behavior that should have worked correctly years ago. Test carefully when upgrading as applications that relied on the previous broken behavior may now encounter constraint violations._

#### Improvements

- MySQL now enforces inline foreign key specifications, which were previously accepted by the parser but ignored
- MySQL 9.0 also accepts implicit references to parent table primary key columns
- Multiple foreign key constraint definitions in a single CREATE TABLE statement are now properly handled

### Saving JSON Output from EXPLAIN ANALYZE (9.0)

MySQL 9.0 provides support for saving the output from EXPLAIN ANALYZE into a user variable.

**DBA Note:** _Useful for automated query analysis, but you'll still need to build your own tools to make practical use of the JSON output. Would have been nice to include helper functions for common analysis tasks._

### Trigger Handling Optimization (9.1)

- Previously, for tables with triggers, the triggers were fully parsed and loaded into memory every time the table was accessed, causing high resource usage
- MySQL 9.1 divides trigger parsing and loading into two separate phases:
  - First phase: Only reads trigger metadata (stored once and shared between instances)
  - Second phase: Actual parsing and execution (only performed for operations that modify table data)
- New system variable `table_open_cache_triggers` controls the maximum number of open tables with fully loaded triggers
- New status variables track cache usage for tables with triggers

### Optimizer Improvements (9.2-9.3)

- **9.2**: Fixed performance issue with hash joins that spent unreasonably high time in `pack_rows::RequestRowId()`
- **9.2**: `EXPLAIN FORMAT=TREE` now shows the clustered primary key scan for RowID-Ordered Retrieval (ROR) intersection plans
- **9.3**: Extended the `subquery_to_derived` optimization to support more comparison operations
- **9.3**: Now supports all comparison operations (`>ANY`, `>=ANY`, `<ANY`, `<=ANY`, `>ALL`, `>=ALL`, `<ALL`, `<=ALL`, `=ANY`, `<>ALL`)
- **9.3**: Transformation now supported in both `SELECT` and `WHERE` clauses

### Performance Schema Enhancements (9.1-9.3)

- **9.1**: Improved OpenTelemetry support for exporting telemetry logs to OpenTelemetry backends
- **9.1**: Added ability to enable/disable Telemetry meters from command line or configuration file
- **9.3**: Added ability to configure network namespace for telemetry endpoints on Linux platforms
- **9.3**: Added new system variables for telemetry network namespace configuration

## MySQL Enterprise New Features

### JavaScript Stored Programs (9.0+)

MySQL 9.0 Enterprise Edition introduced support for stored programs written in JavaScript through the Multilingual Engine Component (MLE). This feature has been continuously enhanced in subsequent releases.

**DBA Note:** _While this opens up database programming to JavaScript developers, expect potential performance overhead compared to native SQL stored procedures. Monitor memory usage carefully in production._

#### Key Capabilities in 9.0

- Support for both stored procedures and stored functions written in JavaScript
- Conformance to the ECMAScript 2023 Specification
- Strict mode by default (cannot be disabled)
- All standard ECMAScript library objects (`Object`, `Function`, `Math`, `Date`, `String`, etc.)
- Support for `console.log()` and `console.error()` for debugging

#### JavaScript Enhancements in 9.1-9.3

- **9.2**: Added support for MySQL `ENUM` and `SET` types as arguments of JavaScript stored routines
- **9.2**: Added support for accessing user-defined functions, procedures, and variables from JavaScript routines
- **9.2**: Implemented JavaScript MySQL transaction API for actions like `START TRANSACTION`, `COMMIT`, `ROLLBACK`, and `SET AUTOCOMMIT`
- **9.2**: Added support for reusable JavaScript libraries with new SQL statements (`CREATE LIBRARY`, `DROP LIBRARY`, `SHOW CREATE LIBRARY`)
- **9.3**: Added full support for the `DECIMAL` type (including its alias `NUMERIC`) in JavaScript stored programs
- **9.3**: Added support for the JavaScript `Intl` global object for localization of numbers, dates, and other values
- **9.3**: Enhanced `ALTER PROCEDURE` and `ALTER FUNCTION` to accept a `USING` clause to add, replace, or remove libraries
- **9.3**: Enhanced `mle_session_reset()` function with optional string argument to clear `stderr`, `stdout`, or both
- **9.3**: Upgraded the MLE component to use GraalVM Truffle version 24.2.0

### Replication Enhancements (9.1-9.3)

- **9.1**: Added Replication Applier Metrics component, providing statistical information about replication formerly logged in the error log
- **9.3**: Added Group Replication Primary Election component, enabling specification of the most-up-to-date selection method for choosing a new primary during failover
- **9.3**: Fixed issues in the Flow Control Statistics component

### MySQL Option Tracker (9.1-9.3)

- **9.1**: Initial implementation
- **9.2**: Added ability to provide usage information about binary log, group replication, and server replica usage
- **9.3**: Added support for tracking the traditional MySQL Optimizer and MySQL Hypergraph Optimizer
- **9.3**: Each feature that supports Option Tracker now provides a global status variable

## Noticeable Bugs Fixed

### Critical InnoDB Server Restart Issue (9.0.1)

**Bug #36808732 (Fixed in MySQL 9.0.1)**

A critical issue in MySQL 9.0.0 caused the server to fail to restart after creating a large number of tables (8001 or more). This bug was so severe that it led to the removal of MySQL 9.0.0 from distribution, with users advised to upgrade directly to MySQL 9.0.1 instead.

**DBA Note:** _A reminder of why you should never deploy .0 releases to production. This kind of fundamental issue making it to GA release raises questions about testing procedures._

### Improved InnoDB Tablespace File Scan Performance (9.0.1)

**Bug #110402, Bug #35200385 (Fixed in MySQL 9.0.1)**

MySQL 9.0.1 includes improvements to tablespace file scan performance at startup, which can reduce server startup times, especially for installations with many tablespaces.

**DBA Note:** _Welcome improvement for environments with many tablespaces, but startup times will still be noticeably slower than competing databases with large numbers of tables._

### Group Replication CREATE TABLE ... SELECT Fix (9.0.1)

**Bug #36784284 (Fixed in MySQL 9.0.1)**

Running a `CREATE TABLE ... SELECT` statement on a source coming from an asynchronous channel to Group Replication previously led to errors on the replica. This issue has been resolved in MySQL 9.0.1.

**DBA Note:** _Group Replication continues to have edge cases and reliability issues. Test thoroughly with your specific workload before deploying to production._

### Performance Schema Service Thread Exposure (9.3)

Fixed issue where the `PERFORMANCE_SCHEMA` service thread v7 was not exposed, preventing its use by components.

## Features Removed in MySQL 9.0

MySQL 9.0 has removed several features that were present in previous versions. Applications using these features should be updated to use alternatives.

### Authentication Plugin Removals

**mysql_native_password Plugin**

The `mysql_native_password` authentication plugin, which was deprecated in MySQL 8.0, has been completely removed in MySQL 9.0. The server now rejects `mysql_native` authentication requests from older client programs that do not have `CLIENT_PLUGIN_AUTH` capability.

**DBA Note:** _This will break connections from many legacy applications and tools. Plan for significant connection string updates across your environment when upgrading._

**Related Removals:**

Due to this change, the following server options and variables have also been removed:

- The `--mysql-native-password` server option
- The `--mysql-native-password-proxy-users` server option
- The `default_authentication_plugin` server system variable

### Storage Engine Removals

Several storage engines have been removed in MySQL 9.0:

- `ARCHIVE` storage engine
- `BLACKHOLE` storage engine
- `FEDERATED` storage engine
- `MEMORY` storage engine
- `MERGE` storage engine
- `performance_schema` and any other storage engine
- `TempTable` and any other storage engine

**DBA Note:** _Expected house cleanup. The removal of MEMORY engine could be concerning for high-performance temporary tables. You'll need to rethink some performance optimization strategies that relied on these specialized engines._

### Important Changes in MySQL 9.3

- Beginning with MySQL 9.3, it is no longer possible to downgrade between individual MySQL Innovation series releases, even within the same series
  - For example, after upgrading to MySQL 9.3.1 (if released), it would not be possible to downgrade back to MySQL 9.3.0

## Is It Worth Upgrading from MySQL 8.0 to 9.0?

When considering whether to upgrade from MySQL 8.0 to MySQL 9.0, it's valuable to compare this transition with the previous major upgrade from MySQL 5.7 to 8.0.

### Scale of Changes

**MySQL 5.7 to 8.0 Upgrade:**

- Represented a fundamental architectural shift with the introduction of the data dictionary
- Completely changed authentication defaults (from mysql_native_password to caching_sha2_password)
- Added major new features like document store, window functions, CTEs, and JSON enhancements
- Introduced InnoDB improvements including auto-increment persistence and undo tablespaces
- Changed default character set from latin1 to utf8mb4

**MySQL 8.0 to 9.0 Upgrade:**

- More evolutionary than revolutionary compared to the 5.7 to 8.0 transition
- Focused on specific feature additions (JavaScript stored programs, VECTOR type) rather than core architectural changes
- Continues the removal of legacy components (storage engines) started in 8.0
- Maintains the same authentication model and character set defaults

**DBA Note:** _The 8.0 to 9.0 upgrade is less disruptive than the 5.7 to 8.0 transition was. The 5.7 to 8.0 upgrade was one of the most challenging in MySQL history due to fundamental architectural changes, while 9.0 builds on the foundation established in 8.0._

### Migration Challenges

**MySQL 5.7 to 8.0 Upgrade Challenges:**

- Required extensive pre-upgrade checks for incompatibilities
- Needed careful handling of the authentication plugin change
- Required addressing deprecated SQL modes and syntax
- Demanded thorough testing of applications due to changes in query optimizer behavior
- Often required character set conversions from latin1 to utf8mb4

**MySQL 8.0 to 9.0 Upgrade Challenges:**

- Still requires following the "no skipping versions" best practice
- Needs verification of applications that rely on removed storage engines
- Requires less extensive pre-upgrade checks compared to 5.7 to 8.0
- Maintains backward compatibility for most application code

**DBA Note:** _The removal of several storage engines in 9.0 is the most significant migration challenge, but only affects applications specifically using ARCHIVE, BLACKHOLE, FEDERATED, MEMORY, or MERGE engines. Most modern applications using InnoDB will face minimal disruption._

### Performance Considerations

**MySQL 5.7 to 8.0 Performance Changes:**

- Generally improved performance for most workloads
- Some initial performance regressions reported for specific use cases
- Significant improvements in high-concurrency environments
- Better utilization of modern hardware

**MySQL 8.0 to 9.0 Performance Changes:**

- No fundamental performance architecture changes
- Specific optimizations for certain query patterns
- VECTOR type adds capabilities for machine learning applications
- No major performance regressions reported

**DBA Note:** _Unlike the 5.7 to 8.0 upgrade which sometimes resulted in unexpected performance changes requiring tuning, the 9.0 upgrade appears to maintain performance characteristics similar to 8.0 with incremental improvements._

### When to Upgrade to MySQL 9.0

The upgrade from MySQL 8.0 to 9.0 represents a more incremental improvement compared to the transformative jump from 5.7 to 8.0. For most users, the decision to upgrade should be driven by specific feature requirements rather than a general need to stay current.

Unlike the 5.7 to 8.0 transition—which became increasingly urgent as 5.7 approached its end-of-life—the move to 9.0 is more optional, especially for those on the 8.0 LTS track, which will continue to be supported for years to come.

If you're currently on MySQL 8.0 LTS and don't require any of the new features introduced in 9.0, there's little urgency to upgrade. It's also worth noting that the MySQL 9.x family has not yet announced an LTS release. For this reason, we recommend holding off on upgrading until an LTS version is officially announced.

## References

1. [MySQL 9.0 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/9.0/en/)
2. [MySQL 9.1 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/9.1/en/)
3. [MySQL 9.2 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/9.2/en/)
4. [MySQL 9.3 Release Notes](https://dev.mysql.com/doc/relnotes/mysql/9.3/en/)
