---
title: How CVTE Uses Bytebase to Manage Factory Databases
author: Cayden
updated_at: 2023/11/16 21:21:21
feature_image: /content/blog/cvte-case-study/banner.webp
tags: Case Study
featured: true
description: 'How electronic manufacturing corporation CVTE achieves more secure and streamlined database change management with Bytebase.'
keypage: true
---

> How electronic manufacturing corporation CVTE embraced Bytebase for a fresh approach to database change management: including batch changes, a simplified version control workflow, and granular access control.

## About CVTE

[CVTE](https://global.cvte.com/) was established in 2005 and has multiple subsidiary companies. CVTE's main business is the design, development, and sales of LCD mainboards, Intelligent Interactive Panels, medical devices, and related intelligent hardware. The company has two brands, seewo and MAXHUB, which are used for Interactive Flat Panels in the education and commercial sectors, respectively.

## Long-standing Database Change Management Issues

CVTE was already using an SQL audit platform, which theoretically can achieve monitoring of database access and interception of faulty SQL statements, thereby avoiding unauthorized operations. However, in reality, the platform could not effectively handle complex database change management requirements.

- **Coarse granularity of interception rules**: Due to the inability to set fine-grained rules, coarse-grained rules may cause false interceptions.
- **Fixed rules cannot be flexibly adjusted**: Due to the fixed rule configuration similar to a firewall, once end users discover rule errors or need temporary access, they can only repeatedly modify the rules.
- **No support for SQL review specifications**: The interception rules of the audit platform are limited to SQL types, but lack support for more detailed SQL review specifications such as naming conventions and field type constraints.
- **Unstable interception capability**: There are inexplicable SQL execution errors that can only be resolved by disabling the interception function.
- **Lack of online process control**: All releases still require manual integration across multiple fragmented systems, making it impossible to achieve submission, review, and release within a closed-loop process. This increases unnecessary communication costs and introduces more failure points.
- **Lack of advanced release capabilities**: CVTE wanted to deploy the same change to multiple factory systems. Originally, this was achieved by logging into bastion host machines one by one, which was inefficient.
- **Lack of versioned change management**: Although the audit platform can record all changes, its purpose is auditing. It's insufficient for version management such as difference comparison, change history analysis, or change orchestration.
- **Unable to manage account permissions**: Due to existing requirements for deployment and querying purposes, developers need production environment accounts. Even if account permissions are under control, issued accounts cannot be effectively managed.

Due to the limitations of the audit platform, to avoid affecting the team's daily operations, CVTE could only abandon interception and adopt only its auditing capability. However, the problem of database change management remained and became a major pain point in daily database management.

## A Fresh Database Change Management Experience for the Manufacturing Industry

After trial and evaluation, CVTE selected Bytebase as its database change management platform.

### Full Database Change Process Oversight

![_](/content/blog/cvte-case-study/loop.webp)

Bytebase enables a one-stop change management process, forming a complete lifecycle of change merging > reviewing > release > notification > recording. Bytebase's integration with upstream and downstream tools further unifies previously fragmented actions.

- **Merge**: Changes can be merged in various ways: through the Bytebase UI, code repositories, APIs, catering to the needs of different development teams.
- **Review**: Powerful automatic [SQL Review](https://docs.bytebase.com/sql-review/overview/).
- **Release**: Issues can be released to the target database with just one click, avoiding inefficient and error-prone manual execution.
- **Notification**: Integration with mainstream instant messaging platforms allows for automated notifications.
- **Record**: Unlike audit platforms that only record the final executed statements, Bytebase records the workflow of issues as well as snapshots of database schema before and after changes, allowing for comprehensive change history management.

### Improved Release Efficiency

![_](/content/blog/cvte-case-study/batch.webp)

Besides emphasizing control throughout the release process, Bytebase provides various capabilities to help development teams improve release efficiency, some of which effectively solve the problems faced by CVTE.

- **Batch changes**: Bytebase supports multiple ways to release changes, among which [Batch Change](https://docs.bytebase.com/change-database/batch-change/) can group and release changes to a large number of databases simultaneously, avoiding database-by-database execution, and can flexibly handle cross-grouping issues, which simply cannot be addressed by customizing batch change scripts.
- **Script validation**: Bytebase helps write better SQL statements by incorporating syntax checking and object name verification. For certain operations, such as modifying schema referenced by VIEWs (in PostgreSQL, the VIEW needs to be deleted to modify table schema), Bytebase can automatically provide VIEW definitions for easy script rewriting.
- **Simplified version control**: Before Bytebase, change scripts in test environments needed to be manually recorded and arranged using tools like spreadsheets, before being individually released into production environments. This process was cumbersome and prone to errors. With [Changelist](https://docs.bytebase.com/changelist/), they can now import changes from change history or external files and release them with one click, significantly improving the experience.

### Integrating Compliance

![_](/content/blog/cvte-case-study/compliance.webp)

Bytebase has built-in security capabilities, with access control for all direct human-to-database interactions.

- **Unified access control**: Bytebase employs the RBAC system, allowing easy management of database access across all projects without granting direct access rights to developers.
- **Fine-grained query export permissions**: Permissions can be allocated at the table or statement level with precision, ensuring compliance with data access requirements.
- **Strict control over changes**: All changes must be executed through issues, facilitating auditing and record keeping.

## Step-by-Step Implementation

To ensure successful implementation, the management team communicated with all teams and aimed for phased rollout.

- **Gradual promotion**: They prioritized departments with more urgent needs, such as the manufacturing department's need for batch changes.
- **Step-by-step implementation**: For the sales department that has frequent changes and complex scenarios, there was no rush for comprehensive adoption. Instead, different strategies were formulated based on release cadence, fixes, etc. Temporary and error-prone data changes were prioritized. This ensured that the R&D team could gradually adapt to the new process.
- **Evolve functionally in stages**: They started with an easy-to-use [UI change workflow](https://docs.bytebase.com/change-database/change-workflow/#ui-workflow) and gradually incorporated the [GitOps workflow](https://docs.bytebase.com/change-database/change-workflow/#gitops-workflow) in some departments for a more seamless change experience.

Moving forward, Bytebase will continue to work with CVTE to build a new generation of database change management processes. Stay tuned for more⛽️.
