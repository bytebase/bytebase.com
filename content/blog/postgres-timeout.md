---
title: Postgres Timeout Explained
author: Tianzhou
updated_at: 2024/08/10 18:00
feature_image: /content/blog/postgres-timeout/banner.webp
tags: Explanation
featured: true
description: Explain why Postgres provides a variety of timeout settings.
---

PostgreSQL offers various timeout settings to help manage and optimize database operations by controlling the duration of certain processes.
These timeouts are crucial for ensuring the stability and performance of your system, particularly in environments with high traffic or complex queries. Let's review each of them.

## statement_timeout

[statement_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-STATEMENT-TIMEOUT) sets a limit on the maximum amount of time that a single query is allowed to execute.
If the query exceeds this time limit, PostgreSQL will automatically terminate the query and return an error.

```plain
ERROR:  canceling statement due to statement timeout
```

If multiple SQL statements appear in a single simple-Query message, the timeout is applied to each statement separately. `statement_timeout` effectively preventing long-running queries from consuming too many resources or causing performance issues in your database.

## lock_timeout

[lock_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-LOCK-TIMEOUT) controls how long a transaction will wait to acquire a lock on a database object, such as a table or a row, before giving up and returning an error.

```plain
ERROR:  canceling statement due to lock timeout
```

In Postgres, a transaction waiting to acquire a lock on a resource will block incoming transactions that need a conflicting lock on the same resource. For transactions acquring heavyweight locks such as running DDL statements, it's recommnended to set `lock_timeout`. A common practice is to create a separate Postgres user to run the DDL and set a short `lock_timeout` on that user.

```sql
ALTER ROLE ddl_user SET lock_timeout = 10000; -- 10 seconds
```

## idle_in_transaction_session_timeout

[idle_in_transaction_session_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-IDLE-IN-TRANSACTION-SESSION-TIMEOUT) controls the maximum amount of time that a session can remain idle while inside a transaction. If a session stays idle within a transaction for longer than the specified timeout period, PostgreSQL will automatically terminate the session and roll back the ongoing transaction.

```plain
ERROR:  terminating connection due to idle-in-transaction timeout
```

Imagine you have an application that occasionally leaves transactions open while waiting for user input or performing some non-database-related processing. If a transaction is left open and idle for too long, it might hold locks on tables or rows, preventing other transactions from accessing those resources. By setting `idle_in_transaction_session_timeout`, you can automatically terminate these idle sessions, ensuring that resources are not held up unnecessarily. Even when no significant locks are held, an open transaction prevents vacuuming away recently-dead tuples that may be visible only to this transaction; so remaining idle for a long time can contribute to table bloat.

## idle_session_timeout

[idle_session_timeout](https://www.postgresql.org/docs/current/runtime-config-client.html#GUC-IDLE-SESSION-TIMEOUT) controls the maximum amount of time a session can remain idle before it is automatically terminated. Unlike `idle_in_transaction_session_timeout`, which applies only to sessions that are idle while inside a transaction, `idle_session_timeout` applies to any session that is idle, whether or not it is within a transaction.

```plain
ERROR:  terminating connection due to idle session timeout
```

Be careful when you are using connection pooler or other middleware, as such a layer may not react well to unexpected connection closure. `idle_session_timeout` is usually set for the interactive sessions. It's a good practice
to create a separate Postgres user for interactive processing and set `idle_session_timeout` accordingly.

```sql
ALTER ROLE interactive_user SET idle_session_timeout = 600000; -- 10 minutes
```

## transaction_timeout

![transaction-timeout-commit](/content/blog/postgres-timeout/transaction-timeout-commit.webp)

The upcoming Postgres 17 release will introduce a new [transaction_timeout](https://www.postgresql.org/docs/devel/runtime-config-client.html#GUC-TRANSACTION-TIMEOUT). From the doc:

> Terminate any session that spans longer than the specified amount of time in a transaction. The limit applies both to explicit transactions (started with BEGIN) and to an implicitly started transaction corresponding to a single statement.

A typical web service consists of 3 main components:

- Web server
- Application server
- Database server

To prevent long-running connections, you usually set a connection timeout on both the web server and the application server. It's a waste to process the transaction when web server/application server already terminate the connection. Before the introduction of `transaction_timeout`, there is no reliable way to prevent long-transactions. Even you set both `statement_timeout` and `idle_in_transaction_session_timeout`, the transaction will still
be open if it consists of short statements and short pauses in between.

You might be wondering why it has taken PostgreSQL so long to introduce a straightforward `transaction_timeout` feature. Well, better late than never! And by the way, MySQL doesn’t have this feature either.

## References

- [Official doc](https://www.postgresql.org/docs/current/runtime-config-client.html)
- [pgsql-hackers discussion about introducing `transaction_timeout`](https://www.postgresql.org/message-id/flat/f508267d1ba8f0bfd7b93181d10511dc%40oss.nttdata.com#2506da45ff92aaea65c30996fbf19c85)
