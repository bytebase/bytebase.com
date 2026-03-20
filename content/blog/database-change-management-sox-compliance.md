---
title: 'Database Change Management for SOX Compliance'
author: Adela
updated_at: 2026/03/20 09:00
feature_image: /content/blog/database-change-management-sox-compliance/banner.webp
tags: Industry
featured: true
description: 'SOX Section 404 requires IT general controls over database changes. Learn the ITGC domains, five audit questions teams fail, and how to build SOX-ready controls'
---

Eighteen months before a fintech files its S-1, a partner from a Big Four accounting firm walks into a conference room and asks one question:

_"Show me every database change made to your financial reporting systems in the last 12 months. Who approved each one, and why."_

Most engineering teams **cannot answer this**. They have git history for application code. But database changes — the DML statements that modify transaction records, the DDL that restructures tables holding financial data — might have a Jira ticket somewhere, but nobody can tell you whether the SQL was actually executed, by whom, or whether the final statement matched what was approved.

This is where database change management meets SOX compliance. And the gap costs companies **6 to 12 months of IPO delay** when auditors find it.

## What SOX actually requires for database changes

The Sarbanes-Oxley Act (SOX) is a US federal law passed in 2002 after the Enron and WorldCom accounting scandals. It requires every publicly traded company to maintain internal controls over financial reporting and have those controls audited annually. Any company filing for a US IPO must have SOX controls in place before submitting its S-1.

Section 404 is the part that hits engineering teams. If your databases touch financial data, they are in scope. The assessment maps to four [IT General Control (ITGC)](https://pathlock.com/learn/itgc-sox-the-basics-and-6-critical-best-practices/) domains:

| ITGC domain | What auditors check |
|---|---|
| **Change management** | Every DDL/DML change authorized before execution. The person who writes the SQL cannot be the same person who approves it. |
| **Access controls** | No shared `root` or `admin` accounts. Role-based access tied to an identity provider. Quarterly access reviews documented. |
| **[Audit trail](/blog/database-audit-logging/)** | Full history: the actual SQL statement, who requested it, who approved it, the business justification, and the timestamp. |
| **Program development** | Changes flow through dev, staging, production with testing evidence at each stage. No direct-to-prod SQL. |

One detail that catches companies off guard: auditors typically want 12 to 18 months of continuous evidence. If you deploy controls six months before your filing, you do not have enough history. Start SOX ITGC preparation at least 18 months before your expected IPO date. Not 12. Not 6.

## Five questions your auditors will ask

These come from real ITGC audit procedures.

| Auditor's question | Why teams fail | What passing looks like |
|---|---|---|
| _Who ran this DML on the production financial database on March 14th?_ | Shared credentials. Every action attributed to `db_admin`, not a named person. | Every database action tied to an individual identity through SSO. |
| _Show me the approval chain for this schema change._ | Approvals happen in Slack or standups. Auditors need a system of record, not chat screenshots. | Change request workflow where approvals are recorded before SQL executes. |
| _Can someone with write access also approve their own changes?_ | Same DBA writes and deploys SQL, or one person holds both `admin` and `approver` roles. | Role-based workflows where requester and approver are different people, enforced by the system. |
| _Show me evidence that this change was tested before production._ | Engineers run SQL directly against production. No staging, no dry run, no evidence. | Multi-environment pipeline with execution logs at each stage. |
| _List all users with write access to financial databases, when granted, and when last reviewed._ | Access managed through ad-hoc `GRANT` statements with no review records. | Centralized [access management](/blog/data-access-governance/) with provisioning logs and quarterly reviews. |

If your team cannot answer all five today, the question is whether you discover the gap now or your auditor discovers it during fieldwork.

## How to build SOX-compliant database change controls

The fix is not buying a tool and hoping it generates the right reports. It is restructuring how database changes flow through your organization so that compliance evidence is a byproduct of the process.

**Step 1: Centralize all database changes through a single control plane.**

Stop making changes through direct database connections. Route every DDL and DML statement through a system that enforces policy before execution. [Bytebase](/) does this by creating a single entry point for all database changes across instances (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server) with built-in approval workflows that produce the audit trail auditors need.

**Step 2: Implement risk-based approval workflows.**

Not every change needs the same scrutiny. Adding a column to a staging table is different from running `DELETE FROM transactions WHERE...` on production. High-risk DML on financial tables gets multi-level approval. Low-risk DDL in non-production environments passes through faster. This maps directly to ITGC change management without creating bottlenecks.

**Step 3: Enforce SQL review rules.**

Block `DELETE` without a `WHERE` clause. Require `LIMIT` on DML affecting production. Flag `DROP TABLE` for executive-level approval. These are preventive controls — they stop dangerous statements before execution, which auditors rate higher than detective controls that only alert after the fact.

**Step 4: Deploy identity-aware access controls.**

Connect database access to your identity provider (Okta, Azure AD). When someone leaves or changes roles, their database access updates automatically via SCIM. Every query traces back to a named user, not a generic service account.

**Step 5: Generate auditor-ready evidence.**

Your database change management system should produce exportable reports on demand: every change, who requested it, who approved it, when it ran, and the actual SQL. Do not reconstruct this from logs after an auditor asks.

Financial services companies often require that no customer data leaves their infrastructure. On-premises deployment keeps the change management platform inside your security boundary. See how [PayerMax built security and compliance into their database workflow](/blog/payermax-case-study/) with a similar approach.

## Timeline: when to start

Companies that start late face a binary choice — delay the IPO or accept a material weakness finding. Neither is cheap.

- **T-18 months:** Gap assessment. Map every database touching financial reporting. Identify shared credentials, undocumented changes, missing audit trails.
- **T-12 months:** Deploy centralized [database change management](/blog/what-is-database-change-management/). Start accumulating audit history.
- **T-9 months:** Internal test audit. Can you answer the five questions above?
- **T-6 months:** External auditor pre-assessment. You want findings now, not during the real audit.
- **T-3 months:** Remediate remaining findings. Lock down controls.
- **IPO filing:** Present 12-plus months of continuous ITGC compliance evidence.

Companies in the EU should also account for [DORA (Digital Operational Resilience Act)](https://www.digital-operational-resilience-act.com/) requirements, which add ICT risk management and incident reporting obligations on top of SOX controls. Learn more about [Bytebase for financial services](/solutions/financial-services/).
