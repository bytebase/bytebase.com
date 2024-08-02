const Route = {
  INDEX: '/',
  ABOUT: '/about',
  PRICING: '/pricing',
  BRAND: '/about#brand-kit',
  SCHEMA_MIGRATION: '/schema-migration',
  SQL_EDITOR: '/sql-editor',
  DATA_MASKING: '/data-masking',
  BATCH_CHANGE: '/batch-change',
  BRANCHING: '/branching',
  SQL_REVIEW_GUIDE: '/sql-review-guide',
  VIEW_LIVE_DEMO: '/view-live-demo',
  CONFIRM_VIEW_LIVE_DEMO: '/confirm-view-live-demo',
  REQUEST_DEMO: '/request-demo',
  CONFIRM_DEMO: '/confirm-demo',
  // Pair with Enterprise inquiry
  CONFIRM_INQUIRY: '/confirm-inquiry',
  // General confirm
  CONFIRM_MESSAGE: '/confirm-message',

  // pricing
  PRO_PAYMENT:
    'https://bytebase-hub-prod.us.auth0.com/u/login?state=hKFo2SByU1VxQzVzb0JpSm01TjF5TjZmU1JoTTVndXNpU3FuY6Fur3VuaXZlcnNhbC1sb2dpbqN0aWTZIF9JakVqd1RRaVBjczh0NTVEQmxqSHo3ZGxzWV9zelBUo2NpZNkgN0IySDFrb05Sa3hQY0pENzBHeVJEbzVIbVNNMGI5V1E',
  // seo pages
  DBA: '/usecase/dba',
  DEVELOPER: '/usecase/developer',
  TECHLEAD: '/usecase/techlead',

  // terms
  REFUND: '/refund',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  SECURITY: '/security',
  SLA: '/sla',
  JOBS: '/about#crew',
  CONTACTS: '/contact-us',

  DATABASE_GLOSSARY: '/database-glossary',
  CHANGELOG: '/changelog',
  TUTORIAL: '/tutorial',
  BLOG: '/blog',
  BLOG_CATEGORY: '/blog/category',

  // docs
  DOCS: '/docs',
  DOCS_DATA_COLLECTION: '/docs/faq/#which-data-does-bytebase-collect',
  DOCS_SELF_HOST: '/docs/get-started/self-host',
  DOCS_USE_CASE: '/docs/introduction/use-cases/',
  DOCS_CONCEPT: '/docs/concepts/data-model',
  DOCS_CONCEPT_DB_INSTANCE: '/docs/concepts/data-model/#database-instance',
  DOCS_DB: '/docs/introduction/supported-databases',
  DOCS_API: '/docs/api/overview',
  DOCS_CLI: '/docs/cli/overview',
  DOCS_HOW_TO: '/docs/how-to/sql-review/postgres-sql-review-guide',
  SQL_GITHUB_APP: '/docs/sql-review/github-app',
  DOCS_SQL_REVIEW: '/docs/sql-review/overview',
  DOCS_CHANGE_DATABASE: '/docs/change-database/change-workflow',
  DOCS_ROLLBACK_DATA: '/docs/change-database/rollback-data-changes',
  DOCS_SCHEMA_SYNC: '/docs/change-database/synchronize-schema',
  DOCS_SQL_EDITOR: '/docs/sql-editor/overview',
  DOCS_DATA_ACCESS_CONTROL: '/docs/security/data-access-control',
  DOCS_DATA_MASKING: '/docs/security/data-masking/overview',
  DOCS_DATA_MASKING_COLUMN: '/docs/security/data-masking/column-masking',
  DOCS_DATA_MASKING_GLOBAL: '/docs/security/data-masking/global-masking-rule',
  DOCS_DATA_MASKING_ACCESS: '/docs/security/data-masking/access-unmasked-data',
  DOCS_AUDIT_LOG: '/docs/security/audit-log',
  DOCS_INDEX_ADVISOR: '/docs/slow-query/overview',
  DOCS_ANOMALY_CENTER: '/docs/administration/anomaly-center',
  DOCS_DRIFT_DETECTION: '/docs/change-database/drift-detection',
  DOCS_VCS_INTEGRATION: '/docs/vcs-integration/overview',
  DOCS_BATCH_CHANGE: '/docs/change-database/batch-change',
  DOCS_ONLINE_SCHEMA_CHANGE: '/docs/change-database/online-schema-migration-for-mysql',
  DOCS_RBAC: '/docs/concepts/roles-and-permissions',
  DOCS_SSO: '/docs/administration/sso/overview',

  // blog
  BLOG_CASE_STUDY: '/blog/category/case-study',

  // comparison
  VS_LIQUIBASE: '/blog/bytebase-vs-liquibase',
  VS_FLYWAY: '/blog/bytebase-vs-flyway',
  VS_DBEAVER: '/blog/bytebase-vs-dbeaver',
  VS_NAVICAT: '/blog/stop-using-navicat',
  VS_METABASE: '/blog/bytebase-vs-metabase',
  VS_CLOUDBEAVER: '/blog/bytebase-vs-cloudbeaver',
  VS_SCHEMACHANGE: '/blog/snowflake-schema-change',
  VS_JIRA: '/blog/use-jira-for-database-change',
  FLYWAY_VS_LIQUIBASE: '/blog/flyway-vs-liquibase',
  PG_VS_MYSQL: '/blog/postgres-vs-mysql',
  PG_VS_MONGO: '/blog/postgres-vs-mongodb',
  PLANETSCALE_VS_NEON: '/blog/planetscale-vs-neon',

  // databases
  DATABASE_MYSQL: '/database/mysql',
  DATABASE_POSTGRES: '/database/postgres',
  DATABASE_SNOWFLAKE: '/database/snowflake',
  DATABASE_ORACLE: '/database/oracle',
  DATABASE_SQLSERVER: '/database/sqlserver',
  DATABASE_MONGO: '/database/mongo',
  DATABASE_REDIS: '/database/redis',
  DATABASE_REDSHIFT: '/database/redshift',
  DATABASE_TIDB: '/database/tidb',
  DATABASE_CLICKHOUSE: '/database/clickhouse',
  DATABASE_MARIADB: '/database/mariadb',
  DATABASE_SPANNER: '/database/spanner',
  DATABASE_OCEANBASE: '/database/oceanbase',
  DATABASE_DATABRICKS: '/database/databricks',

  // integrations
  INTEGRATION_GITLAB: '/integration/gitlab',
  INTEGRATION_GITHUB: '/integration/github',
  INTEGRATION_BITBUCKET: '/integration/bitbucket',
  INTEGRATION_AZURE_DEVOPS: '/integration/azure-devops',
  INTEGRATION_SLACK: '/integration/slack',
  INTEGRATION_DISCORD: '/integration/discord',
  INTEGRATION_TEAMS: '/integration/teams',
  INTEGRATION_DINGTALK: '/integration/dingtalk',
  INTEGRATION_LARK: '/integration/lark',
  INTEGRATION_WECOM: '/integration/wecom',

  // alternatives
  ALTERNATIVE_DATAGRIP: '/sql-editor/datagrip-alternative',
  ALTERNATIVE_DBEAVER: '/sql-editor/dbeaver-alternative',
  ALTERNATIVE_MYSQL_WORKBENCH: '/sql-editor/mysql-workbench-alternative',
  ALTERNATIVE_NAVICAT: '/sql-editor/navicat-alternative',
  ALTERNATIVE_PGADMIN: '/sql-editor/pgadmin-alternative',
  ALTERNATIVE_PHPMYADMIN: '/sql-editor/phpmyadmin-alternative',
  ALTERNATIVE_TABLEPLUS: '/sql-editor/tableplus-alternative',
  ALTERNATIVE_LIQUIBASE: '/schema-migration/liquibase-alternative',
  ALTERNATIVE_FLYWAY: '/schema-migration/flyway-alternative',

  // solutions
  INDUSTRY_FINANCIAL_SERVICES: '/solutions/financial-services',
  INDUSTRY_MANUFACTURING: '/solutions/manufacturing',
  INDUSTRY_TECHNOLOGY: '/solutions/technology',
  INDUSTRY_GAMING: '/solutions/gaming',
  INDUSTRY_WEB3: '/solutions/web3',

  // usecases
  USECASE_DBA: '/usecase/dba',
  USECASE_TECHLEAD: '/usecase/techlead',
  USECASE_DEVELOPER: '/usecase/developer',

  // external
  LIVE_DEMO: 'https://demo.bytebase.com',
  HUB: 'https://hub.bytebase.com/workspace',
  DISCORD: 'https://discord.com/invite/huyw7gRsyA',
  TWITTER: 'https://twitter.com/Bytebase',
  YOUTUBE: 'https://www.youtube.com/channel/UCIlxsMmakGxeaAwpu1Z6jJg',
  GITHUB: 'https://github.com/bytebase/bytebase',
  LINKEDIN: 'https://www.linkedin.com/company/bytebase',
  STAR_HISTORY: 'https://star-history.com/#bytebase/bytebase',
  DB_COST: 'https://www.dbcost.com/',
  SQL_CHAT: 'https://www.sqlchat.ai/',
};

export default Route;
