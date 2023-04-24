---
title: VCS Integration (GitOps)
---

"**Version controlled schema**" aka "**Database-as-code**" is a practice to store the database schema in a version control system (VCS) just like how application code is stored. The database schema consists of a bunch of database migration scripts. These scripts usually follow a naming convention to identify the order of their relative execution sequence. After executing all the migration scripts, it will produce an exact copy of the database schema to the corresponding live database. In this model, the migration scripts are the source of truth of the database schema. You can check the reference for a detailed writeup on this topic.

**Reference**: [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html).

Bytebase supports this version control model to integrate database schema with the VCS. To set it up, please follow this guide.

The VCS Integration is a 3-step setup. You can check this [demo issue](https://demo.bytebase.com/issue/add-createdat-column-to-userpostcomment-table-for-dev-environment-13008) created by Bytebase through observing the [code commit](https://gitlab.bytebase.com/bytebase-demo/blog/-/commit/171ceaf7659ceb8e495aa3ef356ec686656f9dc0) to see what it looks like after the setup.

### [Step 1 - Add Git Provider](/docs/vcs-integration/add-git-provider)

This can only be performed by the "**Workspace Owner" with the help of the selected Git provider instance admin.** It only needs to be configured once for each Git provider.

### [Step 2 - Enable GitOps Workflow in Project](/docs/vcs-integration/enable-gitops-workflow)

Configure project to use "GitOps workflow" and link the project with a repository from the Git provider configured in Step 1. This can only be performed by the "**Project Owner"**.

### [Step 3 - Name and Organize Schema Files](/docs/vcs-integration/name-and-organize-schema-files)

Organize the repository schema files according to the configured base directory and file path template in step 2. Afterwards, the file changes can be observed and identified by Bytebase to apply the schema changes to the corresponding database.

### [Troubleshoot](/docs/vcs-integration/troubleshoot)
