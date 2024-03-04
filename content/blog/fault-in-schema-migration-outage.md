---
title: 'Fault in Schema Migration Outage: Author or Reviewer?'
author: Tianzhou
published_at: 2024/03/04 20:00:00
feature_image: /content/blog/fault-in-schema-migration-outage/sql-from-dev-to-dba.webp
tags: Industry
description: 'When schema migration outage happens, who should be more responsible in order to prevent
future incidents?'
---

Once upon a time, a developer named John was modifying the name column in a large table from `VARCHAR(20)` to `VARCHAR(512)`. This change was intended to accommodate more diversity in name lengths, a request that had come down from the product team as they expanded into new, international markets. The exact SQL is:

```sql
ALTER TABLE person MODIFY name VARCHAR(512);
```

Bob, the Database Administrator (DBA), reviewed John's migration script. On the surface, it seemed like a straightforward change, one that he had seen and approved many times in his career. Bob gave his blessing to the change.

With Bob's approval, John executed the migration. As soon as the migration was deployed, alarms blared throughout the office.

The root cause is subtle. Even MySQL 8.0 has increased the online DDL coverage, this particular statement is still not covered. Because the statement enlarges the byte to encode the size value from 1 to 2 as described in the [official doc](https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl-operations.html).

![mysql-extend-varchar](/content/blog/fault-in-schema-migration-outage/mysql-extend-varchar.webp)

Thus all other transactions were blocked while waiting for this DDL to finish. And for large tables, that would take hours.

**Though the industry is advocating the [blameless culture](https://sre.google/sre-book/postmortem-culture/), someone needs to be accountable. Otherwise, no one will own the initiative to fix the process and the chances are it will happen again.**

Is this the author, John’s fault? Maybe. However, it’s a bit more ask for an average developer to know the execution plan of a particular statement from a particular database at a particular version.

Is this the reviewer, Bob’s fault? Plausible. Since Bob has more knowledge and was hired exactly for catching this type of error. However, if Bob takes the bullet, there will be less incentive for the developers to improve their database knowledge.

The good thing is, that such dilemmas have become less nowadays:

1. Companies are moving more DB responsibilities to the developers. There will still be a DB person or a platform team taking care of the DB infrastructure, but the day-to-day DB development tasks are managed by the developer team entirely.
1. Companies may use an external DBA consulting service like [Vettabase](https://vettabase.com/), [Percona](https://www.percona.com/), [Enterprise DB](https://www.enterprisedb.com/) for expert advice.
1. Companies may adopt database development tools like Bytebase to improve the collaboration between the developers and the DB team.

Welcome to the era of Database DevOps.
