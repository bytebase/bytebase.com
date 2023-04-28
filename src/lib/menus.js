import ROUTE from './route.ts';

const OLD_SITE_URL = process.env.NEXT_PUBLIC_OLD_SITE_URL || '';

export const MENUS = {
  header: [
    { title: 'Solutions', href: OLD_SITE_URL + ROUTE.USECASE_DBA },
    { title: 'Blog', href: ROUTE.BLOG },
    {
      title: 'Docs',
      items: [
        {
          name: 'Get Started',
          description: 'Instantly validates tax ID numbers',
          linkUrl: ROUTE.DOCS,
          iconName: 'rocket',
        },
        {
          name: 'CLI',
          description: 'Ensures your compliance with DAC7',
          linkUrl: ROUTE.DOCS_CLI,
          iconName: 'cli',
        },
        {
          name: 'API',
          description: 'Issues locally compliant invoices',
          linkUrl: ROUTE.DOCS_API,
          iconName: 'api',
        },
        {
          name: 'How-To',
          description: 'Sends authorities tax data in real',
          linkUrl: ROUTE.DOCS_HOW_TO,
          iconName: 'howTo',
        },
      ],
    },
    { title: 'Pricing', href: ROUTE.PRICING },
    { title: 'About us', href: ROUTE.ABOUT },
  ],
  mobile: [
    { title: 'Solutions', href: ROUTE.SOLUTIONS },
    { title: 'Blog', href: ROUTE.BLOG },
    {
      title: 'Docs',
      items: [
        {
          name: 'Get Started',
          description: 'Instantly validates tax ID numbers ',
          linkUrl: ROUTE.DOCS,
          iconName: 'rocket',
        },
        {
          name: 'CLI',
          description: 'Ensures your compliance with DAC7',
          linkUrl: ROUTE.DOCS_CLI,
          iconName: 'cli',
        },
        {
          name: 'API',
          description: 'Issues locally compliant invoices',
          linkUrl: ROUTE.DOCS_API,
          iconName: 'api',
        },
        {
          name: 'How-To',
          description: 'Sends authorities tax data in real',
          linkUrl: ROUTE.DOCS_HOW_TO,
          iconName: 'howTo',
        },
      ],
    },
    { title: 'Pricing', href: ROUTE.PRICING },
    { title: 'About us', href: ROUTE.ABOUT },
  ],
  footer: [
    {
      name: 'DATABASES',
      items: [
        { name: 'MySQL', linkUrl: OLD_SITE_URL + ROUTE.DATABASE_MYSQL },
        { name: 'PostgreSQL', linkUrl: OLD_SITE_URL + ROUTE.DATABASE_POSTGRES },
        { name: 'ClickHouse', linkUrl: OLD_SITE_URL + ROUTE.DATABASE_CLICKHOUSE },
        { name: 'TiDB', linkUrl: OLD_SITE_URL + ROUTE.DATABASE_TIDB },
        { name: 'Snowflake', linkUrl: OLD_SITE_URL + ROUTE.DATABASE_SNOWFLAKE },
      ],
    },
    {
      name: 'INTEGRATIONS',
      items: [
        { name: 'GitLab', linkUrl: OLD_SITE_URL + ROUTE.INTEGRATION_GITLAB },
        { name: 'GitHub', linkUrl: OLD_SITE_URL + ROUTE.INTEGRATION_GITHUB },
        { name: 'Slack', linkUrl: OLD_SITE_URL + ROUTE.INTEGRATION_SLACK },
        { name: 'Discord', linkUrl: OLD_SITE_URL + ROUTE.INTEGRATION_DISCORD },
        { name: 'Teams', linkUrl: OLD_SITE_URL + ROUTE.INTEGRATION_TEAMS },
        { name: 'DingTalk', linkUrl: OLD_SITE_URL + ROUTE.INTEGRATION_DINGTALK },
        { name: 'Lark', linkUrl: OLD_SITE_URL + ROUTE.INTEGRATION_LARK },
        { name: 'WeCom', linkUrl: OLD_SITE_URL + ROUTE.INTEGRATION_WECOM },
      ],
    },
    {
      name: 'RESOURCES',
      items: [
        { name: 'GitHub', linkUrl: ROUTE.GITHUB, withGithubIcon: true },
        { name: 'Documentation', linkUrl: ROUTE.DOCS },
        { name: 'Blog', linkUrl: ROUTE.BLOG },
        { name: 'Changelog', linkUrl: OLD_SITE_URL + ROUTE.CHANGELOG },
        { name: 'SQL Review Guide', linkUrl: OLD_SITE_URL + ROUTE.SQL_REVIEW_GUIDE },
        { name: 'Database Glossary', linkUrl: OLD_SITE_URL + ROUTE.DATABASE_GLOSSARY },
        { name: 'Error Code', linkUrl: `${ROUTE.DOCS}/reference/error-code/overview/` },
        { name: 'DB Cost', linkUrl: ROUTE.DB_COST, isExternal: true },
        {
          name: 'Star History',
          linkUrl: ROUTE.STAR_HISTORY,
          isExternal: true,
        },
      ],
    },
    {
      name: 'COMPANY',
      items: [
        { name: 'About', linkUrl: ROUTE.ABOUT },
        { name: 'Brand', linkUrl: OLD_SITE_URL + ROUTE.BRAND },
        { name: 'Pricing', linkUrl: ROUTE.PRICING },
        { name: 'Careers', linkUrl: OLD_SITE_URL + ROUTE.JOBS },
        { name: 'Tech Stack', linkUrl: OLD_SITE_URL + ROUTE.TECHSTACK },
        { name: 'Contact', linkUrl: 'mailto:support@bytebase.com' },
      ],
    },
  ],
};
