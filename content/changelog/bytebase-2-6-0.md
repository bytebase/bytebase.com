---
title: Bytebase 2.6.0
author: Adela
updated_at: 2023/08/17 17:21:21
feature_image: /content/changelog/2-6-0-banner.webp
description: 'Support using LDAP for configuring SSO. Support adding multiple read-only data sources.'
---

## 🚀 New Features

- Support using [LDAP](https://docs.bytebase.com/administration/sso/ldap/) for configuring SSO.
- Support adding multiple read-only data sources.
- Schema Template supports column type restriction.
- Support RisingWave.
- Support Data Masking Policy for SQL Server.
- Support Sync Schema for TiDB.
- SQL Review CI supports Azure DevOps.

## 🎄 Enhancements

- Support setting a custom environment for a specific database.
- Support viewing project members grouped by their roles.
- Support adding project data querier and exporter roles to a target database.
- Improved Postgres slow query UX.
- Improved Instance detail layout.
- Improved SQL Editor navigation.

## 🎠 Community

- Thanks to [@TennyZhuang](https://github.com/TennyZhuang) for PR feat: support to use RisingWave as instance [#7427](https://github.com/bytebase/bytebase/pull/7427)
- Thanks to [@1aal](https://github.com/) for PR fix: fix bytebase helm chart [#7481](https://github.com/bytebase/bytebase/pull/7481)
- Thanks to [@kanzihuang](https://github.com/) for PR fix: sql export for bit type [#7444](https://github.com/bytebase/bytebase/pull/7444)

## 📰 Fresh off the press

- The saga between MySQL and Postgres continues with [PlanetScale and Neon](/blog/planetscale-vs-neon/)!
- DBeaver is one of the most popular database management tools out there, BUT - just in case you are in the mood for something different... We got [the best DBeaver alternatives](/blog/top-dbeaver-alternative/), with a comparison chart at the end 📈
- New video tutorial: set up [custom approval flows](https://www.youtube.com/watch?v=K_RWlqdplZQ) for your issues in just 100 seconds.

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
