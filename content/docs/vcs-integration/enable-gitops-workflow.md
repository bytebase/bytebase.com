---
title: Enable GitOps Workflow in Project
---

<HintBlock type="warning">

To enable GitOps workflow, project owner needs to link one of their Git repositories with their Bytebase project.

</HintBlock>

Estimate setup time: 15 minutes.
This guide will walk you through how to enable the GitOps workflow for a project in Bytebase. This is a [reference setup](https://demo.bytebase.com/project/blog-git-3003#version-control) showing what it will look like after the setup.

## Prerequisites

- You should be the **Project Owner** to enable GitOps workflow in the project.

## Procedure

Go to the project you wish to enable GitOps workflow for. Choose **GitOps** and click **Configure GitOps**.

![project-vcs-step](/content/docs/vcs-integration/enable-gitops-workflow/project-vcs-step1.webp)

## Step 1 - Choose Git provider

<HintBlock type="info">

You can only link Git repository from one of the existing Git providers in Bytebase. If your desired Git provider is not there, you need to contact **Workspace Owner** to follow [Add Git Provider](/docs/vcs-integration/add-git-provider) to add it.

</HintBlock>

Click the Git provider hosting your repository, and Bytebase will start the OAuth process with your chosen Git provider. If you are not currently logged into that provider, you will be prompted to login first in order to complete the OAuth.

<HintBlock type="info">

If you encounter errors during this process, it's likely the Git provider is not setup properly and you need to contact **Workspace Owner** to double check the setup following [Add Git Provider](/docs/vcs-integration/add-git-provider).

</HintBlock>

![project-vcs-step](/content/docs/vcs-integration/enable-gitops-workflow/project-vcs-step2.webp)

## Step 2 - Select repository

If the OAuth process is successful, you will be prompted to **STEP 2: Select repository**.

<HintBlock type="info">

For GitLab, Bytebase only lists repositories where you have at least the **Maintainer** role. This is because to configure the VCS integration, Bytebase needs to create the webhook, which requires **Maintainer** role.

</HintBlock>

![project-vcs-step](/content/docs/vcs-integration/enable-gitops-workflow/project-vcs-step3.webp)

Select the repository you want to link to the Bytebase project.

## Step 3 - Configure deploy

![project-vcs-step](/content/docs/vcs-integration/enable-gitops-workflow/project-vcs-step4.webp)

The final step allows you to configure the following settings:

#### Branch - Required

This is the branch where Bytebase observes the migration SQL file changes.

<HintBlock type="info">

For GitLab, you can specify wildcards, such as "**feature/\***" to match branches starting with "feature/".

</HintBlock>

#### Base directory - Optional

Default: `root directory`

Bytebase only observes migration file changes under this directory and all its sub-directories. we recommend to create a dedicated directory called "bytebase" under the repository root to store all your Bytebase related migration files.

Click "Finish" button to complete the setup. Under the hood, this will create a webhook in the linked repository so that Bytebase can observe code changes.

#### Schema change type - Required

Default: `Migration-based`

Bytebase provides two schema change type:

- Migration-based
- State-based (Beta)

Migration-based schema change type allows user to apply schema change by DDL.
State-based schema change type provides a declarative way to describe the desired state of the schema.

<DocLinkBlock url="/docs/change-database/state-based-migration" title="State-based Migration"></DocLinkBlock>

#### File path template - Required

Default: `{{ENV_ID}}/{{DB_NAME}}##{{VERSION}}##{{TYPE}}##{{DESCRIPTION}}.sql`

The file path template allows user to customize the file path format of the migration file. This path is relative to the base directory set above. The template supports following placeholders:

Required placeholders (must present in the template):

- `{{DB_NAME}}` - Specify the database name.
- `{{VERSION}}` - Specify the migration version.
- `{{TYPE}}` - Specify the migration type. Can be either "ddl" for [schema migration](/docs/concepts/database-change-workflow/#schema-migration) or "dml" for [data migration](/docs/concepts/database-change-workflow/#data-migration). Alternatively, you can use the alias names "migrate" and "data" for "ddl" and "dml" respectively.

Optional placeholders

- `{{ENV_ID}}` - Specify the lower-case environment identifier. This is useful to disambiguate the specified database if databases share the same name across different environments.
- `{{DESCRIPTION}}` - Specify a description for the migration.

Check [name and organize schema files](/docs/vcs-integration/name-and-organize-schema-files) for the recommended file path template.

#### Schema path template - Optional

Default: `{{ENV_ID}}/.{{DB_NAME}}##LATEST.sql`

When specified, after each migration, Bytebase will write the latest schema to this schema path relative to the base directory in the same branch as the original commit triggering the migration. Leave empty if you don't want Bytebase to do this.

💡 **This is useful to let repository always keep a complete schema of the corresponding database.**

<HintBlock type="warning">

Make sure the changed branch is not protected or allow repository maintainer to push to that protected branch. See [protected branch](https://docs.gitlab.com/ee/user/project/protected_branches.html).

</HintBlock>

Required placeholders (must present in the template if specified):

- `{{DB_NAME}}` - Specify the database name.

Optional placeholders

- `{{ENV_ID}}` - Specify the lower-case environment identifier. This is useful to disambiguate the specified database if databases share the same name across different environments.

#### Enable SQL Review CI - Optional

You can follow [GitOps SQL Review CI](/docs/sql-review/sql-advisor/gitops-ci) to set up.

---

You have now enabled the GitOps workflow for your project. Bytebase will start observe SQL file changes from the linked repository. The last task is to [name and organize the schema files](/docs/vcs-integration/name-and-organize-schema-files) in the linked repository directory so that Bytebase can figure out for a given SQL file change, which database it should apply to.

![project-vcs-step](/content/docs/vcs-integration/enable-gitops-workflow/project-vcs-step5.webp)
