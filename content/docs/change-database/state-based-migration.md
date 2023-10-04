---
title: State-based Migration
---

<HintBlock type="warning">

This feature is in beta and only available for projects that have enabled [GitOps workflow](/docs/vcs-integration/enable-gitops-workflow).

</HintBlock>

State-based migration is a declarative way to describe the desired state of the schema, it allows the schema management engine to generate migration scripts automatically for any discrepancy found between the desired state and the actual schema.

It is a better and future-proof approach to manage schema changes for being repeatable, conflict-free, and idempotent:

- The same schema file can be repeatedly applied to different environments regardless of their current schema states.
- Avoid stepping on toes which often happens with migration-based/imperative schema change, no need to deal with executions that have complex dependency relations.
- Nothing will happen if everything is aligned, and only discrepancies will be fixed.

## Schema Definition Language (SDL)

State-based migration requires the use of Schema Definition Language(SDL). SDL is a subset of SQL used to define database Schema. Currently, state-based migration only supports MySQL, you can check the [MySQL SDL syntax here](/docs/reference/schema-definition-language).

## How to use

### Step 1 - Enable the setting

Once enabled [GitOps workflow](/docs/vcs-integration/enable-gitops-workflow), in the project's **Version Control > Schema change type** option, select **Declarative**.

![select-schema-change-type](/content/docs/change-database/state-based-migration/select-schema-change-type.webp)

### Step 2 - Update schema file

In our example with GitLab self-hosted as our VCS, we create a new schema file in the connected repository whose path is matching the **Schema path template** we have configured as `.{{DB_NAME}}##LATEST.sql`, where `{{DB_NAME}}` is `mydb`. It is notable that we have also configured `bytebase` as the **Base directory**, so all files need to reside under this directory.

![commit-new-schema-file](/content/docs/change-database/state-based-migration/commit-new-schema-file.webp)

Once committed the schema file to the target branch `main`, a new migration issue is created automatically with only the differentiate part of the schema.

The `Schema change` tab shows the schema change between the actual database schema and the LATEST file. They are all in SDL syntax format.

![new-migration-issue-diff](/content/docs/change-database/state-based-migration/new-migration-issue-diff.webp)

The `Generated DDL statements` tab previews the DDL that will be executed, which is calculated in real-time based on the differences between the actual database schema and the LATEST file.

![new-migration-issue-ddl](/content/docs/change-database/state-based-migration/new-migration-issue-ddl.webp)

The `Full schema` tab shows the full LATEST file from version control system, such as GitLab or GitHub.

![new-migration-issue-full-text](/content/docs/change-database/state-based-migration/new-migration-issue-full-text.webp)

Subsequent updates to the LATEST schema file without actually changing the database schema will not generate new migration issues.

### Baseline SQL schema

You will baseline the SDL schema in the following cases:

1. Initialize the LATEST file in the linked repository.
1. Update the LATEST file to reconcile the actual database schema.

## How to Baseline

1. Click the `Databases` tab in `Project` details page.
   ![step-1](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-1.webp)
2. Click the database you want to dump.
   ![step-2](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-2.webp)
3. Click the `Change History` tab in `Database` details page.
   ![step-3](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-3.webp)
4. Click the `Establish new baseline` button.
   ![step-4](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-4.webp)
5. Click the `Establish new baseline` button again.
   ![step-5](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-5.webp)
6. Click the `Create` button to create the baseline issue.
   ![step-6](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-6.webp)
7. Click the `Approve` button to approve the baseline issue.
   ![step-7](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-7.webp)
8. Click the `Approve` button to approve the baseline issue again.
   ![step-8](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-8.webp)
9. When finish, you can click `View commit` to see the Git commit and the baselined LATEST file in the linked repository.
   ![step-9](/content/docs/change-database/state-based-migration/baseline-sdl-schema-step-9.webp)

## Caveats

As the state-based migration is in beta stage, there are still few things to watch out:

- Typical migration-based schema change is disallowed, where you would have each file containing DDL statements for imperative migrations.
- Only support MySQL tables and indexes.
