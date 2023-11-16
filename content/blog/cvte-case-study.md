---
title: Case Study - CVTE
author: Changyu
published_at: 2023/11/16 21:21:21
feature_image: /content/blog/cvte-case-study/banner.webp
tags: Case Study
featured: true
description: 'How electronic manufacturing corporation CVTE achieves more secure and streamlined database change management with Bytebase.'
---

> How electronic manufacturing corporation CVTE embraced Bytebase for a fresh approach to database change management: including batch changes, a simplified version control workflow, and granulated access control.

## About CVTE

[CVTE](https://global.cvte.com/) was first established back in 2005 and has multiple subsidiary companies. CVTE's main business is the design, development, and sales of LCD mainboards, Intelligent Interactive Panels, Medical devices, and related Intelligent hardware. The company has two brands, seewo and MAXHUB, and they are used for Interactive Flat Panels in the education and commercial sectors, respectively.

## Long-standing Database Change Management Issues

They were already using an SQL audit platform, which theoretically can achieve monitoring of database access and interception of faulty SQLs, thereby avoiding unauthorized operations. However, in reality, the platform cannot effectively cope with complex database change management requirements.

- **Coarse granularity of interception rules**: due to the inability to set fine-grained rules, coarse-grained rules may cause false interceptions.
- **Fixed rules cannot be flexibly adjusted**: due to the fixed rule configuration similar to a firewall, once end users discover rule errors or need temporary access, they can only repeatedly modify the rules.
- **No support for SQL Review specifications**: the interception rules of the audit platform are limited to SQL types, but lack support for more detailed SQL review specifications such as naming conventions and field type constraints.
- **Unstable interception capability**: there are inexplicable SQL execution errors that can only be resolved by disabling the interception function.
- **Lack of online process control**: all releases still require manual integration in multiple fragmented systems, making it impossible to achieve submission, review, and release within a closed-loop process. This increases unnecessary communication costs and introduces more failure points.
- **Lack of advanced release capabilities**: CVTE wants to deploy the same change into multiple factory systems. Originally, this was achieved by logging into bastion host machines one by one, which was not exactly efficient.
- **Lack of versioned change management**: although the audit platform can record all changes, its purpose is for auditing. It's not enough for version management such as difference comparison, change history analysis, or change orchestration.
- **Unable to manage account permissions**: due to existing requirements for deployment and querying purposes, developers need production environment accounts. So even if account permissions are under control, issued accounts cannot be effectively managed.

Due to the limitations of the audit platform, in order not to affect the team's daily use they can only give up interception and only adopt its auditing capability. However, the problem of database change management remains and has become a major pain point in daily database management.

## A Fresh Database Change Management Experience for the Manufacturing Industry

After trial and evaluation, CVTE landed on Bytebase as its database change management platform.

### Full Database Change Process Oversight

![_](/content/blog/cvte-case-study/loop.webp)

Bytebase enables a one-stop change management process, forming a complete lifecycle of change merging > reviewing > release > notification > recording. At the same time, Bytebase's integration with up- and downstream tools through various means further unifies the previously fragmented actions.

- **Merge**. Changes can be merged in various ways: through the Bytebase UI, code repos, APIs, catering to the needs of different development teams.
- **Review**. Powerful automatic [SQL Review](/docs/sql-review/overview/).
- **Release**. Issues can be released to the target database with just one click, avoiding inefficient and error-prone manual execution.
- **Notification**. Integration with mainstream IMs allows for automated notification.
- **Record**. Unlike audit platforms that only record the final executed statements, Bytebase records the workflow of issues as well as snapshots of database schema before and after changes, allowing for a more comprehensive change history management.

### Improved Release Efficiency

![_](/content/blog/cvte-case-study/batch.webp)

Besides emphasizing control throughout the release process, Bytebase provides various capabilities to help development teams improve their release efficiency, some of which effectively solve the problems faced by CVTE.

- **Batch changes**. Bytebase supports multiple ways to release changes, among which [Batch Change](/docs/change-database/batch-change/) can group and release changes to a large number of databases simultaneously, avoiding execution by database, and can flexibly handle the issue of cross-grouping, which simply can not be addressed by customizing batch change scripts.
- **Script validation**. Bytebase can help write better SQL statements, by incorporating syntax checking and object name verification. For certain operations, such as modifying schema referenced by VIEWs (in Postgres, the VIEW needs to be deleted to modify table schema), Bytebase can automatically provide VIEW definitions for easy rewriting of scripts.
- **Simplified version control**. Before Bytebase, change scripts in their test environments needed to be manually recorded and arranged using tools like spreadsheets, before being individually released into production environments. This process was cumbersome and prone to errors. With [Changelist](/docs/changelist/), they are now able to import changes from change history or external files and release them with one click, significantly improving the experience.

### Integrating Compliance

![_](/content/blog/cvte-case-study/compliance.webp)

Bytebase has built-in security capabilities, with access control for all direct human to database interactions.

- **Unified access control**. Bytebase employs the RBAC system, and you can easily manage database access across all projects without granting direct access rights to developers.
- **Fine-grained query export permission**. You can allocate permissions at the table or statement level with precision, ensuring compliance with data access.
- **Strict control over changes**. All changes must be executed through issues, facilitating auditing, and record keeping.

## Step-by-Step Implementation

To ensure the implementation works well, the management team made sure to communicate with all teams and aimed for phased implementation.

- **Gradual promotion**. They prioritized the departments with more dire needs, such as the manufacturing department's need for Batch Changes.
- **Step-by-step implementation**. For a sales department that has frequent changes and complex scenarios, there is no rush to promote it comprehensively. Instead, different strategies are formulated based on release cadence, fixes, etc. Temporary and error-prone data changes are prioritized. This ensures that the R&D team can slowly adapt to the new process.
- **Evolve functionally in stages**. They started with an easy-to-use [UI change workflow](/docs/change-database/change-workflow/#ui-workflow) and gradually incorporated the [GitOps workflow](/docs/change-database/change-workflow/#gitops-workflow) in some departments for a more seamless change experience.

In the road ahead, Bytebase will continue to work with CVTE to build a new generation of database change management processes. Stay tuned for more⛽️.