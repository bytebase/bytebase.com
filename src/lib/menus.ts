import Route from './route';

export const MENU = {
  header: [
    {
      title: 'Docs',
      items: [
        {
          name: 'What is Bytebase',
          description: 'The GitLab for Database DevOps',
          linkUrl: Route.DOCS,
          iconName: 'intro',
        },
        {
          name: 'Quick Start',
          description: 'Deploy Bytebase in 5 minutes',
          linkUrl: Route.DOCS_SELF_HOST,
          iconName: 'rocket',
        },
        {
          name: 'Use Cases',
          description: 'How to empower your team',
          linkUrl: Route.DOCS_USE_CASE,
          iconName: 'usecase',
        },
        {
          name: 'Supported Database',
          description: 'Supported databases & features',
          linkUrl: Route.DOCS_DB,
          iconName: 'db',
        },
      ],
    },
    { title: 'Blog', href: Route.BLOG },
    { title: 'Pricing', href: Route.PRICING },
    { title: 'Contact', href: Route.CONTACTS },
  ],
  mobile: [
    {
      title: 'Docs',
      items: [
        {
          name: 'What is Bytebase',
          description: 'The GitLab for Database DevOps',
          linkUrl: Route.DOCS,
          iconName: 'intro',
        },
        {
          name: 'Quick start',
          description: 'Deploy Bytebase in 5 minutes',
          linkUrl: Route.DOCS_SELF_HOST,
          iconName: 'rocket',
        },
        {
          name: 'Use Cases',
          description: 'How to empower your team',
          linkUrl: Route.DOCS_USE_CASE,
          iconName: 'usecase',
        },
        {
          name: 'Supported Database',
          description: 'Bytebase supported databases',
          linkUrl: Route.DOCS_DB,
          iconName: 'db',
        },
      ],
    },
    { title: 'Blog', href: Route.BLOG },
    { title: 'Pricing', href: Route.PRICING },
    { title: 'Contact', href: Route.CONTACTS },
  ],
  footer: [
    {
      name: 'DATABASES',
      items: [
        { name: 'MySQL', linkUrl: Route.DATABASE_MYSQL },
        { name: 'PostgreSQL', linkUrl: Route.DATABASE_POSTGRES },
        { name: 'Snowflake', linkUrl: Route.DATABASE_SNOWFLAKE },
        { name: 'Oracle', linkUrl: Route.DATABASE_ORACLE },
        { name: 'SQL Server', linkUrl: Route.DATABASE_SQLSERVER },
        { name: 'MongoDB', linkUrl: Route.DATABASE_MONGO },
        { name: 'Redis', linkUrl: Route.DATABASE_REDIS },
        { name: 'Redshift', linkUrl: Route.DATABASE_REDSHIFT },
        { name: 'ClickHouse', linkUrl: Route.DATABASE_CLICKHOUSE },
        { name: 'TiDB', linkUrl: Route.DATABASE_TIDB },
        { name: 'OceanBase', linkUrl: Route.DATABASE_OCEANBASE },
        { name: 'Google Spanner', linkUrl: Route.DATABASE_SPANNER },
        { name: 'MariaDB', linkUrl: Route.DATABASE_MARIADB },
      ],
    },
    {
      name: 'INTEGRATIONS',
      items: [
        { name: 'GitLab', linkUrl: Route.INTEGRATION_GITLAB },
        { name: 'GitHub', linkUrl: Route.INTEGRATION_GITHUB },
        { name: 'Bitbucket', linkUrl: Route.INTEGRATION_BITBUCKET },
        { name: 'Slack', linkUrl: Route.INTEGRATION_SLACK },
        { name: 'Discord', linkUrl: Route.INTEGRATION_DISCORD },
        { name: 'Teams', linkUrl: Route.INTEGRATION_TEAMS },
        { name: 'DingTalk', linkUrl: Route.INTEGRATION_DINGTALK },
        { name: 'Lark', linkUrl: Route.INTEGRATION_LARK },
        { name: 'WeCom', linkUrl: Route.INTEGRATION_WECOM },
      ],
    },
    {
      name: 'RESOURCES',
      items: [
        { name: 'Documentation', linkUrl: Route.DOCS },
        { name: 'Changelog', linkUrl: Route.CHANGELOG },
        { name: 'SQL Review Guide', linkUrl: Route.SQL_REVIEW_GUIDE },
        { name: 'Database Glossary', linkUrl: Route.DATABASE_GLOSSARY },
        { name: 'SQL Chat', linkUrl: Route.SQL_CHAT, isExternal: true },
        { name: 'DB Cost', linkUrl: Route.DB_COST, isExternal: true },
        {
          name: 'Star History',
          linkUrl: Route.STAR_HISTORY,
          isExternal: true,
        },
      ],
    },
    {
      name: 'COMPARISONS',
      items: [
        { name: 'Bytebase vs. Liquibase', linkUrl: Route.VS_LIQUIBASE },
        { name: 'Bytebase vs. Flyway', linkUrl: Route.VS_FLYWAY },
        { name: 'Bytebase vs. Navicat', linkUrl: Route.VS_NAVICAT },
        { name: 'Bytebase vs. schemachange', linkUrl: Route.VS_SCHEMACHANGE },
        { name: 'Postgres vs. MySQL', linkUrl: Route.PG_VS_MYSQL },
        { name: 'Postgres vs. MongoDB', linkUrl: Route.PG_VS_MONGO },
      ],
    },
    {
      name: 'COMPANY',
      items: [
        { name: 'Blog', linkUrl: Route.BLOG },
        { name: 'About', linkUrl: Route.ABOUT },
        { name: 'Brand', linkUrl: Route.BRAND },
        { name: 'Careers', linkUrl: Route.JOBS },
        { name: 'Pricing', linkUrl: Route.PRICING },
        { name: 'Contact', linkUrl: Route.CONTACTS },
      ],
    },
  ],
};
