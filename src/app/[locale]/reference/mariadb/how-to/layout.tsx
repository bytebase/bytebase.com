import DocsLayout from '@/components/pages/docs/layout';

const DIR_PATH = `${process.cwd()}/content/reference/mariadb/how-to`;

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <DocsLayout dirPath={DIR_PATH} includeSearch={false}>
      {children}
    </DocsLayout>
  );
}
