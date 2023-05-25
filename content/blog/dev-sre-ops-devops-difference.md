---
title: Dev, SRE, Operations, DevOps - What’s the Difference?
author: Tianzhou
published_at: 2022/07/15 08:00:00
feature_image: /content/blog/dev-sre-ops-devops-difference/dev-sre-ops.webp
tags: Explanation
description: Explain and address the confusion between Developer (Dev), Site Reliability Engineer (SRE), (Operations) Ops and DevOps.
---

Developers (Dev), Site Reliability Engineer (SRE), and Operations (Ops) are job types, while DevOps is a system. If we take a soccer analogy, Dev, SRE, and Ops correspond to positions like forward, midfield, and back, while DevOps is a formation like [4-3-3](<https://en.wikipedia.org/wiki/Formation_(association_football)#4%E2%80%933%E2%80%933>).

## Dev

Also called Development Engineer, Software Engineer (SWE), Software Developer, or simply Developer (Dev). Their primary responsibility is to write code and implement software business logic. The logic could be fulfilling a grocery order, scheduling a cab to your place, etc. Developers mainly deal with the code.

## Ops

Also called IT Operations, Production Engineer (PE), or simply Operations (Ops). They are responsible for data center management, machine installation, network wiring, monitoring, and alerting. In the early days, a large amount of the operations’ work deals with physical equipment. This work requires a lot of manual intervention and is risky. In the last ten years, as Cloud services gradually replace the physical data center, the traditional operations workload has been significantly reduced, and the pure Ops job has ceased to exist.

_Veterans all remember the exciting days of carrying such a pager to be standby 7x24_

![dev-sre-ops-intersection](/content/blog/dev-sre-ops-devops-difference/pager.webp)

## SRE

Site Reliability Engineer (SRE), coined by Google in 2003. The following factors contribute to the birth of this role:

1. Large-scale online services like Google are complex and require high service stability.
1. Developers are usually more concerned about delivering software but less interested in the ongoing maintenance after launch. Moreover, to launch the feature sooner, Developers are inclined to ignore the maintenance aspect of the software. This is mostly represented by Facebook’s infamous motto, ["Move fast and break things."](https://en.wikipedia.org/wiki/Meta_Platforms#History)
1. Traditional Ops need to transition to a new role.

1 and 2 prompted the need for a specialized job function, of which 2 also balances the development pace (please do not break that much), while 3 provides the labor supply for SRE. Since SRE’s primary responsibility is to ensure service stability, it’s a natural transition for Ops to move into an SRE role.

Simply put, SRE is an upgraded version of traditional Ops. Google invents an accurate name:

- Site infers scale.
- Reliability defines the responsibility.
- Engineering dictates methodology.

**Thus SRE is to address the reliability issue for large scale service in a systematic way.**

SRE differs from Ops in the following ways:

1. SRE no longer deals with physical equipment that the cloud services take care of.
1. SRE employs a more systematic approach to ensure service stability, such as building automation tools and working with the development team together to develop [Service Level Objective (SLO)](https://en.wikipedia.org/wiki/Service-level_objective) / [Service Level Agreement (SLA)](https://en.wikipedia.org/wiki/Service-level_agreement) / [Service Level Indicator (SLI)](https://en.wikipedia.org/wiki/Service_level_indicator). This triplet is the contract between SREs and Developers to work towards a shared goal of providing a better service.
1. SRE has a stronger engineering background. Some SREs possess quite strong engineering skills. For example, the creator of the monitoring software [Prometheus](https://prometheus.io/) was an SRE at Google.

![dev-sre-ops-intersection](/content/blog/dev-sre-ops-devops-difference/dev-sre-ops.webp)

The above diagram depicts the boundary between Dev, SRE, and Ops. There is no intersection between Dev and Ops, while SRE, as mentioned earlier, is Ops with Dev skillset, but still a bit more on the Ops side.

SRE gradually takes over the Ops role and become the one carrying the pager.

## DevOps

DevOps is a system. As just mentioned, there is no intersection between Dev and Ops work, while DevOps is to combine these two work types. More precisely, DevOps is to let Dev take on the Ops work. Under DevOps, there is no traditional Ops role, and Dev and SRE may share the Ops responsibility. And there is a trend that more organizations adopt pure DevOps. These engineering shops assign all Ops responsibility to the Dev team, which further eliminates the SRE role. Under such setup, it's the Dev team carrying the pager.

## Why People Get Confused

1. Confused about the difference between SRE and Ops. Simply put, SRE is Ops who can code.
1. Confused about whether DevOps is a system or a job function. This depends on the context. Initially, DevOps represented the system combining Dev and Ops work. This system may have both Dev and SRE roles, or it may only have a Dev role. When the system only has a Dev role, the system name, DevOps, is also used to indicate the so-called DevOps engineer’s job function. After all, if a soccer formation blurs the boundaries of the forward, midfield, and back, the formation will become a free formation, and all players can be called free men.
1. Confused about the difference between DevOps and SRE when DevOps is treated as a job function. Simply put, DevOps is the Dev that does Ops work, while SRE is the Ops that does Dev work.

## The Road Ahead

_Old Ops never die, they simply fade away._

With the advent of Cloud computing, many Ops job duties no longer exist, and the pure Ops role will cease. But there remains the question of the dynamics among Dev, SRE, and DevOps roles. Which mix will become the mainstream in the next ten years?

Let’s look at Dev and SRE first.

Dev and SRE belong to different groups and always have a love and hate relationship. On the one hand, they share the same goal to deliver a better service to the end user. On the other hand, they achieve the goal from a different angle. If we take a look at the [DORA](https://www.devops-research.com/research.html) four key metrics:

1. Deployment frequency
1. Lead Time for Changes
1. Change Failure Rate
1. Time to Restore Services

The first two measure velocity, and the last two measure stability. In a group containing both Dev and SRE, Dev optimizes for velocity, and SRE optimizes stability. Some elite groups can simultaneously achieve better velocity and stability by delivering frequent incremental changes. However, many groups are battling between velocity and stability. As we all know, push to production is the No 1 reason causing production outages. That’s also why many engineering teams employ the no Friday release policy.

This battle would never end as long as there are separate Dev and SRE teams. But there is a light ahead thanks to the proliferation of Cloud infrastructure, SaaS, and Open Source.

While the physical pagers can only be memorized in the computer science museum nowadays, the Ops responsibility and spirit are carried over by services like [PagerDuty](https://pagerduty.com), [Datadog](https://datadog.com).

Devs are now quite capable of taking over Ops work. First, much less firefighting since the Cloud service is much more stable than the in-house one. Second, tools to handle Ops work are more accessible to average engineers. Thus we believe DevOps will further thrive and become dominant, and the pure Dev and SRE role will diminish and only be observed in very large engineering shops down the road.
