---
title: Bytebase 0.7.1
published_at: 2021/10/18 09:25:16
---

This is a security fix release. Please consider upgrading it.

## 🎄 Enhancement

- Fixed a bunch of security issues found by [huntr.dev](https://huntr.dev)

1. Reject the current user operation if the user has just been de-activated.

2. Secure the access token to prevent CSRF attack.

3. Disallow Bytebase to be loaded in an iframe.

## 🎠 Community

- Thanks [@jiweiyuan](https://github.com/jiweiyuan) to fix our first [good first issue](https://github.com/bytebase/bytebase/issues/11)

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
