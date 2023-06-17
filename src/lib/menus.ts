import Route from './route';

export const MENU = {
  header: [
    {
      title: 'Docs',
      items: [
        {
          name: 'What is Bytebase',
          description: 'Learn what Bytebase is',
          linkUrl: Route.DOCS,
          iconName: 'intro',
        },
        {
          name: 'Quick start',
          description: 'Deploy Bytebase in 5 minutes',
          linkUrl: Route.DOCS_INSTALL,
          iconName: 'rocket',
        },
        {
          name: 'Supported Database',
          description: 'Bytebase supported databases',
          linkUrl: Route.DOCS_DB,
          iconName: 'db',
        },
        {
          name: 'Liquibase vs. Bytebase',
          description: 'Side-by-side compare with Liquibase',
          linkUrl: Route.VS_LIQUIBASE,
        },
        {
          name: 'Flyway vs. Bytebase',
          description: 'Side-by-side compare with Flyway',
          linkUrl: Route.VS_FLYWAY,
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
          description: 'Learn what Bytebase is',
          linkUrl: Route.DOCS,
          iconName: 'intro',
        },
        {
          name: 'Quick start',
          description: 'Deploy Bytebase in 5 minutes',
          linkUrl: Route.DOCS_INSTALL,
          iconName: 'rocket',
        },
        {
          name: 'Supported Database',
          description: 'Bytebase supported databases',
          linkUrl: Route.DOCS_DB,
          iconName: 'db',
        },
        {
          name: 'Bytebase vs Liquibase',
          description: 'Compare to Liquibase',
          linkUrl: Route.VS_LIQUIBASE,
        },
        {
          name: 'Bytebase vs Flyway',
          description: 'Compare to Flyway',
          linkUrl: Route.VS_FLYWAY,
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
    {
      name: 'COMPARISONS',
      items: [
        { name: 'vs Liquibase', linkUrl: Route.VS_LIQUIBASE },
        { name: 'vs Flyway', linkUrl: Route.VS_FLYWAY },
      ],
    },
  ],
};
