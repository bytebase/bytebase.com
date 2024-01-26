import { BlogPost } from '@/types/blog-post';
import Link from 'next/link';
import format from 'date-fns/format';

import AuroraIcon from '@/svgs/aurora.inline.svg';
import AzureDevOpsIcon from '@/svgs/azure-devops.inline.svg';
import BitbucketIcon from '@/svgs/bitbucket.inline.svg';
import BytebaseIcon from '@/svgs/bytebase.inline.svg';
import ClickHouseIcon from '@/svgs/clickhouse.inline.svg';
import GithubIcon from '@/svgs/github.inline.svg';
import GitLabIcon from '@/svgs/gitlab.inline.svg';
import MariaDBIcon from '@/svgs/mariadb.inline.svg';
import MongoDBIcon from '@/svgs/mongodb.inline.svg';
import OracleIcon from '@/svgs/oracle.inline.svg';
import PostgresIcon from '@/svgs/postgres.inline.svg';
import RedisIcon from '@/svgs/redis.inline.svg';
import SnowflakeIcon from '@/svgs/snowflake.inline.svg';
import SQLServerIcon from '@/svgs/sqlserver.inline.svg';
import SpannerIcon from '@/svgs/spanner.inline.svg';
import TerraformIcon from '@/svgs/terraform.inline.svg';
import TidbIcon from '@/svgs/tidb.inline.svg';
import MySQLIcon from '@/svgs/mysql.inline.svg';

const allIntegrations: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  aurora: AuroraIcon,
  'azure devops': AzureDevOpsIcon,
  bitbucket: BitbucketIcon,
  general: BytebaseIcon,
  clickhouse: ClickHouseIcon,
  github: GithubIcon,
  gitlab: GitLabIcon,
  oracle: OracleIcon,
  postgresql: PostgresIcon,
  snowflake: SnowflakeIcon,
  'sql server': SQLServerIcon,
  spanner: SpannerIcon,
  terraform: TerraformIcon,
  tidb: TidbIcon,
  redis: RedisIcon,
  mongodb: MongoDBIcon,
  mysql: MySQLIcon,
  mariadb: MariaDBIcon,
};

type PostsProps = {
  posts: BlogPost[];
};

const Posts = ({ posts }: PostsProps) => {
  return (
    <ul className="col-span-9 flex flex-col gap-y-8 pt-16 lg:col-span-9 lg:pt-0 md:col-span-full md:mt-8 sm:mt-6">
      {posts.map((post) => {
        return (
          <li key={post.slug} className="tutorial-card !my-0">
            <article className="h-full w-full">
              <Link
                className="flex h-full justify-between border border-gray-90 p-4 hover:border-gray-60"
                href={`/docs/tutorials/${post.slug}`}
              >
                <h4 className="flex flex-row text-18 font-semibold leading-tight xl:text-16 xl:leading-snug">
                  {post.pinned && '📌'} {post.title}
                  {post.integrations && (
                    <div className="ml-2 flex items-center gap-x-2">
                      {post.integrations.split(', ').map((integration) => {
                        const Logo = allIntegrations[integration.toLowerCase()];
                        return <Logo className="h-5 w-5" key={integration.toLowerCase()} />;
                      })}
                    </div>
                  )}
                </h4>
                <div className="mt-auto flex items-center gap-x-4">
                  {post.published_at && (
                    <time
                      className="relative flex items-center gap-x-2 text-14 text-gray-40 after:absolute after:-right-[9px] after:top-2.5 after:h-0.5 after:w-0.5 after:rounded-full after:bg-gray-60"
                      dateTime={post.published_at}
                    >
                      {format(new Date(post.published_at), 'MMM dd, yyyy')}
                    </time>
                  )}
                  {post.estimated_time && (
                    <div className="text-14 text-gray-40">{post.estimated_time} </div>
                  )}
                </div>
              </Link>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default Posts;
