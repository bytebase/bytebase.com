---
title: 'Postgres vs. MySQL: JSON Support'
author: Tianzhou
updated_at: 2025/05/29 12:00
feature_image: /content/blog/postgres-vs-mysql-json-support/cover.webp
tags: Explanation
description: 'Compare the JSON support difference between Postgres and MySQL'
---

JSON has become an essential format for storing and exchanging semi-structured data. Both PostgreSQL and MySQL have embraced JSON support. This article compares JSON support in their respective latest GA release PostgreSQL 17 and MySQL 8, examining their approaches to data types, functions, indexing, and performance. We'll provide code examples to illustrate key differences and help you decide which database might better suit your JSON-related needs.

## JSON Data Types and Storage

### PostgreSQL 17

PostgreSQL continues to offer two distinct JSON data types:

1. **`jsonb`** (Preferred): Stores data in a decomposed binary format. While slightly slower for input due to conversion overhead, it's significantly faster for processing since no reparsing is needed. It also supports indexing.

1. **`json`**: Stores an exact copy of the input text, preserving whitespace and the order of object keys. Each processing operation requires reparsing the text.

Additionally, PostgreSQL provides a `jsonpath` data type for efficient query mechanisms.

```sql
-- Creating JSON values in PostgreSQL 17
SELECT '{"name": "John", "age": 30}'::json;  -- json type
SELECT '{"name": "John", "age": 30}'::jsonb; -- jsonb type
```

### MySQL 8

MySQL implements a single `JSON` data type that's conceptually similar to PostgreSQL's `jsonb`. It stores JSON documents in an optimized binary format that enables quick access to elements without parsing the entire document.

```sql
-- Creating JSON values in MySQL 8
SELECT JSON_OBJECT('name', 'John', 'age', 30);
-- Or directly
SELECT CAST('{"name": "John", "age": 30}' AS JSON);
```

Both databases automatically validate JSON documents, ensuring only valid JSON can be stored in JSON columns.

## New Features and Enhancements

### PostgreSQL 17

`JSON_TABLE()` function is the most notable addition, which converts JSON data into a tabular format. This makes it easier to work with JSON data in SQL contexts.

```sql
-- PostgreSQL 17's new JSON_TABLE function
SELECT *
FROM JSON_TABLE(
    '{"users": [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]}',
    '$.users[*]' COLUMNS(
        name TEXT PATH '$.name',
        age INT PATH '$.age'
    )
) AS jt;
```

### MySQL 8

MySQL 8 has had several years to refine its JSON support:

1. **JSON_TABLE Function**: MySQL 8 has offered the `JSON_TABLE()` function since its early releases, allowing for conversion between JSON and relational formats.

   ```sql
   -- MySQL 8's JSON_TABLE function
   SELECT *
   FROM JSON_TABLE(
       '{"users": [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]}',
       '$.users[*]' COLUMNS(
           name VARCHAR(100) PATH '$.name',
           age INT PATH '$.age'
       )
   ) AS jt;
   ```

1. **JSON Schema Validation**: MySQL 8 provides built-in functions for validating JSON against JSON Schema.

   ```sql
   -- MySQL 8's JSON schema validation
   SELECT JSON_SCHEMA_VALID(
       '{"type": "object", "properties": {"name": {"type": "string"}, "age": {"type": "integer"}}}',
       '{"name": "John", "age": 30}'
   );
   ```

1. **Multi-valued Indexing**: Since version 8.0.17, MySQL has supported multi-valued indexes on JSON arrays.

## Functions and Operators

### PostgreSQL 17

PostgreSQL provides a rich set of operators for JSON manipulation:

- `->`: Extract JSON object field or array element (returns JSON)
- `->>`: Extract JSON object field or array element as text
- `#>`: Extract JSON sub-object at specified path
- `#>>`: Extract JSON sub-object at specified path as text

For `jsonb` type, additional operators are available:

- `@>`: Contains (does the first JSON value contain the second?)
- `<@`: Contained by (is the first JSON value contained in the second?)
- `?`: Does the string exist as a top-level key?
- `?|`: Do any of these strings exist as top-level keys?
- `?&`: Do all of these strings exist as top-level keys?
- `||`: Concatenate JSON values

```sql
-- PostgreSQL 17 JSON operators
SELECT '{"user": {"name": "John", "email": "john@example.com"}}'::json -> 'user' ->> 'email';
-- Result: john@example.com

-- Check containment (jsonb only)
SELECT '{"name": "John", "tags": ["developer", "postgresql"]}'::jsonb @> '{"tags": ["postgresql"]}';
-- Result: true
```

### MySQL 8

MySQL uses functions for most JSON operations, though it also supports the `->` and `->>` operators:

