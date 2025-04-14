---
title: Database Permission
feature_name: DATABASE_PERMISSION
---

<TutorialBlock url="/docs/tutorials/just-in-time-database-access-part1" title="Just-in-Time Database Access" />

Bytebase is a middleware sitting between users and databases. It provides a fine-grained database permissions. Bytebase enforces
database permissions via [change approval flow](/docs/change-database/change-workflow/) and [SQL Editor](/docs/sql-editor/overview/).
You can use Bytebase to manage persistent database permissions as well as implement Just-in-Time (JIT) database access workflow.

---

Database permission controls individual users' or groups' actions within the database. Below shows the built-in roles' database permissions.

| Role              | EXPLAIN | Query | Export | Mutation DML | DDL | Admin |
| ----------------- | ------- | ----- | ------ | ------------ | --- | ----- |
| Workspace Admin   | ✅      | ✅    | ✅     | ✅           | ✅  | ✅    |
| Workspace DBA     | ✅      | ✅    | ✅     | ✅           | ✅  | ✅    |
| Project Owner     | ✅      | ✅    | ✅     | ✅           | ✅  |       |
| Project Developer |         |       |        | \*           | \*  |       |
| SQL Editor User   | ✅      | ✅    |        | ✅           | ✅  |       |
| Project Exporter  |         |       | ✅     |              |     |       |
| Project Releaser  |         |       |        |              |     |       |
| Project Viewer    |         |       |        |              |     |       |

\* _Project Developers can't execute DML and DDL directly in SQL Editor. On the other hand, they can
request DML/DDL change by creating an [issue](/docs/concepts/data-model/#issue)_.

---

You can also pick out specific permissions to build [custom roles](/docs/administration/custom-roles/). e.g. create a custom role that grants only the [EXPLAIN](/docs/security/database-permission/explain/) permission.

<IncludeBlock url="/docs/share/database-permission-table"></IncludeBlock>
