import GuideLayout from '@/components/pages/sql-review-guide/guide-layout';
import Hero from '@/components/pages/sql-review-guide/hero';
import Subscription from '@/components/shared/subscription';

import { guidelineTemplateList, sqlReviewSchema } from '@/lib/api-sql-review';

export default async function Page() {
  return (
    <>
      <Hero />
      <GuideLayout templateList={guidelineTemplateList} schema={sqlReviewSchema} />
      <Subscription />
    </>
  );
}
