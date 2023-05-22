---
title: How Do You Handle Database (Schema) Migrations?
author: Tianzhou
published_at: 2023/05/19 18:21:21
feature_image: /blog/how-to-handle-database-migration/banner.jpeg
tags: Industry
featured: true
description: We can't avoid database schema changes, but we can make them less painful. Meeting Bytebase, a database change tool that incorporates the best practices of treating database changes like code changes and separating code changes from database changes.
---

I recently noticed this post in Reddit's r/golang entitled "[How do you handle migrations ?](https://www.reddit.com/r/golang/comments/12mypec/how_do_you_handle_migrations/)" It got 40+ replies in less than a day.

![_](/blog/how-to-handle-database-migration/reddit.webp)

True that database schema changes have always been a headache for developers, but can't avoid because business needs to develop and products need to iterate. Adding new features often means modifying database structure, such as adding a new field to save new information, which involves database schema changes.

Let's take a look at the 2 concerns raised by the author:

**1 - Lack of visibility of changes**

The developer or the DBA may connect directly to the database and execute the change, and only the person knows what statement was executed and when it was executed (or they might just forget).

**2 - Ensuring the uniqueness and exclusivity of changes**

An app usually has multiple deployments, but all connected to the same database. From the description, it appears that the author was trying to update the database when a new version deploys. So the question is, when multiple copies of the new version are deployed at the same time, how exactly to guarantee that only one of the copies can make changes to the database while the others wait?

The author ends up asking for best practices and tools that can be used in a production environment. From a best practice perspective, there are 2 main points:

1. Treat database changes like code changes
2. Separate code changes from database changes

Bytebase is a database change tool that incorporates this set of best practices.

## Treat your database changes the same way you treat code changes

Let's look at a typical code change process:

1. A change request is submitted to a code repository, such as GitLab (Merge Request, MR) or GitHub (Pull Request, PR).
2. Say you've enabled some sort of action, the MR / PR will first go through a series of automated checks, for example, whether the code can be compiled or it conforms to the coding specification, followed by a series of automated tests.
3. One or more reviewers will review the code (Code Review).
4. Afterwards, the code is submitted to the repository and the commit history is recorded.
5. After a manual or automated process, the code is packaged into a new version, an **Artifact**, in technical terms.
6. The deployment system gradually deploys the new version according to a pre-configured process. Usually it is first deployed to a test environment where integration tests are run, and possibly manual tests by the QA team. After that, it will be deployed to the pre-release environment. If the verifications pass, it will eventually be deployed to the production environment. Of course, in the production environment, the new version will be gradually updated little by little, which is also known as the **grayscale release**.

The CI/CD process, as we know, is not complicated, but it took more than 20 years for the industry to figure out and agree upon, which solves a series of problems such as collaboration, visibility, reliability, and efficiency in code changes and releases.

As for database changes, because it involves data change, that is, the **state**. Although the process can be borrowed from the idea of code change, it is still more complicated.

Bytebase is such a set of tools to introduce the process of code changes to database changes.

### Visualized Change UI

![_](/blog/how-to-handle-database-migration/change-ui.webp)

Bytebase provides a web-based GUI for developers and DBAs to collaborate on database changes.

### Automated SQL Review Policies

![_](/blog/how-to-handle-database-migration/sql-review-setup.webp)

Bytebase has 100+ SQL review rules built-in, using the shift-left approach to pre-screen change scripts submitted by developers, before DBAs intervene.

### Database as Code

![_](/blog/how-to-handle-database-migration/google.webp)

Bytebase is an evangelist for Database-as-Code. As per Google, Bytebase is ranked #1 for Database as Code, ahead of established vendors like Liquibase and DBmaestro.

![_](/blog/how-to-handle-database-migration/gitops.webp)

Bytebase is the only tool in the industry that provides a point-and-click interface to configure a GitOps workflow, similar to the Terraform Cloud / Vercel experience. Once configured, devs can submit database change scripts through their familiar code repos. The deployment process will be automatically triggered by Bytebase after the review and submission to the code repo is complete.

### Batch changes (Enterprise Plan)

Changing one database is hard enough, let alone a batch of databases at the same time. This is actually very common in enterprises. For example:

