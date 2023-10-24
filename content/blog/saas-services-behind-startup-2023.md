---
title: 40+ SaaS Services Behind 15-Person Startup - 2nd Year in Review
author: Tianzhou
published_at: 2023/10/24 11:00:00
feature_image: /content/blog/saas-services-behind-startup-2023/banner.webp
tags: Industry
featured: true
description: A breakdown of the 40+ SaaS services that we use daily at Bytebase, a 15-person 2nd year tech startup, and the monthly cost breakdown of the services.
---

Last year, we shared our [detailed SaaS usage bills](/blog/saas-services-behind-startup-2022) and triggered some discussions on HN.

![hn](/content/blog/saas-services-behind-startup-2023/hn.webp)

This year, our business has grown multi-fold, and we further leverage the various SaaS services to maintain operational efficiency:

- We now own 3 open-source projects totaling 15k+ stars:
  - [Bytebase](https://github.com/bytebase/bytebase) (7.2k), the Database DevOps and CI/CD platform. Offered in both self-host and Cloud.
  - [Star History](https://github.com/star-history/star-history) (5k), The missing GitHub star history graph.
  - [SQL Chat](https://github.com/sqlchat/sqlchat) (3.1k), Chat-based SQL Client using natural language to interact with databases.

![star-history](/content/blog/saas-services-behind-startup-2023/star-history.webp)

- We keep a lean team of under 15 members based in 4 different cities.
- We outsourced financial and legal services.
- As tool-makers, we are still picky about selecting the best tools for daily use.

As last year, below we list the SaaS services we use under 3 categories: **Research & Development (R&D)**, **Sales & Marketing (S&M)**, **General Administration (GA)**. At the end of the post, you can also find the breakdown of the monthly cost and the comparison with last year's bill. Now, let's get started.

## Research & Development

- (🌱 New) [Airplane](https://www.airplane.dev/) - internal tool

![airplane](/content/blog/saas-services-behind-startup-2023/airplane.webp)

We migrated from Retool to Airplane to generate our enterprise license key. Internal tools are built by our developers, so Airplane's developer-oriented approach fits us.

- [Algolia](https://algolia.com/) - document searching
- [Auth0](https://auth0.com/) - user sign-in
- (⬆️ Upgraded) [AWS](https://aws.com/) - service deployment
- [Better Uptime](https://betteruptime.com/) - monitoring and alarming on service status
- [Cloudflare](https://cloudflare.com/) - domain name
- (⬆️ Upgraded) [Excalidraw Plus](https://excalidraw.com/) - prototype/sketch diagrams

![excalidraw](/content/blog/saas-services-behind-startup-2023/excalidraw.webp)

All wireframing and product illustrations are done in Excalidraw. We subscribed to its team plan Excalidraw Plus as soon as it became available.

- [Figma](https://figma.com/) - design
- (🌱 New) [GCP](https://cloud.google.com/) - SaaS offering

We announced Bytebase Cloud this year. The cloud service is built on GCP using its GKE and Cloud SQL service. Though we already used AWS before, we chose GCP because our founders used to work there and are more familiar with the platform.

- [GitHub](https://github.com/) - code hosting
- (🌱 New) [GitHub Copilot](https://github.com/features/copilot) - AI programming

We maintain 2 popular open-source projects, [Bytebase](https://github.com/bytebase/bytebase) and [Star History](https://github.com/star-history/star-history). And GitHub grants us free usage.

- ~~(🌇 Sunset)~~ [~~Gitpod~~](https://gitpod.io/) ~~- cloud-based development environment~~
- [Linear](https://linear.app/) - project management
- [Metabase](https://metabase.com/) - BI dashboard
- [Neat](https://neat.run/) - GitHub / Linear notifications
- (🌱 New) [Neon](https://neon.tech/) - serverless database

We announced another project [SQL Chat](https://www.sqlchat.ai/) and it stores metadata and sample datasets in Neon. We tried a few other hosting options before. Neon's on-demand pricing model and its branching feature attracted us.

- (⬆️ Upgraded) [Render](https://render.com/) - service deployment

We expand the footprint on Render. All service components other than Bytebase Cloud and SQL Chat are on render. This includes our demo environment, staging environment, Star History backend, SQL Chat backend and etc. The SQL Chat backend used to run on Vercel, however, its edge function is costly for the SQL Chat usage pattern. We have to ditch the edge function and adopt Render's pure server environment.

- ~~(🌇 Sunset)~~ [~~Retool~~](https://retool.com/) ~~- internal development tool~~

Replaced by Airplane mentioned above

- [Segment](https://segment.com/) - data integration
- [Sourcegraph](https://sourcegraph.com/) - code searching
- (🌱 New) [Vantage](https://www.vantage.sh/) - cloud cost management
- (⬆️ Upgraded) [Vercel](https://vercel.com/) - website hosting

## Sales & Marketing

- [Ahrefs](https://ahrefs.com/) - SEO analysis
- (🌱 New) [Cal.com](http://Cal.com) - Book appointment

Allow potential customers to self-schedule appointments with us.

- [Google Analytics](https://analytics.google.com/) - user traffic analysis
- ~~(🌇 Sunset)~~ [~~Hotjar~~](https://hotjar.com/) ~~- user behavior analysis~~

We released our new marketing site early this year and reduced the 3rd party analytic services.

- [Intercom](https://intercom.com/) - client engagement
- (⬆️ Upgraded) [Mailchimp](https://mailchimp.com/) - Email marketing
- (🌱 New) Beehiiv - newsletter

Star History now has a dedicated [newsletter](https://star-history.beehiiv.com/subscribe) and we use Beehiiv as the newsletter platform.

- (🌱 New) [Midjourney](https://www.midjourney.com/) - image generation

We contract Midjourney to generate post images (not this one though).

- [Orbit](https://orbit.love/) - community engagement
- (🌱 New) [Pitch](https://pitch.com/) - deck

Prepare product intro and investor deck.

- (⬆️ Upgraded) [Plausible](https://plausible.io/) - user traffic analysis
- [Paddle](https://paddle.com/) - payment collection
- [Searchramen](https://searchramen.com/) - SEO analysis
- (🌱 New) [Stripe](https://stripe.com/) - payment collection

Bytebase Cloud uses Paddle because it takes care of Tax as a Merchant of Record. Stripe has been improving tax collection, so we decided to try Stripe and use it to collect payments for SQL Chat.

- (🌱 New) [Speechify AI](https://speechify.com/) - AI Text-to-Speech
- (🌱 New) [Zoom](https://zoom.us/) - video conferencing

## General Administration

- [Causal](https://causal.app/) - financial analysis
- (🌱 New) [ChatGPT](https://chat.openai.com/) - everything
- [Google Workspace](https://workspace.google.com/) - Email and identity
- [Grammarly](https://grammarly.com/) - English writing assistant
- [Lark](https://www.larksuite.com/en_us/) - IM, documentation, office automation
- [OSlash](https://oslash.com/) - shortcuts
- [Pulley](https://pulley.com/) - equity management
- [Slack](https://slack.com/) - IM
- (🌱 New) [Setapp](https://setapp.com/) - Mac app subscription
- (🌱 New) [Zapier](https://zapier.com/) - workflow automation

## Monthly Cost Breakdown

### Research & Development

| **Service**   | **2022** | **2023**   |
| ------------- | -------- | ---------- |
| 🌱 Airplane   |          | $0         |
| Algolia       | $0       | $0         |
| Auth0         | $0       | $0         |
| ⬆️ AWS        | $100     | $300       |
| Better Uptime | $0       | $0         |
| Cloudflare    | $0       | $10        |
| ⬆️ Excalidraw | $60      | $80        |
| Figma         | $15      | $36        |
| 🌱 GCP        |          | $500       |
| GitHub        | $0       | $5         |
| Linear        | $180     | $120       |
| Metabase      | $0       | $0         |
| Neat          | $0       | $0         |
| 🌱 Neon       |          | $20        |
| ⬆️ Render     | $50      | $350       |
| 🌇 Retool     | $0       | Sunset     |
| Segment       | $0       | $0         |
| Sourcegraph   | $0       | $0         |
| 🌱 Vantage    |          | $0         |
| Vercel        | $20      | $60        |
| **Total**     | $425     | **$1,481** |

The spending increases by 250%, mostly from cloud usage consumption, Render, GCP, and AWS. This is a good thing to have. We are also using Vantage to monitor any cost cost anomalies. This month, we noticed an unexpected Snowflake usage from our Vantage report

![snowflake-bill](/content/blog/saas-services-behind-startup-2023/snowflake-bill.webp)

It turns out it's a billing bug on the Snowflake side.

![snowflake-issue](/content/blog/saas-services-behind-startup-2023/snowflake-issue.webp)

### Sales & Marketing

| **Service**                  | **2022** | **2023** |
| ---------------------------- | -------- | -------- |
| Ahrefs                       | $80      | $80      |
| 🌱 [Cal.com](http://Cal.com) | /        | $0       |
| Google Analytics             | $0       | $0       |
| 🌇 Hotjar                    | $0       | Sunset   |
| Intercom                     | $70      | $100     |
| ⬆️ Mailchimp                 | $20      | $100     |
| 🌱 Beehiiv                   | /        | $0       |
| 🌱 Midjourney                | /        | $20      |
| Orbit                        | $0       | $0       |
| 🌱 Pitch                     | /        | $10      |
| ⬆️ Plausible                 | $8       | $18      |
| Paddle                       | $0       | $0       |
| Searchramen                  | $20      | $20      |
| 🌱 Stripe                    | /        | $0       |
| 🌱 Speechify                 | /        | $0       |
| 🌱 Zoom                      | /        | $20      |
| **Total**                    | $198     | **$368** |

The spending increased by 86%, mostly from increased usage (more email subscribers, having more visitors) and new sales and marketing tools.

### General Administration

| **Service**      | **2022** | **2023** |
| ---------------- | -------- | -------- |
| Causal           | $0       | $0       |
| 🌱 ChatGPT       |          | $100     |
| Google Workspace | $130     | $110     |
| Grammarly        | $200     | $0       |
| Lark             | $0       | $0       |
| OSlash           | $50      | $0       |
| Pulley           | $120     | $0       |
| Slack            | $50      | $50      |
| 🌱 Setapp        |          | $100     |
| 🌱 Zappier       |          | $18      |
| **Total**        | $550     | **$378** |

Spending is decreased as we find ourselves not needing the paid features. We stopped our Grammarly subscription because we now use ChatGPT or other tools to refine the wording.

The total monthly spending is $2,157, a 90% increase from last year's $1,173!

|                        | **2022**   | **2023**   | **Diff** |
| ---------------------- | ---------- | ---------- | -------- |
| Research & Development | $425       | $1,481     | \+250%   |
| Sales & Marketing      | $198       | $368       | \+86%    |
| General Administration | $550       | $378       | \-33%    |
| **Total**              | **$1,173** | **$2,227** | **+90%** |

## Recap

For startups like us, there is no Buy vs Build debate. Leveraging other SaaS services is a no-brainer. We also feel pain when there is no viable SaaS offering for a particular task. e.g. We still desperately need a service that allows us to write the post once and schedule it across all major social networks.

As with the rest of the industry, we are experiencing the AI storm. This year we have already onboarded a bunch of AI-native/augmented SaaS services. We even built one, [SQL Chat](https://www.sqlchat.ai/), offering a natural language interface to the database. I am already used to casting spells to construct the Zapier workflow or co-author pictures with Midjourney.

Compared with last year, we are using more SaaS services as we grow our businesses. It's still manageable.

![2022](/content/blog/saas-services-behind-startup-2022/banner.webp)

![2023](/content/blog/saas-services-behind-startup-2023/banner.webp)

---

Feel free to share this article, and if you are using some neat tools not mentioned here, we'd love to hear about them. See you next year!
