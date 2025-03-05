---
title: How to Create a Table in ClickHouse
---

The `CREATE TABLE` command is used create a new **table** in an existing **database**.

Here is an example of creating an `employee` table in `db_how_to`:

```sql
CREATE TABLE db_how_to.employee
(
    emp_no  UInt32 NOT NULL,
    birth_date  Date NOT NULL,
    first_name  String NOT NULL,
    last_name  String NOT NULL,
    gender     Enum8('M', 'F' ) NOT NULL,
    hire_date Date NOT NULL
)
ENGINE = MergeTree()
PRIMARY KEY (emp_no);
```

Even the simplest of tables in ClickHouse must specify a **table engine**. There are many engines to choose from, but for a simple table on a single-node ClickHouse server, **MergeTree** is your likely choice.

The **primary key** can be defined using the `PRIMARY KEY` command.
