---
title: Bytebase 1.5.0
author: Candy
published_at: 2022/09/29 16:00:00
description: "- Added \"LGTM\" inspection for issues, allowing multiple members to review the same issue. - Improved the latency of syncing or adding PostgreSQL databases. - Added the \"disallow commit\" SQL review rule for MySQL. It will disallow users to use \"commit\" in SQL statements if enabled."
---

## 🚀 New Features

- Added "LGTM" inspection for issues, allowing multiple members to review the same issue.

## 🎄 Enhancements

- Improved the latency of syncing or adding PostgreSQL databases. 
- Added the "disallow commit" SQL review rule for MySQL. It will disallow users to use "commit" in SQL statements if enabled.
- Support one-click to disable the automatic backup policy for all databases in one environment.
- Added task checks for PITR issues.
- Improved user experience for SQL Editor. 

## 🐞 Notable bug fixes

- Fixed an issue where schema drift anomalies can not be removed after creating a new baseline.
- Fixed canceled tasks' status after restarting a Bytebase server. 

## 📕 Installation and Upgrade

Follow https://github.com/bytebase/bytebase#installation. If you upgrade from a previous version, just restart after obtaining the new release binary.
