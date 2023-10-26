---
title: Bytebase 1.13.0
author: Ningjing
published_at: 2023/03/02 17:00:00
feature_image: /content/changelog/1-13-0-banner.webp
description: '- Generate SQL statements to rollback DML for MySQL. - Support Single Sign-On (SSO) with OIDC. - GitOps workflow now supports GitLab.com as a VCS provider.'
---

## 🚀 New Features

- Generate SQL statements to rollback DML for MySQL. [www.bytebase.com/docs/change-database/rollback-data-changes](/docs/change-database/rollback-data-changes)
- Support Single Sign-On (SSO) with OIDC. [www.bytebase.com/docs/administration/sso/oidc](/docs/administration/sso/oidc)
- GitOps workflow now supports GitLab.com as a VCS provider. Now Bytebase supports GitLab.com, GitHub.com and GitLab self-hosted. [www.bytebase.com/docs/vcs-integration/gitlab-com](/docs/vcs-integration/gitlab-com)

## 🎄 Enhancements

- Improved UI for viewing and configuring SQL review policies.
- Support executing multiple statements for PostgreSQL in SQL Editor Admin mode.

## 🎠 Community

- We just crossed 5K [GitHub stars](https://github.com/bytebase/bytebase) 🥳!
- Add a tutorial page to include all Bytebase tutorials. [www.bytebase.com/tutorial](/tutorial)
- Thanks to [@piglig](https://github.com/piglig) for PRs
  - [\#4874](https://github.com/bytebase/bytebase/pull/4874) chore: adjust plugin names to conform to conventions
  - [\#4875](https://github.com/bytebase/bytebase/pull/4875) docs: update the reference of the plugin generator doc
  - [\#4878](https://github.com/bytebase/bytebase/pull/4878) fix: wrong dir path when generating MySQL Advisor

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
