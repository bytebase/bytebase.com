---
title: What is Write Ahead Logging (WAL)
author: Tianzhou
updated_at: 2024/12/06 09:00:00
feature_image: /content/blog/what-is-write-ahead-logging/cover.webp
tags: Explanation
description: Explain write ahead logging in database and the implementation difference between different databases.
---

Write-Ahead Logging (WAL) is a standard technique in databases to ensure data integrity and durability. The core idea is simple: before any changes are applied to the actual database, the changes are first written to a log. This guarantees that even if a system crash occurs, the database can be recovered by replaying the log.

The concept of WAL evolved from early research on transaction processing and recovery mechanisms, particularly in [IBM's System R](https://en.wikipedia.org/wiki/IBM_System_R) project—one of the first relational database systems developed in the mid-1970s. System R introduced many core ideas behind modern database architectures, including logging, checkpoints, and recovery techniques.

A key paper that laid the groundwork for WAL is [ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks Using Write-Ahead Logging](https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf). The ARIES method formalized many WAL concepts used in modern databases, including recovery algorithms, undo/redo logging, and checkpointing.

Each DBMS implements WAL with its own nuances, particularly in terms of redo and undo behaviors.

## SQL Server

In SQL Server, the WAL mechanism is integrated into its transaction log. The transaction log records all changes made to the database, which facilitates both redo and undo operations during recovery:

- **Redo Behavior**: Committed transactions are written to the transaction log, allowing SQL Server to replay these changes during recovery.
- **Undo Behavior**: If a transaction is uncommitted at the time of a crash, SQL Server uses the log to roll back these changes, restoring the database to its last consistent state.

## Oracle

Oracle's implementation of WAL is also based on a redo log system. It employs a combination of redo logs and undo segments:

- **Redo Behavior**: Changes are first recorded in redo logs before being applied to the database. During recovery, Oracle can replay these logs to restore committed transactions.
- **Undo Behavior**: Oracle maintains undo segments that store the previous state of data before changes were made. If a transaction fails or is rolled back, Oracle can use these undo segments to revert changes.

## MySQL (InnoDB)

MySQL's InnoDB storage engine utilizes a WAL mechanism known as the redo log:

- **Redo Behavior**: Changes are logged in a redo log file before being written to the data files. This ensures that committed transactions can be redone after a crash.
- **Undo Behavior**: InnoDB also maintains undo logs that allow it to roll back uncommitted transactions. This ensures that any incomplete transactions do not affect the integrity of the database.

## PostgreSQL

PostgreSQL employs a robust WAL system that is central to its crash recovery process:

- **Redo Behavior**: PostgreSQL writes changes to a WAL file before they are applied to the main database files. This allows for efficient recovery by replaying the WAL after a crash.

- **Undo Behavior**: PostgreSQL uses an MVCC (Multi-Version Concurrency Control) model, which allows it to maintain multiple versions of data. Uncommitted changes can be rolled back using information stored in the WAL.

## SQLite

SQLite offers a unique approach with its [WAL mode](https://www.sqlite.org/wal.html):

- **Redo Behavior**: In WAL mode, changes are appended to a separate WAL file rather than directly modifying the main database file. A commit occurs when a special commit record is added to the WAL.

- **Undo Behavior**: SQLite does not inherently support traditional undo operations post-commit; however, it can rollback uncommitted transactions using its rollback journal mechanism if not in WAL mode.

## Summary

| WAL Implementation | DBMS       | Redo Behavior                                        | Undo Behavior                                                             |
| ------------------ | ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| Undo + Redo        | SQL Server | Uses transaction log for replaying committed changes | Utilizes transaction log for rolling back uncommitted changes             |
|                    | Oracle     | Records changes in redo logs for recovery            | Uses undo segments for reverting uncommitted transactions                 |
|                    | MySQL      | Logs changes in redo log before applying             | Maintains undo logs for rolling back uncommitted transactions             |
| MVCC               | PostgreSQL | Writes changes to WAL for recovery                   | Uses MVCC for managing multiple versions and rolling back                 |
| Simplified         | SQLite     | Appends changes to WAL file                          | Limited rollback capabilities; relies on rollback journal in non-WAL mode |
