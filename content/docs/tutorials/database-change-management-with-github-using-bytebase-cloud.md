---
title: 'Database CI/CD and Schema Migration with GitHub using Bytebase Cloud'
author: Ningjing
updated_at: 2024/05/11 16:15
feature_image: /content/docs/tutorials/database-change-management-with-github-using-bytebase-cloud/feature-image.webp
tags: Tutorial
integrations: General, GitHub
level: Intermediate
estimated_time: '30 mins'
description: Bytebase provide its SaaS version since 1.15.0, this tutorial will bring your schema change to the next level by introducing the GitOps workflow, where you commit schema change script to the GitHub repository, which will, in turn, trigger the schema deployment pipeline in Bytebase Cloud.
---

A series of articles about Database Change Management using Bytebase Cloud. We take Amazon Aurora MySQL as an example and is also applicable to Amazon Aurora Serverless.

- [Database Change Management using Bytebase Cloud](/docs/tutorials/database-change-management-using-bytebase-cloud)
- Database CI/CD and Schema Migration with GitHub using Bytebase Cloud (this one)

---

In the last article [Database Change Management using Bytebase Cloud](/docs/tutorials/database-change-management-using-bytebase-cloud), you have tried **UI workflow** in Bytebase.

This tutorial will bring your schema change to the next level by introducing the **GitOps workflow**, where you commit the schema change script to the GitHub repository, which will in turn trigger the schema deployment pipeline in Bytebase.

You can use Bytebase's **Community Plan** to finish the tutorial.

## Features included

- GitOps Workflow

## Prerequisites

Before you start this tutorial, make sure you have the following ready:

- Followed our previous UI-based change tutorial [Database Change Management using Bytebase Cloud](/docs/tutorials/database-change-management-using-bytebase-cloud).
- An Amazon Aurora MySQL instance.
- A GitHub account.
- A public GitHub repository, e.g. `test-bb-gitops`.

## Step 1 - Connect Bytebase with GitHub.com

<IncludeBlock url="/docs/share/tutorials/vcs-with-github"></IncludeBlock>

## Step 2 - Enable GitOps workflow

<IncludeBlock url="/docs/share/tutorials/vcs-in-project-github"></IncludeBlock>

## Step 3 - Change schema by pushing SQL schema change files to GitHub

<IncludeBlock url="/docs/share/tutorials/vcs-change-github" db="mysql"></IncludeBlock>

## Summary and What's Next

<IncludeBlock url="/docs/share/tutorials/vcs-summary-github"></IncludeBlock>
