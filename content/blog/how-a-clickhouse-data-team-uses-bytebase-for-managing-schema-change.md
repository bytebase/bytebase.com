---
title: How a Data Team Uses Bytebase to Manage Schema Change for ClickHouse
author: Ningjing
published_at: 2022/09/25 09:42:58
feature_image: /content/blog/how-a-data-team-uses-bytebase-to-manage-schema-change-for-clickhouse/bytebase-for-feature-development.webp
tags: Case Study
integrations: ClickHouse
featured: true
description: We are a data team within a 500-person company. The company has several customer-facing products, and we are a group of data scientists analyzing data to uncover customer, product, and operational insights.
---

## Context

We’re a data team within a 500-person company. The company has several customer-facing products, and we are a group of data scientists analyzing data to uncover customer, product, and operational insights:

- ClickHouse is the primary analytical processing database we use.
- All resources are deployed on-premise.
- QA (Dev) and Prod environments are in separate networks.
- We use local GitLab installation as the version control system (VCS).

## Problems

We have three main problems:

### 1) Lack of ClickHouse tools

There are very limited choices of schema migration tools for ClickHouse, out of those the majority don’t have UI.

### 2) SSH operation is problematic

Schema migration requires command line tools and, therefore, ssh access to the host to run the scripts, which is problematic when you have a larger team with different access/responsibility areas.

### 3) Manual database version control in feature branch development

Most of the tools require users to take care of the schema change versioning management, making it error-prone, as two different users can make changes to the same object and clash with each other.

We adopt the feature branch development workflow for our project, so people manage new migration scripts in their own dev (feature) branches and deploy them to the dev database. In the process, we sometimes want to merge the dev branch into the master to run the scripts on the production database.

![feature-development](/content/blog/how-a-data-team-uses-bytebase-to-manage-schema-change-for-clickhouse/feature-development.webp)

To prevent anyone from messing up the production scripts, we version all our changes. For example, we use `yyyymmddNNNN` for version naming, where `NNNN` is just an integer, starting from 0001 and then 0002, ... and so on.

Although the migration scripts are version-controlled, someone still has to connect to the ClikcHouse instance and run the script manually. This is both inconvenient and error-prone. E.g. Someone could have a fat finger and might apply the dev migration script to the production database.

## Evaluating Bytebase

We found out Bytebase last November from the [ClickHouse third-party page](https://clickhouse.com/docs/en/interfaces/third-party/gui/#bytebase), it looks promising because:

- It has a modern UI which makes it easier for all the team members to get started.
- It’s the only tool supporting the Database GitOps workflow.

According to our understanding, if we integrate Bytebase into our workflow, most people in the team only need to work with GitLab commit/push/merge; Bytebase will automatically create a workflow to apply the migration script upon the commit push event. And we can configure the workflow approval policy deciding whether the deployment requires manual approval.

We tried the GitOps integration in the development environment, and it worked as advertised. The entire process is streamlined between GitLab and Bytebase. Bytebase also keeps track of every migration history and the diffs in between.

There are a couple of hiccups. E.g., there was a time-out when Bytebase syncs our decent-sized ClickHouse cluster, we [opened a GitHub issue](https://github.com/Bytebase/Bytebase/issues/499), and the Bytebase team was very responsive and addressed it in the next release.

## Deploying to Prod

We spent another couple of months to make our infrastructure ready (It’s not just for Bytebase, but for our overall platform readiness to onboard new services). About three months ago, when everything was ready, we started to deploy Bytebase to our production environment. Since we had tested extensively in our Dev environment, we thought the process would be smooth.

However, we immediately hit a roadblock. Our prod ClickHouse cluster has enabled SSL connection, and unfortunately, Bytebase didn’t support SSL at that time. We were pretty frustrated since we have already invested a decent amount of time and it’s so close. So we [opened another GitHub issue](https://github.com/bytebase/bytebase/discussions/1513), after several thread exchanges, we got on a shared Slack channel with the Bytebase team, and within a week, they delivered the SSL feature. After the SSL issue is addressed, everything else works like a charm.

## Our Setup

Instead of using one project to handle two environments, we decided to use "one project per environment". Now, people can create scripts and deploy them as before. All these changes will be tracked by "Dev Project". Only when the selected dev changes merged into the main branch does "Prod Project" gets rolling.

The practice in detail is now in Bytebase’s recommended workflow: [https://www.bytebase.com/docs/how-to/workflow/gitops-feature-branch](/docs/how-to/workflow/gitops-feature-branch)

![bytebase-for-feature-development](/content/blog/how-a-data-team-uses-bytebase-to-manage-schema-change-for-clickhouse/bytebase-for-feature-development.webp)

## Overall Benefits

We have achieved the following goals by adopting Bytebase:

- Remove the manual migration process. Manually making production database schema change is always a stressful and risky task.
- Detailed migration history. We find Bytebase records a very detailed migration timeline:
  - When the migration happens - the start time, finish time.
  - Why the migration happens - in our GitOps setup, Bytebase links back to the commit page from GitLab.
  - What’s the exact migration - the migration script and the before/after full schema snapshot.
  - How the migration happens - there are activities recording every state change and writing back to the lastest schema file.
- Also, a nice UI to oversee the process.
