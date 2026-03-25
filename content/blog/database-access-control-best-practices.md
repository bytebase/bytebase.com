---
title: 'Database Access Control Best Practices'
author: Adela
updated_at: 2026/03/24 09:00:00
feature_image: /content/blog/database-access-control-best-practices/banner.webp
tags: Explanation
description: 'Best practices for database access control covering least privilege, RBAC, just-in-time access, and compliance with SOC 2, HIPAA, and GDPR.'
---

Database access control is the set of policies and mechanisms that determine who can connect to a database, what operations they can perform, and how long that access lasts. It covers both authentication (proving identity) and authorization (granting permissions) at the database engine level, independently of application-layer controls.

Get it wrong and you are one `DROP TABLE` away from a production incident, or one leaked credential away from a compliance violation. Most teams start with a shared admin account and a handful of application credentials. That works until the first [SOC 2 audit](/blog/soc2-data-security-and-retention-requirements/) asks *"who ran this query on March 3rd?"* and nobody can answer. This guide covers the principles, engine-specific mechanics, and common mistakes of database access control, along with practical ways to fix them.

## What a working access control system looks like

Even if your app restricts what users see in the UI, anyone with direct database credentials can bypass those restrictions entirely. A working access control system answers four questions:

1. **Who** is connecting? (A named individual, not a shared account.)
2. **What** can they do? (Read, write, alter schema, grant permissions to others.)
3. **Where** can they do it? (Which databases, schemas, tables, columns.)
4. **How long** does the access last? (Permanent, time-boxed, or on-demand.)

## Why access control matters for compliance

Every major compliance framework requires database-level access controls. The specific requirements overlap more than they differ:

| Framework | Access control requirement | Audit trail required? |
|-----------|---------------------------|----------------------|
| SOC 2 (CC6.1, CC6.3) | Least privilege, regular access reviews | Yes |
| [HIPAA](/blog/hipaa-data-security-and-retention-requirements/) (§164.312) | Unique user IDs, emergency access procedures | Yes |
| [GDPR](/blog/database-compliance-for-gdpr/) | Access limited to purpose of processing | Yes |
| PCI DSS (Req 7, 8) | Role-based access, no shared accounts | Yes |
| [SOX](/blog/database-change-management-sox-compliance/) | Separation of duties, change audit trails | Yes |
| ISO 27001 (A.9) | Formal access provisioning and de-provisioning | Yes |

The pattern is clear: restrict access to the minimum necessary, track every action, and review permissions regularly. Failing an audit because of overly broad database permissions is one of the most common compliance findings.

## Core principles

### Least privilege

Every user and application should have the minimum permissions required to do their job. A developer who needs to run `SELECT` queries against a staging database does not need `DROP` or `ALTER` privileges on production.

In practice, least privilege means:

- Application accounts get only `SELECT`, `INSERT`, `UPDATE`, `DELETE` on the tables they use
- Schema migration accounts are separate from application accounts
- Read-only replicas use credentials that cannot write
- Admin access is reserved for DBAs and granted per-session, not permanently

### Separation of duties

The person who writes a database change should not be the same person who approves and deploys it. This prevents both accidental mistakes and intentional abuse.

A typical separation looks like:

- **Developer** writes the migration SQL
- **DBA or tech lead** reviews the SQL for correctness and safety
- **Automated pipeline or separate role** executes the approved change
- **[Audit log](/blog/database-audit-logging/)** records who did what at each step

### Just-in-time access

Permanent standing access is the default in most organizations, and it is the wrong default. A developer who accessed the production database for a debugging session six months ago probably still has those credentials. If those credentials leak, the blast radius is the entire production dataset.

Just-in-time (JIT) access replaces permanent credentials with temporary, scoped grants:

1. User requests access to a specific database for a stated reason
2. An approver reviews and approves the request
3. The system grants access with a time limit (e.g., 2 hours)
4. Access is automatically revoked when the window closes

JIT access reduces standing privileges to near zero. Auditors prefer it because every access event has a documented reason and approval chain.

### Role-based access control (RBAC)

