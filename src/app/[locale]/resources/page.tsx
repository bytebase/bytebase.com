import getMetadata from '@/utils/get-metadata';
import SEO_DATA from '@/lib/seo-data';
import Link from 'next/link';
import Route from '@/lib/route';

export const metadata = getMetadata(SEO_DATA.RESOURCES);

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-pricing-hero pb-20 pt-[64px] lg:pb-16 md:pb-[54px] md:pt-24 sm:pb-11">
        <div className="container max-w-[1396px] 2xl:max-w-full">
          <header className="text-center">
            <h1 className="sr-only">Bytebase resources page</h1>
            <section className="container flex flex-col items-center">
              <h2 className="max-w-3xl text-center font-title text-56 font-semibold leading-none xl:max-w-2xl xl:text-56 md:max-w-lg md:text-48 sm:text-40">
                Resources
              </h2>
            </section>
          </header>
        </div>
      </section>
      <section className="container max-w-[1396px] 2xl:max-w-full">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
          {/* Documentation Card */}
          <ResourceCard
            title="🐘 Postgres How-to Guide"
            link="/reference/postgres/how-to/overview"
          />
          <ResourceCard
            title="🐘 Postgres Error Reference"
            link="/reference/postgres/error/overview"
          />
          <ResourceCard title="🐬 MySQL How-to Guide" link="/reference/mysql/how-to/overview" />
          <ResourceCard title="🐬 MySQL Error Reference" link="/reference/mysql/error/overview" />
          <ResourceCard title="🦭 MariaDB How-to Guide" link="/reference/mariadb/how-to/overview" />
          <ResourceCard
            title="🛢️ SQL Server How-to Guide"
            link="/reference/sqlserver/how-to/overview"
          />
          <ResourceCard
            title="🏠 ClickHouse How-to Guide"
            link="/reference/clickhouse/how-to/overview"
          />
          <ResourceCard title="🔧 Spanner How-to Guide" link="/reference/spanner/how-to/overview" />
          <ResourceCard title="🔍 SQL Review Guide" link={Route.SQL_REVIEW_GUIDE} />
          <ResourceCard title="📚 Database Glossary" link={Route.DATABASE_GLOSSARY} />
          <ResourceCard title="🏗️ Migration Guide" link="/reference/migration/overview" />
        </div>
      </section>
    </>
  );
}

interface ResourceCardProps {
  title: string;
  link: string;
}

const ResourceCard = ({ title, link }: ResourceCardProps) => (
  <Link href={link} className="block">
    <div className="border-gray-200 h-full rounded-lg border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <h3 className="mb-2 text-24">{title}</h3>
    </div>
  </Link>
);
