---
title: Bytebase 2.7.0
author: Mila
published_at: 2023/08/31 17:21:21
feature_image: /content/changelog/2-7-0-banner.webp
description: 'Git-like Branching for database schema migration. Search all Issue histories. Export Audit Logs.'
---

## 🚀 New Features

- Support Git-like Branching for database schema migration.
- Support searching all Issue histories.
- Support exporting [Audit Logs](/docs/security/audit-log/).

## 🎄 Enhancements

- Revamped UI for database change issue.
- SQL Review: support configuring separate settings for different database engines.
- Provide [arm64 Docker image](/docs/get-started/self-host/).

## 🎠 Community

- Thanks to [@kanzihuang](https://github.com/kanzihuang) for PR fix: query when connecting to instance in sql editor [#7524](https://github.com/bytebase/bytebase/pull/7524)
- Thanks to [@vladdoster](https://github.com/vladdoster) for PR docs: fix readme.md spelling and punctuation [#7667](https://github.com/bytebase/bytebase/pull/7667)
- Thanks to [@heng4fun](https://github.com/heng4fun) for PR docs: fix typo Bytebaes [#161](https://github.com/bytebase/bytebase.com/pull/161)

## 📰 Fresh off the press

- NEW video tutorial: [Data Access Control](https://youtu.be/yXo559a1Lpc?si=4TzPaKNQWhmiqZV1). Learn how DBAs can configure DAC policies to regulate how devs interact with data & how devs must request to query data in Bytebase.
- Navicat is a long-established database GUI developed using desktop technology rather than modern web-based technology, so if you are in the mood to try something new: [Top Navicat Alternatives](/blog/top-navicat-alternative/).
- Save your Snowflake budget and configure [auto-suspend and auto-resume](/blog/what-is-snowflake-auto-suspend-auto-resume/) (only paying for what you actually use).💸

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
