---
title: 'Database Audit Logging Best Practices for Compliance'
author: Adela
updated_at: 2026/04/02 09:00:00
feature_image: /content/blog/database-audit-logging/banner.webp
tags: Explanation
description: 'How to set up database audit logging for SOC 2, HIPAA, and ISO 27001 compliance across PostgreSQL, MySQL, SQL Server, and Oracle.'
---

Database audit logging records every query, schema change, and login attempt in your database so you can answer the question: **who did what, when, and from where**. It is a requirement for [SOC 2](/blog/soc2-data-security-and-retention-requirements/), ISO 27001, [GDPR](/blog/database-compliance-for-gdpr/), [HIPAA](/blog/hipaa-data-security-and-retention-requirements/), and PCI DSS compliance.

Building a consistent audit trail across PostgreSQL, MySQL, SQL Server, and Oracle is still hard because each engine handles auditing differently. This guide covers what to log, how each engine works, common mistakes, and how to get a unified audit trail.

## Why Audit Logging Matters

Audit logging provides the answers to the most critical operational and security questions:

- **Who** accessed the data?
- **What** did they query or modify?
- **When** did it occur?
- **From where** did the access originate?

This information is essential for:

- Detecting unauthorized access
- Investigating security incidents
- Meeting compliance requirements
- Understanding schema and data evolution
- Establishing accountability across engineering teams

Without reliable audit logs, organizations lack visibility at the exact moment it matters most.

## The Real-World Pain Today (Across All Major Databases)

All major relational databases (MySQL, PostgreSQL, SQL Server, Oracle, and cloud-managed variants like AWS RDS, Google Cloud SQL, and Azure Database) provide audit capabilities. However, *how* they provide these capabilities varies dramatically, and implementing them correctly requires deep expertise.

Here are common issues teams encounter:

### MySQL (Community Edition) — Example

MySQL CE’s general and slow logs are **all-or-nothing and extremely noisy**.
Selective auditing (especially for non-root users) requires additional plugins that introduce configuration complexity and variability across environments.

### PostgreSQL — Example

PostgreSQL relies on extensions such as `pgaudit` for structured auditing.
While powerful, these extensions require **careful tuning** to avoid overwhelming log volume while still capturing all critical operations, including SELECTs.

### SQL Server

