import Route from '@/lib/route';

import {
  generatePostStaticParams,
  generatePostMetadata,
  default as PostgresDocPage,
} from '@/components/pages/reference/postgres/postgresDocPage';

const DIR_PATH = `${process.cwd()}/content/reference/postgres/error`;
const FILE_ORIGIN_PATH =
  'https://github.com/bytebase/bytebase.com/tree/main/content/reference/postgres/error';

export function generateStaticParams() {
  return generatePostStaticParams(DIR_PATH);
}

export default function DocPage({ params }: { params: { slug: string[] } }) {
  return (
    <PostgresDocPage
      params={params}
      dirPath={DIR_PATH}
      fileOriginPath={FILE_ORIGIN_PATH}
      routePath={Route.REFERENCE_POSTGRES_ERROR}
    />
  );
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  return generatePostMetadata({
    params,
    dirPath: DIR_PATH,
    routePath: Route.REFERENCE_POSTGRES_ERROR,
  });
}
