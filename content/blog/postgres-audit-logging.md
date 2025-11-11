---
title: Postgres Audit Logging Guide
author: Adela
updated_at: 2025/11/10 18:00:00
feature_image: /content/blog/postgres-audit-logging/cover.webp
tags: Explanation
description: A guide to audit logging in Postgres.
---

Audit logging is a cornerstone of database security and compliance. Whether you’re tracking who changed what, investigating anomalies, or preparing for an audit, PostgreSQL gives you several ways to record activity at different levels of detail.

In this guide, we’ll walk through the most practical approaches — from PostgreSQL’s built-in logging to advanced tools like pgAudit and Bytebase — to help you choose the right setup for your organization.

## 1. Native PostgreSQL Logging

PostgreSQL comes with a [logging subsystem](https://www.postgresql.org/docs/current/runtime-config-logging.html) out of the box. It’s often the first step in building an audit trail.

**Key settings**

You can enable and configure logging in your `postgresql.conf` file:

```ini
logging_collector = on
log_statement = 'all'          # Options: none, ddl, mod, all
log_line_prefix = '%m [%p] %u@%d '   # Timestamp, process ID, user, database
log_duration = on
log_destination = 'csvlog'
```

This setup tells PostgreSQL to collect all executed SQL statements, include who ran them and when, and record query durations.

**Pros**

- Simple to enable, built-in, no extension needed.
- Useful for performance analysis and basic audit visibility.

**Cons**

- Unstructured text logs — difficult to parse automatically.
- Can grow large quickly.
- May include sensitive query parameters.

You can use tools like [pgBadger](https://github.com/darold/pgbadger) to analyze these logs and generate visual reports of who executed what queries and when.

## 2. Trigger-Based Auditing

If you need to record **row-level changes** — for example, before and after values on UPDATE — you can use triggers.

**Example**

Create a table to store change history:

```sql
CREATE TABLE audit_log (
  id serial PRIMARY KEY,
  table_name text,
  action text,
  changed_by text,
  changed_at timestamptz DEFAULT now(),
  old_data jsonb,
  new_data jsonb
);
```

Then define a trigger:

```sql
CREATE OR REPLACE FUNCTION audit_trigger() RETURNS trigger AS $$
BEGIN
  INSERT INTO audit_log (table_name, action, changed_by, old_data, new_data)
  VALUES (TG_TABLE_NAME, TG_OP, current_user, row_to_json(OLD), row_to_json(NEW));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_user_table
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

This captures all DML operations (`INSERT`, `UPDATE`, `DELETE`) on the `users` table, recording what changed and by whom.

**Pros**

- Captures before/after data.
- Fully customizable schema.

**Cons**

- Must be defined per table.
- Can impact performance on write-heavy workloads.

For real-time change notifications, PostgreSQL offers the [tcn](https://www.postgresql.org/docs/current/tcn.html) module (Triggered Change Notification), which can be used to send `NOTIFY` events to listening clients when data changes.

## 3. Logical Replication Based Auditing

PostgreSQL's [logical replication](https://www.postgresql.org/docs/current/logical-replication.html) decodes changes from the Write-Ahead Log (WAL) and streams them in a structured format. This allows you to capture all data changes without adding triggers or modifying application code.

**How It Works**

Logical replication uses _replication slots_ and _output plugins_ (like `wal2json` or `pgoutput`) to convert WAL entries into JSON or other formats. Tools like [Debezium](https://debezium.io/) can then consume these changes and forward them to audit storage systems like Kafka, Elasticsearch, or S3.

**Example Setup**

Enable logical replication in `postgresql.conf`:

```ini
wal_level = logical
max_replication_slots = 4
max_wal_senders = 4
```

Create a replication slot:

```sql
SELECT * FROM pg_create_logical_replication_slot('audit_slot', 'wal2json');
```

Read changes:

```sql
SELECT * FROM pg_logical_slot_get_changes('audit_slot', NULL, NULL);
```

You'll receive JSON output like:

```json
{
  "change": [
    {
      "kind": "update",
      "schema": "public",
      "table": "users",
      "columnnames": ["id", "email", "updated_at"],
      "columnvalues": [42, "user@example.com", "2025-11-10 10:30:00"],
      "oldkeys": { "keynames": ["id"], "keyvalues": [42] }
    }
  ]
}
```

**Pros**

- Captures all data changes automatically, no per-table setup.
- Minimal performance impact — reads from existing WAL infrastructure.
- Works with existing tools like Debezium for streaming to external systems.
- No application code changes required.

**Cons**

- Does not capture `SELECT` queries (only data modifications).
- WAL retention can increase storage if replication slot falls behind.

This approach is ideal when you need **near-real-time change data capture (CDC)** for auditing, analytics, or event-driven architectures.

## 4. pgAudit Extension

For structured, compliance-grade audit logs, PostgreSQL’s [pgAudit](https://github.com/pgaudit/pgaudit) extension is the standard choice.
It extends native logging to provide more context and granularity, especially around read/write operations.

**Installation**

Enable the extension:

```sql
CREATE EXTENSION pgaudit;
```

Update configuration:

```ini
shared_preload_libraries = 'pgaudit'
pgaudit.log = 'READ, WRITE'
pgaudit.log_catalog = off
```

After restarting PostgreSQL, you’ll start seeing audit logs like:

```plain
AUDIT: SESSION,1,READ,SELECT,,,,"SELECT * FROM customers WHERE id=42;",<none>
```

**Benefits**

- Records who executed which statement, in which session.
- Captures both DDL and DML activity.
- Integrates with PostgreSQL’s standard log collector — no new storage model.

**Considerations**

- Logs can be verbose — use `pgaudit.log_parameter = off` to reduce noise.
- Requires proper log rotation and analysis strategy.

## 5. Bytebase

Bytebase is a Database DevSecOps platform that provides a [centralized audit trail](https://docs.bytebase.com/security/audit-log) across your PostgreSQL environments.
It records _who did what, when, and why_ — linking SQL actions to their context (issues, approvals, and deployments) while keeping sensitive data secure.

**What Bytebase Audits**

- **Query access:** logs _who queried which data_ and _when_ across SQL Editor, Admin Query, and Data Export.
- **Schema and data changes:** tracks _who made which changes_, _when they were approved_, and _through which workflow or Git commit_.
- **Governance controls:** built-in SQL review rules, approval flow, and role-based access help prevent unauthorized actions.
- **Actual end users, not just database users:** A critical advantage is that Bytebase solves the **shared database user problem**. In most applications, all queries use the same database connection user (like `app_user`), making it impossible to trace actions back to individual users using traditional database auditing. Since users operate through Bytebase, every action is attributed to the actual end user, not just a generic database account.

**Why It Matters**

- **Complete visibility** across read and write operations.
- **Privacy-safe auditing** with no sensitive data exposure.
- **Compliance-ready** logs aligned with SOC 2, ISO 27001, and GDPR.

You can also call the [API](https://docs.bytebase.com/integrations/api/audit-log) to send the audit logs to a centralized log sink.

## Conclusion

PostgreSQL offers multiple layers of auditing — from basic text logs to complete governance solutions.

**Comparison Table**

| Approach | Performance Impact | Captures SELECTs | Captures Actor | Row-Level Detail | Best For |
|----------|-------------------|------------------|----------------|------------------|----------|
| **Native Logging** | Low-Medium | ✅ | ⚠️ DB user only | ❌ | Development, debugging, basic audit trails |
| **Triggers** | Medium-High | ❌ | ⚠️ DB user only | ✅ (before/after) | Critical tables needing full change history |
| **Logical Replication** | Low | ❌ | ❌ | ✅ | Real-time CDC, event-driven systems, analytics |
| **pgAudit** | Medium | ✅ | ⚠️ DB user only | ❌ | Compliance requirements, structured logging |
| **Bytebase** | N/A (app-level) | ✅ | ✅ End user | ✅ | Centralized governance, approval workflows, team collaboration |

- Use **native logging** for baseline activity tracking (captures database user only).

- Use **triggers** for fine-grained row-level auditing on critical tables (captures database user only).

- Use **logical replication** for near-real-time change data capture without application changes.

- Use **pgAudit** for structured, compliance-grade statement logging (captures database user only).

- Add **Bytebase** for centralized auditing that tracks actual end users (not just database users), linking every action to the person who performed it with full context of approvals and workflows.

By combining these layers, you gain both the visibility and control needed for secure, compliant, and well-governed database operations.