SQL Server has built-in [SQL Server Audit](https://learn.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-database-engine) that writes to Windows Event Log or file targets. It supports fine-grained audit specifications at both server and database level. The main difficulty is managing audit file rotation and shipping logs to a central system, since SQL Server Audit writes binary files that need parsing.

### Oracle

Oracle provides [Unified Auditing](https://docs.oracle.com/en/database/oracle/oracle-database/19/dbseg/introduction-to-auditing.html) (available since 12c), which consolidates all audit records into a single `UNIFIED_AUDIT_TRAIL` view. It replaces the older `AUDIT` command. Oracle's auditing is the most granular of any major engine, but the volume of audit data in high-throughput systems requires careful management of the `AUDSYS` tablespace.

### Cloud databases (AWS RDS, Google Cloud SQL, Azure Database)

Cloud platforms wrap underlying engine audit logs into provider-specific formats.
Teams often struggle with:

- inconsistent event types
- missing or partial SQL text
- difficulty correlating logs across mixed engines or environments

**In short:**

> Audit information exists everywhere, but it’s fragmented, inconsistent, and often incomplete.

## What a Good Audit Log Should Capture

A reliable audit log must capture **every database action**, not just modifications.
In modern security models, **access is just as important as change, and often more so**.

### A robust audit log includes:

- **Real human identity**
  No shared admin or application accounts. Every query must map to an actual person.

- **Full query text**, including:

  - **DDL** (all schema changes)
  - **DML** (INSERT, UPDATE, DELETE)
  - **SELECT** (all read operations, because viewing sensitive data is a high-risk event)

- **Authentication events**
  Both successful logins and failed login attempts.

- **Permission changes**
  The audit log must record any permissions granted or revoked for specific users.

- **Execution outcome**
  Whether the operation succeeded, failed, or was rejected.

- **Optional contextual metadata**
  Such as ticket/issue ID, environment, deployment reference, or any policy configurations or changes.

A complete record of SELECT queries ensures you always know *exactly who viewed what data*, which is a mandatory capability under many security and privacy frameworks.

## Approaches to Audit Logging

Teams typically rely on one or more of the following auditing methods:

### 1. Engine-native auditing

Each database engine includes its own audit features.

**Pros:**

- High fidelity
- Deeply integrated with database internals

**Cons:**

- Different for every engine
- Easily becomes noisy without tuning
- Harder to unify across environments

### 2. Cloud provider audit logs

Cloud platforms provide audit streams for their managed databases.

**Pros:**

- Easy to enable
- Centralized in cloud logging services
- Integrated with monitoring tools

**Cons:**

- Inconsistent formats and event coverage
- SQL text may be missing
- Hard to correlate across multi-cloud or multi-engine stacks

### 3. Proxy / workflow-based auditing

SQL is routed through a centralized gateway or workflow before executing.

**Pros:**

- Unified audit trail across all engines
- Automatically tied to real human identity
- Can embed metadata (ticket ID, environment)
- Ensures DDL, DML, *and SELECT* are always captured

**Cons:**

- Requires routing SQL through a central component

*For example:*
A workflow platform like **Bytebase** produces complete, contextual audit logs because all SQL flows through a single, identity-aware pipeline.

## How Bytebase Handles Audit Logging

[Bytebase](https://docs.bytebase.com/security/audit-log/) takes the proxy/workflow approach: SQL executed through Bytebase's SQL Editor or change workflows — DDL, DML, and SELECT — is logged before reaching the database. Because Bytebase manages user identity, every audit record is tied to a real person, not a shared `admin` account. Direct database connections that bypass Bytebase are not captured in these logs.

### What gets logged

Bytebase records:

- **SQL execution** — every query that flows through the system, including the full SQL text, target database, and execution result
- **Schema changes** — issue creation, approval decisions, rollout status
- **Data access** — data queries and exports, with the requesting user's identity
- **Authentication** — login, logout, SSO token exchange
- **Permission changes** — role grants, project membership updates, policy modifications
- **System configuration** — instance connection changes, environment settings, workspace policies

Each entry includes the user's email, IP address, timestamp, operation duration, affected resource, and request/response payloads. Sensitive fields (passwords, certificates, SSH keys) are automatically redacted.

### Export and integration

Three ways to get audit data out:

1. **GUI** — filter by user, action type, resource, and date range in Settings → Audit Log
2. **API** — query `/v1/auditLogs:search` (workspace-level) or `/v1/projects/{project}/auditLogs:search` (project-level). Returns structured JSON ready for any SIEM. See the [API audit log tutorial](https://docs.bytebase.com/tutorials/api-audit-log) for examples.
3. **Log streaming** — enable audit log export to stdout in Settings → General → Audit Log Export. Add the `--enable-json-logging` flag to output structured JSON, which a Datadog/Splunk/Grafana agent can ingest directly

### Availability

Audit logging is available on [Pro and Enterprise plans](https://www.bytebase.com/pricing/). The Pro plan covers most audit needs; Enterprise adds custom approval workflows and advanced access control that generate additional audit events.

## Recommended Best Practices

Regardless of database engine or auditing method, strong audit practices share the same foundations:

- **Use individual identities.** Never share DB accounts.
- **Record all DDL, DML, and SELECT.** Access visibility is non-negotiable.
- **Store logs off-host.** This prevents tampering or accidental deletion.
- **Apply retention policies** (90, 180, or 365+ days depending on framework).
- **Integrate logs into a SIEM** for alerting and correlation (Datadog, Splunk, CloudWatch, Grafana).
- **Treat default engine settings cautiously.** They often require substantial tuning.

A minimal-noise, high-fidelity audit log is better than a noisy one that nobody can use.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|----------------|-----|
| Logging everything at max verbosity | Log volume explodes, storage costs spike, nobody reads the logs | Start with DDL + DML + failed logins, add SELECTs only for sensitive tables |
| Shared database accounts | Audit log says "admin" did it, but you have 15 people using that account | Map every query to an individual user identity |
| Storing logs on the same host | An attacker or accidental `DROP DATABASE` also wipes the audit trail | Ship logs to a separate system (SIEM, S3, or centralized logging) |
| No retention policy | Logs either fill the disk or get rotated away before the next audit | Set explicit retention (SOC 2 typically requires 90-365 days) |
| Ignoring SELECT queries | You can prove data was changed but not that it was *read* | Audit SELECTs on tables containing PII, credentials, or financial data |

## FAQ

**What is database audit logging?**

Database audit logging is the process of recording all database activity, including queries, schema changes, logins, and permission changes, into a tamper-resistant log. It answers who accessed what data, when, and from where.

**Which compliance frameworks require database audit logging?**

SOC 2, ISO 27001, HIPAA, PCI DSS, and GDPR all require some form of database audit trail. SOC 2 and ISO 27001 are the most explicit about logging requirements. See [SOC 2 data security requirements](/blog/soc2-data-security-and-retention-requirements/) and [HIPAA database requirements](/blog/hipaa-data-security-and-retention-requirements/) for specifics.

**How do I export database audit logs to Datadog or Splunk?**

Most engines write audit logs to files or system tables. For PostgreSQL, configure `pgaudit` to write to `csvlog` and use a Datadog or Splunk agent to ingest the files. For MySQL, enable the audit plugin and point the log file at your SIEM collector. For SQL Server, parse the `.sqlaudit` files with `fn_get_audit_file()` and forward via a log shipper. Bytebase provides a built-in [audit log API](https://docs.bytebase.com/security/audit-log/) that exports structured JSON, ready for any SIEM.

**How does Bytebase handle database audit logging?**

All SQL executed through Bytebase — via the SQL Editor or change workflows — is automatically logged with the real user's identity, full SQL text, target database, timestamp, and execution result. Direct database connections that bypass Bytebase are not captured. Logs can be queried via the GUI, exported via API (`/v1/auditLogs:search`), or streamed as JSON to any SIEM. Available on Pro and Enterprise plans.

**Do I still need engine-native auditing if I use Bytebase?**

It depends on your compliance scope. Bytebase captures all SQL that flows through its gateway — schema changes, data queries, exports, and admin actions. If you also have direct database connections that bypass Bytebase (e.g., emergency SSH access or application service accounts), you should keep engine-native auditing enabled for those paths. Many teams use Bytebase as the primary audit trail and engine-native logs as a secondary safety net.
