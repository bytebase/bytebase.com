---
title: Bytebase 2.0.0
author: Ningjing
published_at: 2023/05/11 15:30:00
feature_image: /changelog/2-0-0-banner.webp
description: "Support AI-based index optimization advisor for slow query"
---

## 🚀 New Features

- Support [AI-based index optimization advisor](/docs/slow-query/index-advisor/) for slow query.
- Support setting [secret variables](/docs/administration/secret) at the database level and using it in SQL change workflow.
- Support [MyBatis 3 XML SQL Review](/docs/sql-review/sql-advisor/gitops-ci#mybatis3-mapper-sql-review-ci---beta) in the code repository as part of the GitOps workflow.
- Support connection over SSH for MySQL instance.

## 🎄 Enhancements

- Show SQL review check errors before warnings.
- Add an option to skip server certificate verification for SSO OIDC.

## 🐞 Bug Fixes

- Fixed some compatibility issues with Oracle 11.

## 🎠 Community

- We are proud to unveil our [new official website](/).
![](/changelog/website-2-0.webp)
- Bytebase 2.0 is now [live on Product Hunt](https://www.producthunt.com/posts/bytebase-2-0)! Help us spread the word by sharing, upvoting, and commenting. Thanks!
- Thanks to @[bun4uk](https://github.com/bun4uk) for chore: update role.go [\#5888](https://github.com/bytebase/bytebase/pull/5888)


## 📰 Fresh off the press

- Introducing [Bytebase 2.0](/blog/bytebase-2-0/), our new Database DevOps platform that manages the entire database development lifecycle: change, query, secure, and govern all databases in a single place.
- As the first quarter of 2023 comes to a close, it's time to reflect on [all that we've accomplished at Bytebase in the past three months](/blog/2023-q1-retrospect/).

## 📕 Installation and Upgrade

Follow [Installation](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary.