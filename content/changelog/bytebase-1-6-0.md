---
title: Bytebase 1.6.0
author: Changyu
published_at: 2022/10/13 17:00:00
description: '- Support read-only data source for read-replica instance. - SQL Editor query performance improvement. - Support drag-n-drop to sort the tab in SQL Editor and auto-restore the session. - Support displaying the currently connected environment in SQL Editor - Added a hint for the maximum return rows of the query result in SQL Editor.'
---

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._

## 🚀 Features

- Support read-only data source for read-replica instance.

## 🎄 Enhancements

- SQL Editor query performance improvement.
- Support drag-n-drop to sort the tab in SQL Editor and auto-restore the session.
- Support displaying the currently connected environment in SQL Editor.
- Added a hint for the maximum return rows of the query result in SQL Editor.

## 🐞 Notable bug fixes

- Fixed: SQL with a long line in the issue may fail the pre-check task.

## 🎠 Community

- Thanks to [@fatelei](https://github.com/fatelei) for [#2965 feat(sql-review): implement postgresql check the number of index columns](https://github.com/bytebase/bytebase/pull/2965)
- Thanks to [@zeroslope](https://github.com/zeroslope) for [#2929 feat(advisor): limit value list len in PostgreSQL INSERT statement](https://github.com/bytebase/bytebase/pull/2929)
- Thanks to [@praneetloke](https://github.com/praneetloke) for [#2898 chore: improve error message when DB connection fails](https://github.com/bytebase/bytebase/pull/2898)
- Thanks to [@Kikkon](https://github.com/Kikkon) for [#2874 feat(sql-review): limit PostgreSQL comment length](https://github.com/bytebase/bytebase/pull/2874)
- Thanks to [@hamidzr](https://github.com/hamidzr) for [#2857 docs: fix minor typos](https://github.com/bytebase/bytebase/pull/2857)
