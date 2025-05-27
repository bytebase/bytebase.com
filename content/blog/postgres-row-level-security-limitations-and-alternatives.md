---
title: PostgreSQL Row-level Security (RLS) Limitations and Alternatives
author: Tianzhou
updated_at: 2025/05/28 12:00:00
feature_image: /content/blog/postgres-row-level-security-limitations-and-alternatives/banner.webp
tags: Explanation
description: 'While PostgreSQL RLS is a powerful feature, it has inherent design limitations that hinder broader adoption. In this post, we’ll examine these limitations and explore alternatives.'
---

PostgreSQL's [built-in Row-Level Security (RLS)](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) allows database administrators to define policies that control which rows can be returned by queries or modified by data manipulation commands on a per-user basis. When enabled, all access to a table must be allowed by a security policy, with table owners typically bypassing these restrictions unless explicitly configured otherwise.

Key characteristics include:

- Enabled at the table level with `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- Policies can be specific to commands (SELECT, INSERT, UPDATE, DELETE) or roles
- Uses Boolean expressions to determine which rows are visible/modifiable
- Multiple policies can be combined using OR (permissive) or AND (restrictive)
- Superusers and roles with `BYPASSRLS` attribute bypass row security

While powerful, RLS has performance impact , limited flexibility, and operational overhead that hinder broader adoption. Let's review them in details and discuss the alternatives.

## Performance Impact

Let me break down the detailed performance differences between PostgreSQL RLS and views, examining the internal mechanisms that cause these performance disparities.

RLS policies are evaluated for _every single row_ during query execution. When you query a table with RLS enabled, PostgreSQL:

1. Scans the table (or uses an index)
1. For each row retrieved, evaluates ALL applicable RLS policies
1. Only returns rows that pass the policy checks
1. This happens even if the query has its own WHERE clauses

```sql
-- RLS Policy
CREATE POLICY tenant_isolation ON orders
FOR ALL TO app_user
USING (tenant_id = current_setting('app.tenant_id')::int);

-- This query will:
-- 1. Scan orders table
-- 2. For EACH row, check if tenant_id matches current setting
-- 3. Apply the user's WHERE clause
-- 4. Return matching rows
SELECT * FROM orders WHERE status = 'pending';
```

**Policy Composition Complexity**
Multiple RLS policies on the same table are combined with AND logic, requiring evaluation of each policy for every row:

```sql
-- Multiple policies compound the evaluation cost
CREATE POLICY tenant_policy ON orders
USING (tenant_id = current_setting('app.tenant_id')::int);

CREATE POLICY department_policy ON orders
USING (department_id IN (
  SELECT dept_id FROM user_departments
  WHERE user_id = current_setting('app.user_id')::int
));

-- Now EVERY row must pass BOTH policy checks
```

### Alternatives: Views

**Pre-Filtered Result Sets**
Views with security predicates are resolved during query planning, allowing the optimizer to push predicates down and use indexes effectively:

```sql
-- Security view
CREATE VIEW tenant_orders AS
SELECT * FROM orders
WHERE tenant_id = current_setting('app.tenant_id')::int;

-- Query against view
SELECT * FROM tenant_orders WHERE status = 'pending';

-- PostgreSQL can optimize this as:
-- SELECT * FROM orders
-- WHERE tenant_id = current_setting('app.tenant_id')::int
--   AND status = 'pending'
-- And use compound indexes on (tenant_id, status)
```

**Index Utilization**
The query planner can effectively use indexes when security predicates are part of the base query rather than row-by-row filters:

```sql
-- With RLS: Index on tenant_id might not be used optimally
-- because the security check happens after row retrieval

-- With views: Can use compound index (tenant_id, status) effectively
CREATE INDEX idx_orders_tenant_status ON orders(tenant_id, status);
```

The fundamental issue is that RLS operates as a post-processing security filter rather than an integral part of query optimization, while views allow the security constraints to be optimized as part of the core query execution plan.

The RLS version must:

1. Perform the full join
1. Evaluate RLS policies on each joined row
1. Filter results

The View version can:

1. Use indexes to pre-filter both tables
1. Join only relevant rows
1. Apply final predicates efficiently

Of course, View has its own limitations:

- **Proliferation of Views**: May need many views for different access patterns
- **Maintenance Overhead**: Changes to base tables may require view updates
- **Limited Dynamism**: Less flexible for highly dynamic permission models
- **Write Operations**: More complex to handle INSERT/UPDATE operations

## Flexibility Limitation

**SQL-Only Policy Expressions**

RLS policies are constrained to SQL expressions, which limits what you can express:

```sql
-- RLS can only do this:
CREATE POLICY simple_tenant_policy ON documents
USING (tenant_id = current_setting('app.tenant_id')::int);

-- But cannot do complex business logic like:
-- "Users can access documents if they're in the same department
--  AND it's during business hours
--  AND they've completed required training
--  AND the document hasn't been flagged by content moderation
--  AND external compliance API approves access"
```

**Static Context Limitations**

RLS policies are evaluated with limited context - primarily database session variables and current user information:

```sql
-- Limited to session context
CREATE POLICY time_based_policy ON sensitive_data
USING (
  EXTRACT(hour FROM NOW()) BETWEEN 9 AND 17 -- Crude business hours
  AND EXTRACT(dow FROM NOW()) BETWEEN 1 AND 5 -- Weekdays only
);

