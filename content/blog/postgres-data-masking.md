---
title: Data Masking for PostgreSQL Databases
author: Mila
published_at: 2023/11/21 21:21:21
feature_image: /content/blog/postgres-data-masking/banner.webp
tags: Explanation
featured: true
description: Comparing PostgreSQL data masking solutions - PostgreSQL Anonymizer and Bytebase Dynamic Data Masking.
---

Data Masking is a widely employed approach to safeguarding sensitive data, like credit card details, Social Security Numbers (SSNs), and addresses. And sometimes, masking data is much more than just keeping your and your customers' data secure – in some cases it is required by law, the most famous example is GDPR.

Various methods of data masking, such as substitution, shuffling, and redaction, exist and serve different purposes. Masking sensitive data enables organizations to reduce the likelihood of data breaches and unauthorized access, while still maintaining the ability to work with realistic data for tasks like development, testing, and analytics.

## PostgreSQL Anonymizer

![_](/content/blog/postgres-data-masking/postgresql-anonymizer.webp)

[PostgreSQL Anonymizer](https://www.postgresql.org/about/news/postgresql-anonymizer-10-privacy-by-design-for-postgres-2452/) is a community extension that can add data masking capabilities with different masking options and methods to PostgreSQL.

It stores masking configuration in [PostgreSQL Security Label](https://www.postgresql.org/docs/current/sql-security-label.html).

### Dynamic Masking

Dynamic Masking works by declaring a role as a "MASKED" one as well as the masking rules. The users granted the "MASKED" role won't be able to access original data, while other roles can still do so. There are various masking functions available, and you can even write your own rules.

![_](/content/blog/postgres-data-masking/dynamic-masking.webp)

There are certain limitations to this method, for examle, as mentioned [in their docs](https://postgresql-anonymizer.readthedocs.io/en/latest/dynamic_masking/#limitations), there could be issues if you use GUIs such as DBeaver or pgAdmin, and Dynamic Masking could be very slow with certain queries. Additionally, different views are needed for different masking variations, which again, quickly becomes unmanageable as the roles change or underlying tables and vairations increase.

### Static Masking

PostgreSQL Anonymizer also supports Static Masking, which directly transforms the original dataset directly. You can replace original data with fake ones, add noise, or shuffle data to hide sensitive data.

Note that this method will destroy the original data and is a slow process. So think twice before you use static masking. The principle of static masking is to update all lines of all tables containing at least one masked column. This basically means that PostgreSQL will rewrite all the data on disk.

## Bytebase Dynamic Data Masking

![_](/content/blog/mysql-data-masking/bytebase-masking.webp)

[Bytebase Dynamic Data Masking](/docs/security/data-masking/overview/) doesn't depend on PostgreSQL views and users. It manages the masking policies and grants inside Bytebase. Masking policy is applied when user queries from the SQL Editor.

![_](/content/blog/mysql-data-masking/bytebase-sql-editor.webp)

Bytebase Dynamic Data Masking consists of the following components:

1. Global Masking Rule: `Workspace Admin` and `DBA` can apply masking levels in batch, e.g. all columns named as "email" are masked at "Partial" masking level. You can also easily change masking policy without having to reapply the masking policy to thousands of columns, and the hassle of maintaining views is saved.

![_](/content/blog/mysql-data-masking/bytebase-global-masking.webp)

2. Column Masking Rule: `Workspace Admin` and `DBA` can set table columns as different masking levels. Column masking rule takes precedence over the global masking rule.

![_](/content/blog/mysql-data-masking/bytebase-column-level-masking.webp)

3. Access Unmasked data: for the masked content, `Workspace Admin` and `DBA` can grant specific users permission to access unmasked data.

![_](/content/blog/mysql-data-masking/bytebase-masking-grant-access.webp)

_`Workspace Admin` and `DBA` here are [roles](/docs/concepts/roles-and-permissions/) in Bytebase._

## Comparison Table

|               | PostgreSQL Anonymizer                      | Bytebase Dynamic Data Masking                               |
| ------------- | ------------------------------------------ | ----------------------------------------------------------- |
| Compatibility | Requires `postgresql_anonymizer` extension | All PostgreSQL distributions ⭐️                            |
| Enforced at   | Database self ⭐️                          | Bytebase SQL Editor                                         |
| Features      | Basic                                      | Advanced with granular masking policy and access grants ⭐️ |
| Price         | Free ⭐️                                   | Paid                                                        |

PostgreSQL Anonymizer's advantage is that it can directly be implemented in the database itself. Thus data masking rules are enforced regardless of how queries are sent to the database. For Bytebase Dynamic Data Masking, queries must go through SQL Editor to be enforced.

The advantage of Bytebase Dynamic Data Masking is its compatibility with all PostgreSQL distributions, feature-rich masking policy and access grants. As long as team can be enforced to query databases via Bytebase [SQL Editor](/sql-editor) (which is desired from the management perspective), then Bytebase Dynamic Data Masking is a perfect choice.

---

You can try Bytebase Dynamic Data Masking following [this tutorial](/docs/tutorials/data-masking/). If you encounter any issues, or need a helping hand, feel free to join our [Discord](https://discord.com/invite/huyw7gRsyA) channel!
