---
title: Create Migration Files
---

Bytebase will observe file changes in the configured VCS connector. Bytebase requires the files to follow a certain naming convention.

- The default file name is `202401010000_create_hello_table.sql`. The migration version, `202401010000`, dictates the sequence of changes. The version must be all numeric characters. `create_hello_table` succinctly describes the purpose of the change.
- For DML change,  append `dml` after the version, like so: `202401010000_dml_create_hello_table.sql`.
- For gh-ost online DDL change,  append `dml` after the version, like so: `202401010000_ghost_create_hello_table.sql`.
