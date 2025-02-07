---
title: How note inc. Implements Just-in-Time (JIT) Database Access Control with Bytebase
author: Cayden
updated_at: 2025/02/06 21:21:21
feature_image: /content/blog/note-case-study/banner.webp
tags: Case Study
featured: true
description: 'How note inc. implements Just-in-Time (JIT) database access control with Bytebase.'
---

> note ([note.com](https://note.com)) is a C2C content platform in Japan that empowers all types of creators and promotes creator economy. note was launched in 2014. note initially implemented an in-house database access system but faced challenges in efficiency and security. By adopting Bytebase, note streamlined access control, enhanced security, and reduced operational costs.

## Data Access Control Challenges at note

Given that note manages data for millions of users, safeguarding user information is paramount. Typically, the internal development team does not have direct access to production databases containing user data. However, accessing these databases is often necessary for troubleshooting production issues. Effectively managing such just-in-time (JIT) access while ensuring compliance is essential for note.

## Tackling the Challenge with an In-House Solution

To address this challenge, note built a process to manage database access requests:

![current-solution](/content/blog/note-case-study/current-solution.webp)

- **Developed an internal tool using GitHub Actions**
  Developers submit database access requests through this tool.
- **Issued time-limited ephemeral database accounts**
  The tool generates temporary accounts with strict time constraints.
- **Internal SSH proxy server-based access**
  Developers use the issued credentials to connect through an internal SSH proxy server.

However, after running this process for some time, they encountered notable limitations:

- **Fragmented process**: Developers had to repeatedly request and configure accounts manually, leading to inefficiencies.
- **Overly broad permissions**: Developers could access all table columns, including sensitive data that wasn’t necessary for debugging.
- **High maintenance costs**: Admins had to maintain the in-house tool, SSH proxy server, and troubleshoot workflow issues.

## Bytebase Provides a One-Stop Database Access Control Solution

After extensive research, note’s SRE team selected Bytebase to replace their in-house solution, effectively addressing the challenges of fragmented processes, broad access permissions, and high maintenance costs. Bytebase acts as middleware between humans and databases, ensuring secure, efficient, and compliant just-in-time (JIT) access management.

![sso-bb](/content/blog/note-case-study/sso-bb.webp)

Bytebase provides various capabilities to enable more secure and efficient database access, including a unified web-based SQL Editor with fine-grained sensitive data masking and role-based access control. 

![jit](/content/blog/note-case-study/jit.webp)

### Web-based SQL Editor

Bytebase offers a web-based SQL Editor that consolidates all permissions management and data access operations into a single tool. This eliminates the need for the in-house tool, SSH proxy server, and local database clients, allowing developers to submit permission requests and access the database in one place, greatly improving convenience.

![sql-editor](/content/blog/note-case-study/sql-editor.webp)

### Dynamic Data Masking

Bytebase offers column-level dynamic data masking for our Aurora MySQL databases. When granting access permissions to developers for specific tables, sensitive columns can be dynamically masked based on the user's identity during data queries.

![ddm](/content/blog/note-case-study/ddm.webp)

### Role-Based Data Access Control

Bytebase provides role-based database access control, which can implement table-level access control. This permission management is independent of the database account system and is managed by Bytebase. This brings two benefits:

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

After implementing Bytebase's database access control, the following issues have become apparent. In response, note is considering further leveraging Bytebase's capabilities to address these challenges:

- [External approval via Slack](/docs/api/external-approval/)
 
  Currently, workflow approvals are only carried out on Bytebase. By utilizing the external approval feature, approvals can be processed through Slack.

- [CI/CD for DML and DDL changes](/docs/change-database/change-workflow/)

  At present, only read queries are utilized; the aim is to enable modifications for both DML and DDL directly on Bytebase.

- [GitOps workflow with GitHub](/docs/vcs-integration/overview/)
  
  Given that SQL is currently managed through GitHub Issues in the existing business process, the introduction of GitOps is expected to enhance operational efficiency.