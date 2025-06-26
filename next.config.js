/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { codeInspectorPlugin } = require('code-inspector-plugin');

const skippedSectionsInNewWebsite = [
  '/database-review-guide',
  '/techstack',
  '/vcs',
  '/webhook',
  '/database-feature',
];

const tutorialRedirects = [
  'how-to-synchronize-database-schemas',
  'database-cicd-best-practice-with-github',
  'database-cicd-best-practice-with-gitlab',
  'how-to-integrate-sql-review-into-gitlab-github-ci',
  'manage-databases-in-bytebase-with-terraform',
];

module.exports = {
  output: 'standalone',
  poweredByHeader: false,
  trailingSlash: true,
  transpilePackages: ['next-international', 'international-types'],
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/introduction/what-is-bytebase',
        permanent: true,
      },
      {
        source: `/changelog/(^bytebase-.*)`,
        destination: '/changelog',
        permanent: true,
      },
      {
        source: '/docs/tutorials',
        destination: '/tutorial',
        permanent: true,
      },
      {
        source: '/brand',
        destination: '/about#brand-kit',
        permanent: true,
      },
      {
        source: '/jobs',
        destination: '/about#team',
        permanent: true,
      },
      {
        source: '/bytebase-brand-kit.zip',
        destination: '/download/bytebase-brand-kit.zip',
        permanent: true,
      },
      ...skippedSectionsInNewWebsite.map((slug) => ({
        source: slug,
        destination: '/',
        permanent: true,
      })),
      ...tutorialRedirects.map((slug) => ({
        source: `/blog/${slug}`,
        destination: `/docs/tutorials/${slug}`,
        permanent: true,
      })),
      {
        source: '/docs/tutorials/database-cicd-best-practice-with-github',
        destination: '/docs/tutorials/gitops-github-workflow',
        permanent: true,
      },
      {
        source: '/docs/tutorials/database-cicd-best-practice-with-azure-devops',
        destination: '/docs/tutorials/gitops-azure-devops-workflow',
        permanent: true,
      },
      {
        source: '/docs/tutorials/database-cicd-best-practice-with-gitlab',
        destination: '/docs/vcs-integration/overview',
        permanent: true,
      },
      {
        source: '/docs/tutorials/database-cicd-best-practice-with-bitbucket',
        destination: '/docs/vcs-integration/overview',
        permanent: true,
      },
      {
        source: '/docs/vcs-integration/add-gitops-connector',
        destination: '/docs/vcs-integration/overview',
        permanent: true,
      },
      {
        source: '/blog/how-to-handle-database-migration',
        destination: '/blog/how-to-handle-database-schema-change',
        permanent: true,
      },
      {
        source: '/blog/top-mysql-schema-compare-tools-2023',
        destination: '/blog/top-mysql-schema-compare-tools',
        permanent: true,
      },
      {
        source: `/docs/get-started/install/overview`,
        destination: '/docs/get-started/self-host/',
        permanent: true,
      },
      {
        source: `/docs/get-started/install/deploy-with-docker`,
        destination: '/docs/get-started/self-host/#docker',
        permanent: true,
      },
      {
        source: `/docs/get-started/install/deploy-to-kubernetes`,
        destination: '/docs/get-started/self-host/#kubernetes',
        permanent: true,
      },
      {
        source: `/docs/security/mask-data`,
        destination: '/docs/security/data-masking/overview',
        permanent: true,
      },
      {
        source: `/docs/concepts/database-change-workflow`,
        destination: '/docs/change-database/change-workflow',
        permanent: true,
      },
      {
        source: `/docs/how-to/sql-review/postgres-sql-review-guide`,
        destination: '/blog/postgres-sql-review-guide',
        permanent: true,
      },
      {
        source: `/docs/how-to/postgres/how-to-check-postgres-version`,
        destination: '/reference/postgres/how-to/how-to-check-postgres-version',
        permanent: true,
      },
      {
        source: `/docs/how-to/postgres/permission-denied-for-table-postgres`,
        destination: '/reference/postgres/error/42501-permission-denied-for-table-postgres',
        permanent: true,
      },
      {
        source: `/docs/how-to/postgres/must-be-owner-of-table-postgres`,
        destination: '/reference/postgres/error/42501-must-be-owner-of-table-postgres',
        permanent: true,
      },
      {
        source: `/docs/slow-query/enable-pg-stat-statements-for-postgresql`,
        destination: '/reference/postgres/how-to/how-to-enable-pg-stat-statements-postgres',
        permanent: true,
      },
      {
        source: `/docs/how-to/clickhouse/how-to-create-a-database-clickhouse`,
        destination: '/reference/clickhouse/how-to/how-to-create-a-database-clickhouse',
        permanent: true,
      },
      {
        source: `/docs/how-to/clickhouse/how-to-create-a-table-clickhouse`,
        destination: '/reference/clickhouse/how-to/how-to-create-a-table-clickhouse',
        permanent: true,
      },
      {
        source: `/docs/how-to/clickhouse/how-to-list-tables-from-a-database-clickhouse`,
        destination: '/reference/clickhouse/how-to/how-to-list-tables-from-a-database-clickhouse',
        permanent: true,
      },
      {
        source: `/docs/how-to/clickhouse/how-to-rename-a-table-clickhouse`,
        destination: '/reference/clickhouse/how-to/how-to-rename-a-table-clickhouse',
        permanent: true,
      },
      {
        source: `/docs/slow-query/enable-slow-query-log-for-mysql`,
        destination: '/reference/mysql/how-to/how-to-enable-slow-query-log-mysql',
        permanent: true,
      },
      {
        source: `/blog/how-to-set-up-mysql-using-docker`,
        destination: '/reference/mysql/how-to/how-to-install-mysql-using-docker',
        permanent: true,
      },
      {
        source: `/blog/how-to-install-local-mysql-on-mac-ubuntu-centos-windows`,
        destination: '/reference/mysql/how-to/how-to-install-mysql-on-mac-ubuntu-centos-windows',
        permanent: true,
      },
      {
        source: `/blog/how-to-install-mysql-shell-on-macos`,
        destination: '/reference/mysql/how-to/how-to-install-mysql-shell-on-macos',
        permanent: true,
      },
      {
        source: `/blog/how-to-install-mysql-client-on-mac-ubuntu-centos-windows`,
        destination:
          '/reference/mysql/how-to/how-to-install-mysql-client-on-mac-ubuntu-centos-windows',
        permanent: true,
      },
      {
        source: `/blog/top-mysql-commands-with-examples`,
        destination: '/reference/mysql/how-to/top-mysql-commands-with-examples',
        permanent: true,
      },
      {
        source: `/blog/how-to-run-clickhouse-with-docker-and-connect-using-mysql-client`,
        destination:
          '/reference/clickhouse/how-to/how-to-run-clickhouse-with-docker-and-connect-using-mysql-client',
        permanent: true,
      },
      {
        source: `/blog/how-to-configure-clickhouse-ssl-connection`,
        destination: '/reference/clickhouse/how-to/how-to-configure-clickhouse-ssl-connection',
        permanent: true,
      },
      {
        source: `/blog/how-to-install-postgres-on-mac-ubuntu-centos-windows`,
        destination:
          '/reference/postgres/how-to/how-to-install-postgres-on-mac-ubuntu-centos-windows',
        permanent: true,
      },
      {
        source: `/blog/how-to-set-up-postgres-using-docker`,
        destination: '/reference/postgres/how-to/how-to-install-postgres-using-docker',
        permanent: true,
      },
      {
        source: `/blog/top-psql-commands-with-examples`,
        destination: '/reference/postgres/how-to/top-psql-commands-with-examples',
        permanent: true,
      },
      {
        source: `/blog/how-to-manage-postgres-users-and-roles`,
        destination: '/reference/postgres/how-to/how-to-manage-postgres-users-and-roles',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
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
