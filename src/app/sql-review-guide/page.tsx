import GuideLayout from '@/components/pages/sql-review-guide/guide-layout';
import Hero from '@/components/pages/sql-review-guide/hero';
import Subscription from '@/components/shared/subscription';

import { getGuidelineTemplateList, sqlReviewSchema } from '@/lib/api-sql-review';

export default function SQLReviewPage() {
  const guidelineTemplateList = getGuidelineTemplateList();

  return (
    <>
      <GuideLayout templateList={guidelineTemplateList} schema={sqlReviewSchema}>
        <Hero />
      </GuideLayout>
      <Subscription className="mt-52 2xl:mt-[189px] lg:mt-[156px] md:mt-[114px]" />
    </>
  );
}
