---
title: Sign-in Restriction
---

## Sign-in Frequency

<PricingPlanBlock feature_name='SIGNIN_FREQUENCY' />

**Sign-in Frequency** specifies the period that users are required to sign in again.

### Prerequisites

- **Workspace Admin** or **Workspace DBA** role

### Procedure

1. Click **Settings** on the top bar.
2. Click **General** under **Workspace**, and scroll down to the **Security** section.
3. Choose between `Hour(s)` and `Day(s)`.
4. Click `+`,`-` or input a number to set the **Sign-in Frequency**.

![sign-in-frequency](/content/docs/administration/sign-in-restriction/bb-sign-in-frequency.webp)

<HintBlock type="info">

You need to restart Bytebase and re-login to make the change take effect.

</HintBlock>
