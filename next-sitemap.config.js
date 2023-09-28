/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DEFAULT_SITE_URL || 'https://www.bytebase.com',
  generateRobotsTxt: true,
  // Custom the i18n path. Remove the prefix `en` for matched path.
  // Reference: https://next-sitemap.iamvishnusankar.com/docs/documentation/custom-transformation
  transform: async (config, path) => {
    if (path.startsWith('/en')) {
      path = path.substring(3);
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
};
