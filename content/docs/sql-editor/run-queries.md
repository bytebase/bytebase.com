---
title: Run and EXPLAIN Query
---

<HintBlock type="info">

SQL Editor default mode is read-only, which only supports running SELECT queries. If you attempt
to run DDL or DML change queries, SQL Editor will prompt you to create a new issue to start the
[SQL change workflow](/docs/change-database/change-workflow).

Workspace Admins and DBAs are allowed to execute any SQL statements in
[Admin Mode](/docs/sql-editor/admin-mode).

The read-only mode is not available for MongoDB, but you also can execute the statements in [Admin Mode](/docs/sql-editor/admin-mode).

</HintBlock>

## Run query

Click the `Run` button or use the shortcut key `(⌘ + Enter)` to run your queries in the SQL Editor.

If you have multiple SQL queries separated by semicolons, SQL Editor will only run the first query for now.

<HintBlock type="info">

SQL Editor can return at most **100,000 rows** and **100 MB** size in total.

</HintBlock>

![Query Limit](/content/docs/sql-editor/query-limit.webp)

## Explain query

SQL Editor provides an `Explain` button to run EXPLAIN on the selected query. You can click it or use the shortcut key `(⌘ + E)` instead of prepending EXPLAIN manually.

## Search result

You can retrieve anything you want from query results quickly.

![Search Result](/content/docs/sql-editor/search-result.webp)

## Export data

<HintBlock type="info">

The exported data still respects the [masking policy](/docs/sql-editor/mask-data/) to mask exported columns if enforced.

</HintBlock>

If you have been granted export access, you can directly export query results in various formats.

![Export Data](/content/docs/sql-editor/export-data.webp)

Otherwise, you can request the exported data

![Request Export](/content/docs/sql-editor/export-request1.webp)
![Request Export](/content/docs/sql-editor/export-request2.webp)
