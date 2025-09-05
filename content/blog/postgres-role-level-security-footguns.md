---
title: 'Common Postgres Role-Level-Security footguns'
author: Adela
updated_at: 2025/09/05 18:00
feature_image: /content/blog/postgres-role-level-security-footguns/cover.webp
tags: Explanation
description: 'An engineering perspective to evaluate Postgres role-level-security footguns'
---
PostgreSQL's Row-Level Security (RLS) is a powerful feature for implementing fine-grained access control, but it's riddled with subtle traps that can destroy performance or completely bypass security. This comprehensive guide covers all the major footguns with practical fixes and real-world examples.

---

## Performance Footguns

### 1. The LEAKPROOF Function Performance Killer

**The footgun:** Non-LEAKPROOF functions in RLS policies prevent index usage, causing catastrophic performance degradation.

**Why it happens:** PostgreSQL must apply RLS filtering first, then non-LEAKPROOF functions, preventing the query planner from using indexes.

**Example problem:**
```sql
-- This will cause full table scans even with an index on title
CREATE POLICY user_documents ON documents
FOR SELECT
USING (owner_id = current_user_id() AND title ILIKE '%search%');
```

**The fix:**
```sql
-- Use LEAKPROOF functions or move complex logic out of policies
CREATE OR REPLACE FUNCTION safe_ilike(text, text) 
RETURNS boolean 
LANGUAGE sql 
LEAKPROOF 
AS $$ SELECT $1 ILIKE $2 $$;

CREATE POLICY user_documents ON documents
FOR SELECT
USING (owner_id = current_user_id() AND safe_ilike(title, '%search%'));
```

**Performance impact:** Queries can go from milliseconds to hours on large tables.

### 2. Complex Policy Performance Death

**The footgun:** Complex RLS policies with subqueries execute for every row, multiplying query cost exponentially.

**Bad example:**
```sql
CREATE POLICY complex_access ON orders
USING (
  EXISTS (
    SELECT 1 FROM user_permissions up 
    JOIN departments d ON up.dept_id = d.id 
    WHERE up.user_id = current_user_id() 
    AND d.region = orders.region
  )
);
```

**Better approach:**
```sql
-- Move complexity to a LEAKPROOF function
CREATE OR REPLACE FUNCTION user_has_region_access(region_name text)
RETURNS boolean
LANGUAGE sql
LEAKPROOF
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_permissions up 
    JOIN departments d ON up.dept_id = d.id 
    WHERE up.user_id = current_user_id() 
    AND d.region = region_name
  );
$$;

CREATE POLICY simple_access ON orders
USING (user_has_region_access(region));
```

### 3. Missing Indexes on Policy Columns

**The footgun:** Forgetting to index columns used in RLS policies forces sequential scans.

**Essential indexes:**
```sql
-- Always index columns used in policies
CREATE INDEX ON orders(tenant_id);
CREATE INDEX ON orders(owner_id);
CREATE INDEX ON orders(tenant_id, owner_id); -- composite for AND conditions
```

---

## Security Footguns

### 4. The BYPASSRLS Superuser Trap

**The footgun:** Superusers and table owners bypass RLS by default, creating false security confidence during testing.

**Why it's dangerous:** Testing with superuser accounts makes RLS appear to work when it's actually being ignored.

**The fix:**
```sql
-- Force RLS even for table owners
ALTER TABLE sensitive_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensitive_data FORCE ROW LEVEL SECURITY;

-- Never grant BYPASSRLS to application roles
-- Test with dedicated non-superuser accounts
```

**Testing pattern:**
```sql
-- Create proper test user
CREATE ROLE test_user;
GRANT app_user TO test_user;

-- Test as the actual application user
SET ROLE test_user;
SET app.tenant_id = 'test-tenant-id';
-- Run your tests here
RESET ROLE;
```

### 5. SECURITY DEFINER View Bypass

**The footgun:** Views are SECURITY DEFINER by default, running with creator's privileges and bypassing RLS.

**Dangerous example:**
```sql
-- Created by superuser - bypasses ALL RLS policies!
CREATE VIEW all_patient_data AS 
SELECT * FROM patients;
```

