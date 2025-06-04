---
title: Scheduled Rollout
---

<PricingPlanBlock feature_name='SCHEDULE_CHANGE' />

When rolling out a change in Bytebase, you can choose to run it immediately or schedule it to a later time.

![rollout-schedule](/content/docs/change-database/scheduled-rollout/bb-rollout.webp)

If there are any warnings or errors, as long as you check **Rollout anyway**, you can still schedule the time.

![rollout-schedule-anyway](/content/docs/change-database/scheduled-rollout/bb-rollout-anyway.webp)

After you schedule the rollout, it will be in the pending state. You can't manually run it nor edit the SQL unless you click **Cancel**.

![pending-rollout](/content/docs/change-database/scheduled-rollout/bb-pending-rollout.webp)

After clicking **Cancel**, you may edit the SQL and restart the rollout process either immediately or schedule it to a later time.

![rollout-cancel-restart](/content/docs/change-database/scheduled-rollout/bb-rollout-cancel-restart.webp)
