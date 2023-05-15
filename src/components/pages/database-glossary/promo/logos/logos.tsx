import BitbucketIcon from '@/svgs/bitbucket.inline.svg';
import ClickHouseIcon from '@/svgs/clickhouse.inline.svg';
import GitHubIcon from '@/svgs/github.inline.svg';
import GitLabIcon from '@/svgs/gitlab.inline.svg';
import MongoDBIcon from '@/svgs/mongodb.inline.svg';
import MySQLIcon from '@/svgs/mysql.inline.svg';
import PostgreSQLIcon from '@/svgs/postgres.inline.svg';
import SnowflakeIcon from '@/svgs/snowflake.inline.svg';
import SpannerIcon from '@/svgs/spanner.inline.svg';
import TiDBIcon from '@/svgs/tidb.inline.svg';

const LOGOS = [
  {
    name: 'MySQL',
    Icon: MySQLIcon,
  },
  {
    name: 'PostgreSQL',
    Icon: PostgreSQLIcon,
  },
  {
    name: 'TiDB',
    Icon: TiDBIcon,
  },
  {
    name: 'Snowflake',
    Icon: SnowflakeIcon,
  },
  {
    name: 'ClickHouse',
    Icon: ClickHouseIcon,
  },
  {
    name: 'MongoDB',
    Icon: MongoDBIcon,
  },
  {
    name: 'Spanner',
    Icon: SpannerIcon,
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
];

// TODO: update gaps, size to ceil
const Logos = () => {
  return (
    <ul className="mt-11 flex flex-wrap gap-x-[25px] gap-y-6 pt-7 pl-7 pb-8 pr-5 shadow-[0px_5px_15px_rgba(15,22,36,.2)] 2xl:gap-[21px] 2xl:pt-6 2xl:pl-6 2xl:pb-[30px] lg:mt-10 md:mt-9 md:gap-6 md:pl-7 md:pt-7 md:pb-8 sm:mt-8 sm:justify-center sm:pl-6 sm:pt-6">
      {LOGOS.map(({ name, Icon }) => {
        return (
          <li className="flex items-center gap-x-2" key={name}>
            <Icon className="w-6 2xl:w-[22px] md:w-6" />
            <span className="text-18 font-semibold 2xl:text-16 md:text-18">{name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Logos;
