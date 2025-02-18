---
title: 'How to Pick Platform Engineering Tools in 2025: Essential Guide'
author: Tianzhou
updated_at: 2025/02/18 09:00:00
feature_image: /content/blog/platform-engineering-tools-essential/banner.webp
tags: Industry, Hidden
featured: true
description: Introduce the essential tools for platform engineering. Covering code hosting, CI/CD, observability, resource provisioning, and secret management.
---

<HintBlock type="info">

The post is updated regularly and focuses solely on tools. It does not cover infrastructure components like Kubernetes, PostgreSQL, Kafka, Elasticsearch. It also does not cover collaboration tools like Slack, Notion, Jira, Linear.

</HintBlock>

Platform engineering adoption has surged in recent years. To better understand the landscape, we interviewed over 100 platform teams about their challenges and the tools they rely on. Drawing from these insights and our own experience, we have curated a list of essential platform engineering tools. This is the first of a two-part series exploring the tools that power modern platform teams:

1. Platform Engineering Tools: Essential Guide (this one)
1. Platform Engineering Tools: Advanced Guide (TBD)

---

In this essential guide, we've selected tools that are truly fundamental to platform engineering. Our focus is on quality over cost, as we believe that when building a platform team, prioritizing best practices is key. Opting for the highest-quality tools ultimately proves to be more cost-effective in the long run. Let’s dive in.

In this essential series, we will cover the following tools:

- [GitHub - Code Hosting and CI/CD](#github)
- [Datadog - Observability](#datadog)
- [HashiCorp Terraform - Resource Provisioning](#hashicorp-terraform)
- [HashiCorp Vault - Secret Management](#hashicorp-vault)

## GitHub - Code Hosting and CI/CD

Pros:

- User familiarity (who doesn't use GitHub?).
- Integrated and powerful CI/CD capabilities with GitHub Actions.
- Integrated security like CodeQL, Dependabot and a wide range of 3rd party tools.
- AI advancement with Copilot.
- Good documentation and developer experience.

Cons:

- No free tier for private repositories and self-hosted option.

Comments:

GitLab was once the go-to choice for many platform teams, but we've observed a growing shift towards GitHub in recent years. We covered the comparison in a more [detailed post](/blog/github-vs-gitlab/).

Unless you're working with a limited budget and need the self-hosted option upfront, we recommend GitHub over GitLab.
That said, starting with GitLab and migrating to GitHub is still a viable path. Just keep in mind the potential challenges of becoming too reliant on GitLab CI and its API (an LLM can certainly assist the migration).

## Datadog - Observability

Pros:

Other than the Cons below.

Cons:

- Expensive.
- No self-hosted option.

Comments:

Many people have a love-hate relationship with Datadog. It's an all-in-one observability platform, but it can also be very expensive due to its per-host pricing model. But we think it's a good investment for the right team. For small-to-medium teams, infrastructure costs are typically manageable, with product-market fit being the key focus. For larger teams, there’s often more flexibility to explore alternatives or negotiate better pricing with Datadog.
