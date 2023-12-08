const DEFAULT_LANGUAGE = 'en';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DEFAULT_SITE_URL || 'https://www.bytebase.com',
  generateRobotsTxt: true,
  sitemapSize: 300,
  // Do not index duplicated zh content for now
  exclude: ['/zh', '/zh/*'],
  // Custom the i18n path. Remove the prefix `en` for matched path.
  // Reference: https://next-sitemap.iamvishnusankar.com/docs/documentation/custom-transformation
  transform: (config, path) => {
    const defaultLanguageNeedle = '/' + DEFAULT_LANGUAGE;
    const defaultLanguageEnvelopeNeedle = defaultLanguageNeedle + '/';
    const defaultLanguageNeedleLen = defaultLanguageNeedle.length;
    if (path.startsWith(defaultLanguageEnvelopeNeedle)) {
      path = path.substring(defaultLanguageNeedleLen);
    } else if (path === defaultLanguageNeedle) {
      path = '/';
    }

    var priority = config.priority;
    const components = path.split('/');
    // Top level pathes having top priority
    if (components.length <= 2) {
      priority = 1.0;
    } else if (
      path.startsWith('/database/') ||
      path.startsWith('/integration/') ||
      path.startsWith('/sql-editor/') ||
      path.startsWith('/schema-migration/')
    ) {
      priority = 0.9;
    } else if (path.startsWith('/blog/')) {
      priority = 0.8;
    } else if (path.startsWith('/docs/') || path.startsWith('/tutorial/')) {
      priority = 0.7;
    } else {
      priority = 0.3;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
    };
  },
};
