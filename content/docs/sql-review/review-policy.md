---
title: Review Policy
---

Bytebase defines SQL Review Policy for each [environment](/docs/concepts/data-model#environment).
The SQL Review Policy is a set of [SQL lint rules](/docs/sql-review/review-rules). Once configured, Bytebase will check SQL against those rules.

## Prerequisites

- **Workspace Admin** or **Workspace DBA** role to configure the Review Policy.

## Create SQL Review Policy

<HintBlock type="info">

Note that only **ONE** policy can be attached per `Environment`.

</HintBlock>

![sql-review-policy](/content/docs/sql-review/sql-review-policy.webp)

You can access `SQL Review Policy` from following places:

- `SQL Review` under `Security & Policy` sidebar.
- `Environment` setting.

## Change rule level

You can choose one of `Error`, `Warning` and `Disabled`.

Both `Warning` and `Error` will block the [automatic rollout](/docs/administration/environment-policy/rollout-policy/#automatic-rollout) if configured.

## Disable and delete SQL Review Policy

You can disable the `SQL Review Policy` to prevent it from taking effect.

After disabling it, you can delete it.
