---
title: Postgres Row Level Security (RLS)
updated_at: 2025/03/17 12:00:00
---

_Official documentation: [Row Security Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)_

## Introduction to Row Level Security

Row Level Security (RLS) is a PostgreSQL feature that allows database administrators to define security policies restricting which rows users can access in a table. This enables fine-grained access control directly at the database level, ensuring users see only the data they should have permission to view, modify, or delete.

<HintBlock type="info">

Row Level Security provides an additional security layer independent of client applications. Organizations can enforce data access controls consistently across all applications connecting to the database.

You can use [Bytebase's approval workflows](https://docs.bytebase.com/administration/custom-approval/) to manage policy changes systematically across environments.

</HintBlock>

## How Row Level Security Works

RLS works by applying security policies to tables that filter the rows visible to users when they execute queries. These policies are expressions evaluated for each row, determining whether a user can see or modify that row.

1. **Row-level filtering**: Policies automatically filter SELECT, UPDATE, and DELETE operations
2. **User context awareness**: Policies can reference the current user with the `current_user` or `session_user` functions
3. **Application context**: Custom variables can be set to provide additional context for policy decisions

## Enabling Row Level Security

To use RLS, you must first enable it on the table:

```sql
-- Enable RLS on a table
ALTER TABLE customer_data ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners (optional)
ALTER TABLE customer_data FORCE ROW LEVEL SECURITY;
```

## Creating RLS Policies

```sql
-- Basic policy syntax
CREATE POLICY policy_name
ON table_name
[FOR command]
[TO role_name]
[USING (using_expression)]
[WITH CHECK (check_expression)];
```

Where:

- `policy_name`: A descriptive name for the policy
- `FOR command`: Specifies which command the policy applies to (ALL, SELECT, INSERT, UPDATE, DELETE)
- `TO role_name`: Specifies which role(s) the policy applies to
- `USING`: Expression evaluated for existing rows to determine visibility (for SELECT, UPDATE, DELETE)
- `WITH CHECK`: Expression evaluated for new or modified rows (for INSERT, UPDATE)

## RLS Policy Examples

### Example 1: Multi-tenant Data Isolation

Ensuring tenants can only see their own data:

```sql
-- Create a multi-tenant table
CREATE TABLE tenant_data (
    id SERIAL PRIMARY KEY,
    tenant_id INTEGER NOT NULL,
    data TEXT
);

-- Enable RLS
ALTER TABLE tenant_data ENABLE ROW LEVEL SECURITY;

-- Create policy for tenants to see only their data
CREATE POLICY tenant_isolation_policy
ON tenant_data
USING (tenant_id = current_setting('app.current_tenant_id')::INTEGER);

-- Set the tenant context when connecting
SET app.current_tenant_id = '42';
```

### Example 2: User-Based Data Ownership

Allowing users to see only their own records:

```sql
-- Create a user data table
CREATE TABLE user_documents (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    document_name TEXT,
    contents TEXT
);

-- Enable RLS
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own documents
CREATE POLICY user_documents_policy
ON user_documents
USING (user_id = current_user);
```

### Example 3: Role-Based Access Control

Different access for different roles:

```sql
-- Create table
CREATE TABLE employee_data (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    department TEXT,
    salary NUMERIC
);

-- Enable RLS
ALTER TABLE employee_data ENABLE ROW LEVEL SECURITY;

-- Managers can see all employee data in their department
CREATE POLICY managers_department_policy
ON employee_data
FOR SELECT
TO managers
USING (department = current_setting('user.department'));

-- HR can see all employee data
CREATE POLICY hr_all_access_policy
ON employee_data
FOR ALL
TO hr;

-- Employees can only see their own data
CREATE POLICY employee_self_policy
ON employee_data
FOR SELECT
TO employees
USING (employee_id = current_setting('user.employee_id')::INTEGER);
```

### Example 4: Different Policies for Different Operations

Separate policies for different SQL commands:

```sql
-- Create policy for viewing any record
CREATE POLICY blog_post_view
ON blog_posts
FOR SELECT
USING (published = true OR author = current_user);

-- Create policy for updating only your own posts
CREATE POLICY blog_post_update
ON blog_posts
FOR UPDATE
USING (author = current_user);

-- Create policy for deleting (admins only)
CREATE POLICY blog_post_delete
ON blog_posts
FOR DELETE
TO admin;
```

## Using WITH CHECK for Write Operations

The `WITH CHECK` clause validates new or modified data:

```sql
CREATE POLICY salary_changes
ON employee_data
FOR UPDATE
USING (department = current_setting('user.department'))
WITH CHECK (
    department = current_setting('user.department') AND
    (CASE
        WHEN current_setting('user.role') = 'manager' THEN salary <= 100000
        WHEN current_setting('user.role') = 'director' THEN salary <= 500000
        ELSE false
    END)
);
```

## Managing RLS Policies

```sql
-- List all policies on a table
SELECT * FROM pg_policies WHERE tablename = 'your_table';

-- Drop a policy
DROP POLICY policy_name ON table_name;

-- Alter an existing policy
ALTER POLICY policy_name ON table_name
USING (new_using_expression);

-- Disable RLS on a table
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
```

## Performance Considerations

Row Level Security adds overhead to query execution:

1. **Query Planning**: RLS conditions are added to query execution plans
2. **Index Usage**: Ensure RLS predicates can use indexes effectively
3. **Session Variables**: Setting session variables for each connection adds complexity
4. **Testing**: Always test performance with realistic data volumes

```sql
-- Create indexes to support RLS predicates
CREATE INDEX idx_tenant_data_tenant_id ON tenant_data(tenant_id);
CREATE INDEX idx_user_documents_user_id ON user_documents(user_id);
```

## Common Patterns and Best Practices

### Using Application Settings

```sql
-- Function to safely get app settings with default
CREATE OR REPLACE FUNCTION get_app_setting(setting text, default_value text)
RETURNS text AS $$
BEGIN
    RETURN COALESCE(
        current_setting(setting, true),
        default_value
    );
END;
$$ LANGUAGE plpgsql;

-- Using the function in a policy
CREATE POLICY safe_tenant_policy
ON tenant_data
USING (tenant_id = get_app_setting('app.current_tenant_id', '0')::INTEGER);
```

### Superuser Bypass

Remember that superusers bypass RLS by default unless you use `FORCE ROW LEVEL SECURITY`:

```sql
-- Force RLS for all users including table owner
ALTER TABLE sensitive_data FORCE ROW LEVEL SECURITY;

-- Create a policy that applies to everyone
CREATE POLICY all_users_policy
ON sensitive_data
USING (true);
```

### Policy Combination

Multiple policies on the same table are combined using OR for the same command:

```sql
-- Users can see their own posts
CREATE POLICY my_posts
ON posts
USING (author = current_user);

-- Users can also see published posts
CREATE POLICY published_posts
ON posts
USING (status = 'published');

-- Result: Users see their own posts OR published posts
```

## Common Issues and Troubleshooting

### Problem: No rows visible despite expected access

```sql
-- Verify RLS is enabled
SELECT relname, relrowsecurity
FROM pg_class
WHERE relname = 'your_table';

-- List all policies
SELECT * FROM pg_policies
WHERE tablename = 'your_table';

-- Verify current values of variables used in policies
SELECT current_user;
SELECT current_setting('app.current_tenant_id', true);

-- Test policy expression directly
SELECT * FROM your_table
WHERE your_policy_expression;
```

### Problem: Setting session variables for each connection

Create a function to set all necessary variables:

```sql
CREATE OR REPLACE FUNCTION set_user_context(tenant_id integer, department text)
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.current_tenant_id', tenant_id::text, false);
    PERFORM set_config('user.department', department, false);
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT set_user_context(42, 'Engineering');
```

### Problem: Policies affecting performance

```sql
-- Use EXPLAIN ANALYZE to check execution plan
EXPLAIN ANALYZE SELECT * FROM your_table WHERE ...;

-- Review indexes to ensure they support policy predicates
```

## Security Considerations

1. **Test thoroughly**: Validate RLS policies work as expected across different roles
2. **Avoid leakage**: Consider how error messages might leak information
3. **Combine with column-level security** when needed
4. **Audit policy changes**: Track who changes security policies
5. **Remember application roles**: If your app connects with a single role, RLS needs context variables

## Conclusion

Row Level Security provides powerful, flexible data access controls directly in PostgreSQL. By implementing appropriate policies, organizations can ensure that users see only the data they should have access to, regardless of how they connect to the database.

When implementing RLS, always consider the performance implications and test thoroughly to ensure both security requirements and performance expectations are met.
