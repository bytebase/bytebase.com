---
title: Backup Schedule Policy
---

<HintBlock type="info">

The backup enforcement is **NOT retroactive**, which means the updated policy **won't** automatically alter the existing database backup setting, it will only enforce the future setup. On the other hand, Bytebase will report the discrepancy if the current setting does not conform to the active policy , which gives user the control to switch the existing setting at the appropriate time.

</HintBlock>

`Owner` or `DBA` can configure the backup schedule policy for a particular environment from the "Environment" detail page:

![env-backup-configure](/docs/env-backup-configure.png)

## Detect missing backup

Once policy is enforced, Bytebase will detect and report the missing backup according to the policy.

![database-overview](/docs/database-overview.png)

## Lock backup schedule

Backup policy will also prevent user changing to a non-conforming backup schedule.

![database-backup](/docs/database-backup.png)
