---
title: Backup Retention Policy
---

If you have enabled automatic backup for a database, Bytebase will automatically backup the database at the configured schedule. If you have not enabled the [cloud backup feature](/docs/disaster-recovery/backup-restore-database/backup/#cloud-storage), the local disk will be gradually filled up. Retention policy can solve this problem by regularly deleting the unused old backups.

## Configuration

### Step 1 - Enable automatic backup

If you have not enabled automatic backup for the database, click the "Enable backup" button. Otherwise, click the "Edit" button.

![enable-backup](/content/docs/disaster-recovery/retention-policy/retention-policy-step-1.webp)

### Step 2 - Set retention period

Set the days you want to preserve the backup. Bytebase will automatically delete the expired backups after the configured retention period.

<img alt="set-retention-period" src="/content/docs/disaster-recovery/retention-policy/retention-policy-step-2.webp" style={{ maxWidth: 540 }} />

Now you have successfully configured the backup retention policy.
