---
title: 'How to Setup Database CI/CD with GitHub, Part 3: Put Them Together'
author: Ningjing
published_at: 2022/9/9 13:00:00
feature_image: /content/docs/tutorials/github-database-cicd-part-3-put-them-together/github-howto-3.webp
tags: Tutorial
integrations: GitHub
level: Intermediate
estimated_time: '15 mins'
description: Now that you have finished Part 1 SQL Review GitHub Actions and Part 2 GitOps workflow, this final part will guide you through putting them together to run the whole process.
---

A series of articles about Database CI/CD with GitHub

- [The Database CI/CD Best Practice with GitHub](/docs/tutorials/database-cicd-best-practice-with-github)

- How to Setup Database CI/CD with GitHub Part 1-3
  - [Part 1: Enable SQL Review with GitHub Actions](/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions)
  - [Part 2: GitHub.com Database GitOps](/docs/tutorials/github-database-cicd-part-2-github-database-gitops)
  - Part 3: Put Them Together (this one)

---

Now that you have finished [Part 1: SQL Review GitHub Actions](/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions) and [Part 2: GitOps workflow](/docs/tutorials/github-database-cicd-part-2-github-database-gitops), this final part will guide you through putting them together to run the whole process.

![workflow](/content/docs/tutorials/github-database-cicd-part-3-put-them-together/workflow.webp)

As you may ask, during the GitOps process, we can configure SQL review in Bytebase console UI version, why do we need SQL review GitHub Actions? Actually, in real-world scenarios, code review including SQL files is conducted by **technical leaders** to cover the business domain, while **DBAs** review the SQL to cover the database domain. Both parties need SQL review, they just look after different aspects.

Let’s dig in and see how to do this! The detailed configuration is based on the previous two tutorials, check out them first if you come across directly to this one.

Here is a demo repo:
[https://github.com/adela-bytebase/bytebase-gitops-sample](https://github.com/adela-bytebase/bytebase-gitops-sample) with an open PR
[https://github.com/adela-bytebase/bytebase-gitops-sample/pull/11](https://github.com/adela-bytebase/bytebase-gitops-sample)

## Step 1 - Add Configure file for Prod Environment

Repeat the steps in [Part 1- Enable SQL Review GitHub Action](/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions) to configure the **prod** environment. You now have two GitHub Actions config files for **test** and **prod** environments respectively. Pay attention to **paths**, and **file-pattern**.

![conf-prod](/content/docs/tutorials/github-database-cicd-part-3-put-them-together/conf-prod.webp)
![conf-test](/content/docs/tutorials/github-database-cicd-part-3-put-them-together/conf-test.webp)

## Step 2 - Create a PR, and add your SQL scripts

1. Create a new branch `testboth`.
2. Add a migration script under `bytebase/test` folder following the name convention `{{ENV_ID}}/{{DB_NAME}}##{{VERSION}}##{{TYPE}}##{{DESCRIPTION}}.sql`. Here we name it `employeeGitHub##202208211500##ddl##add_nickname.sql`.

![add-script](/content/docs/tutorials/github-database-cicd-part-3-put-them-together/add-script.webp)

3. Commit and push this to the `testboth` branch, and create a PR in GitHub. The SQL review GitHub Actions will run automatically.

4. After the SQL review completes, the PR becomes mergeable.

![mergeable](/content/docs/tutorials/github-database-cicd-part-3-put-them-together/mergeable.webp)

5. After you merge the PR in GitHub, there will be a new issue generated in Bytebase console.

![waiting-approval](/content/docs/tutorials/github-database-cicd-part-3-put-them-together/waiting-approval.webp)

6. Approve this issue, and the SQL script will run against the **test** environment. When the issue status turns into **Done**, a file `.employeeGitHub##LATEST.sql` will be generated to record the current state of the database.
7. If everything seems OK for you for the **test** environment, you can then copy your SQL file (except the `xx##LATEST.sql`) and paste them under the **prod** folder, to trigger the schema changes on **prod** environment. Good Luck!

![last-status](/content/docs/tutorials/github-database-cicd-part-3-put-them-together/last-status.webp)

Congratulations! Now you have implemented a complete database CI/CD workflow! Let's go over the steps in the picture again:

![workflow](/content/docs/tutorials/github-database-cicd-part-3-put-them-together/workflow.webp)

1. You add a SQL script on a branch, push it, and create a PR on GitHub.
2. The configured [SQL Review GitHub Action](https://github.com/marketplace/actions/sql-review) run automatically.
3. If the SQL script passes that, you can merge it into the main branch.
4. Since your running Bytebase is configured to watch main branch, it will trigger to create an issue there.
5. The SQL review check will run on the issue again. After its run, you can approve it (You can change the settings to skip manual approval if needed).
6. The SQL script will run on your database, and the migration is done.
7. There will be an auto-generated file `.xxx##LATEST.sql`, which is the latest schema written back by Bytebase after the migration.
8. After all migrations are done, you can now deploy your application code that is dependent on the new schema.

Customize the structure to fit your own needs! Feel free to Join our [Discord channel](https://discord.gg/huyw7gRsyA) and share your experience.