**Secure approaches:**
```sql
-- PostgreSQL 15+: Use SECURITY INVOKER
CREATE VIEW patient_data 
WITH (security_invoker = true)
AS SELECT * FROM patients;

-- Older versions: Use SECURITY DEFINER with explicit RLS
CREATE OR REPLACE FUNCTION get_patient_data()
RETURNS TABLE(id uuid, name text, doctor_id uuid)
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  -- Explicitly check RLS in SECURITY DEFINER functions
  IF NOT row_security_active('patients') THEN
    RAISE EXCEPTION 'Row security must be active';
  END IF;
  
  RETURN QUERY SELECT p.id, p.name, p.doctor_id FROM patients p;
END;
$$ LANGUAGE plpgsql;
```

### 6. Timing Side-Channel Attacks

**The footgun:** Query execution time leaks information about restricted data, allowing sophisticated attacks.

**Attack scenario:** In a multi-tenant medical database, an attacker measures query times to determine if patients with specific conditions exist in other tenants' data.

**Technical details:**
- RLS policy enforcement creates measurable timing differences
- Attackers can infer secret cardinality information
- Works even across network latency in cloud environments

**Example vulnerable query:**
```sql
-- Timing reveals if forbidden patients exist
SELECT COUNT(*) FROM patients 
WHERE condition = 'rare_disease' 
AND tenant_id = current_setting('app.tenant_id')::uuid;
```

**Mitigation strategies:**
1. Use data-oblivious query patterns (performance cost)
1. Add artificial delays to normalize timing
1. Limit query complexity for untrusted users
1. Monitor for suspicious timing-based query patterns

**Research note:** This attack has been demonstrated in academic research and works in real-world cloud environments.

### 7. CVE-2019-10130: Statistics Leakage

**The footgun:** PostgreSQL's query planner statistics could leak sampled data from RLS-protected rows.

**Technical details:**
- Query planner collects statistics by sampling column data
- Users could craft operators to read statistics containing forbidden data
- Affected PostgreSQL 9.5-11 before May 2019 patches

**Status:** Fixed in PostgreSQL 9.5.17, 9.6.13, 10.8, 11.3

**Lesson:** Keep PostgreSQL updated and remember that even internal mechanisms can leak data.

---

## Implementation Footguns

### 8. Missing FORCE ROW LEVEL SECURITY

**The footgun:** Enabling RLS without FORCE allows table owners to bypass policies.

**Problem:**
```sql
-- Table owner still sees everything!
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
```

**Solution:**
```sql
-- Force RLS for everyone, including owners
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders FORCE ROW LEVEL SECURITY;
```

### 9. USING vs WITH CHECK Confusion

**The footgun:** USING filters existing rows for SELECT/UPDATE/DELETE, but WITH CHECK validates new/modified rows for INSERT/UPDATE.

**Dangerous example:**
```sql
-- Users can INSERT data they can't see!
CREATE POLICY tenant_data ON orders
FOR ALL
USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

**Correct approach:**
```sql
CREATE POLICY tenant_isolation ON orders
FOR ALL
USING (tenant_id = current_setting('app.tenant_id')::uuid)
WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);
```

### 10. Connection Pooling Context Loss

**The footgun:** With connection pooling, `current_user` is a shared database role, useless for tenant isolation.

**Problem:**
```sql
-- Useless with PgBouncer - all connections share same user
CREATE POLICY user_data ON orders
USING (owner_id = current_user);
```

**Solution:**
```sql
-- Use application-controlled session variables
-- App sets per transaction:
SET app.user_id = 'user-uuid';
SET app.tenant_id = 'tenant-uuid';

-- Policy reads from session:
CREATE POLICY tenant_isolation ON orders
FOR ALL
USING (tenant_id = current_setting('app.tenant_id')::uuid)
WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);
```

**Security hardening:**
```sql
-- Prevent clients from setting app.* directly
REVOKE ALL ON SCHEMA pg_catalog FROM app_user;
-- Only allow trusted server code to set these variables
```

### 11. Foreign Key Failures Under RLS

**The footgun:** INSERT into child tables fails FK checks because RLS blocks SELECT on parent rows.

**Example failure:**
```sql
-- This INSERT fails even if customer exists
INSERT INTO orders (customer_id, tenant_id) 
VALUES ('existing-customer-id', 'my-tenant');
-- ERROR: insert or update on table "orders" violates foreign key constraint
```

**Solution:**
```sql
-- Parent table needs SELECT policy for FK checks
CREATE POLICY customer_fk_visibility ON customers
FOR SELECT
USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

### 12. Unique Constraint Cross-Tenant Leakage

**The footgun:** Global unique constraints reveal data existence across tenants.

**Problem:**
```sql
-- This reveals that email exists in ANY tenant
CREATE UNIQUE INDEX users_email_unique ON users(email);
-- INSERT fails with "duplicate key" even for other tenants
```

**Solution:**
```sql
-- Scope uniqueness to tenant
CREATE UNIQUE INDEX users_email_per_tenant 
ON users(tenant_id, lower(email));
```

### 13. Silent Failures

**The footgun:** RLS failures are silent - operations fail without errors or warnings.

**Example:** An UPDATE that should modify 100 rows silently affects 0 rows due to RLS policy.

**Debugging approach:**
```sql
-- Temporarily disable RLS to test
SET row_security = off;
-- Run your query to see if RLS is the issue
SET row_security = on;

-- Or check if policies are active
SELECT row_security_active('table_name');
```

### 14. Column-Level Security Gaps

**The footgun:** RLS filters rows, not columns. Sensitive columns remain visible in allowed rows.

**Problem:**
```sql
-- Users can see SSN in their own records
SELECT * FROM users WHERE tenant_id = current_setting('app.tenant_id')::uuid;
```

**Solutions:**
```sql
-- Option 1: Column privileges
REVOKE SELECT (ssn, salary) ON users FROM app_user;

-- Option 2: Secure views
CREATE VIEW users_safe AS
SELECT id, name, email, 
       CASE WHEN has_role('hr_role') 
            THEN ssn 
            ELSE 'XXX-XX-' || right(ssn, 4) 
       END as ssn_masked
FROM users;
```

### 15. Materialized Views and Background Jobs

**The footgun:** Data copied to materialized views or exported by jobs isn't automatically protected by source table policies.

**Problems:**
```sql
-- Materialized view bypasses RLS
CREATE MATERIALIZED VIEW order_summary AS
SELECT * FROM orders; -- Contains all tenants' data!

-- Background job exports everything
COPY (SELECT * FROM orders) TO '/tmp/backup.csv';
```

**Solutions:**
```sql
-- Apply filtering in materialized views
CREATE MATERIALIZED VIEW tenant_order_summary AS
SELECT tenant_id, COUNT(*), SUM(amount)
FROM orders 
GROUP BY tenant_id;

-- Use RLS-aware exports
COPY (
  SELECT * FROM orders 
  WHERE tenant_id = 'specific-tenant'
) TO '/tmp/tenant_backup.csv';
```

### 16. Multiple Policy Confusion

**The footgun:** Multiple permissive policies are OR-ed together; one broad policy can override stricter ones.

**Problem:**
```sql
-- These policies are OR-ed - users get access if EITHER is true
CREATE POLICY user_own_data ON orders
USING (owner_id = current_user_id());

CREATE POLICY admin_all_data ON orders  
USING (has_role('admin')); -- Oops, too broad!
```

**Solutions:**
```sql
-- Option 1: Use restrictive policies (AND-ed)
CREATE POLICY tenant_restriction ON orders
AS RESTRICTIVE
USING (tenant_id = current_setting('app.tenant_id')::uuid);

-- Option 2: Combine logic in single policy
CREATE POLICY combined_access ON orders
USING (
  tenant_id = current_setting('app.tenant_id')::uuid
  AND (
    owner_id = current_user_id() 
    OR has_role('tenant_admin')
  )
);
```

## Key Takeaways

1. **RLS is not a security silver bullet** - it can be bypassed through multiple vectors
1. **Performance impact is severe** - always index policy columns and keep policies simple
1. **Testing methodology is critical** - never test with superuser accounts
1. **Silent failures make debugging painful** - policies fail without warnings
1. **Context management is crucial** - use secure session variables, not `current_user`
1. **Defense in depth** - combine RLS with column privileges, secure views, and application-level controls

RLS is powerful when implemented correctly, but requires careful attention to these footguns to avoid catastrophic security and performance failures.
