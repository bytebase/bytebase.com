---
title: Query
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

### Max returned row count

SQL Editor can return at most **100,000 rows**.

![Query Row Limit](/content/docs/sql-editor/query-row-limit.webp)

### Max returned result size

The default query result size is **100 MB**. You can change it under the Workspace settings.

![Query Result Size Limit](/content/docs/sql-editor/query-result-size-limit.webp)

## Explain query

![Explain Query](/content/docs/sql-editor/explain-query.webp)

SQL Editor provides an `Explain Query` action to run EXPLAIN on the selected query. You can access it from right click or use the shortcut key `(⌘ + E)` instead of prepending EXPLAIN manually.

## Autocomplete

![autocomplete](/content/docs/sql-editor/autocomplete.webp)

Autocomplete depends on WebSocket. If you access Bytebase via a gateway, you need to enable WebSocket there. Here is a NGINX configuration:

```nginx

http {
    server {
        ...

       location ~ ^/(v1:adminExecute|lsp) {
            proxy_pass http://bytebase.example.com;
            proxy_http_version 1.1;
            # Enables WebSocket which is required for SQL Editor autocomplete
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
        }
        ...
    }
}
```

## Batch mode

<PricingPlanBlock feature_name='BATCH_QUERY' />

You can batch query many databases having the same schema:

![batch-query-setting](/content/docs/sql-editor/batch-query-setting.webp)

For each database, the query result will show up in its own tab:

![batch-query-result1](/content/docs/sql-editor/batch-query-result1.webp)

![batch-query-result2](/content/docs/sql-editor/batch-query-result2.webp)

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
