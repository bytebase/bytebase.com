---
title: 'ServiceNow and GitHub Integration for Database Change Automation'
author: Tianzhou
updated_at: 2025/03/07 09:00:00
feature_image: /content/blog/database-change-automation-github-servicenow-integration/banner.webp
tags: How-To
featured: true
description: How to integrate ServiceNow, GitHub with Bytebase to Automate Database Changes.
---

## Why ServiceNow

Many enterprise organizations have adopted ServiceNow as their centralized IT Service Management (ITSM) platform.
Database changes demand robust approval workflows and comprehensive audit capabilities. ServiceNow has emerged as the industry standard for managing all types of approvals, including critical database changes that can impact business operations.

## Traditional ServiceNow Database Change Workflow

![servicenow-workflow](/content/blog/database-change-automation-github-servicenow-integration/servicenow-workflow.webp)

Above diagram illustrates the conventional workflow for database changes in using ServiceNow:

1. **Request Initiation**: The Requestor creates a change request in ServiceNow, attaching SQL scripts as TXT files along with implementation instructions. This formal request captures the business need and technical details of the proposed database change.

1. **CAB Review and Approval**: The Change Advisory Board (CAB) evaluates the request, assessing potential risks, business impact, and scheduling considerations. The CAB may request additional information or modifications before granting approval.

1. **DBA-Requestor Communication**: The Database Administrator communicates with the Requestor through channels like instant messaging or email to clarify requirements or refine the SQL scripts. This often involves multiple exchanges to ensure technical accuracy.

1. **SQL Execution**: After finalizing the SQL scripts, the DBA manually executes them against the application database. This step requires careful attention to detail, as the DBA must follow the approved instructions precisely.

1. **Request Closure**: The DBA returns to ServiceNow to close the change request, documenting the implementation details, time of execution, and any issues encountered. This completes the audit trail and provides a record for compliance purposes.

1. **Post-Implementation Verification**: Though not explicitly shown in the diagram, the Requestor typically verifies that the database changes achieved the intended business outcome, which may lead to additional change requests if adjustments are needed.

This structured approach ensures governance and compliance but often introduces delays due to manual handoffs and creates opportunities for miscommunication between technical and business stakeholders.

## The GitOps Way

![gitops-workflow](/content/blog/database-change-automation-github-servicenow-integration/gitops-workflow.webp)

The GitOps model offers an alternative approach to database change management that leverages software development best practices:

1. **Developer-Initiated Changes**: A developer creates a Pull Request (PR) containing the SQL change scripts and related documentation. This places database changes under the same version control as application code, providing history and context.

1. **Technical Review**: A technical lead or senior team member reviews the PR, examining the SQL for correctness, performance impacts, and adherence to database standards.

1. **PR Approval and Merge**: Once approved, the PR is merge, officially incorporating the changes into the codebase.

1. **Automated Deployment**: The merge automatically triggers a CI/CD pipeline that deploys the SQL changes to the target database. This pipeline can include additional safeguards like schema validation, automated testing, and incremental deployment strategies.

The primary advantage of this approach is full automation, significantly reducing manual effort and human error. Changes move from development to production without manual intervention, accelerating delivery timelines and ensuring consistency across environments. Additionally, all changes are permanently documented in the Git history with clear authorship and reasoning.

However, the GitOps approach has limitations:

1. Unlike ServiceNow, which provides a business-friendly interface familiar to non-technical users, version control system such as GitHub remains primarily a developer-oriented platform. Business leaders, compliance officers, and operations managers typically lack GitHub accounts or the technical knowledge to evaluate SQL scripts in PRs, creating a disconnect between technical implementation and business governance.

1. The audit trail, while comprehensive from a technical perspective, may not satisfy the compliance requirements of highly regulated industries that rely on ServiceNow's purpose-built approval workflows and audit capabilities.

