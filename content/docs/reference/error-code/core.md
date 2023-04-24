---
title: Error Code for Bytebase Core
---

Error code for bytebase core.

## General

<h3 id="0">0 - OK</h3>

Success

<h3 id="1">1 - Internal error</h3>

Something unexpected happened, you can open a [GitHub issue](https://github.com/bytebase/bytebase/issues) or [contact us](mailto:support@bytebase.com?subject=Got-internal-error).

## Database

<h3 id="101">101 - Failed to connect database</h3>

Please double check your username and password. Also check your firewall setting to make sure your database is network accessible to Bytebase.

<h3 id="102">102 - Database execution error</h3>

Failed to execute the statement.

## Migration

<h3 id="201">201 - Missing migration schema</h3>

Bytebase can't find the migration schema in the instance. When user successfully adds an instance to Bytebase, Bytebase will try to create a database called "bytebase" in the target instance. This database is the migration schema Bytebase relies on to store the migration history. Without this schema, any schema migration attempt will fail to proceed.

<h3 id="202">202 - Migration already applied</h3>

The database has already applied the version.

<h3 id="203">203 - Migration out of order</h3>

The version for migration is out of order. The database has already applied a newer version.

<h3 id="205">205 - Migration pending</h3>

The database migration is already in progress.

<h3 id="206">206 - Migration failed</h3>

The database migration failed.

## Task

<h3 id="301">301 - Task timing not allowed</h3>

The task is not ready to run, need to wait until the configured earliest running time.
