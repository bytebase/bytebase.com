---
title: 'How to Setup Database CI/CD with GitHub, Part 1: Enable SQL Review with GitHub Actions'
author: Ningjing
published_at: 2022/9/2 13:00:00
feature_image: /content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/howto-github-1.webp
tags: Tutorial
integrations: GitHub
level: Intermediate
description: This first article will guide you to enable SQL Review GitHub actions (developed by Bytebase) when there is a pull request in your repository.
---

This is a series of articles about Database CI/CD with GitHub

- [The Database CI/CD Best Practice with GitHub](/docs/tutorials/database-cicd-best-practice-with-github)

- How to Setup Database CI/CD with GitHub Part 1-3
  - Part 1: Enable SQL Review with GitHub Actions (this one)
  - [Part 2: GitHub.com Database GitOps](/docs/tutorials/github-database-cicd-part-2-github-database-gitops)
  - [Part 3: Put Them Together](/docs/tutorials/github-database-cicd-part-3-put-them-together)

---

In the last article [The Database CI/CD Best Practice with GitHub](/docs/tutorials/database-cicd-best-practice-with-github), we raised a question: "can we treat database the same way we treat application code?" and presented a complete database CI/CD workflow with GitHub.

To bring the idea into reality, we broke it down into a three-part tutorial series **How to Setup Database CI/CD with GitHub**:

1. Enable SQL Review with GitHub Actions (this one)
2. GitHub.com Database GitOps
3. Put Them Together

You can choose to implement GitHub actions, GitOps, or both by following all three.

This first article will guide you to enable SQL Review GitHub actions (developed by Bytebase) when there is a pull request in your repository.

_Bytebase deployment is not needed for this tutorial._

![divided-workflow](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/divided-workflow.webp)

Here is a completed example repository: [https://github.com/Bytebase/sql-review-action-example](https://github.com/Bytebase/sql-review-action-example).

## Step 1 - Create a Repository on GitHub with two folders

- `.github/workflows/` to put the configuration files
- `github-action-test/` to put the test SQLs, actually you can name the folder whatever you want.

![create-repo](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/create-repo.webp)

## Step 2 - Download the SQL review guide template

1. Go to [bytebase.com/sql-review-guide](/sql-review-guide), and choose **Dev**.

![sql-review-guide](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/sql-review-guide.webp)

2. Filter with **MySQL**, now you have all the available SQL review rules. Click **Download as YAML** and you will get a YAML file called `sql-review.yml`. Rename it to `bb.sql-review.dev.yml`.

![sql-review-guide-filter](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/sql-review-guide-filter.webp)

2. Move the `bb.sql-review.dev.yml` file under your repo's root directory. Theoretically, you can put it anywhere within the project (just to make sure it's outside of .github/).

![move-template](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/move-template.webp)

## Step 3 - Configure sql-review.yml

1. Go to [SQL Review GitHub Action on GitHub marketplace](https://github.com/marketplace/actions/sql-review), and follow the **Usage** section: Create a file `sql-review.yml` under the `.github/workflows` folder, and paste the content template.

![sql-review-actions](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/sql-review-actions.webp)

2. Configure the file to fit your need.

![configure-sql-review](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/configure-sql-review.webp)

## Step 4 - Open a PR (Pull Request) to trigger the SQL Review Github Actions

1. Create a new branch.

![new-branch](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/new-branch.webp)

2. Add a `.sql` file under the `github-action-test` folder.

![add-sql-review-sql](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/add-sql-review-sql.webp)

3. Commit and push, then create a PR on GitHub. The SQL review will run automatically.

![sql-review-run](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/sql-review-run.webp)

4. Click on **Actions** tab, and you will see there are two warnings regarding this particular SQL.

![sql-review-detail](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/sql-review-detail.webp)

5. Because they’re **warning** level, you can still merge the PR.

![sql-review-complete](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/sql-review-complete.webp)

6. However, if you want this “fail” to block the merge, you can do either of the following:

- Adjust the rule to `Error` level on [bytebase.com/sql-review-guide](/sql-review-guide) before downloading the template file.

![configure-guideline](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/configure-guideline.webp)

- Or edit the level field on the review rule list directly in your YAML file.

![edit-yaml](/content/docs/tutorials/github-database-cicd-part-1-sql-review-github-actions/edit-yaml.webp)

Congratulations! Now you have enabled SQL Review GitHub Actions for your GitHub repo. In the next part of this series, we’ll explore part 2: GitHub.com Database GitOps.

Ready to try out this Database CI/CD workflow yourself? Join our [Discord channel](https://discord.gg/6JYYBXvMDF) and share your experience.
