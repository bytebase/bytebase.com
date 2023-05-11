---
title: The Database as Code Landscape
author: Tianzhou
published_at: 2022/06/15 09:00:00
feature_image: /blog/database-as-code-landscape/database-as-code-landscape-2022.webp
tags: Industry
featured: true
description: The idea of codifying database schema changes (aka schema migration) is not new. While we are observing an accelerated trend of embracing Database as Code (DaC) across the industry. In this blog, we will review the state-of-the-art in the Database as Code landscape and share our own insight into the current and future trends in this space.
---

This is a series of articles about Database-as-code (GitOps)

- [Database as Code - the Good, the Bad and the Ugly](database-as-code)
- [Database Version Control, State-based or Migration-based?](database-version-control-state-based-vs-migration-based)
- [What is Database Schema Drift?](what-is-database-schema-drift)
- The Database as Code Landscape (this one)

---

The idea of codifying database schema changes (aka schema migration) is not new. Many engineering teams have employed Liquibase / Flyway to adopt this practice. At the same time, we are observing an accelerated trend of embracing [Database as Code (DaC)](database-as-code) across the industry. Several innovative products have also emerged to challenge the incumbents.

In this blog, we will review the state-of-the-art in the Database as Code landscape and share our own insight into the current and future trends in this space.

## The Overview

![_](/blog/database-as-code-landscape/database-as-code-landscape-2022.webp)

## The Gatekeepers

### Liquibase

Started in 2006, Liquibase is arguably the most well-known product in this segment. When someone asks for database schema change advice on a forum, oftentimes, you will see a reply mentioning Liquibase.

![_](/blog/database-as-code-landscape/liquibase-overview.webp)

Liquibase is both an open source project as well as a company providing its commercial offering. The company used to be called Datical, and was renamed Liquibase to consolidate the branding (wise move).
Liquibase main product is a Java-based CLI. Via the CLI, developer teams can integrate the database schema migration into their CI/CD workflow. For the Java application, Liquibase can also be used as a library. Applications usually embed Liquibase library to apply any applicable schema migration on startup.

In Liquibase, a schema migration unit is encapsulated in a `Change Set`. Probably due to its age and root in Java, the most commonly used form is XML (YAML and JSON support have been added later):

![_](/blog/database-as-code-landscape/liquibase-xml.webp)

Plain SQL is also supported with proper annotation:

![_](/blog/database-as-code-landscape/liquibase-sql.webp)

Liquibase is [migration-based](database-version-control-state-based-vs-migration-based). It records the incremental change instead of the desired end state of the target database schema.

Recently, Liquibase introduced HUB, it's an information portal for paid customers to view, organize and monitor database change activity in real-time.

![_](/blog/database-as-code-landscape/liquibase-hub.webp)

### Flyway

![_](/blog/database-as-code-landscape/flyway-overview.webp)

Flyway resembles Liquibase in many ways. It's an open source project with a long history and a large customer base. Its core product includes the CLI and a Java library. Flyway also recently announced a web portal named Hub.

The commercial entity behind Flyway is Redgate through an acquisition. The branding may cause some confusion, while it also sets a boundary between the open source and commercial offering. Flyway carries a more casual branding tone:

![_](/blog/database-as-code-landscape/flyway-migration.webp)

Flyway website is not as shining as those new DevTools companies using sophisticated gradients. You can even spot some basic UI spacing issues. Yet Flyway shows a classic example that content matters more than cosmetic beauty and its documentation stands out because of the clarity.

Liquibase and Flyway are neck and neck. The major difference lies in their respective positioning. Liquibase caters to enterprise customers, while Flyway feels more accessible to the developers.

## Sqitch

Sqitch is also an open source project been on the market for a while. Sqitch is pure CLI-based and has no UI. Unlike Java-based Liquibase/Flyway, Sqitch is developed in Perl.

![_](/blog/database-as-code-landscape/sqitch-overview.webp)

Choosing Perl is not the only interesting aspect. Sqitch has its own design philosophy about how to manage database schema changes. Both Liquibase and Flyway use the file naming convention to control the schema migration behavior (convention over configuration):

