---
title: SQL Advisor
---

Bytebase provides customizable SQL lint to check common issues in data change and query process - it currently supports following forms:

- [**UI**](/docs/sql-review/sql-advisor/ui) - If you use Bytebase as a whole system, SQL Advisor will check common issues in schema/data change process and data query process;
- [**API**](/docs/sql-review/sql-advisor/api) - If you have your own database management system, it's possible to integrate SQL Advisor via API;
- [**GitHub Action**](/docs/sql-review/sql-advisor/github-action) - If all your SQL files are stored on GitHub.com, you can use GitHub action to do prechecks before they're merged into the main branch.
- [**GitHub App**](/docs/sql-review/sql-advisor/github-app) - If all your SQL files are stored on GitHub.com, you can use GitHub app to do prechecks before they're merged into the main branch. No coding is required, deploy your SQL check in minutes.
- [**GitOps CI**](/docs/sql-review/sql-advisor/gitops-ci) - If you're using Bytebase GitOps workflow and want to enable the SQL review in GitHub pull request or GitLab merge request. No coding is required, set up the SQL review CI in seconds.