---
title: Create Migration Files
---

Bytebase will observe file changes in the configured VCS connector. The files must meet the following requirements.

<HintBlock type="info">

Bytebase creates the rollout issue on merge event that contains new files or modified files. Bytebase
treats new and modified files the same. But **modifying existing file is only OK if its version string hasn't been successfully applied yet.**

</HintBlock>

## Path

Files must be under the immediate directory of the specified [base directory](http://localhost:3001/docs/vcs-integration/add-gitops-connector/). As the example below, if the base directory is `bytebase`, then
only `bytebase/100_create_t1.sql` will be observed by Bytebase.

![activity](/content/docs/vcs-integration/troubleshoot/migraiton-file-path.webp)

## File name

- The default file name is `<<version>>_<<description>>` such as `202401010000_create_hello_table.sql`. The migration version, `202401010000`, dictates the sequence of changes. The version must be **unique and contains only numeric characters**. `create_hello_table` succinctly describes the purpose of the change.
- For DML change, append `dml` after the version, like so: `202401010000_dml_create_hello_table.sql`.
- For MySQL gh-ost online DDL change, append `ghost` after the version, like so: `202401010000_ghost_create_hello_table.sql`.
