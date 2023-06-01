import format from 'date-fns/format';

import Link from '@/components/shared/link';

import AuroraIcon from '@/svgs/aurora.inline.svg';
import ClickHouseIcon from '@/svgs/clickhouse.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';
import GitLabIcon from '@/svgs/gitlab.inline.svg';
import MongoDBIcon from '@/svgs/mongodb.inline.svg';
import PostgresIcon from '@/svgs/postgres.inline.svg';
import RedisIcon from '@/svgs/redis.inline.svg';
import SnowflakeIcon from '@/svgs/snowflake.inline.svg';
import SpannerIcon from '@/svgs/spanner.inline.svg';
import TerraformIcon from '@/svgs/terraform.inline.svg';
import TidbIcon from '@/svgs/tidb.inline.svg';
import MySQLIcon from '@/svgs/mysql.inline.svg';

const allLogos: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  aurora: AuroraIcon,
  clickhouse: ClickHouseIcon,
  github: GithubIcon,
  gitlab: GitLabIcon,
  postgres: PostgresIcon,
  snowflake: SnowflakeIcon,
  spanner: SpannerIcon,
  terraform: TerraformIcon,
  tidb: TidbIcon,
  redis: RedisIcon,
  mongodb: MongoDBIcon,
  mysql: MySQLIcon,
};

const TutorialTallCard = ({
  title,
  logos,
  date,
  url,
}: {
  title: string;
  logos?: string;
  date: string;
  url: string;
}) => {
  const formattedDate = format(new Date(date), 'MMM dd, yyyy');

  return (
    <li className="tutorial-tall-card !my-0">
      <article className="h-full w-full">
        <Link
          className="flex h-full flex-col border border-gray-90 p-4 hover:border-gray-60"
          href={url}
        >
          <h4 className="text-18 font-semibold leading-tight xl:text-16 xl:leading-snug">
            {title}
          </h4>
          <div className="mt-auto flex items-center gap-x-4">
            {logos && (
              <div className="relative flex items-center gap-x-2 after:absolute after:-right-[9px] after:top-2 after:h-0.5 after:w-0.5 after:rounded-full after:bg-gray-60">
                {logos.split(',').map((logo) => {
                  const Logo = allLogos[logo];
                  return <Logo className="h-5 w-5" key={logo} />;
                })}
              </div>
            )}
            <time className="text-14 uppercase leading-none text-gray-40" dateTime={date}>
              {formattedDate}
            </time>
          </div>
        </Link>
      </article>
    </li>
  );
};

export default TutorialTallCard;
