import getMetadata from '@/utils/get-metadata';

import GuideLayout from '@/components/pages/sql-review-guide/guide-layout';
import Hero from '@/components/pages/sql-review-guide/hero';
import Subscription from '@/components/shared/subscription';

import { getGuidelineTemplateList, sqlReviewSchema } from '@/lib/api-sql-review';
import SEO_DATA from '@/lib/seo-data';

export const metadata = getMetadata(SEO_DATA.SQL_REVIEW_GUIDE);

export default function SQLReviewPage() {
  const guidelineTemplateList = getGuidelineTemplateList();

  return (
    <>
      <GuideLayout templateList={guidelineTemplateList} schema={sqlReviewSchema}>
        <Hero />
      </GuideLayout>
      <Subscription />
    </>
  );
}
