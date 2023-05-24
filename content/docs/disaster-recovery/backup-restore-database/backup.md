---
title: Backup
---

![backup-example](/content/docs/backup-example.png)

## Automatic weekly backup

<HintBlock type="info">

Automatic weekly backup can be enabled/disabled by the Owner of the project owning the database, as well as the Workspace Owner and DBA.

</HintBlock>

Whenever user (re-)enables the automatic backup, Bytebase will choose a random local time between 0:00 AM \~ 6:00 AM on Sunday.

You can use [webhook](/docs/administration/webhook-integration/database-webhook) to monitor backup status.

## Manual backup

<HintBlock type="info">

User who is the member of the project owning the database, as well as the Workspace Owner and DBA can take manual backup.

</HintBlock>

In addition to automatic backup, user can also take a manual backup whenever needed.
