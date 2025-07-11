---
title: How to Store Time in PostgreSQL - Using TIMESTAMPTZ
---

This guide explains why you should use `timestamptz` instead of `timestamp` for storing time data in PostgreSQL to prevent timezone-related data integrity issues.

## Why TIMESTAMPTZ Matters

### The Problem with TIMESTAMP

When PostgreSQL stores a datetime in a `timestamp` field, it drops the UTC offset, causing data loss:

```sql
-- These two different times will be stored identically
INSERT INTO events (created_at) VALUES ('2019-10-11 21:11:24+02');  -- Berlin time
INSERT INTO events (created_at) VALUES ('2019-10-11 21:11:24-06');  -- Chicago time

-- Both stored as: 2019-10-11 21:11:24 (timezone information lost)
```

This creates serious data integrity issues in global applications.

### The Solution: TIMESTAMPTZ

`timestamptz` (timestamp with time zone) preserves timezone information:

```sql
CREATE TABLE events (
    event_time TIMESTAMPTZ
);
```

## Implementation Guide

### Creating New Tables

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);
```

### Modifying Existing Tables

```sql
-- Simple conversion (assumes UTC)
ALTER TABLE users
    ALTER COLUMN created_at TYPE TIMESTAMPTZ,
    ALTER COLUMN updated_at TYPE TIMESTAMPTZ;
```

### Safe Migration for Production

```sql
-- Step 1: Add new column
ALTER TABLE users ADD COLUMN created_at_new TIMESTAMPTZ;

-- Step 2: Populate with timezone assumption
UPDATE users
SET created_at_new = created_at AT TIME ZONE 'UTC'
WHERE created_at IS NOT NULL;

-- Step 3: Verify data
SELECT created_at, created_at_new FROM users LIMIT 5;

-- Step 4: Replace old column
BEGIN;
ALTER TABLE users DROP COLUMN created_at;
ALTER TABLE users RENAME COLUMN created_at_new TO created_at;
COMMIT;
```

## Working with TIMESTAMPTZ

### Inserting Data

```sql
-- Insert with explicit timezone
INSERT INTO events (event_time) VALUES ('2024-01-15 10:30:00+00');
INSERT INTO events (event_time) VALUES ('2024-01-15 10:30:00-05');

-- Insert current time
INSERT INTO events (event_time) VALUES (NOW());
```

### Timezone Conversions

```sql
-- Convert for display in different timezones
SELECT
    event_time,
    event_time AT TIME ZONE 'America/New_York' AS ny_time,
    event_time AT TIME ZONE 'Europe/London' AS london_time
FROM events;
```

### Filtering by Time Ranges

```sql
-- Always use explicit timezone for filters
SELECT * FROM events
WHERE event_time >= '2024-01-01 00:00:00+00'
  AND event_time < '2024-02-01 00:00:00+00';
```

### Managing Session Timezone

```sql
-- Set timezone for current session
SET timezone = 'America/New_York';

-- Check current timezone
SHOW timezone;
```

## Practical Example

```sql
-- Create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER,
    order_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert and display in different timezones
INSERT INTO orders (customer_id, order_date)
VALUES (123, '2024-06-15 14:30:00+00');

SELECT
    id,
    order_date,
    order_date AT TIME ZONE 'America/Los_Angeles' AS local_time
FROM orders;
```

## Summary

Using `timestamptz` instead of `timestamp` prevents timezone-related data loss and ensures your application works correctly across different timezones.

**Key Benefits:**

- **Preserves timezone information** - No data loss during storage
- **Consistent behavior** - Predictable timezone conversions
- **Global application support** - Works correctly worldwide
- **Framework compatibility** - Supported by all major ORMs

**Remember:** Always prefer `timestamptz` for any timestamp that represents a specific moment in time, especially for user-generated data.
