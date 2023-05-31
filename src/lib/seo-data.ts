import Route from '@/lib/route';

const SEO_DATA = {
  INDEX: {
    title: 'Database CI/CD | Database DevOps | Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: '',
  },
  ABOUT: {
    title: 'About Us',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.ABOUT}/`,
  },
  PRICING: {
    title: 'Bytebase Pricing',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.PRICING}/`,
  },
  CHANGELOG: {
    title: 'Changelog',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.CHANGELOG}/`,
  },
  BLOG: {
    title: 'Blog',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.BLOG}/`,
  },
  DATABASE_GLOSSARY: {
    title: 'Database Glossary',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_GLOSSARY}/`,
  },
  TERMS: {
    title: 'Bytebase Terms of Service',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.TERMS}/`,
  },
  PRIVACY: {
    title: 'Bytebase Privacy Policy',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.PRIVACY}/`,
  },
  SQL_REVIEW_GUIDE: {
    title: 'Database Review Guide',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.SQL_REVIEW_GUIDE}/`,
  },
  DBA: {
    title: 'Bytebase for DBA',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DBA}/`,
  },
  DEVELOPER: {
    title: 'Bytebase for Developer',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DEVELOPER}/`,
  },
  TECHLEAD: {
    title: 'Bytebase for Tech Lead',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.TECHLEAD}/`,
  },
  CONTACTS: {
    title: 'Bytebase Contact',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.CONTACTS}/`,
  },
  REFUND: {
    title: 'Bytebase Refund',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.REFUND}/`,
  },
  DEMO: {
    title: 'Bytebase Request a demo',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DEMO}/`,
  },
  CONFIRM_DEMO: {
    title: 'Demo Booking Confirmed',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.CONFIRM_DEMO}/`,
  },
  MYSQL: {
    title: 'Manage MySQL schema with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_MYSQL}/`,
  },
  POSTGRES: {
    title: 'Manage PostgreSQL schema with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_POSTGRES}/`,
  },
  CLICKHOUSE: {
    title: 'Manage ClickHouse schema with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_CLICKHOUSE}/`,
  },
  TIDB: {
    title: 'Manage TiDB schema with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_TIDB}/`,
  },
  SNOWFLAKE: {
    title: 'Manage Snowflake schema with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_SNOWFLAKE}/`,
  },
  ORACLE: {
    title: 'Manage Oracle schema with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_ORACLE}/`,
  },
  SQLSERVER: {
    title: 'Manage SQL Server schema with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_SQLSERVER}/`,
  },
  MONGO: {
    title: 'Manage MongoDB change management with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_MONGO}/`,
  },
  REDIS: {
    title: 'Manage Redis change management with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_REDIS}/`,
  },
  REDSHIFT: {
    title: 'Manage Redshift change management with Bytebase',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.DATABASE_REDSHIFT}/`,
  },
  GITLAB: {
    title: 'Integration with GitLab',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_GITLAB}/`,
  },
  GITHUB: {
    title: 'Integration with GitHub',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_GITHUB}/`,
  },
  BITBUCKET: {
    title: 'Integration with Bitbucket',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_BITBUCKET}/`,
  },
  SLACK: {
    title: 'Integration with Slack',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_SLACK}/`,
  },
  DISCORD: {
    title: 'Integration with Discord',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_DISCORD}/`,
  },
  TEAMS: {
    title: 'Integration with Teams',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_TEAMS}/`,
  },
  DINGTALK: {
    title: 'Integration with DingTalk',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_DINGTALK}/`,
  },
  LARK: {
    title: 'Integration with Lark',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_LARK}/`,
  },
  WECOM: {
    title: 'Integration with WeCom',
    description: 'Safer and faster database change and version control for DBAs and Developers',
    pathname: `${Route.INTEGRATION_WECOM}/`,
  },
};

export default SEO_DATA;
