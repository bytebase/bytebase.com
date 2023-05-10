---
title: SQL Review
---

SQL Review is the classic and widely used process for developers and DBAs to coordinate database changes. To facilitate this heavily used process, Bytebase has designed an automatic process to reduce the work for DBAs who are required to do manual SQL review.

DBA first chooses [SQL Review rules](/docs/sql-review/review-rules) to build a unified [Review policy](/docs/sql-review/review-policy/overview) and then chooses environments to apply it.

Later, when developers submit SQLs to query or change the database, [SQL Advisor](/docs/sql-review/sql-advisor/overview) will check these rules automatically before the DBAs review them manually.