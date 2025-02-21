---
title: Risk Center
feature_name: CUSTOM_APPROVAL
---

In **Settings > Risk Center**, you can define different risk levels for each operation types ([DML, DDL, Create Database](/docs/change-database/change-workflow/), [Request Query](/docs/security/database-permission/query/), [Request Export](/docs/security/database-permission/export/)) with custom rules.

Once an operation matches the risk conditions, it will be assigned to the corresponding risk level you've defined.
If an operation matches more than one risk levels, the highest level will be used.

## Usage

### Custom Approval

You can configure different [custom approval flows](/docs/administration/custom-approval) for each operation types and risk levels.

![ddl-dml](/content/docs/administration/risk-center/ddl-dml.webp)

![request-query](/content/docs/administration/risk-center/request-query.webp)

### SQL Review

[SQL review](/docs/sql-review/overview/) returns the associated risk level for the checked SQL statement. Bytebase GitHub action can also surface the risk level under a [PR](https://github.com/bytebase/release-cicd-workflows-example/pull/4).

![sql-review](/content/docs/administration/risk-center/github-actions-risk.webp)

## Configuration

Click **Add rule** to create a new risk rule.

### General

Name the rule so that you may know what it cares about. Select the operation type of rule. The **Risk** can be defined as **High**, **Moderate** or **Low**.

![basic-info](/content/docs/administration/risk-center/basic-info.webp)

### Condition

Configure the condition of the rule. You may use a combination of conditions and condition groups.

- Condition: An expression with **Factor**, **Operator** and **Value(s)**. For example, the condition "Environment ID == prod" will match issues executed in the "prod" environment.
- Condition group: A collection of conditions connected by operators "And" and "Or".

![condition](/content/docs/administration/risk-center/condition.webp)

### Templates

A template is a system preset example of useful conditions that might be frequently used.

Click **View** to view the detailed condition template. And click **Load** to load the template into your rule.

![templates](/content/docs/administration/risk-center/templates.webp)
