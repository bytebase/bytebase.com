---
title: How PayerMax Integrates Security and Compliance into its Database Development Workflow
author: Cayden
updated_at: 2025/02/11 21:21:21
feature_image: /content/blog/payermax-case-study/banner.webp
tags: Case Study
featured: true
description: 'How PayerMax Integrates Security and Compliance into Its Database Development Workflow'
---

![what-is-payermax](/content/blog/payermax-case-study/what-is-payermax.webp)

> PayerMax ([www.payermax.com](https://www.payermax.com)) is a leading global fintech company rooted in emerging markets. It is committed to delivering professional omni-method global payment solutions, including global acquiring, payout, and collections, providing merchants with a safer, more convenient one-stop payment experience.

## Highlights

- **Inline data classification:** Data classification is embedded directly in the database schema, preventing inconsistency.
- **Continuous classification integrity:** Security checks are integrated into the development workflow, ensuring classification data remains accurate with every schema change.
- **JIT(Just-in-Time) access control based on data classification:** The access control policy is tied to data classification, ensuring that access permissions are dynamically assigned based on the classification levels of the data.

## Security and Efficiency: Can We Have Both?

As a global cross-border Fintech company, compliance and security are the lifeblood of the business. PayerMax consistently prioritizes security in its IT infrastructure. However, as a high-tech company, responding quickly to business needs is essential to remain competitive in a fast-moving market. Security controls should not significantly impact development efficiency. Therefore, when building a data security system, PayerMax's principle is to integrate security mechanisms into the development workflow and tools, minimizing the impact by providing better user experiences.

Bytebase, as a database change management tool designed for developer teams, not only empowers teams to improve change efficiency but also integrates a series of data security features into the development workflow. PayerMax has built a data classification system using Bytebase, forming the foundation for its data access controls and ensuring compliance with access policies.

## Building a Data Classification System

[Data classification](https://docs.bytebase.com/security/data-masking/data-classification/) helps organizations efficiently identify sensitive data and provide appropriate security policies to meet various compliance requirements. However, data classification efforts were often tokenistic. This was mainly due to the lack of consideration on how to align classification data with security policies during implementation. Early on, the PayerMax team identified this challenge, with their primary goal being to leverage data classification to effectively control access permissions for querying, exporting, and modifying specific data.

Once the target was clear, the next step was to design a solution that was easy to store and maintain the classification data. Two common options are:

- **Centralized store**: Classification data is stored and managed through a dedicated security platform, maintained by administrators. The advantage of this approach is that updates to the classification rules can be made in bulk. The downside is that the classification data is separated from the data source itself, requiring careful management of mappings between them. In rapidly changing environments, administrators face a higher maintenance burden.

- **Inline with schema**: The classification data is embedded directly within the database schema, making it self-contained, with updates managed by the developer team. The advantage is that classification data can be accessed directly from the data source whenever needed, and the classification data can be simultaneously updated when changing the schema. The downside is that the maintenance responsibility is decentralized, requiring an effective process to ensure accuracy.

Another challenge is initializing classification labels for large amounts of existing data. Two common options are:

- **Automatic**: The automatic data classification based on data content is typically only about 50% accurate, requiring manual review to validate all data. In the global business system, the complexity of field content can further reduce accuracy. Additionally, the team’s own classification standards often aren't compatible with automated tools. As a result, automatic data classification has limited practical value.

- **Manual**: The development team manually categorizes and tags business data based on a unified standard.

PayerMax applied the **DevSecOps** concept in its data classification practices. The security team defines the standards and imports them into Bytebase, then embeds classification data in the schema comment field. The security team audits and controls the workflow and results via Bytebase.

![security-import](/content/blog/payermax-case-study/security-import.webp)

## Data Access Compliance

Under conventional security strategies, strict centralized controls often limit developer teams' access to databases, which can significantly impact development efficiency. Applying the **DevSecOps** concept, PayerMax built a two-layer [data access control system](https://docs.bytebase.com/security/database-permission/overview/) using Bytebase. This system integrates security policies into the development workflow, allowing developer teams to self-manage limited access permissions for specific needs under global security control.

- **First layer, Database Access Groups by Project:** In this layer, different business units can only access the databases related to their projects. Global administrators grant each team leader an admin role for specific projects, and the leader then determines the access permissions of team members within the project. All changes in permissions are audited, and global administrators regularly monitor and review them.

- **Second layer, Fine-Grained Data Access Control:** Global security administrators create global security policies, such as defining data masking strategies based on classification data, and enforce these policies across all projects.

In this security framework, business unit leaders, who are most familiar with their team's needs, are empowered to allocate data access permissions efficiently without relying on DBAs or security officers. Meanwhile, global security policies ensure compliance with sensitive data access, balancing efficiency and security.

![two-layers](/content/blog/payermax-case-study/two-layers.webp)

## Ensuring the Classification Accuracy of Each Change

Since classification data is embedded in the database schema and maintained by the developer team, PayerMax ensures that daily changes do not compromise the accuracy of this information. In the approval workflow, a security officer approver is added. Bytebase's risk-based approval workflow ensures that only specific types of DDL changes (e.g., modifying or adding fields) require security approval, minimizing the impact on development efficiency. Bytebase’s streamlined deployment flow also ensures consistency of classification data across different environments, such as Test, Stress, Staging, and Prod.

![approval-workflow](/content/blog/payermax-case-study/approval-workflow.webp)

## Integrating Secret Management Service to Enhance Platform Security

Database credentials are another key concern for the PayerMax team. Bytebase offers integration with an [external secret management service](https://docs.bytebase.com/get-started/instance/#use-external-secret-manager), eliminating the need to store plaintext credentials in Bytebase. Instead, the credentials are managed by a dedicated service and called on-demand, providing higher security. Bytebase supports several mainstream solutions, including HashiCorp Vault, AWS Secrets Manager, and GCP Secret Manager, and also supports custom secret management service.

![secret-manager](/content/blog/payermax-case-study/secret-manager.webp)

Bytebase has been running smoothly at PayerMax for nearly two years and will continue to support the rapid growth of its business while ensuring security and compliance.
