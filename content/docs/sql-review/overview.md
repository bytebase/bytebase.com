---
title: SQL Review
---

SQL Review is the classic and widely used process for developers and DBAs to coordinate database changes. To facilitate this heavily used process, Bytebase has designed an automatic process to reduce the work for DBAs who are required to do manual SQL review.

DBA first chooses [SQL Review rules](/docs/sql-review/review-rules) to build a unified [Review policy](/docs/sql-review/review-policy) and then chooses environments to apply it.

![change-column-list](/content/docs/sql-review/schema-review-change-column-list.gif)

Later, when developers submit SQLs to query or change the database, Bytebase will check these rules automatically before the DBAs review.

![column-required](/content/docs/sql-review/schema-review-column-required.webp)
