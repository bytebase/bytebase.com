---
title: Sign-in Restriction
---

This document explains some sign-in restrictions.

## Sign-in Frequency

<PricingPlanBlock feature_name='SIGNIN_FREQUENCY' />

**Sign-in Frequency** specifies the period that users are required to sign in again.

Only **Workspace Admin** can update the **Sign-in Frequency** settings.

In Bytebase Workspace, Go to **Settings** -> **General** and scroll down to **Account** section, where you can

- Choose between `Hour(s)` and `Day(s)`.
- Click `+`,`-` or input a number to set the **Sign-in Frequency**.

![sign-in-frequency](/content/docs/administration/sign-in-restriction/sign-in-frequency.webp)

<HintBlock type="info">

You need to restart Bytebase and re-login to make the change take effect.

</HintBlock>

## Disallow Sign-in with Email & Password

<PricingPlanBlock feature_name='SSO' />

As `Workspace Admin`, having had [SSO](https://www.bytebase.com/docs/administration/sso/overview) (for example [OAuth 2.0 in GitHub](https://www.bytebase.com/docs/administration/sso/oauth2/#github)) configured, you can [enforce SSO sign-in](https://www.bytebase.com/docs/administration/sso/overview/#enforce-sso-sign-in) for all users in Workspace.

## Sign-in from Email Domains

Go to **Settings** -> **General**, scroll down to **Security** section. Fill in `Workspace Domain` tab with the email domain for your Workspace members. Click **Update** to save changes.

![set-domain](/content/docs/administration/sign-in-restriction/set-domain.webp)

You can restrict members' email addresses by ticking the `Members restriction` box. Afterwards, when you
- Sign in (Note that the new restriction only works for the accounts registered after the `Workspace Domain` was updated)
    ![sign-in-domain-restriction](/content/docs/administration/sign-in-restriction/sign-in-domain-restriction.webp)

or

-  **Add User** in **IAM & Admin** -> **Users & Groups**
    ![add-user-domain-restriction](/content/docs/administration/sign-in-restriction/add-user-domain-restriction.webp)

Users' email must be of the domain you set in both scenarios.