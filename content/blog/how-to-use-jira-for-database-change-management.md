---
title: 'How to use Jira for database change management'
author: Tianzhou
published_at: 2024/05/17 19:21:21
feature_image: /content/blog/how-to-use-jira-for-database-change-management/banner.webp
tags: How-to
description: "When team wants to enforce a process for database change management. A quick approach is to reuse their existing ITSM system such as Jira. Let's review how a typical Jira workflow looks like and its inherent limitations."
---

As the engineering team grows and more database change operations executed on the daily basis, we need to find
a centralized way to coordinate and enforce the database change process. A quick approach is to rely on the
existing in-house ITSM (IT service management) or a simple ticketing system. Among them, Jira is probably the
most popular option.

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

1. Developer creates a Jira issue to request the database change. She fills the issue with the `SQL`, `Database` info. The issue status is `Created`.

1. DBA gets assigned to the issue according to the configured workflow. DBA reviews the SQL and leaves the comment under the issue. The issue status is `Reviewing`.

1. After several back and forth, DBA approves the issue and changes the issue status to `Pending Rollout`.

1. DBA pastes the SQL from the Jira ticket into her favorite SQL client and execute.

1. DBA updates the issue status to `Completed`.

## Spaces for Improvements

With Jira, team can now have a centralized place to review and coordinate the database changes. While there leaves plenty spaces
for improvements.

### Disconnected Review and Rollout process

- DBA needs to manually paste the SQL to a different place to execute it. DBA could paste the wrong SQL or execute against the wrong
  database (**the infamous pointing to the production database incorrectly**).

- Change history are obscure. It's hard to track why, when, how a database change happens.

### Lack of Customization for Database Domain

The database change could get quite complex:

- Propagate the changes across different environments.

- Batch change multiple databases sharing the same schema (typical for multi-tenants / multi-regions).

- Enforce automatic SQL lint check.

- Streamline rollbacks.

It's challenging to force a general issue ticketing system to handle the specialized database tasks.

---

Many customers come to [Bytebase](/) from Jira because of the aforementioned challenges. Similar to Jira,
Bytebase has the `Project`, `Issue`. Besides, Bytebase also defines some database domain specific concepts as first-class citizens, such as `Database Instance`, `Database`, `Environment`, `Changelist`. Bytebase provides an integrated
experience to plan, review, and deploy the database changes.

![Issue detail interface](/content/blog/how-to-use-jira-for-database-change-management/issue-detail.webp)
