---
title: What is Database Version Control?
author: Tianzhou
updated_at: 2023/11/14 16:40:00
feature_image: /content/blog/database-version-control/banner.webp
tags: Explanation
description: Collaboration and Teamwork, Change Tracking and History, Migration Scripts, Branching and Merging, Deployment and Rollback, VCS Integration GitOps are key aspects of database version control
---

This is a series of articles about database version control and database-as-code (GitOps)

1. Database Version Control (this one)
1. [Database Version Control, State-based or Migration-based?](/blog/database-version-control-state-based-vs-migration-based)
1. [Database as Code - the Good, the Bad and the Ugly](/blog/database-as-code)
1. [The Database as Code Landscape](/blog/database-as-code-landscape)
1. [Database Version Control Best Practice](/blog/database-version-control-best-practice)
---

Database version control is the practice of managing and tracking changes to a database schema and its associated data over time. It involves using version control systems and techniques to keep a history of modifications made to a database, enabling teams to track changes, collaborate effectively, and deploy updates with confidence.

Using a version control system (VCS) for managing code is already the de facto standard. On the other hand, adopting VCS or a similar technique is still in its early stages. Below we list some key aspects of database version control and how Bytebase facilitates them.

## Collaboration and Teamwork

Version control facilitates collaboration among team members by providing a centralized repository for sharing and managing database changes. Bytebase is like GitLab/GitHub where it provides a workspace for developers and DBAs to collaborate on database changes.

![issue-detail](/content/blog/database-version-control/issue-detail.webp)

## Change Tracking and History

Version control systems store the history of changes made to the database schema and associated scripts. This history includes details like who made the change, when it was made, and why. In Bytebase, every [change history](/docs/change-database/change-workflow/#migration-history) is captured.

![change-history](/content/blog/database-version-control/change-history.webp)

![change-history-diff](/content/blog/database-version-control/change-history-diff.webp)

## Migration Scripts

Database version control often relies on migration scripts, which are code files that define the necessary changes to the database schema. These scripts typically contain SQL statements or other database-specific commands to create, modify, or delete database objects. In Bytebase, one can use [Changelist](/docs/changelist/) to compose the migration scripts.

![change-list](/content/blog/database-version-control/changelist.webp)

## Deployment and Rollback

By keeping a history of changes, version control enables controlled deployment of database updates. If a problem occurs, it allows teams to roll back to a previous version of the database schema and associated data. Bytebase provides the following rollback options:

- Data rollback. Using undo logs like MySQL binlog to roll back data changes.
- Restore from backup and Point-in-time-Recovery (PITR). You can instruct Bytebase to take manual or periodic backups and restore from them.
- Schema synchronization. You can synchronize one database schema to another. Bytebase can calculate the difference and apply the change.

## VCS Integration #GitOps

Database version control should be integrated into the overall development workflow. Continuous integration and continuous deployment (CI/CD) pipelines can be set up to automate the process of applying database changes.
You can configure CI in the VCS to check SQL lint with Bytebase. Below are examples for GitHub Action and GitLab CI respectively.

![github](/content/blog/database-version-control/github-action.webp)
![gitlab](/content/blog/database-version-control/gitlab-ci.webp)

Moreover, you can configure a Bytebase project to link to a VCS repository to observe code changes. Developers still manage the migration scripts in VCS, and when a new migration script is committed, Bytebase will catch the event and create an issue to roll out that migration script.

![git](/content/blog/database-version-control/git-commit.webp)
![issue](/content/blog/database-version-control/git-commit-triggered-issue.webp)

## Summary

After all, database version control is version control. Developers expect to manage the database change in a similar way as managing their code changes. And just like GitLab/GitHub, Bytebase is built for teams to manage database changes in a Git-like way. Check out the [live demo](/view-live-demo/?source=blog) now.