![_](/blog/database-as-code-landscape/flyway-migration-version.webp)

While Sqitch takes an explicit approach. In the below example, you need to name the schema migration as `appschema`:

![_](/blog/database-as-code-landscape/sqitch-migration.webp)

If you later want to apply another migration depending on `appschema`, you need to supply with `--requires`:

![_](/blog/database-as-code-landscape/sqitch-migration-dependency.webp)

Sqitch also provides the unique tag and bundle command for the schema change deployment, which grants teams more power to wire the schema deployment into the application development lifecycle.

## The Starlets

### Atlas

![_](/blog/database-as-code-landscape/atlas-overview.webp)

Atlas is a new database schema migration tool that debuted recently. It takes traits from existing tools:

- It resembles Liquibase / Flyway / Sqitch in that it's mainly CLI focused, though it also has a lightweight UI to visualize the schema.
- It resembles Prisma in that it designs its own Domain Specific Language (DSL) to define the database schema. Originally, it chooses the same state-based approach as Prisma, but looks like it also added the migration-based approach.

![_](/blog/database-as-code-landscape/atlas-migration.webp)

- It's also heavily influenced by HashiCorp Terraform, using Go and inventing its own DSL. They even debuted as Terraform for Database Migrations on Hacker News:

![_](/blog/database-as-code-landscape/atlas-terraform.webp)

Altas current focus is on CLI. While stacking it against existing CLI tools like Liquibase / Flyway, it has the advantage of employing a modern programming language (Go instead of Java), and learnings from tools like Terraform and Prisma.

## The ORMs

Database schema migration is an integral part of the application development, thus it's no surprise popular application frameworks and ORMs provide the built-in schema migration capabilities:

