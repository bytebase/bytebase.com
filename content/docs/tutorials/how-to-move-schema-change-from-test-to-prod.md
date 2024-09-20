---
title: How to Move Schema Change from Test to Prod
author: Dec
updated_at: 2024/09/20 18:00
feature_image: /content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/feature.webp
tags: Tutorial
integrations: General
level: Beginner
estimated_time: '30 mins'
description: 'Learn to move database schema change from test to prod environment.'
---

We're demonstrating this process using our sample [demo](https://demo.bytebase.com/) data in the Basic Project.

You have three options to move database schema change from test to prod as follows.

## Option 1: Streamlined rollout

Select both databases to **Edit Schema**, where you type in raw SQL code and click **Create**. Checks will automatically run and you can **Approve** the change and **Rollout**.

![streamlined-rollout](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/streamlined-rollout.webp)

If anything went wrong, rollout would be blocked.

![streamlined-rollout-error](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/streamlined-rollout-error.webp)

## Option 2: Schema Synchronization

Select only `test` database to **Edit Schema**. Approve and Rollout like we did to the two databases in Option 1. Then enter **Sync Schema** on the left-side bar. Select `test` in **Database** to refer to, and choose a **Schema version**. Select `prod` as target database, then you can preview the Schema change.

![select-target-databases](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/select-target-databases.webp)

**Prevew issue** to Run checks, Approve, and Rollout as we did before. Thus the Schema change is successfully synced from `test` to `prod`.

## Option 3: Use Changelist

Enter **Changelists** on the left-side bar. You can create a **New Changelist** by uploading file.

Choose the changelist and **Apply to database**, choose both database and you'll be Creating an issue interface again. Just Rollout this issue as we did.
