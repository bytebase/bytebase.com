---
title: Database as Code - the Good, the Bad and the Ugly
author: Tianzhou
published_at: 2021/09/02 09:15:26
feature_image: /blog/database-as-code/closet.webp
tags: Explanation
description: Database-as-Code has many benefits in today's DevOps world. However, there exists several missing bricks preventing its wider adoption. We touch many points around Database-as-Code and also explain why Bytebase could help the transition.
---

This is a series of articles about Database-as-code (GitOps)

- Database as Code - the Good, the Bad and the Ugly (this one)
- [Database Version Control, State-based or Migration-based?](/blog/database-version-control-state-based-vs-migration-based)
- [What is Database Schema Drift?](/blog/what-is-database-schema-drift)
- [The Database as Code Landscape](/blog/database-as-code-landscape)

---

Before touching Database as Code, let's first addressing the more general concept, **Configuration as Code** (CaC). CaC is the practice of managing configuration resources in a source code repository. Typical configuration resources include:

- Infrastructure configuration like computation (VMs), networking resources (Load balancer). This is widely known as Infrastructure as Code (IaC) thanks to tools like [HashiCorp Terraform](https://www.terraform.io/), [AWS CloudFormation](https://aws.amazon.com/cloudformation/).
- Monitoring and alerting configuration.
- Access control policies.
- Continuous Integration (CI) /  Continuous Delivery (CD) pipeline configurations like [GitHub Actions](https://github.com/features/actions), [GitLab CI](https://docs.gitlab.com/ee/ci/).
- Feature Flags.
- Last but not least, our topic today, database schemas, aka **Database as Code**.

For some configuration resource types, it has already become the de-facto standard to manage them in the code repository such as managing infrastructure using HashiCorp Terraform, managing monitoring/altering configuration with [Prometheus](https://prometheus.io/).

> **On the other hand, for some other configuration resource types like database schemas, managing them in code repository hasn't become that popular yet. An evidence is Database as Code hasn't received its own Wikipedia page yet.**

Like managing application code, managing application database schema is the routine activity during software development. When talking about the practice of how to evolve the database schema, there are 3 rough ways:

1. Directly connect to the database, and make DDL changes. Quick but error-prone.
2. Have a review console where Developer submits a DDL ticket and let DBA review. DDL is applied to the corresponding database after review approval. This is sometimes referred as SQL review, and is UI-console based.
3. The so-called database as code, managing the database schema in version control system (VCS) like GitLab/GitHub. Whenever developer wants to make a schema change, she will create a new schema migration file containing those DDL statements and submit the file for review. After the review approval, the change will be automatically applied to the database, or in the lack of automation, the developer will apply the change manually like the 1st way.

## The Good

The industry has reached the consensus that Configuration as Code is superior than the UI based approach, managing database as code is no-exception. In our view, Database as Code has 3 appealing advantages:

1. Leverage the existing code repository infrastructure and avoid duplicate work. We get features like code versioning/branching, code search, code review, notifications and etc for free. Products like GitLab/GitHub has already invested tremendous effort into those areas.
2. Align with the Continuous Integration (CI) and Continuous Delivery (CD) DevOps workflow to automate the process of preparing a local/test database by replaying the schema migration files stored in the repository.
3. Have a single source of truth (SSOT) which is the database schema file stored in the repository. With SSOT, we can do things like drift detection, analyzing the database schema without connecting to the production DB (this would be otherwise hard since production network is usually isolated from the development network).

## The Bad

To be honest, from the pure technology perspective, there is little downsides with Database as Code approach.

> **Actually, every Google engineering team manages the database schema in the code repository and it has served them well for 10+ years.**

Compare with other approaches, the main barrier here is still the learning curve and the engineering discipline to follow the best practice. To be fair, it's a bit stretch for any practice to require Google's engineering level to adopt.

## The Ugly

Database as Code looks good on paper, but in reality, there are quite a few missing bricks preventing its wider adoption.

### Hard to setup initially

1. Team need to figure out how to organize the migration files to manage many databases for different environments.
2. To setup the automated workflow where submitted migration file triggers the schema change, one needs to obtain the VCS instance root access privilege via OAuth, setup the proper webhook in the VCS project, observe the correct directory and etc. On top of that, team may customize rules like only allowing automatic database schema changes for some environments.

### Slowed process and no continuous positive feedback loop

It definitely takes longer to apply a change via Database as Code than applying the change directly to the database. Even the pure UI-based SQL review process feels more convenient. On the other hand, although we get useful features like versioning from VCS, it requires more work to unleash the true power:

1. Features like drift detection is only possible when there are deeper integration between code repository and database server, where the former stores the code versioning info and the latter stores the schema info and the schema version history.
2. Beyond database and code repository, it requires other high level development concepts to model the collaborative development workflow to deliver an easy-to-use solution.
3. To construct a truly automated database CI pipeline, it not only requires replaying the migration schema files, but also requires to construct the testing data. This usually requires integration with the application logic.

### Not operational friendly open source database

Core feature wise, both MySQL and PostgreSQL are very capable databases. However, they are not quite operational friendly compared with proprietary ones. e.g. neither database has any built-in schema versioning support, which in turns makes it more challenge to build good tooling around them.

## Bytebase - democratize database schema management and especially Database as Code for teams

Our team at Bytebase have worked on database for 10+ years and have managed some of world's largest database fleets at [Google Cloud SQL](https://cloud.google.com/sql) and [Ant Group OceanBase](https://www.oceanbase.com/en). We build Bytebase specifically to address the barriers preventing teams adopting better practice for managing their application database schemas:

1. We provide a web-based console for teams to collaborate on database related tasks.
2. We provide step-by-step point and click wizard for users to setup database as code (if you are still on the fence, we also provide UI-based SQL review solution).
3. We design first-class models like Project, Environment, Instance, Database to help teams adopt good practice for managing database schemas.
4. We surface all schema change related activities such as running status and history, schema migration history, so that users can receive continuous positive feedback by using the system.

There are other features we don't have space to cover here and we are actively working on adding more features. Our current goal is to democratize the application database schema management for teams, just like how GitLab/GitHub democratizes source code management. And we start from tackling MySQL and later PostgreSQL, the 2 most popular open source database systems nowadays.

> _BTW, if you like this article, you might also be interested in our product [Bytebase](https://bytebase.com), an open source, web-based schema change and version control tool. Try our [live demo](https://demo.bytebase.com) or checkout our [installation guide](https://github.com/bytebase/bytebase#installation) (it only requires 1 command line, 5 seconds setup if you already have docker)._

## Reference

1. [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html) - Pramod Sadalage & Martin Fowler has a more detailed coverage on this topic.
