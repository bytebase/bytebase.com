import Route from '@/lib/route';

const SEO_DATA = {
  INDEX: {
    title: 'Database DevSecOps | Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
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
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.ABOUT}/`,
  },
  PRICING: {
    title: 'Bytebase Pricing',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.PRICING}/`,
  },
  RESOURCES: {
    title: 'Bytebase Resources',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.RESOURCES}/`,
  },
  CHANGELOG: {
    title: 'Changelog',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CHANGELOG}/`,
  },
  BLOG: {
    title: 'Blog',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.BLOG}/`,
  },
  TUTORIAL: {
    title: 'Bytebase Tutorial',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.TUTORIAL}/`,
  },
  DATABASE_GLOSSARY: {
    title: 'Database Glossary',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_GLOSSARY}/`,
  },
  TERMS: {
    title: 'Bytebase Terms of Service',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.TERMS}/`,
  },
  PARTNER: {
    title: 'Bytebase Partner Program',
    description: 'Grow your business with the Bytebase Partnership program',
    pathname: `${Route.PARTNER}/`,
  },
  PRIVACY: {
    title: 'Bytebase Privacy Policy',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
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
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.SLA}/`,
  },
  SQL_REVIEW_GUIDE: {
    title: 'Database Review Guide',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.SQL_REVIEW_GUIDE}/`,
  },
  SUB_PROCESSORS: {
    title: 'Subprocessors',
    description: 'List of Bytebase subprocessors.',
    pathname: `${Route.SUB_PROCESSORS}/`,
  },
  DBA: {
    title: 'Bytebase for DBA',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DBA}/`,
  },
  DEVELOPER: {
    title: 'Bytebase for Developer',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DEVELOPER}/`,
  },
  TECHLEAD: {
    title: 'Bytebase for Tech Lead',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.TECHLEAD}/`,
  },
  CONTACTS: {
    title: 'Bytebase Contact',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONTACTS}/`,
  },
  REFUND: {
    title: 'Bytebase Refund',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.REFUND}/`,
  },
  VIEW_LIVE_DEMO: {
    title: 'View Live Demo',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.VIEW_LIVE_DEMO}/`,
  },
  REQUEST_DEMO: {
    title: 'Request a Demo',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.REQUEST_DEMO}/`,
  },
  CONFIRM_DEMO: {
    title: 'Demo Booking Confirmed',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONFIRM_DEMO}/`,
  },
  CONFIRM_VIEW_LIVE_DEMO: {
    title: 'Live Demo is Activated',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONFIRM_VIEW_LIVE_DEMO}/`,
  },
  CONFIRM_INQUIRY: {
    title: 'We Have Received Your Inquiry',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONFIRM_INQUIRY}/`,
  },
  CONFIRM_MESSAGE: {
    title: 'Your Message Has Been Sent',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.CONFIRM_MESSAGE}/`,
  },
  MYSQL: {
    title: 'Manage MySQL schema with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_MYSQL}/`,
  },
  POSTGRES: {
    title: 'Manage PostgreSQL schema with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_POSTGRES}/`,
  },
  CLICKHOUSE: {
    title: 'Manage ClickHouse schema with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_CLICKHOUSE}/`,
  },
  TIDB: {
    title: 'Manage TiDB schema with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_TIDB}/`,
  },
  SNOWFLAKE: {
    title: 'Manage Snowflake schema with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_SNOWFLAKE}/`,
  },
  ORACLE: {
    title: 'Manage Oracle schema with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_ORACLE}/`,
  },
  SQLSERVER: {
    title: 'Manage SQL Server schema with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_SQLSERVER}/`,
  },
  MONGO: {
    title: 'Manage MongoDB change management with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_MONGO}/`,
  },
  REDIS: {
    title: 'Manage Redis change management with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_REDIS}/`,
  },
  REDSHIFT: {
    title: 'Manage Redshift change management with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_REDSHIFT}/`,
  },
  MARIADB: {
    title: 'Manage MariaDB change management with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_MARIADB}/`,
  },
  OCEANBASE: {
    title: 'Manage OceanBase change management with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_OCEANBASE}/`,
  },
  SPANNER: {
    title: 'Manage Google Cloud Spanner change management with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_SPANNER}/`,
  },
  DATABRICKS: {
    title: 'Manage Databricks change management with Bytebase',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.DATABASE_DATABRICKS}/`,
  },
  GITLAB: {
    title: 'Integration with GitLab',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_GITLAB}/`,
  },
  GITHUB: {
    title: 'Integration with GitHub',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_GITHUB}/`,
  },
  BITBUCKET: {
    title: 'Integration with Bitbucket',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_BITBUCKET}/`,
  },
  AZURE_DEVOPS: {
    title: 'Integration with Azure DevOps',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_AZURE_DEVOPS}/`,
  },
  SLACK: {
    title: 'Integration with Slack',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_SLACK}/`,
  },
  DISCORD: {
    title: 'Integration with Discord',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_DISCORD}/`,
  },
  TEAMS: {
    title: 'Integration with Teams',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_TEAMS}/`,
  },
  DINGTALK: {
    title: 'Integration with DingTalk',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_DINGTALK}/`,
  },
  LARK: {
    title: 'Integration with Lark',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
    pathname: `${Route.INTEGRATION_LARK}/`,
  },
  WECOM: {
    title: 'Integration with WeCom',
    description:
      'Schema migration and database security for developer, security, DBA, and platform engineering teams.',
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
