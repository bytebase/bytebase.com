import Route from '@/lib/route';

const SEO_DATA = {
  INDEX: {
    title: 'Database CI/CD | Database DevOps | Schema Migration | Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: '',
  },
  SCHEMA_MIGRATION: {
    title: 'Schema Migration | Liquibase, Flyway alternative',
    description:
      'GUI-based database schema migration with access control, batch change and collaboration | Liquibase, Flyway alternative',
    pathname: `${Route.SCHEMA_MIGRATION}/`,
  },
  SQL_EDITOR: {
    title: 'SQL Editor | DBeaver, Navicat, TablePlus, MySQL Workbench, pgAdmin alternative',
    description:
      'Secure-first SQL Editor with data access control and masking | DBeaver, Navicat, TablePlus, MySQL Workbench, pgAdmin alternative',
    pathname: `${Route.SQL_EDITOR}/`,
  },
  DATA_MASKING: {
    title: 'Dynamic Data Masking for MySQL, PostgreSQL, Oracle, TiDB and more',
    description: 'Dynamic Data Masking for MySQL, PostgreSQL, Oracle, TiDB and more',
    pathname: `${Route.DATA_MASKING}/`,
  },
  BATCH_CHANGE: {
    title: 'Batch Change Databases',
    description: 'Multi-environments, multi-regions, multi-tenants',
    pathname: `${Route.BATCH_CHANGE}/`,
  },
  BRANCHING: {
    title: 'Change Database the Git Way',
    description: 'Manage database changes like Git branch',
    pathname: `${Route.BRANCHING}/`,
  },
  ABOUT: {
    title: 'About Us',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.ABOUT}/`,
  },
  PRICING: {
    title: 'Bytebase Pricing',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.PRICING}/`,
  },
  CHANGELOG: {
    title: 'Changelog',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.CHANGELOG}/`,
  },
  BLOG: {
    title: 'Blog',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.BLOG}/`,
  },
  TUTORIAL: {
    title: 'Bytebase Tutorial',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.TUTORIAL}/`,
  },
  DATABASE_GLOSSARY: {
    title: 'Database Glossary',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_GLOSSARY}/`,
  },
  TERMS: {
    title: 'Bytebase Terms of Service',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.TERMS}/`,
  },
  PRIVACY: {
    title: 'Bytebase Privacy Policy',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.PRIVACY}/`,
  },
  SECURITY: {
    title: 'Bytebase Security Details',
    description: 'The security details for the Bytebase product',
    pathname: `${Route.SECURITY}/`,
  },
  SLA: {
    title: 'Service Level Agreement',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.SLA}/`,
  },
  SQL_REVIEW_GUIDE: {
    title: 'Database Review Guide',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.SQL_REVIEW_GUIDE}/`,
  },
  DBA: {
    title: 'Bytebase for DBA',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DBA}/`,
  },
  DEVELOPER: {
    title: 'Bytebase for Developer',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DEVELOPER}/`,
  },
  TECHLEAD: {
    title: 'Bytebase for Tech Lead',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.TECHLEAD}/`,
  },
  CONTACTS: {
    title: 'Bytebase Contact',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.CONTACTS}/`,
  },
  REFUND: {
    title: 'Bytebase Refund',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.REFUND}/`,
  },
  VIEW_LIVE_DEMO: {
    title: 'View Live Demo',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.VIEW_LIVE_DEMO}/`,
  },
  REQUEST_DEMO: {
    title: 'Request a Demo',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.REQUEST_DEMO}/`,
  },
  CONFIRM_DEMO: {
    title: 'Demo Booking Confirmed',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.CONFIRM_DEMO}/`,
  },
  CONFIRM_VIEW_LIVE_DEMO: {
    title: 'Live Demo is Activated',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.CONFIRM_VIEW_LIVE_DEMO}/`,
  },
  CONFIRM_INQUIRY: {
    title: 'We Have Received Your Inquiry',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.CONFIRM_INQUIRY}/`,
  },
  CONFIRM_MESSAGE: {
    title: 'Your Message Has Been Sent',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.CONFIRM_MESSAGE}/`,
  },
  MYSQL: {
    title: 'Manage MySQL schema with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_MYSQL}/`,
  },
  POSTGRES: {
    title: 'Manage PostgreSQL schema with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_POSTGRES}/`,
  },
  CLICKHOUSE: {
    title: 'Manage ClickHouse schema with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_CLICKHOUSE}/`,
  },
  TIDB: {
    title: 'Manage TiDB schema with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_TIDB}/`,
  },
  SNOWFLAKE: {
    title: 'Manage Snowflake schema with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_SNOWFLAKE}/`,
  },
  ORACLE: {
    title: 'Manage Oracle schema with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_ORACLE}/`,
  },
  SQLSERVER: {
    title: 'Manage SQL Server schema with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_SQLSERVER}/`,
  },
  MONGO: {
    title: 'Manage MongoDB change management with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_MONGO}/`,
  },
  REDIS: {
    title: 'Manage Redis change management with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_REDIS}/`,
  },
  REDSHIFT: {
    title: 'Manage Redshift change management with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_REDSHIFT}/`,
  },
  MARIADB: {
    title: 'Manage MariaDB change management with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_MARIADB}/`,
  },
  OCEANBASE: {
    title: 'Manage OceanBase change management with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_OCEANBASE}/`,
  },
  SPANNER: {
    title: 'Manage Google Cloud Spanner change management with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_SPANNER}/`,
  },
  DATABRICKS: {
    title: 'Manage Databricks change management with Bytebase',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.DATABASE_DATABRICKS}/`,
  },
  GITLAB: {
    title: 'Integration with GitLab',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_GITLAB}/`,
  },
  GITHUB: {
    title: 'Integration with GitHub',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_GITHUB}/`,
  },
  BITBUCKET: {
    title: 'Integration with Bitbucket',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_BITBUCKET}/`,
  },
  AZURE_DEVOPS: {
    title: 'Integration with Azure DevOps',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_AZURE_DEVOPS}/`,
  },
  SLACK: {
    title: 'Integration with Slack',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_SLACK}/`,
  },
  DISCORD: {
    title: 'Integration with Discord',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_DISCORD}/`,
  },
  TEAMS: {
    title: 'Integration with Teams',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_TEAMS}/`,
  },
  DINGTALK: {
    title: 'Integration with DingTalk',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_DINGTALK}/`,
  },
  LARK: {
    title: 'Integration with Lark',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_LARK}/`,
  },
  WECOM: {
    title: 'Integration with WeCom',
    description:
      'Database schema migration and version control, Database CI/CD, and DevOps for developers and DBAs',
    pathname: `${Route.INTEGRATION_WECOM}/`,
  },
  LIQUIBASE: {
    title: 'Liquibase Alternative',
    description: 'Liquibase alternative with GitOps, batch change, and collaboration',
    pathname: `${Route.ALTERNATIVE_LIQUIBASE}/`,
  },
  FLYWAY: {
    title: 'Flyway Alternative',
    description: 'Flyway alternative with GitOps, batch change, and collaboration',
    pathname: `${Route.ALTERNATIVE_FLYWAY}/`,
  },
  DATAGRIP: {
    title: 'DataGrip Alternative',
    description: 'DataGrip alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_DATAGRIP}/`,
  },
  DBEAVER: {
    title: 'DBeaver Alternative',
    description: 'DBeaver Alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_DBEAVER}/`,
  },
  MYSQL_WORKBENCH: {
    title: 'MySQL Workbench Alternative',
    description: 'MySQL Workbench alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_MYSQL_WORKBENCH}/`,
  },
  NAVICAT: {
    title: 'Navicat Alternative',
    description: 'Navicat alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_NAVICAT}/`,
  },
  PGADMIN: {
    title: 'pgAdmin Alternative',
    description: 'pgAdmin alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_PGADMIN}/`,
  },
  PHPMYADMIN: {
    title: 'phpMyAdmin Alternative',
    description: 'phpMyAdmin alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_PHPMYADMIN}/`,
  },
  TABLEPLUS: {
    title: 'TablePlus Alternative',
    description: 'TablePlus alternative with access control, data masking, and collaboration',
    pathname: `${Route.ALTERNATIVE_TABLEPLUS}/`,
  },
};

export default SEO_DATA;
