---
title: Bytebase 0.2.2
published_at: 2021/07/26 07:49:00
---

## 🐞 Important Bug Fixes

- **MySQL connection leak** - In the previous version, when Bytebase does not properly release the connection after finishing connecting the MySQL instance, which will cause MySQL connection pool exhaustation.

## 🚀 New Features

- **External SQL console ([detailed guide](https://docs.bytebase.com/settings/external-sql-console))** - Allow user to configure an external SQL console like phpMyAdmin. If configured, Bytebase will surface the link to the console in the relevant database and table page
- **Issue list page** - Added a dedicated page to list issues. It supports to filter based on user/project/environment/issue status.
- **Project migration history tab** - The tab lists the migration history for each database under that project. For each database, Bytebase will list at most 5 most recent migration history, and user can click the database name to view the complete migration history.

## 🎄 Experience Enhancement

- Added new 403, 404 page

## 🎠 Community

- We launched our English blog, checkout our [launch post](https://bytebase.com/blog/announce-bytebase).

_To install, follow [installation doc](/docs/get-started/install/overview). If you are upgrading from a previous version, restart after obtaining the latest release binary._
