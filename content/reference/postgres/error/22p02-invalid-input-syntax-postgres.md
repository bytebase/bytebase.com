---
title: 'ERROR 22P02: Invalid Input Syntax for Type in Postgres'
---

## Error Message

```sql
ERROR: invalid input syntax for type integer: "abc"
SQLSTATE: 22P02
```

Other common variations:

```sql
ERROR: invalid input syntax for type uuid: "not-a-uuid"
ERROR: invalid input syntax for type boolean: "yes"
ERROR: invalid input syntax for type timestamp: "04-13-2026"
ERROR: invalid input syntax for type json: "{ invalid }"
```

## What Triggers This Error

PostgreSQL 22P02 fires when a value cannot be parsed into the expected data type. Unlike MySQL, Postgres does not silently coerce types — it rejects bad input immediately. The fix depends on which type conversion failed:

- **String where integer expected** — a query passes text like `'abc'` to an integer column or parameter
- **Malformed UUID** — a string that doesn't match the UUID format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Invalid boolean value** — using `'yes'`/`'no'` instead of PostgreSQL's accepted boolean literals
- **Timestamp format mismatch** — date string doesn't match the expected format or `datestyle` setting
- **Invalid JSON literal** — malformed JSON in a `json` or `jsonb` column

## Fix by Scenario

### String passed where integer expected

The most common cause. Usually happens when application code passes unsanitized user input directly into a query, or when a query parameter binding fails.

```sql
-- This fails
SELECT * FROM users WHERE id = 'abc';
-- ERROR: invalid input syntax for type integer: "abc"

-- Also fails with empty strings
SELECT * FROM users WHERE id = '';
-- ERROR: invalid input syntax for type integer: ""
```

**Fix:**

1. Validate input in the application layer before querying:

```python
# Bad: passes raw input to query
user_id = request.args.get('id')  # could be 'abc' or ''
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

# Good: validate first
user_id = request.args.get('id')
try:
    user_id = int(user_id)
except (ValueError, TypeError):
    return {"error": "Invalid user ID"}, 400
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

2. If null or empty values are possible, handle them explicitly:

```sql
-- Use NULLIF to convert empty strings to NULL
SELECT * FROM users WHERE id = NULLIF(:input, '')::integer;
```

3. If the column should accept mixed types, check with a regex first:

```sql
SELECT * FROM users
WHERE :input ~ '^\d+$'
  AND id = :input::integer;
```

### Malformed UUID

UUID columns are strict — the value must be exactly 32 hex digits in the `8-4-4-4-12` format.

```sql
-- These all fail
SELECT * FROM sessions WHERE session_id = 'not-a-uuid';
SELECT * FROM sessions WHERE session_id = '12345';
SELECT * FROM sessions WHERE session_id = '';
```

**Fix:**

1. Validate UUID format before querying:

```python
import uuid

def is_valid_uuid(val):
    try:
        uuid.UUID(str(val))
        return True
    except ValueError:
        return False

session_id = request.args.get('session_id')
if not is_valid_uuid(session_id):
    return {"error": "Invalid session ID"}, 400
```

2. In SQL, use a safe cast to avoid the error:

```sql
-- Returns NULL instead of raising an error (PostgreSQL 16+)
SELECT * FROM sessions
WHERE session_id = CAST(:input AS uuid DEFAULT NULL ON ERROR);
```

For PostgreSQL versions before 16, create a safe cast function:

```sql
CREATE OR REPLACE FUNCTION try_cast_uuid(text)
RETURNS uuid AS $$
BEGIN
  RETURN $1::uuid;
EXCEPTION WHEN invalid_text_representation THEN
  RETURN NULL;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

SELECT * FROM sessions WHERE session_id = try_cast_uuid(:input);
```

### Invalid boolean value

PostgreSQL accepts `true`/`false`, `t`/`f`, `yes`/`no`, `on`/`off`, `1`/`0` — but not arbitrary strings.

```sql
-- These work
SELECT * FROM users WHERE active = true;
SELECT * FROM users WHERE active = 'yes';
SELECT * FROM users WHERE active = '1';

