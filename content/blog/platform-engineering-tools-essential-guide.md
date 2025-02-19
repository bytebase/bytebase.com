---
title: 'How to Pick Platform Engineering Tools in 2025: Essential Guide'
author: Tianzhou
updated_at: 2025/02/18 09:00:00
feature_image: /content/blog/platform-engineering-tools-essential-guide/banner.webp
tags: Industry
featured: true
description: Introduce the essential tools for platform engineering. Covering code hosting, CI/CD, observability, resource provisioning, and secret management.
---

<HintBlock type="info">

The post does not cover infrastructure components like Kubernetes, database systems. It also does not cover collaboration tools like Slack, Notion, Jira, Linear.

</HintBlock>

Platform engineering adoption has surged in recent years. To better understand the landscape, we interviewed over 100 platform teams about their challenges and the tools they rely on. Drawing from these insights and our own experience, we have curated a list of essential platform engineering tools. This is the first of a two-part series exploring the tools that power modern platform engineering teams:

1. Platform Engineering Tools: Essential Guide (this one)
1. [Platform Engineering Tools: Advanced Guide](/blog/platform-engineering-tools-advanced-guide/)

---

We pick GitHub, Datadog, Terraform and Vault as the platform engineering essential toolkit. We believe these tools
represent the best practices in the industry and serve as the fundamental building blocks to expand your platform engineering practice. Let’s dive in.

## [GitHub](https://github.com/) - Code Hosting and CI/CD

**Pros:**

- User familiarity (who doesn't use GitHub?).
- Integrated and powerful CI/CD capabilities with GitHub Actions.
- Integrated security like CodeQL, Dependabot and a wide range of 3rd party tools.
- AI advancement with Copilot.
- Good documentation and developer experience.

**Cons:**

- No free tier for private repositories and self-hosted option.

**Comments:**

GitLab was once the go-to choice for many platform teams, but we've observed a growing shift towards GitHub in recent years. We covered the comparison in a more [detailed post](/blog/github-vs-gitlab/).

Unless you're working with a limited budget and need the self-hosted option upfront, we recommend GitHub over GitLab.
That said, starting with GitLab and migrating to GitHub is still a viable path. Just keep in mind the potential challenges of becoming too reliant on GitLab CI and its API (an LLM can certainly assist the migration).

## [Datadog](https://www.datadoghq.com/) - Observability

**Pros:**

Other than the Cons below.

**Cons:**

- Expensive.
- No self-hosted option.

**Comments:**

Many people have a love-hate relationship with Datadog. It's an all-in-one observability platform, but it can also be very expensive due to its per-host pricing model. But we think it's a good investment for the right team. For small-to-medium teams, infrastructure costs are typically manageable, with product-market fit being the key focus. For larger teams, there’s often more flexibility to explore alternatives or negotiate better pricing with Datadog.

## [Terraform](https://www.terraform.io/) - Resource Provisioning

**Pros:**

- Best practice. IaC, state-based, declarative approach.
- Great ecosystem with many terraform providers.

**Cons:**

- Learning curve.
- HCL (Hashicorp Configuration Language) as the Terraform DSL is more limited than a general purpose programming language.

**Comments:**

Terraform is usually the first tool that comes to mind when people think of platform engineering. While it has faced competition from newer tools like [Pulumi](https://www.pulumi.com/) in recent years, Terraform or its community fork [OpenTofu](https://opentofu.org/) remains a reliable choice, particularly due to its extensive provider ecosystem. You're more likely to find a Terraform provider for your infrastructure than for most other alternatives.

## [Vault](https://www.vaultproject.io/) - Secret Management

**Pros:**

- Best practice for secret management. Dynamic secrets, access control, audit logs.
- Good ecosystem (Terraform and other vendor integrations).
- Open-source.

**Cons:**

- Learning Curve.
- Operational overhead.
- Single point of failure (SPOF).

**Comments:**

I first learned about HashiCorp Vault at PGConf Silicon Valley 2016, and I was immediately hooked. When it comes to security, you definitely don’t want to reinvent the wheel by building your own secret management system—Vault is a game-changer. The key question is when to onboard it. Our recommendation is to start with Vault from day one as you establish your platform team. Begin with its KV engine, and as you scale, you can move to more advanced database engine alike. The goal is to establish best practices early on, setting a solid foundation for security. Get the team used to a centralized secret management system as opposed to having it spread across multiple tools.

## Summary

When picking the essential tools for platform engineering, we focus on the following criteria:

- **Quality over cost**. Represent the best practices in the industry. Opting for the highest-quality tools ultimately proves to be more cost-effective in the long run.
- **Comprehensiveness**. A single tool can cover multiple aspects of platform engineering.
- **Strong ecosystem**. A robust ecosystem ensures that tools can integrate seamlessly with others. It's also easier to find help and resources when you have a strong ecosystem.

As your platform engineering practice evolves, your team can begin to explore more specialized, domain-specific tools. Check out the [advanced guide](/blog/platform-engineering-tools-advanced-guide/), where we’ll dive deeper into the tools that support larger, more complex environments.
