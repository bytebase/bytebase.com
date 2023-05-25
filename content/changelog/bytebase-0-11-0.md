---
title: Bytebase 0.11.0
published_at: 2022/01/06 10:31:49
---

## 🚀 New Features

### (Preview) SQL Editor

- Auto-complete and context menu.
- Run SQL statement (only allow SELECT query) and display the result in a table view.
- Navigate among different database connections via the left tree panel.
- Display table schema info on the bottom left side panel.

![_](/content/changelog/0.11.0/sql-editor.gif)

## 🎄 Enhancement

### kbar quickstart

User can now use cmd+k to invoke the command bar to quickly navigate among different Bytebase sections.
![_](/content/changelog/0.11.0/quickstart.webp)

### Refactor the underlying VCS module to make it plugable

This ease the path to support other VCS systems like GitHub, BitBucket.

## 🐞 Bug fix

- Fix the issue when we are unable to write back the latest schema to the Git repository after the migration succeeds.

## 🎠 Community

### Preview environment for each PR

Now every PR will create a unique preview environment. This makes it easy to collaborate among author and reviewers.
![_](/content/changelog/0.11.0/render-preview.webp)

- Bytebase Sticker Collection V1.0 is ready  [https://bytebase.com/brand](https://bytebase.com/brand)

![_](/content/changelog/0.11.0/lgtm.gif)

- Thanks to @Juneezee 's PR [refactor: move from io/ioutil to io and os packages](https://github.com/bytebase/bytebase/pull/264)

## 📕 Upgrade instruction

- For fresh installation, follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation).
- If you upgrade from previous version, there is some breaking schema change. Please contact [support@bytebase.com](mailto:support@bytebase.com) and we will help you manually upgrade to the new version.
