const generateRedirects = () => {
  const OLD_SITE_URL = process.env.NEXT_PUBLIC_OLD_SITE_URL || '';

  if (!OLD_SITE_URL) return [];

  return [
    '/brand',
    '/jobs',
    '/techstack',
    '/changelog',
    '/changelog/:path*',
    '/terms',
    '/privacy',
    '/bytebase-plus',
    '/database/mysql',
    '/database/postgres',
    '/database/tidb',
    '/database/clickhouse',
    '/database/snowflake',
    '/integration/gitlab',
    '/integration/github',
    '/integration/slack',
    '/integration/discord',
    '/integration/teams',
    '/integration/dingtalk',
    '/integration/feishu',
    '/integration/wecom',
    '/usecase/dba',
    '/usecase/techlead',
    '/usecase/developer',
  ].map((pathname) => ({
    source: pathname,
    destination: OLD_SITE_URL + pathname,
    permanent: false,
  }));
};

module.exports = generateRedirects;
