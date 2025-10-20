---
title: 'How I Ship Features with Postgres'
author: Tianzhou
updated_at: 2025/10/20 09:00:00
feature_image: /content/blog/how-i-ship-features-with-postgres/banner.webp
tags: Engineering
description: A practical guide to shipping features efficiently using PostgreSQL, covering development workflows, best practices, and real-world examples
---

This article focuses on my Day 1 development workflow with Postgres—the tools I use to build and ship features. I won't be covering Day 2 operations like backup, monitoring, or performance tuning in production. Instead, this is about the everyday development cycle: spinning up a local database, writing queries, managing schema changes, and running tests. These are the tools that live in my development environment and help me move from idea to deployed feature.

## Running Postgres Locally

I'm on a Mac, and my current go-to for local Postgres is [StackBricks](https://stackbricks.app/). It supports for multiple Postgres versions and other database engines beyond Postgres. Under the hood, it spins up Docker containers, which gives isolation.

I also used [DBngin](https://dbngin.com/) before, which provides a similarly smooth experience with a lightweight UI for managing local database instances.

Before discovering these tools, I was a long-time user of [Postgres.app](https://postgresapp.com/). Postgres.app is dead simple: download, click, and you have Postgres running natively. Also, I think it has the best icon among all Postgres tools.

<img src="/content/blog/how-i-ship-features-with-postgres/postgres-app.webp" alt="Postgres.app" style={{maxWidth: '200px', width: '100%', height: 'auto', display: 'block', margin: '0 auto'}} />

## SQL Editor

For writing and running SQL queries, I use [TablePlus](https://tableplus.com/). It has an elephant logo, but it actually supports a wide range of databases beyond Postgres—MySQL, Redis, SQLite, and more.

I can't point to one particular feature that makes TablePlus stand out. It's more that everything just feels smooth and easier to use compared to other tools. Part of this comes from it being built with native Mac AppKit instead of web technology—you can feel the difference in responsiveness and how it integrates with macOS. But really, it's all those small details adding up.

## Schema Migration

For schema migrations, my choice depends on the tech stack. With Go backends, I use [golang-migrate](https://github.com/golang-migrate/migrate). It's straightforward—write SQL migration files, run them up or down. No magic, just SQL.

When working with Node, I prefer [Drizzle](https://orm.drizzle.team/). The main selling point for me is that Drizzle can export the full schema. This is useful for keeping a copy of my latest database schema in the repo, which makes it easy to understand the current state without piecing together migration files.

Overall though, I think schema migration tooling for Postgres can be improved. Most tools follow the imperative migration pattern—you write a series of "ALTER TABLE" statements. That's why I built [pgschema](https://github.com/pgschema/pgschema)—a Postgres-specific declarative solution. You define what you want your schema to look like, and the tool figures out the migrations needed to get there. It's still early, but it solves a real pain point I've experienced.

## Running Integration Tests

Integration tests often need a real Postgres database.

For Node applications, I use [Testcontainers](https://testcontainers.com/modules/postgresql/). It spins up Docker containers on-demand during tests and tears them down afterward. It supports all mainstream Postgres versions.

For Go applications, I use [embedded-postgres](https://github.com/fergusstrange/embedded-postgres). Instead of spinning up Docker containers, it downloads and runs a Postgres binary directly. This saves the cost and complexity of running Docker—tests start faster, and it's one less dependency to manage.

## Type Safety

For Go applications, I use [sqlc](https://github.com/sqlc-dev/sqlc) to generate type-safe code from SQL queries. You write SQL, sqlc generates the Go code with proper types. No ORM overhead, just type-safe database access.

For TypeScript applications, I pair my database layer with [Zod](https://zod.dev/) to enforce runtime type validation. This catches type mismatches between your database schema and application code before they cause problems in production.

## For Tool Builders

As a Postgres tool builder, I heavily rely on [libpg_query](https://github.com/pganalyze/libpg_query) to parse PG statements. Most developers probably won't need it, but I want to give it a special shoutout—it's a key differentiator for Postgres compared with other database engines. It gives tool developers reliable parsing capability, which is a cornerstone to build strong tooling.

## Data Seeding

This is one area where I don't have a standard toolkit yet. I've used [Faker.js](https://fakerjs.dev/) before to generate realistic test data, but it's never become part of my regular workflow. Most of the time, I end up writing quick SQL scripts or custom seed files for each project.

I haven't found a solution that feels as smooth as the other tools in this article. If you have a data seeding approach that works well, I'd genuinely love to hear about it.

---

That's my current Postgres development toolkit. It's always evolving, what's working for you?
