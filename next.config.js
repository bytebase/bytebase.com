/** @type {import('next').NextConfig} */

const rewrites = [
  '/brand',
  '/database-review-guide',
  '/demo-confirm',
  '/jobs',
  '/refund',
  '/sql-review-guide',
  '/techstack',
  '/vcs',
  '/webhook',
  '/database-feature',
  '/database-glossary',
  '/database',
  '/integration',
  '/usecase',
];

const changelogRedirects = [
  'bytebase-0-1-0',
  'bytebase-0-10-0',
  'bytebase-0-11-0',
  'bytebase-0-12-0',
  'bytebase-0-13-0',
  'bytebase-0-2-0',
  'bytebase-0-2-2',
  'bytebase-0-3-0',
  'bytebase-0-4-0',
  'bytebase-0-4-1',
  'bytebase-0-5-0',
  'bytebase-0-6-0',
  'bytebase-0-7-0',
  'bytebase-0-7-1',
  'bytebase-0-7-2',
  'bytebase-0-8-0',
  'bytebase-0-8-1',
  'bytebase-0-9-0',
  'bytebase-1-0-0',
  'bytebase-1-0-1',
  'bytebase-1-0-2',
  'bytebase-1-0-3',
  'bytebase-1-0-4',
  'bytebase-1-0-5',
  'bytebase-1-1-0',
  'bytebase-1-1-1',
  'bytebase-1-10-0',
  'bytebase-1-11-0',
  'bytebase-1-12-0',
  'bytebase-1-12-1',
  'bytebase-1-13-0',
  'bytebase-1-14-0',
  'bytebase-1-15-0',
  'bytebase-1-16-0',
  'bytebase-1-17-0',
  'bytebase-1-2-0',
  'bytebase-1-2-1',
  'bytebase-1-2-2',
  'bytebase-1-3-0',
  'bytebase-1-3-1',
  'bytebase-1-3-2',
  'bytebase-1-4-0',
  'bytebase-1-5-0',
  'bytebase-1-6-0',
  'bytebase-1-7-0',
  'bytebase-1-8-0',
  'bytebase-1-9-0',
  'bytebase-1-9-1',
];

module.exports = {
  poweredByHeader: false,
  trailingSlash: true,
  swcMinify: false,
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/introduction/what-is-bytebase',
        permanent: true,
      },
      ...changelogRedirects.map((slug) => ({
        source: `/changelog/${slug}`,
        destination: '/changelog',
        permanent: true,
      })),
      {
        source: '/tutorial',
        destination: '/docs/tutorials/overview',
        permanent: true,
      },
      {
        source: '/docs/tutorials',
        destination: '/docs/tutorials/overview',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/_nuxt/:path*',
          destination: 'https://old.bytebase.com/_nuxt/:path*',
        },
        {
          source: '/bytebase-brand-kit.zip',
          destination: 'https://old.bytebase.com/bytebase-brand-kit.zip',
        },
      ],
      afterFiles: [
        ...rewrites.map((section) => ({
          source: `${section}/:path*`,
          destination: `https://old.bytebase.com${section}/:path*`,
        })),
      ],
      fallback: [
        {
          source: '/zh/:path*/',
          destination: 'https://old.bytebase.com/zh/:path*/',
        },
      ],
    };
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.inline.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                'prefixIds',
                'removeDimensions',
              ],
            },
          },
        },
      ],
    });
    config.module.rules.push({
      test: /(?<!inline)\.svg$/,
      issuer: /\.(js|jsx|ts|tsx|css)$/,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: 512,
            publicPath: '/_next/static/images',
            outputPath: 'static/images',
            fallback: require.resolve('file-loader'),
          },
        },
        {
          loader: require.resolve('svgo-loader'),
        },
      ],
    });

    return config;
  },
};
