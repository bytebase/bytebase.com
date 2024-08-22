---
title: Bytebase 2.22.2
author: Ningjing
published_at: 2024/8/22/ 17:00:00
feature_image: /content/changelog/2-22-2-banner.webp
description: 'Allow assigning roles to groups at the workspace level'
---

## 🚀 New Features

- Allow assigning roles to groups at the workspace level.
- Support disallowing sign-in with email and password, [allowing only SSO](/docs/administration/sso/overview/#enforce-sso-sign-in).
- Add a PostgreSQL SQL review rule: `Disallow setting volatile default values on columns`.

## 🔔 Breaking Changes

- Retire the change histories page in the project; all change histories can be found on the database page.
- Remove `BranchService.DiffDatabase` and `SQLService.DifferPreview` API.

## 🎄 Enhancements

- Split the **Members & Groups** page into two pages: **Users & Groups** and **Members**.
- Improve SQL Editor UI.

## 🎠 Community
- Thanks to [@nlimpid](https://github.com/nlimpid) for the PR [fix: handle error properly in ClickHouse query #13415](https://github.com/bytebase/bytebase/pull/13415)

<IncludeBlock url="/docs/get-started/install/install-upgrade"></IncludeBlock>
