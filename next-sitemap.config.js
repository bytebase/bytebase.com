const DEFAULT_LANGUAGE = 'en';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DEFAULT_SITE_URL || 'https://www.bytebase.com',
  generateRobotsTxt: true,
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

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
};
