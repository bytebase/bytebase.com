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
      {
        source: `/changelog/:slug(^bytebase-.*)`,
        destination: '/changelog',
        permanent: true,
      },
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
