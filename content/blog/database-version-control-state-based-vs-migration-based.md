---
title: Database Version Control, State-based or Migration-based?
author: Tianzhou
updated_at: 2021/09/10 11:16:32
feature_image: /content/blog/database-version-control-state-based-vs-migration-based/state-based-vs-migration-based.webp
tags: Explanation
description: We dive the rationale behind the industry divergence between state-based and migration-based approach. In the end, we also show how Bytebase can help to get the best of both worlds.
---

This is a series of articles about database version control and database-as-code (GitOps)

1. [What is Database Version Control?](/blog/database-version-control)
1. Database Version Control, State-based or Migration-based? (this one)
1. [Database as Code - the Good, the Bad and the Ugly](/blog/database-as-code)
1. [The Database as Code Landscape](/blog/database-as-code-landscape)
1. [Database Version Control Best Practice](/blog/database-version-control-best-practice)

---

> In Infrastructure as Code (IaC) space,  state-based approach has become the de-facto standard. By contrast, in Database as Code (DaC) space, team still prefer migration-based approach to manage their database schemas. Below we give an overview of these 2 approaches, dive the rationale behind the industry divergence. In the end, we show how Bytebase can help to get the best of both worlds.

Infrastructure as Code (IaC) and Database as Code (DaC) both belong to Configuration as Code (CaC), and there are 2 different approaches to manage the configuration files:

- State-based version control (declarative)
- Migration-based version control (imperative)

## State-based version control (declarative)

State-based approach stores the desired end state of the entire schema in the code repository. For MySQL, it means to store the schema dump created by _mysqldump_.

It's worth mentioning in IaC,  popular systems like Kubernetes, HashiCorp, and Terraform all adopt this approach.

## Migration-based version control (imperative)

Migration-based approach stores the migration scripts in the repository. Each script contains a set of DDL statements such as CREATE/ALTER/DROP TABLE. The desired schema state is achieved by executing each of those scripts in a deterministic order.

Migration-based approach is more intuitive since this is how we change things in normal life.

It's also worth mentioning in IaC, before Kubernetes, Terraform era, this the way every team managing their infra by having a bunch of shell scripts containing imperative commands to provision the resources

## For Infrastructure as Code,  the industry has already shifted to state-based approach

State-based IaC delivers couple key benefits:

1. Keep a straightforward single source of truth (SSOT) in the repository. Configuration is represented by a single source file. For migration-based approach, people need to derive the SSOT from many migration files.
2. Usability. It's simpler to describe the end state without worrying about the ordering dependency. It's the Kubernetes/Terraform backend does the heavy lifting to reconcile the system to the desired state.

Also tools like Kubernetes, Terraform serves as the catalyst for the adoption.

## For Database as Code, migration-based approach is still the mainstream

Unlike its counterpart, team still prefer the migration-based approach to manage database schema. On one hand, this is due to the supply part.

1. Most existing tooling around code based schema management favor migration-based approach.
2. Same with the popular application frameworks, they all use Up/Down method to manage schema change/rollback. This is a variation to write migration in a specific programming language instead of raw SQL

But why in the database management domain, no state-based system has gained popularity in the last 5 years like IaC peers?

We attribute to couple reasons:

### Lack of system support

State-based or migration-based describes the view from user's perspective, if we look from the system's perspective, state-based approach requires much more engineering effort to get right.

Kubernetes has the built-in controller pattern to support the state-based approach from day 1. That's not the case for database systems. Neither MySQL nor PostgreSQL has any built-in feature to support state-based approach like how Kubernetes does. It's much harder to do if the system itself doesn't provide such support.

### Managing data (stateful) resources is much complex than managing computing/networking (stateless) resources

You may wonder HashiCorp Terraform also faces the similar problem since the infrastructure it manages are those public cloud providers which are blackbox.

Well, first that's why Terraform worths its hype:) It has done a terrific job of handling the complexity of reconciling between user's desired infrastructure state and cloud provider's actual state under the hood.

Another reason is the state-based approach is inherently a fit to manage ephemeral computing/networking resources since they can be destroyed and rebuilt. Database holds data (the state), to deliver a complete state-based approach for DaC, it not only needs to solve the schema (metadata) reconciliation problem like its IaC peer, but also requires to deal with the data.

## Team have better control using migration-based approach than state-based approach, the cost of database mistake is too high

Migration-based approach uses step by step command to instruct the database to make changes. By contrast, state-based approach appears to be a blackbox, and sometimes, this may lead to unexpected outcome. Let's give an example:

_We have 2 engineers Alice and Bob, Alice first made a schema change by adding a columnA to a table, meanwhile, Bob uses the schema version before Alice change, adds a ColumnB and check in after Alice's change._

With the state-based approach, Bob's checkin would cause the system to overwrite Alice's work since the desired state from Bob's checkin dose not include Alice's change. But with the migration-based approach, because of its incremental nature , it won't cause problem.

> State-based version control requires more engineering discipline and tooling support to prevent conflicting changes, while migration-based version control is more forgivable to such conflict.

The stakes are high when dealing with data, and people tend to prefer the method providing better control and safety fallback at the cost of usability.

## How Bytebase could help

State-based approach takes the Infrastructure as Code by storm with the help of Kubernetes, HashiCorp Terraform alike.

> But for database version control, we believe the current right approach is migration-based.  This is partly due to the lack of engine support in MySQL, PostgreSQL, partly due to the complexity of managing data (application state), as well as the high cost of making mistakes.

At the same time, we also understand the benefit of state-based approach. That's why in [version 0.5.0](https://bytebase.com/changelog#release-050), Bytebase introduces the schema snapshot and write back feature:

1. For every schema migration, Bytebase will record the schema snapshot.
2. If team manage database schema under version control system, they can configure Bytebase to write the schema snapshot back to the repository at a specified path.

With that, it makes Bytebase become a hybrid schema migration system. Team using Bytebase retain all the existing benefits of migration-based approach, meanwhile they now can have a single latest schema file. This file is the single of truth of their database schema, which brings the core merit from state-based approach. Please do checkout out [user guide](https://docs.bytebase.com/gitops/overview) on how to configure this.

As a side note, I do hope database engine could innovate in the direction as Kubernetes to pave the way for state-based approach. Actually, Google's own database system Spanner does provide these support and you know what, every team at Google use the state-based approach to manage their database schemas.

The whole industry are not quite there yet, but at least Bytebase can bridge the gap.
