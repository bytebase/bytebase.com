---
title: 'From Schema as Code to Schema as Context'
author: Tianzhou
updated_at: 2026/03/03 18:00
feature_image: /content/blog/schema-as-code-to-schema-as-context/banner.svg
tags: Explanation
featured: true
description: 'How codifying the full database development lifecycle — not just DDL — empowers LLMs and AI Agents.'
---

For over two decades, the industry has been convincing teams to treat database schemas like application code: version it, review it, deploy it through a pipeline. But a new consumer has arrived — one that doesn't read pull requests the way your DBA does.

LLMs and AI agents are increasingly the ones [generating SQL](https://spider2-sql.github.io/), proposing migrations, and executing data changes. For these actors, a versioned migration file is nowhere near enough. They need **context**.

## Schema as Code: a Necessary First Step

The [Database-as-Code](https://martinfowler.com/articles/evodb.html) movement (setting aside the migration-based vs. state-based debate for now) brought real discipline to schema management. Tools like Liquibase and Flyway gave teams version-controlled migrations applied through CI/CD pipelines and a single source of truth — just like Infrastructure as Code. Bytebase extended this with review workflows, access control, and governance.

But a `CREATE TABLE` statement tells you the shape of the data. It tells you nothing about:

- **Who** is allowed to see or modify that data
- **Which columns** contain PII, financial records, or health information
- **What masking rules** apply when different roles query it
- **What approval process** a change must go through before it reaches production

For a human developer, this knowledge lives in tribal memory and Slack threads. For an AI agent, if it's not codified, it doesn't exist.

## Why Agents Need More than DDL

When you point a text-to-SQL agent at a production database, the typical setup feeds it a schema dump — table names, column types, maybe some comments — and asks it to generate queries.

This works for demos. It falls apart in production.

The agent doesn't know that `hr.employees.salary` is Confidential and should be masked. It doesn't know that `customer.ssn` requires a compliance-mandated masking algorithm. It has no idea that querying `payments` requires just-in-time access approval that expires in one hour.

The real risk isn't that the agent writes a bad query. It's that the agent writes a **correct** query that should never have been executed.

## Schema as Context: What Surrounds the Schema

The schema — tables, columns, indexes, constraints — is the structural skeleton. Context is everything that gives it meaning and safety:

- **Data Classification.** Every column tagged with its sensitivity level — public, internal, confidential, or restricted — as structured, machine-readable metadata that drives downstream policies.

- **Dynamic Data Masking.** Full masking, partial masking, or custom algorithms applied at query time based on who — or what — is asking. This is the enforcement boundary that prevents sensitive data from leaking into an LLM's context window.

- **Access Control.** Fine-grained, role-based access beyond database-native GRANTs. Project-level scoping, environment-level restrictions, and just-in-time access with automatic expiration.

- **SQL Review Policies.** 200+ lint rules — anti-pattern detection, naming conventions, performance guardrails — that serve as the automated reviewer when an agent generates or proposes SQL.

- **Change Workflows.** The process itself, codified: which changes require DBA approval, which environments need staged rollout, and what the rollback plan is. These workflows prevent autonomous systems from making irreversible mistakes.

Audit trails — every query, every change, every access request — are not something you codify. They are generated at runtime as a byproduct of enforcing the policies above, giving you accountability over what your agents actually did.

## Codifying Context: Terraform, API, and Your Own Format

![schema-as-context](/content/blog/schema-as-code-to-schema-as-context/banner.svg)

You can't hand an LLM a PDF of your security policies and expect it to comply. You need machine-readable, version-controlled policy definitions enforced programmatically.

Bytebase manages all the context layers above and exposes them through its [Terraform Provider](https://docs.bytebase.com/integrations/terraform/overview) and [API](https://docs.bytebase.com/integrations/api/overview) — so the same CI/CD pipeline that provisions a database also provisions who can access it, what masking rules apply, and what review process governs changes. For teams that want to go further, the API lets you build your own context layer in whatever format your agents consume best — pull classification taxonomies as JSON, export masking policies as structured data, or serialize the whole thing as YAML, TOML, or Markdown.

When everything is codified, policies are either enforced at the platform level (masking at query time, access denied before the query runs) or available as structured metadata the agent reasons about before it acts.

Schema as Code got us version control. Schema as Context gets us AI-readiness.

## References

- [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html) - Martin Fowler and Pramod Sadalage's foundational article on treating database changes as evolutionary, version-controlled migrations.
- [Spider 2.0](https://spider2-sql.github.io/) - A benchmark for evaluating LLMs on enterprise-level text-to-SQL tasks across real-world databases.
