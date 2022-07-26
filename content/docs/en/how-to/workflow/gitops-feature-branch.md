---
title: GitOps with Feature Branch Workflow
description: Best practice for configuring feature branch workflow
---

## Overview

In a Git feature branch workflow, all feature development takes place in a dedicated branch. When the feature development finishes, it will be merged into the main branch. This articles shows you a typical Bytebase setup for one main branch, one feature branch.

## Setup

The final setup looks like this:

![feature-branch-setup](/docs/en/how-to/workflow/gitops-feature-branch/final-setup.webp)

You have two branches, one `main` branch and one `dev` branch for the feature work. The `main` branch corresponds to the production envrionment and the `dev` branch corresponds to the dev environment. The production environment has a `db_prod` database and the dev environment has a `db_dev` database.

Detailed steps in Bytebase:

1. Create two environments named `Dev` and `Prod` respectively.
1. Create two projects named `Dev Project` and `Prod Project` respectively.
1. Add the database instances containing `db_dev` and `db_prod` respectively.
1. Transfer `db_dev` to `Dev Project` and transfer `db_prod` to `Prod Project`.
1. Enable [Version Control Workflow](/docs/vcs-integration/enable-version-control-workflow) for both projects. The only difference is the branch setting:
   ![feature-branch-setup](/docs/en/how-to/workflow/gitops-feature-branch/branch-setting.webp)

With this setup, when a SQL migration file is commited to the `dev` branch, Bytebase will create an issue to apply that migration file to `db_dev`.

When you merge one or more SQL migration file commits from the `dev` branch to the `main` branch, Bytebase will create **a separate issue for each different SQL migration file** and apply the corresponding migration change to `db_prod`.

<hint-block type="info">

Bytebase only creates the issue with the migration change. Depending on the environment approval policy, Bytebase will either apply the change immediately to the database or wait for approval.

</hint-block>

## Learn more

<doc-link-block url="/docs/vcs-integration/overview" title="VCS Integration Setup"></doc-link-block>
