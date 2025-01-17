---
title: Sign-in Restriction
---

<HintBlock type="info">

Only **Workspace Admin** can update the settings.

</HintBlock>

## Sign-in Frequency

<PricingPlanBlock feature_name='SIGNIN_FREQUENCY' />

**Sign-in Frequency** specifies the period that users are required to sign in again.

In Bytebase Workspace, Go to **Settings** -> **General** and scroll down to **Account** section.

![sign-in-frequency](/content/docs/administration/sign-in-restriction/sign-in-frequency.webp)

You need to restart Bytebase to make the change take effect.

## Disallow Sign-in with Email & Password

<PricingPlanBlock feature_name='SSO' />

Once [SSO](/docs/administration/sso/overview) is configured, you can [enforce SSO sign-in](/docs/administration/sso/overview/#enforce-sso-sign-in) for all users.

## Sign-in from Email Domains

Go to **Settings** -> **General**, scroll down to **Security** section. Fill in `Workspace Domain` tab with the email domain for your Workspace members. Then tick the `Members restriction` box.

![set-domain](/content/docs/administration/sign-in-restriction/set-domain.webp)

Domain restriction applies to:

- Sign-in page. (Note that the new restriction only applies to the accounts registered after the `Workspace Domain` was updated)
  ![sign-in-domain-restriction](/content/docs/administration/sign-in-restriction/sign-in-domain-restriction.webp)

- **Add User** in **IAM & Admin** -> **Users & Groups**. Users' email must be of the domain you set in both scenarios.
  ![add-user-domain-restriction](/content/docs/administration/sign-in-restriction/add-user-domain-restriction.webp)