-- Cannot consider:
-- - User's actual timezone and location
-- - Company-specific holiday calendar
-- - User's current device/IP reputation
-- - Recent security events or risk scores
-- - Dynamic compliance requirements
```

**No External System Integration**

RLS cannot make external API calls or integrate with other systems:

```sql
-- This is impossible in RLS:
-- CREATE POLICY compliance_policy ON financial_records
-- USING (external_compliance_service_check(user_id, document_id, current_timestamp));

-- You're limited to data that exists in your PostgreSQL instance
```

### Alternatives: Application-Level Logic

While RLS forces you to work within the constraints of SQL and database session context, modern authorization systems can incorporate any data source, apply any business logic, and make decisions based on the full context of each request.

Below shows an ABAC (Attribute-Based Access Control) system that incorporates different attribute types into authorization decisions:

```javascript
// Using Casbin or similar ABAC engine
const authorizationEngine = {
  async checkAccess(subject, resource, action, context) {
    const policy = await this.evaluatePolicy({
      // User attributes
      user: {
        id: subject.id,
        roles: subject.roles,
        department: subject.department,
        clearanceLevel: subject.clearanceLevel,
        lastTrainingDate: subject.lastTrainingDate,
        currentLocation: await geoService.getLocation(context.ip),
        riskScore: await riskEngine.getUserRiskScore(subject.id),
      },

      // Resource attributes
      resource: {
        id: resource.id,
        classification: resource.dataClassification,
        owner: resource.owner,
        createdDate: resource.createdDate,
        lastModified: resource.lastModified,
        complianceFlags: await complianceService.getFlags(resource.id),
      },

      // Environmental attributes
      environment: {
        currentTime: new Date(),
        userAgent: context.userAgent,
        networkLocation: context.networkLocation,
        isBusinessHours: await businessCalendar.isBusinessHours(),
        threatLevel: await securityService.getCurrentThreatLevel(),
      },

      action: action,
    });

    return policy.decision;
  },
};

// Usage
const canAccess = await authorizationEngine.checkAccess(
  currentUser,
  requestedDocument,
  'read',
  requestContext,
);
```

## Operational Overhead

**Management Overhead**

DBAs become organizational bottlenecks when managing RLS policies due to the manual intervention required at every stage of the policy lifecycle. Policy creation demands deep PostgreSQL expertise to craft secure SQL logic while analyzing performance implications and cross-policy dependencies. Managing existing policies becomes increasingly complex as organizations accumulate hundreds of interconnected policies without proper versioning, dependency tracking, or impact analysis capabilities. Decommissioning policies requires manual archaeological work to identify relationships and ensure safe removal without breaking dependent systems.

**Developer Self-Service Usability Limitations**

Developers face friction when working with RLS as there are no self-service capabilities for access management or testing. RLS provides no mechanism for just-in-time access requests, emergency debugging access, or temporary permissions, forcing developers to rely on manual DBA intervention even during critical incidents. The development experience is impacted by inability to create local test environments with proper authorization logic, poor debugging capabilities for authorization failures, and no way to unit test against different access scenarios.

### Alternatives: Middleware + Tooling

Instead of using database-level RLS, you can implement an authorization middleware layer that intercepts queries and enforces security policies at the application tier.

**[Open Policy Agent (OPA)](https://www.openpolicyagent.org/)**: Policies are defined in the Rego language and managed in version control systems like Git, enabling best practices such as code reviews, automated testing, and CI/CD integration.

**Bytebase**: Use Bytebase as a database access management platform to provide developers with self-service access portals. It automates approval workflows and policy generation, removing the need for DBAs to manually create and revoke temporary permissions. Bytebase also offers audit trails, break-glass access procedures, and integrates with existing identity systems.

## Summary

RLS works well for straightforward data filtering—such as `tenant_id` isolation—where database-level enforcement offers fast and reliable security baselines. It excels at applying simple predicates that map directly to database queries, without requiring external integrations or complex business logic.

However, for a production-grade multi-tenant service, a layered approach is often more scalable:

1. **RLS for Basic Tenant Isolation**
   Use RLS to enforce simple, row-level access control based on fields like `tenant_id`. This provides efficient, in-database filtering with minimal operational overhead.

2. **Application Logic + OPA for Complex Policies**
   For advanced authorization needs, integrate policy engines like Open Policy Agent (OPA) at the application layer. OPA handles dynamic logic that SQL cannot express—such as time-based access, workflow states, external API checks, or user roles—while supporting Git-based version control, automated testing, and policy simulation.

3. **Bytebase for Just-in-Time Human Access**
   For operational scenarios like production troubleshooting or emergency access, Bytebase offers a self-service portal with automated approval workflows, audit trails, and break-glass procedures. This eliminates manual DBA intervention while preserving governance and traceability.
