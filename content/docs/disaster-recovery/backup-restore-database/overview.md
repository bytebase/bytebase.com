---
title: Backup and Restore Database
---

Bytebase supports both automatic and manual backup at the database level. User can also restore the backup to a different database.

When Bytebase restores the backup to a new database, it also records the original parent database as well as a branch migration history linking with the restoring process.

User accesses the database backup feature by visiting the "Backups" tab from the database page.

![backup-example](/content/docs/backup-example.png)

At the workspace level, Bytebase also supports enforcing [backup schedule policy](/docs/administration/environment-policy/backup-schedule-policy) for each environment. e.g. DBA can require the database in `production` environment to have `daily` backups.

![env-backup-configure](/content/docs/env-backup-configure.png)

## Local Storage

By default, backups are stored inside the "backup" folder under the [--data](/docs/reference/command-line#--data-directory) directory locally.

- [Backup](backup)
- [Restore from Backup](restore-from-backup)

## Cloud Storage

Bytebase also supports cloud storage backends. The currently supported cloud storage backends are:

- AWS S3

Please follow [the doc](cloud-backup) to setup for using cloud storage backends.
