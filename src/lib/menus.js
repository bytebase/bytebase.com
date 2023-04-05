import ROUTE from './route.ts';

export const MENUS = {
  header: [
    { title: 'Solutions', href: ROUTE.SOLUTIONS },
    { title: 'Blog', href: ROUTE.BLOG },
    {
      title: 'Docs',
      items: [
        {
          name: 'Get Started',
          description: 'Instantly validates tax ID numbers ',
          linkUrl: '/',
          iconName: 'rocket',
        },
        {
          name: 'CLI',
          description: 'Ensures your compliance with DAC7',
          linkUrl: '/',
          iconName: 'cli',
        },
        {
          name: 'API',
          description: 'Issues locally compliant invoices',
          linkUrl: '/',
          iconName: 'api',
        },
        {
          name: 'How-To',
          description: 'Sends authorities tax data in real',
          linkUrl: '/',
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
          linkUrl: '/',
          iconName: 'rocket',
        },
        {
          name: 'CLI',
          description: 'Ensures your compliance with DAC7',
          linkUrl: '/',
          iconName: 'cli',
        },
        {
          name: 'API',
          description: 'Issues locally compliant invoices',
          linkUrl: '/',
          iconName: 'api',
        },
        {
          name: 'How-To',
          description: 'Sends authorities tax data in real',
          linkUrl: '/',
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
        { name: 'MySQL', linkUrl: '/' },
        { name: 'PostgreSQL', linkUrl: '/' },
        { name: 'ClickHouse', linkUrl: '/' },
        { name: 'TiDB', linkUrl: '/' },
        { name: 'Snowflake', linkUrl: '/' },
      ],
    },
    {
      name: 'INTEGRATIONS',
      items: [
        { name: 'GitLab', linkUrl: '/' },
        { name: 'GitHub', linkUrl: '/' },
        { name: 'Slack', linkUrl: '/' },
        { name: 'Discord', linkUrl: '/' },
        { name: 'Teams', linkUrl: '/' },
        { name: 'DingTalk', linkUrl: '/' },
        { name: 'Lark', linkUrl: '/' },
        { name: 'WeCom', linkUrl: '/' },
      ],
    },
    {
      name: 'RESOURCES',
      items: [
        { name: 'GitHub', linkUrl: '/', withGithubIcon: true },
        { name: 'Documentation', linkUrl: '/' },
        { name: 'Blog', linkUrl: '/' },
        { name: 'Changelog', linkUrl: '/' },
        { name: 'SQL Review Guide', linkUrl: '/' },
        { name: 'Database Glossary', linkUrl: '/' },
        { name: 'Error Code', linkUrl: '/' },
        { name: 'DB Cost', linkUrl: '/', isExternal: true },
        { name: 'Star History', linkUrl: '/', isExternal: true },
      ],
    },
    {
      name: 'COMPANY',
      items: [
        { name: 'About', linkUrl: '/' },
        { name: 'Brand', linkUrl: '/' },
        { name: 'Pricing', linkUrl: '/' },
        { name: 'Careers', linkUrl: '/' },
        { name: 'Tech Stack', linkUrl: '/' },
        { name: 'Contact', linkUrl: '/' },
      ],
    },
  ],
};
