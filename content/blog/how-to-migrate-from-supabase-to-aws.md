---
title: 'How to Migrate from Supabase to AWS'
author: Adela
updated_at: 2025/11/07 18:00:00
feature_image: /content/blog/how-to-migrate-from-supabase-to-aws/cover.webp
tags: Explanation
description: 'A comprehensive guide on migrating from Supabase to AWS, covering database, auth, storage, functions, realtime, and networking.'
---

## From Supabase to AWS

[Supabase](https://supabase.com/) has become the go-to choice for developers who want to build fast.
It gives you everything in one place — PostgreSQL, Auth, Storage, and Edge Functions — without needing to manage infrastructure.

But as your product matures, new requirements appear that go beyond what Supabase’s all-in-one model can offer:

- **Advanced database management** – high availability, read replicas, automated backups, and fine-tuned performance.
- **Analytics and data warehousing** – integrating with data lakes and large-scale ETL pipelines.
- **Enterprise-grade compliance and security** – meeting SOC, ISO, HIPAA, or FedRAMP standards.
- **Granular IAM and networking** – unifying database access, APIs, and infrastructure under a single identity and policy system.

That's where hyperscalers like [AWS](https://aws.amazon.com/), [GCP](https://cloud.google.com/), and [Azure](https://azure.microsoft.com/) come in. They offer a **best-of-breed ecosystem** — each component is purpose-built, scales independently.

**This guide focuses on AWS**, but the migration principles and architecture patterns apply equally to other cloud providers.

We'll walk you through how to migrate each Supabase component to its AWS counterpart.

---

## Debundle Supabase

| Supabase Component   | Equivalent                                     | Notes                                                   |
| -------------------- | ---------------------------------------------- | ------------------------------------------------------- |
| **Networking & IAM** | VPC + IAM roles/policies                       | AWS foundation - must be set up first                   |
| **Auth**             | Amazon Cognito / BetterAuth / Auth0            | Centralized user management, SSO, and MFA               |
| **Storage**          | Amazon S3                                      | Object storage with IAM-based access and CloudFront CDN |
| **Functions**        | AWS Lambda + API Gateway                       | Event-driven compute for backend logic                  |
| **Realtime**         | AppSync / EventBridge / API Gateway WebSockets | Live updates, subscriptions, or event streams           |
| **Database**         | Amazon RDS / Aurora                            | Migrate last - becomes simple PostgreSQL migration      |

**Recommended migration order:**

This guide uses a **Services-First** approach — decouple Supabase-specific services first, then migrate the database last as a simple PostgreSQL migration.

1. **Networking & IAM** – set up AWS infrastructure (VPC, subnets, IAM roles).
1. **Auth** – migrate to Cognito (decouples from Supabase `auth` schema).
1. **Storage** – migrate to S3 (decouples from Supabase `storage` schema).
1. **Functions** – redeploy to Lambda (update to use Cognito + S3).
1. **Realtime** – replace with AppSync/EventBridge (removes logical replication dependency).
1. **Database** – simple PostgreSQL migration of application data only (`public` schema).

**Why this order?** By migrating services first, the Supabase `auth` and `storage` schemas become dormant. The final database migration is just your application data — lower risk, simpler cutover, and easier to validate.

Always start in **staging**, validate each part, then proceed to production.

### 1. Networking and IAM

> **Note:** The networking and identity concepts in this section apply to all major cloud providers (AWS, GCP, Azure). This guide focuses on AWS implementations, but the architecture patterns translate directly to VPC/IAM (GCP) or VNet/RBAC (Azure).

**Supabase:**
Abstracted networking and simple project-level access roles.

**AWS approach:**
Full-control networking and IAM system for isolation and compliance.

| Concept                | Supabase          | AWS Equivalent                 |
| ---------------------- | ----------------- | ------------------------------ |
| Top-level entity       | Organization      | AWS Organization               |
| Project                | Supabase Project  | AWS Account                    |
| Environment separation | Multiple projects | Separate accounts or VPCs      |
| Access control         | Role-based in app | IAM users, roles, and policies |

**Migration focus:**

1. Create VPC with public and private subnets across multiple Availability Zones.
1. Set up **Security Groups** for database, Lambda, and API Gateway.
1. Configure **Route Tables** and **NAT Gateways** for private subnet internet access.
1. Create **IAM roles** for Lambda, RDS, S3, and Cognito.
1. Set up **VPC endpoints** for AWS service access (S3, DynamoDB, etc.).
1. Use **AWS Organizations** for environment isolation (dev, staging, prod).

**Key advantages:**

- Granular control over infrastructure and networking.
- Centralized access and audit through IAM.
- Broad compliance coverage — [AWS Compliance](https://aws.amazon.com/compliance) vs [Supabase Security](https://supabase.com/security).

### 2. Auth → Amazon Cognito (or Alternatives)

**Supabase:**
[GoTrue](https://supabase.com/docs/guides/auth/auth-go-true)-based Auth with email/password and [OAuth integration](https://supabase.com/docs/guides/auth/social-login), connected to Postgres RLS.

**AWS replacement:**

- [Amazon Cognito](https://aws.amazon.com/cognito/) for user pools, federated identity, and SSO integration.
- Alternatives like [BetterAuth](https://betterauth.com/), [Auth0](https://auth0.com/), or [Clerk](https://clerk.com/) if developer-experience is a priority.

**Migration focus:**

1. Export user data (emails, metadata, OAuth IDs) from `auth.users`.
1. Import into Cognito User Pool.
1. Configure OAuth providers (Google, GitHub, etc.).
1. Update frontend SDKs and backend JWT verification.
1. Update application authorization logic (see RLS section below).
1. Require one-time user re-authentication after migration.

> **Important:** If you're using Supabase Row-Level Security (RLS) policies, they reference `auth.uid()` and won't work after migrating to Cognito. See the **Handling RLS Policies** section in the Database migration step for strategies to address this.

**Key advantages:**

- Deep IAM integration with AWS services.
- SAML/OIDC support and MFA.
- Fine-grained access control and security compliance.

### 3. Storage → Amazon S3

**Supabase:**
S3-compatible object storage managed inside Supabase, with integrated access policies and signed URLs.

**AWS replacement:**

- [Amazon S3](https://aws.amazon.com/s3/) for raw file storage.
- [CloudFront](https://aws.amazon.com/cloudfront/) for CDN delivery.

**Migration focus:**

1. Create an S3 bucket with IAM-based access.
1. Copy data using `aws s3 sync` or `rclone`.
1. Recreate folder structure and permissions.
1. Update signed URL logic to use S3 pre-signed URLs.
1. Add CloudFront for caching if needed.

**Key advantages:**

- Lifecycle policies, versioning, and encryption (SSE-KMS).
- Regional redundancy and cost-based storage tiers.
- Tight integration with Lambda, Athena, and Redshift.

### 4. Functions → AWS Lambda

**Supabase:**
[Edge Functions](https://supabase.com/docs/guides/functions/edge-functions) built with [Deno](https://deno.com/) for lightweight APIs.

**AWS replacement:**

- [AWS Lambda](https://aws.amazon.com/lambda/) for event-driven functions.
- [API Gateway](https://aws.amazon.com/api-gateway/) for HTTP endpoints.

**Migration focus:**

- Rewrite Deno functions in Node.js, Python, or Go.
- Deploy via Lambda console, CLI, or IaC (Terraform/CDK).
- Store environment variables in **Secrets Manager** or **Parameter Store**.
- Connect Lambda to S3, DynamoDB, or EventBridge as needed.

**Key advantages:**

- Multiple runtimes and deployment methods.
- Native observability via CloudWatch.
- Scales automatically with demand.

### 5. Realtime and Events → AppSync / EventBridge

**Supabase:**
Realtime engine based on Postgres logical replication and WebSockets.

**AWS replacements:**

- [AppSync](https://aws.amazon.com/appsync/) – GraphQL subscriptions for live updates.
- [EventBridge](https://aws.amazon.com/eventbridge/), [SNS](https://aws.amazon.com/sns/), or [SQS](https://aws.amazon.com/sqs/) – event-driven messaging.
- [API Gateway WebSockets](https://aws.amazon.com/api-gateway/) – persistent connections for custom protocols.

**Migration focus:**

1. Identify realtime use cases (chat, collaboration, notifications).
1. Choose appropriate AWS service per pattern.
1. Replace database-triggered realtime with event-driven design.

**Key advantages:**

- Decoupled architecture.
- Scalable pub/sub and async event flows.
- Integrates natively with Lambda and analytics pipelines.

### 6. Database → Amazon RDS / Aurora

**Supabase:**
Managed PostgreSQL with `auth`, `storage`, and `public` schemas.

**AWS replacement:**

- **Amazon RDS (PostgreSQL)** – Multi-AZ, automated backups, PITR, read replicas.
- **Amazon Aurora (PostgreSQL-compatible)** – high-performance clustered Postgres.
- **DynamoDB** – optional for NoSQL or key-value workloads.

**Why migrate last:**

By this point, Auth is on Cognito, Storage is on S3, and Realtime has been replaced with AppSync/EventBridge. The Supabase `auth` and `storage` schemas are now dormant — your application no longer uses them.

This makes the database migration simple — just a vanilla PostgreSQL migration of your application data (the `public` schema).

#### Handling Row-Level Security (RLS) Policies

Supabase uses PostgreSQL [Row-Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security) policies heavily. These policies reference Supabase-specific functions and the `auth.users` table:

```sql
-- Example Supabase RLS policy
CREATE POLICY "Users can only see their own data"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);
```

The problem: `auth.uid()` and `auth.jwt()` are Supabase-specific functions that won't work after migrating to Cognito.

**Migration Strategy: Replace RLS with Application-Level Authorization**

The recommended approach is to move authorization logic from the database to your application layer (Lambda functions):

- **More flexible** – Works with any auth provider (Cognito, Auth0, BetterAuth, etc.).
- **Easier to test** – Authorization logic can be unit tested independently.
- **Framework-agnostic** – Not tied to PostgreSQL-specific features.
- **Modern best practice** – Industry standard for cloud-native applications.
- **Better debugging** – Authorization failures are easier to trace in application code.

Implementation example:

```javascript
// Lambda function with application-level authorization
const getUserProfile = async (event) => {
  // Extract Cognito user ID from JWT claims
  const cognitoUserId = event.requestContext.authorizer.claims.sub;

  // Enforce authorization in application code
  const profile = await db.query('SELECT * FROM profiles WHERE user_id = $1', [cognitoUserId]);

  return profile;
};
```

**Database migration focus:**

1. **Audit RLS policies** – Identify all RLS policies in your schema (see RLS migration strategy above).
1. Set up RDS/Aurora instance in the VPC created in step 1.
1. Export `public` schema and data using `pg_dump` (ignore dormant `auth` and `storage` schemas).
1. Restore into RDS or Aurora (same Postgres version).
1. **Implement application-level authorization** – Migrate RLS logic to Lambda functions as shown above.
1. **Remove RLS policies** – Drop policies once application-level authorization is tested and deployed.
1. Recreate extensions (e.g., `pgcrypto`, `uuid-ossp`) if used in application.
1. Validate schema and queries in staging environment.
1. Update application connection strings to point to RDS/Aurora.
1. Perform final cutover during low-traffic window.

**Key advantages:**

- Performance tuning and [CloudWatch metrics](https://aws.amazon.com/cloudwatch/).
- Private networking in VPC with security groups.
- Access to AWS analytics tools ([Redshift](https://aws.amazon.com/redshift/), [Athena](https://aws.amazon.com/athena/), [Glue](https://aws.amazon.com/glue/)).

## Conclusion

Migrating from Supabase to AWS isn't just a lift-and-shift — it's a step toward scalable, enterprise-ready infrastructure.

Use the **Services-First** approach to decouple components gradually:
**Networking & IAM → Auth → Storage → Functions → Realtime → Database.**

By migrating services first, the final database migration becomes a simple PostgreSQL-to-PostgreSQL operation with just your application data — lower risk, simpler cutover, and easier to validate.

Supabase helps you **build fast**.
AWS helps you **scale next** — with advanced database management, analytics, IAM, and compliance.

When done right, the migration lays a foundation your product can grow on for years to come.
