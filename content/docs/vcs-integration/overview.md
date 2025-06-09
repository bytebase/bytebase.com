---
title: GitOps
---

Bytebase offers a database-as-code workflow, enabling you to manage database changes directly through your version control system (VCS).

Bytebase GitOps workflow is built upon the [Bytebase API](/docs/api/overview). It provides the ultimate flexibility to customize the GitOps workflow to integrate with your CI/CD pipeline.

## Capabilities

Bytebase GitOps integration provides two core capabilities:

### Versioned Database Migrations

- **Database-as-code workflow** - Manage database changes through your VCS just like application code
- **Schema and data changes** - Support for both DDL (CREATE/ALTER/DROP tables, indexes) and DML (INSERT/UPDATE/DELETE) operations
- **Change detection** - Automatically detects and skips already applied migrations, ensuring idempotency
- **Progressive deployments** - Automated rollout across environments (test → staging → production)
- **Multi-database support** - Apply changes across multiple databases with batch operations

### SQL Review

- **Automated validation** - Automatically check SQL files against configurable review policies
- **Quality and compliance checks** - Validate for performance issues, security concerns, and best practices
- **PR integration** - Review results posted directly as pull request comments
- **Merge protection** - Block merges when critical issues are detected
- **Database-specific rules** - Tailored validation for different database engines

## GitOps Workflow

### 1. Development Phase

Developers create SQL migration files in their feature branches:

- Schema changes (DDL): `202501150900_add_user_table.sql`
- Data changes (DML): `202501150901_seed_initial_data_dml.sql`

### 2. Review Phase (Pull Request)

- SQL review runs automatically on the PR
- Validates changes against configured policies
- No release created yet - only validation

### 3. Release Creation (Merge)

When the PR is merged to main:

- GitOps integration automatically creates a new release
- All SQL files from the merge are packaged together
- Release is assigned a unique identifier
- Linked to the merge commit for traceability

### 4. Progressive Deployment

The release follows your configured deployment pipeline:

- **Test Environment**: Automatic deployment after creation
- **Staging Environment**: May require manual approval
- **Production Environment**: Typically requires explicit approval
- Each deployment is tracked with timing and status

**Important**: When deploying a release, Bytebase automatically detects which migrations have already been applied to the target database and skips them. This ensures safe re-deployment and allows the same release to be deployed multiple times without errors.

## Integrations

Bytebase currently supports the following VCS integrations:

- [GitHub](/docs/vcs-integration/github)
- [GitLab](/docs/vcs-integration/gitlab)
- [Bitbucket](/docs/vcs-integration/bitbucket)
- [Azure DevOps](/docs/vcs-integration/azure-devops)

## API

If our VCS integrations do not meet your needs or you want to integrate with other VCSs, you can use the [Bytebase API](/docs/api/overview) to build your own GitOps workflow.
