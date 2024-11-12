| Access Level                                                                                          | Operation    | Permission               |
| ----------------------------------------------------------------------------------------------------- | ------------ | ------------------------ |
| [Read](/docs/sql-editor/run-queries/)                                                                 | EXPLAIN      | `databases.queryExplain` |
|                                                                                                       | Query        | `databases.query`        |
|                                                                                                       | Export       | `databases.export`       |
| Write (subject to [execution mode](/docs/administration/environment-policy/overview/#execution-mode)) | Mutation DML | `databases.queryDML`     |
|                                                                                                       | DDL          | `databases.queryDDL`     |
| Request change for review                                                                             | Create Issue | `issues.create`          |
| [Admin](/docs/sql-editor/admin-mode/)                                                                 | Admin        | `instances.adminExecute` |
