---
title: 'Hope is not a Strategy, nor is Jira'
author: Tianzhou
updated_at: 2024/05/17 19:21:21
feature_image: /content/blog/use-jira-for-database-change/banner.webp
tags: Industry
description: "When team wants to enforce a process for database change management. A quick approach is to reuse their existing ITSM system such as Jira. Let's review how a typical Jira workflow looks like and its inherent limitations."
keypage: true
---

As the engineering team grows and more database change operations are executed on a daily basis, we need to find a centralized way to coordinate and enforce the database change process. A quick approach is to rely on the existing in-house ITSM (IT service management) or a simple ticketing system. Among them, Jira is probably the most popular option.

## A Typical Jira Setup

1. Define a [custom Jira workflow](https://www.atlassian.com/software/jira/guides/workflows/overview#what-is-a-jira-workflow).
   You may define a dedicated status set for the database change process. e.g. `Created`, `Reviewing`, `Pending Rollout`, `Completed`.

1. Define a [custom Jira issue type](https://support.atlassian.com/jira-cloud-administration/docs/add-edit-and-delete-an-issue-type/)
   and some [custom fields](https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-custom-fields/) such as `SQL`, `Database`, `Rollout Time`.

1. Create roles for the reviewers (normally DBA or the project owner) and requesters (normally the developer) respectively.

## Database Change Workflow

<HintBlock type="info">

The similar workflow can also be applied to other database tasks such as requesting query access and data export.

</HintBlock>

1. The developer creates a Jira issue to request the database change. She fills the issue with the `SQL`, `Database` info. The issue status is `Created`.

1. The DBA gets assigned to the issue according to the configured workflow. DBA reviews the SQL and leaves a comment under the issue. The issue status is `Reviewing`.

1. After several back-and-forth communications, the DBA approves the issue and changes the issue status to `Pending Rollout`.

1. The DBA pastes the SQL from the Jira ticket into their favorite SQL client and execute.

1. The DBA updates the issue status to `Completed`.

## Space for Improvement

With Jira, teams can now have a centralized place to review and coordinate the database changes. However, there is still plenty of space for improvement.

### Disconnected Review and Rollout process

- The DBA needs to manually paste the SQL to a different place to execute it. The DBA could paste the wrong SQL or execute against the wrong
  database (**the infamous mistake of pointing to the production database incorrectly**).

- Change histories are obscure. It's hard to track why, when, and how a database change happens.

### Lack of Customization for the Database Domain

Database changes can get quite complex:

- Propagating the changes across different environments.

- Batch changing multiple databases having the same schema (typical for multi-tenant/multi-region setups).

- Enforcing automatic SQL lint checks.

- Streamlining rollbacks.

It's challenging to force a general issue ticketing system to handle the specialized database tasks.

## Why Bytebase

Many customers come to [Bytebase](/) from Jira because of the aforementioned challenges. Similar to Jira,
Bytebase has the concepts of `Project`, `Issue`. Additionally, Bytebase defines some database domain-specific concepts as first-class citizens, such as `Database Instance`, `Database`, `Environment`. Bytebase provides an integrated
experience to plan, review, and deploy database changes.

![Issue detail interface](/content/blog/use-jira-for-database-change/issue-detail.webp)