- `JSON_EXTRACT()`: Extract data from JSON document
- `JSON_SET()`, `JSON_INSERT()`, `JSON_REPLACE()`: Modify JSON documents
- `JSON_CONTAINS()`, `JSON_CONTAINS_PATH()`: Check for values or paths
- `JSON_SEARCH()`: Find paths to specific values
- `JSON_MERGE_PATCH()`, `JSON_MERGE_PRESERVE()`: Combine JSON documents

```sql
-- MySQL 8 JSON functions
SELECT JSON_EXTRACT('{"user": {"name": "John", "email": "john@example.com"}}', '$.user.email');
-- Result: "john@example.com"

-- Using the -> operator (same as JSON_EXTRACT)
SELECT '{"user": {"name": "John", "email": "john@example.com"}}' -> '$.user.email';
-- Result: "john@example.com"

-- Using the ->> operator (same as JSON_UNQUOTE(JSON_EXTRACT(...)))
SELECT '{"user": {"name": "John", "email": "john@example.com"}}' ->> '$.user.email';
-- Result: john@example.com
```

## JSON Path Expressions

Both databases support JSON path expressions, but with different syntax and capabilities.

### PostgreSQL 17

PostgreSQL uses a path expression syntax with dots for object navigation and brackets for array access. In PostgreSQL 17, the SQL/JSON path language has been enhanced:

```sql
-- PostgreSQL 17 path syntax
SELECT '{"users": [{"name": "John"}, {"name": "Jane"}]}'::json #> '{users,1,name}';
-- Result: "Jane"

-- Using jsonpath for complex queries (enhanced in PostgreSQL 17)
SELECT jsonb_path_query(
    '{"users": [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]}'::jsonb,
    '$.users[*] ? (@.age > 28).name'
);
-- Result: "John"
```

### MySQL 8

MySQL uses a dot notation similar to JavaScript for object properties and brackets for array indices:

```sql
-- MySQL 8 path syntax
SELECT JSON_EXTRACT('{"users": [{"name": "John"}, {"name": "Jane"}]}', '$.users[1].name');
-- Result: "Jane"

-- Using path expressions with conditions
SELECT JSON_SEARCH(
    '{"users": [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]}',
    'one',
    'John'
);
-- Result: "$.users[0].name"
```

## Indexing JSON Data

### PostgreSQL 17

PostgreSQL's `jsonb` type supports several index types:

1. **GIN (Generalized Inverted Index)**: Ideal for checking containment and existence operations.

   ```sql
   -- Create a GIN index for all keys and values
   CREATE INDEX idx_data ON table_name USING GIN (data_column);

   -- Create a more compact GIN index for containment operations
   CREATE INDEX idx_data_path ON table_name USING GIN (data_column jsonb_path_ops);
   ```

1. **Functional indexes**: For specific JSON paths.

   ```sql
   -- Create an index on a specific JSON path
   CREATE INDEX idx_name ON table_name ((data_column->>'name'));
   ```

### MySQL 8

MySQL doesn't directly index JSON columns. Instead, it offers:

1. **Generated columns with indexes**: Extract values from JSON into generated columns that can be indexed.

   ```sql
   -- Create a virtual column and index it
   ALTER TABLE users ADD COLUMN name VARCHAR(100)
       GENERATED ALWAYS AS (data->>'$.name') STORED;

   CREATE INDEX idx_name ON users(name);
   ```

1. **Multi-valued indexes**: For JSON arrays (InnoDB, since MySQL 8.0.17).

   ```sql
   -- Create a multi-valued index on a JSON array
   CREATE INDEX idx_tags ON users((CAST(data->'$.tags' AS JSON) ARRAY));
   ```

## Performance Considerations

### PostgreSQL 17

- `jsonb` is optimized for processing but has conversion overhead during insertion
- GIN indexes provide efficient querying for complex JSON data
- Partial updates of JSON values are possible
- PostgreSQL 17 includes various query performance improvements, including for sequential reads

### MySQL 8

- Optimized binary storage format for quick element access
- Partial, in-place updates of JSON columns reduce overhead
- Compact binary log format for partial JSON updates
- Improved parsing and indexing performance in MySQL 8.0

## Code Example: Working with Nested JSON

Let's compare how both databases handle a common task: extracting and filtering nested JSON data.

### PostgreSQL 17

```sql
-- Create a table with JSON data
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    data JSONB
);

-- Insert sample data
INSERT INTO products (data) VALUES
    ('{"name": "Laptop", "specs": {"cpu": "i7", "ram": 16, "storage": 512}}'),
    ('{"name": "Smartphone", "specs": {"cpu": "A15", "ram": 8, "storage": 256}}'),
    ('{"name": "Tablet", "specs": {"cpu": "M1", "ram": 8, "storage": 128}}');

-- Query for products with at least 8GB RAM and 256GB storage
SELECT data->>'name' AS product_name
FROM products
WHERE (data->'specs'->>'ram')::int >= 8
  AND (data->'specs'->>'storage')::int >= 256;

-- Result:
-- product_name
-- -----------
-- Laptop
-- Smartphone

-- Using PostgreSQL 17's JSON_TABLE function
SELECT jt.product_name, jt.ram, jt.storage
FROM products,
JSON_TABLE(
    data,
    '$' COLUMNS(
        product_name TEXT PATH '$.name',
        ram INT PATH '$.specs.ram',
        storage INT PATH '$.specs.storage'
    )
) AS jt
WHERE jt.ram >= 8 AND jt.storage >= 256;
```

