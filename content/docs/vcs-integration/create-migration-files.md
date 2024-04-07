---
title: Name and Organize Schema Files
---

If you have enabled the GitOps workflow for a project, Bytebase will observe file changes in the observed repository. But even after Bytebase notices a particular file change, it still needs to figure out the exact database where the change should apply to. Plus, there are different migration types and Bytebase needs to figure out which. To achieve those tasks, Bytebase requires the files to follow a certain naming convention.

## File Path Template

Bytebase allows user to customize the file path of the schema file. This file path is relative to the base directory.

The default file path template is `{{ENV_ID}}/{{DB_NAME}}##{{VERSION}}##{{TYPE}}##{{DESCRIPTION}}.sql`.

<HintBlock type="info">

The default separator is double pound signs `##`.

</HintBlock>

Let's say the base directory is `bytebase` :

- An example file path for [schema migration type](/docs/concepts/database-change-workflow/#schema-migration): `bytebase/env1/db1##202101131000##ddl##create_tablefoo_for_bar.sql`
- An example file path for [data migration type](/docs/concepts/database-change-workflow/#data-migration): `bytebase/env1/db1##202101131000##dml##change_for_bar_data.sql`

### Version (Required)

Version can be an arbitrary string as long as it's unique among all SQL files. Bytebase uses the alphabetical order of the version part to determine the order of the SQL file to apply. A common practice is to use timestamp like `YYYYMMDDHHMMSS` or `v1, v2` as the version name.

### Database Name (Required)

Database name should exactly match the destined database name. The match is **case-sensitive.** However, this may still cause ambiguity if the project contains multiple databases with the same name (this is not uncommon in practice, e.g. you give the same database name across all environments). In such case, include **Environment Identifier** in the template.

### Migration Type (Required)

Bytebase currently supports following migration types:

- [Schema migration](/docs/concepts/database-change-workflow/#schema-migration) - in this case, the file needs to use `ddl` as the keyword.
- [Data change](/docs/concepts/database-change-workflow/#data-migration) - in this case, the file needs to use `dml` as the keyword.

### Environment Identifier (Optional)

Environment identifier should match the destined environment identifier of the database. Unlike database name matching rule, the environment identifier match is lower-case and **case-sensitive**. This is useful to disambiguate the database if multiple databases have the same name across the environments.

### Description (Optional)

An optional description string can be included in the file name. If provided, Bytebase will use it to name the generated task for the migration.

### Supported Placeholders

- All placeholder can contain one or more UTF-8 characters in UTF-8 **except** character in `\[/?%\*:|"<>\\]` (whitespace allowed).
- To improve readability, we recommend to use separator between different placeholders and one common separator is `##` (two pound signs).

### Supported wildcard

- Use '_' to match one directory. For example:
  `{{ENV_ID}}/_/{{DB_NAME}}##{{VERSION}}##{{TYPE}}##{{DESCRIPTION}}.sql`matches`env1/foo/db1##202101131000##ddl##create_tablefoo_for_bar.sql`.
- Use '**' to match one or more directories. For example:
  `{{ENV_ID}}/**/{{DB_NAME}}##{{VERSION}}##{{TYPE}}##{{DESCRIPTION}}.sql`matches`env1/foo/bar/db1##202101131000##ddl##create_tablefoo_for_bar.sql`

## Schema Path Template

💡 **This is useful for always keeping a complete schema of the corresponding database in your repository.**

Bytebase allows user to customize the schema path of the schema file. This path is relative to the base directory. When specified, after each migration, Bytebase will write the latest schema to this schema path relative to the base directory in the same branch as the original commit triggering the migration. Leave empty if you don't want Bytebase to do this.

The default schema path template is `{{ENV_ID}}/.{{DB_NAME}}##LATEST.sql`

Let's say the base directory is `bytebase`

- An example schema path is `bytebase/env1/.db1##LATEST.sql`

### Database Name (Required)

Database name should exactly match the destined database name. However, this may still cause ambiguity if the project contains multiple databases with the same name (this is not uncommon in practice, e.g. you give the same database name across all environments). In such case, include **Environment Identifier** in the template.

### Environment Identifier (Optional)

Environment identifier should exactly match the destined environment identifier of the database. This is useful to disambiguate the database if multiple databases have the same name across the environments.

### Supported Placeholders

- All placeholder can contain one or more characters in \[a-zA-Z0-9+-=/\_#?!\$. ] (whitespace allowed)
- To improve readability, we recommend to use separator between different placeholders and one common separator is `##` (two pound signs).

## File Organization

### Approach 1 - Directory per environment (recommended)

This is a [reference directory structure](https://github.com/s-bytebase/hr-sample/tree/main/bytebase/prod) using this approach, and the corresponding [commit](https://github.com/s-bytebase/hr-sample/commit/5208900f520468574a9aaca17b4cb99987dbc4f6) and [generated issue](https://demo.bytebase.com/issue/hrprodvcs-alter-schema-add-city-102) observing the commit.

In Bytebase, database always belongs to an instance, and an instance always belongs to an environment. Thus a database also belongs to an environment. One way to organize files is to create a directory for each environment by using the environment identifier as the directory name and put migration files under the corresponding environment directory. For example:

![Directory per environment, each file corresponds to a single database under an environment](/content/docs/vcs-integration/create-migration-files/organize-schema-files-step1.webp)

![organize-schema-files-step](/content/docs/vcs-integration/create-migration-files/organize-schema-files-step2.webp)

#### Pros

1. The divergence period when the schema the migration files represents and the actual schema of the live database is minimized. The drift only occurs between the time the migration is committed and the time Bytebase finishes migration.
2. This allows the same database can coexist as long as they belong to different environments. Because Bytebase will use the name of the enclosing directory to infer the environment to disambiguate the targeting database.

#### Cons

1. More files to manage, it will be `database * number of environments`.

### Approach 2 - Single directory

All migration files for all environments are under the same directory. Like the screenshot below:

![A single file representing all databases having the same name from all environments.](/content/docs/vcs-integration/create-migration-files/organize-schema-files-step3.webp)

![organize-schema-files-step](/content/docs/vcs-integration/create-migration-files/organize-schema-files-step4.webp)

The pros and cons are the opposite of Approach 1. Though this approach brings less overhead to managing the files, when the schema the migration files represents differs from the actual schema of the live database, it will cause a much longer divergence period, because when a migration file is committed, Bytebase will generate a migration pipeline including all environments:

![organize-schema-files-step](/content/docs/vcs-integration/create-migration-files/organize-schema-files-step5.webp)

This means the divergence lasts until the the pipeline finishes applying the change to the last environment. This defeats much of the purpose of storing the migration files in the repository since you want the migration files to be the source of truth of the database schema.

After settling down the file structure, your are ready to create the first migration.
