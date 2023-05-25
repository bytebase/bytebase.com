---
title: Change Databases from Multiple Environments
---

A development pipeline usually consists of multiple environments.
Each environment has its own isolated database to store the respective data. A schema change will be propagated from each databases following the development pipeline. You may have multiple databases in one stage as well.

In Bytebase, you can select multiple databases from different environments to apply the database change.

![Select database from multiple environments](/content/docs/batch-change/multi-environment-database-select.webp)

Then Bytebase will then create an issue to track the multi-database changes. You may roll out changes one database after another or batch rollout databases at the same stage.

![Change Database from multiple environments](/content/docs/batch-change/multi-environment-database-change.webp)