Managing permissions per user does not scale. RBAC groups permissions into roles and assigns roles to users. When someone joins a team, they inherit the team's role. When they leave, revoking the role removes all associated permissions in one step.

Common database roles:

| Role | Typical permissions |
|------|-------------------|
| `app_readonly` | `SELECT` on application tables |
| `app_readwrite` | `SELECT`, `INSERT`, `UPDATE`, `DELETE` on application tables |
| `schema_migrator` | `CREATE`, `ALTER`, `DROP` on schema objects |
| `dba_admin` | Full privileges, granted via JIT only |
| `analyst` | `SELECT` on reporting views and materialized views |

## How each database engine handles access control

Every major database has RBAC built in, but the syntax and defaults vary.

### PostgreSQL

PostgreSQL uses **roles** as both users and groups. A role can own objects, log in, and be a member of other roles.

```sql
-- Create a read-only role
CREATE ROLE app_readonly NOLOGIN;
GRANT CONNECT ON DATABASE myapp TO app_readonly;
GRANT USAGE ON SCHEMA public TO app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
-- Ensure future tables created by the migration role are also readable
ALTER DEFAULT PRIVILEGES FOR ROLE migrator IN SCHEMA public
  GRANT SELECT ON TABLES TO app_readonly;

-- Create a user that inherits the role
CREATE ROLE analyst LOGIN PASSWORD 'strong_password';
GRANT app_readonly TO analyst;
```

PostgreSQL's default is deny-all: a new role has no permissions on objects it does not own. The `ALTER DEFAULT PRIVILEGES` command is easy to forget but is needed to cover tables created in the future. Note that it only applies to objects created by the role that executes the statement. If a separate role (e.g., a migration role) creates tables, you must specify `FOR ROLE <owner>` or run the command as that role.

### MySQL

MySQL separates users (`CREATE USER`) from privileges (`GRANT`). There is no built-in role grouping in MySQL 5.7, but MySQL 8.0+ supports roles.

```sql
-- MySQL 8.0+ roles
CREATE ROLE 'app_readonly';
GRANT SELECT ON myapp.* TO 'app_readonly';

CREATE USER 'analyst'@'10.0.%' IDENTIFIED BY 'strong_password';
GRANT 'app_readonly' TO 'analyst'@'10.0.%';
SET DEFAULT ROLE 'app_readonly' TO 'analyst'@'10.0.%';
```

MySQL ties users to hostnames (`'user'@'host'`), which means the same person connecting from different networks can have different permissions. This is both a security feature and a source of confusion.

### SQL Server

SQL Server uses **logins** (server-level) and **users** (database-level), mapped together. It has built-in fixed server roles (`sysadmin`, `securityadmin`) and database roles (`db_datareader`, `db_datawriter`), plus support for custom roles.

```sql
-- Create a database role with read-only access
CREATE ROLE app_readonly;
GRANT SELECT ON SCHEMA::dbo TO app_readonly;

-- Create a login and map it to a database user
CREATE LOGIN analyst WITH PASSWORD = 'strong_password';
CREATE USER analyst FOR LOGIN analyst;
ALTER ROLE app_readonly ADD MEMBER analyst;
```

SQL Server's `DENY` takes precedence over `GRANT`, which allows for precise permission exclusions.

### Oracle

Oracle uses **profiles** and **roles** with fine-grained privileges. Oracle supports row-level security (Virtual Private Database) and data redaction natively.

```sql
-- Create a role
CREATE ROLE app_readonly;
GRANT SELECT ON schema.orders TO app_readonly;
GRANT SELECT ON schema.customers TO app_readonly;

-- Assign to a user
GRANT app_readonly TO analyst;
```

Oracle's `GRANT` syntax is similar to PostgreSQL, but Oracle also supports `GRANT ANY` privileges that operate across all schemas. These `ANY` privileges are powerful and should be avoided for non-DBA accounts.

## Common mistakes

**1. Shared service accounts.** Multiple developers sharing `admin@production` makes every query untraceable. When an auditor asks who ran a destructive query, the answer is "anyone on the team." Use individual accounts and map every connection to a real person.

