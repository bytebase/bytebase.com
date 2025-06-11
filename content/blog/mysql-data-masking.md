---
title: Data Masking for MySQL Databases
author: Mila
updated_at: 2023/10/27 21:21:21
feature_image: /content/blog/mysql-data-masking/banner.webp
tags: Explanation
featured: true
description: Compare MySQL data masking solutions. MySQL Enterprise Data Masking, Percona Data Masking Plugin and Bytebase Dynamic Data Masking.
---

Data Masking is a technique used to secure sensitive data such as credit card information, SSNs, addresses etc. for situations where the data is being shared or used for testing purposes.

There are several methods of data masking, including substitution, shuffling, and redaction, and they are useful in different scenarios. By masking sensitive data, organizations can minimize the risk of data breaches and unauthorized access while still being able to use realistic data for development, testing, and analytics purposes.

## MySQL Enterprise Data Masking

Data Masking is available exclusively in the MySQL Enterprise edition [as a plugin](https://dev.mysql.com/doc/refman/8.0/en/data-masking-plugin-usage.html).

How data masking works in MySQL is that they provide a list of functions in the plugin that are used for data masking, for example `mask_inner`, `mask_outer`, `mask_ssn`, etc.

![_](/content/blog/mysql-data-masking/mysql.webp)

And instead of querying a table directly using the mask functions, the personnel with the right privileges in the organization (usually, the DBA) would define a VIEW that shows the masked data. The view can be seen as a table for the users even if they have limited access to sensitive data. So to access the data, you simply query from the view.

This approach is straightforward, while it has several limitations:

- Rely on granular MySQL user accounts / roles. In reality, most MySQL instances only have a handful users. To adopt this plugin, one need to redesign the account setup in MySQL.

- Different views are needed for different masking variations. This quickly becomes unmanageable as the underlying tables and vairations increase.

- No dedicated module to manage data masking. After all, it's plain MySQL VIEW.

## Percona Data Masking Plugin

[Percona Data Masking Plugin](https://docs.percona.com/percona-server/8.0/data-masking-plugin-functions.html) is a free and open-source implementation of the aforementioned MySQL data masking plugin. It provides a set of functions to mask sensitive data.

![_](/content/blog/mysql-data-masking/percona.webp)

Similarly, the way to protect raw data is with a VIEW.

However, Percona Data Masking only works with Percona Server for MySQL. If you use the dominant Oracle's MySQL edition, you will need to look elsewhere.

## Bytebase Dynamic Data Masking

![_](/content/blog/mysql-data-masking/bytebase-masking.webp)

[Bytebase Dynamic Data Masking](https://docs.bytebase.com/security/data-masking/overview/) doesn't depend on the underlying MySQL views and users.
It manages the masking policies and grants inside Bytebase. Masking policy is applied when user queries from the SQL Editor.

![_](/content/blog/mysql-data-masking/bytebase-sql-editor.webp)

Bytebase Dynamic Data Masking consists of the following components:

1. Global Masking Rule: `Workspace Admin` and `DBA` can apply masking levels in batch, e.g. all columns named as "email" are masked at "Partial" masking level. You can also easily change masking policy without having to reapply the masking policy to thousands of columns, and the hassle of maintaining views is saved.

![_](/content/blog/mysql-data-masking/bytebase-global-masking.webp)

2. Column Masking Rule: `Workspace Admin` and `DBA` can set table columns as different masking levels. Column masking rule takes precedence over the global masking rule.

![_](/content/blog/mysql-data-masking/bytebase-column-level-masking.webp)

3. Access Unmasked data: for the masked content, `Workspace Admin` and `DBA` can grant specific users permission to access unmasked data.

![_](/content/blog/mysql-data-masking/bytebase-masking-grant-access.webp)

_`Workspace Admin` and `DBA` here are [roles](https://docs.bytebase.com/concepts/roles-and-permissions/) in Bytebase._

## Comparison Table

|               | MySQL Enterprise Data Masking Plugin | Percona Data Masking Plugin | Bytebase Dynamic Data Masking                               |
| ------------- | ------------------------------------ | --------------------------- | ----------------------------------------------------------- |
| Compatibility | MySQL Enterprise Edition Only        | Percona Server for MySQL    | All MySQL distributions ⭐️                                 |
| Enforced at   | Database self ⭐️                    | Database self ⭐️           | SQL Editor                                                  |
| Features      | Basic                                | Basic                       | Advanced with granular masking policy and access grants ⭐️ |
| Price         | Paid                                 | Free ⭐️                    | Paid                                                        |

The advantage of MySQL Enterprise Data Masking / Percona Data Masking Plugin is they are implemented in the database itself. Thus data masking rules
are enforced regarless of how queries are sent to the database. For Bytebase Dynamic Data Masking, queries must go through SQL Editor to be enforced.

The advantage of Bytebase Dynamic Data Masking is its compatibility with all MySQL distributions, feature-rich masking policy and access grants.
As long as team can be enforced to query databases via Bytebase [SQL Editor](/sql-editor) (which is desired from the management perspective), then Bytebase Dynamic Data Masking
is a perfect choice.

---

You can try Bytebase Dynamic Data Masking following [this tutorial](https://docs.bytebase.com/tutorials/data-masking/). If you encounter any issues, or need a helping hand, feel free to join our [Discord](https://discord.com/invite/huyw7gRsyA) channel!
