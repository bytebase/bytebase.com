---
title: 'Database Migration: SQLite to PostgreSQL'
author: Danny
published_at: 2022/04/15 06:37:17
feature_image: /content/blog/database-migration-sqlite-to-postgresql/migration.webp
tags: Engineering
description: This article describes the story of Bytebase migrating its storage from SQLite to PostgreSQL and the challenges on the way.
---

## Prologue

Tianzhou: Hey Danny, I don't think SQLite is good for our long-term game. I started with it because it is easy to use for local development.

Danny: We're launching Bytebase public in a couple of weeks. We should make a decision right now. I'm with you, SQLite is charming but it's a database for localhost only. I'm not seeing it in the architecture picture of Bytebase as a Cloud product. Some users want to run Bytebase container on Heroku, Render, and Google Cloud Serverless with persistent storage but they cannot do it today with SQLite.

Tianzhou: Right, and some features in the plan require time-series which isn't supported by SQLite.

Danny: SQLite schema update has limitations too. For example, altering column constraints isn't supported, and many other things. This makes it difficult to upgrade Bytebase version with schema changes later.

Tianzhou: It will be difficult to migrate existing customers later.

Danny: Yes, let's do this! How about PostgreSQL? I know we both like it.

Tianzhou: That sounds good. By the way, I want to provide the same one-click installation user experience today without requiring users to install and connect to PostgreSQL themselves.

Danny: We can either package PostgreSQL into our binary or build it into our Docker image. I prefer the former because not all users will use Docker. Hey, I found another reason to use PostgreSQL instead of MySQL. The compressed PostgreSQL package for Linux is about 13MB (Darwin 27MB), however, the MySQL package is 200+MB. I just wrote a 36-line unit test to simulate what I just talked about and it seems to work!

Tianzhou: Sweet. Oh, you used Go embed to stuff the package.

Both: We went down the street to stuff our stomachs first.

## Navigation

I wrote down the following lines in a note because it is so important to build a plan for any engineering project. This is the exact recipe that Google uses to migrate storage systems except we don't have to migrate existing data this time luckily.

1. Install PostgreSQL at Bytebase start-up time.
2. Create a PostgreSQL database schema that's equivalent to the one for SQLite.
3. Write to both SQLite and PostgreSQL.
4. Switch reads from SQLite to PostgreSQL.
5. Clean up the dual-write code.

