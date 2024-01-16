---
title: How many DBAs should a company hire
author: Tianzhou
published_at: 2024/01/15 09:00:00
feature_image: /content/blog/how-many-dbas-should-a-company-hire/freedom-control.webp
tags: Industry
featured: true
description: Discuss the DBAs HCs for companies of different sizes
---

It's the beginning of the year and companies are planning their HCs for the new year. With the advent of advanced database platforms and tooling, the industry is trending towards decreasing or even eliminating DBAs (Database Administrators). We have been working with companies of all sizes in the past and below share our thoughts.

To clarify, the DBA role we are talking about is the role dedicated to database operational tasks. The person may hold different titles, including Database Administrator (DBA), Database Reliability Engineer (DRE), SRE, Platform Engineer, DevOps Engineer, etc.

## < 30 - No need to have a dedicated DBA

When the company's engineering HC is below 30, there is no need for a DBA. Usually, the backend engineers, DevOps / Platform engineers, or TLs in the team take up part-time responsibilities at this stage.

At this stage, it is recommended to choose a cloud database hosting service, because it comes with out-of-the-box tooling such as monitoring and backup. As for daily changes to the database, you can introduce tools or not. If you don't introduce it, the TL can cope with it through design review, code review, etc.

## 30 to 50 - First DBA and tooling

The database-related tasks have increased and part-time can not sustain. At the same time, because the business is beginning to take off, it is necessary to pave the way for longer-term data quality and governance. Therefore, at this stage, the company needs to consider introducing a dedicated DBA to take charge of database-related matters.

With the introduction of the first DBA, the introduction of relevant database tools should also be considered. As for the exact timing, one is to look at the proportion of the database-related workload, 50% is the watermark. Another is to see whether more than 50% of the high-priority work items of the entire engineering org are database-related. Of course, another indicator is the number of database-triggered outages. If there have been incidents in two consecutive months, then the introduction of a DBA is imminent.

Usually at this stage, the company still has difficulty attracting a good DBA, and that's OK. The first DBA does not need to build a system, just establishes a process. The process is divided into two parts, one is to formalize the database's operational and maintenance tasks, such as monitoring, periodic fleet inspection, and backup. The other part is to standardize the process of database access and change management. Both things need to leverage tools. The former usually leverages the cloud platform with the proper configuration; the latter requires 3rd party tools such as [Bytebase](/docs/introduction/what-is-bytebase/) to standardize the process (e.g. Require manual review before changing the database in prod).

![change-query-secure-govern-database-all-in-one](/images/db-scheme-lg.png)

At this stage, it is also necessary for the engineering lead to be supportive. Because the introduction of DBA and process will limit the developers' freedom. Because DBA and Developers have different incentives, and DBA is new to the team. We need the engineering lead to mediate between the two sides to avoid conflict. In the end, at this stage, the business is still the absolute priority, so if the developers do not buy in, they can find excuses to bypass the policies that DBA establishes.

![_](/content/blog/how-many-dbas-should-a-company-hire/freedom-control.webp)

Meanwhile, the engineering lead should also focus on mentoring the DBA, so that she can grow with the company into the next stage.

## 100 - Second DBA

Typically, when the engineering team size reaches 100, it is necessary to bring in a second DBA to form a backup. If the first DBA grows up, then the second DBA can be a junior. However, if the first DBA does not keep up with the company's growth, then it is necessary to introduce a relatively senior DBA.

At this stage, DBA must examine the current database stacks and standardize on very limited choices (e.g. Pick either MySQL or PG, not both). The key are two things, choosing the right database and the right tool. This is also why we need a seasoned DBA. After this stage, it will be a huge endeavor to switch databases and tooling, so it's more cost-effective to find an experienced DBA now.

## 200 - Team DBA

We see cases of public companies maintaining a two-DBA setup for a long time. However, the number of DBAs is correlated with database risk. **The empirical rule is the DBA:Developer ratio should not be less than 1:200**. The DBA cost can be justified if she can prevent one outage per year, which is quite easy to achieve.

At this stage, it's also quite often that the DBA team needs to extend the standard 3rd-party tools to meet the custom in-house requirements. This can go as far as GitHub, where they build the [entire toolchain to automate the database schema migrations](https://github.blog/2020-02-14-automating-mysql-schema-migrations-with-github-actions-and-more/).

## Wrapup

| Engineering Org Size | DBA Size                               | Core Responsibilities |
| -------------------- | -------------------------------------- | --------------------- |
| Below 30             | 0                                      | Run                   |
| 30 to 50             | 1                                      | Establish process     |
| 50 to 200            | 2 ~ 3                                  | Governance            |
| Above 200            | DBA:Developer ratio no less than 1:200 | Customization         |

## Do we need DBA at all

> A skilled warrior has no illustrious achievements - The Art of War by Sun Tzu

Cloud, Serverless, and Autonomous DBs, all suggest a path to a future without DBAs. However, dealing with database operations is still a specialized skill and also bears high risk. Even for companies not having the luxury to hire a DBA, a database person should always be put in place. This is quite similar to the security team.

The stakes are so high that one can't blindly trust an index optimization suggestion and must take a second eye. It's better to let the database platform and tools be the copilots and still put the dedicated DBA in the driver seat.

Meanwhile, companies can also consider hiring 3rd-party DBA consultants such as [Vettabase](https://vettabase.com/). For small companies, they provide database health checks and monthly DBA time. For larger companies, they can also provide expertise with technologies that DBAs are not familiar with, such as certain load balancers, query optimization, or Ansible/Terraform automation.
