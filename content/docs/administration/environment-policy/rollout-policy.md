---
title: Rollout Policy
---

<TutorialBlock url="/docs/tutorials/deploy-schema-migration" title="Deploy Schema Migration with Rollout Policy" />

`Workspace Admin` or `DBA` can configure the **Rollout policy** for a particular environment from the **Environment** detail page:

![environment-configure](/content/docs/administration/environment-policy/bb-env-rollout-policy.webp)

This setting will affect projects using either [UI workflow or GitOps workflow](/docs/concepts/database-change-workflow). The rollout policy determines who will rollout the database changes.

## Automatic rollout

Bytebase will rollout the change automatically if all check have passed. Unpassed checks will block the
automatic rollout and require manual intervention:

- [Rollout time](/docs/change-database/change-workflow/#rollout-time)
- [SQL Review violations](/docs/sql-review/overview)

## Manual rollout by dedicated roles

<PricingPlanBlock feature_name='ROLLOUT_POLICY' />

Bytebase requires certain roles to roll out the change manually.

## Manual rollout with custom approval flow

<PricingPlanBlock feature_name='CUSTOM_APPROVAL' />

Bytebase requires the last approver from the activated [custom approval flow](/docs/administration/custom-approval/) to roll out the change manually.
