---
title: Data Masking for MySQL Databases
author: Mila
published_at: 2023/10/27 21:21:21
feature_image: /content/blog/dynamic-data-masking/banner.webp
tags: Enginnering
featured: true
description: Data masking is a handy tool to have to keep your organization's sensitive information safe. Here, we take a look at top options for MySQL data masking.
---

Data Masking is a technique used to secure sensitive data such as credit card information, SSNs, addresses etc. for situations where the data is being shared or used for testing purposes.

There are several methods of data masking, including substitution, shuffling, and redaction, and they are useful in different scenarios. By masking sensitive data, organizations can minimize the risk of data breaches and unauthorized access while still being able to use realistic data for development, testing, and analytics purposes.

## MySQL Data Masking

Data Masking is available exclusively in the MySQL Enterprise edition [as a plugin](https://dev.mysql.com/doc/refman/8.0/en/data-masking-plugin-usage.html).

How data masking works in MySQL is that they provide a list of functions in the plugin that are used for data masking, for example mask_inner(), mask_outer(), mask_ssn(), etc.

![_](/content/blog/dynamic-data-masking/mysql.webp)

And instead of querying a table directly using the mask functions, the personnel with the right privileges in the organization (usually, the DBA) would define a VIEW that shows the masked data. The view can be seen as a table for the users even if they have limited access to sensitive data. So to access the data, you simply query from the view.

The drawback of this approach is pretty straightforward: if a table is updated, the view is outdated, meaning someone has to maintain the view.

## Percona Data Masking

[Percona Data Masking Plugin](https://docs.percona.com/percona-server/8.0/data-masking-plugin-functions.html) is a free and open-source implementation of the aforementioned MySQL ata masking plugin. It provides a set of functions to mask sensitive data.

![_](/content/blog/dynamic-data-masking/percona.webp)

Similarly, the way to protect raw data is with a VIEW.

However, Percona Data Masking only works with Percona Server for MySQL, if you use Oracle’s Enterprise Edition, you will need to look elsewhere.

## Bytebase Dynamic Data Masking

[Bytebase Dynamic Data Masking](/docs/security/data-masking/overview/) utilizes masking policies to mask sensitive data for when you query in the SQL Editor.

Bytebase dynamic masking consists of the following three components:

![_](/content/blog/dynamic-data-masking/bytebase.webp)

1. Global Masking Rule: `Workspace Owner` and `DBA` can apply masking levels in batch, e.g. all columns named as "email" are masked at "Partial" masking level.
2. Column Masking Rule: `Workspace Owner` and `DBA` can set table columns as different masking levels.
3. Access Unmasked data: for the masked content, `Workspace Owner` and `DBA` can grant specific users permission to access unmasked data.

> `Workspace Owner` and `DBA` here are [roles](/docs/concepts/roles-and-permissions/) in Bytebase.

You can create a policy once and have it apply to columns across your workspace. When a user queries in the SQL Editor, the masking policy is applied dynamically.

You can also easily change masking policy without having to reapply the masking policy to thousands of columns, and the hassle of maintaining views is saved.

Bytebase Data Masking has support for several databases: MySQL, PostgreSQL, TiDB, Oracle, SQL Server, MariaDB, OceanBase ([Check here](/docs/introduction/supported-databases/) for updates). Note that this is an Enterprise Plan feature (but you can start a free 14-day trial to try it out first!).

## To Wrap Up

Data masking is a handy tool to have to keep your organization's sensitive information safe. Try it out by following [this tutorial](/docs/tutorials/data-masking/). If you encounter any issues, or need a helping hand, feel free to join our [Discord](https://discord.com/invite/huyw7gRsyA) channel!
