import Route from '@/lib/route';

const SEO_PAGES_DATA = {
  TECHLEAD: {
    title: 'Improve team velocity and reduce risk',
    description:
      'Teams using Bytebase will automatically follow industry best practice for managing database schema changes. Tech leads will see an improved development velocity and reduced outages caused by database changes.',
  },
  DBA: {
    title: '10x DBA operational efficiency',
    description:
      'Bytebase provides a collaborative web-console and cohensive workflow to allow DBA to manage database tasks and handle developer tickets much more efficently than traditonal tools.',
  },
  DEVELOPER: {
    title: 'Holistic view of database schema changes',
    description:
      'Regardless of working as an IC in a team or managing your own side project, developers using Bytebase will have a holistic view of all the related database info, the ongoing database schema change tasks and the past database migration history.',
  },
  MYSQL: {
    title: 'MySQL + Bytebase',
    description:
      "MySQL is the world's most popular open source database. Bytebase supports MySQL database natively to manage schema changes, backups, record migration history and etc.",
    linkText: 'More about MySQL.',
    linkUrl: 'https://www.mysql.com/',
    linkTarget: '_blank',
  },
  POSTGRES: {
    title: 'PostgreSQL + Bytebase',
    description:
      "PostgreSQL is the world's most advanced open source relational database. Bytebase supports PostgreSQL database natively to manage schema changes, backups, record migration history and etc.",
    linkText: 'More about PostgreSQL.',
    linkUrl: 'https://www.postgresql.org/',
    linkTarget: '_blank',
  },
  CLICKHOUSE: {
    title: 'ClickHouse + Bytebase',
    description:
      'ClickHouse is an open-source, high performance columnar OLAP database management system for real-time analytics using SQL.',
    linkText: 'More about ClickHouse.',
    linkUrl: 'https://clickhouse.com/',
    linkTarget: '_blank',
  },
  TIDB: {
    title: 'TiDB + Bytebase',
    description:
      'TiDB is an open-source, cloud-native, distributed SQL database for elastic scale and real-time analytics. Bytebase supports TiDB database natively to manage schema changes, backups, record migration history and etc.',
    linkText: 'More about TiDB.',
    linkUrl: 'https://www.pingcap.com/',
    linkTarget: '_blank',
  },
  SNOWFLAKE: {
    title: 'Snowflake + Bytebase',
    description: 'Snowflake database change management built for DevOps and team collaboration.',
    linkText: 'More about Snowflake.',
    linkUrl: 'https://www.snowflake.com/en/',
    linkTarget: '_blank',
  },
  ORACLE: {
    title: 'Oracle + Bytebase',
    description: 'Oracle database change management built for DevOps and team collaboration.',
    linkText: 'More about Oracle.',
    linkUrl: 'https://www.oracle.com/',
    linkTarget: '_blank',
  },
  SQLSERVER: {
    title: 'SQL Server + Bytebase',
    description: 'SQL Server schema change management built for DevOps and team collaboration.',
    linkText: 'More about SQL Server.',
    linkUrl: 'https://www.microsoft.com/en-us/sql-server/',
    linkTarget: '_blank',
  },
  MONGO: {
    title: 'MongoDB + Bytebase',
    description: 'MongoDB database change management built for DevOps and team collaboration.',
    linkText: 'More about MongoDB.',
    linkUrl: 'https://www.mongodb.com/',
    linkTarget: '_blank',
  },
  REDIS: {
    title: 'Redis + Bytebase',
    description: 'Redis database change management built for DevOps and team collaboration.',
    linkText: 'More about Redis.',
    linkUrl: 'https://redis.com/',
    linkTarget: '_blank',
  },
  REDSHIFT: {
    title: 'Redshift + Bytebase',
    description: 'AWS Redshift database change management built for DevOps and team collaboration.',
    linkText: 'More about AWS Redshift.',
    linkUrl: 'https://aws.amazon.com/redshift/',
    linkTarget: '_blank',
  },
  MARIADB: {
    title: 'MariaDB + Bytebase',
    description: 'MariaDB database change management built for DevOps and team collaboration.',
    linkText: 'More about MariaDB',
    linkUrl: 'https://mariadb.org/',
    linkTarget: '_blank',
  },
  SPANNER: {
    title: 'Spanner + Bytebase',
    description:
      'Google Cloud Spanner database change management built for DevOps and team collaboration.',
    linkText: 'More about Google Cloud Spanner',
    linkUrl: 'https://cloud.google.com/spanner',
    linkTarget: '_blank',
  },
  OCEANBASE: {
    title: 'OceanBase + Bytebase',
    description: 'OceanBase database change management built for DevOps and team collaboration.',
    linkText: 'More about OceanBase',
    linkUrl: 'https://www.oceanbase.com/en/',
    linkTarget: '_blank',
  },
  DATABRICKS: {
    title: 'Databricks + Bytebase',
    description: 'Databricks database change management built for DevOps and team collaboration.',
    linkText: 'More about Databricks',
    linkUrl: 'https://www.databricks.com/',
    linkTarget: '_blank',
  },
  GITLAB: {
    title: 'GitLab + Bytebase GitOps',
    description:
      'Bytebase integrates with GitLab to allow team to manage database migration scripts in the GitLab repository. Migration pipeline is triggered on observing new migration script push event.',
    linkText: 'View detailed guide.',
    linkUrl: `${Route.DOCS_VCS_INTEGRATION}`,
  },
  GITHUB: {
    title: 'GitHub + Bytebase GitOps',
    description:
      'Bytebase integrates with GitHub to allow team to manage database migration scripts in the GitHub repository. Migration pipeline is triggered on observing new migration script push event.',
    linkText: 'View detailed guide.',
    linkUrl: `${Route.DOCS_VCS_INTEGRATION}`,
  },
  BITBUCKET: {
    title: 'Bitbucket + Bytebase GitOps',
    description:
      'Bytebase integrates with Bitbucket to allow team to manage database migration scripts in the Bitbucket repository. Migration pipeline is triggered on observing new migration script push event.',
    linkText: 'View detailed guide.',
    linkUrl: `${Route.DOCS_VCS_INTEGRATION}`,
  },
  AZURE_DEVOPS: {
    title: 'Azure DevOps + Bytebase GitOps',
    description:
      'Bytebase integrates with Azure DevOps to allow team to manage database migration scripts in the Azure repository. Migration pipeline is triggered on observing new migration script push event.',
    linkText: 'View detailed guide.',
    linkUrl: `${Route.DOCS_VCS_INTEGRATION}`,
  },
  SLACK: {
    title: 'Slack + Bytebase',
    description:
      'Bytebase supports webhook to post database schema related events to the configured Slack channel. Those webhook events are specifically customized for Slack in order to display the optimal format.',
  },
  DISCORD: {
    title: 'Discord + Bytebase',
    description:
      'Bytebase supports webhook to post database schema related events to the configured Discord channel. Those webhook events are specifically customized for Discord in order to display the optimal format.',
  },
  TEAMS: {
    title: 'Teams + Bytebase',
    description:
      'Bytebase supports webhook to post database schema related events to the configured Microsoft Teams channel. Those webhook events are specifically customized for Teams in order to display the optimal format.',
  },
  DINGTALK: {
    title: 'DingTalk + Bytebase',
    description:
      'Bytebase supports webhook to post database schema related events to the configured DingTalk (钉钉) group. Those webhook events are specifically customized for DingTalk in order to display the optimal format.',
  },
  LARK: {
    title: 'Lark + Bytebase',
    description:
      'Bytebase supports webhook to post database schema related events to the configured Lark (飞书) group. Those webhook events are specifically customized for Feishu in order to display the optimal format.',
  },
  WECOM: {
    title: 'WeCom + Bytebase',
    description:
      'Bytebase supports webhook to post database schema related events to the configured WeCom (企业微信) group. Those webhook events are specifically customized for WeCom in order to display the optimal format.',
  },
};

export default SEO_PAGES_DATA;
