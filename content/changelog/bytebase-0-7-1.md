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

### 📕 Upgrade instruction

- For fresh installation, follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation).
- If you upgrade from 0.7.0, no migration needed. If you upgrade before 0.7.0, there is some breaking schema change, please contact [support@bytebase.com](mailto:support@bytebase.com) and we will help you manually upgrade to the new version.
