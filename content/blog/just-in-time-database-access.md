---
title: Just-in-Time Database Access
author: Tianzhou
updated_at: 2024/11/21 14:00:00
feature_image: /content/blog/just-in-time-database-access/banner.webp
tags: Explanation
featured: true
description: 'The Just-in-Time Database Access workflow'
---

**Just-In-Time (JIT) Database Access** is a security practice where database access privileges are granted temporarily, only when needed, and automatically revoked after a specified period. The goal is to reduce the risk of unauthorized access, minimize the attack surface, and enhance security by ensuring that users or applications have access only when it is necessary for a specific task.

## Traditional workflow

Below shows a typical workflow offered by the existing JIT database access solutions:

1. Incident starts.
1. On-call visits the JIT system to request elevated database permissions.
1. Request is approved, JIT system provisions a temporary database user and give it to the on-call.
1. On-call uses the temporary database user to connect to the production database from a SQL client and starts
   troubleshooting.
1. Incident ends.
1. JIT system revokes the temporary database user or let the user expire automatically.

Although existing JIT solutions provide some degree of automation and centralized control, they are
limited by the disconnect between the system used to request and provision JIT database access and
the system where end users actually connect to the databases.

1. Users have to set up different database credentials in their SQL client every time.

1. While the system can review and audit JIT access requests, it cannot record or control the SQL queries executed by the end users.

## Bytebase workflow

<TutorialBlock url="/docs/tutorials/just-in-time-database-access-part1/" title="Just-in-Time Database Access via GUI" />

Bytebase provides the similar [self-service request workflow](/docs/security/database-permission/query/#request-project-querier-role) to JIT database access. Additionally, Bytebase provides additional benefits.

### Fine-grained database permissions

<IncludeBlock url="/docs/share/database-permission-table"></IncludeBlock>

Bytebase enables fine-grained database permissions, allowing you to grant developers only the `EXPLAIN` permission by default. In the event of an incident, developers can temporarily obtain elevated database permissions, which should be revoked promptly once the issue is resolved. This approach ensures **Zero Standing Privileges (ZSP)**, eliminating persistent access rights within the organization’s IT environment.

### Integrated SQL Editor

![sql-editor](/images/sql-editor.webp)

Bytebase has a [built-in SQL Editor](/docs/sql-editor/overview/) so users don't need to jump to a separate SQL client to inspect the databases. Besides, Bytebase can restrict SQL statements and apply [dynamic data masking](/docs/security/data-masking/overview/).

### API-first

Bytebase can be integrated into the existing Internal Developer Portal (IDP) via [API](/docs/api/overview/). Below tutorial
shows how to embed SQL Editor and configure the database permissions via API.

<TutorialBlock url="/docs/tutorials/embed-sql-editor/" title="Embed SQL Editor in Your Internal Web Portal" />

## Comparison

| JIT Database Access Features           | Traditional                                          | Bytebase |
| -------------------------------------- | ---------------------------------------------------- | -------- |
| Self-service request and approval flow | ✅                                                   | ✅       |
| Auto-expiration                        | ✅                                                   | ✅       |
| Audit logging request                  | ✅                                                   | ✅       |
| Audit logging SQL                      | ❌                                                   | ✅       |
| Integrated SQL Client                  | ❌                                                   | ✅       |
| Dynamic Data Masking                   | ❌                                                   | ✅       |
| Custom Integration                     | ⚠️ Limited due to the lack of an built-in SQL Client | ✅       |
