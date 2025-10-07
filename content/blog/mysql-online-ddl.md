---
title: 'MySQL Online DDL: A Practical Guide'
author: Adela
updated_at: 2025/10/07 18:00
feature_image: /content/blog/mysql-online-ddl/cover.webp
tags: Explanation
description: "Introduction to MySQL Online DDL and its three algorithms: INSTANT, INPLACE, and COPY"
---

Database schemas evolve constantly as applications grow and requirements change. Traditional schema modifications require downtime, disrupting user experience and causing revenue loss. MySQL's Online DDL solves this problem by allowing schema changes while the database remains operational.

## Three Algorithms: INSTANT, INPLACE, and COPY

MySQL uses three algorithms for schema changes, each with different performance characteristics and operation support.

### INSTANT: The Fastest Option

**INSTANT** applies changes instantly by modifying only table metadata. It requires no data copying, minimal resources, and works perfectly with replication. However, it supports only specific operations like adding columns with default values or modifying enums.

### INPLACE: The Balanced Approach

**INPLACE** modifies tables directly without creating temporary copies. It allows concurrent DML operations (INSERT, UPDATE, DELETE) during execution and supports more operations than INSTANT, including index creation and column drops. The trade-off is higher resource consumption.

### COPY: The Traditional Method

**COPY** creates a new table, copies all data, then swaps tables. It's the slowest method but supports all schema changes, including data type modifications. Use only when INSTANT and INPLACE aren't available.

## Operation Support Matrix

| Operation | INSTANT | INPLACE | COPY |
| :--- | :---: | :---: | :---: |
| **Adding a Column** | ✅ * | ✅ | ✅ |
| **Dropping a Column** | ✅ * | ✅ | ✅ |
| **Renaming a Column** | ✅ * | ✅ | ✅ |
| **Changing Data Type** | ❌ | ❌ | ✅ |
| **Adding Secondary Index** | ❌ | ✅ | ✅ |
| **Dropping Index** | ❌ | ✅ | ✅ |
| **Adding Primary Key** | ❌ | ✅ * | ✅ |
| **Dropping Primary Key** | ❌ | ❌ | ✅ |
| **Adding Foreign Key** | ❌ | ✅ | ✅ |

*Conditions apply. See [MySQL documentation](https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl-operations.html) for details.*

## Key Limitations

**Resource Impact**: INPLACE operations consume significant CPU, memory, and I/O, potentially affecting database performance on busy servers.

**Replication Lag**: The biggest limitation is replication behavior. An INPLACE operation taking 3 hours on the primary will stall replication for 3 hours on each replica, creating massive lag.

**Locking Issues**: Despite being "online", metadata locks can still block other DDL operations and some DML statements.

**Limited INSTANT Support**: Most complex operations like data type changes, index additions, and primary key modifications aren't supported by INSTANT.

## Best Practices

**Choose Wisely**: Use INSTANT when possible, INPLACE when necessary, and COPY as a last resort.

**Test First**: Always test schema changes in staging environments that mirror production.

**Monitor Performance**: Watch CPU, memory, and I/O usage during operations.

**Consider Third-Party Tools**: For complex migrations or strict availability requirements, tools like `gh-ost` or `pt-online-schema-change` offer better control and replication handling.

**Plan for Replication**: In replicated environments, consider running changes individually on each server or using external tools to avoid lag.

## Conclusion

MySQL Online DDL provides valuable capabilities for schema evolution, but understanding its limitations is crucial. INSTANT operations are ideal when supported, while INPLACE operations require careful resource planning. For mission-critical environments, combining native features with third-party tools often provides the best balance of safety and efficiency.