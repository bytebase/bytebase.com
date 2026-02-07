---
title: 'Enterprise Text-to-SQL: Context, Evaluation, and Governance for Consistent Results'
author: Adela
updated_at: 2026/02/05 12:00:00
feature_image: /content/blog/enterprise-text-to-sql/cover.webp
tags: Industry
featured: true
description: 'Enterprise Text-to-SQL tools are essential for consistent results and compliance in large organizations.'
---

Text-to-SQL felt easy at first.

You ask a question in plain English, and you get SQL. The query runs.

For small setups, that's often fine. If something looks wrong, someone notices and fixes it.

Things change once Text-to-SQL is used across shared databases, by many teams, with real business and compliance impact. At that point, the SQL doesn't just need to run. It needs to be right, safe, and something you can explain later.

That's the point where enterprise-grade Text-to-SQL turns into an engineering problem.

## Different teams hit the same problems

Very different teams ran into the same issues once they put Text-to-SQL in front of real enterprise data.

- OpenAI wrote about building an internal data agent so employees could ask questions about company data, and what broke once it was used day to day. [OpenAI Builds an Internal Data Agent](https://openai.com/index/inside-our-in-house-data-agent/)

- Google Cloud shared practical techniques they had to add just to get Text-to-SQL working reliably over large, messy schemas. [Getting AI to write good SQL: Text-to-SQL techniques explained](https://cloud.google.com/blog/products/databases/techniques-for-improving-text-to-sql)

- Hex reflected on what actually matters when you ship AI features to real users and the environment keeps changing underneath you. [Bitter lessons building AI products](https://hex.tech/blog/bitter-lessons-building-ai-in-hex-product-management/)

- Vercel explained why they eventually removed most of their agent tools in production to make the system easier to reason about. [We removed 80% of our agent’s tools](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools)

Different products. Different users. But once you get into the details, the problems and the fixes start to look very familiar.

## Context: where things first went wrong

Almost everyone started the same way:

"Let's just give the model the schema."

That works until the schema is large, joins aren't obvious, and column names don't explain how the data is actually used.

At **OpenAI**, the problem wasn't just schemas, but choice. Their internal agent had many tools and many paths it could take. It was powerful, but hard to predict. When something went wrong, it was difficult to understand why. The fix wasn't better prompts. It was cutting things down: fewer tools, clearer scope, more fixed steps.

At **Google Cloud**, the failures showed up as incorrect joins and missing filters. The model wasn't broken — it was guessing. Raw DDL didn't give enough signal. Their solution was to stop relying on schema text alone and instead add structure: explicit table relationships, column hints, and examples that reflected how the data is actually queried.

At **Vercel**, this showed up as operational risk. Too many tools meant too many failure modes. They removed most of them. The system became less flexible, but much easier to reason about.

At **Hex**, unclear context turned into confused analysts. If the system didn't reflect how metrics were defined in practice, people drew the wrong conclusions from the results.

Across all of these cases, the same thing happened:

Giving the system everything made it worse.
Giving it less, but making that "less" very clear, made it usable.

In practice, this meant things like:

- Preselecting relevant tables
- Defining allowed join paths
- Limiting what actions are even possible
- Grounding queries in real usage, not just schema text

## Evaluation: when "the query ran" stopped meaning much

The next issue was harder to spot.

Most bad queries didn't fail. They ran fine. They returned data. They were just wrong.

This shows up clearly in **Hex**'s write-up. Analysts would get results that looked reasonable but were slightly off. After that happened a few times, trust disappeared. Once users feel they need to double-check everything, the feature stops being useful.

**Google Cloud** described the same issue from a systems angle. Execution success doesn't tell you whether the query matches the question. A missing filter or a wrong join can quietly change the meaning.

At **OpenAI**, even after tightening context, similar questions could produce different queries unless extra checks were added. That inconsistency was a problem on its own.

**Vercel** focused on something very practical: when something breaks, can you tell why? If you can't explain a result, people won't rely on it.

Over time, teams stopped treating "it runs" as the finish line.

Instead, they started doing things that look very familiar to anyone who's worked on production systems:

- Checking query shape, not just syntax
- Watching for missing filters or suspicious joins
- Preferring repeatable output over "creative" variations
- Making the generated SQL visible so someone can reason about it

That's when Text-to-SQL stopped feeling like a trick and started behaving more like normal software.

## Governance: treating AI like any other database user

This is the part many early systems skipped.

In real systems, SQL is access to sensitive data, business logic, and regulated workflows. Letting AI generate SQL without limits is effectively giving it broad database access.

None of these teams stayed in that mode for long.

**Vercel** reduced what the system could do at all. Fewer capabilities meant fewer risks.

**OpenAI** leaned toward predictability. The agent needed to behave in ways people could anticipate, not surprise them.

**Google Cloud** embedded constraints directly into how queries are formed, instead of trusting the model to always "do the right thing".

**Hex** made transparency non-negotiable. Users could see the SQL and understand how a result was produced.

In practice, this all looks very boring — and that’s a good thing:

- Read-only by default
- Clear limits on tables and columns
- Extra checks for risky operations
- Logs of who asked what, and what actually ran

AI doesn't get special rules. It follows the same ones as everyone else.

## Different implementations, same shape

If you ignore the product names and just look at what changed, the shape is almost identical:

| Area       | What changed                                                |
| ---------- | ----------------------------------------------------------- |
| Context    | From full schemas to small, well-defined inputs             |
| Evaluation | From "it runs" to "does this actually answer the question?" |
| Governance | From implicit trust to explicit limits and logs             |

No one fixed this with clever prompting. No one waited for a better model. They fixed it by putting engineering discipline around the model.

## Closing

Enterprise Text-to-SQL isn't about letting AI write SQL for you. It's about deciding: what SQL is allowed, when it's acceptable, and who owns the result.

Different teams took different routes, but they all ended up in the same place: Text-to-SQL only works at scale when it's constrained, checked, and governed.

That's not what makes it flashy. It's what makes it usable.