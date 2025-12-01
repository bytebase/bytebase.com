---
title: Introducing Single Sign-On in Bytebase
author: Candy
updated_at: 2023/03/07 17:37:17
feature_image: /content/blog/introducing-single-sign-on-in-bytebase/cover.webp
tags: Announcement
featured: true
description: This article demonstrates the Single Sign-On (SSO) protocols supported by Bytebase. SSO allows users to log in once and access all authorized resources, improving security, user experience, and organizational flexibility.
---

## What’s Single Sign-On?

Single Sign-On (SSO) is a user authentication service allowing users to access multiple applications or services with one login credential. There are several benefits to supporting SSO:

- Enhanced security: SSO can improve security by reducing the likelihood of users reusing the same password across multiple applications or services, minimizing the risk of data breaches and unauthorized access.
- Improved user experience: SSO enables users to authenticate just once and then smoothly access all authorized services without re-entering their login credentials.
- Increased flexibility: With support for different authentication protocols, SSO allows organizations to configure different SSO methods for different domains, providing a highly flexible and customizable solution.

## Supported Protocols in Bytebase

SSO is typically achieved through standardized authentication protocols such as SAML, LDAP, OAuth, or OpenID Connect (OIDC). Today, Bytebase supports the two most widely used protocols for SSO: [OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749) and [OIDC](https://openid.net/connect/).

### OAuth 2.0

OAuth 2.0, released in 2012 to replace OAuth 1.0, allows services or applications to access accounts on an HTTP service with limited permissions. With OAuth 2.0, user authentication is delegated to the service hosting the user account, and third-party applications are authorized to access that user account without sharing the user’s credentials.

Bytebase integrates the following identity providers supporting OAuth 2.0:

- GitHub
- GitLab
- Google
- Custom

For details information on how to configure SSO using OAuth 2.0, you can refer to the user doc [OAuth 2.0](https://docs.bytebase.com/administration/sso/oauth2).

### OpenID Connect (OIDC)

OIDC is an open standard for authentication and authorization that is built on top of OAuth 2.0. It provides a secure and reliable way for users to authenticate to an application using their existing online accounts.

Like OAuth 2.0, OIDC relies on identity providers to authenticate users. These identity providers can be third-party services or self-hosted solutions including:

- Google
- GitLab
- Okta
- Keycloak
- Authing

To learn details about how to configure SSO using OIDC, you can refer to the user doc [OpenID Connect (OIDC)](https://docs.bytebase.com/administration/sso/oidc).

## Conclusion

SSO is available in the Enterprise plan, which enables users to authenticate once and then seamlessly access all authorized resources without re-entering their credentials. Bytebase supports using OAuth 2.0 and OIDC for configuring SSO. To get started, you can refer to the doc [Single Sign-On (SSO)](https://docs.bytebase.com/administration/sso/overview) and try it out by yourself.

If you have any comments or questions, don’t hesitate to let us know. You can join our [discord](https://discord.gg/huyw7gRsyA) to learn more about Bytebase.
