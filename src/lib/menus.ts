import Route from './route';

export const MENUS = {
  header: [
    {
      title: 'Docs',
      items: [
        {
          name: 'Get Started',
          description: 'Deploy Bytebase in 5 minutes',
          linkUrl: Route.DOCS,
          iconName: 'rocket',
        },
        {
          name: 'API',
          description: 'Integrate Bytebase with your own tools',
          linkUrl: Route.DOCS_API,
          iconName: 'api',
        },
        {
          name: 'CLI',
          description: 'Change database via CLI',
          linkUrl: Route.DOCS_CLI,
          iconName: 'cli',
        },
        {
          name: 'How-To',
          description: 'Knowledge base and best practices',
          linkUrl: Route.DOCS_HOW_TO,
          iconName: 'howTo',
        },
      ],
    },
    { title: 'Blog', href: Route.BLOG },
    { title: 'Pricing', href: Route.PRICING },
  ],
  mobile: [
    {
      title: 'Docs',
      items: [
        {
          name: 'Get Started',
          description: 'Deploy Bytebase in 5 minutes',
          linkUrl: Route.DOCS,
          iconName: 'rocket',
        },
        {
          name: 'API',
          description: 'Integrate Bytebase with your own tools',
          linkUrl: Route.DOCS_API,
          iconName: 'api',
        },
        {
          name: 'CLI',
          description: 'Change database via CLI',
          linkUrl: Route.DOCS_CLI,
          iconName: 'cli',
        },
        {
          name: 'How-To',
          description: 'Knowledge base and best practices',
          linkUrl: Route.DOCS_HOW_TO,
          iconName: 'howTo',
        },
        {
          name: 'Tutorials',
          description: 'Bytebase feature guides',
          linkUrl: Route.DOCS_TUTORIALS,
          iconName: 'tutorials',
        },
      ],
    },
    { title: 'Blog', href: Route.BLOG },
    { title: 'Pricing', href: Route.PRICING },
  ],
  footer: [
    {
      name: 'DATABASES',
      items: [
        { name: 'MySQL', linkUrl: Route.DATABASE_MYSQL },
        { name: 'PostgreSQL', linkUrl: Route.DATABASE_POSTGRES },
        { name: 'ClickHouse', linkUrl: Route.DATABASE_CLICKHOUSE },
        { name: 'TiDB', linkUrl: Route.DATABASE_TIDB },
        { name: 'Snowflake', linkUrl: Route.DATABASE_SNOWFLAKE },
      ],
    },
    {
      name: 'INTEGRATIONS',
      items: [
        { name: 'GitLab', linkUrl: Route.INTEGRATION_GITLAB },
        { name: 'GitHub', linkUrl: Route.INTEGRATION_GITHUB },
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
  ],
};
