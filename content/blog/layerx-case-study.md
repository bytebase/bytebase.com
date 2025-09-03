---
title: How LayerX Achieves “Painless” Governance and Security in the Cloud
author: Tianzhou
updated_at: 2025/07/08 12:00:00
feature_image: /content/blog/layerx-case-study/banner.webp
featured: true
tags: Case Study
description: 'How LayerX Achieves “Painless” Governance and Security in the Cloud'
keypage: true
---

![presentation](/content/blog/layerx-case-study/presentation.webp)

At CloudNative Days Summer 2025, Hokuto Hoshi—CISO and Head of SRE/Corporate Engineering at LayerX—shared how the company has built a cloud-native governance framework that balances compliance, security, and developer agility. The presentation, titled [Realizing "Painless" Governance and Security in the Cloud](https://speakerdeck.com/kanny/effortless-governance-and-security-enabled-by-the-cloud), resonated with platform teams facing growing audit requirements without wanting to slow down development.

## About LayerX

![about-layerx](/content/blog/layerx-case-study/about-layerx.webp)

[LayerX](https://layerx.co.jp/) is a Tokyo-based technology company with a mission to enable digitalization across all economic activities. The company operates across several domains, including:

- [Bakuraku](https://bakuraku.jp/): A suite of AI-powered SaaS tools streamlining core enterprise workflows such as expense management, invoice processing, and approval flows.

- [Fintech](https://corp.mitsui-x.com/): Asset management and securities solutions delivered through a joint venture model.

- [AI/LLM](https://getaiworkforce.com/): An internal platform that transforms organizational knowledge into structured, retrievable data using large language models.

LayerX builds its products with a strong emphasis on automation, auditability, and developer experience—making it a prime example of a cloud-native enterprise balancing innovation with compliance.

## Governance Without the Pain

For many organizations, audit readiness still means manually collecting logs, managing permissions through spreadsheets, and retrofitting access controls into existing workflows. LayerX takes a different approach:

- Automate controls using infrastructure-as-code and cloud-native platforms

- Integrate security practices directly into development workflows

- Maintain transparency and explainability for auditors and engineers alike

- Treat compliance not as a checkbox but as part of system reliability

Their implementation spans the entire stack—from user account management to infrastructure provisioning, from application deployment to database change management.

## From Identity to Infrastructure: A Systems Approach

### SSO as a Security Backbone

LayerX uses [Microsoft Entra ID](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id) to unify identity across systems. Employee onboarding and offboarding are fully automated via HR data and Notion, with Slack-integrated workflows for approvals. Access is consistently enforced through SSO across all internal tools.

### Group-Based Permissioning

User groups are defined via [SmartHR](https://smarthr.jp/) and translated to [Terraform HCL](https://developer.hashicorp.com/terraform/language), then synced to Entra ID. This bridges HR systems with access control, enabling scalable role-based access patterns.

### Time-Bound Privilege Escalation

To handle temporary elevated permissions, LayerX leverages [Entra PIM](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure), allowing just-in-time access with automatic expiration—a modern answer to long-standing privilege management issues.

### Change Management in GitHub

Application and infrastructure changes are governed by pull request approvals using [GitHub's CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners). Even emergency changes are logged and traceable, and deployments are automated via tools like [ecspresso](https://github.com/kayac/ecspresso) and [Terraform](https://www.terraform.io/) within a monorepo setup.

### Unified Logging and Simplified Audits

Logs from [AWS CloudTrail](https://aws.amazon.com/cloudtrail/), Entra ID, [Datadog](https://www.datadoghq.com/), and [Amazon Athena](https://aws.amazon.com/athena/) are aggregated and searchable via APIs and CLI commands. LayerX stores logs in [Snowflake](https://www.snowflake.com/), making it easy to visualize and retrieve audit evidence. Log extraction is automated—no more ad hoc queries or manual exports.

## Database Governance with Bytebase

Traditionally, database operations are disconnected from CI/CD and governance workflows. LayerX addressed this gap by adopting [Bytebase](/) to introduce structured, auditable change management for their databases.

With Bytebase, LayerX can:

- Review and approve schema changes through a web interface or API

- Maintain audit trails for all SQL operations

- Eliminate the need for bastion hosts by shifting to a secure, review-based model

This brings the same rigor to database operations that exist for code and infrastructure—an essential step for aligning security, reliability, and developer velocity.

## A Model for Modern Platform Teams

LayerX shows that auditability and agility are not mutually exclusive. By embedding governance into the developer workflow and codifying it through infrastructure and policy engines, they’ve created a foundation that’s secure, scalable, and operationally efficient.

For teams managing database changes, LayerX’s use of Bytebase highlights a growing trend: bringing CI/CD, approval workflows, and visibility to one of the last remaining blind spots in DevSecOps.

## Summary of Tools and Vendors Used

What LayerX has accomplished is a pragmatic example of how modern engineering practices, when paired with the right tools, can turn governance from a bottleneck into a built-in strength.

| Tool / Platform                      | Vendor              | Purpose                                                  |
| ------------------------------------ | ------------------- | -------------------------------------------------------- |
| Microsoft Entra ID                   | Microsoft           | SSO, identity provider, group and access control         |
| SmartHR                              | SmartHR             | HR system for managing employee roles and attributes     |
| Terraform                            | HashiCorp           | Infrastructure-as-code, role syncing with IdP            |
| Entra PIM (Privileged Identity Mgmt) | Microsoft           | Time-limited elevated access with approvals              |
| GitHub + CODEOWNERS                  | Microsoft (GitHub)  | Pull request approval workflow for app and infra changes |
| ecspresso                            | KAYAC               | ECS deployment tool integrated with GitHub and Terraform |
| Bytebase                             | Bytebase            | CI/CD for database schema and data changes               |
| AWS CloudTrail                       | Amazon Web Services | Logging of AWS resource activities                       |
| Amazon Athena                        | Amazon Web Services | Serverless log querying and analysis                     |
| Snowflake                            | Snowflake           | Data warehouse for storing and visualizing audit logs    |
| Datadog                              | Datadog             | System monitoring and additional log aggregation         |
| Slack                                | Salesforce          | Notification and approval workflows                      |
| Notion                               | Notion              | Internal metadata and account provisioning source        |
| CLI / APIs / Scripts                 | Custom              | Automating log extraction and compliance tasks           |
