---
title: GitOps with Feature Branch Workflow
author: Ningjing
published_at: 2023/06/20 18:00
feature_image: /content/docs/tutorials/gitops-feature-branch/final-setup.webp
tags: Tutorial
integrations: 'Azure DevOps, GitHub, GitLab, Bitbucket'
level: Intermediate
estimated_time: '15 mins'
description: Best practice for configuring feature branch workflow for VCS
---

## Overview

In a Git feature branch workflow, all feature development takes place in a dedicated branch instead of main branch. When the feature development finishes, it will be merged into the main branch. This articles shows you a typical Bytebase setup for teams using one `main` branch and one `dev` (feature) branch.

## Prerequisites

- You have two branches:

1. One `main` branch corresponds to the `prod` envrionment, and it has a `db_prod` database.
2. One `dev` branch for the feature work corresponds to the `dev` environment, and it has a `db_dev` database.
   ![feature-branch-original-setup](/content/docs/tutorials/gitops-feature-branch/original-setup.webp)

- You [installed](/docs/get-started/self-host) Bytebase and have **Workspace Admin** role.

## The Procedure

### Step 1 - Configure the workspace

1. Go to **Settings** > **Workspace** > **Version Control** to [add a VCS provider](/docs/vcs-integration/self-host-gitlab).
2. Click **Environments** and create two environments `Dev` and `Prod`. You can configure **approval policy** as require or skip manual approval.
3. Click **Instances** > **Add Instance** to add instances where `db_prod` and `db_dev` are located.

### Step 2 - Create `Dev Project`

1. Click **Projects** > **New Project** and enter `Dev Project` in **Project Name**.
2. In `Dev Project`, click **Transfer in DB** and choose `db_dev` database.
3. Click **Version Control** on the project tab bar, and choose **GitOps workflow** and [enable GitOps workflow](/docs/vcs-integration/add-gitops-connector).
   ![feature-branch-setup](/content/docs/tutorials/gitops-feature-branch/branch-setting.webp)

### Step 3 - Create `Prod Project`

- Repeat Step 2, but with **Prod** instead of **Dev**, e.g. `Prod Project` instead of `Dev Project`.

### Step 4 - Create SQL migration file

- Name and organize SQL migration files like [this](/docs/vcs-integration/create-migration-files).

## Final Setup

The final setup looks like this:

![feature-branch-setup](/content/docs/tutorials/gitops-feature-branch/final-setup.webp)

With this setup,

- When a SQL migration file is committed to the `dev` branch, Bytebase will create an issue in `Dev Project` and apply that migration file to `db_dev`.

- When you merge the `dev` branch to the `main` branch with one or more SQL migration file commits, Bytebase will create **a separate issue for each SQL migration file** in `Prod Project` and apply the corresponding migration change to `db_prod`.

<HintBlock type="info">

Bytebase only creates the issue with the migration change. Depending on the [environment approval policy](/docs/get-started/step-by-step/set-up-environments), Bytebase will either apply the change immediately to the database or wait for approval.

</HintBlock>

## Learn more

<DocLinkBlock url="/docs/vcs-integration/overview" title="VCS Integration Setup"></DocLinkBlock>
