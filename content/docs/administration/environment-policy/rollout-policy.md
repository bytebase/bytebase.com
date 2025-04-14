---
title: Rollout Policy
---

<TutorialBlock url="/docs/tutorials/deploy-schema-migration" title="Deploy Schema Change with Rollout Policy" />

<HintBlock type="info">

While you **can not** [self-approve](/docs/administration/custom-approval/) your own created issue, once
the issue is approved by the others, you **can** roll out your own issue if qualified.

</HintBlock>

`Workspace Admin` or `DBA` can configure the **Rollout policy** for a particular environment from the **Environment** detail page:

![environment-rollout](/content/docs/administration/environment-policy/bb-env-rollout.webp)

This setting will affect projects using either [UI workflow or GitOps workflow](/docs/concepts/database-change-workflow). The rollout policy determines who will rollout the database changes.

## Automatic rollout

If `automatic` option is checked, Bytebase will roll out the change automatically if all check have passed. Unpassed checks will block the automatic rollout and require manual intervention:

- [Rollout time](/docs/change-database/change-workflow/#rollout-time)
- [SQL Review violations](/docs/sql-review/overview)

## Manual rollout by dedicated roles

If any roles are specified, Bytebase requires users with those roles to manually roll out the change.

## Manual rollout with custom approval flow

<PricingPlanBlock feature_name='CUSTOM_APPROVAL' />

Bytebase requires the last approver from the activated [custom approval flow](/docs/administration/custom-approval/) to roll out the change manually.
