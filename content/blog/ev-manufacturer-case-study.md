---
title: Case Study - EV Manufacturer
author: Changyu
published_at: 2023/07/28 21:21:21
feature_image: /content/blog/ev-manufacturer-case-study/banner.webp
tags: Case Study
featured: true
description: Learn how top-tier EV manufacturer utilizes Bytebase to achieve fully-automated database change management.
---

## The 1:1000 Database Change Management Predicament

In the wave of digitization, more companies are expanding their software development teams to accelerate the iteration of business systems to stay competitive. The electric vehicle (EV) is one of the hottest markets in recent years, and the players are investing more than ever in their development. 

Take a top-tier EV manufacturer for example,  they have over 1000 personnel alone on their dev teams. However, more is not always better for business application iterations: every change made to their databases must be handled with utmost caution (as should be, for all production databases). Before Bytebase, they established a basic change management process where a member of the developer team submits a change request, and after a DBA’s review, it is then rolled out by dedicated personnel. However, like most companies, this EV manufacturer also has a  shortage of DBAs, reaching a staggering ratio of 1:1000. The growth of their business brings about endless requests for database changes, which makes their database management tasks into a mission-impossible:

* **Manual review becomes a formality**: as change requests pile up, manual review becomes harder, eventually resulting in prioritizing bigger changes and even altogether skipping the review.
* **Manual deployment is low-efficient**: DBAs need to download corresponding scripts and connect to the target library for execution.
* **Change management is time-consuming**: due to frequent changes, DBAs spend a lot of time handling such tasks daily. In order not to affect the timeliness of changes, DBAs even have to carry around their computers everywhere.

**This situation urgently needs to be fixed.**

## Building an Elevated Change Management Process

Introduce Bytebase, an open-source database DevOps tool, which offers a web-based workspace for DBAs and Developers to collaborate and manage database changes efficiently. With Bytebase, the EVanufacturer crafted a brand new change management process: the entire change process from initiation, to review, and deployment is automated. This is made possible by integrating with up- and downstream tools from code repos to messaging tooling.

![_](/content/blog/ev-manufacturer-case-study/workflow.webp)

### Manage SQL scripts and initiate change requests directly through code repos

SQL [is also code](https://blog.devgenius.io/why-google-treats-sql-like-code-and-you-should-too-53f97925037e) and should be orderly and consistent. With Bytebase, they are able to integrate SQL scripts into their code repository (GitLab): all SQL scripts will automatically trigger issues when merged into the specified branch. Devs can complete all their tasks within their familiar tool, greatly improving efficiency while reducing the chances of careless mistakes caused by copying and pasting back and forth.

### Notification on IM (instant messaging) apps

The change script pushed from GitLab will generate an issue in Bytebase. At the same time, a notification will be automatically sent to the instant messaging tool (Lark) to whoever is responsible for reviewing the issue. The developer team can also be informed of the issue status in real-time. 

### Automated SQL Review

By utilizing Bytebase's built-in SQL Review capabilities, the team defined various SQL Review policies and achieved a fully automated workflow for reviewing issues. Syntax errors and performance risks can be detected before execution. At the same time, the developer team receives real-time feedback on the results, reducing communication costs.

### Automatic deployment

Approved change requests will be automatically deployed to the target database, providing instant feedback on the execution results. This eliminates the tedious process of manual execution by DBAs and prevents any potential for human error.

### Approval via IM apps

For certain small changes, DBAs don't even need to log in to Bytebase. They can review and approve issues directly via their IM, greatly improving the experience for business teams. This convenient approval mode is perfect for scenarios with frequent changes and urgent approval needs.

### Database Version Control

All database changes are versioned, including related change scripts, database schema before and after the change, along with issue review workflow. All information is traceable, ensuring full control over the entire lifecycle of the databases.

## Learnings From the Implementation

During the process of implementing the elevated database change management, the manufacturer’s DBA team gathered some handy experience.

### Automation

The team’s goal is automation. After deploying Bytebase, most aspects of their database CI/CD are automated, liberating multiple teams. Of course, the complexity of databases means that full automation is hard. Manual intervention for specific scenarios is still a necessary supplement.

### DevOps as guidance

Guided by the concept of DevOps, the team emphasizes involving the developers in change management. The key is finding a mode that does not affect the working habits of the developer team. And the answer is to integrate relevant work into commonly used toolings for developer teams, such as GitLab and IM apps.

### Categorize your databases

To involve the developer teams in change management, from submitting issues to participating in review processes, precise permissions are necessary. It is time to move away from traditional centralized models that classify based on levels, and instead, categorize databases based on product lines and projects. This ensures that each developer can only participate in their own project's database change process.

### Arrange your code repo’s directory

To manage SQL scripts using code repositories, it is also necessary to arrange the directory structure properly. In general, adopting the mono repo concept by centralizing all scripts in one repository is recommended. The specific sub-directory design should correspond with your projects, ensuring that database scripts for the same project are stored in their respective sub-directories.

### Collaboration over control

The ultimate goal is to improve collaboration, rather than enforce strict control. The DBA teams should have thorough discussions with relevant teams when formulating policies, which can effectively reduce resistance to implementing new processes.

### Continuous promotion

When faced with thousands of developers, nothing is easy. In the early stages, there will be ones who are not accustomed or prone to making mistakes. By updating processes accordingly and continuously promoting them, after a 2-3 week period, normal operation can be achieved. 

## To Wrap Up

Currently, the EV manufacturer is still continuously optimizing their database management process and exploring more Bytebase capabilities such as optimizing slow queries and data anonymization to further empower the developer team. Stay tuned for a follow-up.