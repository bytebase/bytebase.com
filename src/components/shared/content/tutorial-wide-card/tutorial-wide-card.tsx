import format from 'date-fns/format';

import Link from '@/components/shared/link';

import AuroraIcon from '@/svgs/aurora.inline.svg';
import ClickHouseIcon from '@/svgs/clickhouse.inline.svg';
import ExternalIcon from '@/svgs/external-sm.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';
import GitLabIcon from '@/svgs/gitlab.inline.svg';
import MongoDBIcon from '@/svgs/mongodb.inline.svg';
import PostgresIcon from '@/svgs/postgres.inline.svg';
import RedisIcon from '@/svgs/redis.inline.svg';
import SnowflakeIcon from '@/svgs/snowflake.inline.svg';
import TerraformIcon from '@/svgs/terraform.inline.svg';
import TidbIcon from '@/svgs/tidb.inline.svg';

const allLogos: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  aurora: AuroraIcon,
  clickhouse: ClickHouseIcon,
  github: GithubIcon,
  gitlab: GitLabIcon,
  postgres: PostgresIcon,
  snowflake: SnowflakeIcon,
  terraform: TerraformIcon,
  tidb: TidbIcon,
  redis: RedisIcon,
  mongodb: MongoDBIcon,
};

const TutorialWideCard = ({
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
    <article className="tutorial-card not-prose my-5 xl:my-4">
      <Link className="flex flex-col bg-gray-97 px-5 py-4 hover:bg-gray-94 sm:px-4" href={url}>
        <h4 className="max-w-xs text-20 font-semibold leading-tight lg:text-18 sm:text-16">
          {title}
        </h4>
        <div className="mt-6 flex justify-between">
          <div className="flex items-center gap-x-4">
            {logos && (
              <div className="relative flex items-center gap-x-2 after:absolute after:-right-2 after:top-2 after:h-0.5 after:w-0.5 after:rounded-full after:bg-gray-60">
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
          <span className="inline-flex items-center text-14 leading-none text-gray-40">
            <span>Read more</span>
            <ExternalIcon className="ml-1 h-[13px] w-[13px] text-gray-40" />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default TutorialWideCard;