We started with packaging both PostgreSQL Linux and Darwin packages using [Go embedded](https://pkg.go.dev/embed). When Bytebase starts, we will unzip the package, run initdb to set up the database if not yet, then run the PostgreSQL server. There is a lot of optimization that we did later including,

- Make PostgreSQL installation and setup idempotent to handle failures in the middle.
- Turn off the listening port and use a Unix domain socket for connections. This improves security by not exposing the port and improves the host conflicting port scenario.
- Use [Go build tags](https://pkg.go.dev/go/build) to only embed the PostgreSQL package for the binary platform for reducing Bytebase binary size.
- Support running Bytebase as a Linux root user while running PostgreSQL as a non-root user, because PostgreSQL cannot run as the root user.

We had a [complex SQLite schema](https://github.com/bytebase/bytebase/blob/0.13.0/store/migration/10001__init_schema.sql) with 1K+ lines. To find the [PostgreSQL equivalent schema](https://github.com/bytebase/bytebase/blob/release/v1.0.2/store/migration/10001__init_schema.sql), we execute the SQLite DDLs against PostgreSQL and resolve failures one by one. Here are some noticeable differences between them.

- AUTOINCREMENT becomes SERIAL.
- Keywords: some column names such as "grant" are the keywords in PostgreSQL. They should be escaped with double-quotes.
- Row update time trigger DDL is different.
- It is different to change the sequence starting value.
- Now() timestamp.

<table>
<thead>
<tr>
<th>
SQLite
</th>
<th>
PostgreSQL
</th>
</tr>
</thead>

<tbody>
<tr>
<td>
<pre>
CREATE TABLE principal (
    id SERIAL PRIMARY KEY,
    "grant" TEXT NOT NULL
);
</pre>
</td>
<td>
<pre>
CREATE TABLE principal (
    id SERIAL PRIMARY KEY,
    "grant" TEXT NOT NULL
);
</pre>
</td>
</tr>

<tr>
<td>
<pre>
CREATE TRIGGER IF NOT EXISTS `trigger_update_principal_modification_time`
AFTER
UPDATE
    ON `principal` FOR EACH ROW BEGIN
UPDATE
    `principal`
SET
    updated_ts = (strftime('%s', 'now'))
WHERE
    rowid = old.rowid;
</pre>
</td>
<td>
<pre>
CREATE OR REPLACE FUNCTION trigger_update_updated_ts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_ts = extract(epoch from now());
  RETURN NEW;
END;
LANGUAGE plpgsql;
CREATE TRIGGER update_principal_updated_ts
BEFORE
UPDATE
    ON principal FOR EACH ROW
EXECUTE FUNCTION trigger_update_updated_ts();
</pre>
</td>
</tr>

<tr>
<td>
<pre>
INSERT INTO
    sqlite_sequence (name, seq)
VALUES
    ('principal', 100);
</pre>
</td>
<td>
<pre>
ALTER SEQUENCE principal_id_seq RESTART WITH 101;
</pre>
</td>
</tr>

<tr>
<td>
<pre>
strftime('%s', 'now')
</pre>
</td>
<td>
<pre>
extract(epoch from now())
</pre>
</td>
</tr>
</tbody>
</table>

Then it is a lot of engineering work to update existing SQL queries. SQLite (similar to MySQL) dialect uses the question mark parameters while PostgreSQL uses positioned parameters for prepared statements. Because we break down into multiple smaller changes, the changes for table writes should be implemented in topological sorting order if there are foreign keys. For example, if the author table is referenced by the book table, we should perform dual-writes to the author table first in a change, then do dual-writes to the book table as a follow-up change.

<table>
<thead>
<tr>
<th>
SQLite
</th>
<th>
PostgreSQL
</th>
</tr>
</thead>

<tbody>
<tr>
<td>
<pre>
SELECT name FROM principal
WHERE age > ? AND city = ?;
</pre>
</td>
<td>
<pre>
SELECT name FROM principal
WHERE age > $1 AND city =$2;
</pre>
</td>
</tr>
</tbody>
</table>

Mission completed! Real word navigation has a different feeling. After spending a couple of days in a hotel room, I decided to hang out with friends and visit some popular shops in Downtown Shanghai together. Yup, we got lost on the street constantly without having a written-down plan.

![_](/content/blog/database-migration-sqlite-to-postgresql/city-sculpture.webp)_Picture of an interesting place @ Downtown Shanghai_

## Retrospect

SQLite is still good for many on-device use cases while PostgreSQL is more ubiquitous. As an extra story, Bytebase does support external database options later as an [open-source community contribution](https://github.com/bytebase/bytebase/issues/1027). This enables customers to run Bytebase in a k8s cluster container with persistent database storage elsewhere.

As part of the effort, we are really following [Life of a Feature](https://github.com/bytebase/bytebase/blob/main/docs/life-of-a-feature.md) established at Bytebase with influences from Google's engineering best practices. We'd like to highlight these points which really helped to make our database migration go smoothly.

- Write a design first. It is really just the words we wrote down in a small note above. It helps the author to figure out a clear and executable plan, and it is also useful to get peers to double-check the plan or suggest better alternatives if any.
- Break down into small changes with proper reviews. This is the key to making firm and fast moves.
- Testing. We are very fortunate this time because we added Go end-to-end integration tests right before this database migration project. The test will start a real Bytebase server, simulate end-user behavior by calling APIs, and cover most of the critical user journeys. We will know whether a change is working by simply running the "go test" command instead of clicking hundreds of buttons on the web UI.

Bytebase offers a web-based collaboration workspace to help DBAs and Developers manage the lifecycle of application database schemas. People might be curious how Bytebase manages its own database schema. We will chat about it next time.
