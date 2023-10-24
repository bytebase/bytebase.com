---
title: 20-Person Start-Up, 30+ SaaS Services, and $1,173 Monthly Bill
author: Tianzhou
published_at: 2022/7/26 17:00:00
feature_image: /content/blog/saas-services-behind-startup-2022/banner.webp
tags: Industry
description: A breakdown of the 30+ SaaS services that we use daily at Bytebase, a 20-person 18-month tech startup, and how much they cost us monthly.
---

_For the 2023 version, please check out [SaaS services behind a startup - 2023](/blog/saas-services-behind-startup-2023)_

At [Bytebase](https://bytebase.com), we believe tools make life easier or even redefine how the world works. Thanks to Figma, designers are now more empowered than ever to collaborate with product managers and front-end engineers; thanks to GitLab/GitHub and their ecosystems, the lives and the workflows of the application development engineers, the operations engineers, and the security engineers, have been revamped. Examples like this inspire us to build Bytebase, an open-source database tool to help DevOps teams manage databases throughout the application development lifecycle and hopefully to make the DevOps engineers’ lives easier.

Currently, we are a 20-member team based in 4 different cities. As tool-makers, we are particular about selecting the best tools for our own use from day 1. But there are too many of them! Some are no-brainers, but some are just too difficult to decide. So we decided to share our list of tools and SaaS services that are helping us grow to serve as a reference for other tech startups of similar or smaller sizes. These tools include what we use for **_R&D_**, **_Marketing_**, and **_General Administration_**. At the end of the blog, you can also find the breakdown of the monthly cost of these tools. I hope this helps!

## R&D

- [GitHub](https://github.com) - code hosting
- [Linear](https://linear.app) - project management
- [Neat](https://neat.run/) - GitHub / Linear notifications
- [Sourcegraph](https://sourcegraph.com) - code searching
- [Gitpod](https://gitpod.io) - cloud-based development environment
- [Excalidraw](https://excalidraw.com/) - prototype/sketch diagrams
- [Figma](https://figma.com) - design
- [Better Uptime](https://betteruptime.com/) - monitoring and alarming on service status
- [Auth0](https://auth0.com) - user sign-in
- [Render](https://render.com) - service deployment
- [Vercel](https://vercel.com) - website hosting
- [AWS](https://aws.com) - service deployment
- [Cloudflare](https://cloudflare.com) - domain name hosting
- [Segment](https://segment.com) - data integration
- [Metabase](https://Metabase.com) - dashboard
- [Paddle](https://Paddle.com) - payment collection
- [Retool](https://retool.com) - internal development tool
- [Algolia](https://algolia.com) - document searching

## Marketing

- [Intercom](https://Intercom.com) - client engagement
- [Mailchimp](https://mailchimp.com) - Email marketing
- [Orbit](https://orbit.love/) - community engagement
- [Ahrefs](https://ahrefs.com) - SEO analysis
- [Searchramen](https://searchramen.com) - SEO analysis
- [Google Analytics](https://analytics.google.com/) - user traffic analysis
- [Plausible](https://plausible.io/) - user traffic analysis
- [Hotjar](https://hotjar.com) - user behavior analysis

## General Administration

- [Google Workspace](https://workspace.google.com/) - company Email
- [Lark](https://www.larksuite.com/en_us/) - IM, documentation, office automation
- [Slack](https://slack.com) - IM
- [Grammarly](https://Grammarly.com) - English writing assistant
- [OSlash](https://oslash.com) - shortcuts
- [Causal](https://causal.app) - financial analysis
- [Pulley](https://Pulley.com) - equity management

## R&D

### [GitHub](https://github.com)

[Bytebase](https://github.com/bytebase/bytebase) is an open-source project hosted on GitHub, and the whole release process is wired via GitHub Action. Moreover, our [official website](https://github.com/bytebase/bytebase.com) is hosted on GitHub as well.

### [Linear](https://linear.app)

Although you can create Issues and do project management on GitHub, it does not provide a satisfactory user experience. So we use Linear for project management. The one drawback is that although Linear can be integrated with GitHub, it cannot synchronize with GitHub Issue, which is somewhat inconvenient for managing open-source projects.

### [Neat](https://neat.run/)

Neat is not exactly a SaaS service but more of a Mac-native application and shows GitHub and Linear notifications.

### [Sourcegraph](https://sourcegraph.com)

GitHub has a search function, but it’s far from satisfactory. So we use Sourecegraph for code searching.

### [Gitpod](https://gitpod.io)

From our GitHub project page, we provide a 1-click button allowing users to deploy Bytebase on Gitpod.

![_](/content/blog/saas-services-behind-startup-2022/bytebase-on-gitpod.webp)

### [Excalidraw](https://excalidraw.com/)

Excalidraw is a virtual whiteboard tool with a hand-drawn feel. We use it to sketch wireframes, architecture diagrams, or feature explanation diagrams.

![_](/content/blog/saas-services-behind-startup-2022/excalidraw-bytebase-console.webp)

![_](/content/blog/saas-services-behind-startup-2022/excalidraw-bytebase-architecture.webp)

### [Figma](https://figma.com)

Figma manages our design materials.

### [Better Uptime](https://betteruptime.com/)

Better Uptime monitors our website in real-time and sends an alarm in case of any anomalies. It also provides a service status dashboard. See our status on [status.bytebase.com](https://status.bytebase.com).

![_](/content/blog/saas-services-behind-startup-2022/website-status.webp)

### [Auth0](https://auth0.com)

To activate Bytebase Team or Enterprise Edition, users need to register on our [Hub](https://hub.bytebase.com) and purchase a license. We use Auth0 to enable registering with GitHub accounts.

### [Render](https://render.com)

The Bytebase [demo site](https://demo.bytebase.com), Bytebase [Hub](https://hub.bytebase.com), and all our databases are hosted on Render, the new Heroku. It provides web service and PostgreSQL hosting.

### [Vercel](https://vercel.com)

Our official website [bytebase.com](https://www.bytebase.com/) is hosted separately on Vercel. We use Vercel because it has an extensive edge network, making access fast for people worldwide.

### [AWS](https://aws.com)

We host [gitlab.bytebase.com](https://gitlab.bytebase.com) for testing our [VCS integration](/docs/vcs-integration/overview) and demo site. We didn’t use Render for two reasons:

1. We built GitLab early on, so it is difficult to migrate data.
2. GitLab requires more resources. There will be a decent increase in cost if we deploy t3a.large (2C8G) on Render.

### [Cloudflare](https://cloudflare.com)

Bytebase-related domain names are hosted on Cloudflare. Previously, we purchased our domain names on [name.com](https://name.com), and plan to consolidate them on Cloudflare later.

### [Segment](https://segment.com)

We collect anonymous data for our products and website, which are sent to Segment. We then instruct Segment to forward data to the downstream destinations such as our PostgreSQL database on Render.

### [Metabase](https://Metabase.com)

We use Metabase to build a dashboard for internal data visualization. The data is collected through Segment and saved in the PostgreSQL database on Render.

![_](/content/blog/saas-services-behind-startup-2022/metabase.webp)

### [Paddle](https://Paddle.com)

Paddle is where we collect payments from users. We didn't choose Stripe because Paddle can save our tax problems as a Merchant of Record (MoR). As a tradeoff, it is more costly than Stripe in commission fees.

### [Retool](https://retool.com)

We use Retool to build a list for displaying registered users, with which our team members can process user refunds instantly.

### [Algolia](https://algolia.com)

It is used to search for content on our [docs site](/docs/introduction/what-is-bytebase).

![_](/content/blog/saas-services-behind-startup-2022/algolia-search.webp)

## Marketing

### [Intercom](https://Intercom.com)

Some users may contact us through the small bubble in the lower right corner of the official website.

![_](/content/blog/saas-services-behind-startup-2022/intercom-bot.webp)

### [Mailchimp](https://mailchimp.com)

Mailchimp manages our newsletter subscriptions. It also sends some admin emails, such as informing users when the trial period is ending.

### [Orbit](https://orbit.love)

Orbit observes user engagements on our GitHub repositories.

### [Ahrefs](https://ahrefs.com)

Ahrefs is used for SEO research.

### [Searchramen](https://searchramen.com)

Although the same function is also covered by Ahrefs, Searchramen can provide a more straightforward interface to view the current ranking and keywords stats quickly.

### [Google Analytics](https://analytics.google.com/)

Google Analytics analyzes the user source and page visits.

### [Plausible](https://plausible.io/)

Google Analytics also covers the same function, but Plausible provides a more user-friendly interface to check the user source and page visits.

### [Hotjar](https://hotjar.com)

Hotjar can replay users’ browsing behaviors of users on the official website, through which we can identify breakpoints in designing the official website workflow.

## Daily Operation

### [Google Workspace](https://workspace.google.com/)

Every team member owns a Google email account with @bytebase.com. We use many SaaS services and almost all support login through Google accounts. We also use Google Docs when documents are expected to be revised repeatedly, thanks to the "Suggesting" mode.

### [Lark](https://www.larksuite.com/en_us/)

Lark is responsible for our internal activities, including IM, documentation, meetings, and OA.

### [Slack](https://slack.com)

Slack is used to communicate with our customers. We also thought about building a community on Slack. However, different Slack spaces require registration, which brings an unsatisfactory user experience, and the overall vibe on Slack feels more professional.

### [Grammarly](https://grammarly.com)

We purchased Grammarly Business Edition to assist in English writing.

### [OSlash](https://oslash.com)

From Google's go/ to the famous Stripe's o/, shortcut service is regarded as a must for Silicon Valley companies. Bytebase uses many SaaS services and creates many internal documents, which makes it difficult to remember all kinds of links. However, OSlash can convert these page links into more memorable ones. We also made an internal document on Lark noting all our shortcuts, which opens by o/link.

![_](/content/blog/saas-services-behind-startup-2022/oslash.webp)

### [Causal](https://causal.app)

Casual is used for financial model analysis. An intuitive model of financial reports is built after filling in the financial figures and making a few simple drag-and-drop operations, which is much easier to learn than Excel.

![_](/content/blog/saas-services-behind-startup-2022/casual-dashboard.webp)

### [Pulley](https://Pulley.com)

Pulley is used to manage the company's equity. It helps us track the company's cap table, issue and manage employee equities.

![_](/content/blog/saas-services-behind-startup-2022/pulley.webp)

## Monthly Spending

### R&D

| Service       | Cost     |
| ------------- | -------- |
| GitHub        | $0       |
| Linear        | $180     |
| Neat          | $0       |
| Sourcegraph   | $0       |
| Gitpod        | $0       |
| Excalidraw    | $60      |
| Figma         | $15      |
| Better Uptime | $0       |
| Auth0         | $0       |
| Render        | $50      |
| Vercel        | $20      |
| AWS           | $100     |
| Cloudflare    | $0       |
| Segment       | $0       |
| Metabase      | $0       |
| Paddle        | $0       |
| Retool        | $0       |
| Algolia       | $0       |
| **Total**     | **$425** |

### Marketing

| Service          | Cost     |
| ---------------- | -------- |
| Intercom         | $70      |
| Mailchimp        | $20      |
| Orbit            | $0       |
| Ahrefs           | $80      |
| Searchramen      | $20      |
| Google Analytics | $0       |
| Plausible        | $8       |
| **Total**        | **$198** |

### General Administration

| Service          | Cost     |
| ---------------- | -------- |
| Google Workspace | $130     |
| Lark             | $0       |
| Slack            | $50      |
| Grammarly        | $200     |
| OSlash           | $50      |
| Casual           | $0       |
| Pulley           | $120     |
| **Total**        | **$550** |

The total monthly spending is **$1,173**!

## Summary

We use over 30 SaaS services, many of which are the best tools in the industry, the wisdom of the top team, and ended up costing us $1,173/month, not a bad deal!

Here are some data to show how these tools have improved our efficiency:

1. The R&D team of just over 10 members releases a new version every two weeks, and each version has 100 to 150 PRs submitted.

2. The developer marketing team, consisting of 3 members, produces 3 - 5 articles weekly. In addition, they are responsible for maintaining [technical documents](https://docs.bytebase.com) and all marketing activities.

3. A part-time administrative/HR, dealing with all affairs in the company's back office, aside from R&D and marketing (of course, we also hired external financial and legal advisers).

Inevitably, we have made detours in terms of tool selection and also grew out of certain tools as the company grows. We will share more thoughts behind our choice of specific tools in a future post. Stay tuned.