### MySQL 8

```sql
-- Create a table with JSON data
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data JSON
);

-- Insert sample data
INSERT INTO products (data) VALUES
    (JSON_OBJECT('name', 'Laptop', 'specs', JSON_OBJECT('cpu', 'i7', 'ram', 16, 'storage', 512))),
    (JSON_OBJECT('name', 'Smartphone', 'specs', JSON_OBJECT('cpu', 'A15', 'ram', 8, 'storage', 256))),
    (JSON_OBJECT('name', 'Tablet', 'specs', JSON_OBJECT('cpu', 'M1', 'ram', 8, 'storage', 128)));

-- Query for products with at least 8GB RAM and 256GB storage
SELECT data->>'$.name' AS product_name
FROM products
WHERE CAST(data->'$.specs.ram' AS UNSIGNED) >= 8
  AND CAST(data->'$.specs.storage' AS UNSIGNED) >= 256;

-- Result:
-- product_name
-- -----------
-- Laptop
-- Smartphone

-- Using MySQL 8's JSON_TABLE function
SELECT jt.product_name, jt.ram, jt.storage
FROM products,
JSON_TABLE(
    data,
    '$' COLUMNS(
        product_name VARCHAR(100) PATH '$.name',
        ram INT PATH '$.specs.ram',
        storage INT PATH '$.specs.storage'
    )
) AS jt
WHERE jt.ram >= 8 AND jt.storage >= 256;
```

## Conclusion

| Feature                      | PostgreSQL 17                    | MySQL 8                                 |
| ---------------------------- | -------------------------------- | --------------------------------------- |
| **JSON Data Types**          | `jsonb` and `json`               | Single `JSON` type                      |
| **Format Preservation**      | Yes (with `json` type)           | No                                      |
| **Binary Storage**           | Yes (with `jsonb` type)          | Yes                                     |
| **Automatic Validation**     | Yes                              | Yes                                     |
| **JSON_TABLE Function**      | Yes (new in PostgreSQL 17)       | Yes                                     |
| **Indexing Support**         | GIN indexes, functional indexes  | Generated columns, multi-valued indexes |
| **Containment Operators**    | Yes (`@>`, `<@`)                 | No (uses functions instead)             |
| **Path Expression**          | Yes (dot and bracket notation)   | Yes (dot and bracket notation)          |
| **Schema Validation**        | No built-in support              | Yes (`JSON_SCHEMA_VALID()`)             |
| **Partial Updates**          | Yes                              | Yes                                     |
| **Array Membership Testing** | Yes (`?`, `?\|`, `?&` operators) | Yes (`MEMBER OF()` operator)            |
| **Pretty Printing**          | No built-in function             | Yes (`JSON_PRETTY()`)                   |

PostgreSQL 17 offers broader JSON functionality. If your workloads rely heavily on JSON and demand advanced querying, its `jsonb` type with GIN indexes is often the better fit. MySQL, however, is steadily improving and already provides a growing set of built-in JSON functions.

## Postgres vs MySQL Comparison Series

- [Overall comparison](/blog/postgres-vs-mysql)
- [DDL Transaction Difference](/blog/postgres-vs-mysql-ddl-transaction)
- [Indexing Options](/blog/postgres-vs-mysql-indexing-options)
- [Online Index Creation](/blog/postgres-vs-mysql-online-index-creation)

## References

1. PostgreSQL Documentation. (2024). "JSON Types." Retrieved from https://www.postgresql.org/docs/current/datatype-json.html

1. PostgreSQL Documentation. (2024). "JSON Functions and Operators." Retrieved from https://www.postgresql.org/docs/current/functions-json.html

1. MySQL Documentation. (2024). "The JSON Data Type." Retrieved from https://dev.mysql.com/doc/refman/8.0/en/json.html

1. MySQL Documentation. (2024). "JSON Function Reference." Retrieved from https://dev.mysql.com/doc/refman/8.0/en/json-function-reference.html

1. PostgreSQL Documentation. (2024). "PostgreSQL 17.0 Release Notes." Retrieved from https://www.postgresql.org/docs/release/17.0/

1. Stokes, D. (2023). "JSON Data Improvements in MySQL 8.0." Oracle MySQL Summit 2023. Retrieved from https://downloads.mysql.com/events/mysql-summit-2023/Oracle_MySQL_Summit_2023_JSON.pdf
