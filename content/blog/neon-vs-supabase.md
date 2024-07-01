---
title: 'Neon vs. Supabase: Which One Should I Choose'
author: Tianzhou
published_at: 2024/07/02 09:00
feature_image: /content/blog/neon-vs-supabase/cover.webp
tags: Industry
featured: true
description: 'Neon and Supabase are the 2 new generation Postgres service providers. This is an extensive comparison between Neon and Supabase on architecture, compatibility, developer workflow, scalability, operability, integration, compliance, pricing and more.'
---

Besides the typical Postgres service providers like AWS RDS, Google Cloud SQL, DigitalOcean Managed Databases, [Neon](https://neon.tech/) and [Supabase](https://supabase.com/) are the two modern Postgres service providers.

On the surface, Neon and Supabase are different products. Neon is a database service. While Supabase is a BaaS (Backend-as-a-Service) and Postgres is one of its included service.

They are comparable because they both offer a **developer-friendly**, **scalable** Postgres service.

![reddit](/content/blog/neon-vs-supabase/reddit.webp)

And their websites certainly don't help the choice easier.

![neon-website](/content/blog/neon-vs-supabase/neon-site.webp)

![supabase-website](/content/blog/neon-vs-supabase/supabase-site.webp)

At Bytebase, we are Postgres fans. Our founders build [Google Cloud SQL for PostgreSQL](https://cloud.google.com/sql) and Bytebase
also chooses Postgres to store its own metadata. Below we compare Neon and Supabase from
the following dimensions:

- [Architecture](#architecture)
- [Compatibility](#compatibility)
- [Branching](#branching)
- [Operability](#operability)
- [Integration](#integration)
- [Compliance](#compliance)
- [Open Source](#open-source)
- [Pricing](#pricing)

## Architecture

Neon is a shared-storage architecture. It separates the compute and storage. The compute part is
just normal Postgres server, the storage part is a custom-built multi-tenant storage system shared
by all Postgres compute nodes.

![neon-arch](/content/blog/neon-vs-supabase/neon-arch.webp)

Supabase is a battery-included Postgres platform. It uses vanilla Postgres as the core and augments the
database with various middlewares.

![supabase-arch](/content/blog/neon-vs-supabase/supabase-arch.webp)

## Compatibility

Both Neon and Supabase are mostly compatible with the vanilla Postgres. They bear the limitations as
a hosted database service (e.g. no superuser).

- [Neon compatibility](https://neon.tech/docs/reference/compatibility)
- [Supabase compatibility](https://supabase.com/docs/guides/database/postgres/roles-superuser)

## Branching

Both Neon and Supabase are targeting developers, and they both offer a branching feature.

Neon purpose-built paging layer has copy-on-write (CoW), which enables database cloning instantaneous and cost-effective.

![neon-branch](/content/blog/neon-vs-supabase/neon-branch.webp)

Supabase branching integrates with Git repository. It provisions a new empty database, runs the migration script and initializes the seed data.

Overall, Neon's instant branch cloning is closer to the Git semantics.

## Integration

Neon integrates with application platforms such as Vercel to provide a high-fidelity preview environment.

Supabase is an application platform by itself. Thus it boasts a wide variety of integrations.

![supabase-integration](/content/blog/neon-vs-supabase/supabase-integration.webp)

Also there are quite a few SaaS boilerplates based on Supabase.

## Compliance

Both Neon and Supabase achieves SOC2 Type 2:

- [Neon security](https://neon.tech/docs/security/security-overview)
- [Supabase security](https://supabase.com/security)

## Open Source

Neon [open sources](https://github.com/neondatabase/neon) its entire database codebase under Apache-2.0 license.

Supabase also [open sources](https://github.com/supabase/supabase) its entire platform under Apache-2.0 license.

Supabase is one of the most popular repositories on GitHub, while Neon's star growth is also impressive.

[![neon-vs-supabase](/content/blog/neon-vs-supabase/supabase-vs-neon.webp)](https://star-history.com/#supabase/supabase&neondatabase/neon&Date)

## Pricing

Both Neon and Supabase offer a free tier. Neon also offers auto-scaling. Its auto-scaling unit is
CU (1vCPU, 4 GB RAM), and can scale from 0.25 to 8 CU.

## Neon or Supabase

If you want a Postgres database without whistles and bells, Neon is almost the perfect database a developer would desire. It has serverless, branching, auto-scaling.

If you don't care too much about the underlying database technology and want to build a full-stack application, Supabase has everything
you need. It has database, auth, API. In the future, it could also be possible that Supabase offers Neon as a database option.

<HintBlock type="info">

Bytebase can augment Neon and Supabase database with change review process, a data access control and dynamic data masking.

</HintBlock>

## Further Readings

- [Postgres vs. MySQL](/blog/postgres-vs-mysql)
- [Postgres vs. MongoDB](/blog/postgres-vs-mongodb)
