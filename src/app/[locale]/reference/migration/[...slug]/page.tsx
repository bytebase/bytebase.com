import Route from '@/lib/route';
import {
  generatePostStaticParams,
  generatePostMetadata,
  default as DocPage,
} from '@/components/pages/docs/docPage';

const DIR_PATH = `${process.cwd()}/content/reference/migration`;
const FILE_ORIGIN_PATH =
  'https://github.com/bytebase/bytebase.com/tree/main/content/reference/migration';

export function generateStaticParams() {
  return generatePostStaticParams(DIR_PATH);
}

export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <DocPage
      params={params}
      dirPath={DIR_PATH}
      fileOriginPath={FILE_ORIGIN_PATH}
      routePath={Route.REFERENCE_MIGRATION}
    />
  );
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  return generatePostMetadata({
    params,
    dirPath: DIR_PATH,
    routePath: Route.REFERENCE_MIGRATION,
  });
}
