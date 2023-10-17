---
title: Bytebase 0.13.0
published_at: 2022/02/18 02:28:08
description: SQL editor supports sheet sharing. Searchable member selector. Database labels can be managed as normal properties. Show comprehensive schema comparison when schema drift is detected.
---

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._

## 🚀 New Features

- SQL editor supports sheet sharing.

![_](/content/changelog/0.13.0/sql-editor-sheet.gif)

## 🎄 Enhancement

- Searchable member selector.

![_](/content/changelog/0.13.0/member-selector-search.gif)

- Database labels can be managed as normal properties. Database label related features are available for standard mode projects now.

![_](/content/changelog/0.13.0/database-label.gif)

- Show comprehensive schema comparison when schema drift is detected.

![_](/content/changelog/0.13.0/schema-drift.gif)

- Add quickstart for MySQL and Clickhouse.  You can choose to have MySQL or Clickhouse run automatically with Bytebase without additional installation. Thanks @showsmall  for [the suggestion](https://github.com/bytebase/bytebase/issues/403).

![_](/content/changelog/0.13.0/quickstart.webp)

## 🐞 Bug fix

- Prevent XSS in SQL editor.
- Filter improper authorization of user inbox.

## 🎠 Community

- Our gratitude goes to @boyapatisandeep for the [detailed bug report](https://github.com/bytebase/bytebase/issues/543) and @NickStepanov for the [baseline issue](https://github.com/bytebase/bytebase/discussions/350)

- Thanks to @Juneezee [https://github.com/bytebase/bytebase/pull/264](https://github.com/bytebase/bytebase/pull/264) @wuhan005 [https://github.com/bytebase/bytebase/pull/340](https://github.com/bytebase/bytebase/pull/340) @cosmtrek [https://github.com/bytebase/bytebase/pull/410](https://github.com/bytebase/bytebase/pull/410) @stormcat24 [https://github.com/bytebase/bytebase/pull/453](https://github.com/bytebase/bytebase/pull/453) for all your contribution!
