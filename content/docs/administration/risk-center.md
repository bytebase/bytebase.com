---
title: Risk Center
---

<HintBlock type="info">

This feature is only available in the Enterprise Plan.

</HintBlock>

In **Settings > Risk Center**, you can define different risk levels for each operation types (DML, DDL and Create Database) with custom rules.

Once an issue matches the risk conditions, it will be assigned to the corresponding risk level you've defined.
If an issue matches more than one risk levels, the highest level will be used.

You can configure different [custom approval flows](/docs/administration/custom-approval) for each operation types and risk levels.

### Configuration

Click **Add rule** to create a new risk rule.

#### General information

Name the rule so that you may know what it cares about. Select the operation type of rule. The **Risk** can be defined as **High**, **Moderate** or **Low**.

![basic-info](/docs/administration/risk-center/basic-info.webp)

#### Condition

Configure the condition of the rule. You may use a combination of conditions and condition groups.

- Condition: An expression with **Factor**, **Operator** and **Value(s)**. For example, the condition "Environment ID == prod" will match issues executed in the "prod" environment.
- Condition group: A collection of conditions connected by operators "And" and "Or".

![condition](/docs/administration/risk-center/condition.webp)

#### Templates

A template is a system preset example of useful conditions that might be frequently used.

Click **View** to view the detailed condition template. And click **Load** to load the template into your rule.

![templates](/docs/administration/risk-center/templates.webp)
