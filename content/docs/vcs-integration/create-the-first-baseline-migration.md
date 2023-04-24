---
title: Create the First Baseline Migration
---

To bootstrap the VCS integration, Bytebase needs to know the current schema of the corresponding live database. This is achieved by using a baseline migration script which includes the entire schema of that live database.

To create a baseline migration, use `baseline` as the migration type in the configured [file path template](/docs/vcs-integration/name-and-organize-schema-files#file-path-template).

This is a [demo commit creating the baseline](https://gitlab.bytebase.com/bytebase-demo/shop/-/commit/da90a2510eccd051ad14e4b89ca904d733169a39) (notice the `baseline` keyword in the file name) and the [generated issue](https://demo.bytebase.com/issue/create-product-table-13002) observing that commit.

<HintBlock type="info">

Internally, the baseline migration only causes Bytebase to update its migration history table to record the baseline state. It won't apply the SQL statements in that baseline file to the corresponding database since the database is the origin source of the baseline and already has all the schema.

</HintBlock>

After the first baseline is established, we can start to apply incremental migration scripts by committing those scripts to the linked repository and Bytebase will observe the change and generate the pipeline to apply the change to the database.
