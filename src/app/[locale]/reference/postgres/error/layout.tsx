import PostgresDocLayout from '@/components/pages/reference/postgres/postgresDocLayout';

const DIR_PATH = `${process.cwd()}/content/reference/postgres/error`;

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return <PostgresDocLayout dirPath={DIR_PATH}>{children}</PostgresDocLayout>;
}
