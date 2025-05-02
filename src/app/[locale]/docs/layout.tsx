import DocsLayout from '@/components/pages/docs/layout';

const DOCS_DIR_PATH = `${process.cwd()}/content/docs`;

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return <DocsLayout dirPath={DOCS_DIR_PATH}>{children}</DocsLayout>;
}
