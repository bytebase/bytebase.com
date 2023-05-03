---
title: Bytebase 1.0.3
published_at: 2022/04/14 10:46:34
description: Release MySQL Database Review Guide. Toggle Debug mode at runtime for easier troubleshooting. SQL editor support more types of EXPLAIN queries on the basis of EXPLAIN SELECT, such as EXPLAIN INSERT.
---

## Release MySQL SQL Review Guide

[SQL Review Guide](https://bytebase.com/sql-review-guide) lists all the rules in schema change review, from the naming convention of Table, Column, and Index to the designated WHERE clause. We provide rule templates for the MySQL Dev and Prod environments. DBAs can configure the rules manually based on our templates, and generate images for internal reference.  Meanwhile, we are actively working on the following area:

- Add more rules. We also welcome DBAs' suggestions at [Issues · bytebase/bytebase](https://github.com/bytebase/bytebase/issues)
- Integrate those rules into the Bytebase product by detecting rule violations automatically.

Currently, we only support MySQL. We will add PostgreSQL support later.
![_](/changelog/1.0.3/sql-review-guide.gif)

### 🚀 Features

- Toggle Debug mode at runtime for easier troubleshooting

![_](/changelog/1.0.3/debug-mode.gif)

> Only OWNER and DBA can toggle Debug mode

When the Debug mode is enabled, you can see the internal error messages on the web console, and more details are included in the logs. Previously, users can use `--debug` on Bytebase startup to do this. Now you can toggle this setting at runtime. Debug mode is a global setting and will affect all users, thus only OWNER and DBA can toggle it. It's expected to be temporarily turned on for troubleshooting issues.

### 🎄 Enhancements

- [SQL editor] support more types of EXPLAIN queries on the basis of EXPLAIN SELECT, such as EXPLAIN INSERT.

### 🎠 Community

- Precompile various executable file formats in the released version: Bytebase server and CLI binary will be released on the [[GitHub release page](https://github.com/bytebase/bytebase/releases)]. Currently, Bytebase supports Linux, Darwin, x86_64, arm64.
- Thanks to @unknwon for the PR [feat: allow exchange OAuth token without an existing VCS #1007](https://github.com/bytebase/bytebase/pull/1007)
- Thanks to @tison for the PR [feat: support to specify external pg instance as metadata storage #1030](https://github.com/bytebase/bytebase/pull/1030)
- Thanks to @milkwine for the PR [fix: backup failed when dash('-') in database name #874](https://github.com/bytebase/bytebase/pull/874)
- Thanks to @Cluas for the PR [fix: tenant mode VSC with DatebaseNameTemplate task execute error #1071](https://github.com/bytebase/bytebase/pull/1071)
- Thanks to @0xflotus for the PR [PR chore: fix small typo error #805](https://github.com/bytebase/bytebase/pull/805)

## 📕 Installation and Upgrade

Follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation). If you upgrade from a previous version, just restart after obtaining the new release binary.
