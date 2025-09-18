---
title: How note.com Implements Just-in-Time (JIT) Database Access Control with Bytebase
author: Cayden
updated_at: 2025/02/06 21:21:21
feature_image: /content/blog/note-case-study/banner.webp
tags: Case Study
featured: true
description: 'How note inc. implements Just-in-Time (JIT) database access control with Bytebase.'
keypage: true
---

> note ([note.com](https://note.com)) is a C2C content platform in Japan that empowers creators of all types and promotes the creator economy. Founded in 2014, note initially implemented an in-house database access system but faced challenges with efficiency and security. By adopting Bytebase, note streamlined access control, enhanced security, and reduced operational costs.

## Data Access Control Challenges at note

As note manages data for millions of users, safeguarding user information is paramount. The internal development team does not have direct access to production databases containing user data. However, database access is often necessary for troubleshooting production issues. Effectively managing just-in-time (JIT) access while ensuring compliance is essential for note.

## Tackling the Challenge with an In-House Solution

To address this challenge, note built a process to manage database access requests:

![current-solution](/content/blog/note-case-study/current-solution.webp)

- **Developed an internal tool using GitHub Actions**
  Developers submit database access requests through this tool.
- **Issued time-limited ephemeral database accounts**
  The tool generates temporary accounts with strict time constraints.
- **Internal SSH proxy server-based access**
  Developers use the issued credentials to connect through an internal SSH proxy server.

However, after running this process for some time, note encountered several limitations:

- **Fragmented process**: Developers had to repeatedly request and configure accounts manually, creating inefficiencies.
- **Overly broad permissions**: Developers could access all table columns, including sensitive data unnecessary for debugging.
- **High maintenance costs**: Administrators had to maintain the in-house tool, SSH proxy server, and troubleshoot workflow issues.

## Bytebase Provides a One-Stop Database Access Control Solution

After extensive research, note's SRE team selected Bytebase to replace their in-house solution, effectively addressing the challenges of fragmented processes, overly broad access permissions, and high maintenance costs. Bytebase acts as middleware between users and databases, ensuring secure, efficient, and compliant just-in-time (JIT) access management.

![sso-bb](/content/blog/note-case-study/sso-bb.webp)

Bytebase provides various capabilities that enable more secure and efficient database access, including a unified web-based SQL Editor with fine-grained sensitive data masking and role-based access control.

![jit](/content/blog/note-case-study/jit.webp)

### Web-based SQL Editor

Bytebase offers a [web-based SQL Editor](https://docs.bytebase.com/sql-editor/overview/) that consolidates all permission management and data access operations into a single tool. This eliminates the need for the in-house tool, SSH proxy server, and local database clients, allowing developers to submit permission requests and access databases from one location, significantly improving convenience.

![sql-editor](/content/blog/note-case-study/sql-editor.webp)

### Dynamic Data Masking

Bytebase offers column-level [dynamic data masking](https://docs.bytebase.com/security/data-masking/overview/) for Aurora MySQL databases. When granting access permissions to developers for specific tables, sensitive columns are dynamically masked based on the user's identity during data queries.

![ddm](/content/blog/note-case-study/ddm.webp)

### Role-Based Data Access Control

Bytebase provides role-based database access control that implements table-level access control. This permission management is independent of the database account system and is managed entirely by Bytebase, providing two key benefits:

- All permissions and actions can be precisely tracked to individuals.
- Developers cannot access database credentials.

![data-access-control](/content/blog/note-case-study/data-access-control.webp)

### Integration with Other Tools

Bytebase supports Terraform, provides comprehensive open APIs, and can integrate with IM tools and SSO solutions, allowing it to be incorporated into existing development workflow.

Multiple SSO Solutions
![sso](/content/blog/note-case-study/sso.webp)

Access request notifications will be pushed to Slack.
![slack](/content/blog/note-case-study/slack.webp)

## Overall Benefits of Bytebase's Solution

- **Streamlined request, review, grant, access workflow**: A unified tool for permission requests, approvals, and data access, replacing a previously complex process that relied on multiple tools.
- **Enhanced account security**: No need for developers to use database credentials. With SSO, 2FA, and other features, the risk of account sharing or credential leakage is minimized.
- **Sensitive data protection**: Column-level dynamic data masking ensures developers cannot access sensitive data in production databases.
- **Fine-grained permission management**: Custom roles offer flexible permission management for both full-time employees and contractors.
- **Reduced development and maintenance cost**: Bytebase can be self-hosted with a single Docker image, simplifying upgrades and maintenance and eliminating the need for in-house tool development.
- **Auditable operations**: Actions are tracked to individuals, with detailed audit logs available for easier issue resolution during emergencies.

## Next Steps

After implementing Bytebase's database access control, note identified additional opportunities for improvement. In response, note is considering further leveraging Bytebase's capabilities to address these areas:

- [CI/CD for DML and DDL changes](https://docs.bytebase.com/change-database/change-workflow/)

  Currently, only read queries are utilized; the goal is to enable both DML and DDL request/review/deploy process directly through Bytebase.

- [GitOps workflow with GitHub](https://docs.bytebase.com/gitops/overview/)

  Since SQL is currently managed through GitHub Issues in the existing business process, introducing GitOps is expected to enhance operational efficiency.

---

_To learn more, check out our JIT Database Access Whitepaper👇_

[![jit-whitepaper-cover](/content/whitepaper/just-in-time-database-access/cover-horizontal.webp)](/content/whitepaper/just-in-time-database-access/bytebase-whitepaper-just-in-time-database-access-best-practices.pdf)
