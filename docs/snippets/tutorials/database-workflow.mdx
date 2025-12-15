Database change is a tricky part of the application development process: it usually involves multiple databases from different environments and cross-team collaboration, to add on top of it, databases are touch and go. It got us thinking: **can we treat database the same way we treat application code?**

DORA (DevOps Research & Assessment) [pointed out](https://cloud.google.com/architecture/devops/devops-tech-database-change-management) that integrating database work into the software delivery process positively contributes to continuous delivery. It’s about time to make databases a part of the CI/CD cycle.

But how does it work, really? Here, we present our envisioned Database CI/CD workflow.

![database-devops-workflow](/content/docs/tutorials/share/cicd-workflow.webp)

1. The developer creates a Pull Request containing the SQL script;
1. SQL Review CI is automatically triggered to review SQL and offers suggestions via a comment in the PR;
1. The team leader or another peer on the dev teams approves the change and merges the SQL script into the watched branch (default is the main branch);
1. The merge event automatically triggers the rollout pipeline in Bytebase and creates a ticket capturing the intended change;
1. (Optional) an approval flow will be auto matched based on the change risk and be followed via Bytebase’s built-in UI;
1. Approved scripts are executed gradually according to the configured rollout stages;
1. When the rollout is completed, Bitbucket CI may get notified and proceed to deploy the application.
