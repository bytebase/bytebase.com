---
title: 'Open Source Postgres Connection Pooler'
author: Adela
updated_at: 2025/10/03 18:00:00
feature_image: /content/blog/open-source-postgres-connection-pooler/cover.webp
tags: Industry
description: List of open source postgres connection poolers
---

Postgres is famously robust, but its connection model isn't. Each client connection maps to a dedicated backend process with non-trivial memory and CPU overhead. Spinning up and tearing down connections is expensive, and even "idle" sessions consume resources. Choosing a safe `max_connections` is more art than science: too low and your app queues; too high and the database wastes RAM and scheduler time.

A connection pooler sits between apps and Postgres to reuse a small number of server connections across many clients, smoothing spikes and protecting the database.

Below is a quick, practical tour of the leading **open-source** options.

---

## PgBouncer (the standard)

https://github.com/pgbouncer/pgbouncer

**What it is.** A lightweight, single-binary connection pooler that's been battle-tested for years. It supports **session**, **transaction**, and **statement** pooling modes, each with trade-offs. Recent releases added quality-of-life improvements like **per-user/per-database connection tracking/limits** and better TLS reload behavior; prepared-statement support is now on by default.

**Why it's popular:**

- Minimal footprint and easy to deploy nearly anywhere.
- Works with managed Postgres (RDS, AlloyDB, etc.) and on-prem clusters.
- Integrated by many operators (e.g., CloudNativePG offers a `Pooler` CRD).

**Good fit for:** most apps needing stable concurrency control and simple ops.

## Cloudflare's fork of PgBouncer (cf-pgbouncer)

https://github.com/cloudflare/cf-pgbouncer

**What it is.** Cloudflare open-sourced their internal fork to harden multi-tenant ops. It includes **auth bug fixes** and features to enforce **per-user and per-pool isolation**, addressing cases where upstream behavior with HBA auth limited those controls. The fork targets large-scale, multi-tenant environments where noisy-neighbor isolation matters.

**Good fit for:** high-scale providers and anyone needing stricter tenant isolation/concurrency enforcement at the pooler layer. For deeper context on CF's multi-tenant performance isolation goals, see their companion post.

## Supavisor (Supabase)

https://github.com/supabase/supavisor

**What it is.** A **cloud-native** pooler built by Supabase (written in Elixir) that emphasizes horizontal scalability and multi-project tenancy. Supabase demonstrated **handling ~1 million concurrent client connections** in testing, highlighting an architecture designed for massive fan-out with lightweight client slots mapped onto a smaller set of server connections. Supavisor now ships as their default pooler.

**Good fit for:** SaaS platforms or services expecting very high connection counts (IoT, event streams, lots of short-lived clients) and wanting modern autoscaling patterns.

## PgDog

https://github.com/pgdogdev/pgdog

**What it is.** A newer **Rust** project that combines **connection pooling**, **load balancing**, and **sharding** in one layer. It supports **session** and **transaction** pooling "like PgBouncer", and advertises the ability to fan out to **hundreds of thousands of clients** while also offering horizontal scale primitives. Docs include admin views (e.g., `SHOW POOLS`) and telemetry.

**Good fit for:** teams wanting a single, high-performance proxy that also tackles routing and (eventually) scale-out patterns beyond pooling.

---

## How to choose (and what to watch for)

**1) Pick the pooling mode wisely**

- **Session pooling:** 1 client ↔ 1 server connection for the session's life. Maximum compatibility (works with temp tables, GUCs, prepared statements) but fewer concurrency gains.
- **Transaction pooling:** server connections are returned to the pool after each transaction - **huge concurrency** boost, but features that rely on session state can break (many ORMs are fine if you avoid session-scoped behaviors).
- **Statement pooling:** most aggressive; rarely needed outside special cases.

**2) Enforce limits at the pooler**
Use per-user/per-database caps to protect Postgres from thundering herds and to keep tenants in bounds. Upstream PgBouncer and Cloudflare's fork provide controls here.

**3) Mind prepared statements & features**
Prepared statements historically clashed with transaction pooling; newer PgBouncer releases improved behavior and defaults, but test your ORM/framework.

**4) Deploy for HA like any stateless proxy**
Run multiple poolers behind a VIP/Load Balancer; configure health checks and drain/reload flows (especially with TLS). Cloud providers and operators (e.g., CloudNativePG) can simplify this.

**5) Tune the basics**
Right-size `server_pool_size`, `max_client_conn`, and timeouts based on your workload's **concurrency** and **transaction duration**. Heroku's PgBouncer guidance gives a clear mental model (pools are per user/db/host tuple).

## Quick comparison

| Project          | Headline strengths                           | Maturity       | Notes                                                                            |
| ---------------- | -------------------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| **PgBouncer**    | Lightweight, ubiquitous, three pooling modes | Very mature    | Great default choice; wide community/packager support.|
| **cf-pgbouncer** | Multi-tenant isolation; auth fixes           | Mature fork    | Useful when you need stricter per-user/pool controls.|
| **Supavisor**    | Cloud-native scale; demonstrated ~1M clients | Young→maturing | Optimized for massive fan-out and provider use cases.|
| **PgDog**        | Pooler + load balancer + sharder (Rust)      | Emerging       | Ambitious all-in-one proxy with horizontal scale features.|

---

## Bottom line

- **Start with PgBouncer** for most apps; it's simple, well-documented, and production-proven.
- If you're a **multi-tenant platform** and need hard per-user/pool isolation, evaluate **Cloudflare's fork**.
- If your challenge is **sheer connection volume** (hundreds of thousands to millions), **Supavisor** is built for that world.
- If you also want **routing/sharding** alongside pooling, keep an eye on **PgDog**.

Whichever you choose, treat the pooler as part of your **capacity and SLO strategy**: cap concurrency, keep transactions short, and monitor pool saturation to keep Postgres fast and happy.