---
title: The SQL Review Tool for Developers
author: Cayden
updated_at: 2022/10/28 18:00
feature_image: /content/blog/sql-review-tool-for-devs/dev-fighting-dba.webp
tags: Industry
featured: true
description: Reviewing SQL can be somewhat tedious, yet is essential to keep your database fleet reliable. At Bytebase, we are building a developer-first SQL review tool to empower the DevOps system.
keypage: true
---

Treat SQL as code ("[Why](https://blog.devgenius.io/why-google-treats-sql-like-code-and-you-should-too-53f97925037e)?", you may ask), which means all the reasons why we review other codes need to apply to SQL scripts. They interact straight with databases, and databases are too important. No matter how database vendors promise their products are stable and robust, databases are still pretty fragile. Even if we disregard the accidental "DROP TABLE" fiasco, ordinary queries like "SELECT FROM" can also overwhelm a database and bring it down. Let’s face it: databases are delicate, yet very few users understand how to treat them properly - meaning we should discipline the users’ behavior to some degree.

Here’s where SQL review comes in. It is the practice of reviewing DDL and DML statements before applying them to the database. It is one of the most critical aspects of database schema management. In the past, DBAs were in charge of the database. They know the database best, and thus should be the ones reviewing the SQL. This is reasonable, but there is a contradiction: developers (database users) cannot understand the many restrictions and want the most freedom. At the same time, DBAs insist that stability triumphs over everything.

![_](/content/blog/sql-review-tool-for-devs/dev-fighting-dba.webp)

With the proliferation of DevOps, the R&D process is also evolving, and many traditional "Ops" tasks are gradually integrated into the "Dev" team. Some organizations have even built "Platform Engineering" teams dedicated to providing tools and platforms for development teams, and the development teams themselves can do the Ops work.

![_](/content/blog/sql-review-tool-for-devs/devops-view.webp)

From the tooling’s point of view, what can be done to help the development teams complete the DevOps lifecycle? For example, how should the review process evolve? How to make it developer-friendly? Let’s break it down into the following six parts.

## Customizable Capability

For most developers, databases seem too complex and mysterious. For example, they know all about the business logic yet lack understanding of whether specific changes affect performance and maintainability. Fortunately, many tools have built-in policies for common issues and can give recommendations automatically. But database types are diverse, and database engines are advancing rapidly, policies for a specific database, and a specific version may become outdated. Using the set of policies meant for the last MySQL version on the newest version may seriously affect the efficiency of application development, which is a source of conflict between the development team and the DBAs. When the reviewer's ability is limited, it puts higher requirements on the review tool. An excellent SQL review tool should have a more refined capability of being able to:

- Apply to different database types;
- Apply to different workload types, such as OLTP, OLAP, or HTAP;
- Apply to different environments, such as dev, test, staging or prod environment;
- Follow the database version update policy timely.

## A Coherent Development Experience: the Shift-left Approach

A developer-friendly tool needs to integrate as much as possible into the working habits of the developers. For example, if SQL scripts are managed on a VCS (version control system), it's not pleasant to log into there and paste SQL for review in a different place. It should be integrated into the existing developer workflow: the support for GitHub and GitLab is a no-brainer. This [shift-left approach](https://devopedia.org/shift-left) makes it possible for the SQL scripts to be reviewed as they are submitted to VCS, rather than at the end of the development cycle, right before the deployment of a new application.

## End-to-End CI/CD Workflow

When we use the shift-left approach, and SQL is reviewed at the beginning of a workflow, it means that SQL needs to be parsed at the source where it is generated. The main challenge comes from the various ORM and state-based tools, where development teams do not directly commit the SQL statements; instead, they dictate declarative configuration. This way, change scripts are generated dynamically by the tool, which makes it difficult for review tools to capture the corresponding SQL. There are three possible ways to address this.

- Proactively embrace mainstream ORM tools for better integration at the source;
- Provide API to be hooked into the existing CI/CD pipeline;
- Provide an end-to-end Database CI/CD workflow, including state-based change capability and automatic deployment to achieve Database DevOps.

## A Flexible Mechanism

SQL review aims to help users better use the database, not be a constraint on their business. When non-development teams are responsible for database stability, it is often easy to create a one-size-fits-all mechanism. Under a DevOps system, where development teams need to balance efficiency and stability, it is necessary to implement some flexible reviewing mechanisms:

- The policies are adaptive to the business load. For example, queries that deliver business value but consume more resources can be relaxed during low business hours.
- Have different thresholds for different data sizes. For smaller databases or tables, some policies can be relaxed.
- Allow occasional violations, but there should be a bottom line. As long as the behavior is not forbidden or certain conditions are met, occasional violations should be allowed.
- Encourage compliance with non-compulsory rules. Let’s be real, when rules are not mandatory, no one will comply with them. Imposing soft penalties can help reduce such problems, for example, by dynamically adding the approval process when non-mandatory rules are frequently violated.

## Knowing What’s Right and Wrong

Like driving cars, we all need to get a license before legally driving. As a reviewer, it is essential to understand the reasoning behind a particular policy when using review tools. Otherwise, some policies can’t be enforced effectively. When the airplanes take off and land, we are always instructed to put away the tray table. This move seems trivial, yet can keep the tray table from stabbing straight into your abdomen in an emergency. Do you still mind this minor inconvenience? Of course, I’m not saying that all developers should have professional database knowledge. Still, SQL review tools for developers should clearly convey the principle and meaning of the policy rules, which will help promote the adoption.

## An Open Community

The combination of database engine type, version, business application, etc., generates a plethora of SQL review rules, which are difficult to support by a single vendor. At the same time, much wisdom is developed from production practice. Therefore, the only way to keep the tool alive and thriving is to attract more organizations and individuals to maintain a shared SQL review rule repository through open source. If the code can be shared globally, so can the SQL review rules.

## Where is SQL Review Headed?

After all, SQL is code, too, which means all the reasons we review other codes also apply to SQL. At this stage, strict SQL reviewing is still essential to manage a database fleet reliably. Bytebase is also happy to take a brick and build a developer-first [SQL review tool](https://docs.bytebase.com/sql-review/review-policy) to fill this gap in the DevOps ecosystem.
