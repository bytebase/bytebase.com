---
title: Bytebase 1.0.1
updated_at: 2022/03/17 09:04:12
description: Support instance read-only connection. Enable Data Change (DML) for tenant mode projects. Allow users to edit SQL statements. Allows retry for failed migration with invalid SQL statement.
---

## 🚀 Features

- Support instance read-only connection. Once configured, Bytebase will use this user to query databases in SQL Editor and will use it in all read-only scenarios in the future.

![_](/content/changelog/1.0.1/read-only-connection.gif)

## 🎄 Enhancements

**Tenant Mode**

- Enable Data Change (DML) for tenant mode projects.

**SQL Schema Review**

- Allow users to edit SQL statements.
- Allows retry for failed migration with invalid SQL statement.

**SQL Editor**

- Change the save sheet logic. Save the sheet when clicking the save button or using the shortcut (CMD + S).

**Installation Improvement**

- Improved installation on Linux platform.

## 🐞 Notable bug fixes

- Several security enhancements.

## 🎠 Community

- Thanks to [@0xflotus](https://github.com/0xflotus) for PR [chore: fix small typo error](https://github.com/bytebase/bytebase/pull/805).
- Thanks to [@milkwine](https://github.com/milkwine) for PR [fix: backup failed when dash('-') in database name](https://github.com/bytebase/bytebase/pull/874).

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
