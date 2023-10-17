---
title: Bytebase 0.6.0
published_at: 2021/09/18 07:53:00
---

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._

## 🚀 New Features

### Support [TiDB](https://pingcap.com/)

TiDB is an open-source, cloud-native, distributed SQL database for elastic scale and real-time analytics.

### Add task check to gate schema change

- This works similar as [GitHub merge request check](https://docs.github.com/en/github/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks). The schema change only proceeds if all check pass.
- In this initial launch, we enforce 2 checks, db connection check and syntax check for the schema change task. We plan to add more checks like advanced SQL analyzer in the future.

## 🎄 Enhancement

- Show VCS push event info in the migration history detail page.
- Improve UX for configuring the instance connection.
- Improve UX for transferring database between projects.
- Create dedicated migration history tab for a particular database.
- Add baseline migration history record upon creating the database.

## 🎠 Community

- A special thanks to [TiDB's open source compatible MySQL parser](https://github.com/pingcap/parser). It saves us a lot of effort to implement our syntax checker.
- We have migrated changelog to our newsletter system as well. So in the future, new changelog will also be delivered to your email automatically.