- [Ruby on Rails Active Record Migrations](https://guides.rubyonrails.org/active_record_migrations.html) (Ruby)
- [Django Migrations](https://docs.djangoproject.com/en/4.0/topics/migrations) (Python)
- [MyBatis Migrations](https://mybatis.org/migrations) (Java)
- [GORM Migrations](https://gorm.io/docs/migration.html) (Go)

Though database schema migration falls into the backend category, the most recent innovation comes from Prisma, an ORM with a frontend root.

### Prisma

![_](/blog/database-as-code-landscape/prisma-overview.webp)

Node.js unlocks the pandora box for frontend engineers to build full-stack applications. We call it pandora box because it brings both prosperity and chaos. Full-stack applications consist of 3 pieces:

1. The code (stateless part).
1. The data (stateful part).
1. And how the code interacts with the data.

To a typical frontend engineer wanting to build a sustainable full-stack application, TypeScript / Express.js is solving the code problem. NoSQL databases like MongoDB are solving the data problem. Prisma is targeting the last problem of wiring code with data.

For frontend engineers, usability and accessibility are especially important. They are used to perfect pixels and HCI, and are not versed in composing SQL. To lower the barrier of managing database schemas, Prisma specifically designs a DSL:

![_](/blog/database-as-code-landscape/prisma-schema.webp)

The DSL takes the state-based approach (declarative), in that the DSL describes the desired end state of the targeting database schema instead of the incremental changes. This is different from Liquibase / Flyway / Sqitch.

Prisma also invests heavily in the integration and development workflow.

![_](/blog/database-as-code-landscape/prisma-stack.webp)

![_](/blog/database-as-code-landscape/prisma-lifecycle.webp)

Unlike its backend ORM peers, Prisma takes a refreshing approach and offers a more holistic view of managing database data and schema throughout the application development lifecycle.

![_](/blog/database-as-code-landscape/prisma-product-line.webp)

By looking at their product line, you can easily tell their ambitions are definitely not limited to being an ORM and schema migration tool.

## The Database

All tools described above work with many different database systems. While the application of Database as Code is database agnostic, there emerge new database systems promoting developer experience as a key differentiator. This developer-centric perspective as well as features like branching / cloning aligns with the mindset behind Database as Code.

### PlanetScale

![_](/blog/database-as-code-landscape/planetscale-overview.webp)

PlanetScale used to be a Vitess hosted service. They pivoted last year to focus on the developer workflow. Though you may still come across some Vitess footprint on their website, most new materials are talking about database development workflow features such as branching, online schema change, and the recently introduced rewind:

![_](/blog/database-as-code-landscape/planetscale-rewind.webp)

When we covered Prisma above, we mentioned there are 3 pillars constituting a full-stack application:

1. The code (stateless part).
1. The data (stateful part).
1. And how the code interacts with the data.

For the data part, MongoDB is a popular choice, people choose it because of its usability rather than ubiquity. For hosting mission-critical application data such as user info, customer order, and billing, you still want a SQL-based relational database. PlanetScale is based on MySQL, enhanced with Vitess scalability, and crafted for usability by the amazing PlanetScale product team. These properties make PlanetScale an attractive choice. It seems to combine the best of both worlds, retaining all the SQL database benefits while not sacrificing developer experience.

### Neon

Neon is another open source database just announced.

![_](/blog/database-as-code-landscape/neon-overview.webp)

At a high level, it shares a lot of similarities with PlanetScale, serverless, developer productivity, fully managed.

![_](/blog/database-as-code-landscape/neon-about.webp)

The major difference lies in the technology stack:

- Neon is on the PostgreSQL camp while PlanetScale is MySQL-based.
- PlanetScale leverages Vitess to offer its advanced database features, while Vitess itself is a middleware on top of the MySQL server node. Neon takes a more drastic approach to build a dedicated storage layer to offer those desired features.

Neon could have higher potential because it has better control over the entire stack. It would be very interesting to see how Neon progresses compared to PlanetScale.
The love-hate relationship between MySQL and PostgreSQL is never-ending, from vanilla MySQL vs PostgreSQL, distributed database TiDB vs CockroachDB, cloud database AWS Aurora vs GCP AlloyDB, and now to the developer-centric database PlanetScale vs Neon.

## The Misfits

### Dolt

![_](/blog/database-as-code-landscape/dolt-overview.webp)

Dolt is unique on its own. The website describes it as a database system with Git-like version control.

![_](/blog/database-as-code-landscape/dolt-about.webp)

Dolt is drastically different from other database systems because it builds an engine with built-in Git semantics. This is a double-edged sword, on one hand, it brings those desired Git properties, on the other hand, it imposes challenges of optimizing the typical OLTP workload.

Dolt takes a much bolder move to adopt Database as Code since it blurs the lines between database and code. It currently positions itself as bringing the Git semantics into the database. Would the other way around work as well or even better, bringing the database semantics into Git? After all, many applications have already used Git as the only data store.

## The Bytebase

![_](/blog/database-as-code-landscape/bytebase-overview.webp)

Bytebase is an open source project that started in Jan 2021. It also shares some traits with the aforementioned products:

- Like Liquibase / Flyway / Sqitch, Bytebase offers a CLI called [bb](/docs/cli/overview) and uses migration-based approach to apply database schema changes.
- Like Prisma, Bytebase offers a fully-fledged web UI to conduct database development activities (schema, data change, SQL query).
- Like Atlas, Bytebase employs a modern tech stack, using Go instead of Java.
- Like PlanetScale / Neon, Bytebase focuses on developer experience. One example is the VCS integration, Bytebase provides a point-and-click wizard to configure VCS (the similar experience you find in Vercel / Netlify to link the code repository):

![_](/blog/database-as-code-landscape/bytebase-vcs.webp)

Bytebase is a jack-of-all-trades and the master of team collaboration:

- A standalone developer team can host a Bytebase instance to manage database development activities.
- A DBA or platform team can also host a Bytebase instance to be used by all the product teams in the entire organization.
- It has native VCS integration to streamline the code and database development together.
  Bytebase has concepts Project, Issue because it resembles systems like Jira, GitLab / GitHub.

![_](/blog/database-as-code-landscape/bytebase-issue-detail.webp)

It also has concepts `Tenant`, `Environment` to manage database changes for multi-tenant applications spanning multiple environments.

![_](/blog/database-as-code-landscape/bytebase-tenant.webp)

Bytebase also provides built-in schema review policies to enforce the schema standard across the whole engineering organization.

![_](/blog/database-as-code-landscape/bytebase-schema-review.webp)

Bytebase is envisioned to be the counterpart of GitLab / GitHub to manage the database development aspect. It's positioned as a Database DevOps solution for team collaboration.

![_](/blog/database-as-code-landscape/bytebase-position.webp)

How Bytebase compares against other tools:

|           |    Language     |      Change Format      |             Genre             | Interface | VCS Integration | Collaboration | Multi-tenancy |
| --------- | --------------- | ----------------------- | ----------------------------- | --------- | --------------- | ------------- | ------------- |
| Liquibase |      Java       | XML / YAML / JSON / SQL |        Migration-based        |    CLI    |
|  Flyway   |      Java       |           SQL           |        Migration-based        |    CLI    |
|  Sqitch   |      Perl       |           SQL           |        Migration-based        |    CLI    |
|   Atlas   |       Go        |       Custom DSL        | State-based & Migration-based |    CLI    |
|  Prisma   |   TypeScript    |       Custom DSL        |          State-based          | CLI + UI  |       ✅        |      ✅       |
| Bytebase  | Go + TypeScript |           SQL           |       Migration-based\*       | CLI + UI  |       ✅        |      ✅       | ✅            |

_\*Though Bytebase uses migration-based approach, it records schema snapshot before and after the migration. Thus it also retains some state-based benefits such as drift detection_

## The Summaries

Though the idea of Database as Code is not new, the trend and innovation have been much accelerated in the last 2 years:

- Commercial companies like GitLab, GitHub keep investing heavily in the Git-based DevOps infrastructure.
- Commercial companies like HashiCorp leverages the Git infrastructure and build innovative products like Terraform. The success of Terraform in turn popularizes the GitOps workflow and transforms the industry mindset from point-and-click systems into code-based systems.
- The proliferation of open source ecosystem. Coincidentally, all products in this space are either open source projects or their derivations.

![_](/blog/database-as-code-landscape/star-history.webp)

- New building primitives were invented to challenge the status quo:
  - The invention of the V8 JavaScript Engine and Node.js opens the door for frontend engineers to interact with the databases directly. The flock of frontend engineers demands a high bar for developer experience.
  - Thanks to its pragmatic design and riding the wave of cloud computing, Go becomes a mainstream language and challenges the common wisdom of using Java to build backend applications. Especially in the cloud-native era, Go even dominates the market. For deploying a Java-based program, you need to install JVM first, which is not needed for Go. Just by adopting Go, tools like Bytebase and Atlas gain a competitive edge against Liquibase / Flyway. Not to mention the developer productivity boost offered by the language itself.
- Even though the database market is very mature, however, the market is too lucrative to ignore. Becoming the next Snowflake is every database practitioner's wide dream. New database systems were built and the bar has been raised higher and higher. Core database capability and performance are just table stakes, to differentiate, they have to compete for developer experience.

The iconic [Evolutionary Database Design](https://www.martinfowler.com/articles/evodb.html) was written in 2016. Though the phrase "Database as Code" was not coined there, that article summarized the accumulated wisdom of applying Database as Code practice in the decade before.

![_](/blog/database-as-code-landscape/you-do-not-need-army-of-dba.webp)

The article also predicted a trend that a sizable DBA team will become less common. Nowadays, many serious engineering teams still need DBA's expertise, meanwhile, interacting with databases has also become developers' daily routine.

The power dynamics for managing database development have shifted over time, and the quest for better developer experience and efficient developer workflow is more demanding than ever.

It requires a delicate dance among the database systems, the database tools, and the industry mindset to conquer it. Database as Code is the critical puzzle and the timing couldn't be better to build in this space.

![_](/blog/database-as-code-landscape/bytebase-land.webp)
