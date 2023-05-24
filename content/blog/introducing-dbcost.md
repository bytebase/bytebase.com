---
title: Introducing DB Cost, the simple cloud database pricing sheet for AWS RDS and Google Cloud SQL instance
author: Xiong
published_at: 2022/11/02 14:00
feature_image: /content/blog/introducing-dbcost/background.webp
tags: Announcement
description: DB Cost is a tool for developers to compare performance and cost differences among cloud database providers.
---

## 💸 What is DB Cost?

As FinOps rises, teams become more sensitive to the cloud resource pricing than ever. Major public cloud vendors do provide pricing for their offerings, however, that pricing information is usually hard to consume. Moreover, there is no straightforward way to compare similar offerings across different cloud providers.

3rd party pricing calculator site has emerged to fill such a gap. Yet, we couldn't find a site dedicated to providing database pricing info. Being a database tooling shop ourselves, we'd like to take a shot. So today, we are announcing [DB Cost (https://dbcost.com)](https://dbcost.com), a simple pricing calculator and comparison tool for the cloud databases. Major features include:

1. Support different cloud providers, starting from AWS RDS and GCP Cloud SQL.
2. Support different database engines, starting from MySQL and PostgreSQL.
3. Show prices for particular database types in particular regions.
4. Compare on-demand and reserved plans.
5. Support filtering options like cloud providers, engine types, charge types, CPU / memory counts, and wildcard search.
6. Support detailed pages for each instance and region, including interactive charts and related instances.

![_](/content/blog/introducing-dbcost/site-shot.webp)

### The dashboard

The dashboard mainly consists of three parts: the region selector area, the search configuration bar, and the pricing table. Users can view various RDS instances' pricing info on the table at bottom, and change the region menu and the search config area to filter out candidate instances.

By default, the table is sorted ASCEND on instances' expected costs. This helps users to figure out the most cost effective option that meets current conditions.

### Detailed pages

Currently, DB Cost provides two kinds of detailed pages: the instance detail page and the region detail page. You can enter both kinds by clicking on the highlighted links (which is also the names) in the table.

Detailed pages consist of three parts, too:

1. The compare tables. For each instance, it lists all of the instance's available regions, and vice versa for each region.
   ![_](/content/blog/introducing-dbcost/db.t4g.micro.webp)
   ![_](/content/blog/introducing-dbcost/africa-cape-town.webp)

2. An interactive and sketching / xkcd feel chart to provide visual comparison.
   ![_](/content/blog/introducing-dbcost/chart.webp)

3. Related resources like similar instance types or nearby regions.
   ![_](/content/blog/introducing-dbcost/related-instances.webp)
   ![_](/content/blog/introducing-dbcost/related-regions.webp)

## 🧐 Use cases

### Case 1: Business in determined regions

- Q: Our company is expanding our online service in East US, and we want to have some local DB instances. What choices do we have?
- A: You can check all US East regions on the dashboard. Now every instance on the table is available in East US. They are sorted ASCEND based on the expected cost. Feel free to apply filter conditions to pick up your desired ones.
  ![_](/content/blog/introducing-dbcost/us-east.webp)

### Case 2: Want a specific type regardless of regions

- Q: A minimal instance is sufficient for my small project. I'm going to purchase the db.t1.micro type and don't care which region it locates in. Can you show me if there are regions in which it's the cheapest?
- A: You can type the name in the search bar, and click on the name (db.t1.micro) in the filtered result. Then you'll enter a detailed page of db.t1.micro. Here, you can view all its available regions and prices to pick the cheapest if you like.
  ![_](/content/blog/introducing-dbcost/db.t1.micro.webp)

### Case 3: Wonder whether to choose a reserved plan or on demand plan

- Q: I want db.t4g.micro in Asia Pacific (Tokyo) for 3 years, and this instance is expected to be in use about 60% of the time. Should I choose a reserved plan or on demand plan?
- A: You can filter out this instance, set the utilization to 60%, and set the lease length to 3 years. Then check out the pricing table.
  We can see that the best pricing plan is a 3-year reserved plan, with a full upfront payment. Which needs only $325.00, is 18% off compared with an on demand plan (will need $394).
  ![_](/content/blog/introducing-dbcost/on-demand-vs-reserved.webp)

## 🛠 Tech stacks

DB Cost is built on modern tech stacks. Contributions are welcome!

Its front-end part is built with Next.js and React 18, Ant Design as the component library, Tailwind CSS for styling, and Nivo for chart visualization.

The pricing data seeding process is done with Golang scripts. There's a CronJob running on GitHub Actions every day to generate the data file and compare it with the current one. If diff on the data file is detected, GitHub Actions will create a pull request to refresh the data.

![_](/content/blog/introducing-dbcost/tech-stack.webp)

## 💬 FAQ

### Where is the pricing data from?

DB Cost collects pricing information from AWS and GCP by their official public APIs, and processes it into more readable formats.

### How do I request new features or report bugs?

DB Cost is fully open-sourced on [GitHub](https://github.com/bytebase/dbcost/tree/main). So feel free to [fire an issue](https://github.com/bytebase/dbcost/issues/new) if you have anything to tell us, which can be feature requests or bug reports.

### What is Bytebase? What's the relationship between DB Cost and Bytebase?

Bytebase is a Database CI/CD tool for DevOps teams, built for Developers and DBAs.

DB Cost is an open source project built by the Bytebase team. We expect DB Cost to be a tool for developers to compare different database products before making a final decision, where all cloud database instance performance and cost info are clearly presented.
