---
title: Bytebase 0.4.0
published_at: 2021/08/19 07:51:00
---

Update instruction

- For fresh installation, follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation).
- If you upgrade from previous veresion, then it requires manual schema change, please contact [support@bytebase.com](mailto:support@bytebase.com) and we will assist you to perform the manual upgrade.

## 🐞 Important Bug Fixes

### MySQL 5.7 compatibility

In the previous version, Bytebase couldn't sync the migration history properly because it used a MySQL 8.0 only feature.

## 🚀 New Features

### Backup and restore ([detailed guide](https://docs.bytebase.com/use-bytebase/backup-restore-database))

User can now configure weekly automatic backup for the database. Meanwhile, user can also take manual backup anytime. Later on, User can restore the backup to a new database.

### Webhook ([detailed guide](https://docs.bytebase.com/use-bytebase/webhook-integration))

User can now configure webhook to allow Bytebase to post messages to the configured webhook endpoint upon varioius events. Bytebase currently supports following events:

- Issue creation
- Issue status change
- Issue task status change
- Issue info change such as its assignee, title, description
- Issue comment creation

#### Bytebase also supports following webhook providers

- Slack
- Discord
- Microsoft Teams
- DingTalk (钉钉)
- Feishu (飞书）
- WeCome (企业微信）

## 🎠 Community

- Thanks @zhj-hx for providing feedback and helping us troubleshooting the MySQL 5.7 compatibility issue
- Thanks @iczc for the PR.
