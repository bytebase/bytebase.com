---
title: Postgres Audit Log Guide
author: Adela
updated_at: 2025/11/10 18:00:00
feature_image: /content/blog/postgres-audit-log/cover.webp
tags: Explanation
description: A guide to audit logging in Postgres.
---

Audit logging is a cornerstone of database security and compliance. Whether you’re tracking who changed what, investigating anomalies, or preparing for an audit, PostgreSQL gives you several ways to record activity at different levels of detail.

In this guide, we’ll walk through the most practical approaches — from PostgreSQL’s built-in logging to advanced tools like pgAudit and Bytebase — to help you choose the right setup for your organization.

## 1. Native PostgreSQL Logging

[PostgreSQL logging documentation](https://www.postgresql.org/docs/current/runtime-config-logging.html)

PostgreSQL comes with a robust logging subsystem out of the box. It’s often the first step in building an audit trail.

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

➡️ *Takeaway:* Native logging is the minimum audit layer every PostgreSQL instance should have enabled.

## 2. Trigger-Based Auditing

[PostgreSQL Triggered Change Notification (tcn) documentation](https://www.postgresql.org/docs/current/tcn.html)

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

For real-time change notifications, PostgreSQL offers the `tcn` module (Triggered Change Notification), which can be used to send `NOTIFY` events to listening clients when data changes.

➡️ *Takeaway:* Trigger-based auditing gives detailed change tracking for sensitive tables — best used selectively.

## 3. pgAudit Extension

[Visit the pgAudit GitHub repository](https://github.com/pgaudit/pgaudit)

For structured, compliance-grade audit logs, PostgreSQL’s **pgAudit** extension is the standard choice.
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

```
AUDIT: SESSION,1,READ,SELECT,,,,"SELECT * FROM customers WHERE id=42;",<none>
```

**Benefits**

- Records who executed which statement, in which session.
- Captures both DDL and DML activity.
- Integrates with PostgreSQL’s standard log collector — no new storage model.

**Considerations**

- Logs can be verbose — use `pgaudit.log_parameter = off` to reduce noise.
- Requires proper log rotation and analysis strategy.

➡️ *Takeaway:* pgAudit is the go-to choice for organizations that need **detailed, compliant** audit trails.

## 4. Bytebase

[See the Bytebase audit log documentation](https://docs.bytebase.com/security/audit-log)

Bytebase is a Database DevSecOps platform that provides a **centralized audit trail protected from unauthorized modification** across your PostgreSQL environments.
It records *who did what, when, and why* — linking SQL actions to their **context** (issues, approvals, and deployments) while keeping sensitive data secure.

**What Bytebase Audits**

- **Query access:** logs *who queried which data* and *when* across SQL Editor, Admin Query, and Data Export.
  Thanks to **dynamic data masking**, Bytebase only stores the **executed SQL statements** and metadata — **never the actual query results**.
- **Schema and data changes:** tracks *who made which changes*, *when they were approved*, and *through which workflow or Git commit*.
- **Governance controls:** built-in SQL review rules, approval flow, and role-based access help prevent unauthorized actions.

**Why It Matters**

- **Complete visibility** across read and write operations.
- **Privacy-safe auditing** with no sensitive data exposure.
- **Compliance-ready** logs aligned with SOC 2, ISO 27001, and GDPR.

➡️ *Takeaway:* Unlike pgAudit, which records statements at the database level, Bytebase captures **who accessed or changed data, under which approval, without exposing sensitive information** — a privacy-first audit trail for modern teams.

## Best Practices

Audit logging can generate large volumes of data, so design it carefully.

- **Centralize and retain logs:** forward to ELK, Datadog, or S3.
- **Avoid sensitive data:** mask or omit personal identifiers.
- **Rotate regularly:** control log size and prevent disk exhaustion.
- **Test impact:** measure overhead before enabling full-statement logging.
- **Layer approaches:** combine pgAudit (low-level) with Bytebase (change workflow) for complete visibility.

## Conclusion

PostgreSQL offers multiple layers of auditing — from basic text logs to complete governance solutions.

- Use **native logging** for baseline activity tracking.

- Use **pgAudit** for structured, compliance-grade statement logging.

- Add **Bytebase** for centralized auditing that records who accessed or changed data, when, and why — all while protecting sensitive information.

- Optionally, use **triggers** for fine-grained row-level auditing on critical tables.

By combining these layers, you gain both the visibility and control needed for secure, compliant, and well-governed database operations.