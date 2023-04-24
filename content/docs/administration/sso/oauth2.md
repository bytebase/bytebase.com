---
title: OAuth 2.0
---

OAuth is an open standard for token-based authentication and authorization which is used to provide Single Sign-On (SSO). Bytebase supports popular OAuth 2.0 providers (GitHub, Google, GitLab) and custom providers.

## Overview

![create-sso-dialog](/docs/administration/sso/create-sso-dialog.webp)

In the creating SSO dialog, you need to fill following fields:

### Basic information

![oauth2-basic-information](/docs/administration/sso/oauth2-basic-information.webp)

- **Name** is the display name of your SSO item;
- **Resource ID** should be a unique string identifying this resource by Bytebase;
- **Domain** is an SSO domain name;

### Identity provider information

The information is the base concept of [OAuth 2.0](https://oauth.net/2/) and comes from your provider.

![oauth2-identity-provider-information](/docs/administration/sso/oauth2-identity-provider-information.webp)

- **Client ID** is a public identifier of the custom provider;
- **Client Secret** is the OAuth2 client secret from identity provider;
- **Auth URL** is the custom provider's OAuth2 login page address;
- **Scopes** is the scope parameter carried when accessing the OAuth2 URL, which is filled in according to the custom provider;
- **Token URL** is the API address for obtaining access token;
- **User information URL** is the API address for obtaining user information by access token;

### User information mapping

For different providers, the structures returned by their user information API are usually not the same. In order to know how to map the user information from an provider into Bytebase user fields, you need to fill the user information mapping form.

Bytebase will use the mapping to import the user profile fields when creating new accounts.
The most important user field mapping is the identifier which is used to identify the Bytebase account associated with the OAuth 2.0 login.

![oauth2-user-information-field-mapping](/docs/administration/sso/oauth2-user-information-field-mapping.webp)

- **Identifier** is the field name of the unique identifier in 3rd-party user info;
- **DisplayName** is the field name of display name in 3rd-party user info;
- **Email** is the field name of primary email in 3rd-party user info.

## Built-in OAuth Provider

<HintBlock type="warning">

OAuth 2.0 usually requires an authorization callback url in the configuration. Please make sure the [--external-url](/docs/get-started/install/external-url) is set correctly.

If you start Bytebase with `--external-url https://bytebase.example.com`, then the **authorization callback URL** will be `https://bytebase.example.com/oauth/callback`.

</HintBlock>

Bytebase provides templates for configuring built-in OAuth providers.

### GitHub

1. Follow [Creating an OAuth App in GitHub](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to create an OAuth app in GitHub.

   ![github-oauth-app-config](/docs/administration/sso/github-oauth-app-config.webp)

2. Open creating SSO dialog and select the **GitHub** template.
3. Update the **Client ID** and **Client secret** fields with the GitHub OAuth App you just created.
4. After filling in all the required fields, try to click **Test connection**.
5. If everything is OK, click the **Create** button.

### GitLab

1. Follow [Configure GitLab as an OAuth 2.0 authentication identity provider](https://docs.gitlab.com/ee/integration/oauth_provider.html) to create an OAuth 2 application in GitLab.

   ![gitlab-oauth-app-config](/docs/administration/sso/gitlab-oauth-app-config.webp)

2. Open creating SSO dialog and select the **GitLab** template.
3. Update the **Client ID** and **Client secret** fields with the GitLab OAuth 2 application you just created.
4. After filling in all the required fields, try to click **Test connection**.
5. If everything is OK, click the **Create** button.

### Google

1. Follow the [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2) to create OAuth 2.0 client credentials in [Google API Console](https://console.developers.google.com/).

   ![google-oauth-app-config](/docs/administration/sso/google-oauth-app-config.webp)

2. Open creating SSO dialog and select the **Google** template.
3. Update the **Client ID** and **Client secret** fields with the OAuth 2.0 client credential you just created.
4. After filling in all the required fields, try to click **Test connection**.
5. If everything is OK, click the **Create** button.
