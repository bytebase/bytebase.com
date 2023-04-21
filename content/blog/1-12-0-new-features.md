---
title: 'Bytebase 1.12.0 Deep Dive'
author: Tianzhou
published_at: 2023/02/07 13:21:21
feature_image: /blog/1-12-0-new-features/1-12-0-banner.webp
tags: Explanation
description: First release of the Year of Rabbit 🐰 is out, the version number was upgraded from 1.11.0 to 1.12.0. - SQL Review Policy - Price Plan Update.
---

First release of the Year of Rabbit 🐰 is out, the version number was upgraded from 1.11.0 to 1.12.0. The release cycle was 3 weeks because of the Chinese New Year. There were 264 code commits, a bit more than the normal bi-weekly release. Let's see what new capabilities are included 👇
![github-commits](/blog/1-12-0-new-features/github-commits.webp)

## SQL Review Policy

The first is the enhancement of SQL Review policies.

We have nearly 50 rules on MySQL and TiDB to detect various non-compliant SQL statements, and there are goInception-based tools in the MySQL industry with similar capabilities.

But PostgreSQL has been blank because of the lack of parser support. To fill this gap, Bytebase developed PG parser and added 21 review rules based on parser capability. This brings the total number of PG SQL Review rules to 37.

At first glance, it looks like it is still a bit far from MySQL. In fact, this is not the case, because there are some strange syntax in MySQL, you can add ORDER BY to Insert / Update statements, which needs to be prevented the rule level. PG itself does not allow such syntax, so no additional rules are needed.

In addition to the rule engine enhancements, we have integrated SQL Review rules in the SQL editor to return violated rules in real time.

It's been a while since we began our SQL Review journey about a year ago. From the beginning we built a [SQL Review Guide](/sql-review-guide), to the implementation of MySQL-based review rules in the product based on the existing TiDB Parser, to the implementation of PG review rules in our homebrew PG Parser, to the integration of these rules into the product, we have:

1. First-grade MySQL / TiDB SQL reviewing capability on the market.
2. The only PostgreSQL reviewing capability on the market.
3. The fully integrated experience, from integration with Bytebase itself, to the integration with GitHub Action, GitHub App, GitLab CI, and API.

Of course, this is only the first phase of SQL Review, we will optimize the configuration and experience of Bytebase SQL Review rules, and then we will move on to the next phase, index optimization suggestions with the help of database statistics.

![bytebase-stage-prod](/blog/1-12-0-new-features/bytebase-stage-prod.webp)

![hub-create-sql-review-policy](/blog/1-12-0-new-features/hub-create-sql-review-policy.webp)

![sql-review-result](/blog/1-12-0-new-features/sql-review-result.webp)

![github-sql-review](/blog/1-12-0-new-features/github-sql-review.webp)

![gitlab-merge-request](/blog/1-12-0-new-features/gitlab-merge-request.webp)

## Price Plan Update

Finally, let’s talk about pricing updates. Bytebase launched a commercial version in April last year. After a year of exploration and iteration of the product itself, we decided to make a pricing adjustment in the new year.

The main change in the pricing this time is the Team Plan. Originally the cheapest plan also required an annual subscription of $4740. Under the new model, users can start from $19 / month and a monthly subscription.

Since one of the core value propositions of Bytebase is the collaboration between application developers and DBAs, and the collaboration-related features are mainly in the Team and Enterprise Plans, this pricing adjustment will enable more users to experience the collaboration capabilities provided by Bytebase.

For a formal engineering team developing serious products, we still recommend the Enterprise Plan. The capabilities of the Enterprise Plan have also been greatly enhanced in the past year. Attached is a feature comparison of the Enterprise Plan between 2022 and 2023 ⬇️

![enterprise-plan](/blog/1-12-0-new-features/enterprise-plan.webp)

Well, that's it for the feature deep dive. You can also read [1.12.0 full changelog](/changelog/bytebase-1-12-0). See you!
