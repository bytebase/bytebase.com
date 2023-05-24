---
title: Restore from Backup
---

<HintBlock type="warning">

Bytebase only allows to restore backup to a new database under the same project and environment.

</HintBlock>

<HintBlock type="info">

User who is the member of the project owning the database, as well as the Workspace Owner and DBA can restore backup.

</HintBlock>

## Step 1 - Choose the backup to be restored

![restore-from-backup-step](/content/docs/restore-from-backup-step1.png)

## Step 2 - Choose the new database name for the restore

For now, Bytebase only allows to restore to a new database under the same project and environment as the original database producing the backup.

![restore-from-backup-step](/content/docs/restore-from-backup-step2.png)

## Step 3 - Execute restore workflow

Bytebase will create a 2-stage issue for the restore workflow. The 1st stage is to create the new database, followed by restoring the backup to that database. For `Workspace Owner or DBA`, the workflow will start automatically. For `Workspace Developer`, the workflow requires `Workspace Owner or DBA` approval first.

![restore-from-backup-step](/content/docs/restore-from-backup-step3.png)

## Step 4 - View the restored database

For a successfully restored database, Bytebase records the parent database it's restored from. It also records a `Branch` migration history showing the issue detailing the restoring process.

![restore-from-backup-step](/content/docs/restore-from-backup-step4.png)
