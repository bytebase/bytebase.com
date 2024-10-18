---
title: Database security vulnerabilities are the craziest
author: Dec
updated_at: 2024/10/17 12:00:00
feature_image: /content/blog/database-security-vulnerabilities-are-craziest/banner.webp
tags: Industry
featured: true
description: Some of the craziest database security vulnerabilities uncovered in DBAs' career
---

Lately, a Post in `r/ExperiencedDevs` community of reddit, named `What are some of the craziest security vulnerabilities you've uncovered?`, raised hundreds of
sad stories, among which are several tragedies about database. Let's laugh at some of them.

The first story tells about a security breach that exposes core permissions like admin access, free account creation and even credit card information.
The worst thing is, still nobody cared even after the narrater revealed problem. But this narrater was sweet. He patched all errors.

![1](/content/blog/database-security-vulnerabilities-are-craziest/1.webp)

Then there's this API endpoint causing the PII leakage of almost half the entire population of Australia. Information got ocumented. Then completely publically promoted on Postman cloud community.

![2](/content/blog/database-security-vulnerabilities-are-craziest/2.webp)

In this Java webapp, using asterisk would match with all users including admin, thus creating a privileged session that syncs EVERY operation among ALL users.

![3](/content/blog/database-security-vulnerabilities-are-craziest/3.webp)

During the Ethereum ICO craze, an "SEC approved" ICO claiming to be open source, had one database seed file listing raw email addresses of admin accounts, as well as a file with authentication logic, accessible to public. The narrater manually transferred the token balance of a random account to 0x0 and it reflected on chain.

![4](/content/blog/database-security-vulnerabilities-are-craziest/4.webp)

## Summary

It's been a headache that data leakage, permission mis-assignment, accidental database operations are always appearing. We can tell that those stories above and all other accidents share same carelessness, but sometimes stupid things still unavoidably happens.

Maybe it suggests that, standardizing database operation process remains a necessity. With a DevSecOps tool, things would be much easier, safer and more organized.