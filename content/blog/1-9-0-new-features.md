---
title: 'Bytebase 1.9.0 Deep Dive'
author: Tianzhou
published_at: 2022/12/6 21:21:21
feature_image: /blog/1-9-0-new-features/1-9-0-new-features-banner.webp
tags: Explanation
description: Last week, we released Bytebase 1.9.0. Let's take a deeper look into the new features - Sync Schema for PostgreSQL, SQL Editor Admin Mode, and External Approval via Feishu.
---

[This release](/changelog/bytebase-1-9-0) brings Bytebase back to its regular schedule: once every two weeks. The version is upgraded from 1.8.0 to 1.9.0, the MINOR version upgrade also means that we have evolved Bytebase's schema again. With a total of 205 commits, let's check out what's new. 👇

![_](/blog/1-9-0-new-features/1-9-0-commits.webp)

## Bytebase Terraform Provider

First up is the [Bytebase Terraform Provider](https://registry.terraform.io/providers/bytebase/bytebase/latest/docs).

GitHub’s [Octoverse 2022](https://octoverse.github.com/) mentioned that HCL is the fastest-growing language on GitHub, and HCL corresponds to the popularity of Terraform.

![_](/blog/1-9-0-new-features/octoverse-2022.webp)

Whether you're a public cloud powerhouse or a SaaS newcomer, developing a Terraform Provider for your service has become a standard. As part of the toolset to manage your infra, Bytebase has received requests from users who wish to use Terraform to manage Bytebase resources.

![_](/blog/1-9-0-new-features/bytebase-terraform-provider.webp)

We present the first preview to manage your Bytebase **Environment** and **Database Instance**. Terraform and Bytebase are a natural pair, as Terraform provisions the database environment and then passes the information to the Bytebase Terraform Provider. A few HCL files are all it takes to automate the entire database development environment setup.

A few more iterations, and we will have a killer solution.🔥

## Schema Sync for PostgreSQL

After introducing [schema sync for MySQL](/blog/how-schema-sync-work) library table synchronization some time ago, we now bring you [schema sync for PostgreSQL](/docs/change-database/synchronize-schema).

We are confident that Bytebase's schema sync for PostgreSQL solution is the best in the industry because we have the best PG Parser on the market (and is also a constant WIP to perfect it).

There is a lot more that a good parser can do. We have invested a lot of R&D work upfront and now we start to receive dividends to implement features like schema synchronization elegantly.

![_](/blog/1-9-0-new-features/pg-schema-sync.webp)

## Data Anonymization

Previously, Bytebase was focused on database change management (DCM). And another critical piece is data security. This release is our first footstep into this territory, with the ability to [anonymize database fields by tagging them](/docs/administration/anonymize-data).

There's not much to say about the feature alone, after all, many of our friends have them too. The difference is that Bytebase is only here now because we have just laid the groundwork for the system.

Bytebase will launch a series of features around data security, bringing the capabilities previously only available on Oracle and SQL Server platforms to open-source databases like MySQL and PostgreSQL.

And we want to make it easy to use, make developers, DBAs, and audit teams happy, and eventually make the auditors at the Big Four accounting firms happy.

When auditors arrive at a company for an IT data audit and see that they're using Bytebase to manage their databases, they get a slight tingle of joy because they know they won't have to work late today.

Auditors, wait for it.

![_](/blog/1-9-0-new-features/data-masking.webp)

## SQL Editor Admin Mode

For the finale, we present [SQL Editor Admin mode](/docs/sql-editor/admin-mode) with a completely fresh look.

The last release introduced Admin mode, which allows DBAs to execute admin commands. After two weeks of iteration, we have upgraded the Admin mode, to a more command line-like user experience.

A picture is worth a thousand words. I'll bet $1,000 that of the 4 features introduced today, this must be DBAs’ favorite.

![_](/blog/1-9-0-new-features/sql-editor-admin-mode.webp)

## Summary

It’s already Dec. 2022, except for the team building last month, we have maintained a steady two-week delivery rhythm this year.

Looking back at the roadmap I set for Bytebase at the beginning of this year, I think we are mostly on track. There are some regrets, but there are also a lot of surprises from the team and our users.

When I finished Bytebase's core modeling over a year ago, I was a bit insecure, not knowing if the model would stand the test of time. After a year of iterations and user scenarios, it has remained stable. Upon the core model, Bytebase has broadened its boundaries from MySQL to PostgreSQL, from GitLab to GitHub, and from data change to data security.

In 2023, we'll release a cloud version, returning to our team's old roots of cloud services. ☁️

See you next time.