- Different environments correspond to different databases;
- SaaS companies usually assign a separate database to separate tenants;
- For gaming companies, different servers correspond to different databases.
- Due to disaster recovery or data compliance requirements, different regions may also deploy their own databases;
- Of course, let's not forget the common database sharding technique for Internet companies.

Bytebase allows you to [change a collection of databases with identical schemas](/docs/batch-change/multi-tenant-change/), as shown in the figure below: changing the database of a hospital SaaS system, for different hospital tenants in different environments, in just one sitting.

![_](/blog/how-to-handle-database-migration/batch-changes.webp)

### Custom Approval Flow (Enterprise Plan)

We recently introduced [custom approval flow](/docs/administration/custom-approval/#rules) based on risk level. You first define the risk level of operations done to your databases and configure the corresponding approval flows according to the different risk levels.

![_](/blog/how-to-handle-database-migration/custom-approval.webp)

![_](/blog/how-to-handle-database-migration/create-approval-flow.webp)

The approval flow can be customized, thanks to Bytebase's [**Project**](/docs/concepts/data-model/#project) concept, meaning you can specify the approvers of a specific project.

## Separate code changes from database changes

An application has two major components: code and data, the former is called **stateless** and the latter **statefull**. Stateless changes are relatively easy to solve, because if there is a problem with the change, you can simply roll back and be done with it. But stateful changes are much more complicated: you have to consider whether it will lock the database and lead to unavailability of the whole service, plus rollback is much harder because of dirty data.

When small teams first start out, they usually put database and code changes together, but as the Reddit author encounters, when they scaled up, they faced problems:

1. When changes go wrong, there is little control. The application will not start, which requires manual intervention.
2. Some changes take a long time to complete, which means downtime when deploying new releases.
3. This approach isn't suitable for applications that have multiple server instances accessing the same database. This is because any one server instance can execute changes and additional locking mechanisms are needed to coordinate changes (the problem mentioned above)
4. This also doesn't work well for teams with a dedicated DBA or platform engineering team to centrally manage the databases. The person has no way to know when a change has occurred; they will only find out that it was caused by a reckless change after receiving a monitoring system alert and spending a lot of effort to diagnose.

Stateful data and stateless code are two different species. While there are centralized CI/CD platforms like GitLab / GitHub + Octopus / Jenkins for releasing code changes, Bytebase plays a similar role in releasing **changes to the database**.

![_](/blog/how-to-handle-database-migration/bytebase-landscape.webp)

That's why Bytebase can also be referred to as the GitLab for databases, taking on the role of Database DevOps. Like GitLab, we have adopted a similar open-source strategy, offering both a hosted SaaS service and self-host options.

## Upgraded Free Plan for teams to make secure and efficient database changes

There are community projects like Yearning and Archery maintained by individuals on the market, while Bytebase takes on the commercial path and has a fully established R&D team.

Bytebase offers a free plan, and we recently adjusted the positioning of it to cover all scenarios of a centralized database lifecycle for most R&D teams. In terms of functionality, the **free plan** has been significantly boosted:

1. [RBAC](/docs/concepts/roles-and-permissions/#workspace-roles), previously only available in the paid plan, is now free.
2. 100+ [SQL review](/docs/sql-review/review-policy/overview/) policies are now available in the free plan.
3. No longer a limit of 10 users and 10 instances, but an unlimited number of users and up to 20 instances.

Accordingly, because the free plan also has enough capability to serve teams, we switched up the name of the (previously) paid Team Plan to the Pro Plan.

The reason for this adjustment is that after more than 2 years of development, we are confident that we can provide differentiated features to our enterprise customers on top of the free plan that covers even more scenarios. For example, single sign-on, custom approval flow, batch change, environment classification, data masking, access control, watermarking, audit log, read/write separation, etc. are all capabilities specifically for our enterprise customers.

![_](/blog/how-to-handle-database-migration/change-ui.webp)

Bytebase aims to help DBA and developer teams from different industries to manage the change, query, security and governance of databases, on and off the cloud, across different clouds.

Just like GitLab / GitHub when it comes to code hosting, Prometheus / Grafana when it comes to monitoring dashboards, and Terraform when it comes to multi-cloud management, Bytebase is going for the default tool for database development management.
