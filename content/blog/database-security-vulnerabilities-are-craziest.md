---
title: Database security vulnerabilities are the craziest
author: Ayra
updated_at: 2024/10/18 12:00:00
feature_image: /content/blog/database-security-vulnerabilities-are-craziest/banner.webp
tags: Industry
featured: true
description: Some of the craziest database security vulnerabilities uncovered in DBAs' career
---

Lately, a Post in `r/ExperiencedDevs` community of reddit, named [What are some of the craziest security vulnerabilities you've uncovered?](https://www.reddit.com/r/ExperiencedDevs/comments/1fzwzkd/what_are_some_of_the_craziest_security/), raised hundreds of
sad stories, among which are several tragedies about database. Let's laugh at some of them.

## Stories

The first story tells about a security breach that exposes core permissions like admin access, free account creation and even credit card information.
The worst thing is, still nobody cared even after the narrater revealed problem. But this narrater was sweet. He patched all errors.

![story-one](/content/blog/database-security-vulnerabilities-are-craziest/story-one.webp)

Then there's this API endpoint causing the PII leakage of almost half the entire population of Australia. Information got ocumented. Then completely publically promoted on Postman cloud community.

![story-two](/content/blog/database-security-vulnerabilities-are-craziest/story-two.webp)

In this Java webapp, using asterisk would match with all users including admin, thus creating a privileged session that syncs EVERY operation among ALL users.

![story-three](/content/blog/database-security-vulnerabilities-are-craziest/story-three.webp)

During the Ethereum ICO craze, an "SEC approved" ICO claiming to be open source, had one database seed file listing raw email addresses of admin accounts, as well as a file with authentication logic, accessible to public. The narrater manually transferred the token balance of a random account to 0x0 and it reflected on chain.

![story-four](/content/blog/database-security-vulnerabilities-are-craziest/story-four.webp)

## Summary

It's been a headache that data leakage, permission mis-assignment, accidental database operations are always appearing. We can tell that those stories above and all other accidents share same carelessness, but sometimes stupid things still unavoidably happens.

Maybe it suggests that, standardizing database operation process remains a necessity. With a DevSecOps tool, things would be much easier, safer and more organized.
