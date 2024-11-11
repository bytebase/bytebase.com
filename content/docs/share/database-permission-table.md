| Access Level | Operation                                              | Permission               |
| ------------ | ------------------------------------------------------ | ------------------------ |
| Read         | [EXPLAIN](/docs/security/database-permission/explain/) | `databases.queryExplain` |
|              | [Query](/docs/security/database-permission/query/)     | `databases.query`        |
|              | [Export](/docs/security/database-permission/export/)   | `databases.export`       |
| Write        | Data-modifying DML                                     | `databases.queryDML`     |
|              | DDL                                                    | `databases.queryDDL`     |
| Admin        | [Admin](/docs/sql-editor/admin-mode/)                  | `instances.adminExecute` |