-- These fail
SELECT * FROM users WHERE active = 'Y';
SELECT * FROM users WHERE active = 'active';
SELECT * FROM users WHERE active = 'enabled';
```

**Fix:**

1. Map application values to PostgreSQL booleans:

```python
bool_map = {'Y': True, 'N': False, 'active': True, 'inactive': False}
active = bool_map.get(request.args.get('active'))
if active is None:
    return {"error": "Invalid boolean value"}, 400
cursor.execute("SELECT * FROM users WHERE active = %s", (active,))
```

2. In SQL, use a CASE expression for non-standard values:

```sql
SELECT * FROM users
WHERE active = CASE :input
  WHEN 'Y' THEN true
  WHEN 'N' THEN false
  WHEN 'active' THEN true
  WHEN 'inactive' THEN false
END;
```

### Timestamp format mismatch

PostgreSQL parses timestamps based on the `datestyle` setting. The default `ISO, MDY` interprets `01-02-2026` as January 2nd, but `13-01-2026` fails because there's no month 13.

```sql
-- Check your current datestyle
SHOW datestyle;  -- e.g., 'ISO, MDY'

-- This fails with MDY datestyle (no month 13)
SELECT '13-01-2026'::date;
-- ERROR: invalid input syntax for type date: "13-01-2026"

-- This works — ISO 8601 format is always unambiguous
SELECT '2026-01-13'::date;
```

**Fix:**

1. Always use ISO 8601 format (`YYYY-MM-DD`) — it works regardless of `datestyle`:

```sql
-- Always safe
SELECT * FROM events WHERE created_at > '2026-04-13';
```

2. Use `TO_DATE` or `TO_TIMESTAMP` with an explicit format:

```sql
SELECT TO_DATE('13-01-2026', 'DD-MM-YYYY');
SELECT TO_TIMESTAMP('04/13/2026 15:30', 'MM/DD/YYYY HH24:MI');
```

3. In application code, format dates before sending:

```python
from datetime import date
# Always send ISO format
cursor.execute("SELECT * FROM events WHERE created_at > %s", (date(2026, 4, 13).isoformat(),))
```

### Invalid JSON literal in `jsonb` column

Inserting or casting malformed JSON into a `json` or `jsonb` column triggers 22P02.

```sql
-- These fail
SELECT '{ name: "test" }'::jsonb;       -- keys must be quoted
SELECT '{ "name": undefined }'::jsonb;  -- undefined is not valid JSON
SELECT "{ \"name\": \"test\" }"::jsonb; -- double-quoted string, not a literal

-- This works
SELECT '{ "name": "test" }'::jsonb;
```

**Fix:**

1. Validate JSON in the application before inserting:

```python
import json

data = request.get_json()
try:
    json_str = json.dumps(data)  # ensures valid JSON
except (TypeError, ValueError) as e:
    return {"error": f"Invalid JSON: {e}"}, 400

cursor.execute("INSERT INTO configs (data) VALUES (%s::jsonb)", (json_str,))
```

2. Use `jsonb_typeof` to test if a string is valid JSON:

```sql
-- Returns NULL for invalid JSON instead of raising an error
SELECT jsonb_typeof(:input::jsonb);
```

## Prevention

- Always use parameterized queries with proper type bindings — let the database driver handle type conversion
- Validate user input at the application boundary before it reaches SQL
- Use ISO 8601 format (`YYYY-MM-DD`, `YYYY-MM-DDTHH:MM:SS`) for all date and timestamp values
- For UUID columns, validate format client-side before querying
- In PostgreSQL 16+, use `CAST(... DEFAULT ... ON ERROR)` for safe type conversion

<HintBlock type="info">

Bytebase's [SQL Review](https://docs.bytebase.com/sql-review/review-rules/) can enforce column type consistency across your schema, catching potential type mismatches before they cause runtime errors. See also [ERROR 42804: Datatype Mismatch](/reference/postgres/error/42804-datatype-mismatch) for type errors in expressions and assignments.

</HintBlock>
