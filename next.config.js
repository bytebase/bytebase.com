/** @type {import('next').NextConfig} */

// TODO: switch external redirects to rewrites
/* eslint @typescript-eslint/no-var-requires: "off" */
const generateRedirects = require('./src/lib/generate-redirects');

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
        source: '/tutorials',
        destination: '/docs/tutorials/overview/',
        permanent: true,
      },
      ...generateRedirects(),
    ];
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
