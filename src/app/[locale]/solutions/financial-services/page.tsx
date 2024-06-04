import Landing from '../landing';

import SOLUTIONS_DATA from '@/lib/solutions-data';

export default function Page() {
  return <Landing solution={SOLUTIONS_DATA.FINANCIAL_SERVICES} />;
}
