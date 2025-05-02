import Route from '@/lib/route';
import {
  generatePostStaticParams,
  generatePostMetadata,
  default as DocPage,
} from '@/components/pages/docs/docPage';

const DOCS_DIR_PATH = `${process.cwd()}/content/docs`;
const FILE_ORIGIN_PATH = 'https://github.com/bytebase/bytebase.com/tree/main/content/docs';

export function generateStaticParams() {
  return generatePostStaticParams(DOCS_DIR_PATH);
}

export default function Page({ params }: { params: { slug: string[] } }) {
  return (
    <DocPage
      params={params}
      dirPath={DOCS_DIR_PATH}
      fileOriginPath={FILE_ORIGIN_PATH}
      routePath={Route.DOCS}
    />
  );
}

export async function generateMetadata({ params }: { params: { slug: string[] } }) {
  return generatePostMetadata({
    params,
    dirPath: DOCS_DIR_PATH,
    routePath: Route.DOCS,
  });
}
