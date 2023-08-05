import AzureDevOpsIcon from '@/svgs/azure-devops.inline.svg';
import BitbucketIcon from '@/svgs/bitbucket.inline.svg';
import ClickHouseIcon from '@/svgs/clickhouse.inline.svg';
import GitHubIcon from '@/svgs/github.inline.svg';
import GitLabIcon from '@/svgs/gitlab.inline.svg';
import MariaDBIcon from '@/svgs/mariadb.inline.svg';
import MongoDBIcon from '@/svgs/mongodb.inline.svg';
import MySQLIcon from '@/svgs/mysql.inline.svg';
import OceanBaseIcon from '@/svgs/oceanbase.inline.svg';
import OracleIcon from '@/svgs/oracle.inline.svg';
import PostgreSQLIcon from '@/svgs/postgres.inline.svg';
import RedisIcon from '@/svgs/redis.inline.svg';
import RedshiftIcon from '@/svgs/redshift.inline.svg';
import SnowflakeIcon from '@/svgs/snowflake.inline.svg';
import SpannerIcon from '@/svgs/spanner.inline.svg';
import SQLServerIcon from '@/svgs/sqlserver.inline.svg';
import TerraformIcon from '@/svgs/terraform.inline.svg';
import TiDBIcon from '@/svgs/tidb.inline.svg';
import clsx from 'clsx';

const IntegrationList = [
  {
    name: 'MySQL',
    Icon: MySQLIcon,
  },
  {
    name: 'PostgreSQL',
    Icon: PostgreSQLIcon,
  },
  {
    name: 'Snowflake',
    Icon: SnowflakeIcon,
  },
  {
    name: 'Oracle',
    Icon: OracleIcon,
  },
  {
    name: 'SQL Server',
    Icon: SQLServerIcon,
  },
  {
    name: 'MongoDB',
    Icon: MongoDBIcon,
  },
  {
    name: 'Redis',
    Icon: RedisIcon,
  },
  {
    name: 'Redshift',
    Icon: RedshiftIcon,
  },
  {
    name: 'ClickHouse',
    Icon: ClickHouseIcon,
  },
  {
    name: 'TiDB',
    Icon: TiDBIcon,
  },
  {
    name: 'OceanBase',
    Icon: OceanBaseIcon,
  },
  {
    name: 'Spanner',
    Icon: SpannerIcon,
  },
  {
    name: 'MariaDB',
    Icon: MariaDBIcon,
  },
  {
    name: 'GitLab',
    Icon: GitLabIcon,
  },
  {
    name: 'GitHub',
    Icon: GitHubIcon,
  },
  {
    name: 'Bitbucket',
    Icon: BitbucketIcon,
  },
  {
    name: 'Azure DevOps',
    Icon: AzureDevOpsIcon,
  },
  {
    name: 'Terraform',
    Icon: TerraformIcon,
  },
];

const Integrations = ({ className }: { className?: string }) => {
  return (
    <ul
      className={clsx(
        'mt-11 flex flex-wrap justify-center gap-x-[25px] gap-y-6 px-7 pt-7 pb-8 shadow-[0px_5px_15px_rgba(15,22,36,.2)] 2xl:gap-[21px] 2xl:py-6 2xl:px-[29px] xl:gap-x-5 xl:px-[18px] lg:mt-10 md:mt-9 md:gap-6 md:px-[26px] md:pt-7 md:pb-8 sm:mt-8 sm:gap-y-[26px] sm:py-6 sm:pl-6 sm:pr-[22px]',
        className,
      )}
    >
      {IntegrationList.map(({ name, Icon }) => {
        return (
          <li className="flex items-center gap-x-2 2xl:gap-x-[7px] md:gap-x-2" key={name}>
            <Icon className="w-6 2xl:w-[22px] md:w-6" />
            <span className="text-18 font-semibold 2xl:text-16 md:text-18">{name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Integrations;
