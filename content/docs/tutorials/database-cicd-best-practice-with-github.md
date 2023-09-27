---
title: The Database CI/CD Best Practice with GitHub
author: Changyu
published_at: 2022/08/31 15:15
feature_image: /content/docs/tutorials/database-cicd-best-practice-with-github/database-cicd-best-practice-with-github.webp
tags: Tutorial
integrations: GitHub
level: Intermediate
description: We already have CI/CD for code delivery, why not the database? Imagine applying and deploying database changes the same way you would application code.
---

_Wanna GitLab instead?_ 👉 [The Database CI/CD Best Practice with GitLab](/docs/tutorials/database-cicd-best-practice-with-gitlab)

A series of articles about Database CI/CD with GitHub

- The Database CI/CD Best Practice with GitHub (this one)

- How to Setup Database CI/CD with GitHub Part 1-3
  - [Part 1: Enable SQL Review with GitHub Actions](/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions)
  - [Part 2: GitHub.com Database GitOps](/docs/tutorials/github-database-cicd-part-2-github-database-gitops)
  - [Part 3: Put Them Together](/docs/tutorials/github-database-cicd-part-3-put-them-together)

---

Database change is a tricky part of the application development process: it usually involves multiple databases from different environments and cross-team collaboration, to add on top of it, databases are touch and go. It got us thinking: **can we treat database the same way we treat application code?**

DORA (DevOps Research & Assessment) [pointed out](https://cloud.google.com/architecture/devops/devops-tech-database-change-management) that integrating database work into the software delivery process positively contributes to continuous delivery. It’s about time to make databases a part of the CI/CD cycle.

But how does it work, really?

## Critical Elements of Database CI/CD

To answer the "how", we first need to sort out the typical database change workflow. Before SQL statements can be safely applied to the database, there are two key steps: **review & change**.

### SQL Review

This step is to make sure that the changes:

1. Implement the business logic accurately;
2. Follow database design best practices;

Here, the devs are generally responsible for the former task and the DBAs for the latter. The DevOps philosophy looks to solve this problem by integrating Ops and Devs. The reality is that when DBA exists in an organization, it is difficult to merge the two teams directly. One potential solution is to retain the DBA’s task while enabling dev teams to pre-review the SQL. This **shift-left approach** can significantly reduce the chance of release delays. Moreover, if there are no DBAs in an organization, then it is even more crucial to empower the dev team with the capability to make sure the SQL doesn’t wreak havoc on the database.

### SQL Change Execution

This step is to make sure that:

- **Statements are executed correctly.** We don’t want wrong database connections, insufficient permissions, object name conflicts, or basic syntax errors on our hands.
- **All planned statements are executed.** Omissions may occur when there are many scripts to be executed or if there are multiple target databases for batch execution.
- **The change executions process should not impact the business.** Hardware resource exhaustion and locking the table for an extended period are not pleasant for the company.

To avoid change-related errors, reducing the manual aspects is also crucial: the more things are automated, the fewer chances for mistakes to happen. Pre-configured pipelines to automatically apply SQL to the databases? That sounds rad. In order to avoid affecting regular business operations negatively, various zero-downtime change techniques should be adopted, especially for databases with large datasets.

Thus, the critical elements for implementing Database CI/CD should **enable dev teams to perform SQL reviews** and **streamlined SQL change rollout**.

## SQL Review and Change Rollout with VCS Integration

Let’s first explore how to enable the dev teams to perform SQL reviews themselves.

Very few developers are experts at reviewing SQL statements for "architecturally correctness" and even for senior DBAs, the manual checks can be highly inefficient and error-prone. Fortunately, the industry has created various automated review tools by integrating different SQL check specifications.

However, these tools have one common problem - they are all designed for the DBAs. On the one hand, these tools often require higher operational privileges to the databases and are thus not suitable to be used directly by developers. On the other hand, developers have their IDE, and a separate external arbitrator is the last thing they need. Imagine how bad it would be when you have to copy & paste code between multiple tools.

So what should a developer-friendly SQL review tool look like?

We usually perform the traditional code review process on version control systems (VCS), and the same should be applied to SQL. Therefore, SQL review tools should be integrated into the code review workflow. Bytebase has made [SQL Review Action available on the GitHub Marketplace](https://github.com/marketplace/actions/sql-review); once enabled, SQL Review Actions will be triggered as you submit PR on GitHub.

![sql-review-gha](/content/docs/tutorials/database-cicd-best-practice-with-github/sql-review-gha.webp)

![sql-review-actions](/content/docs/tutorials/database-cicd-best-practice-with-github/sql-review-actions.webp)

Let’s look at how to implement streamlined SQL change rollouts.

Standalone SQL deployment tools are not uncommon. These tools typically upload SQL scripts manually, proceed with the deployment via an approval flow, and then provide feedback after the rollout is complete. This model accurately depicts how the developers and the DBAs work independently, and the fragmented process is one of the most common reasons for delayed releases. After all, who can guarantee that there will never be a mistake when you are constantly moving SQL scripts between multiple systems manually?

We need a more efficient and automated release process. Let’s recall the classic CI/CD workflow for application code: commit changes > code review > merge branch > auto-build > auto-deploy. **Since we’ve already implemented SQL review on GitHub Actions, why can’t we include the subsequent rollout process?**

Well, yes, we can!

A SQL change rollout tool for Database CI/CD should have the ability to integrate with VCS. Once your SQL scripts have been vetted and merged into the target branch, the release process is triggered, and the scripts are automatically pushed to Bytebase. Of course, the DBA can perform another sanity check before executing the SQL against the target database.

![create-table-github](/content/docs/tutorials/database-cicd-best-practice-with-github/create-table-github.webp)

![bytebase-vcs-issue](/content/docs/tutorials/database-cicd-best-practice-with-github/bytebase-vcs-issue.webp)

## A Complete Database CI/CD Workflow

Here, we present **a complete Database CI/CD workflow**:

![database-devops-workflow](/content/docs/tutorials/database-cicd-best-practice-with-github/database-devops-workflow.webp)

1. The developer creates a Merge Request / Pull Request containing the SQL migration script;
2. SQL Review Action is automatically triggered to review SQL and offers suggestions to assist the code review;
3. After several possible iterations, the team leader or another peer on the dev teams approves the change and merges the SQL script into a branch;
4. The merge event automatically triggers the release pipeline in Bytebase and creates a release ticket capturing the intended change;
5. (Optional) A DBA or a designated reviewer may review the change scripts via Bytebase’s built-in UI;
6. Approved scripts are executed gradually according to the configured rollout stages;
7. The latest database schema is automatically written back to the code repository after applying changes. With this, the Dev team always has a copy of the latest schema. Furthermore, they can configure downstream pipelines based on the change of that latest schema;
8. Confirm the migration and proceed to the corresponding application rollout.

This workflow fits in nicely with the existing CI/CD process and is natural to the Developers. Acute readers may have already spotted the described steps are an implementation of the landmark article [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html).

Ready to taste this Database CI/CD workflow yourself? Join our [Discord channel](https://discord.gg/huyw7gRsyA) and share your experience.

## Further Readings

- [How to integrate SQL Review into Your GitLab or GitHub CI/CD](/docs/tutorials/how-to-integrate-sql-review-into-gitlab-github-ci/)
- [The Database CI/CD Best Practice with GitLab](/docs/tutorials/database-cicd-best-practice-with-gitlab)
- [Database as Code - the Good, the Bad and the Ugly](/blog/database-as-code)
