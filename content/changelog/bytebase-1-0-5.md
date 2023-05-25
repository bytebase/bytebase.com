---
title: Bytebase 1.0.5
author: Ningjing
published_at: 2022/05/12 10:58:34
description: Launch the Chinese version of our official website. Add custom project webhook. Add "Format on save" checkbox on the issue detail page. Add "Sync schema afterward" checkbox on the instance create and detail page.
---

- **Launch the Chinese version of our official website.**

![_](/content/changelog/1.0.5/frontpage-chinese.webp)

## 🎄 Enhancement

- **Add custom project webhook.**

  The webhooks we currently support are pre-defined and basically can only do notifications, custom webhook can be more flexible to interact with some external systems (for example, external systems want to sense the status of an issue and do some different operations based on the issue status).
  ![_](/content/changelog/1.0.5/custom-webhook.webp)

- **Add "Format on save" checkbox on the issue detail page.**

  With the default check, when the users click the "Create issue" button, the SQL statement will be automatically formatted.

- **Add "Sync schema afterward" checkbox on the instance create and detail page to allow users to disable the database sync if needed.**

  Currently, we sync the schema upon adding/patching the instance. This provides a better UX since the user will see the schema after adding the instance. However, for instances having large schemas, the request will timeout and prevents them from adding the instance at all. The added checkbox only appears if connection-related info is changed.

![_](/content/changelog/1.0.5/add-instance-sync-schema-later.webp)

## 🐞 Bug Fix

- Fix bugs that prevent GitLab providers from being added or modified under certain circumstances, and improve the overall experience of integrating GitLab for users.

## 🎠 Community

- **Open source the design doc for Point-in-Time Recovery (PITR) [https://github.com/bytebase/bytebase/blob/main/docs/design/pitr-mysql.md](https://github.com/bytebase/bytebase/blob/main/docs/design/pitr-mysql.md).**

  In order to enhance Bytebase's backup recovery capabilities and allow users to restore the database state to any point in time, we designed the Point-in-Time Recovery (PITR) feature integrated into the Bytebase workflow.

![_](/content/changelog/1.0.5/pitr-design-doc.webp)

- Thanks to [@unknwon](https://github.com/unknwon) for the PR [feat: implement add GitHub as Git provider](https://github.com/bytebase/bytebase/pull/998).
- Thanks to [@Cluas](https://github.com/Cluas) for the PR [feat: add custom project webhook](https://github.com/bytebase/bytebase/pull/1184).
- Thanks to [@tnir](https://github.com/tnir) for the PRs [chore: update GitLab logos updated in 2022](https://github.com/bytebase/bytebase/pull/1215) , [docs: fix typos in types/pipeline/README.md](https://github.com/bytebase/bytebase/pull/1231), [fix(ui): tweak warning message in readonly mode](https://github.com/bytebase/bytebase/pull/1229).

## 📕 Installation and Upgrade

Follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation). If you upgrade from a previous version, just restart after obtaining the new release binary.
