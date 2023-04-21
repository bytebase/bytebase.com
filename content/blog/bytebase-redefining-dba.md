---
title: Bytebase - Redefining DBA
author: Lucy
tags: Hidden
draft: true
---

Bytebase - Redefining DBA On March 9th, 2022, Bytebase released [version 1.0.0](https://bytebase.com/changelog/bytebase-1-0-0) along with a [paid team version](https://bytebase.com/pricing).

Bytebase's [first commit](https://github.com/bytebase/bytebase/commit/9ae40d2a4a355280306cae7e5a35b7ba1e633999) dates back to January 27th, 2021 . Since then, it has already accumulated 3500+ commits, 34 new features, 39 enhancements, 16 major bugfixes, and nearly 150,000 lines of code.

Ever since the 0.1.0 open source version went public on July 9th, 2021, we basically kept a bi-weekly iteration. We finally made it to version 1.0.0.

## A Bespoke Product for DBA

[Bytebase.com](https://bytebase.com/), among all the database-related products, might be the most vocal one to put DBA at the center stage. Those who came to visit our website could be divided into two groups. The first group consists of developers, many of whom may not understand the value of Bytebase . While the other group, the DBAs, got their eyes lightened up--finally, a professional team stands up to build a tool for **THEM**. But some DBAs still hold a doubtful opinion. How come this tool runs on 150,000 lines of code? Isn’t this a 2-week job if our fellow DBAs use Django to build practically the same thing (DBAs are indeed quite productive, we’ll come back to this point later)?

We understand all these reactions from the developers. But for the DBAs having doubts, I think the value of Bytebase to the target users, that is, the DBAs, is not clear enough, so here comes ourkey message:

**Bytebase is a tool tailored for DBAs, and it is trying to redefine the entire workflow of DBAs, reimagining and redefining the DBA profession.**

That's why Bytebase already has more than 1000 lines of schema file to define its own data model and nearly 150,00 lines of code in total. What we envision is a tool that reshapes the DBA profession.

## Product Reshapes Profession

Below picture shows the modern R&D toolset and how Bytebase fits into it.

![_](https://bytebase.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQ4NmE0YmFmNTYxNWQzNTNjYjU1ZmNhZWI4YjUwZjhfaWNsWE5zV0JVR0p5ZWIzTUNwb0FDeUVmMkdtTkpEZzBfVG9rZW46Ym94Y245a2dIY0QxYnhHM2htSHRjNVQ5cGFiXzE2NDkzODgyMzU6MTY0OTM5MTgzNV9WNA)

Figma, above, reshapes the designer profession, while GitLab does the similar thing to the development engineer, the operations engineer, and the security engineer.

For Figma, it defines the workflow between designers and product managers/front-end engineers. Its Design System capability expands the designers' scope from perfecting product pixels to charting company's tone and branding.

Let’s move on to another hotness, dbt, which also reshaped the workflow of data engineers.

While dbt's upstreams are usually transactional databases managed by the DBA team, most DBA’s current attention is somehow still focused on the database ops work instead of engaging in the application development lifecycle or business data which are far more valuable.

Being at the headstream of business data, don't DBAs want to delve in? If you ask me, it’s not a matter of “ do or do not ”, but a problem of “ can or can not ”.

## The Exhausted DBAs

Let’s go over DBA’s daily pain points:

1. **Overwhelming workload.** A 1:300 DBA-Developer ratio is quite typical, worst case we know is over 1:1000. The ratio might be the second most imbalanced in the entire R&D group. The only one might top that is the CTO-R&D ratio (they may be tied though).
2. **Huge responsibility.** Of those who could smash the company in a blink, nearly half of them belong to the DBA team (CTOs can’t really do this BTW). These people are blade runners who could destroy the company with one fat finger. Keeping themselves on their toes, DBAs still need to be prepared in case application developers delete the databases by mistake. A lot of DBAs have memories working their ass off for days to clean up the mess. After resolving the crisis with CXOs’ anxious stares pinching their backs, there is still a postmortem waiting for them, let's hope that's "blameless".
3. **Tons of complaints** from the development team because of DBAs blocking their changes into production.
4. With the evolution of cloud databases, **business developers gradually develop the guts to bypass DBAs**. But when shit happens, it's still the DBAs to clean up the mess.

The proliferation of Cloud Native technologies and micro-services further overloads DBA team. While operation engineers upgrade their toolkits with k8s and ELK, chanting the scriptures of observability, holding SRE Bible and transition to the SRE role and DBAs still hold on to their dusty legacy scripts, squeezing in their time to build in-house tools, and trapped in the endless cycle of tickets, warnings, reporting and scapegoating.

The unbearable heaviness of pressing on might bring you down on your head, but true despair comes only when you look up and realize—there is nothing but everlasting night.

## The Fire Lit by Bytebase

The Spinning Jenny and the steam engine redefined the profession of blue-collar workers, so are VisiCalc and Excel to the office workers. More recent examples include Figma for the designers, dbt for the data engineers. It's always the tooling innovation that opens a new era for the professional workers.

Years ago, engineers who worked at Google developed a new open source monitoring solution called Prometheus, which is now the de-facto industry standard for monitoring. Coincidentally, the two founders of Bytebase are also from Google Cloud Platform team. Although both of us come from a developer background, we used to manage some of the world’s largest MySQL & PostgreSQL fleets at Google, led the DevTools team to support one of the largest R&D group at Ant Group. This background makes us the ideal candidate to revolutionize the DBA tool.

**Bytebase aims at launching a revolutionary productivity tool.** A tool to bring the imagination of a new era to the classic profession of DBAs.

## Reimagining DBA

Google coined SRE, nowadays SRE is treated as a job, a workflow, and an ideology, but no matter which, traditional Ops engineers are wearing the SRE hat, waving with Prometheus' sticks, climbing to the cloud-native stage.

Similarly, Bytebase has also been thinking the career advancement for DBAs. In the era of Cloud Native and microservices, **how can Bytebase help DBAs make the similar transition as Prometheus did for traditional Ops?**

Recently, I stumbled across a case study from Temporal. It's talking about *[How Datadog Ensures Database Reliability with Temporal](https://docs.temporal.io/blog/how-datadog-ensures-database-reliability-with-temporal). T*he problem Datadog team faced is exactly what Bytebase aims to solve. Datadog's DBA team is called DRE (Database Reliability Engineering), a new team name that intrigues me.

**With the help of Bytebase, DBAs are no longer mere Database Administrators, they can become Database Architects.**

Bytebase is built for enterprise collaboration. The core piece is development workflow and database schema lifecycle management. In particular, Bytebase offers a dedicated DBA role, to oversee the database application development.

Our vision for Bytebase is to enable the DBAs to have a bird’s-eye view of database application development, and own a share during application architecture design.

This turns DBAs from passive firefighters to proactive architecture planners.

If Bytebase fulfills its promise, it should become a professional skill for DBAs, just like Prometheus, Elasticsearch, and other products that appear on the hiring JDs and the candidate resumes.

Let's redefine DBA, the classic and timeless role.
