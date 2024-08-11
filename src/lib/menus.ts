import Route from './route';

export const MENU = {
  header: [
    { title: '🫱 Why Bytebase', href: Route.DOCS },
    {
      title: 'Features',
      items: [
        {
          name: 'Schema Migration',
          description: 'GUI-based, database CI/CD with GitOps',
          linkUrl: Route.SCHEMA_MIGRATION,
          iconName: 'migrate',
        },
        {
          name: 'Online Web-based SQL Editor',
          description: 'Bastionless human-to-database access',
          linkUrl: Route.SQL_EDITOR,
          iconName: 'editor',
        },
        {
          name: 'Dynamic Data Masking',
          description: 'Multi-level masking policy with access control',
          linkUrl: Route.DATA_MASKING,
          iconName: 'mask',
        },
        {
          name: 'Batch Change',
          description: 'Multi-environments, multi-regions, multi-tenants',
          linkUrl: Route.BATCH_CHANGE,
          iconName: 'batch',
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          name: 'Docs',
          description: '',
          linkUrl: Route.DOCS,
          iconName: 'intro',
        },
        {
          name: 'Supported Databases',
          description: '',
          linkUrl: Route.DOCS_DB,
          iconName: 'db',
        },
        {
          name: 'Case Study',
          description: '',
          linkUrl: Route.BLOG_CASE_STUDY,
          iconName: 'casestudy',
        },
        {
          name: 'Blog',
          description: '',
          linkUrl: Route.BLOG,
          iconName: 'blog',
        },
        {
          name: 'Company',
          description: '',
          linkUrl: Route.ABOUT,
          iconName: 'about',
        },
      ],
      highlight: {
        name: 'Tutorial',
        description: 'Step-by-step guide through common features.',
        linkUrl: Route.TUTORIAL,
        cta: 'Start Learning',
        iconName: 'tutorial',
      },
    },
    {
      title: 'Industries',
      items: [
        {
          name: 'Financial Services',
          description: '',
          linkUrl: Route.INDUSTRY_FINANCIAL_SERVICES,
          iconName: '',
        },
        {
          name: 'Technology',
          description: '',
          linkUrl: Route.INDUSTRY_TECHNOLOGY,
          iconName: '',
        },
        {
          name: 'Manufacturing',
          description: '',
          linkUrl: Route.INDUSTRY_MANUFACTURING,
          iconName: '',
        },
        {
          name: 'Gaming',
          description: '',
          linkUrl: Route.INDUSTRY_GAMING,
          iconName: '',
        },
        {
          name: 'Web3',
          description: '',
          linkUrl: Route.INDUSTRY_WEB3,
          iconName: '',
        },
      ],
    },
    { title: 'Pricing', href: Route.PRICING },
  ],
  mobile: [
    { title: '🫱 Why Bytebase', href: Route.DOCS },
    {
      title: 'Features',
      items: [
        {
          name: 'Schema Migration',
          description: 'GitOps, GUI-based, and CI/CD friendly',
          linkUrl: Route.SCHEMA_MIGRATION,
          iconName: 'migrate',
        },
        {
          name: 'SQL Editor',
          description: 'Integrated with data access control and masking',
          linkUrl: Route.SQL_EDITOR,
          iconName: 'editor',
        },
        {
          name: 'Dynamic Data Masking',
          description: 'Multi-level masking policy with access control',
          linkUrl: Route.DATA_MASKING,
          iconName: 'mask',
        },
        {
          name: 'Batch Change',
          description: 'Multi-environments, multi-regions, multi-tenants',
          linkUrl: Route.BATCH_CHANGE,
          iconName: 'batch',
        },
      ],
    },
    {
      title: 'Resources',
      items: [
        {
          name: 'Tutorial',
          description: '',
          linkUrl: Route.TUTORIAL,
          iconName: 'tutorial',
        },
        {
          name: 'Docs',
          description: '',
          linkUrl: Route.DOCS,
          iconName: 'intro',
        },
        {
          name: 'Blog',
          description: '',
          linkUrl: Route.BLOG,
          iconName: 'blog',
        },
        {
          name: 'Supported Databases',
          description: '',
          linkUrl: Route.DOCS_DB,
          iconName: 'db',
        },
        {
          name: 'Case Study',
          description: '',
          linkUrl: Route.BLOG_CASE_STUDY,
          iconName: 'casestudy',
        },
        {
          name: 'Company',
          description: '',
          linkUrl: Route.ABOUT,
          iconName: 'about',
        },
      ],
    },
    {
      title: 'Industries',
      items: [
        {
          name: 'Financial Services',
          description: '',
          linkUrl: Route.INDUSTRY_FINANCIAL_SERVICES,
          iconName: '',
        },
        {
          name: 'Technology',
          description: '',
          linkUrl: Route.INDUSTRY_TECHNOLOGY,
          iconName: '',
        },
        {
          name: 'Manufacturing',
          description: '',
          linkUrl: Route.INDUSTRY_MANUFACTURING,
          iconName: '',
        },
        {
          name: 'Gaming',
          description: '',
          linkUrl: Route.INDUSTRY_GAMING,
          iconName: '',
        },
        {
          name: 'Web3',
          description: '',
          linkUrl: Route.INDUSTRY_WEB3,
          iconName: '',
        },
      ],
    },
    { title: 'Pricing', href: Route.PRICING },
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
        { name: 'Databricks', linkUrl: Route.DATABASE_DATABRICKS },
      ],
    },
    {
      name: 'INTEGRATIONS',
      items: [
        { name: 'GitLab', linkUrl: Route.INTEGRATION_GITLAB },
        { name: 'GitHub', linkUrl: Route.INTEGRATION_GITHUB },
        { name: 'Bitbucket', linkUrl: Route.INTEGRATION_BITBUCKET },
        { name: 'Azure DevOps', linkUrl: Route.INTEGRATION_AZURE_DEVOPS },
        { name: 'Slack', linkUrl: Route.INTEGRATION_SLACK },
        { name: 'Discord', linkUrl: Route.INTEGRATION_DISCORD },
        { name: 'Teams', linkUrl: Route.INTEGRATION_TEAMS },
        { name: 'DingTalk', linkUrl: Route.INTEGRATION_DINGTALK },
        { name: 'Lark', linkUrl: Route.INTEGRATION_LARK },
        { name: 'WeCom', linkUrl: Route.INTEGRATION_WECOM },
      ],
    },
    {
      name: 'COMPARISONS',
      items: [
        { name: 'vs. Liquibase', linkUrl: Route.VS_LIQUIBASE },
        { name: 'vs. Flyway', linkUrl: Route.VS_FLYWAY },
        { name: 'vs. DBeaver', linkUrl: Route.VS_DBEAVER },
        { name: 'vs. Navicat', linkUrl: Route.VS_NAVICAT },
        { name: 'vs. Metabase', linkUrl: Route.VS_METABASE },
        { name: 'vs. CloudBeaver', linkUrl: Route.VS_CLOUDBEAVER },
        { name: 'vs. schemachange', linkUrl: Route.VS_SCHEMACHANGE },
        { name: 'vs. Jira', linkUrl: Route.VS_JIRA },
      ],
    },
    {
      name: 'RESOURCES',
      items: [
        { name: 'Documentation', linkUrl: Route.DOCS },
        { name: 'Changelog', linkUrl: Route.CHANGELOG },
        { name: 'Schema Migration', linkUrl: Route.SCHEMA_MIGRATION },
        { name: 'SQL Editor', linkUrl: Route.SQL_EDITOR },
        { name: 'Dynamic Data Masking', linkUrl: Route.DATA_MASKING },
        { name: 'SQL Review Guide', linkUrl: Route.SQL_REVIEW_GUIDE },
        { name: 'Database Glossary', linkUrl: Route.DATABASE_GLOSSARY },
      ],
    },
    {
      name: 'COMPANY',
      items: [
        { name: 'About', linkUrl: Route.ABOUT },
        { name: 'Brand', linkUrl: Route.BRAND },
        { name: 'Terms', linkUrl: Route.TERMS },
        { name: 'Policy', linkUrl: Route.PRIVACY },
        { name: 'Security', linkUrl: Route.SECURITY },
        { name: 'Contact', linkUrl: Route.CONTACTS },
      ],
    },
  ],
};
