---
title: Change Databases from Multiple Environments
---

A development pipeline usually consists of multiple environments such as dev, test, integration, staging, prod.
Each environment has its own isolated database to store the respective data. A schema change will be propagated from each databases following the development pipeline.

In Bytebase, you can select multiple databases from the different environments to apply the database change.

![Select database from multiple environments](/docs/batch-change/multi-environment-database-select.webp)

Then Bytebase will then create an issue to track the multi-database changes.

![Change Database from multiple environments](/docs/batch-change/multi-environment-database-change.webp)
