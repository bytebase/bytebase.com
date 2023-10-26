---
title: Rollout Policy
---

`Owner` or `DBA` can configure the **Rollout policy** for a particular environment from the **Environment** detail page:

![environment-configure](/content/docs/administration/environment-policy/env-rollout-policy.webp)

This setting will affect projects using either [UI workflow or GitOps workflow](/docs/concepts/database-change-workflow). Bytebase periodically inspects the next pending task. If the task whose environment requires manual rollout, then Bytebase will wait to execute the task until someone manually rolls out the task. Otherwise, Bytebase will execute the task automatically.
