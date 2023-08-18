import getMetadata from '@/utils/get-metadata';

import Hero from '@/components/pages/sql-editor/hero';
import Features from '@/components/pages/sql-editor/features';
import PromoSQLEditor from '@/components/pages/home/promo-sql-editor';
import Community from '@/components/shared/community';

import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.SQL_EDITOR);

const SQLEditorPage = () => {
  return (
    <>
      <h1 className="sr-only">SQL Editor</h1>
      <Hero />
      <PromoSQLEditor />
      <Features />
      <Community />
    </>
  );
};

export default SQLEditorPage;
