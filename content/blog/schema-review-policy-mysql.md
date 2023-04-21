---
title: 'Introducing Schema Review Policy for MySQL'
author: Candy
published_at: 2022/06/15 10:39:19
feature_image: /blog/schema-review-policy-mysql/schema-review-policy-cover.webp
tags: Announcement
integrations: MySQL
description: This post introduces a new feature - schema review policy, which help DBAs and application developers compose better schema change statements.
---

Bytebase is an open-source database DevOps tool, and it’s the GitLab for managing databases throughout the application development lifecycle. It offers a web-based workspace for DBAs and Developers to collaborate and manage the database change safely and efficiently.

The trend of codifying database schema changes (aka Database as Code) has accelerated in recent years. Today, there exists a bunch of tools to check the code quality; however, the ability to check SQL statement quality is quite lacking.

As the trailblazer to embrace Database as Code, Bytebase aims to lift the developer experience of working with SQL. Today we are introducing a new feature - schema review policy, a set of SQL quality checks to help DBAs and application developers compose better schema change statements.

## What is Schema Review Policy?

A schema review policy is a set of SQL-style rules to check the SQL statement quality. DBAs can configure schema review policies for each environment. Bytebase will check SQL statements automatically before executing schema changes and block them if any configured policies are not met.

The schema review policy is available to MySQL and TiDB. PostgreSQL support will be coming soon.

## Rules in Schema Review Policy

This initial launch includes 15 rules across 6 categories.

### Naming conventions

- Table naming check
- Column naming check
- Unique key naming check
- Index naming check
- Foreign key naming check

### Statement

- Disallow “SELECT \*”
- Require “WHERE”
- Disallow leading wildcard % in LIKE

There are countless stories about the performance issue and database outages caused by bad SQL statements. Bytebase provides these rules to avoid the common problem.

### Table

- Require primary key

It is hard to identify a particular record for a table without a primary key. Bytebase provides the rule - “Require primary key” to enforce each table to have a primary key.

### Schema

- Backward compatibility check

Introducing backward-incompatible schema changes is one of the most common mistakes made by developers. And enforcing backward-compatible schema change is the standard practice many engineering organizations adopt. Bytebase provides the built-in backward compatible check to catch all common incompatible schema change scenarios.

### Column

- Required columns: make sure all tables have the required columns
- Disallow NULL: all columns can not have a NULL value

### Engine

- Require InnoDB

InnoDB is the default storage engine of MySQL 5.5+ with powerful transaction features.

## How to Configure Schema Review Policy

Bytebase provides a schema review policy template based on the industry best practices. You can apply it to your production environment directly. Of course, you can create your own schema review policy based on it.

Let’s begin configuring a policy from the environment dashboard.

**Step 1**. Select the tab “Prod” on the environment dashboard, and click the button “Configure policy” at the bottom of the page.

![step1](/blog/schema-review-policy-mysql/schema-review-policy-step1.webp)

**Step 2**. Select the template “Production Environment Template” and click the button “Next”.

![step2](/blog/schema-review-policy-mysql/schema-review-policy-step2.webp)

**Step 3**. Modify the error-level and rule-specific fields for rules, then click the button “Next” to preview your schema review policy.

![step3](/blog/schema-review-policy-mysql/schema-review-policy-step3.webp)

**Step 4**. Click the button “Confirm and add” to apply your policy to the environment.

![step4](/blog/schema-review-policy-mysql/schema-review-policy-step4.webp)

Now you can see the schema review policy that you jsut created on the page below.

![dashboard](/blog/schema-review-policy-mysql/schema-review-policy-dashboard.webp)

## How Schema Review Policy is Used

When you create an issue in an environment configured with a schema review policy, Bytebase automatically checks SQL statements and shows the schema review result. Take the screenshot below as an example. It shows that the input SQL statement does not meet the configured policies.

![issue](/blog/schema-review-policy-mysql/schema-review-policy-issue.webp)

You can get more details by clicking the button “SQL review”.

![details](/blog/schema-review-policy-mysql/schema-review-policy-details.webp)

Please try it out. If you want to suggest additional rules, please [let us know](https://github.com/bytebase/bytebase/issues) .
