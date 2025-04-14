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
import APIIcon from '@/svgs/api.inline.svg';
import JiraIcon from '@/svgs/jira.inline.svg';
import SlackIcon from '@/svgs/slack.inline.svg';

const allIntegrations: { [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>> } = {
  aurora: AuroraIcon,
  'azure devops': AzureDevOpsIcon,
  bitbucket: BitbucketIcon,
  general: BytebaseIcon,
  clickhouse: ClickHouseIcon,
  github: GithubIcon,
  gitlab: GitLabIcon,
  jira: JiraIcon,
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
  api: APIIcon,
  slack: SlackIcon,
};

type PostsProps = {
  posts: BlogPost[];
};

// Define sections
const sections = ['Database CI/CD', 'Data Access Control', 'GitOps', 'Integration'];

// Helper function to categorize posts
const categorizePost = (post: BlogPost): string => {
  // This is a simple categorization strategy
  // You may need to adjust this based on your actual post data and metadata
  const title = post.title.toLowerCase();
  const integrations = post.integrations?.toLowerCase() || '';

  if (
    title.includes('cicd') ||
    title.includes('ci/cd') ||
    integrations.includes('azure devops') ||
    integrations.includes('bitbucket') ||
    title.includes('database-cicd')
  ) {
    return 'Database CI/CD';
  } else if (
    title.includes('data access') ||
    title.includes('permission') ||
    title.includes('masking') ||
    title.includes('security') ||
    title.includes('just-in-time') ||
    title.includes('roles')
  ) {
    return 'Data Access Control';
  } else if (
    title.includes('gitops') ||
    title.includes('github') ||
    title.includes('gitlab') ||
    integrations.includes('github') ||
    integrations.includes('gitlab')
  ) {
    return 'GitOps';
  } else if (
    title.includes('jira') ||
    title.includes('slack') ||
    integrations.includes('jira') ||
    integrations.includes('slack') ||
    integrations.includes('api') ||
    title.includes('terraform') ||
    integrations.includes('terraform')
  ) {
    return 'Integration';
  }

  // Default to a section if categorization fails
  return 'Integration';
};

// Define the card component to avoid repetition
const TutorialCard = ({ post }: { post: BlogPost }) => {
  // Determine which icons to display
  let icons: React.ReactNode[] = [];

  if (post.integrations) {
    const integrationsList = post.integrations.split(', ');
    icons = integrationsList
      .filter((integration) => integration.toLowerCase() !== 'general')
      .map((integration) => {
        const Logo = allIntegrations[integration.toLowerCase()];
        return Logo ? <Logo className="h-5 w-5" key={integration.toLowerCase()} /> : null;
      })
      .filter(Boolean); // Remove null values
  }

  // If no specific icons or only 'general' was found, use the general icon
  if (icons.length === 0) {
    icons = [<BytebaseIcon className="h-5 w-5" key="general" />];
  }

  return (
    <li className="tutorial-card !my-0 h-full">
      <article className="h-full w-full">
        <Link
          className="flex h-full flex-col border border-gray-90 p-4 hover:border-gray-60"
          href={`/docs/tutorials/${post.slug}`}
        >
          <div className="mb-2 flex items-center gap-x-1">{icons}</div>
          <h4 className="text-18 font-semibold leading-tight xl:text-16 xl:leading-snug">
            {post.title}
          </h4>
        </Link>
      </article>
    </li>
  );
};

const Posts = ({ posts }: PostsProps) => {
  // Group posts by section
  const postsBySection: Record<string, BlogPost[]> = {};

  // Initialize sections with empty arrays
  sections.forEach((section) => {
    postsBySection[section] = [];
  });

  // Categorize posts into sections
  posts.forEach((post) => {
    const section = categorizePost(post);
    postsBySection[section].push(post);
  });

  return (
    <div className="col-span-9 flex flex-col gap-y-8 pt-16 lg:col-span-9 lg:pt-0 md:col-span-full md:mt-8 sm:mt-6">
      {sections.map(
        (section) =>
          // Only render sections that have posts
          postsBySection[section].length > 0 && (
            <section key={section} className="mb-8">
              <h3 className="mb-4 text-24 font-bold">{section}</h3>
              <ul className="grid grid-cols-3 gap-6 sm:grid-cols-2 xs:grid-cols-2 xs:gap-4">
                {postsBySection[section].map((post) => (
                  <TutorialCard key={post.slug} post={post} />
                ))}
              </ul>
            </section>
          ),
      )}
    </div>
  );
};

export default Posts;
