| Access Level                                                                                          | Operation    | Permission      |
| ----------------------------------------------------------------------------------------------------- | ------------ | --------------- |
| [Read](/docs/sql-editor/run-queries/)                                                                 | EXPLAIN      | `sql.explain`   |
|                                                                                                       | Query        | `sql.select`    |
|                                                                                                       | Export       | `sql.export`    |
| Write (subject to [execution mode](/docs/administration/environment-policy/overview/#execution-mode)) | Mutation DML | `sql.dml`       |
|                                                                                                       | DDL          | `sql.ddl`       |
| [Admin](/docs/sql-editor/admin-mode/)                                                                 | Admin        | `sql.admin`     |
| Request change for review                                                                             | Create Issue | `issues.create` |
