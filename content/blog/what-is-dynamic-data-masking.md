---
title: 'What is Dynamic Data Masking (DDM)'
author: Tianzhou
updated_at: 2026/04/02 09:00
feature_image: /content/blog/what-is-dynamic-data-masking/cover.webp
tags: Explanation
featured: true
description: 'Dynamic Data Masking (DDM) protects sensitive data in real-time by dynamically altering the data returned to the application or user without changing the data at rest'
---

Dynamic Data Masking (DDM) protects sensitive data in real-time by dynamically altering the database records returned to the application or user without changing the data at rest.

![ddm](/content/blog/what-is-dynamic-data-masking/dynamic-data-masking.webp)

DDM contrasts with Static Data Masking (SDM). While SDM involves creating a permanently altered, non-reversible copy of the original data, DDM modifies the data on-the-fly as it is accessed in real-time. This dynamic approach ensures that sensitive data remains protected during query execution without changing the underlying data at rest.

## When to Use Dynamic Data Masking vs Static Data Masking

Static Data Masking (SDM) creates sanitized copies of production data for dev/test environments. DDM is different — it masks data in real-time in production, controlling what each user sees based on their role and permissions. The underlying data stays untouched.

| | Static Data Masking | Dynamic Data Masking |
|---|---|---|
| **Environment** | Non-production (dev, test, staging) | Production |
| **Data altered?** | Yes — permanent copy | No — masked on-the-fly |
| **Use case** | Safe test data | Role-based access control |

## What Makes Dynamic Data Masking Hard

DDM has to make real-time decisions about what each user sees. The complexity comes from the number of variables involved:

- **User role and identity** — a DBA sees unmasked data, an analyst sees partial masks, a contractor sees full masks. The same query returns different results depending on who runs it.
- **Temporary access** — an on-call engineer needs unmasked access to debug a production incident, then the access should expire.
- **Column-level granularity** — an `email` column might need partial masking while a `phone` column needs full masking, even in the same table.
- **Multiple databases and environments** — masking rules in production differ from staging. If you run MySQL, PostgreSQL, and Oracle, each has different (or no) native DDM support.
- **Masking algorithm choice** — partial masking keeps data useful for debugging (`john@****`), but full masking or hashing is needed for compliance. Picking the wrong algorithm makes the data either too exposed or too useless.
- **Performance** — masking happens on every query at runtime. A poorly implemented DDM layer adds latency to every SELECT.

## Which Databases Support Dynamic Data Masking

| Databases  | Supported                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------- |
| Oracle     | ✅ [Link](https://www.oracle.com/security/database-security/data-masking/)                          |
| SQL Server | ✅ [Link](https://learn.microsoft.com/en-us/sql/relational-databases/security/dynamic-data-masking) |
| BigQuery   | ✅ [Link](https://cloud.google.com/bigquery/docs/column-data-masking-intro)                         |
| Snowflake  | ✅ [Link](https://docs.snowflake.com/en/user-guide/security-column-ddm-intro)                       |
| MySQL      | ❌                                                                                                  |
| PostgreSQL | ❌                                                                                                  |

Mainstream commercial databases all support DDM. On the other hand, neither MySQL nor PostgreSQL, the 2 most popular open-source databases support DDM out-of-the-box. For those supported databases, DDM is exposed via the extended SQL syntax. Taking Snowflake as
an example:

```sql
CREATE OR REPLACE MASKING POLICY email_mask AS (val string) RETURNS string ->
  CASE
    WHEN CURRENT_ROLE() IN ('ANALYST') THEN val
    ELSE '*********'
  END;

-- apply masking policy to a table column
ALTER TABLE IF EXISTS user_info MODIFY COLUMN email SET MASKING POLICY email_mask;
```

Database engines only provide masking primitives. Holistically configuring masking policies for an entire organization — across multiple databases, environments, and user roles — is still a big challenge. For database-specific guides, see [Data Masking for MySQL](/blog/mysql-data-masking/) and [Data Masking for PostgreSQL](/blog/postgres-data-masking/). For Snowflake specifically, see [Snowflake Dynamic Data Masking and Alternatives](/blog/snowflake-dynamic-data-masking-and-alternatives/).

## How Bytebase Handles Dynamic Data Masking

[Bytebase](https://docs.bytebase.com/security/data-masking/overview/) implements DDM at the application layer rather than relying on database-native features. All queries through Bytebase's SQL Editor are masked in real-time based on policies you define. This is particularly valuable for MySQL and PostgreSQL, which have no native DDM support.

### Supported databases

Bytebase DDM works with MySQL, PostgreSQL, Oracle, TiDB, and others — the same masking policies apply across all of them, regardless of whether the engine has native DDM.

### How masking is configured

Bytebase uses a three-level policy system:

1. **Global masking rules** — workspace admins apply batch masking to columns matching a name pattern (e.g., all columns named `ssn` or `email` across every database)
2. **Column-level masking** — project owners set masking on specific table columns
3. **Masking exemptions** — grant specific users access to unmasked data when needed

Precedence: exemptions > global rules > column masking.

Policies are organized around **semantic types** — you classify columns (e.g., "PII-email", "PII-phone") and attach a masking algorithm to the type. Changing one semantic type updates masking for all columns tagged with it.

### Masking algorithms

Five built-in algorithms:

| Algorithm | Example | Use case |
|-----------|---------|----------|
| Full mask | `123456789` → `*` | Completely hide the value |
| Range mask | `john@example.com` → `john@****` | Preserve prefix for usability |
| Inner mask | `123456` → `12**56` | Show edges, hide middle |
| Outer mask | `123456` → `**34**` | Show middle, hide edges |
| MD5 mask | `value` → `2063c1608d6e0baf80249c42e2be5804` | Irreversible hash for analytics |

### Infrastructure as code

Masking policies can be managed via [Bytebase's Terraform provider](https://docs.bytebase.com/tutorials/manage-data-masking-with-terraform/) — define semantic types, global rules, and column masking in HCL and apply across environments.

### Availability

Dynamic Data Masking is available on the [Enterprise plan](https://www.bytebase.com/pricing/). DDM is one part of Bytebase's broader [database access control](/blog/database-access-control-best-practices/) capabilities, which also include role-based access, [just-in-time access](/blog/just-in-time-database-access/), and [audit logging](/blog/database-audit-logging/).

## FAQ

**What is Dynamic Data Masking?**

Dynamic Data Masking (DDM) protects sensitive data by altering query results in real-time based on user roles and policies, without changing the data at rest. Unlike static data masking, which creates a permanent sanitized copy, DDM applies masking on-the-fly during query execution.

**Which databases support Dynamic Data Masking natively?**

Oracle, SQL Server, BigQuery, and Snowflake have built-in DDM features. MySQL and PostgreSQL do not support DDM natively. Bytebase provides application-layer DDM for MySQL, PostgreSQL, Oracle, TiDB, and others, using the same policies across all engines.

**How does Bytebase implement DDM for MySQL and PostgreSQL?**

Bytebase applies masking at the application layer when queries run through its SQL Editor. No database extensions, views, or plugins are required. You define masking policies centrally in Bytebase, and they apply consistently across all connected databases.

**What is the difference between Dynamic Data Masking and Static Data Masking?**

Static Data Masking (SDM) creates a permanent, altered copy of production data for use in non-production environments. Dynamic Data Masking (DDM) modifies data on-the-fly as it is queried, without changing the underlying data. SDM is for dev/test environments; DDM is for production access control.
