---
title: "Notes on the DORA 2023 Report"
author: Tianzhou
published_at: 2023/10/18 21:00
feature_image: /content/blog/state-of-devops-2023/banner.webp
tags: Industry
featured: true
description: 'DORA recently released its annual State of DevOps 2023 report. Bytebase is a Database CI/CD tool for DBAs and DevOps teams, and we are diving deep into the State of DevOps Report.'
---

![state-of-devops-2023](/content/blog/state-of-devops-2023/state-of-devops-2023.webp)

## Background

A few days ago, [DORA](https://dora.community/) (DevOps Research and Assessments), a program run by Google Cloud, [released](https://cloud.google.com/devops/state-of-devops) its annual State of DevOps 2023 report. Starting from 2014, DORA releases one report every year. Due to the pandemic, they skipped one in 2020, so this year's report adds to a total of nine reports.

Initially an independent research institution, DORA joined Google Cloud at the end of 2018. Overall, DORA's reports are considered the most professional and objective in the entire DevOps industry; this should also be why it got the nod from Google initially. Even after joining Google, its reports still maintain neutrality for the most part. From initially focusing on software release metrics to now extending to organizational culture and business performance, DORA's readers have expanded from managers, directors to CTOs, VPs in leadership roles. This is particularly prominent in this year's report and aligns with Google Cloud shifting its focus from developers to managers.

Bytebase is a database CI/CD tool for DBAs and DevOps teams. We are taking this chance to dive deep into DORA's State of DevOps 2023 Report.

## The Sponsors

![form](/content/blog/state-of-devops-2023/form.webp)

To get the report this year, you need to fill out your contact info. In the fifth year after acquiring DORA, Google Cloud has also accelerated the monetization of DORA. There have been significant changes in this year's sponsors compared to last year.

![sponsors](/content/blog/state-of-devops-2023/sponsors.webp)

### Familiar faces from last year

1. **Broadcom Software**. Broadcom is a relatively old-school software vendor, and its product line related to DevOps mostly comes from the acquisition of CA in 2018. Headquartered in Silicon Valley, CA's logo is still hanging on the only high-rise next to Highway 101 from back then.
2. **Deloitte**. IT consulting, a frequent sponsor of the DORA reports.

### New faces this year

1. **LinearB** focuses on the optimization of development processes. Celonis is the leader in the process mining field for enterprises, while LinearB can be seen as Celonis in the field of software development.

![linearb](/content/blog/state-of-devops-2023/linearb.webp)

2. **Digital.ai** is doing something similar to LinearB, but utilizes AI for promotion.

![digital-ai](/content/blog/state-of-devops-2023/digital-ai.webp)

3. **Opsera**'s offering is similar to the previous two companies.

![opsera](/content/blog/state-of-devops-2023/opsera.webp)

4. **Sleuth** does somewhat similar things, but focuses more on DORA.

![sleuth](/content/blog/state-of-devops-2023/sleuth.webp)

> Sidenote: this company called Swarmia is quite clever: knowing that the new DORA report has been released and people will search for sponsors, and looks like they have placed corresponding keywords.

![google-ads](/content/blog/state-of-devops-2023/google-ads.webp)

![swarmia](/content/blog/state-of-devops-2023/swarmia.webp)

5. **Qarik** helps users migrate to cloud-native architecture.

![qarik](/content/blog/state-of-devops-2023/qarik.webp)

From the sponsor list, the majority of vendors are engaged in optimizing R&D processes, which aligns with the target audience of the DORA report. However, one can also see the intensity of competition in this field. Now let's get to the point and dive deep into the DORA report itself.

## Target Audience

The sample size has increased by 3.6 times compared to last year, making it second only to Stack Overflow Developer Survey in terms of scale within the industry. The coverage of respondents is also more comprehensive.

![sample](/content/blog/state-of-devops-2023/sample.webp)

In terms of regional distribution, it also reflects the relative size of the software industry in various countries.

![region](/content/blog/state-of-devops-2023/region.webp)

## Methodology

![methodology](/content/blog/state-of-devops-2023/methodology.webp)

DORA's recent reports have two main themes:

- Organizational: organizational performance, team performance, employee well-being.
- Operational: software delivery performance, operational performance

DORA started from a specific point (software delivery) and expanded gradually (software operations). Upon this, DORA further added organizational performance / team performance / individual experience.

## Software Delivery Metrics

These four metrics to measure the speed and stability of software delivery remain largely unchanged:

- Deployment frequency
- Change lead time
- Change failure rate
- Failed deployment recovery time

Among them, the last term was adjusted. The previous report used a more general term "time-to-restore". However, it was too generic to differentiate between failures caused by releases and those caused by natural disasters. The new term more precisely defines within the realm of releases.

![recovery-time](/content/blog/state-of-devops-2023/recovery-time.webp)

## Grading - Return of the Elite Level

Due to the lack of distinction between Elite and High levels, the original four levels became three levels in last year's report.

![grading-2022](/content/blog/state-of-devops-2023/grading-2022.webp)

This year, Elite returns because of a significant increase in sample size, and the distinction has emerged.

![grading-2023](/content/blog/state-of-devops-2023/grading-2023.webp)

## Clustering

![tuckman](/content/blog/state-of-devops-2023/tuckman.webp)

Last year's report adopted a stage-based classification similar to Tuckman's stages of group development (Forming > Storming > Norming > Performing > Adjourning), and was formed into Staring > Flowing > Slowing > Retiring.

![classification](/content/blog/state-of-devops-2023/classification.webp)

This year, a new trait-based classification was adopted:

- User-centric
- Feature-driven
- Developing
- Balanced

![trait-based](/content/blog/state-of-devops-2023/trait-based.webp)

Performance of various indicators under different types.

![trait-based-performance-1](/content/blog/state-of-devops-2023/trait-based-performance-1.webp)

![trait-based-performance-2](/content/blog/state-of-devops-2023/trait-based-performance-2.webp)

It seems that this year's categorization is a bit blurry. Taking Bytebase itself as an example, according to last year's stage classification, Bytebase clearly falls between "starting" and "flowing". However, Bytebase somehow fits into all four categories this year. In terms of trait classification, personally I feel that it needs to be further subdivided like MBTI personality analysis.

## Key Findings

![key-findings](/content/blog/state-of-devops-2023/key-findings.webp)

- Establish a healthy culture
- Build with users in mind
- Unlock software delivery performance with faster code reviews
- Amplify technical capabilities with quality documentation
- Increase Infrastructure flexibility with cloud
- Balance delivery speed, operational performance, and user focus
- Distribute work fairly

### Culture and User-centrism

Westrum's Organizational Culture and user-centrism are also part of organizational culture, so they are discussed together.

![culture-1](/content/blog/state-of-devops-2023/culture-1.webp)
![culture-2](/content/blog/state-of-devops-2023/culture-2.webp)
![culture-3](/content/blog/state-of-devops-2023/culture-3.webp)

> Westrum's Organizational Culture originates from Westrum's views in his 2004 paper "A typology of organisational cultures". A highly trusting and information-sharing organizational culture can lead to outstanding business performance.

Among all the evaluated indicators, Westrum's Organizational Culture and user-centrism are the most effective in bringing positive effects. For Westrum's Organizational Culture, you can read more about it in his paper; while for the latter, further data is provided in the DORA report.

You can see that putting the user at the center can bring significant improvements to every indicator, so now companies are vigorously promoting it.

### Technical factors that affect performance

![tech-factor-1](/content/blog/state-of-devops-2023/tech-factor-1.webp)
![tech-factor-2](/content/blog/state-of-devops-2023/tech-factor-2.webp)

This uses the classic solution in computer science - divide and conquer. Loosely coupled architecture -> smaller changes -> improvement of DORA's four core metrics.

![divide](/content/blog/state-of-devops-2023/divide.webp)
![loosely-coupled-teams](/content/blog/state-of-devops-2023/loosely-coupled-teams.webp)

## Revalidating the Relationship Between Reliability and Performance

![data-2022](/content/blog/state-of-devops-2023/data-2022.webp)

The data from the 2022 report shows that organizations need to invest a long period of time in reliability engineering before seeing results. This conclusion can be somewhat discouraging as it is easy to give up without fast positive feedback.

However, through optimizing questionnaires in 2023, an inspiring conclusion was drawn: the relationship between stability and performance follows a J-curve, where there are effective results in the early stage of investment, followed by a period of bottleneck, and ultimately leading to substantial returns.

## AI Contribution: Can't Solve the Main Contradiction Just Yet

![ai-contribution](/content/blog/state-of-devops-2023/ai-contribution.webp)
![ai-contribution-perf](/content/blog/state-of-devops-2023/ai-contribution-perf.webp)

The 2023 report naturally cannot leave out AI. The conclusion is somewhat discouraging, as it ranks last with a significant gap, among all technological factors. This actually aligns with my personal expectations because currently, the only breakthrough scenario for AI is assisting in coding, making it have the least impactful.

![ai-capabilities](/content/blog/state-of-devops-2023/ai-capabilities.webp)

This image is quite interesting, showing what AI is good at and not good at in the field of software delivery. Except for the last one, "Solving file path issue", which is a bit strange, the bottom few are all organization culture-related contradictions

## Conclusion

### A professional report

Apart from the content, DORA has once again shown us how to produce a professional industry report. The methodology, interviewees, and analysis methods are clearly explained in the report.

![variable](/content/blog/state-of-devops-2023/variable.webp)

Data that goes against intuition aren't forcefully conformed to, but instead, questions are raised.

![ci](/content/blog/state-of-devops-2023/ci.webp)

Paying attention to various voices, which not only makes the report more comprehensive but also injects humanistic elements.

![sample-set](/content/blog/state-of-devops-2023/sample-set.webp)

And - A few points of shortcomings that I have identified from my reading.

### Lightly described Platform Engineering

![pe](/content/blog/state-of-devops-2023/pe.webp)

The recently emerging Platform Engineering was mentioned for the first time in this year's report. The theme of DORA is Software Efficiency and DevOps, and from industry trends, this work corresponds to the Platform Engineering team. The users of Platform Engineering are internal developers, so this part appears in User-centric on page 19. However, as a report studying R&D organizations, DORA ought to elaborate more on Platform Engineering since it is a new organizational form that has finally emerged after more than 10 years following DevOps/SRE.

### The Cloud cliché

![cloud-cliche](/content/blog/state-of-devops-2023/cloud-cliche.webp)

The report lists various advantages of Cloud, but it does not touch upon the recent industry discussions on Cloud cost and the accompanying call for downsizing. It lacks a bit of dialectics, which shows a bias from the hands of Google Cloud in this report. In addition to this, another implantation by Google is discussing their own SRE practices.

![google-sre](/content/blog/state-of-devops-2023/google-sre.webp)

### DORA in Transition

![dora](/content/blog/state-of-devops-2023/dora.webp)

Among the authoritative industry annual reports, Stack Overflow Developer Survey focuses on the specific products and technologies used in work. Gartner targets management and focuses on industry trends. DORA is positioned between the two, with DO representing DevOps genes that determine a frontline perspective in the report, while RA representing Research & Assessment enables it to provide value judgments. And from the trend of these years' reports, DORA is gradually moving towards management.

![2022-sponsor](/content/blog/state-of-devops-2023/2022-sponsor.webp)

For example, looking at the sponsor list, in previous years there were more tool vendors specializing in different stages of the development workflow, such as JetBrains IDE, JFrog artifact repositories, GitLab for code hosting, Octopus for application deployment, and Liquibase for database changes. This year's sponsors are all focused on development process efficiency optimization. Perhaps this is also related to Google Cloud's strategic adjustment targeting their key customers.

Furthermore, this year's report downplays the four core metrics of software delivery that DORA has always endorsed and instead focuses more on describing the elements behind these metrics. Among them, culture and user-centrism are given priority.

> Culture eats strategy for breakfast - Peter Drucker

Since DORA is taking the high-level route for transformation, they will inevitably face growing pains. The DORA team has strong analytical and retrospective capabilities, but compared to Gartner, it lacks foresight. It is already linked to the already-mature concept of DevOps and now hopes to promote SRE, which has also passed its prime stage. There is not a lot of mention from DORA about Platform Engineering or the practice of AI, which reflects its practical side, but what management cares more about are the trends for the next 3-5 years.

## Final Thoughts

![measurement-goal](/content/blog/state-of-devops-2023/measurement-goal.webp)

Measurement is not the goal, just like releasing software is not the goal. While it is gratifying if data can confirm assumptions, what is more valuable is revealing incorrect assumptions. Improving the efficiency of software releases also aims to create a shorter feedback loop, discover product defects, make improvements, and better meet user needs.

![final-thought](/content/blog/state-of-devops-2023/final-thought.webp)

At the dawn of AI, the eve of VR, an organization with the ability to continuously improve is the greatest certainty in facing uncertainties.

---

If you made it thus far, I applaud you, and I'm sure you have a pursuit for quality software delivery. Take a look at [Bytebase](/), the leading Database CI/CD tool for DevOps teams, built for Developers and DBAs.