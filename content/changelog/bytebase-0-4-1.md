---
title: Bytebase 0.4.1
published_at: 2021/08/31 07:52:00
---

Update instruction

- For fresh installation, follow [https://github.com/bytebase/bytebase#installation](https://github.com/bytebase/bytebase#installation).
- If you upgrade from 0.4.0, you dont't need to do anything. If you upgrade from veresion before 0.4.0, then it requires manual schema change, please contact [support@bytebase.com](mailto:support@bytebase.com) and we will assist you to perform the manual upgrade.

## 🚀 New Features

### SQL rollback ([detailed guide](https://docs.bytebase.com/use-bytebase/sql-review-interface/rollback-sql))

User can now create rollback issue from the original closed issue easily via the UI.

## 🎄 Experience Enhancement

- Taking backup in a single transaction to make the backup consistent.
- Add alter schema button on the database detail page.
- Add button to allow quickly applying SQL statements to other pipeline stages.
- Hide project quick action list for non-project member.
- Optimize database table list.

## 🎠 Community

- We have reworked our changelog and blog site to build directly on bytebase.com. This should offer a better browsing experience for our users.
- We published our first technical post on database schema design [Choose Primary Key - UUID or Auto Increment Integer?](https://bytebase.com/blog/choose-primary-key-uuid-or-auto-increment) Go check it out.
