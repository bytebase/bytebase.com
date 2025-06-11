---
title: Ask Devs - Do DBAs impose strict requirements for database schema conventions at your org?
author: Mila
updated_at: 2023/04/07 21:21:21
feature_image: /content/blog/is-sql-review-necessary/banner.webp
tags: Industry
featured: true
description: Real talk, are strict requirements on database schema really necessary?
---

💡 This article is a compilation of this discussion on Reddit: [Do DBAs impose strict requirements for database schema conventions at your org?](https://www.reddit.com/r/ExperiencedDevs/comments/xcswje/do_dbas_impose_strict_requirements_for_database/)

![_](/content/blog/is-sql-review-necessary/reddit.webp)

## Background Info

The author’s team was developing new microservices and they needed to store data in SQL tables. These tables are wholly owned by the microservice and data from them is only being exposed via an API. He gave 2 examples of DBAs requesting “unnecessary” restrictions that “can potentially cause confusion down the road”, so the question is, are strict requirements on database schema really necessary?

## DingBat99999 (30 ⬆)

Maybe I'm missing something but none of the things your DBAs have requested seem unreasonable.

When it comes to constraints, in my experience, there's typically some discussion as to whether they're enforced in the application or in the database. Was there some historical decision there?

I mean, you could always tell the DBAs shirt size is implementation dependent and dynamic. Then they'd have no reason to ask for a constraint. Otherwise, YAGNI.

**💬Reply**

Enforcing the enum constraint in the database is a good practice and it sounds like you are privileged to work with a competent DBA. Strict data checking in your persistence layer is the surest way of preventing garbage from entering your system

## ccb621 (12 ⬆)

Take all of this energy, and ask the DBAs why these changes are important. If the don't already have one, volunteer to help them write a guide for to help future teams avoid this toil.

The changes seem nitpicky on the surface, but there could be a lot of hard-learned lessons below the service that warrant this level of review.

## nutrecht (7 ⬆)

I think it's totally normal to have standards for DB schema's you need to adhere to. I've seen those before. I've also seen the mess that happens when developers just do whatever the heck they want, so I can't really blame them.

So both things, the enum and the naming, sound reasonable to me. The benefit of the enum constraint in the DB is that you can never somehow end up with 'broken' data that breaks your software. I've had to deal with 'test' databases where testers directly inserted data and it was a pain in the ass to deal with.

So there are good arguments for both sides. I personally would not spend _any_ energy fighting this. Especially since you're probably going to need this DBA team somewhere down the line.

Also as a Java/Spring developer; you should work schema first. If you need to adapt a schema 'because of Spring' it generally just means you're doing something wrong.

## ViperRT10Matt (6 ⬆)

Our DBAs do not perform any functions like this. They release and manage what the developers give them. In terms of requiring changes to schemas or table designs, they function like stability control in a car; only intervening in extreme conditions to head off a truly dangerous situation.

## AdrianC9 (3 ⬆)

I work at a mid/large tech company, we do have "DBAs" (don't think they are traditional DBAs) that review database changes, however most standards are published in a wiki that should reviewed before subbitting db changes. So typically you know what to expect. As an example, we do require tables to be named in singular form, eg "tshirt" exactly for the reason you described. The ORM can then easily map everything correctly.

In regards to the db constraints, a lot of DBAs will often prefer this since it puts more control in their domain. Personally I agree that throwing things that are arguably business logic into the database is not ideal, and may result in issues in the future. That said, it's really not that big of an issue, and whenever it does break due to a conflict you can just point to that requirement.

## nderflow (2 ⬆)

The column constraints in particular are important. I've seen a company lose teens of thousands of customers and lose millions because they disabled the column constraints they already had.

The fact that a database can enforce integrity rules is one of the beauties of the modern relational database.

## check-himu (2 ⬆)

The plural convention is something we also follow and I don't have very strong feelings either for or against it. However, from experience, I will tell you that enforcing constraints in DB can be extremely helpful. With changes in code, there is always a chance of a bug that lets data you didn't want pass through. A final check at DB helps you avoid that scenario and having to do data fix later on.

## db-master (2 ⬆)

It's a common practice to enforce some level of consistency. Many hours can be saved if the engineering org can agree on the same ID format, first name, last name format and etc.

FWIW, there are tools like [GitHub SQL Review Action](https://github.com/marketplace/actions/sql-review) to enforce schema consistency in the CI/CD process.

## Our Take on SQL Review

Bytebase has built-in [SQL Review](https://docs.bytebase.com/sql-review/review-policy) capabilities that are customizable to check for issues in the schema change process. To better accommodate developers' workflow, we also [integrated SQL Review with GitHub](/blog/integrate-sql-review-into-github), allowing you to manage SQL scripts in your GitHub repos and perform SQL Review there. This eliminates the need to switch between multiple tools and, more importantly, allows SQL Review to be conducted at the PR stage rather than waiting until the deployment stage.

That being said when it comes to database schema changes, the advice is simple: don't ask. If a DBA says so, just do it!

Last but not least - this article is a mere compilation of this [discussion](https://www.reddit.com/r/ExperiencedDevs/comments/xcswje/do_dbas_impose_strict_requirements_for_database/), don't miss out on the best practices and ideas colliding in the comment area ⚡️.
