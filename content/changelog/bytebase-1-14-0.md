---
title: Bytebase 1.14.0
author: Mila
published_at: 2023/03/16 17:00:00
feature_image: /content/changelog/1-14-0-banner.webp
description: '- ChatSQL: convert natural language to SQL, credit to OpenAI. - Support 2FA - State-based Migration for MySQL in GitOps workflow. - Support for Redis.'
---

## 🚀 New Features

- ChatSQL: Use natural language and have it converted to SQL by Bytebase. Powered by OpenAI ⚡️.
- Support [Two-Factor Authentication](/docs/administration/2fa) (2FA) for login.
- Support [State-based Migration](/docs/change-database/state-based-migration) for MySQL in GitOps workflow (Beta).
- Added support for [Redis](/docs/introduction/supported-databases) ❤️.

## 🎄 Enhancements

- Use the lower-case Environment Identifier (ENV_ID) instead of the Environment Name (ENV_NAME) for your GitOps SQL file path name. E.g. use `prod`, instead of `Prod`. We changed the environment placeholder to use the unique ENV_ID instead of ENV_NAME. This way, when you change an Environment Name, it won't break the existing GitOps setup.
- Execute multiple SQL statements at a time in SQL Editor's Admin Mode.

## 🐞 Bug Fixes

- Fixed the problem where login with SSO didn't redirect properly in the mobile browser.

## 📰 Fresh off the press

- [SSO login](/blog/introducing-single-sign-on-in-bytebase) is now available in Bytebase, which means you only need to authenticate once and then seamlessly access all authorized resources without re-entering your credentials.

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
