import GuideLayout from '@/components/pages/sql-review-guide/guide-layout';
import Hero from '@/components/pages/sql-review-guide/hero';
import Subscription from '@/components/shared/subscription';

import { getGuidelineTemplateList, sqlReviewSchema } from '@/lib/api-sql-review';

export default function Page() {
  const guidelineTemplateList = getGuidelineTemplateList();

  return (
    <>
      <Hero />
      <GuideLayout templateList={guidelineTemplateList} schema={sqlReviewSchema} />
      <Subscription />
    </>
  );
}
