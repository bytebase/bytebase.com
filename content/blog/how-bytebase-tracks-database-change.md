---
title: How Bytebase Tracks Database Change
author: Tianzhou
updated_at: 2024/07/15 09:00:00
feature_image: /content/blog/how-bytebase-tracks-database-change/banner.webp
tags: Explanation
featured: true
description: How Bytebase tracks database changes throughout the lifecycle
---

With Bytebase, teams know **who**, **what**, **when**, **why**, **how** a database change has happened.

## Issue Detail

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail.webp)

Bytebase Issue is the container to capture a database change process. A single issue can contain a change
to a single database as well as changes to hundreds of databases spanning multiple environments.

## Who

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-who.webp)

1. Issue Creator
1. Reviewers according to the [Rollout Policy](https://docs.bytebase.com/change-database/environment-policy/rollout-policy/)
1. Subscribers interested in the progress.
1. Other participants can comment.

## What

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-what.webp)

1. The target database instance, environment, and the database.
1. The SQL change statement.

## When

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-when.webp)

You can specify when to deploy the issue (e.g. 2:00 midnight during non-business hours).

## Why

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-why.webp)

1. Title to provide a change summary.
1. Description to provide detailed change context.
1. Labels to attach keyword information.
1. Comment to provide more context.

## How

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-how.webp)

1. The database change process is organized into multiple stages.
1. The change is identified as high risk change and requires two approvers.
1. Checks
   - [SQL Review](https://docs.bytebase.com/sql-review/overview/) checks various anti-SQL patterns.
     ![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-how-sql-review.webp)
   - Summary report shows the estimated impact.
     ![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-how-summary.webp)

### Editing Activity Log

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-activity.webp)

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-activity-detail.webp)

### Change Execution Log

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-change-execution-log1.webp)

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-change-execution-log2.webp)

### Change History

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-change-history.webp)

1.  Affected Tables
1.  Change statement
1.  Change diff

### Webhook Notification

![_](/content/blog/how-bytebase-tracks-database-change/issue-detail-webhook.webp)

Configure webhook to post change progress to the IM channel.

### Summary

Different from a [general issue tracking system like Jira](/blog/use-jira-for-database-change/), Bytebase
is built specifically for the database change management. Bytebase provides much more context
to track the entire database change process.
