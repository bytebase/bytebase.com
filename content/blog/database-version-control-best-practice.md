---
title: Database Version Control Best Practice
author: Adela
updated_at: 2025/04/06 16:40:00
feature_image: /content/blog/database-version-control-best-practice/cover.webp
tags: Explanation
description: 'Database version control is the practice of managing and tracking changes to a database schema and its associated data over time. Why best practice matters? Mitigate risks, improve collaboration, and ensure data audibility.'
keypage: true
---

This is a series of articles about database version control and database-as-code (GitOps)

1. [Database Version Control](/blog/database-version-control)
1. [Database Version Control, State-based or Migration-based?](/blog/database-version-control-state-based-vs-migration-based)
1. [Database as Code - the Good, the Bad and the Ugly](/blog/database-as-code)
1. [The Database as Code Landscape](/blog/database-as-code-landscape)
1. Database Version Control Best Practice (this one)

---

Database version control is the practice of managing and tracking changes to a database schema and its associated data over time. Why best practice matters? Mitigate risks, improve collaboration, and ensure data audibility.

Whether you prefer working with **scripts** along with GitOps or using a **GUI-based tool**, the key is to establish a reliable, repeatable, and auditable process. This guide walks you through best practices with both approaches in mind.

### 1. Prefer Migration-based to State-based

Migration-based or State-based? This is the first major decision you need to make:

    - **Migration-based**: You explicitly define step-by-step changes (e.g., `add_user_table.sql`). This works well with both script-based workflows (e.g., Flyway, Liquibase) and GUI tools like Bytebase.
    - **State-based**: You define the desired final state, and tools compute the diff. The classic example is DACPAC for SQL Server.

You may dig deeper into the [Database Version Control, State-based or Migration-based?](/blog/database-version-control-state-based-vs-migration-based)

### 2. Version All Artifacts

Check in everything—tables, procedures, views, seed data—as SQL files in version control if you are using script-based approach. Don't miss permission and roles, resources, etc.

GUI-based tools require you to create database-related tickets all from its own UI or via API (may trigger from other ticketing system like Jira, Linear, etc). Never try to skip it directly to the database which may raise uncaughtable issues.

### 3. Practice Atomic Commit

One migration = one logical change. Each change should be tracked in its own migration file or ticket (e.g., adding a table, modifying a column). It simplifies the debug, review, rollback and audit.

### 4. Automate Testing and Validation

For GUI-based approach, tools like Bytebase offer configurable SQL reviews and dry-run previews to suggest the estimated number of affected rows.

For Script-based approach, depending on your CI/CD tool, you can use GitHub Actions, GitLab CI, etc to integrate database testing tools to run SQL lint, syntax check and naming convention check.

### 5. Document All Changes

Add comments at the top of each file and link it to Jira/GitHub/GitLab issue for Script-based approach. Write detailed comments for GUI-based approach. This helps with compliance and knowledge sharing.

### 6. Enforce Approvals

For Script-based approach, you can enforce code review via GitHub/GitLab/Azure DevOps pull request.

GUI-based tools like Bytebase provides risk-based auto-match approval flow, for which you can customize risk level depending on operation, target database and specify approval strategy.

### 7. Use a Clear Staging Strategy

Use trunk-based development for script-based approach, use feature branches for Database changes and then merge via PRs.

For GUI-based approach, Bytebase offers environment-based multi-stage workflow to enable changes from dev to staging and then to production environments.

### 8. Plan for Rollbacks

Provide a corresponding `xxxx_down.sql` or ensure backward compatible SQLs for each migration in script-based approach.

GUI tools like Bytebase provides built-in 1-click rollback feature.

### 9. Secure Sensitive Data

Don't hardcode secrets in your scripts, use environment variables or secrets management tools like HashiCorp Vault, AWS Secrets Manager, etc in script-based approach. Use tool-specific secret injection features or managed credential stores in GUI-based approach.

### 10. Track and Audit Every Change

For script-based approach, you can check schema versions, alert on failed migrations. For GUI-based tools like Bytebase, there is change history and audit logs for each migration.

## Summary

| Best Practice                             | Script-based Approach                                                               | GUI-based Approach                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Prefer Migration-based to State-based** | Define step-by-step changes in SQL files (e.g., Flyway, Liquibas, Bytebase)         | Use Bytebase to manage migrations                                        |
| **Version All Artifacts**                 | Check in all database objects (tables, procedures, views, permissions) as SQL files | Create all changes through the tool's UI or API, never bypass the system |
| **Practice Atomic Commit**                | One migration file per logical change                                               | One ticket per logical change                                            |
| **Automate Testing and Validation**       | Integrate SQL linting, syntax checking via CI/CD pipelines                          | Bytebase provides built-in SQL review and dry-run                        |
| **Document All Changes**                  | Add comments and link to issue trackers in migration files                          | Write detailed comments within the tool's interface                      |
| **Enforce Approvals**                     | Use Git platform pull request reviews                                               | Use Bytebase to configure risk-based approval workflows                  |
| **Use a Clear Staging Strategy**          | Use trunk-based development with feature branches                                   | Utilize environment-based multi-stage workflows (dev → staging → prod)   |
| **Plan for Rollbacks**                    | Provide corresponding down migrations or backward compatible changes                | Bytebase provides built-in 1-click rollback                              |
| **Secure Sensitive Data**                 | Use environment variables or secrets management tools                               | Leverage tool-specific secret injection or managed credential stores     |
| **Track and Audit Every Change**          | Monitor schema versions and alert on failed migrations                              | Bytebase provides built-in change history and audit logs                 |

Whether you're managing migrations through scripts along with GitOps or clicking through a UI, consistency is the key to safe database change management.

GUI tools accelerate onboarding, reduce human error, and often come with guardrails.

Script-based workflows offer greater flexibility, transparency, and Git-native operations.

The best practice? Pick one path that fits your team’s skill set, tooling, and stage of maturity. Just make sure every change is versioned, tested, reviewed, and traceable.

And remember, don't push on Friday.
