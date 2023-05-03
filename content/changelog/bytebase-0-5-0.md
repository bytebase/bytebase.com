---
title: Bytebase 0.5.0
published_at: 2021/09/09 06:58:22
---

## 🚀 New Features

### Project level activities

- Database ownership transfer
- Membership change
- Version Control Workflow based push event

### Version Control Workflow enhancement

- Allow user to specify the migration file path template. [Detailed guide](https://docs.bytebase.com/use-bytebase/vcs-integration/organize-repository-files#file-path-template)
- Allow user to specify the schema path template. **This is useful to let repository always keep a complete schema of the corresponding database.**[Detailed guide](https://docs.bytebase.com/use-bytebase/vcs-integration/organize-repository-files#schema-path-template)
- Record schema snapshot in every migration history record

### A dedicated page for individual migration history

The page shows applied migration statement as well as the schema snapshot after the migration.

## 🐞 Important Bug Fixes

### MySQL 5.7 compatibility

In the previous version, Bytebase couldn't sync the migration history properly because it used a MySQL 8.0 only feature.

## 🎄 Enhancement

- Make task scheduler run task asynchronously.
- For database creation task, add database and its creation state (pending or created) to the issue sidebar.
- For database schema update task, show indication if it's a baseline migration.
- Add schema version link to the backup table row.

## 🎠 Community

- Thanks [@chenliang](https://github.com/chenliang) for providing a detailed bug report for MySQL compatibility issue and even suggesting the fix.
- Thanks [@yaohui-wyh](https://github.com/yaohui-wyh) for the contribution.
