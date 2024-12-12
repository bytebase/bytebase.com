---
title: Single Sign-On (SSO)
---

Single Sign-On (SSO) is an authentication method that enables users to securely authenticate with multiple applications and websites by using just one set of credentials.

Bytebase supports the following standard protocols that provide SSO:

- [OAuth 2.0](/docs/administration/sso/oauth2)
- [OpenID Connect (OIDC)](/docs/administration/sso/oidc)
- [Lightweight Directory Access Protocol (LDAP)](/docs/administration/sso/ldap)

## Prerequisites

Configure [External URL](/docs/get-started/install/external-url).

## Create SSO provider

As a **Workspace Admin**, you can create a SSO provider with the following steps:

1. Go to the **Settings** page.

   ![settings-sso](/content/docs/administration/sso/settings-sso.webp)

2. Click **Create** to start creating SSO.
3. Fill in all the required fields.

   ![create-sso-dialog](/content/docs/administration/sso/create-sso-dialog.webp)

## Sign in with SSO

<HintBlock type="info">

Bytebase employs JIT (Just-In-Time) user provisioning. It will create the user the first time the user signs in.

</HintBlock>

Once a valid SSO has been created, the user can choose the configured SSO provider to sign in.

![sign-in-with-github](/content/docs/administration/sso/sign-in-with-github.webp)

## Enforce SSO Sign-in

As a **Workspace Admin**, you can enforce SSO sign-in for all users in the workspace.

Go to the **Settings > Workspace > General**, find the **Security** section and turn on the **Disallow signin with email&password** option.

![bb-disallow-emailpass-only-sso](/content/docs/administration/sso/bb-disallow-emailpass-only-sso.webp)

Afterwards, when the user tries to sign in, the only option is to sign in with the configured SSO provider.

![bb-only-sso](/content/docs/administration/sso/bb-only-sso.webp)

In case of an emergency, the admin can log in by navigating to `<YOUR_URL>/auth/admin` and entering the email and password.
