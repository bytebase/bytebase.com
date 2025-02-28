---
title: How to Move Schema Change from Test to Prod
author: Ayra
updated_at: 2024/09/24 18:00
tags: Tutorial
integrations: General
level: Beginner
estimated_time: '5 mins'
description: 'Learn to move schema change from test to prod.'
---

We're demonstrating this process using our sample [demo](https://demo.bytebase.com/) data in the Basic Project. **Select Project** on the upper-left where you choose `Basic Project`. Now you can operate within the project.

![basic-project](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/basic-project.webp)

You have three options to move schema change from `test` to `prod` as follows.

## Option 1: Streamlined rollout

Go to **Database** -> **Databases** section on the left-side bar. Select both databases to **Edit Schema**, where you type in raw SQL code in the code block and click **Create**. Checks will automatically run and then you can **Approve** the change and **Rollout**.

![streamlined-rollout](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/streamlined-rollout.webp)

## Option 2: Schema Synchronization

Also within **Database** -> **Databases** section on the left-side bar in `Basic Project` interface, select only `test` database to **Edit Schema**. Create, Approve and Rollout like we did to the two databases in Option 1.

Then enter [**Sync Schema**](/docs/change-database/synchronize-schema/) on the left-side bar. Select `test` in **Database** to refer to, and choose a **Schema version**. Click **Next**.

![select-source-schema](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/select-source-schema.webp)

Select `prod` as target database.

![select-target-databases-1](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/select-target-databases-1.webp)

You can see how Bytebase shows the diff between the test database (source) and the prod database (target). **Preview issue** to roll out the difference

![select-target-databases-2](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/select-target-databases-2.webp)

**Create** this issue, approve and roll out as we did before.

![select-target-databases-3](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/select-target-databases-3.webp)

Thus we have successfully propagate the change from `test` to `prod`.

## Option 3: Changelist

Still within `Basic Project` interface, enter [**Changelists**](/docs/changelist/) section on the left-side bar, where you can create a **New Changelist**.

![changelist-entry](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/changelist-entry.webp)

In the details page of our new changelist, besides **Upload .sql or .zip file**, we can also click the `+` to **Add Change**.

![changelist-details-page](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/changelist-details-page.webp)

We can choose `Change History` as Change source to add our former schema changes to changelist. Or, we can edit **Raw SQL** to add any schema change to our changelist.

![changelist-add-change](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/changelist-add-change.webp)

Having finished editing the new changelist, **Apply to database** where you choose both databases to **Edit Schema**. Then just create and roll out the issue as we did.

![changelist-apply](/content/docs/tutorials/how-to-move-schema-change-from-test-to-prod/changelist-apply.webp)

## Related docs

- [Streamlined Rollout](/docs/change-database/batch-change/#change-databases-from-multiple-environments)
- [Schema Synchronization](/docs/change-database/synchronize-schema)
- [Changelist](/docs/changelist)
