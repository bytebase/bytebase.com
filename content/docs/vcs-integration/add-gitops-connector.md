---
title: Add GitOps Connector in Project
---

You can add multiple GitOps connectors in the project, each targeting a different [database group](/docs/concepts/data-model/#database-group-and-table-group).

## Prerequisites

- There exists at least one configured [Git Provider](/docs/vcs-integration/overview/).
- You must be the **Project Owner** to add GitOps connector in the project.

## Procedure

Go to the project you wish to enable GitOps workflow for. Choose **GitOps** and click **Add GitOps connector**.

![project-vcs-step](/content/docs/vcs-integration/add-gitops-connector/project-vcs-step1.webp)

## Step 1 - Choose Git provider

<HintBlock type="info">

You can only link Git repository from one of the existing Git providers in Bytebase. If your desired Git provider is not there, you need to contact **Workspace Admin** to [add Git Provider](/docs/vcs-integration/overview/).

</HintBlock>

![project-vcs-step](/content/docs/vcs-integration/add-gitops-connector/project-vcs-step2.webp)

## Step 2 - Select repository

<HintBlock type="info">

For GitLab, Bytebase only lists repositories where you have at least the **Maintainer** role. This is because to configure the VCS integration, Bytebase needs to create the webhook, which requires **Maintainer** role.

</HintBlock>

![project-vcs-step](/content/docs/vcs-integration/add-gitops-connector/project-vcs-step3.webp)

Select the repository you want to link to the Bytebase project.

## Step 3 - Configure deploy

![project-vcs-step](/content/docs/vcs-integration/add-gitops-connector/project-vcs-step4.webp)

### Target one or multiple databases

Specify the `Database Group` that the migration files apply to from VCS. If not specified, Bytebase will
apply the migration files to all the databases in the project.

### Observe branch

Specify the `Branch` where Bytebase observes the migration files.

### Observe migration files

Specify the `Base directory` where Bytebase observes the migration files. Bytebase only observes
migration file changes under this **immediate** directory (subdirectories ignored).

By default, Bytebase observes the root directory `/`.

<HintBlock type="info">

We recommend to create a dedicated directory called `bytebase` under the repository root to store all your Bytebase related migration files.

</HintBlock>

---

Click **Finish** button to complete the setup. Check [troubleshoot](/docs/vcs-integration/troubleshoot/) to debug.