Version control system vendors like GitHub have recognized this disconnect between developer workflows and enterprise governance requirements. In response, GitHub has developed integration capabilities that allow organizations to leverage the strengths of both approaches through [ServiceNow GitHub Actions](https://github.com/marketplace/actions/servicenow-devops-change-automation) and [deployment protection rules](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/configuring-custom-deployment-protection-rules#using-existing-custom-deployment-protection-rules).

![github-deployment-protection-doc](/content/blog/database-change-automation-github-servicenow-integration/github-deployment-protection-doc.webp)

## Optimal Database Change Workflow

We can combine ServiceNow for approval and GitHub for GitOps to get the best of both worlds, leveraging ServiceNow's robust governance capabilities alongside GitHub's developer-friendly workflows. This integration can be further enhanced by bringing in Bytebase that provides dedicated database CI/CD.

![servicenow-github-bytebase-workflow](/content/blog/database-change-automation-github-servicenow-integration/servicenow-github-bytebase-workflow.webp)

The integrated workflow operates as follows:

1.  **Developer Initiates Change**: A developer creates a Pull Request (PR) in GitHub containing the database changes.

2.  **Automated Integrations Triggered**:

    a. A GitHub Action or custom App creates a ServiceNow change request, ensuring governance requirements are met.

    b. Simultaneously, [Bytebase SQL Review](https://www.bytebase.com/docs/sql-review/overview/) is triggered to analyze the SQL scripts, providing automated technical validation ([Sample PR](https://github.com/bytebase/example-gitops-github-flow/pull/6#issuecomment-2731413296)).

    ![bytebase-sql-review](/content/blog/database-change-automation-github-servicenow-integration/bytebase-sql-review.webp)

3.  **Multiple Approval Gates Enforced**:

    a. PR merge is blocked pending Bytebase SQL review results.

    b. Technical lead or peers must review and approve the PR in GitHub.

    c. The ServiceNow approval flow, including CAB review with managers and stakeholders, must be completed.

4.  **PR Merge**: Once all pre-conditions are satisfied (SQL Review, peer approval from GitHub, and business approval via ServiceNow), the PR is merged.

5.  **Deployment Workflow Creation**: Merging triggers [Bytebase GitHub Actions](https://github.com/marketplace?query=bytebase&type=actions) to create a deployment workflow.

    ![github-deployment-workflow](/content/blog/database-change-automation-github-servicenow-integration/github-deployment-workflow.webp)

6.  **Optional Deployment Protection Rules**:

     <HintBlock type="info">

         Vendor specific support. GitHub provides [deployment protection rules](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-deployments/configuring-custom-deployment-protection-rules#using-existing-custom-deployment-protection-rules). Azure DevOps provides [pipeline approvals and checks](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass).

    </HintBlock>

    a. Additional safeguards can be implemented requiring technical lead manual rollout approval.

    b. ServiceNow approval may be required again at the deployment stage for critical environments.

7.  **Database Change Deployment**: After all deployment protection rules are satisfied, Bytebase executes the database change deployment.

The benefit of this integrated approach is that each system handles what it does best. Bytebase, as a dedicated database change management tool, excels at database-specific tasks that neither GitHub nor ServiceNow can natively provide:

1. Automatically lint SQL scripts during PR.
1. Advanced change capabilities tailored specifically for databases, such as [batch change](/docs/change-database/batch-change/), [schema drift detection](/docs/change-database/drift-detection/), [rollback](/docs/change-database/rollback-data-changes/).
1. Maintain database-specific change history and audit trails, creating a specialized record of all schema and data modifications that complements ServiceNow's broader change management documentation.

The combined approach gives database administrators and engineers deep visibility into database evolution while still maintaining the governance requirements through ServiceNow and the developer-friendly workflow in GitHub.

## Beyond Database Change Automation

Besides complementing ServiceNow and GitHub for database change automation, Bytebase also provides a [web-based SQL Editor](/docs/sql-editor/overview/) that facilitates Just-in-Time database access control and applies dynamic data masking on the fly when querying the database. Thus, you can standardize database change and query process in a single place.