**2. Copy-pasting permissions from another user.** When a new hire joins, the fastest path is to clone an existing user's grants. The problem is that the existing user has accumulated permissions over months. The new hire inherits permissions they do not need and the privilege creep compounds.

**3. Never revoking access.** People change teams, leave the company, or stop using certain databases. Without a regular access review cycle (monthly or quarterly), stale accounts accumulate. Automate de-provisioning through your identity provider where possible.

**4. Granting `ALL PRIVILEGES` because it is faster.** `GRANT ALL PRIVILEGES ON *.* TO 'app'@'%'` takes five seconds to type and months to clean up. Start with the minimum and add permissions as specific needs arise.

**5. No separation between application and human access.** Application service accounts and human developer accounts should be different. Applications need predictable, narrow permissions. Humans need broader permissions but only temporarily and with an audit trail.

**6. Ignoring schema-level isolation.** Databases that support schemas (PostgreSQL, SQL Server) give you a natural boundary for access control. Instead of granting access to individual tables, grant at the schema level and organize tables by access pattern.

## How Bytebase handles database access control

[Bytebase](https://www.bytebase.com) centralizes database access control across PostgreSQL, MySQL, SQL Server, Oracle, and other engines in a single interface. Instead of managing `GRANT` and `REVOKE` statements across multiple database clusters individually, teams manage permissions through Bytebase's two-level IAM system.

Key capabilities:

- **Two-level RBAC.** Bytebase has workspace-level roles (Admin, DBA, Member) and project-level roles (Owner, Developer, Releaser, SQL Editor User, Viewer). Each role maps to 100+ granular permissions. Organizations can also create custom roles with specific permission sets.
- **Conditional access with CEL expressions.** IAM bindings support [CEL](https://github.com/google/cel-spec) conditions, so you can scope access by database name, schema, or time window. For example, a binding can grant a developer query access to specific databases that expires on a set date.
- **Grant requests with expiration.** When a developer needs temporary access, they submit a grant request specifying the database, the role, and a duration. Once approved, the access expires automatically. This is the closest equivalent to just-in-time access.
- **Approval workflows.** Schema changes and data exports go through configurable approval chains with CEL-based matching rules. Approvers are resolved by role, so the request is automatically routed to the right DBA or project owner.
- **Dynamic data masking.** Masking rules use CEL conditions to match columns by environment, project, instance, database, table, column, or classification level. Masking exemption policies let specific users or groups bypass masking when needed, also with CEL conditions (including time-based expiration).
- **Query data policies.** Workspace and project-level policies control SQL Editor behavior: maximum result rows, whether data export is allowed, and whether copy-paste is enabled.
- **Audit logging.** Every query, schema change, and permission change is recorded with the real user identity, request metadata, and RPC latency. Logs are searchable with CEL filters and exportable. This [audit trail](/blog/database-audit-logging/) is what auditors need for SOC 2, HIPAA, and ISO 27001.
- **Groups and service accounts.** Users can be organized into groups and assigned roles as a group. Service accounts and workload identities (for CI/CD pipelines using OIDC) are first-class citizens in IAM bindings.

## FAQ

### What is the difference between authentication and authorization in databases?

Authentication verifies identity (who are you?). Authorization determines permissions (what can you do?). A database user must pass authentication first (usually with a password, certificate, or SSO token), then the database checks their authorization (granted roles and privileges) before allowing any operation.

### How often should database access be reviewed?

Quarterly reviews are the minimum for compliance. Monthly reviews are better for organizations with frequent team changes. Automated tools that flag unused accounts or permissions that haven't been exercised in 90 days reduce the manual work.

### Is row-level security considered access control?

Yes. Row-level security (RLS) restricts which rows a user can see within a table. PostgreSQL, SQL Server, and Oracle all support RLS natively. It is a form of authorization that operates at a finer grain than table-level `GRANT` and `REVOKE`.

### How does just-in-time access differ from VPN-based access control?

VPN controls which network can reach the database. JIT controls which person can access the database and for how long. They operate at different layers: a VPN alone does not satisfy least privilege because everyone on the VPN has the same network access. JIT adds identity-based, time-limited, and auditable access on top of network controls.
