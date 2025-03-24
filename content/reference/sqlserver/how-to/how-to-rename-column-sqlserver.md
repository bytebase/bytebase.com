---
title: How to RENAME a column in SQL Server
---

_Official documentation: [Rename columns](https://learn.microsoft.com/en-us/sql/relational-databases/tables/rename-columns-database-engine)_

## Basic Syntax

The `COLUMN` parameter is required to specify that you're renaming a column rather than another database object.

```sql
EXEC sp_rename 'Schema.TableName.OldColumnName', 'NewColumnName', 'COLUMN';
```

## Managing Dependencies

When renaming columns, it's critical to identify and update all dependencies to prevent application failures.

### Identifying Dependencies

Use `sys.sql_expression_dependencies` to find objects that reference the column:

```sql
SELECT
    OBJECT_SCHEMA_NAME(sed.referencing_id) AS ReferencingSchema,
    OBJECT_NAME(sed.referencing_id) AS ReferencingObject,
    o.type_desc AS ObjectType
FROM sys.sql_expression_dependencies sed
JOIN sys.objects o ON sed.referencing_id = o.object_id
WHERE
    sed.referenced_id = OBJECT_ID('dbo.Customers')
    AND sed.referenced_minor_id = (
        SELECT column_id
        FROM sys.columns
        WHERE object_id = OBJECT_ID('dbo.Customers')
        AND name = 'CustomerPhone'
    );
```

### Updating Dependencies

After renaming columns, dependent views and stored modules may still reference the metadata of the old column name. SQL Server provides system stored procedures `sp_refreshview` and `sp_refreshsqlmodule` to refresh these references:

```sql
-- Refresh a specific view after column renaming
EXEC sp_refreshview 'dbo.CustomerContactList';

-- Refresh a stored procedure, function, trigger, or view
EXEC sp_refreshsqlmodule 'dbo.GetCustomerDetails';
```

- `sp_refreshview`: Specifically for views that have become invalid after column renaming
- `sp_refreshsqlmodule`: Works on multiple object types (stored procedures, functions, triggers, and views)

Limitations:

- They work only if the column name changes don't break the logic (same column order and data types)
- Text-based dynamic SQL references in the object code still need manual updates

## Schema Binding

For schema-bound objects (views, functions), you must:

1. Drop the schema binding first
1. Rename the column
1. Recreate the schema binding

```sql
-- 1. Drop the schema-bound view
DROP VIEW dbo.CustomerDetailsView;

-- 2. Rename the column
EXEC sp_rename 'dbo.Customers.CustomerPhone', 'ContactNumber', 'COLUMN';

-- 3. Recreate the view with schema binding
CREATE VIEW dbo.CustomerDetailsView
WITH SCHEMABINDING
AS
    SELECT CustomerID, CustomerName, ContactNumber
    FROM dbo.Customers;
```

Note that `sp_refreshview` and `sp_refreshsqlmodule` cannot be used with schema-bound objects, as these objects require explicit recreation after column changes.
